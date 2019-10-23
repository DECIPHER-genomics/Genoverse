// These are abstract classes, implemented by Graph.Bar and Graph.Line. They will not work properly on their own.

Genoverse.Track.Controller.Graph = Genoverse.Track.Controller.extend({
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

  yMinMaxFromFeatures: function (features) {
    var min =  Infinity;
    var max = -Infinity;
    var i, j;

    if (this.prop('type') === 'Line') {
      for (i = 0; i < features.length; i++) {
        for (j = 0; j < features[i].coords.length; j++) {
          if (!isNaN(features[i].coords[j][1])) {
            min = Math.min(min, features[i].coords[j][1]);
            max = Math.max(max, features[i].coords[j][1]);
          }
        }
      }
    } else {
      for (i = 0; i < features.length; i++) {
        if (!isNaN(features[i].height)) {
          min = Math.min(min, features[i].height);
          max = Math.max(max, features[i].height);
        }
      }
    }

    min = min ===  Infinity ? 0 : min;
    max = max === -Infinity ? 0 : max;

    return { min: min, max: max };
  },

  afterSetName: function () {
    this.minLabelHeight = Math.max(this.minLabelHeight, this.prop('fontHeight') * 2 + this.prop('margin') + this.prop('marginTop')); // Minimum height that can contain axis labels for range[0] and range[1]
  },

  visibleFeatureHeight: function () {
    if (this.prop('rescaleable') === 'auto') {
      var yScale = this.track.getYScale();
      var y      = this.yMinMaxFromFeatures(this.model.findFeatures(this.browser.chr, this.browser.start, this.browser.end));

      return Math.ceil(Math.max(yScale * (y.max - y.min), this.prop('hideEmpty') ? 0 : this.minLabelHeight));
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
        var y     = this.yMinMaxFromFeatures(visibleFeatures);

        if (y.min || y.max) {
          var maxDP = Math.max.apply(null, range.map(function (r) { return (r.toString().split('.')[1] || '').length; }));
          var round = Math.pow(10, maxDP);
          var minY  = parseFloat((Math.floor(y.min * round) / round).toFixed(maxDP), 10);
          var maxY  = parseFloat((Math.ceil (y.max * round) / round).toFixed(maxDP), 10);

          if (this.prop('showZeroY')) {
            minY = Math.min(minY, 0);
            maxY = Math.max(maxY, 0);
          }

          if (minY === maxY) {
            maxY++;
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

  typeWrapper        : function (func, args) { return (Genoverse.Track.Controller.Graph[this.prop('type')][func] || Genoverse.Track.Controller.prototype[func]).apply(this, args); },
  click              : function () { return this.typeWrapper('click',              arguments); },
  getClickedFeatures : function () { return this.typeWrapper('getClickedFeatures', arguments); },
  populateMenu       : function () { return this.typeWrapper('populateMenu',       arguments); }
});

Genoverse.Track.Model.Graph = Genoverse.Track.Model.extend({
  dataBuffer     : { start: 1, end: 1 },
  setLabelBuffer : $.noop,
  sortFeatures   : function (features) { return features.sort(function (a, b) { return a.start - b.start; }); }
});

Genoverse.Track.View.Graph = Genoverse.Track.View.extend({
  featureMargin: {},

  featureDataSets: function (features) {
    var datasets = this.prop('datasets').concat({ name: '_default' });
    var setNames = {};
    var sets     = {};

    for (var i = 0; i < datasets.length; i++) {
      setNames[datasets[i].name] = true;
    }

    for (i = 0; i < features.length; i++) {
      set = setNames[features[i].dataset] ? features[i].dataset : '_default';

      sets[set] = sets[set] || [];
      sets[set].push(features[i]);
    }

    return { list: datasets, features: sets };
  }
});

Genoverse.Track.Graph = Genoverse.Track.extend({
  controller   : Genoverse.Track.Controller.Graph,
  margin       : 10,        // Same as fontHeight - needed to allow axis labels for range[0] and range[1] to be drawn without being cut off by the edge of the image
  invert       : true,
  yAxisLabels  : undefined, // An array of numerical labels for the y-axis. Should not be configured manually if the track is resizable.
  yRange       : undefined, // An array of [ minY, maxY ] for the graph
  showZeroY    : true,      // If true, 0 will always be included in auto-generated yRanges. If yRange is defined in configuration, this setting will be ignored.
  globalAlpha  : 1,
  axesSettings : { axisColor: 'black', axisLabelColor: 'black', scaleLineColor: '#E5E5E5' },
  datasets     : [],
  legend       : true,
  labels       : false,

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
        .before(this.yAxisPlaceholder);

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

      linesContext.fillRect(0, y, width, 1);                  // Horizontal line, indicating the y-position of a numerical value
      axisContext.fillRect(axisWidth - 4, y, 4, 1);           // Horizontal line, indicating the y-position of a numerical value
      axisContext.fillText(yAxisLabels[i], axisWidth - 6, y); // The numerical value for the horizontal line
    }

    // Draw a horizontal line at y = 0
    y = (-range[0] * yScale) + marginTop;
    linesContext.fillStyle = axesSettings.axisColor;
    linesContext.fillRect(0, invert ? height - y : y, width, 1);
  }
});
