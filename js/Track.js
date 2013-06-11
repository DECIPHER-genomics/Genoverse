Genoverse.Track = Base.extend({
  
  constructor: function (config) {
    // this.extend(config) doesn't overwrite model/view/controller
    // TODO: sanity check for supplied model, view and controller
    this.model      = this.model      || config.model      || Genoverse.Track.Model;
    this.view       = this.view       || config.view       || Genoverse.Track.View;
    this.controller = this.controller || config.controller || Genoverse.Track.Controller;
    
    this.extend(config);
    this.setLengthMap();
    
    var deepCopy = $.extend(true, {}, this);
    
    this._extend(this.model, this.view, this.controller, deepCopy);
  },
  
  _extend: function () {
    for (var i = 0; i < arguments.length; i++) {
      this.extend($.extend(true, {}, arguments[i].prototype || arguments[i]));
    }

    for (i = 0; i < arguments.length; i++) {
      this.applyConstructor(arguments[i]);
    }
  },
  
  setLengthMap: function () {
    var value;
    
    this.lengthMap = [];
    
    for (var key in this) { // Find all scale-map like keys
      if (!isNaN(key)) {
        value = this[key];
        delete this[key];
        this.lengthMap.push([ parseInt(key, 10), value ]);
      }
    }
    
    if (this.lengthMap.length) {
      this.lengthMap.push([ -1, $.extend(true, {}, this) ]);
      this.lengthMap = this.lengthMap.sort(function (a, b) { return b[0] - a[0]; });
    }
  },
  
  getSettingsForLength: function () {
    for (var i = 0; i < this.lengthMap.length; i++) {
      if (this.browser.length >= this.lengthMap[i][0]) {
        return this.lengthMap[i][1];
      }
    }
    
    return false;
  },
  
  applyConstructor: function (constructor, config) {
    if (typeof constructor !== 'function') {
      return;
    }
    
    this._constructing = true;
    constructor.call(this, config);
  },
  
  setModelView: function () {
    var settings = this.getSettingsForLength();
    
    if (!settings) {
      return;
    }
    
    if (settings.model && settings.model !== this.model) {
      this.model.features     = this.features;
      this.model.featuresById = this.featuresById;
      this.model.dataRanges   = this.dataRanges;
      
      this.features     = settings.model.features;
      this.featuresById = settings.model.featuresById;
      this.dataRanges   = settings.model.dataRanges;
      
      this._extend(settings.model);
    }
    
    if (settings.view && settings.view !== this.view) {
      this._extend(settings.view);
    }
    
    this.extend(settings);
  }
}, {
  on: function (events, handler) {
    if (!Genoverse.Track.prototype.systemEventHandlers) {
      Genoverse.Track.prototype.systemEventHandlers = {};
    }
    
    $.each(events.split(' '), function () {
      if (typeof Genoverse.Track.prototype.systemEventHandlers[this] === 'undefined') {
        Genoverse.Track.prototype.systemEventHandlers[this] = [];
      }
      Genoverse.Track.prototype.systemEventHandlers[this].push(handler);
    });
  },
  File: {}
});

