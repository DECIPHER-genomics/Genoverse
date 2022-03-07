const trigger = (obj, when, funcName, mainObj, events, args) => {
  const eventKey = `${when}${funcName}`;
  const once     = events[`${eventKey}.once`] || [];
  const funcs    = (events[eventKey] || []).concat(once, typeof mainObj[eventKey] === 'function' ? mainObj[eventKey] : []);

  if (once.length) {
    delete events[`${eventKey}.once`];
  }

  funcs.forEach(func => func.apply(obj, args));
};

/**
 * functionWrap - wraps event handlers and adds debugging functionality
 */
const functionWrap = (key, obj, mainObj, events, debugWrapper) => {
  if (obj.functions[key] || /^(before|after)/.test(key)) {
    return;
  }

  const funcName   = `${key.substring(0, 1).toUpperCase()}${key.substring(1)}`;
  const debug      = debugWrapper.for;
  const debugLabel = debug ? `${debugWrapper.label}.${key}` : false;
  const debugTime  = debug === 'time' || (typeof debug === 'object' && debug[key]);

  obj.functions[key] = obj[key].bind(obj);

  obj[key] = (...args) => {
    const currentConfigFunctions = (obj._currentConfig || obj.track?._currentConfig)?.func || {};

    let rtn;

    // Debugging functionality
    // Enabled by "debug": true || 'time' || { functionName: true, ...} option
    if (debug === true) { // if "debug": true, simply log function call
      console.log(debugLabel); // eslint-disable-line no-console
    } else if (debugTime) { // if debug: 'time' || { functionName: true, ...}, log function time
      console.time(`time: ${debugLabel}`); // eslint-disable-line no-console
    }

    trigger(obj, 'before', funcName, mainObj, events, args);

    if (currentConfigFunctions[key]) {
      // override to add a value for base
      obj.base = obj.functions[key] || (() => {});

      rtn = currentConfigFunctions[key].apply(obj, args);
    } else {
      rtn = obj.functions[key](...args);
    }

    trigger(obj, 'after', funcName, mainObj, events, args);

    if (debugTime) {
      console.timeEnd(`time: ${debugLabel}`); // eslint-disable-line no-console
    }

    return rtn;
  };
};

const wrapFunctions = (obj, objType) => {
  obj.functions = obj.functions || {};

  const isBrowser = objType === 'Genoverse';
  const mainObj   = isBrowser || objType === 'Track' ? obj : obj.track;
  const events    = isBrowser ? obj.events.browser : obj.browser.events.tracks;

  const debugWrapper = {
    for   : mainObj.debug,
    label : (
      mainObj.debug
        ? [
          isBrowser ? 'Genoverse' : mainObj.id || mainObj.name || 'Track',
          obj !== mainObj ? objType : false,
        ].filter(Boolean).join('.')
        : false
    ),
  };

  for (const key in obj) { // eslint-disable-line no-restricted-syntax
    if (typeof obj[key] === 'function' && typeof obj[key].ancestor !== 'function' && !key.match(/^(base|extend|constructor|controller|model|view|on|once|prop|loadPlugins|loadGenome|jQuery)$/)) {
      functionWrap(key, obj, mainObj, events, debugWrapper);
    }
  }
};

export default wrapFunctions;
