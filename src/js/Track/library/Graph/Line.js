import TrackController                                   from '../../Controller';
import Track, { Model as TrackModel, View as TrackView } from '../Graph';

const Controller = {
  click: function (...args) {
    if (this.prop('showPopups')) {
      this.prop('menus').hide(); // Hide first, because closeMenus causes fadeOut to happen, which doens't look great in this scenario
      this.browser.closeMenus(this);

      return TrackController.prototype.click.call(this, ...args);
    }
  },

  getClickedFeatures: function (x) {
    const bounds    = { x: x, y: 0, w: 1, h: 9e99 };
    const tolerance = this.scale > 1 ? 0 : 1 / this.scale;
    const xMid      = bounds.x / this.scale;
    const xRange    = tolerance ? [ Math.floor(xMid - tolerance), Math.ceil(xMid + tolerance) ] : [ Math.floor(xMid), Math.floor(xMid) ];
    const features  = {};

    this.featurePositions.search(bounds).forEach((f) => {
      if (!features[f.dataset]) {
        features[f.dataset] = f;
      }
    });

    return [
      this.model.sortFeatures(
        Object.keys(features).map(
          k => this.browser.jQuery.extend(true, {}, features[k], { clickedCoords: features[k].coords.filter(c => c[0] >= xRange[0] && c[0] <= xRange[1]) })
        )
      ),
    ];
  },

  populateMenu: function (features) {
    if (!features.length || !features[0].clickedCoords.length) {
      return [];
    }

    const start = features[0].clickedCoords[0][0];
    const end   = features[0].clickedCoords[features[0].clickedCoords.length - 1][0];
    const avg   = start !== end;

    let menu = { title: `${features[0].chr}:${start === end ? start : `${start}-${end}`}` };

    function getValues(coords) {
      const vals = coords.map(c => c[1]).sort((a, b) => a - b);

      return {
        avg : vals.reduce((n, v) => n + v, 0) / vals.length,
        min : vals[0],
        max : vals[vals.length - 1],
      };
    }

    if (avg) {
      if (features.length === 1) {
        const values = getValues(features[0].clickedCoords);

        menu['Average value'] = values.avg;
        menu['Min value']     = values.min;
        menu['Max value']     = values.max;
      } else {
        menu = [ menu ];

        features.forEach(
          (feature) => {
            const values = getValues(features.clickedCoords);

            menu.push({
              title   : feature.dataset,
              Average : values.avg,
              Min     : values.min,
              Max     : values.max,
            });
          }
        );
      }
    } else if (features.length === 1) {
      menu.Value = features[0].clickedCoords[0][1];
    } else {
      features.forEach(
        (feature) => {
          menu[feature.dataset] = feature.clickedCoords[0][1];
        }
      );
    }

    return menu;
  },
};

const Model = TrackModel.extend({
  parseData: function (data, chr, start, end) {
    const features = [];

    let feature;

    function getX(f) {
      return typeof f.x !== 'undefined' ? f.x : f.start + (f.start === f.end ? 0 : (f.end - f.start + 1) / 2);
    }

    data.sort(
      (a, b) => (a.start - b.start) || (a.x - b.x)
    ).forEach(
      (f) => {
        if (typeof f.y !== 'undefined' && !f.coords) {
          const x = getX(f);

          if (feature && feature.coords[feature.coords.length - 1][0] === x - 1) {
            feature.coords.push([ x, f.y ]);
            feature.end = x;
          } else {
            if (feature) {
              features.push(feature);
            }

            feature = { coords: [[ x, f.y ]], start: x, end: x, ...f };
          }
        } else {
          if (feature) {
            features.push(feature);
            feature = undefined;
          }

          features.push(f);
        }
      }
    );

    if (feature) {
      features.push(feature);
    }

    return this.base(features, chr, start, end);
  },

  insertFeature: function (feature, ...args) {
    const datasets = this.prop('datasets');

    if (feature.coords) {
      feature.coords = feature.coords.map(
        (c, i) => (c.length > 1 ? c : [ feature.start + i, c ])
      ).filter(
        c => c[0] >= feature.start && c[0] <= feature.end
      );
    } else if (feature.y) {
      feature.coords = [[ feature.start + (feature.start === feature.end ? 0 : (feature.end - feature.start + 1) / 2), feature.y ]];
    } else {
      feature.coords = [];
    }

    if (datasets.length) {
      feature.legend = feature.dataset;
      feature.color  = (datasets.filter(s => s.name === feature.dataset)[0] || { color: this.color }).color;
    }

    feature.id = feature.id || [ feature.chr, feature.start, feature.end, feature.dataset || '' ].join(':');

    return this.base(feature, ...args);
  },
});

const View = TrackView.extend({
  featureHeight: 1,

  positionFeatures: function (features, params) {
    const scale  = params.scale;
    const yScale = this.track.getYScale();
    const margin = this.prop('marginTop');
    const zeroY  = margin - this.prop('range')[0] * yScale;
    const add    = (scale > 1 ? scale / 2 : 0) - params.scaledStart;

    function setCoords(c) {
      return [ c[0] * scale + add, c[1] * yScale + zeroY ];
    }

    features.forEach(
      (feature) => {
        feature.coordPositions = feature.coords.map(setCoords);
      }
    );

    params.featureHeight = this.prop('height');

    return this.base(features, params);
  },

  draw: function (features, featureContext, labelContext, scale) {
    if (!features.length) {
      return;
    }

    const datasets     = this.featureDataSets(features);
    const height       = this.prop('height');
    const marginTop    = this.prop('marginTop');
    const marginBottom = this.prop('margin');
    const baseline     = Math.min(Math.max(marginTop, marginTop - this.prop('range')[0] * this.track.getYScale()), height - marginTop);
    const binSize      = scale < 1 ? Math.floor(1 / scale) : 0;

    const defaults = {
      color       : this.color,
      fill        : this.prop('fill'),
      lineWidth   : this.prop('lineWidth'),
      globalAlpha : this.prop('globalAlpha'),
    };

    datasets.list.forEach(
      (config) => {
        const conf = { ...defaults, ...config };
        const set  = config.name;

        let prevFeature;
        let prevCoords;

        (datasets.features[set] || []).forEach(
          (feature, i) => {
            let coords = feature.coordPositions;

            if (coords.length) {
              if (binSize) {
                const binnedFeatures = [];

                let lastBinSize = 0;
                let j           = 0;

                while (j < coords.length) {
                  const binStart = feature.coords[j][0];

                  let bin = [];

                  while (coords[j] && feature.coords[j][0] - binStart < binSize) {
                    bin.push(coords[j++]);
                  }

                  const l = bin.length;

                  bin = bin.reduce(
                    (arr, b) => {
                      arr[0] += b[0]; arr[1] += b[1];

                      return arr;
                    },
                    [ 0, 0 ]
                  );

                  bin[0] = Math.round(bin[0] / l);

                  if (binnedFeatures.length && bin[0] === binnedFeatures[binnedFeatures.length - 1][0]) {
                    binnedFeatures[binnedFeatures.length - 1][1] = (binnedFeatures[binnedFeatures.length - 1][1] * lastBinSize + bin[1]) / (lastBinSize + l);
                  } else {
                    binnedFeatures.push([ bin[0], bin[1] / l ]);
                  }

                  lastBinSize = l;
                }

                coords               = binnedFeatures;
                feature.binnedCoords = coords;
              }

              featureContext.fillStyle = featureContext.strokeStyle = conf.color;
              featureContext.lineWidth = conf.lineWidth;

              if (conf.fill) {
                featureContext.globalAlpha = conf.globalAlpha;
              }

              featureContext.beginPath();

              if (conf.fill) {
                featureContext.moveTo(coords[0][0], baseline);
                featureContext.lineTo(...coords[0]);
              } else {
                featureContext.moveTo(...coords[0]);
              }

              coords.forEach(
                coord => featureContext.lineTo(...coord)
              );

              featureContext.stroke();

              if (conf.fill) {
                featureContext.lineTo(coords[coords.length - 1][0], baseline);
                featureContext.closePath();
                featureContext.fill();
              }

              prevFeature = i ? datasets.features[set][i - i] : undefined;

              if (prevFeature && prevFeature.end === feature.start - 1) {
                featureContext.beginPath();

                prevCoords = (binSize ? prevFeature.binnedCoords : prevFeature.coordPositions).slice(-1);

                featureContext.moveTo(...prevCoords[0]);
                featureContext.lineTo(...coords[0]);
                featureContext.stroke();

                if (conf.fill) {
                  featureContext.lineTo(coords[0][0], baseline);
                  featureContext.lineTo(prevCoords[0][0], baseline);

                  featureContext.closePath();
                  featureContext.fill();
                }
              }

              if (conf.fill) {
                featureContext.globalAlpha = 1;
              }
            }
          }
        );
      }
    );

    // Don't allow features to be drawn in the margins
    featureContext.clearRect(0, 0,                     this.width, marginTop - 1);
    featureContext.clearRect(0, height - marginBottom, this.width, marginBottom);
  },
});

export default Track.extend({
  type       : 'Line',
  showPopups : true, // If true, clicking on the track will show popups. If false, popups will not appear.
  fill       : false,
  lineWidth  : 1,
  model      : Model,
  view       : View,
});

export { Controller, Model, View };
