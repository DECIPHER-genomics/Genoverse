Genoverse.Track = Base.extend({
  height     : 12,        // The height of the track_container div
  margin     : 2,         // The spacing between this track and the next
  resizable  : true,      // Is the track resizable - can be true, false or 'auto'. Auto means the track will automatically resize to show all features, but the user cannot resize it themselves.
  border     : true,      // Does the track have a bottom border
  hidden     : false,     // Is the track hidden by default
  unsortable : false,     // Is the track unsortable
  name       : undefined, // The name of the track, which appears in its label
  autoHeight : undefined, // Does the track automatically resize so that all the features are visible
  
  constructor: function (config) {
    if (this.stranded || config.stranded) {
      this.controller = this.controller || Genoverse.Track.Controller.Stranded;
      this.model      = this.model      || Genoverse.Track.Model.Stranded;
    }
    
    this.setInterface();
    this.extend(config);
    this.setDefaults();
    
    Genoverse.wrapFunctions(this);
    
    this.setLengthMap();
    this.setMVC();
  },
  
  setDefaults: function () {
    this.order             = this.order || this.index;
    this.defaultHeight     = this.height;
    this.defaultAutoHeight = this.autoHeight;
    this.autoHeight        = typeof this.autoHeight !== 'undefined' ? this.autoHeight : this.browser.trackAutoHeight;
    this.height           += this.margin;
    this.initialHeight     = this.height;
    
    if (this.hidden) {
      this.height = 0;
    }
    
    if (this.resizable === 'auto') {
      this.autoHeight = true;
    }
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
    var settings       = $.extend(true, {}, this.constructor.prototype, lengthSettings); // model, view, options
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
      if (!/^(constructor|init|setDefaults|base|extend|lengthMap)$/.test(i) && isNaN(i)) {
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
      
      if (typeof settings[obj] === 'function' && (!this[obj] || this[obj].constructor.ancestor !== settings[obj])) {
        this[obj] = new (settings[obj].extend($.extend(true, {}, settings[obj].prototype, mvcSettings[obj].func)))(mvcSettings[obj].prop);
      } else if (typeof settings[obj] === 'object' && this[obj] !== settings[obj]) {
        this[obj] = settings[obj];
        
        for (j in mvcSettings[obj].prop) {
          if (typeof this[obj][j] === 'undefined') {
            this[obj][j] = mvcSettings[obj].prop[j];
          }
        }
        
        this[obj].constructor.extend(mvcSettings[obj].func);
      }
    }
    
    if (!this.controller || typeof this.controller === 'function') {
      this.controller = new (settings.controller.extend($.extend(true, {}, settings.controller.prototype, mvcSettings.controller.func)))($.extend(mvcSettings.controller.prop, { model: this.model, view: this.view }));
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
    var value, j, deepCopy;
    
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
      this.lengthMap.push([ -1, $.extend(true, {}, this, { view: this.view || Genoverse.Track.View, model: this.model || Genoverse.Track.Model }) ]);
      this.lengthMap = this.lengthMap.sort(function (a, b) { return b[0] - a[0]; });
    }
    
    for (var i = 0; i < this.lengthMap.length; i++) {
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
  
  setHeight: function (height, forceShow) {
    if (this.prop('hidden') || (forceShow !== true && height < this.prop('featureHeight'))) {
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
  
  show: function () {
    this.hidden = false;
    this.controller.resize(this.initialHeight);
  },
  
  hide: function () {
    this.hidden = true;
    this.controller.resize(0);
  },
  
  enable: function () {
    this.disabled = false;
    this.show();
    this.controller.makeFirstImage();
  },
  
  disable: function () {
    this.hide();
    this.controller.scrollContainer.css('left', 0);
    this.controller.reset();
    this.disabled = true;
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