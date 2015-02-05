Genoverse.Track.Controller.Configurable = Genoverse.Track.Controller.extend({
  addDomElements: function () {
    var controls      = this.prop('controls');
    var defaultConfig = this.prop('defaultConfig');
    var savedConfig   = this.browser.savedConfig ? this.browser.savedConfig[this.prop('id')] || {} : {};
    var prop;

    for (var i in controls) {
      if (typeof controls[i] === 'string') {
        controls[i] = $(controls[i]);

        // TODO: other control types
        if (controls[i].is('select')) {
          prop = controls[i].data('control');

          controls[i].find('option[value=' + (savedConfig[prop] || defaultConfig[prop] || 'all') + ']').attr('selected', true).end().change(function () {
            $(this).data('track').setConfig($(this).data('control'), this.value);
          });
        }
      }
    }

    this.base.apply(this, arguments);
  }
});

Genoverse.Track.Configurable = Genoverse.Track.extend({
  controller     : Genoverse.Track.Controller.Configurable,
  config         : undefined, // {}
  configSettings : undefined, // {}
  defaultConfig  : undefined, // {}
  controls       : undefined, // []

  setDefaults: function () {
    this.base();

    this.config         = this.config         || {};
    this.configSettings = this.configSettings || {};
    this.defaultConfig  = this.defaultConfig  || {};
    this.controls       = this.controls       || [];

    this.setDefaultConfig();
  },

  setDefaultConfig: function () {
    for (var i in this.defaultConfig) {
      if (typeof this.config[i] === 'undefined') {
        this.config[i] = this.defaultConfig[i];
      }
    }
  },

  setLengthMap: function () {
    var args           = [ true, {} ];
    var featureFilters = [];
    var settings;

    for (var i in this.configSettings) {
      settings = this.getConfig(i);

      if (settings) {
        args.push(settings);

        if (settings.featureFilter) {
          featureFilters.push(settings.featureFilter);
        }
      }
    }

    var baseSetting = $.extend.apply($, args.concat({ featureFilters: featureFilters }));

    if (this[1]) {
      $.extend(this[1], baseSetting);
    } else {
      this[1] = baseSetting;
    }

    this.base();
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

  findFeatures: function () {
    var features = this.base.apply(this, arguments);
    var filters  = this.prop('featureFilters');

    for (var i in filters) {
      features = $.grep(features, $.proxy(filters[i], this));
    }

    return features;
  }
});