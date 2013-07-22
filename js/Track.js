Genoverse.Track = Base.extend({
  constructor: function (config) {
    this.setInterface();
    this.extend(config); // TODO: check when track is { ... } instead of Genoverse.Track.extend({ ... })
    
    this.order = this.order || this.index;
    
    Genoverse.wrapFunctions(this);
    
    this.setLengthMap();
    this.setMVC();
  },
  
  setInterface: function () {
    var mvc = [ 'Controller', 'Model', 'View', 'controller', 'model', 'view' ];
    var prop;
    
    this._interface = {};
    
    for (var i = 0; i < 3; i++) {
      for (prop in Genoverse.Track[mvc[i]].prototype) {
        if (!/^(constructor|init)$/.test(prop)) {
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
    
    var lengthSettings = this.getSettingsForLength();
    var settings       = $.extend(true, {}, lengthSettings, this.constructor.prototype); // model, view, options
    var mvc            = [ 'model', 'view', 'controller' ];
    var propFunc       = $.proxy(this.prop, this);
    var mvcSettings    = {};
    var trackSettings  = {};
    var obj, j;
    
    settings.controller = settings.controller || this.controller || Genoverse.Track.Controller;
    settings.model      = settings.model      || this.model      || Genoverse.Track.Model;
    settings.view       = settings.view       || this.view       || Genoverse.Track.View;
    
    for (var i = 0; i < 3; i++) {
      mvcSettings[mvc[i]] = { prop: {}, func: {} };
    }
    
    for (i in settings) {
      if (!/^(constructor|init|setDefaults|base|extend)$/.test(i)) {
        if (this._interface[i]) {
          mvcSettings[this._interface[i]][typeof settings[i] === 'function' ? 'func' : 'prop'][i] = settings[i];
        } else if (!Genoverse.Track.prototype.hasOwnProperty(i) && !/^(controller|model|view)$/.test(i)) {
          trackSettings[i] = settings[i];
        }
      }
    }
    
    this.extend(trackSettings);
    
    for (i = 0; i < 3; i++) {
      obj = mvc[i];
      
      mvcSettings[obj].func.prop                = propFunc;
      mvcSettings[obj].func.systemEventHandlers = this.systemEventHandlers;
      mvcSettings[obj].prop.browser             = this.browser;
      mvcSettings[obj].prop.width               = this.width;
      mvcSettings[obj].prop.index               = this.index;
      mvcSettings[obj].prop.track               = this;
      
      if (obj === 'controller') {
        continue;
      }
      
      if (typeof settings[obj] === 'function') {
        if (this[obj] && this[obj].constructor.ancestor === settings[obj]) {
          for (j in this[obj].constructor.prototype) {
            if (this[obj].constructor.prototype[j] !== this[obj][j] && typeof this[obj][j] !== 'function') {
              this[obj][j] = this[obj].constructor.prototype[j];
            }
          }
          
          for (j in mvcSettings[obj].prop) {
            this[obj][j] = mvcSettings[obj].prop[j];
          }
          
          this[obj].setDefaults();
        } else {
          this[obj] = new (settings[obj].extend(mvcSettings[obj].func))(mvcSettings[obj].prop);
        }
      } else {
        this[obj] = $.extend(settings[obj], mvcSettings[obj].prop);
        this[obj].constructor.extend(mvcSettings[obj].func);
      }
    }
    
    if (!this.controller || typeof this.controller === 'function') {
      this.controller = new (settings.controller.extend(mvcSettings.controller.func))($.extend(mvcSettings.controller.prop, { model: this.model, view: this.view }));
    } else {
      $.extend(this.controller, { model: this.model, view: this.view, threshold: mvcSettings.controller.prop.threshold || this.controller.constructor.prototype.threshold });
    }
    
    if (this.strand === -1 && this.orderReverse) {
      this.order = this.orderReverse;
    }
    
    if (lengthSettings) {
      lengthSettings.model = this.model;
      lengthSettings.view  = this.view;
    }
  },
  
  setLengthMap: function () {
    var value, j;
    
    this.lengthMap = [];
    
    for (var key in this) { // Find all scale-map like keys
      if (!isNaN(key)) {
        key   = parseInt(key, 10);
        value = this[key];
        delete this[key];
        this.lengthMap.push([ key, value === false ? { threshold: key, resizable: 'auto' } : value ]);
      }
    }
    
    if (this.lengthMap.length) {
      this.lengthMap.push([ -1, $.extend(true, {}, this) ]);
      this.lengthMap = this.lengthMap.sort(function (a, b) { return b[0] - a[0]; });
    }
    
    for (var i = 0; i < this.lengthMap.length; i++) {
      if (this.lengthMap[i][1].model && this.lengthMap[i][1].view) {
        continue;
      }
      
      for (j = i + 1; j < this.lengthMap.length; j++) {
        this.lengthMap[i][1].model = this.lengthMap[i][1].model || this.lengthMap[j][1].model;
        this.lengthMap[i][1].view  = this.lengthMap[i][1].view  || this.lengthMap[j][1].view;
        
        if (this.lengthMap[i][1].model && this.lengthMap[i][1].view) {
          break;
        }
      }
    }
  },
  
  getSettingsForLength: function () {
    for (var i = 0; i < this.lengthMap.length; i++) {
      if (this.browser.length >= this.lengthMap[i][0]) {
        return this.lengthMap[i][1];
      }
    }
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
  },
  
  systemEventHandlers: {}
}, {
  on: function (events, handler) {
    $.each(events.split(' '), function () {
      if (typeof Genoverse.Track.prototype.systemEventHandlers[this] === 'undefined') {
        Genoverse.Track.prototype.systemEventHandlers[this] = [];
      }
      
      Genoverse.Track.prototype.systemEventHandlers[this].push(handler);
    });
  }
});