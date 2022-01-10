/**
 * functionWrap - wraps event handlers and adds debugging functionality
 */
const functionWrap = (key, obj, objType) => {
  if (obj.functions[key] || /^(before|after)/.test(key)) {
    return;
  }

  const isBrowser              = objType === 'Genoverse';
  const mainObj                = isBrowser || objType === 'Track' ? obj : obj.track;
  const events                 = isBrowser ? obj.events.browser : obj.browser.events.tracks;
  const currentConfigFunctions = (obj._currentConfig || obj.track?._currentConfig)?.func || {};
  const funcName               = key.substring(0, 1).toUpperCase() + key.substring(1);
  const { debug }              = mainObj;
  const debugTime              = debug === 'time' || (typeof debug === 'object' && debug[key]);
  const debugLabel             = (
    debug
      ? [
        isBrowser ? 'Genoverse' : mainObj.id || mainObj.name || 'Track',
        obj !== mainObj ? obj instanceof Genoverse.Track.Controller ? 'Controller' : obj instanceof Genoverse.Track.Model ? 'Model' : 'View' : false,
        key,
      ].filter(Boolean).join('.')
      : false
  );

  obj.functions[key] = obj[key].bind(obj);

  const trigger = (when, args) => {
    const eventKey = `${when}${funcName}`;
    const funcs    = [
      events[eventKey],
      events[`${eventKey}.once`],
      mainObj[eventKey],
    ].flat().filter(
      fn => typeof fn === 'function'
    );

    delete events[`${eventKey}.once`];

    funcs.forEach(func => func.call(obj, ...args));
  };

  obj[key] = (...args) => {
    let rtn;

    // Debugging functionality
    // Enabled by "debug": true || 'time' || { functionName: true, ...} option
    if (debug === true) { // if "debug": true, simply log function call
      console.log(debugLabel); // eslint-disable-line no-console
    } else if (debugTime) { // if debug: 'time' || { functionName: true, ...}, log function time
      console.time(`time: ${debugLabel}`); // eslint-disable-line no-console
    }

    trigger('before', args);

    if (currentConfigFunctions[key]) {
      // override to add a value for base
      obj.base = obj.functions[key] || (() => {});

      rtn = currentConfigFunctions[key](...args);
    } else {
      rtn = obj.functions[key](...args);
    }

    trigger('after', args);

    if (debugTime) {
      console.timeEnd(`time: ${debugLabel}`); // eslint-disable-line no-console
    }

    return rtn;
  };
};

const wrapFunctions = function (obj, objType) {
  obj.functions = obj.functions || {};

  for (const key in obj) { // eslint-disable-line no-restricted-syntax
    if (typeof obj[key] === 'function' && typeof obj[key].ancestor !== 'function' && !key.match(/^(base|extend|constructor|on|once|prop|loadPlugins|loadGenome)$/)) {
      functionWrap(key, obj, objType);
    }
  }
};

export default wrapFunctions;
