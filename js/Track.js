Genoverse.Track = Base.extend({
  constructor: function (config) {
    // this.extend(config) doesn't overwrite model/view/controller
    this.model      = this.model      || config.model      || Genoverse.Track.Model;
    this.view       = this.view       || config.view       || Genoverse.Track.View;
    this.controller = this.controller || config.controller || Genoverse.Track.Controller;
    
    this.extend(config);
    this.setScaleMap();
    
    var deepCopy = $.extend(true, {}, this);
    
    this._extend(this.model, this.view, this.controller, deepCopy);
  },

  _extend: function () {
    for (var i = 0; i < arguments.length; i++) {
      this.extend(arguments[i].prototype || arguments[i]);
    }

    for (i = 0; i < arguments.length; i++) {
      this.applyConstructor(arguments[i]);
    }
  },

  setScaleMap: function () {
    var scaleMap = [];
    
    for (var key in this) { // Find all scale-map like keys (e.g. '1:1000') or a number
      if (!isNaN(key)) {
        var value = this[key]; 
        delete this[key];
        scaleMap.push([ key, value ]);
      }
    }
    
    if (scaleMap.length) {
      scaleMap.push([ -1, $.extend(true, {}, this) ]);
      this.scaleMap = scaleMap.sort(function (a, b) { return b[0] - a[0]; });
    }
  },
  
  applyConstructor: function (constructor, config) {
    if (typeof constructor !== 'function') {
      return;
    }
    
    this._constructing = true;
    constructor.call(this, config);
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

