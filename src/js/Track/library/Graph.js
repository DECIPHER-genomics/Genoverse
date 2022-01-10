// These are abstract classes, implemented by Graph.Bar and Graph.Line. They will not work properly on their own.

import Track, { Controller as TrackController, Model as TrackModel, View as TrackView } from 'js/Track';

const Controller = TrackController.extend({
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
    let min =  Infinity;
    let max = -Infinity;

    if (this.prop('type') === 'Line') {
      features.forEach(
        ({ coords }) => coords.forEach(
          ([ , y ]) => {
            if (!isNaN(y)) {
              min = Math.min(min, y);
              max = Math.max(max, y);
            }
          }
        )
      );
    } else {
      features.forEach(
        ({ height }) => {
          if (!isNaN(height)) {
            min = Math.min(min, height);
            max = Math.max(max, height);
          }
        }
      );
    }

    min = min ===  Infinity ? 0 : min;
    max = max === -Infinity ? 0 : max;

    return { min, max };
  },

  afterSetName: function () {
    this.minLabelHeight = Math.max(this.minLabelHeight, this.prop('fontHeight') * 2 + this.prop('margin') + this.prop('marginTop')); // Minimum height that can contain axis labels for range[0] and range[1]
  },

  visibleFeatureHeight: function () {
    if (this.prop('rescaleable') === 'auto') {
      const yScale = this.track.getYScale();
      const y      = this.yMinMaxFromFeatures(this.model.findFeatures(this.browser.chr, this.browser.start, this.browser.end));

      return Math.ceil(Math.max(yScale * (y.max - y.min), this.prop('hideEmpty') ? 0 : this.minLabelHeight));
    }

    return this.prop('height');
  },

  resize: function (...args) {
    const prevHeight = this.prop('height');
    const rtn        = this.base(...args);
    const height     = this.prop('height');

    if (prevHeight !== height) {
      if (this.prop('rescaleable') === true) {
        const prevRange     = this.prop('range');
        const maxDP         = Math.max.apply(null, prevRange.map(r => (r.toString().split('.')[1] || '').length));
        const prevRangeSize = prevRange[1] - prevRange[0];
        const rangeChange   = Math.ceil((prevRangeSize * (height / prevHeight) - prevRangeSize) / 2);

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

  autoResize: function (...args) {
    if (this.prop('rescaleable') === 'auto') {
      const visibleFeatures = this.model.findFeatures(this.browser.chr, this.browser.start, this.browser.end);

      if (visibleFeatures.length) {
        const range = this.prop('range');
        const y     = this.yMinMaxFromFeatures(visibleFeatures);

        if (y.min || y.max) {
          const maxDP = Math.max.apply(null, range.map(r => (r.toString().split('.')[1] || '').length));
          const round = 10 ** maxDP;

          let minY = parseFloat((Math.floor(y.min * round) / round).toFixed(maxDP), 10);
          let maxY = parseFloat((Math.ceil(y.max * round) / round).toFixed(maxDP), 10);

          if (this.prop('showZeroY')) {
            minY = Math.min(minY, 0);
            maxY = Math.max(maxY, 0);
          }

          if (minY === maxY) {
            maxY++;
          }

          if (minY !== range[0] || maxY !== range[1]) {
            this.setYRange(minY, maxY);
          }
        }
      }
    } else {
      this.base(...args);
    }
  },

  makeFirstImage: function (...args) {
    const controller = this;

    return this.base(...args).done(() => {
      controller.prop('yAxisPlaceholder').hide();
      controller.prop('offsetContainer')
        .prepend(controller.prop('guidelinesCanvas'))
        .before(controller.prop('yAxisCanvas').removeClass('gv-loading'));
    });
  },

  typeWrapper: function (func, ...args) {
    const controllerType = Controller[this.prop('type')] || Controller.prototype;    // Controller[this.prop('type')] will only exist if Controller.Bar or Controller.Line have been imported

    return (controllerType[func] || Controller.prototype[func]).call(this, ...args); // if Controller[this.prop('type')] exists but Controller[this.prop('type')][func] does not, fall back to Controller.prototype[func]
  },
  click              : function (...args) { return this.typeWrapper('click',              ...args); },
  getClickedFeatures : function (...args) { return this.typeWrapper('getClickedFeatures', ...args); },
  populateMenu       : function (...args) { return this.typeWrapper('populateMenu',       ...args); },
});

const Model = TrackModel.extend({
  dataBuffer     : { start: 1, end: 1 },
  setLabelBuffer : () => {},
  sortFeatures   : function (features) { return features.sort((a, b) => a.start - b.start); },
});

const View = TrackView.extend({
  featureMargin: {},

  featureDataSets: function (features) {
    const datasets = this.prop('datasets').concat({ name: '_default' });
    const setNames = datasets.reduce(
      (acc, { name }) => Object.assign(acc, { [name]: true }),
      {}
    );

    const sets = features.reduce(
      (acc, feature) => {
        const set = setNames[feature.dataset] ? feature.dataset : '_default';

        acc[set] = acc[set] || [];
        acc[set].push(feature);

        return acc;
      },
      {}
    );

    return { list: datasets, features: sets };
  },
});

export default Track.extend({
  controller   : Controller,
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

  setDefaults: function (...args) {
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

    this.base(...args);

    if (this.legend && !this.datasets.length) {
      this.legend = false;
    }

    this.height        += this.marginTop;
    this.initialHeight += this.marginTop;
  },

  setHeight: function (height) {
    return this.base(height, true); // always force show
  },

  setMVC: function (...args) {
    const hadController = this.controller instanceof TrackController;
    const rtn           = this.base(...args);

    if (!hadController) {
      const scrollContainer = this.prop('scrollContainer');

      this.yAxisPlaceholder = $('<div class="gv-image-container gv-loading">');
      this.yAxisCanvas      = $('<canvas class="gv-image-container gv-barchart-axis">').attr('width', this.width);
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

  reset: function (...args) {
    this.drawAxes();

    return this.base(...args);
  },

  enable: function (...args) {
    const wasDisabled = this.disabled;
    const rtn         = this.base(...args);

    if (wasDisabled) {
      this.drawAxes();
    }

    return rtn;
  },

  getYScale: function () {
    const range  = this.prop('range');
    const yScale = (this.prop('height') - this.prop('margin') - this.prop('marginTop')) / (range[1] - range[0]);

    return yScale;
  },

  drawAxes: function () {
    if (this.prop('disabled')) {
      return;
    }

    const width        = this.width;
    const height       = this.prop('height');
    const invert       = this.prop('invert');
    const margin       = this.prop('margin');
    const marginTop    = this.prop('marginTop');
    const fontHeight   = this.prop('fontHeight');
    const range        = this.prop('range');
    const axesSettings = this.prop('axesSettings');
    const yScale       = this.getYScale();
    const axisContext  = this.prop('yAxisCanvas').attr('height', height)[0].getContext('2d');
    const linesContext = this.prop('guidelinesCanvas').attr('height', height)[0].getContext('2d');

    let yAxisLabels = this.prop('yAxisLabels');
    let maxDP;

    if (!yAxisLabels) {
      const n        = Math.floor((height - margin - marginTop) / (fontHeight * 2)); // number of labels that can be shown
      const interval = (range[1] - range[0]) / n;                                    // label incrementor

      yAxisLabels = [];

      if (interval !== Math.round(interval)) { // floats
        // Strenuously ensure that interval does not contain a floating point error.
        // Assumes that values in range do not contain floating point errors.
        maxDP = Math.max.apply(null, range.map(r => (r.toString().split('.')[1] || '').length)) + 1;
      }

      for (let i = 0; i <= n; i++) {
        yAxisLabels.push((range[0] + interval * i)[maxDP ? 'toFixed' : 'toString'](maxDP));
      }
    }

    const axisWidth = Math.max.apply(null, yAxisLabels.map(label => axisContext.measureText(label).width)) + 10;

    this.prop('offsetContainer').css('marginLeft',  axisWidth).width(width - axisWidth);
    this.prop('scrollContainer').css('marginLeft', -axisWidth);

    this.prop('yAxisPlaceholder').width(axisWidth).show();

    axisContext.fillStyle = axesSettings.axisColor;
    axisContext.fillRect(axisWidth - 1, invert ? margin : marginTop, 1, height - margin - marginTop); // Vertical line

    linesContext.fillStyle   = axesSettings.scaleLineColor;
    axisContext.fillStyle    = axesSettings.axisLabelColor;
    axisContext.textBaseline = 'middle';
    axisContext.textAlign    = 'right';

    yAxisLabels.forEach(
      (label) => {
        let y = marginTop + (parseFloat(label, 10) - range[0]) * yScale;

        y = invert ? height - y : y;

        linesContext.fillRect(0, y, width, 1);         // Horizontal line, indicating the y-position of a numerical value
        axisContext.fillRect(axisWidth - 4, y, 4, 1);  // Horizontal line, indicating the y-position of a numerical value
        axisContext.fillText(label, axisWidth - 6, y); // The numerical value for the horizontal line
      }
    );

    // Draw a horizontal line at y = 0
    const y = (-range[0] * yScale) + marginTop;

    linesContext.fillStyle = axesSettings.axisColor;
    linesContext.fillRect(0, invert ? height - y : y, width, 1);
  },
});

export { Controller, Model, View };
