/**
 * functionWrap - wraps event handlers and adds debugging functionality
 */
var functionWrap = function (key, obj, objType) {
  obj.functions = obj.functions || {};

  if (obj.functions[key] || /^(before|after)/.test(key)) {
    return;
  }

  var func      = key.substring(0, 1).toUpperCase() + key.substring(1);
  var isBrowser = objType === 'Genoverse';
  var mainObj   = isBrowser || objType === 'Track' ? obj : obj.track;
  var events    = isBrowser ? obj.events.browser : obj.browser.events.tracks;
  var debug;

  if (mainObj.debug) {
    debug = [
      isBrowser ? 'Genoverse' : mainObj.id || mainObj.name || 'Track',
      obj !== mainObj ? objType : false,
      key
    ].filter(Boolean).join('.');
  }

  obj.functions[key] = obj[key];

  obj[key] = function () {
    var args          = [].slice.call(arguments);
    var currentConfig = (this._currentConfig || (this.track ? this.track._currentConfig : {}) || {}).func;
    var rtn;

    // Debugging functionality
    // Enabled by "debug": true || 'time' || { functionName: true, ...} option
    if (mainObj.debug === true) { // if "debug": true, simply log function call
      console.log(debug); // eslint-disable-line no-console
    } else if (mainObj.debug === 'time' || (typeof mainObj.debug === 'object' && mainObj.debug[key])) { // if debug: 'time' || { functionName: true, ...}, log function time
      console.time('time: ' + debug); // eslint-disable-line no-console
    }

    function trigger(when) {
      var once  = events[when + func + '.once'] || [];
      var funcs = (events[when + func] || []).concat(once, typeof mainObj[when + func] === 'function' ? mainObj[when + func] : []);

      if (once.length) {
        delete events[when + func + '.once'];
      }

      for (var i = 0; i < funcs.length; i++) {
        funcs[i].apply(this, args);
      }
    }

    trigger.call(this, 'before');

    if (currentConfig && currentConfig[key]) {
      // override to add a value for this.base
      rtn = function () {
        this.base = this.functions[key] || function () {};
        return currentConfig[key].apply(this, arguments);
      }.apply(this, args);
    } else {
      rtn = this.functions[key].apply(this, args);
    }

    trigger.call(this, 'after');

    if (mainObj.debug === 'time' || (typeof mainObj.debug === 'object' && mainObj.debug[key])) {
      console.timeEnd('time: ' + debug); // eslint-disable-line no-console
    }

    return rtn;
  };
};

var wrapFunctions = function (obj, objType) {
  for (var key in obj) {
    if (typeof obj[key] === 'function' && typeof obj[key].ancestor !== 'function' && !key.match(/^(base|extend|constructor|on|once|prop|loadPlugins|loadGenome)$/)) {
      functionWrap(key, obj, objType);
    }
  }
};

export default wrapFunctions;
