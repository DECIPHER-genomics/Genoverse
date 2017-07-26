Genoverse.Track.Controller.LineGraph = Genoverse.Track.Controller.extend({
  setYRange: function (min, max) {
    if (this.browser.dragging) {
      return;
    }

    if (this.prop('showZeroY')) {
      this.prop('range', [ Math.min(min, 0), Math.max(max, 0) ]);
    } else {
      this.prop('range', [ min, max ]);
    }

    this.track.reset();
  },

  yCoordsFromFeatures: function (features) {
    return features.reduce(function (arr, f) { return arr.concat(f.coords.map(function (c) { return c[1] })); }, []);
  },

  afterSetName: function () {
    this.minLabelHeight = Math.max(this.minLabelHeight, this.prop('fontHeight') * 2 + this.prop('margin') + this.prop('marginTop')); // Minimum height that can contain axis labels for range[0] and range[1]
  },

  visibleFeatureHeight: function () {
    if (this.prop('rescaleable') === 'auto') {
      var yScale = this.track.getYScale();
      var y      = this.yCoordsFromFeatures(this.model.findFeatures(this.browser.chr, this.browser.start, this.browser.end));

      return Math.ceil(Math.max(yScale * (Math.max.apply(null, y) - Math.min.apply(null, y)), this.prop('hideEmpty') ? 0 : this.minLabelHeight));
    }

    return this.prop('height');
  },

  resize: function () {
    var prevHeight = this.prop('height');
    var rtn        = this.base.apply(this, arguments);
    var height     = this.prop('height');

    if (prevHeight !== height) {
      if (this.prop('rescaleable') === true) {
        var prevRange     = this.prop('range');
        var maxDP         = Math.max.apply(null, prevRange.map(function (r) { return (r.toString().split('.')[1] || '').length; }));
        var prevRangeSize = prevRange[1] - prevRange[0];
        var rangeChange   = Math.ceil((prevRangeSize * (height / prevHeight) - prevRangeSize) / 2);

        this.setYRange(
          parseFloat((prevRange[0] - rangeChange).toFixed(maxDP), 10),
          parseFloat((prevRange[1] + rangeChange).toFixed(maxDP), 10)
        );
      } else {
        this.track.reset();
      }
    }

    (this.prop('expander') || $()).hide();
    (this.prop('resizer')  || $()).removeClass('gv-resizer-expander');

    return rtn;
  },

  autoResize: function () {
    if (this.prop('rescaleable') === 'auto') {
      var visibleFeatures = this.model.findFeatures(this.browser.chr, this.browser.start, this.browser.end);

      if (visibleFeatures.length) {
        var range = this.prop('range');
        var y     = this.yCoordsFromFeatures(visibleFeatures);

        if (y.length) {
          var maxDP = Math.max.apply(null, range.map(function (r) { return (r.toString().split('.')[1] || '').length; }));
          var round = Math.pow(10, maxDP);
          var minY  = parseFloat((Math.floor(Math.min.apply(null, y) * round) / round).toFixed(maxDP), 10);
          var maxY  = parseFloat((Math.ceil (Math.max.apply(null, y) * round) / round).toFixed(maxDP), 10);

          if (this.prop('showZeroY')) {
            minY = Math.min(minY, 0);
            maxY = Math.max(maxY, 0);
          }

          if (minY !== range[0] || maxY !== range[1]) {
            return this.setYRange(minY, maxY);
          }
        }
      }
    } else {
      return this.base.apply(this, arguments);
    }
  },

  makeFirstImage: function () {
    var controller = this;

    return this.base.apply(this, arguments).done(function () {
      controller.prop('yAxisPlaceholder').hide();
      controller.prop('offsetContainer')
        .prepend(controller.prop('guidelinesCanvas'))
        .before(controller.prop('yAxisCanvas').removeClass('gv-loading'));
    });
  },

  click: function () {
    if (this.prop('showPopups')) {
      this.prop('menus').hide(); // Hide first, because closeMenus causes fadeOut to happen, which doens't look great in this scenario
      this.browser.closeMenus(this);
      return this.base.apply(this, arguments);
    }
  },

  getClickedFeatures: function (x, y, target) {
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
    if (!features[0].clickedCoords.length) {
      return [];
    }

    var start = features[0].clickedCoords[0][0];
    var end   = features[0].clickedCoords[features[0].clickedCoords.length - 1][0];
    var avg   = start !== end;
    var menu  = { title: features[0].chr + ':' + (start === end ? start : start + '-' + end) };
    var m, values;

    function getValues(coords) {
      return {
        avg: coords.reduce(function (n, coord) { return n + coord[1] }, 0) / coords.length,
        min: Math.min.apply(null, coords.map(function (c) { return c[1]; })),
        max: Math.max.apply(null, coords.map(function (c) { return c[1]; }))
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

Genoverse.Track.Model.LineGraph = Genoverse.Track.Model.extend({
  dataBuffer: { start: 1, end: 1 },

  setLabelBuffer: $.noop,

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

Genoverse.Track.View.LineGraph = Genoverse.Track.View.extend({
  featureMargin: {},
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

    var datasets     = this.prop('datasets').concat({ name: '_default' });
    var height       = this.prop('height');
    var marginTop    = this.prop('marginTop');
    var marginBottom = this.prop('margin');
    var baseline     = Math.min(Math.max(marginTop, marginTop - this.prop('range')[0] * this.track.getYScale()), height - marginTop);
    var binSize      = scale < 1 ? Math.floor(1 / scale) : 1;
    var setNames     = {};
    var sets         = {};
    var set, conf, feature, coords, binnedFeatures, lastBinSize, j, k, c, x;

    var defaults = {
      color       : this.color,
      fill        : this.prop('fill'),
      lineWidth   : this.prop('lineWidth'),
      globalAlpha : this.prop('globalAlpha')
    };

    for (var i = 0; i < datasets.length; i++) {
      setNames[datasets[i].name] = true;
    }

    for (i = 0; i < features.length; i++) {
      set = setNames[features[i].dataset] ? features[i].dataset : '_default';

      sets[set] = sets[set] || [];
      sets[set].push(features[i]);
    }

    for (i = 0; i < datasets.length; i++) {
      set  = datasets[i].name;
      conf = $.extend({}, defaults, datasets[i]);

      for (j = 0; j < (sets[set] || []).length; j++) {
        feature = sets[set][j];
        coords  = feature.coordPositions;

        if (coords.length) {
          if (scale < 1) {
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

Genoverse.Track.LineGraph = Genoverse.Track.extend({
  margin       : 10,        // Same as fontHeight - needed to allow axis labels for range[0] and range[1] to be drawn without being cut off by the edge of the image
  invert       : true,
  yAxisLabels  : undefined, // An array of numerical labels for the y-axis. Should not be configured manually if the track is resizable.
  yRange       : undefined, // An array of [ minY, maxY ] for the graph
  showZeroY    : true,      // If true, 0 will always be included in auto-generated yRanges. If yRange is defined in configuration, this setting will be ignored.
  showPopups   : true,      // If true, clicking on the track will show popups. If false, popups will not appear.
  fill         : false,
  lineWidth    : 1,
  globalAlpha  : 1,
  axesSettings : { axisColor: 'black', axisLabelColor: 'black', scaleLineColor: '#E5E5E5' },
  datasets     : [],
  legend       : true,

  /*
   * resizable and rescaleableY combine to define what happens when the track "resizes", as follows:
   * resizable | rescaleableY | Effect
   * --------- | ------------ | ------
   * true      | true         | Users can change the track height, and doing so changes the y-axis range (y-axis range will change proportionally to track height change)
   * true      | 'auto'       | Users can change the track height, and doing so does not change the y-axis range. However, the y-axis range will automatically change so that no peaks are cut off.
   * true      | false        | Users can change the track height, and doing so does not change the y-axis range (peak heights will change proportionally to track height change)
   * false     | true         | Like true/true
   * false     | 'auto'       | Track height cannot be changed, but the y-axis range will automatically change so that no peaks are cut off
   * false     | false        | Neither track height nor y-axis range can be changed, either by users or automatically
   * 'auto'    | true         | Like false/'auto'
   * 'auto'    | 'auto'       | Like false/'auto'
   * 'auto'    | false        | Like false/'auto' (it is not possible to change a track's height such that no peaks are cut off without being able to change the y-axis range)
   */
  resizable    : true,
  rescaleableY : 'auto',

  controller : Genoverse.Track.Controller.LineGraph,
  model      : Genoverse.Track.Model.LineGraph,
  view       : Genoverse.Track.View.LineGraph,

  setDefaults: function () {
    this.range       = this.yRange || [ 0, this.height ];
    this.rescaleable = this.rescaleableY;

    if ($.isPlainObject(this.margin)) {
      if (this.invert) {
        this.marginTop = this.margin.bottom;
        this.margin    = this.margin.top;
      } else {
        this.marginTop = this.margin.top;
        this.margin    = this.margin.bottom;
      }
    }

    this.marginTop = typeof this.marginTop === 'number' ? this.marginTop : this.margin;

    if (this.resizable === false) {
      this.resizable = this.rescaleable;
    } else if (this.resizable === 'auto') {
      this.rescaleable = 'auto';
    }

    this.base.apply(this, arguments);

    if (this.legend && !this.datasets.length) {
      this.legend = false;
    }

    this.height        += this.marginTop;
    this.initialHeight += this.marginTop;
  },

  setHeight: function (height) {
    return this.base(height, true); // always force show
  },

  setMVC: function () {
    var hadController = this.controller instanceof Genoverse.Track.Controller;
    var rtn           = this.base.apply(this, arguments);

    if (!hadController) {
      var scrollContainer = this.prop('scrollContainer');

      this.yAxisPlaceholder = $('<div class="gv-image-container gv-loading">');
      this.yAxisCanvas      = $('<canvas class="gv-image-container gv-barchart-axis">' ).attr('width', this.width);
      this.guidelinesCanvas = $('<canvas class="gv-image-container gv-barchart-guide">').attr('width', this.width);

      if (this.disabled) {
        this.yAxisCanvas.add(this.guidelinesCanvas).attr('height', 0);
      }

      this.offsetContainer = $('<div class="gv-scroll-container-offset">')
        .width(this.width)
        .insertAfter(scrollContainer)
        .append(scrollContainer)
        .before(this.yAxisPlaceholder)

      this.drawAxes();
    }

    return rtn;
  },

  afterSetMVC: function () {
    // Never show the control to switch between auto-height and manual resizing, since its behaviour is not the same here as for standard tracks, due to interactions between resizable and rescaleableY.
    (this.prop('heightToggler') || $()).addClass('gv-hidden');
    (this.prop('resizer')       || $()).off('click');
  },

  reset: function () {
    this.drawAxes();
    return this.base.apply(this, arguments);
  },

  enable: function () {
    var wasDisabled = this.disabled;
    var rtn         = this.base.apply(this, arguments);

    if (wasDisabled) {
      this.drawAxes();
    }

    return rtn;
  },

  getYScale: function () {
    var range  = this.prop('range');
    var yScale = (this.prop('height') - this.prop('margin') - this.prop('marginTop')) / (range[1] - range[0]);

    return yScale;
  },

  drawAxes: function () {
    if (this.prop('disabled')) {
      return;
    }

    var width        = this.width;
    var height       = this.prop('height');
    var invert       = this.prop('invert');
    var margin       = this.prop('margin');
    var marginTop    = this.prop('marginTop');
    var fontHeight   = this.prop('fontHeight');
    var range        = this.prop('range');
    var axesSettings = this.prop('axesSettings');
    var yAxisLabels  = this.prop('yAxisLabels');
    var yScale       = this.getYScale();
    var axisContext  = this.prop('yAxisCanvas'     ).attr('height', height)[0].getContext('2d');
    var linesContext = this.prop('guidelinesCanvas').attr('height', height)[0].getContext('2d');
    var y, n, i, interval, maxDP;

    if (!yAxisLabels) {
      n           = Math.floor((height - margin - marginTop) / (fontHeight * 2)); // number of labels that can be shown
      interval    = (range[1] - range[0]) / n;                                    // label incrementor
      yAxisLabels = [];

      if (interval !== Math.round(interval)) { // floats
        // Strenuously ensure that interval does not contain a floating point error.
        // Assumes that values in range do not contain floating point errors.
        maxDP = Math.max.apply(null, range.map(function (r) { return (r.toString().split('.')[1] || '').length; })) + 1;
      }

      for (i = 0; i <= n; i++) {
        yAxisLabels.push((range[0] + interval * i)[maxDP ? 'toFixed' : 'toString'](maxDP));
      }
    }

    var axisWidth = Math.max.apply(null, yAxisLabels.map(function (label) { return axisContext.measureText(label).width; })) + 10;

    this.prop('offsetContainer').css('marginLeft',  axisWidth).width(width - axisWidth);
    this.prop('scrollContainer').css('marginLeft', -axisWidth);

    this.prop('yAxisPlaceholder').width(axisWidth).show();

    axisContext.fillStyle = axesSettings.axisColor;
    axisContext.fillRect(axisWidth - 1, invert ? margin : marginTop, 1, height - margin - marginTop); // Vertical line

    linesContext.fillStyle  = axesSettings.scaleLineColor;
    axisContext.fillStyle    = axesSettings.axisLabelColor;
    axisContext.textBaseline = 'middle';
    axisContext.textAlign    = 'right';

    for (i = 0; i < yAxisLabels.length; i++) {
      y = marginTop + (parseFloat(yAxisLabels[i], 10) - range[0]) * yScale;
      y = invert ? height - y : y;

      linesContext.fillRect(0, y, width, 1);                 // Horizontal line, indicating the y-position of a numerical value
      axisContext.fillRect(axisWidth - 4, y, 4, 1);           // Horizontal line, indicating the y-position of a numerical value
      axisContext.fillText(yAxisLabels[i], axisWidth - 6, y); // The numerical value for the horizontal line
    }

    // Draw a horizontal line at y = 0
    y = (-range[0] * yScale) + marginTop;
    linesContext.fillStyle = axesSettings.axisColor;
    linesContext.fillRect(0, invert ? height - y : y, width, 1);
  }
});