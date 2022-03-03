import Base               from 'basejs';
import Controller         from './Track/Controller';
import StrandedController from './Track/Controller/Stranded';
import Model              from './Track/Model';
import StrandedModel      from './Track/Model/Stranded';
import View               from './Track/View';
import wrapFunctions      from './lib/wrap-functions';

const Track = Base.extend({
  height     : 12,        // The height of the gv-track-container div
  margin     : 2,         // The spacing between this track and the next
  resizable  : true,      // Is the track resizable - can be true, false or 'auto'. Auto means the track will automatically resize to show all features, but the user cannot resize it themselves.
  border     : true,      // Does the track have a bottom border
  unsortable : false,     // Is the track unsortable by the user
  fixedOrder : false,     // Is the track unsortable by the user or automatically - use for tracks which always need to go at the top/bottom
  invert     : false,     // If true, features are drawn from the bottom of the track, rather than from the top. This is actually achieved by performing a CSS transform on the gv-image-container div
  legend     : false,     // Does the track have a legend - can be a Legend extension/child class, or false.
  children   : undefined, // Does the track have any child tracks - can be one or an array of Track extension/child classes.
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

    wrapFunctions(this, 'Track');

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

  setEvents: () => {},

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
    Object.entries(this.defaultConfig).forEach(
      ([ key, value ]) => {
        if (typeof this.config[key] === 'undefined') {
          this.config[key] = value;
        }
      }
    );

    this._setCurrentConfig();
  },

  setInterface: function () {
    this._interface = {};

    [ 'Controller', 'Model', 'View' ].forEach(
      (namespace) => {
        Object.keys(Track[namespace].prototype).forEach(
          (prop) => {
            if (!/^(constructor|init|reset|setDefaults|base|extend|lengthMap)$/.test(prop)) {
              this._interface[prop] = namespace.toLowerCase();
            }
          }
        );
      }
    );
  },

  setMVC: function () {
    if (this.model && typeof this.model.abort === 'function') { // TODO: don't abort unless model is changed?
      this.model.abort();
    }

    this._defaults = this._defaults || {};

    const settings           = $.extend(true, {}, this.constructor.prototype, this.getSettingsForLength()[1]); // model, view, options
    const controllerSettings = { prop: {}, func: {} };
    const trackSettings      = {};

    settings.controller = settings.controller || this.controller || Controller;

    Object.entries(settings).forEach(
      ([ key, value ]) => {
        if (!/^(constructor|init|reset|setDefaults|base|extend|lengthMap)$/.test(key) && isNaN(key)) {
          if (this._interface[key] === 'controller') {
            controllerSettings[typeof value === 'function' ? 'func' : 'prop'][key] = value;
          } else if (!Track.prototype.hasOwnProperty(key) && !/^(controller|models|views|config|disabled)$/.test(key)) { // If we allow trackSettings to overwrite the MVC properties, we will potentially lose of information about instantiated objects that the track needs to perform future switching correctly.
            if (typeof this._defaults[key] === 'undefined') {
              this._defaults[key] = this[key];
            }

            trackSettings[key] = value;
          }
        }
      }
    );

    Object.entries(this._defaults).forEach(
      ([ key, value ]) => {
        if (typeof trackSettings[key] === 'undefined') {
          trackSettings[key] = value;
        }
      }
    );

    // If there are configSettings for the track, ensure that any properties in _currentConfig are set for the model/view/controller/track as appropriate.
    // Functions in _currentConfig are accessed via functionWrap in wrap-functions.js, so nothing needs to be done with them here.
    if (!$.isEmptyObject(this._currentConfig)) {
      const changed = {};

      Object.entries(this._currentConfig.prop).forEach(
        ([ key, value ]) => {
          const type = this._interface[key];

          if (/model|view/.test(type)) {
            if (trackSettings[type][key] !== value) {
              trackSettings[type][key] = value;
              changed[type]            = true;
            }
          } else if (type === 'controller') {
            controllerSettings.prop[key] = value;
          } else {
            trackSettings[key] = value;
          }
        }
      );

      Object.keys(changed).forEach(
        (type) => { trackSettings[type].setDefaults(true); }
      );
    }

    /*
     * Abandon all hope! If you've tracked a bug to this line of code, be afraid.
     * It will almost certainly be due to the wonderful way the javascript objects work.
     *
     * Consider the following:
     *
     * const Obj = function () {};
     *
     * Obj.prototype = {
     *   scalar : 1,
     *   array  : [ 1, 2, 3 ],
     *   hash   : { a: 1, b : 2 }
     * };
     *
     * const x = new Obj();
     *
     * x.scalar   = 10;
     * x.array[0] = 10;
     * x.hash.a   = 10;
     *
     * const y = new Obj();
     *
     * y is now { scalar: 1, array: [ 10, 2, 3 ], hash: { a: 10, b : 2 } }, since memory locations of objects in prototypes are shared.
     *
     * This has been the cause of numerous Genoverse bugs in the past, due to property sharing between different tracks, models, views, and controllers.
     */
    this.extend(trackSettings);

    this.model.setChrProps(); // make sure the data stores for the current chromsome are being used

    if (!this.controller || typeof this.controller === 'function') {
      this.controller = this.newMVC(settings.controller, controllerSettings.func, {
        ...controllerSettings.prop,
        model : this.model,
        view  : this.view,
      });
    } else {
      controllerSettings.prop.threshold = controllerSettings.prop.threshold || this.controller.constructor.prototype.threshold;

      Object.assign(this.controller, controllerSettings.prop, {
        model : this.model,
        view  : this.view,
      });
    }
  },

  newMVC: function (object, functions, properties) {
    return new (object.extend(
      $.extend(true, {}, {
        ...object.prototype,
        ...functions,
        prop: this.prop.bind(this),
      })
    ))({
      ...properties,
      browser : this.browser,
      width   : this.width,
      track   : this,
    });
  },

  setLengthMap: function () {
    const models = {};
    const views  = {};

    const compare = (a, b) => {
      const checked = { browser: true, width: true, track: true }; // Properties set in newMVC should be ignored, as they will be missing if comparing an object with a prototype

      for (const key in a) { // eslint-disable-line no-restricted-syntax
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

      return Object.keys(b).every(key => checked[key]);
    };

    const lengthMap = [
      // Force at least one lengthMap entry to exist, containing the base model and view. lengthMap entries above -1 without a model or view will inherit from -1.
      [ -1, { view: this.view || View, model: this.model || Model }],
    ];

    // Find all scale-map like keys
    for (const key in this) { // eslint-disable-line no-restricted-syntax
      if (!isNaN(key)) {
        const value = this[key];

        lengthMap.push([
          Number(key),
          value === false
            ? {
              threshold     : Number(key),
              resizable     : 'auto',
              featureHeight : 0,
              model         : Model,
              view          : View,
            }
            : $.extend(true, {}, value),
        ]);
      }
    }

    lengthMap.sort((a, b) => b[0] - a[0]).forEach(
      ([ threshold, trackConfig ], i) => {
        if (trackConfig.model && trackConfig.view) {
          return;
        }

        const makeDeepCopy = (
          threshold === -1
            ? {}
            : {
              model : Object.keys(trackConfig).some(key => this._interface[key] === 'model'),
              view  : Object.keys(trackConfig).some(key => this._interface[key] === 'view'),
            }
        );

        // Ensure that every lengthMap entry has a model and view property, copying them from entries with smaller lengths if needed.
        for (let j = i + 1; j < lengthMap.length; j++) {
          if (!trackConfig.model && lengthMap[j][1].model) {
            trackConfig.model = makeDeepCopy.model ? Model.extend($.extend(true, {}, lengthMap[j][1].model.prototype)) : lengthMap[j][1].model;
          }

          if (!trackConfig.view && lengthMap[j][1].view) {
            trackConfig.view = makeDeepCopy.view ? View.extend($.extend(true, {}, lengthMap[j][1].view.prototype)) : lengthMap[j][1].view;
          }

          if (trackConfig.model && trackConfig.view) {
            break;
          }
        }
      }
    );

    // Now every lengthMap entry has a model and a view class, create instances of those classes.
    lengthMap.forEach(
      ([ threshold, trackConfig ], i) => {
        const prevLengthMap = lengthMap[i - 1] ? lengthMap[i - 1][1] : {};
        const settings      = $.extend(true, {}, this.constructor.prototype, trackConfig);
        const mvSettings    = { model: { prop: {}, func: {} }, view: { prop: {}, func: {} } };

        // Work out which settings belong to models or views
        Object.entries(settings).forEach(
          ([ key, value ]) => {
            if (key !== 'constructor' && mvSettings[this._interface[key]]) {
              mvSettings[this._interface[key]][typeof value === 'function' ? 'func' : 'prop'][key] = value;
            }
          }
        );

        // Create models and views, if settings.model or settings.view is a class rather than an instance
        [ 'model', 'view' ].forEach(
          (type) => {
            if (typeof settings[type] === 'function') {
              const prevType = this[`${type}s`];

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
                if (prevType[threshold] && compare(prevType[threshold].constructor.prototype, { ...settings[type].constructor.prototype, ...mvSettings[type].prop })) {
                  settings[type] = prevType[threshold];
                }
              }
            }
          }
        );

        models[threshold] = trackConfig.model = settings.model;
        views[threshold]  = trackConfig.view  = settings.view;
      }
    );

    this.lengthMap = lengthMap;
    this.models    = models;
    this.views     = views;
  },

  getSettingsForLength: function () {
    const length = this.browser.length || (this.browser.end - this.browser.start + 1);

    return this.lengthMap.find(
      ([ threshold ]) => length > threshold || (length === 1 && threshold === 1) || (length < 0 && threshold < 0)
    ) || [];
  },

  prop: function (key, value) {
    const obj = (
      this._interface[key]
        ? this[this._interface[key]]
        : this[[ 'controller', 'model', 'view' ].find(type => this[type] && typeof this[type][key] !== 'undefined')] || this
    );

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
      const resizer = this.prop('resizer');

      this.autoHeight = !!([ this.defaultAutoHeight, this.browser.trackAutoHeight ].sort((a, b) => (typeof a !== 'undefined' && a !== null ? 0 : 1) - (typeof b !== 'undefined' && b !== null ?  0 : 1))[0]);

      this.controller.resize(this.autoHeight ? this.prop('fullVisibleHeight') : this.defaultHeight + this.margin + (resizer ? resizer.height() : 0));
      this.initialHeight = this.height;
    }
  },

  setConfig: function (config, arg) {
    if (typeof config === 'string' && typeof arg !== 'undefined') {
      const _config = {};

      _config[config] = arg;
      config          = _config;
    }

    let configChanged = false;

    Object.entries(config).forEach(
      ([ type, conf ]) => {
        if (typeof this.configSettings[type] === 'undefined' || typeof this.configSettings[type][conf] === 'undefined' || this.config[type] === conf) {
          return;
        }

        this.config[type] = conf;

        configChanged = true;
      }
    );

    if (configChanged) {
      const features = this.prop('featuresById');

      Object.values(features).forEach(
        (feature) => { delete feature.menuEl; }
      );

      this._setCurrentConfig();

      if (!this.disabled) {
        this.reset(...(configChanged ? [ 'config', config ] : []));
      }

      (this.prop('childTracks') || []).forEach((track) => {
        track.setConfig(config);
      });

      this.browser.saveConfig();
    }
  },

  _setCurrentConfig: function () {
    const controls       = (Array.isArray(this.controls) ? this.controls : []).reduce((acc, control) => acc.add(control), $());
    const featureFilters = [];

    let settings   = [];
    let configName = [];

    this._currentConfig = { prop: {}, func: {} };

    Object.keys(this.configSettings).forEach(
      (key) => {
        const conf = this.getConfig(key);

        if (conf) {
          settings.push(conf);

          if (conf.featureFilter) {
            featureFilters.push(conf.featureFilter);
          }

          configName.push(
            conf.hasOwnProperty('name')
              ? typeof conf.name === 'function'
                ? conf.name.call(this)
                : conf.name
              : conf.featureFilter === false
                ? false
                : controls.filter(`[data-control="${key}"]`).find(`[value="${this.config[key]}"]`).html()
          );
        }
      }
    );

    if (settings.length) {
      configName = configName.filter(Boolean);

      settings = $.extend(true, {}, ...settings, {
        featureFilters : featureFilters,
        name           : `${this.defaultName}${configName.length ? ` - ${configName.join(', ')}` : ''}`,
        configName     : [ this.defaultName ].concat(configName),
      });

      delete settings.featureFilter;
    }

    Object.entries(settings).forEach(
      ([ key, value ]) => {
        this._currentConfig[typeof value === 'function' && !/^(before|after)/.test(key) ? 'func' : 'prop'][key] = value;
      }
    );

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

    const track    = this;
    const browser  = this.browser;
    const children = [].concat(this.children).filter(child => child.prototype instanceof Track);
    const config   = {
      parentTrack : this,
      controls    : 'off',
      threshold   : this.prop('threshold'),
    };

    setTimeout(
      () => {
        track.childTracks = children.map(
          (child) => {
            if (child.prototype.isLegend || child.isLegend) {
              track.addLegend(child.extend(config), true);

              return track.legendTrack;
            }

            return browser.addTrack(child.extend(config));
          }
        );

        track.controller.setLabelHeight();
      },
      1
    );
  },

  addLegend: function (constructor = this.legend, now) {
    if (!constructor?.prototype.isLegend) {
      return;
    }

    const track      = this;
    const legendType = constructor.prototype.shared === true ? Genoverse.getTrackNamespace(constructor) : constructor.prototype.shared || this.id;
    const config     = {
      id   : `${legendType}Legend`,
      name : constructor.prototype.name || `${this.defaultName} Legend`,
      type : legendType,
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
    Object.values(this.models).forEach(
      model => model.setChrProps()
    );
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

  reset: function (...args) {
    this.setLengthMap();

    Object.values(this.models).filter(model => model.url !== false).forEach(model => model.init(true));
    Object.values(this.views).forEach(view => view.init(true));

    this.controller.reset(...args);
  },

  remove: function () {
    this.browser.removeTrack(this);
  },

  destructor: function () {
    [ 'controller', 'model', 'view', 'models', 'views', 'lengthMap' ].forEach(
      (key) => {
        if (typeof this?.[key]?.destroy === 'function') {
          this[key].destroy();
        }

        delete this[key];
      }
    );
  },
});

Track.Controller = Controller;
Track.Model      = Model;
Track.View       = View;

export default Track;

export { Controller, Model, View };
