Genoverse.Track.Controller.Graph.Bar = {
  getClickedFeatures: function (x, y) {
    var yZero     = this.prop('marginTop') - (this.prop('range')[0] * this.track.getYScale());
    var scale     = this.scale;
    var tolerance = scale > 1 ? 0 : 1;

    // Bars with negative values are stored in featurePositions with h < 0.
    // While this works to a certain degree (fillRect allows negative height, drawing upwards from y), it makes them hard to search for in the RTree - to find such a feature you need to search with y = -h and h = y - h + 1
    // It is therefore easier to search featuresByChr (i.e. the genomic positions) for a feature overlapping the x of the click, and then filter those results for y position manually.
    var features = this.prop('featuresByChr')[this.browser.chr].search({
      x: (x - (tolerance / 2)) / scale,
      y: 0,
      w: (1 + tolerance) / scale,
      h: 1
    });

    if (features.length) {
      if (
        (y <  yZero && features.filter(function (f) { return f.position[scale].bounds.y + f.position[scale].bounds.h <= y && f.position[scale].bounds.y >= y; }).length === 0) ||
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

    var start = features[0].start;
    var end   = features[features.length - 1].end;
    var avg   = features[0].start !== features[features.length - 1].start;
    var menu  = { title: features[0].chr + ':' + (start === end ? start : start + '-' + end) };
    var values, i;

    function getValues(_features) {
      var values = _features.map(function (f) { return f.height; }).sort(function (a, b) { return a - b; });

      return {
        avg: values.reduce(function (n, v) { return n + v; }, 0) / values.length,
        min: values[0],
        max: values[values.length - 1]
      };
    }

    if (avg) {
      if (features.length === 1) {
        values = getValues(features);

        menu['Average value'] = values.avg;
        menu['Min value']     = values.min;
        menu['Max value']     = values.max;
      } else {
        menu = [ menu ];

        var datasets = this.prop('datasets');
        var featuresByDataset;

        if (datasets.length) {
          featuresByDataset = datasets.reduce(function (hash, d) { hash[d.name] = []; return hash; }, {});

          for (i = 0; i < features.length; i++) {
            featuresByDataset[features[i].dataset].push(features[i]);
          }
        } else {
          datasets          = [{ name: '' }];
          featuresByDataset = { '': features };
        }

        for (i = 0; i < datasets.length; i++) {
          values = getValues(featuresByDataset[datasets[i].name]);

          menu.push($.extend({
            Average : values.avg,
            Min     : values.min,
            Max     : values.max
          }, datasets[i].name ? { title: datasets[i].name } : {}));
        }
      }
    } else {
      if (features.length === 1) {
        menu.Value = features[0].height;
      } else {
        for (i = 0; i < features.length; i++) {
          menu[features[i].dataset] = features[i].height;
        }
      }
    }

    return menu;
  }
};

Genoverse.Track.Model.Graph.Bar = Genoverse.Track.Model.Graph.extend({
  insertFeature: function (feature) {
    var datasets = this.prop('datasets');

    if (datasets.length) {
      feature.legend = feature.dataset;
      feature.color  = (datasets.filter(function (s) { return s.name === feature.dataset; })[0] || { color: this.color }).color;
    }

    feature.id = feature.id || [ feature.chr, feature.start, feature.end, feature.dataset || '' ].join(':');

    return this.base.apply(this, arguments);
  }
});

Genoverse.Track.View.Graph.Bar = Genoverse.Track.View.Graph.extend({
  scaleFeatures: function (features, scale) {
    var yScale = this.track.getYScale();
    var zeroY  = this.prop('marginTop') - this.prop('range')[0] * yScale;

    features = this.base(features, scale);

    for (var i = 0; i < features.length; i++) {
      features[i].position[scale].height = features[i].height * yScale;
      features[i].position[scale].y      = zeroY;
    }

    return features;
  },

  draw: function (features, featureContext, labelContext, scale) {
    var datasets     = this.featureDataSets(features);
    var marginBottom = this.prop('margin');
    var binSize      = scale < 1 ? Math.ceil(1 / scale) : 0;
    var conf, set, setFeatures, j, binnedFeatures, binStart, bin, f;

    var defaults = {
      color       : this.color,
      globalAlpha : this.prop('globalAlpha')
    };

    for (var i = 0; i < datasets.list.length; i++) {
      conf        = $.extend({}, defaults, datasets.list[i]);
      set         = datasets.list[i].name;
      setFeatures = $.extend(true, [], datasets.features[set] || []);

      if (!setFeatures.length) {
        continue;
      }

      if (binSize) {
        binnedFeatures = [];
        j              = 0;

        while (j < setFeatures.length) {
          binStart = setFeatures[j].start;
          bin      = [];

          while (setFeatures[j] && setFeatures[j].start - binStart < binSize) {
            bin.push(setFeatures[j++]);
          }


          f = $.extend(true, {}, bin[0], {
            height : bin.reduce(function (a, b) { return a + b.height; }, 0) / bin.length,
            end    : bin[bin.length - 1].end
          });

          [ 'H', 'W', 'height', 'width' ].forEach(function (attr) {
            f.position[scale][attr] = bin.reduce(function (a, b) { return a + b.position[scale][attr]; }, 0) / bin.length;
          });

          binnedFeatures.push(f);
        }

        setFeatures = binnedFeatures;
      }

      for (j = 0; j < setFeatures.length; j++) {
        setFeatures[j].color = conf.color;
      }

      featureContext.globalAlpha = conf.globalAlpha;

      this.base(setFeatures, featureContext, labelContext, scale);
    }

    // Don't allow features to be drawn in the margins
    featureContext.clearRect(0, 0,                                  this.width, this.prop('marginTop') - 1);
    featureContext.clearRect(0, this.prop('height') - marginBottom, this.width, marginBottom);
  }
});

Genoverse.Track.Graph.Bar = Genoverse.Track.Graph.extend({
  type      : 'Bar',
  model     : Genoverse.Track.Model.Graph.Bar,
  view      : Genoverse.Track.View.Graph.Bar,
  threshold : 500000,

  10000: $.extend( // Switch to line graph at 10000bp region
    Object.keys(Genoverse.Track.Graph.Line.prototype).reduce(function (hash, key) {
      if (Genoverse.Track.Graph.Line.prototype.hasOwnProperty(key) && !Base.prototype[key]) {
        hash[key] = Genoverse.Track.Graph.Line.prototype[key];
      }

      return hash;
    }, {}), {
    fill  : true,
    model : Genoverse.Track.Model.Graph.Line.extend({
      parseData: function (data, chr, start, end) {
        var coords = [];
        var j;

        for (var i = 0; i < data.length; i++) {
          for (j = data[i].start; j < data[i].end; j++) {
            coords.push([ j, data[i].height ]);
          }
        }

        return this.base([{ chr: chr, start: start, end: end, coords: coords }], chr, start, end);
      }
    })
  }),
  50000: $.extend( // Switch to sparser line graph at 50000bp region
    Object.keys(Genoverse.Track.Graph.Line.prototype).reduce(function (hash, key) {
      if (Genoverse.Track.Graph.Line.prototype.hasOwnProperty(key) && !Base.prototype[key]) {
        hash[key] = Genoverse.Track.Graph.Line.prototype[key];
      }

      return hash;
    }, {}), {
    fill  : true,
    model : Genoverse.Track.Model.Graph.Line.extend({
      parseData: function (data, chr, start, end) {
        return this.base([{ chr: chr, start: start, end: end, coords: data.map(function (d) { return [ d.start, d.height ]; }) }], chr, start, end);
      }
    })
  })
});