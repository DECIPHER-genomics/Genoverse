Genoverse.Track = Base.extend({
  height     : 12,        // The height of the track_container div
  margin     : 2,         // The spacing between this track and the next
  resizable  : true,      // Is the track resizable - can be true, false or 'auto'. Auto means the track will automatically resize to show all features, but the user cannot resize it themselves.
  border     : true,      // Does the track have a bottom border
  unsortable : false,     // Is the track unsortable
  name       : undefined, // The name of the track, which appears in its label
  autoHeight : undefined, // Does the track automatically resize so that all the features are visible
  hideEmpty  : undefined, // If the track automatically resizes, should it be hidden when there are no features, or should an empty track still be shown

  constructor: function (config) {
    if (this.stranded || config.stranded) {
      this.controller = this.controller || Genoverse.Track.Controller.Stranded;
      this.model      = this.model      || Genoverse.Track.Model.Stranded;
    }

    this.setInterface();
    this.extend(config);
    this.setDefaults();
    this.setEvents();

    Genoverse.wrapFunctions(this);

    this.setLengthMap();
    this.setMVC();
  },

  setEvents: $.noop,

  setDefaults: function () {
    this.config            = this.config         || {};
    this.configSettings    = this.configSettings || {};
    this.defaultConfig     = this.defaultConfig  || {};
    this.controls          = this.controls       || [];
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
    // FIXME: if you zoom out quickly then hit the back button, the second zoom level (first one you zoomed out to) will not draw if the models/views are the same
    if (this.model && typeof this.model.abort === 'function') { // TODO: don't abort unless model is changed?
      this.model.abort();
    }

    this._defaults = this._defaults || {};

    var lengthSettings = this.getSettingsForLength();
    var settings       = $.extend(true, {}, this.constructor.prototype, lengthSettings[1]); // model, view, options
    var mvc            = [ 'model', 'view', 'controller' ];
    var mvcSettings    = {};
    var trackSettings  = {};
    var obj, j;

    settings.controller = settings.controller || this.controller || Genoverse.Track.Controller;
    settings.model      = this.models[lengthSettings[0]] || settings.model || this.model || Genoverse.Track.Model;
    settings.view       = this.views[lengthSettings[0]]  || settings.view  || this.view  || Genoverse.Track.View;

    for (var i = 0; i < 3; i++) {
      mvcSettings[mvc[i]] = { prop: {}, func: {} };
    }

    for (i in settings) {
      if (!/^(constructor|init|reset|setDefaults|base|extend|lengthMap)$/.test(i) && isNaN(i)) {
        if (this._interface[i]) {
          mvcSettings[this._interface[i]][typeof settings[i] === 'function' ? 'func' : 'prop'][i] = settings[i];
        }
        // If we allow trackSettings to overwrite the MVC properties, we will potentially lose of information about instantiated objects that the track needs to perform future switching correctly.
        else if (!Genoverse.Track.prototype.hasOwnProperty(i) && !/^(controller|models?|views?|config)$/.test(i)) {
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
     * See also the line a bit further down: this[obj].constructor.extend(mvcSettings[obj].func);
     */
    this.extend(trackSettings);

    for (i = 0; i < 3; i++) {
      obj = mvc[i];

      if (obj === 'controller') {
        continue;
      }

      if (typeof settings[obj] === 'function' && (!this[obj] || this[obj].constructor.ancestor !== settings[obj])) {
        // Make a new instance of model/view if there isn't one already, or the model/view in lengthSettings is different from the existing model/view
        this[obj] = this.newMVC(settings[obj], mvcSettings[obj].func, mvcSettings[obj].prop);
      } else {
        // Update the model/view with the values in mvcSettings.
        var test = typeof settings[obj] === 'object' && this[obj] !== settings[obj] ? this[obj] = settings[obj] : this[obj + 's'][lengthSettings[0]] && this.lengthMap.length > 1 ? this[obj + 's'][lengthSettings[0]] : false;

        if (test) {
          for (j in mvcSettings[obj].prop) {
            if (typeof test[j] !== 'undefined') {
              this[obj][j] = mvcSettings[obj].prop[j];
            }
          }

          // Abandon all hope! (see above)
          this[obj].constructor.extend(mvcSettings[obj].func);

          if (obj === 'model' && typeof test.url !== 'undefined') {
            this.model.setURL(); // make sure the URL is correct
          }
        }
      }
    }

    if (!this.controller || typeof this.controller === 'function') {
      this.controller = this.newMVC(settings.controller, mvcSettings.controller.func, $.extend(mvcSettings.controller.prop, { model: this.model, view: this.view }));
    } else {
      $.extend(this.controller, { model: this.model, view: this.view, threshold: mvcSettings.controller.prop.threshold || this.controller.constructor.prototype.threshold });
    }

    if (this.strand === -1 && this.orderReverse) {
      this.order = this.orderReverse;
    }

    if (lengthSettings[1]) {
      this.models[lengthSettings[0]] = this.model;
      this.views[lengthSettings[0]]  = this.view;
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
    var featureFilters = [];
    var configSettings = [];
    var settings, value, j, deepCopy;

    this.lengthMap = [];
    this.models    = {};
    this.views     = {};

    // Find configuration settings, force them in as length settings with length = 1
    for (var i in this.configSettings) {
      settings = this.getConfig(i);

      if (settings) {
        configSettings.push(settings);

        if (settings.featureFilter) {
          featureFilters.push(settings.featureFilter);
        }
      }
    }

    if (configSettings.length) {
      configSettings = $.extend.apply($, [ true, {} ].concat(configSettings, { featureFilters: featureFilters }));

      // Force a lengthMap to exist. All entries in lengthMap get configSettings applied to them below
      this[1] = this[1] || {};
    }

    // Find all scale-map like keys
    for (var key in this) {
      if (!isNaN(key)) {
        key   = parseInt(key, 10);
        value = this[key];
        delete this[key];
        this.lengthMap.push([ key, value === false ? { threshold: key, resizable: 'auto', featureHeight: 0, model: Genoverse.Track.Model, view: Genoverse.Track.View } : value ]);
      }
    }

    if (this.lengthMap.length) {
      this.lengthMap.push([ -1, $.extend(true, {}, this, { view: this.view || Genoverse.Track.View, model: this.model || Genoverse.Track.Model }) ]);
      this.lengthMap = this.lengthMap.sort(function (a, b) { return b[0] - a[0]; });
    }

    for (var i = 0; i < this.lengthMap.length; i++) {
      $.extend(this.lengthMap[i][1], configSettings);

      if (this.lengthMap[i][1].model && this.lengthMap[i][1].view) {
        continue;
      }

      deepCopy = {};

      if (this.lengthMap[i][0] !== -1) {
        for (j in this.lengthMap[i][1]) {
          if (this._interface[j]) {
            deepCopy[this._interface[j]] = true;
          }
        }
      }

      for (j = i + 1; j < this.lengthMap.length; j++) {
        if (!this.lengthMap[i][1].model && this.lengthMap[j][1].model) {
          this.lengthMap[i][1].model = deepCopy.model ? Genoverse.Track.Model.extend($.extend(true, {}, this.lengthMap[j][1].model.prototype)) : this.lengthMap[j][1].model;
        }

        if (!this.lengthMap[i][1].view && this.lengthMap[j][1].view) {
          this.lengthMap[i][1].view = deepCopy.view ? Genoverse.Track.View.extend($.extend(true, {}, this.lengthMap[j][1].view.prototype)) : this.lengthMap[j][1].view;
        }

        if (this.lengthMap[i][1].model && this.lengthMap[i][1].view) {
          break;
        }
      }
    }
  },

  getSettingsForLength: function () {
    for (var i = 0; i < this.lengthMap.length; i++) {
      if (this.browser.length > this.lengthMap[i][0] || this.browser.length === 1 && this.lengthMap[i][0] === 1) {
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

  setConfig: function (type, config) {
    if (this.configSettings[type][config]) {
      this.config[type] = config;

      var features = this.prop('featuresById');

      for (var i in features) {
        delete features[i].menuEl;
      }
    }

    this.reset();
    this.browser.saveConfig();
  },

  getConfig: function (type) {
    return this.configSettings[type][this.config[type]];
  },

  addLegend: function (config, constructor) {
    var legendType = this.legendType || this.id;

    config = $.extend({
      id   : legendType + 'Legend',
      name : this.name + ' Legend',
      type : legendType
    }, config);

    this.legendType  = config.type;
    this.legendTrack = this.browser.legends[config.id] || this.browser.addTrack((constructor || Genoverse.Track.Legend).extend(config));
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
    if (this.prop('url') !== false) {
      this.model.init(true);
    }

    this.view.init();
    this.setLengthMap();
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
