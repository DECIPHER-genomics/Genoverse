Genoverse.Track.Controller.Graph.Line = Genoverse.Track.Controller.Graph.extend({
  yCoordsFromFeatures: function (features) {
    return features.reduce(function (arr, f) { return arr.concat(f.coords.map(function (c) { return c[1] })); }, []);
  },

  click: function () {
    if (this.prop('showPopups')) {
      this.prop('menus').hide(); // Hide first, because closeMenus causes fadeOut to happen, which doens't look great in this scenario
      this.browser.closeMenus(this);
      return this.base.apply(this, arguments);
    }
  },

  getClickedFeatures: function (x, y) {
    var bounds    = { x: x, y: 0, w: 1, h: 9e99 };
    var features  = this.featurePositions.search(bounds);
    var tolerance = this.scale > 1 ? 0 : 1 / this.scale;
    var xMid      = bounds.x / this.scale;
    var xRange    = tolerance ? [ Math.floor(xMid - tolerance), Math.ceil(xMid + tolerance) ] : [ Math.floor(xMid), Math.floor(xMid) ];

    return [
      this.model.sortFeatures(features.map(function (f) {
        return $.extend(true, {}, f, { clickedCoords: f.coords.filter(function (c) { return c[0] >= xRange[0] && c[0] <= xRange[1]; }) });
      }))
    ];
  },

  populateMenu: function (features) {
    if (!features.length || !features[0].clickedCoords.length) {
      return [];
    }

    var start = features[0].clickedCoords[0][0];
    var end   = features[0].clickedCoords[features[0].clickedCoords.length - 1][0];
    var avg   = start !== end;
    var menu  = { title: features[0].chr + ':' + (start === end ? start : start + '-' + end) };
    var m, values;

    function getValues(coords) {
      var values = coords.map(function (c) { return c[1]; }).sort(function (a, b) { return a - b });

      return {
        avg: values.reduce(function (n, v) { return n + v; }, 0) / values.length,
        min: values[0],
        max: values[values.length - 1]
      };
    }

    if (avg) {
      if (features.length === 1) {
        values = getValues(features[0].clickedCoords);

        menu['Average value'] = values.avg;
        menu['Min value']     = values.min;
        menu['Max value']     = values.max;
      } else {
        menu = [ menu ];

        for (var i = 0; i < features.length; i++) {
          values    = getValues(features[i].clickedCoords);
          m         = { title: features[i].dataset };
          m.Average = values.avg;
          m.Min     = values.min;
          m.Max     = values.max;

          menu.push(m);
        }
      }
    } else {
      if (features.length === 1) {
        menu.Value = features[0].clickedCoords[0][1];
      } else {
        for (var i = 0; i < features.length; i++) {
          menu[features[i].dataset] = features[i].clickedCoords[0][1];
        }
      }
    }

    return menu;
  }
});

Genoverse.Track.Model.Graph.Line = Genoverse.Track.Model.Graph.extend({
  parseData: function (data, chr, start, end) {
    var features = [];
    var feature, x;

    function getX(f) {
      return typeof f.x !== 'undefined' ? f.x : f.start + (f.start === f.end ? 0 : (f.end - f.start + 1) / 2);
    }

    data.sort(function (a, b) { return (a.start - b.start) || (a.x - b.x); })

    for (var i = 0; i < data.length; i++) {
      if (typeof data[i].y !== 'undefined' && !data[i].coords) {
        x = getX(data[i]);

        if (feature && feature.coords[feature.coords.length - 1][0] === x - 1) {
          feature.coords.push([ x, data[i].y ]);
          feature.end = x;
        } else {
          if (feature) {
            features.push(feature);
          }

          feature = $.extend({ coords: [[ x, data[i].y ]], start: x, end: x }, data[i]);
        }
      } else {
        if (feature) {
          features.push(feature);
          feature = undefined;
        }

        features.push(data[i]);
      }
    }

    if (feature) {
      features.push(feature);
    }

    return this.base(features, chr, start, end);
  },

  insertFeature: function (feature) {
    var datasets         = this.prop('datasets');
    var featureTree      = this.features(feature.chr);
    var bounds           = { x: feature.start, y: 0, w: feature.end - feature.start + 1, h: 1 };
    var existingFeatures = this.sortFeatures(featureTree.search(bounds));
    var x, removeExisting;

    if (feature.coords) {
      feature.coords = feature.coords.map(function (c, i) { return c.length > 1 ? c : [ feature.start + i, c ]; }).filter(function (c) { return c[0] >= feature.start && c[0] <= feature.end; });
    } else if (feature.y) {
      feature.coords = [[ feature.start + (feature.start === feature.end ? 0 : (feature.end - feature.start + 1) / 2), feature.y ]];
    } else {
      feature.coords = [];
    }

    if (datasets.length) {
      feature.legend = feature.dataset;
      feature.color  = (datasets.filter(function (s) { return s.name === feature.dataset; })[0] || { color: this.color }).color;

      existingFeatures = existingFeatures.filter(function (f) { return f.dataset === feature.dataset; });
    }

    for (var i = 0; i < existingFeatures.length; i++) {
      removeExisting = false;

      // new feature is entirely within existing feature
      if (feature.start >= existingFeatures[i].start && feature.end <= existingFeatures[i].end) {
        return;
      }

      // existing feature is entirely within new feature
      if (feature.start < existingFeatures[i].start && feature.end > existingFeatures[i].end) {
        removeExisting = true;
      } else {
        // new feature overlaps existing feature to the right
        if (feature.start > existingFeatures[i].start) {
          x              = feature.coords[0][0];
          removeExisting = true;
          feature.coords = existingFeatures[i].coords.filter(function (c) { return c[0] < x; }).concat(feature.coords);
          feature.start  = existingFeatures[i].start;
        }

        // new feature overlaps existing feature to the left
        if (feature.end < existingFeatures[i].end) {
          x              = feature.coords[feature.coords.length - 1][0];
          removeExisting = true;
          feature.coords = feature.coords.concat(existingFeatures[i].coords.filter(function (c) { return c[0] > x; }));
          feature.end    = existingFeatures[i].end;
        }
      }

      if (removeExisting) {
        featureTree.remove(bounds, existingFeatures[i]);
        delete this.featuresById[existingFeatures[i].id];
      }
    }

    feature.id = feature.id || [ feature.chr, feature.start, feature.end, feature.dataset || '' ].join(':');

    return this.base.apply(this, arguments);
  }
});

Genoverse.Track.View.Graph.Line = Genoverse.Track.View.Graph.extend({
  featureHeight: 1,

  positionFeatures: function (features, params) {
    var scale  = params.scale;
    var yScale = this.track.getYScale();
    var margin = this.prop('marginTop');
    var zeroY  = margin - this.prop('range')[0] * yScale;
    var add    = (scale > 1 ? scale / 2 : 0) - params.scaledStart;

    for (var i = 0; i < features.length; i++) {
      features[i].coordPositions = features[i].coords.map(function (c) { return [ c[0] * scale + add, c[1] * yScale + zeroY ]; });
    }

    params.featureHeight = this.prop('height');

    return this.base(features, params);
  },

  draw: function (features, featureContext, labelContext, scale) {
    if (!features.length) {
      return;
    }

    var datasets     = this.featureDataSets(features);
    var height       = this.prop('height');
    var marginTop    = this.prop('marginTop');
    var marginBottom = this.prop('margin');
    var baseline     = Math.min(Math.max(marginTop, marginTop - this.prop('range')[0] * this.track.getYScale()), height - marginTop);
    var binSize      = scale < 1 ? Math.floor(1 / scale) : 0;
    var set, conf, feature, coords, binnedFeatures, lastBinSize, j, k, c, x;

    var defaults = {
      color       : this.color,
      fill        : this.prop('fill'),
      lineWidth   : this.prop('lineWidth'),
      globalAlpha : this.prop('globalAlpha')
    };

    for (var i = 0; i < datasets.list.length; i++) {
      set  = datasets.list[i].name;
      conf = $.extend({}, defaults, datasets.list[i]);

      for (j = 0; j < (datasets.features[set] || []).length; j++) {
        feature = datasets.features[set][j];
        coords  = feature.coordPositions;

        if (coords.length) {
          if (binSize) {
            binnedFeatures = [];

            for (k = 0; k < coords.length; k += binSize) {
              c = coords.slice(k, k + binSize);
              x = Math.round(c.reduce(function (a, b) { return a + b[0]; }, 0) / c.length);

              if (binnedFeatures.length && x === binnedFeatures[binnedFeatures.length - 1][0]) {
                binnedFeatures[binnedFeatures.length - 1][1] = (binnedFeatures[binnedFeatures.length - 1][1] * lastBinSize + c.reduce(function (a, b) { return a + b[1]; }, 0)) / (lastBinSize + c.length);
              } else {
                binnedFeatures.push([ x, c.reduce(function (a, b) { return a + b[1]; }, 0) / c.length ]);
              }

              lastBinSize = c.length;
            }

            coords = binnedFeatures;
          }

          featureContext.fillStyle = featureContext.strokeStyle = conf.color;
          featureContext.lineWidth = conf.lineWidth;

          if (conf.fill) {
            featureContext.globalAlpha = conf.globalAlpha;
          }

          featureContext.beginPath();

          if (conf.fill) {
            featureContext.moveTo(coords[0][0], baseline);
            featureContext.lineTo.apply(featureContext, coords[0]);
          } else {
            featureContext.moveTo.apply(featureContext, coords[0]);
          }

          for (k = 1; k < coords.length; k++) {
            featureContext.lineTo.apply(featureContext, coords[k]);
          }

          featureContext.stroke();

          if (conf.fill) {
            featureContext.lineTo(coords[coords.length - 1][0], baseline);
            featureContext.closePath();
            featureContext.fill();
            featureContext.globalAlpha = 1;
          }
        }
      }
    }

    // Don't allow features to be drawn in the margins
    featureContext.clearRect(0, 0,                     this.width, marginTop - 1);
    featureContext.clearRect(0, height - marginBottom, this.width, marginBottom);
  }
});

Genoverse.Track.Graph.Line = Genoverse.Track.Graph.extend({
  showPopups : true,      // If true, clicking on the track will show popups. If false, popups will not appear.
  fill       : false,
  lineWidth  : 1,
  controller : Genoverse.Track.Controller.Graph.Line,
  model      : Genoverse.Track.Model.Graph.Line,
  view       : Genoverse.Track.View.Graph.Line
});