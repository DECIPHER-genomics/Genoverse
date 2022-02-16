import Base                                                  from 'basejs';
import Track,     { Model as TrackModel, View as TrackView } from '../Graph';
import LineGraph, { Model as LineGraphModel }                from './Line';

const Controller = {
  getClickedFeatures: function (x, y) {
    const yZero     = this.prop('marginTop') - (this.prop('range')[0] * this.track.getYScale());
    const scale     = this.scale;
    const tolerance = scale > 1 ? 0 : 1;

    // Bars with negative values are stored in featurePositions with h < 0.
    // While this works to a certain degree (fillRect allows negative height, drawing upwards from y), it makes them hard to search for in the RTree - to find such a feature you need to search with y = -h and h = y - h + 1
    // It is therefore easier to search featuresByChr (i.e. the genomic positions) for a feature overlapping the x of the click, and then filter those results for y position manually.
    let features = this.prop('featuresByChr')[this.browser.chr].search({
      x : (x - (tolerance / 2)) / scale,
      y : 0,
      w : (1 + tolerance) / scale,
      h : 1,
    });

    if (features.length) {
      if (
        (y <  yZero && features.filter(f => f.position[scale].bounds.y + f.position[scale].bounds.h <= y && f.position[scale].bounds.y >= y).length === 0) ||
        (y >= yZero && this.featurePositions.search({ x: x, y: y, w: 1, h: 1 }).length === 0)
      ) {
        features = [];
      }
    }

    return features.length ? [ this.model.sortFeatures(features) ] : [];
  },

  populateMenu: function (features) {
    if (!features.length) {
      return [];
    }

    const start = features[0].start;
    const end   = features[features.length - 1].end;
    const avg   = features[0].start !== features[features.length - 1].start;

    let menu = { title: `${features[0].chr}:${start === end ? start : `${start}-${end}`}` };

    function getValues(_features) {
      const vals = _features.map(f => f.height).sort((a, b) => a - b);

      return {
        avg : vals.reduce((n, v) => n + v, 0) / vals.length,
        min : vals[0],
        max : vals[vals.length - 1],
      };
    }

    if (avg) {
      if (features.length === 1) {
        const values = getValues(features);

        menu['Average value'] = values.avg;
        menu['Min value']     = values.min;
        menu['Max value']     = values.max;
      } else {
        menu = [ menu ];

        let datasets = this.prop('datasets');
        let featuresByDataset;

        if (datasets.length) {
          featuresByDataset = datasets.reduce(
            (acc, d) => Object.assign(acc, { [d.name]: [] }),
            {}
          );

          features.forEach(
            (feature) => {
              featuresByDataset[feature.dataset].push(feature);
            }
          );
        } else {
          datasets          = [{ name: '' }];
          featuresByDataset = { '': features };
        }

        datasets.forEach(
          (dataset) => {
            const values = getValues(featuresByDataset[dataset.name]);

            menu.push({
              Average : values.avg,
              Min     : values.min,
              Max     : values.max,
              ...(dataset.name ? { title: dataset.name } : {}),
            });
          }
        );
      }
    } else if (features.length === 1) {
      menu.Value = features[0].height;
    } else {
      features.forEach(
        (feature) => {
          menu[feature.dataset] = feature.height;
        }
      );
    }

    return menu;
  },
};

const Model = TrackModel.extend({
  insertFeature: function (feature, ...args) {
    const datasets = this.prop('datasets');

    if (datasets.length) {
      feature.legend = feature.dataset;
      feature.color  = (datasets.filter(s => s.name === feature.dataset)[0] || { color: this.color }).color;
    }

    feature.id = feature.id || [ feature.chr, feature.start, feature.end, feature.dataset || '' ].join(':');

    return this.base(feature, ...args);
  },
});

const View = TrackView.extend({
  scaleFeatures: function (features, scale) {
    const yScale = this.track.getYScale();
    const zeroY  = this.prop('marginTop') - this.prop('range')[0] * yScale;

    features = this.base(features, scale);

    features.forEach(
      (feature) => {
        feature.position[scale].height = feature.height * yScale;
        feature.position[scale].y      = zeroY;
      }
    );

    return features;
  },

  draw: function (features, featureContext, labelContext, scale) {
    const datasets     = this.featureDataSets(features);
    const marginBottom = this.prop('margin');
    const binSize      = scale < 1 ? Math.ceil(1 / scale) : 0;
    const defaults     = {
      color       : this.color,
      globalAlpha : this.prop('globalAlpha'),
    };

    datasets.list.forEach(
      (config) => {
        const conf = { ...defaults, ...config };
        const set  = config.name;

        let setFeatures = $.extend(true, [], datasets.features[set] || []);

        if (!setFeatures.length) {
          return;
        }

        if (binSize) {
          const binnedFeatures = [];

          let i = 0;

          while (i < setFeatures.length) {
            const binStart = setFeatures[i].start;
            const bin      = [];

            while (setFeatures[i] && setFeatures[i].start - binStart < binSize) {
              bin.push(setFeatures[i++]);
            }

            const feature = $.extend(true, {}, bin[0], {
              height : bin.reduce((a, b) => a + b.height, 0) / bin.length,
              end    : bin[bin.length - 1].end,
            });

            [ 'H', 'W', 'height', 'width' ].forEach((attr) => { // eslint-disable-line no-loop-func
              feature.position[scale][attr] = bin.reduce((a, b) => a + b.position[scale][attr], 0) / bin.length;
            });

            binnedFeatures.push(feature);
          }

          setFeatures = binnedFeatures;
        }

        setFeatures.forEach(
          (setFeature) => {
            setFeature.color = conf.color;
          }
        );

        featureContext.globalAlpha = conf.globalAlpha;

        this.base(setFeatures, featureContext, labelContext, scale);
      }
    );

    // Don't allow features to be drawn in the margins
    featureContext.clearRect(0, 0,                                  this.width, this.prop('marginTop') - 1);
    featureContext.clearRect(0, this.prop('height') - marginBottom, this.width, marginBottom);
  },
});

export default Track.extend({
  type      : 'Bar',
  model     : Model,
  view      : View,
  threshold : 500000,

  10000: { // Switch to line graph at 10000bp region
    ...Object.keys(LineGraph.prototype).reduce(
      (acc, key) => {
        if (LineGraph.prototype.hasOwnProperty(key) && !Base.prototype[key]) {
          acc[key] = LineGraph.prototype[key];
        }

        return acc;
      },
      {}
    ),
    fill  : true,
    model : LineGraphModel.extend({
      parseData: function (data, chr, start, end) {
        const coords = [];

        data.forEach(
          (item) => {
            for (let pos = item.start; pos < item.end; pos++) {
              coords.push([ pos, item.height ]);
            }
          }
        );

        return this.base([{ chr: chr, start: start, end: end, coords: coords }], chr, start, end);
      },
    }),
  },
  50000: { // Switch to sparser line graph at 50000bp region
    ...Object.keys(LineGraph.prototype).reduce(
      (acc, key) => {
        if (LineGraph.prototype.hasOwnProperty(key) && !Base.prototype[key]) {
          acc[key] = LineGraph.prototype[key];
        }

        return acc;
      },
      {}
    ),
    fill  : true,
    model : LineGraphModel.extend({
      parseData: function (data, chr, start, end) {
        return this.base([{ chr: chr, start: start, end: end, coords: data.map(d => [ d.start, d.height ]) }], chr, start, end);
      },
    }),
  },
});

export { Controller, Model, View };
