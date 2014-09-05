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

          controls[i].children('[value=' + (savedConfig[prop] || defaultConfig[prop]) + ']').attr('selected', true).end().change(function () {
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
  configSettings : {},
  defaultConfig  : {},
  controls       : [],
  
  setDefaults: function () {
    this.config = this.config || {};
    
    for (var i in this.defaultConfig) {
      if (typeof this.config[i] === 'undefined') {
        this.config[i] = this.defaultConfig[i];
      }
    }
    
    this.base();
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
    
    this.extend({ 1: $.extend.apply($, args.concat({ featureFilters: featureFilters })) });
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
      features = $.grep(features, filters[i]);
    }
    
    return features;
  }
});