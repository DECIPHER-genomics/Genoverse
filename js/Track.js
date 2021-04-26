const Genoverse = require("./Genoverse")
const BaseController = require("./Track/Controller")
const BaseModel = require("./Track/Model")
const BaseView = require("./Track/View")
const StrandedController = require("./Track/Controller/Stranded")
const StrandedModel = require("./Track/Model/Stranded")

const Track = Base.extend({
  baseClassName: 'Track',
  height     : 12,        // The height of the gv-track-container div
  margin     : 2,         // The spacing between this track and the next
  resizable  : true,      // Is the track resizable - can be true, false or 'auto'. Auto means the track will automatically resize to show all features, but the user cannot resize it themselves.
  border     : true,      // Does the track have a bottom border
  unsortable : false,     // Is the track unsortable by the user
  fixedOrder : false,     // Is the track unsortable by the user or automatically - use for tracks which always need to go at the top/bottom
  invert     : false,     // If true, features are drawn from the bottom of the track, rather than from the top. This is actually achieved by performing a CSS transform on the gv-image-container div
  legend     : false,     // Does the track have a legend - can be true, false, or a Genoverse.Track.Legend extension/child class.
  children   : undefined, // Does the track have any child tracks - can be one or an array of Genoverse.Track extension/child classes.
  name       : undefined, // The name of the track, which appears in its label
  autoHeight : undefined, // Does the track automatically resize so that all the features are visible
  hideEmpty  : undefined, // If the track automatically resizes, should it be hidden when there are no features, or should an empty track still be shown

  constructor: function (config) {
    if (this.stranded || config.stranded) {
      this.controller = this.controller || StrandedController;
      this.model      = this.model      || StrandedModel;
    }

    this.models = {};
    this.views  = {};

    this.setInterface();
    this.extend(config);
    this.setDefaults();
    this.setEvents();

    Genoverse.wrapFunctions(this);

    this.setLengthMap();
    this.setMVC();

    if (this.browser.scale > 0) {
      this.controller.setScale();
      this.controller.makeFirstImage();
    }

    if (this.children) {
      this.addChildTracks();
    }

    if (this.legend) {
      this.addLegend();
    }
  },

  setEvents: $.noop,

  setDefaults: function () {
    this.config            = this.config         || {};
    this.configSettings    = this.configSettings || {};
    this.defaultConfig     = this.defaultConfig  || {};
    this.controls          = this.controls       || [];
    this.defaultName       = this.name;
    this.configName        = [];
    this.defaultHeight     = this.height;
    this.defaultAutoHeight = this.autoHeight;
    this.autoHeight        = typeof this.autoHeight !== 'undefined' ? this.autoHeight : this.browser.trackAutoHeight;
    this.hideEmpty         = typeof this.hideEmpty  !== 'undefined' ? this.hideEmpty  : this.browser.hideEmptyTracks;
    this.height           += this.margin;
    this.initialHeight     = this.height;

    if (this.resizable === 'auto') {
      this.autoHeight = true;
    }

    this.setDefaultConfig();
  },

  setDefaultConfig: function () {
    for (var i in this.defaultConfig) {
      if (typeof this.config[i] === 'undefined') {
        this.config[i] = this.defaultConfig[i];
      }
    }

    this._setCurrentConfig();
  },

  setInterface: function () {
    var mvc = [ 'Controller', 'Model', 'View', 'controller', 'model', 'view' ];
    var prop;

    this._interface = {};

    for (var i = 0; i < 3; i++) {
      for (prop in Genoverse.Track[mvc[i]].prototype) {
        if (!/^(constructor|init|reset|setDefaults|base|extend|lengthMap)$/.test(prop)) {
          this._interface[prop] = mvc[i + 3];
        }
      }
    }
  },

  setMVC: function () {
    if (this.model && typeof this.model.abort === 'function') { // TODO: don't abort unless model is changed?
      this.model.abort();
    }

    this._defaults = this._defaults || {};

    var settings           = $.extend(true, {}, this.constructor.prototype, this.getSettingsForLength()[1]); // model, view, options
    var controllerSettings = { prop: {}, func: {} };
    var trackSettings      = {};
    var i;

    settings.controller = settings.controller || this.controller || BaseController;

    for (i in settings) {
      if (!/^(constructor|init|reset|setDefaults|base|extend|lengthMap)$/.test(i) && isNaN(i)) {
        if (this._interface[i] === 'controller') {
          controllerSettings[typeof settings[i] === 'function' ? 'func' : 'prop'][i] = settings[i];
        }
        // If we allow trackSettings to overwrite the MVC properties, we will potentially lose of information about instantiated objects that the track needs to perform future switching correctly.
        else if (!Track.prototype.hasOwnProperty(i) && !/^(controller|models|views|config|disabled)$/.test(i)) {
          if (typeof this._defaults[i] === 'undefined') {
            this._defaults[i] = this[i];
          }

          trackSettings[i] = settings[i];
        }
      }
    }

    for (i in this._defaults) {
      if (typeof trackSettings[i] === 'undefined') {
        trackSettings[i] = this._defaults[i];
      }
    }

    // If there are configSettings for the track, ensure that any properties in _currentConfig are set for the model/view/controller/track as appropriate.
    // Functions in _currentConfig are accessed via Genoverse.functionWrap, so nothing needs to be done with them here.
    if (!$.isEmptyObject(this._currentConfig)) {
      var changed = {};
      var type;

      for (i in this._currentConfig.prop) {
        type = this._interface[i];

        if (/model|view/.test(type)) {
          if (trackSettings[type][i] !== this._currentConfig.prop[i]) {
            trackSettings[type][i] = this._currentConfig.prop[i];
            changed[type] = true;
          }
        } else if (type === 'controller') {
          controllerSettings.prop[i] = this._currentConfig.prop[i];
        } else {
          trackSettings[i] = this._currentConfig.prop[i];
        }
      }

      for (type in changed) {
        trackSettings[type].setDefaults(true);
      }
    }

    /*
     * Abandon all hope! If you've tracked a bug to this line of code, be afraid.
     * It will almost certainly be due to the wonderful way the javascript objects work.
     *
     * Consider the following:
     *
     * var Obj = function () {};
     *
     * Obj.prototype = {
     *   scalar : 1,
     *   array  : [ 1, 2, 3 ],
     *   hash   : { a: 1, b : 2 }
     * };
     *
     * var x = new Obj();
     *
     * x.scalar   = 10;
     * x.array[0] = 10;
     * x.hash.a   = 10;
     *
     * var y = new Obj();
     *
     * y is now { scalar: 1, array: [ 10, 2, 3 ], hash: { a: 10, b : 2 } }, since memory locations of objects in prototypes are shared.
     *
     * This has been the cause of numerous Genoverse bugs in the past, due to property sharing between different tracks, models, views, and controllers.
     */
    this.extend(trackSettings);

    this.model.setChrProps(); // make sure the data stores for the current chromsome are being used

    if (!this.controller || typeof this.controller === 'function') {
      this.controller = this.newMVC(settings.controller, controllerSettings.func, $.extend(controllerSettings.prop, { model: this.model, view: this.view }));
    } else {
      controllerSettings.prop.threshold = controllerSettings.prop.threshold || this.controller.constructor.prototype.threshold;
      $.extend(this.controller, controllerSettings.prop, { model: this.model, view: this.view });
    }
  },

  newMVC: function (object, functions, properties) {
    return new (object.extend(
      $.extend(true, {}, object.prototype, functions, {
        prop: $.proxy(this.prop, this)
      })
    ))(
      $.extend(properties, {
        browser : this.browser,
        width   : this.width,
        track   : this
      })
    );
  },

  setLengthMap: function () {
    var mv        = [ 'model', 'view' ];
    var lengthMap = [];
    var models    = {};
    var views     = {};
    var settings, value, deepCopy, prevLengthMap, mvSettings, type, prevType, i, j;

    function compare(a, b) {
      var checked = { browser: true, width: true, track: true }; // Properties set in newMVC should be ignored, as they will be missing if comparing an object with a prototype
      var key;

      for (key in a) {
        if (checked[key]) {
          continue;
        }

        checked[key] = true;

        if (typeof a[key] !== typeof b[key]) {
          return false;
        }

        if (typeof a[key] === 'function' && typeof b[key] === 'function') {
          if (a[key].toString() !== b[key].toString()) {
            return false;
          }
        } else if (typeof a[key] === 'object' && !(a[key] instanceof $) && !compare(a[key], b[key])) {
          return false;
        } else if (a[key] !== b[key]) {
          return false;
        }
      }

      for (key in b) {
        if (!checked[key]) {
          return false;
        }
      }

      return true;
    }

    // Find all scale-map like keys
    for (var key in this) {
      if (!isNaN(key)) {
        key   = parseInt(key, 10);
        value = this[key];

        lengthMap.push([ key, value === false ? { threshold: key, resizable: 'auto', featureHeight: 0, model: BaseModel, view: BaseView } : $.extend(true, {}, value) ]);
      }
    }

    // Force at least one lengthMap entry to exist, containing the base model and view. lengthMap entries above -1 without a model or view will inherit from -1.
    lengthMap.push([ -1, { view: this.view || BaseView, model: this.model || BaseModel } ]);

    lengthMap = lengthMap.sort(function (a, b) { return b[0] - a[0]; });

    for (i = 0; i < lengthMap.length; i++) {
      if (lengthMap[i][1].model && lengthMap[i][1].view) {
        continue;
      }

      deepCopy = {};

      if (lengthMap[i][0] !== -1) {
        for (j in lengthMap[i][1]) {
          if (this._interface[j]) {
            deepCopy[this._interface[j]] = true;
          }

          if (deepCopy.model && deepCopy.view) {
            break;
          }
        }
      }

      // Ensure that every lengthMap entry has a model and view property, copying them from entries with smaller lengths if needed.
      for (j = i + 1; j < lengthMap.length; j++) {
        if (!lengthMap[i][1].model && lengthMap[j][1].model) {
          lengthMap[i][1].model = deepCopy.model ? BaseModel.extend($.extend(true, {}, lengthMap[j][1].model.prototype)) : lengthMap[j][1].model;
        }

        if (!lengthMap[i][1].view && lengthMap[j][1].view) {
          lengthMap[i][1].view = deepCopy.view ? BaseView.extend($.extend(true, {}, lengthMap[j][1].view.prototype)) : lengthMap[j][1].view;
        }

        if (lengthMap[i][1].model && lengthMap[i][1].view) {
          break;
        }
      }
    }

    // Now every lengthMap entry has a model and a view class, create instances of those classes.
    for (i = 0; i < lengthMap.length; i++) {
      prevLengthMap = lengthMap[i - 1] ? lengthMap[i - 1][1] : {};
      settings      = $.extend(true, {}, this.constructor.prototype, lengthMap[i][1]);
      mvSettings    = { model: { prop: {}, func: {} }, view: { prop: {}, func: {} } };

      // Work out which settings belong to models or views
      for (j in settings) {
        if (j !== 'constructor' && mvSettings[this._interface[j]]) {
          mvSettings[this._interface[j]][typeof settings[j] === 'function' ? 'func' : 'prop'][j] = settings[j];
        }
      }

      // Create models and views, if settings.model or settings.view is a class rather than an instance
      for (j = 0; j < mv.length; j++) {
        type = mv[j];

        if (typeof settings[type] === 'function') {
          prevType = this[mv[j] + 's'];

          // If the previous lengthMap contains an instance of the class in settings, it can be reused.
          // This allows sharing of models and views between lengthMap entries if they are the same, stopping the need to fetch identical data or draw identical images more than once
          if (prevLengthMap[type] instanceof settings[type]) {
            settings[type] = prevLengthMap[type];
          } else {
            // Make an instance of the model/view, based on the settings[type] class but with a prototype that contains the functions in mvSettings[type].func
            settings[type] = this.newMVC(settings[type], mvSettings[type].func, mvSettings[type].prop);

            // If the track already has this.models/this.views and the prototype of the new model/view is the same as the value of this.models/this.views for the same length key, reuse that value.
            // This can happen if the track has configSettings and the user changes config but that only affects one of the model and view.
            // Again, reusing the old value stops the need to fetch identical data or draw identical images more than once.
            if (prevType[lengthMap[i][0]] && compare(prevType[lengthMap[i][0]].constructor.prototype, $.extend({}, settings[type].constructor.prototype, mvSettings[type].prop))) {
              settings[type] = prevType[lengthMap[i][0]];
            }
          }
        }
      }

      models[lengthMap[i][0]] = lengthMap[i][1].model = settings.model;
      views[lengthMap[i][0]]  = lengthMap[i][1].view  = settings.view;
    }

    this.lengthMap = lengthMap;
    this.models    = models;
    this.views     = views;
  },

  getSettingsForLength: function () {
    var length = this.browser.length || (this.browser.end - this.browser.start + 1);

    for (var i = 0; i < this.lengthMap.length; i++) {
      if (length > this.lengthMap[i][0] || (length === 1 && this.lengthMap[i][0] === 1) || (length < 0 && this.lengthMap[i][0] < 0)) {
        return this.lengthMap[i];
      }
    }

    return [];
  },

  prop: function (key, value) {
    var mvc = [ 'controller', 'model', 'view' ];
    var obj;

    if (this._interface[key]) {
      obj = this[this._interface[key]];
    } else {
      for (var i = 0; i < 3; i++) {
        if (this[mvc[i]] && typeof this[mvc[i]][key] !== 'undefined') {
          obj = this[mvc[i]];
          break;
        }
      }

      obj = obj || this;
    }

    if (typeof value !== 'undefined') {
      if (value === null) {
        delete obj[key];
      } else {
        obj[key] = value;
      }
    }

    return obj ? obj[key] : undefined;
  },

  setHeight: function (height, forceShow) {
    if (this.disabled || (forceShow !== true && height < this.prop('featureHeight')) || (this.prop('threshold') && !this.prop('thresholdMessage') && this.browser.length > this.prop('threshold'))) {
      height = 0;
    } else {
      height = Math.max(height, this.prop('minLabelHeight'));
    }

    this.height = height;

    return height;
  },

  resetHeight: function () {
    if (this.resizable === true) {
      var resizer = this.prop('resizer');

      this.autoHeight = !!([ this.defaultAutoHeight, this.browser.trackAutoHeight ].sort(function (a, b) {
        return (typeof a !== 'undefined' && a !== null ? 0 : 1) - (typeof b !== 'undefined' && b !== null ?  0 : 1);
      })[0]);

      this.controller.resize(this.autoHeight ? this.prop('fullVisibleHeight') : this.defaultHeight + this.margin + (resizer ? resizer.height() : 0));
      this.initialHeight = this.height;
    }
  },

  setConfig: function (config) {
    if (typeof config === 'string' && arguments.length === 2) {
      var _config = {};
      _config[config] = arguments[1];
      config = _config;
    }

    var configChanged = false;
    var conf;

    for (var type in config) {
      conf = config[type];

      if (typeof this.configSettings[type] === 'undefined' || typeof this.configSettings[type][conf] === 'undefined' || this.config[type] === conf) {
        continue;
      }

      this.config[type] = conf;

      configChanged = true;
    }

    if (configChanged) {
      var features = this.prop('featuresById');

      for (var i in features) {
        delete features[i].menuEl;
      }

      this._setCurrentConfig();

      if (!this.disabled) {
        this.reset.apply(this, configChanged ? [ 'config', config ] : []);
      }

      (this.prop('childTracks') || []).forEach(function (track) {
        track.setConfig(config);
      });

      this.browser.saveConfig();
    }
  },

  _setCurrentConfig: function () {
    var settings       = [];
    var featureFilters = [];
    var configName     = [];
    var controls       = (Array.isArray(this.controls) ? this.controls : []).reduce(function (acc, control) { return acc.add(control); }, $());
    var conf, i;

    this._currentConfig = { prop: {}, func: {} };

    for (i in this.configSettings) {
      conf = this.getConfig(i);

      if (conf) {
        settings.push(conf);

        if (conf.featureFilter) {
          featureFilters.push(conf.featureFilter);
        }

        configName.push(
          conf.hasOwnProperty('name')
            ? conf.name
            : conf.featureFilter === false
              ? false
              : controls.filter('[data-control="' + i + '"]').find('[value="' + this.config[i] + '"]').html()
        );
      }
    }

    if (settings.length) {
      configName = configName.filter(Boolean);

      settings = $.extend.apply($, [ true, {}].concat(
        settings,
        {
          featureFilters : featureFilters,
          name           : this.defaultName + (configName.length ? ' - ' + configName.join(', ') : ''),
          configName     : [ this.defaultName ].concat(configName)
        }
      ));

      delete settings.featureFilter;
    }

    for (i in settings) {
      this._currentConfig[typeof settings[i] === 'function' && !/^(before|after)/.test(i) ? 'func' : 'prop'][i] = settings[i];
    }

    if (settings.name) {
      this.updateName(settings.name, settings.configName);
    }
  },

  getConfig: function (type) {
    return this.configSettings[type][this.config[type]];
  },

  addChildTracks: function () {
    if (!this.children) {
      return;
    }

    var track    = this;
    var browser  = this.browser;
    var children = (Array.isArray(this.children) ? this.children : [ this.children ]).filter(function (child) { return child.prototype instanceof Track; });
    var config   = {
      parentTrack : this,
      controls    : 'off',
      threshold   : this.prop('threshold')
    };

    setTimeout(function () {
      track.childTracks = children.map(function (child) {
        if (child.prototype instanceof LegendTrack || child === LegendTrack) {
          track.addLegend(child.extend(config), true);
          return track.legendTrack;
        }

        return browser.addTrack(child.extend(config));
      });

      track.controller.setLabelHeight();
    }, 1);
  },

  addLegend: function (constructor, now) {
    if (!(constructor || this.legend)) {
      return;
    }

    constructor = constructor || (this.legend.prototype instanceof LegendTrack ? this.legend : LegendTrack);

    var track       = this;
    var legendType  = constructor.prototype.shared === true ? Genoverse.getTrackNamespace(constructor) : constructor.prototype.shared || this.id;
    var config      = {
      id   : legendType + 'Legend',
      name : constructor.prototype.name || (this.defaultName + ' Legend'),
      type : legendType
    };

    this.legendType = legendType;

    function makeLegendTrack() {
      track.legendTrack = track.browser.legends[config.id] || track.browser.addTrack(constructor.extend(config));
      return track.legendTrack;
    }

    if (now === true) {
      makeLegendTrack();
    } else {
      setTimeout(makeLegendTrack, 1);
    }
  },

  changeChr: function () {
    for (var i in this.models) {
      this.models[i].setChrProps();
    }
  },

  updateName: function (name, configName) { // For ease of use in external code
    if (this.controller && typeof this.controller !== 'function') {
      this.controller.setName(name, configName);
    } else {
      this.name       = name;
      this.configName = configName || [];
    }
  },

  enable: function () {
    if (this.disabled === true) {
      this.disabled = false;
      this.controller.resize(this.initialHeight);
      this.reset();
    }
  },

  disable: function () {
    if (!this.disabled) {
      this.disabled = true;
      this.controller.resize(0);
    }
  },

  reset: function () {
    var i;

    this.setLengthMap();

    for (i in this.models) {
      if (this.models[i].url !== false) {
        this.models[i].init(true);
      }
    }

    for (i in this.views) {
      this.views[i].init();
    }

    this.controller.reset.apply(this.controller, arguments);
  },

  remove: function () {
    this.browser.removeTrack(this);
  },

  destructor: function () {
    this.controller.destroy();

    var objs = [ this.view, this.model, this.controller, this ];

    for (var obj in objs) {
      for (var key in obj) {
        delete obj[key];
      }
    }
  }
});


const StaticController = BaseController.extend({
  addDomElements: function () {
    this.base();

    this.image = $('<img>').appendTo(this.imgContainer);

    this.container.toggleClass('gv-track-container gv-track-container-static').prepend(this.imgContainer);
    this.scrollContainer.add(this.messageContainer).remove();
  },

  reset: function () {
    delete this.stringified;
    this.base.apply(this, arguments);
  },

  setWidth: function (width) {
    this.base(width);
    this.image.width = this.width;
  },

  makeFirstImage: function () {
    this.base.apply(this, arguments);
    this.container.css('left', 0);
    this.imgContainer.show();
  },

  makeImage: function (params) {
    if (this.prop('disabled')) {
      return $.Deferred().resolve();
    }

    var features = this.view.positionFeatures(this.model.findFeatures(params.chr, params.start, params.end), params);

    if (features) {
      var string = JSON.stringify(features);

      if (this.stringified !== string) {
        var height = this.prop('height');

        params.width         = this.width;
        params.featureHeight = height;

        this.render(features, this.image.data(params));
        this.imgContainer.children(':last').show();
        this.resize(height, undefined, false);

        this.stringified = string;
      }
    }

    return $.Deferred().resolve();
  }
});

const StaticModel = BaseModel.extend({
  url            : false,
  checkDataRange : function () { return true; }
});

const StaticView = BaseView.extend({
  featureMargin : { top: 0, right: 1, bottom: 0, left: 1 },

  positionFeature : $.noop,
  scaleFeatures   : function (features) { return features; },

  draw: function (features, featureContext, labelContext, scale) {
    for (var i = 0; i < features.length; i++) {
      this.drawFeature(features[i], featureContext, labelContext, scale);
    }
  }
});

const StaticTrack = Track.extend({
  controls   : 'off',
  resizable  : false,
  controller : StaticController,
  model      : StaticModel,
  view       : StaticView
});

const LegendController = StaticController.extend({
  init: function () {
    this.base();

    this.container.addClass('gv-track-container-legend');

    this.browser.legends[this.track.id] = this.track;

    this.track.setTracks();
  },

  destroy: function () {
    delete this.browser.legends[this.prop('id')];
    this.base();
  }
});

const LegendModel = StaticModel.extend({
  findFeatures: function () {
    var bounds   = { x: this.browser.scaledStart, y: 0, w: this.width };
    var features = {};

    $.each($.map(this.track.tracks, function (track) {
      var featurePositions = track.prop('featurePositions');
      bounds.h = track.prop('height');
      return featurePositions ? featurePositions.search(bounds).concat(track.prop('labelPositions').search(bounds)) : [];
    }), function () {
      if (this.legend) {
        features[this.legend] = this.legendColor || this.color;
      }
    });

    return this.sortFeatures($.map(features, function (color, text) { return [[ text, color ]]; }));
  },

  sortFeatures: function (features) {
    // sort legend alphabetically
    return features.sort(function (a, b) {
      var x = a[0].toLowerCase();
      var y = b[0].toLowerCase();
      return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
  }
});

const LegendView = StaticView.extend({
  textColor     : '#000000',
  labels        : 'overlay',
  featureHeight : 12,

  positionFeatures: function (f, params) {
    if (params.positioned) {
      return f;
    }

    var cols     = 2;
    var pad      = 5;
    var w        = 20;
    var x        = 0;
    var y        = 0;
    var xScale   = this.width / cols;
    var yScale   = this.fontHeight + pad;
    var features = [];
    var xOffest  = params.xOffset || 0;
    var xPos, yPos, labelWidth;

    for (var i = 0; i < f.length; i++) {
      xPos       = (x * xScale) + pad;
      yPos       = (y * yScale) + pad;
      labelWidth = this.context.measureText(f[i][0]).width;

      features.push(
        { x: xPos + xOffest,           y: yPos, width: w,              height: this.featureHeight, color: f[i][1] },
        { x: xPos + xOffest + pad + w, y: yPos, width: labelWidth + 1, height: this.featureHeight, color: false, labelColor: this.textColor, labelWidth: labelWidth, label: f[i][0] }
      );

      if (++x === cols) {
        x = 0;
        y++;
      }
    }

    params.height     = this.prop('height', f.length ? ((y + (x ? 1 : 0)) * yScale) + pad : 0);
    params.width      = this.width;
    params.positioned = true;

    return this.base(features, params);
  }
});

const LegendTrack = StaticTrack.extend({
  unsortable  : true,
  lockToTrack : true, // Always put the legend just below the last track that the legend is for
  removable   : false,
  className: 'Legend',

  controller : LegendController,
  model      : LegendModel,
  view       : LegendView,

  setDefaults: function () {
    this.order = typeof this.order !== 'undefined' ? this.order : 9e99;
    this.id    = this.id   || 'legend';
    this.type  = this.type || 'legend';
    this.base();
  },

  setEvents: function () {
    this.browser.on({
      'afterAddTracks afterRemoveTracks': function (tracks) {
        for (var i in this.legends) {
          this.legends[i].setTracks();
        }

        this.sortTracks();
      },
      afterRemoveTracks: function (tracks) {
        for (var i in tracks) {
          if (tracks[i].legendTrack && tracks[i].legendTrack.tracks.length === 0) {
            tracks[i].legendTrack.remove();
          }
        }

        for (var i in this.legends) {
          this.legends[i].controller.makeImage({});
        }
      },
      afterUpdateTrackOrder: function (e, ui) {
        var track       = ui.item.data('track');
        var legendTrack = this.legends[track.id] || track.legendTrack;

        // If a legend track, or a track with a sortable legend has been reordered, its lockToTrack status is ignored from now on.
        // This allows a legend to initially be locked to a track, but then to be reordered once the browser has been initialized
        if (legendTrack && legendTrack.lockToTrack && legendTrack.unsortable === false) {
          legendTrack.lockToTrack = false;
        }

        for (var i in this.legends) {
          this.legends[i].updateOrder();
        }

        this.sortTracks();
      }
    });

    this.browser.on({
      afterPositionFeatures: function (features, params) {
        var legend = this.prop('legendTrack');

        if (legend) {
          setTimeout(function () { legend.controller.makeImage(params); }, 1);
        }
      },
      afterResize: function (height, userResize) {
        var legend = this.prop('legendTrack');

        if (legend && userResize === true) {
          legend.controller.makeImage({});
        }
      },
      afterCheckHeight: function () {
        var legend = this.prop('legendTrack');

        if (legend) {
          legend.controller.makeImage({});
        }
      },
      afterSetMVC: function () {
        var legend = this.prop('legendTrack');

        if (legend && legend.tracks.length) {
          legend.disable();

          if (this.legend !== false) {
            legend.enable();
          }
        }
      }
    }, this);
  },

  setTracks: function () {
    var legend = this;
    var type   = this.type;

    this.tracks = $.map(this.browser.tracks.filter(function (t) {
      if (t.legendType === type) {
        t.legendTrack = t.legendTrack || legend;
        return true;
      }
    }), function (track) {
      return [ track ].concat(track.prop('childTracks'), track.prop('parentTrack')).filter(function (t) { return t && t !== legend && !t.prop('disabled'); })
    });

    this.updateOrder();

    if (typeof this.controller === 'object') {
      this[this.tracks.length ? 'enable' : 'disable']();
    } else {
      this.disabled = !this.tracks.length;
    }
  },

  updateOrder: function () {
    if (this.lockToTrack) {
      var tracks = this.tracks.filter(function (t) { return !t.prop('parentTrack'); });

      if (tracks.length) {
        this.order = tracks[tracks.length - 1].order + 0.1;
      }
    }
  },

  enable: function () {
    this.base();
    this.controller.makeImage({});
  },

  disable: function () {
    delete this.controller.stringified;
    this.base();
  }
});



module.exports = {
  Track,
  Legend: {
    View: LegendView,
    Model: LegendModel,
    Controller: LegendController,
    Track: LegendTrack
  },
  Static: {
    View: StaticView,
    Model: StaticModel,
    Controller: StaticController,
    Track: StaticTrack,
  }
}
