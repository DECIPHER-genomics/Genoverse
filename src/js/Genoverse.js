import Base                 from 'basejs';
import Track                from './Track';
import HighlightRegionTrack from './Track/library/HighlightRegion';
import LegendTrack          from './Track/library/Legend';
import wrapFunctions        from './lib/wrap-functions';

const Genoverse = Base.extend({
  // Defaults
  baseURL            : undefined, // If multiple instances of Genoverse exist on a page at once, specifying different baseURL values allows some/all to ignore external URL changes
  urlParamTemplate   : 'r=__CHR__:__START__-__END__', // Overwrite this for your URL style
  width              : 1000,
  longestLabel       : 30,
  defaultLength      : 5000,
  defaultScrollDelta : 100,
  tracks             : [],
  highlights         : [],
  plugins            : [],
  dragAction         : 'scroll',         // Options are: scroll, select, off
  wheelAction        : 'off',            // Options are: zoom, off
  isStatic           : false,            // If true, will stop drag, select and zoom actions occurring
  saveable           : false,            // If true, track configuration and ordering will be saved in sessionStorage/localStorage
  saveKey            : '',               // Default key for sessionStorage/localStorage configuration is 'genoverse'. saveKey will be appended to this if it is set
  storageType        : 'sessionStorage', // Set to localStorage for permanence
  autoHideMessages   : true,             // Determines whether to collapse track messages by default
  trackAutoHeight    : false,            // Determines whether to automatically resize tracks to show all their features (can be overridden by track.autoHeight)
  hideEmptyTracks    : true,             // Determines whether to hide an automatically resized tracks if it has no features, or to show it empty (can be overridden by track.hideEmpty)
  genome             : undefined,        // The genome used in the browser - can be an object or a string, which will be used to obtain a javascript file
  useHash            : undefined,        // If true, window.location.hash is changed on navigation. If false, window.history.pushState is used. If undefined, pushState will be used if present in the browser

  // Default coordinates for initial view, overwrite in your config
  chr   : 1,
  start : 1,
  end   : 1000000,

  constructor: function (config = {}) {
    if (!this.supported()) {
      return this.die('Your browser does not support this functionality');
    }

    let container = $(config.container); // Make sure container is a jquery object, jquery recognises itself automatically

    if (!container?.length) {
      container = $('<div>').appendTo('body');
    }

    container.addClass('genoverse').data('genoverse', this);

    Object.entries(config).forEach(
      ([ key, val ]) => {
        if (typeof val !== 'undefined') {
          this[key] = val;
        }
      }
    );

    this.container      = container;
    this.eventNamespace = `.genoverse.${++Genoverse.id}`;
    this.events         = { browser: {}, tracks: {} };

    $.when(this.loadGenome(), this.loadPlugins()).always(() => {
      wrapFunctions(this, 'Genoverse');
      this.init();
    });
  },

  loadGenome: function () {
    if (typeof this.genome === 'string') {
      const genomeName = this.genome.toLowerCase();

      return import(`./genomes/${genomeName}`).then((imported) => {
        this.genomeName = this.genome;
        this.genome     = imported.default;

        if (!this.genome) {
          this.die(`Unable to load genome ${genomeName}`);
        }
      });
    }
  },

  loadPlugins: function (plugins) {
    this.loadedPlugins = this.loadedPlugins || {};

    const pluginsByName = (plugins || this.plugins).map(plugin => (
      Array.isArray(plugin)
        ? { name: plugin[0], conf: plugin[1] }
        : { name: plugin,    conf: undefined }
    )).reduce(
      (acc, plugin) => {
        acc[plugin.name] = plugin;

        return acc;
      },
      {}
    );

    const initializePlugin = (plugin) => {
      const requires = plugin.exports.requires;
      const pluginFn = plugin.exports[plugin.name] || plugin.exports.plugin;

      if (requires) {
        Object.keys(requires).forEach(
          (pluginName) => {
            if (pluginName !== 'requires') {
              initializePlugin({
                name    : pluginName,
                conf    : (pluginsByName[pluginName] || {}).conf,
                exports : {
                  plugin   : requires[pluginName],
                  requires : requires.requires,
                },
              });
            }
          }
        );
      }

      if (typeof pluginFn !== 'function' || this.loadedPlugins[plugin.name] === true) {
        return;
      }

      pluginFn.call(this, plugin.conf || {});
      this.container.addClass(`gv-${plugin.name.replace(/([A-Z])/g, '-$1').toLowerCase()}-plugin`);
      this.loadedPlugins[plugin.name] = true;
    };

    const pluginImports = Object.keys(pluginsByName).map(pluginName => import(`./plugins/${pluginName}`).then(
      (imported) => {
        initializePlugin({
          name    : pluginName,
          conf    : pluginsByName[pluginName].conf,
          exports : imported.default,
        });
      }
    ));

    return $.when(...pluginImports);
  },

  init: function () {
    const width = this.width;

    this.addDomElements(width);
    this.addUserEventHandlers();

    if (this.isStatic) {
      this.dragAction       = this.wheelAction = 'off';
      this.urlParamTemplate = false;
    }

    this.tracksById       = {};
    this.prev             = {};
    this.legends          = {};
    this.initialLocation  = { chr: this.chr, start: this.start, end: this.end };
    this.saveKey          = this.saveKey ? `genoverse-${this.saveKey}` : 'genoverse';
    this.urlParamTemplate = this.urlParamTemplate || '';
    this.useHash          = typeof this.useHash === 'boolean' ? this.useHash : typeof window.history.pushState !== 'function';
    this.textWidth        = document.createElement('canvas').getContext('2d').measureText('W').width;
    this.labelWidth       = this.labelContainer.outerWidth(true) || 0;
    this.width            = Math.min(this.width - this.labelWidth, this.wrapper.width() || Infinity); // Recalculate the width to ignore the affect of borders
    this.paramRegex       = (
      this.urlParamTemplate
        ? new RegExp(
          `([?&;])${
            this.urlParamTemplate
              .replace(/[.*+?^${}()|[\]\\]/g,      '\\$&')
              .replace(/(\b(\w+=)?__CHR__(.)?)/,   '$2([\\w\\.]+)$3')
              .replace(/(\b(\w+=)?__START__(.)?)/, '$2(\\d+)$3')
              .replace(/(\b(\w+=)?__END__(.)?)/,   '$2(\\d+)$3')
          }([;&])`
        )
        : ''
    );

    const coords = this.getCoords();

    this.chr = coords.chr;

    if (this.genome) {
      this.chromosomeSize = this.genome[this.chr].size;
    }

    this.canChangeChr = !!this.genome;

    if (this.saveable) {
      this.loadConfig();
    } else {
      this.addTracks();
    }

    if (this.width > 0) {
      this.setRange(coords.start, coords.end);
    }

    if (this.highlights.length) {
      this.addHighlights(this.highlights);
    }
  },

  loadConfig: function () {
    let config;

    this.defaultTracks = $.extend(true, [], this.tracks);

    try {
      config = window[this.storageType].getItem(this.saveKey);
    } catch (e) {
      // do nothing
    }

    if (config) {
      config = JSON.parse(config);
    } else {
      this.addTracks();

      return;
    }

    const tracksByNamespace = Genoverse.getAllTrackTypes();
    const tracks            = [];
    const tracksById        = {};
    const savedConfig       = {};

    function setConfig(track, conf) {
      Object.keys(conf).forEach(
        (prop) => {
          if (prop === 'config') {
            savedConfig[conf.id] = conf[prop];
          } else {
            if (prop === 'height') {
              conf[prop] = parseInt(conf[prop], 10);

              if (isNaN(conf[prop])) {
                return;
              }
            }

            track.prototype[prop] = conf[prop];
          }
        }
      );
    }

    this.tracks.forEach(
      (track) => {
        if (track.prototype.id) {
          tracksById[track.prototype.id] = track;
        }
      }
    );

    config.forEach(
      (conf) => {
        let track = tracksById[conf.id];

        if (track) {
          setConfig(track, conf);
          track._fromStorage = true;
        } else if (tracksByNamespace[conf.namespace]) {
          track = tracksByNamespace[conf.namespace];

          const trackId = track.prototype.id;

          this.trackIds          = this.trackIds          || {};
          this.trackIds[trackId] = this.trackIds[trackId] || 1;

          if (tracksById[trackId]) {
            track = tracksById[trackId];
          }

          setConfig(track, conf);
          tracks.push(track);
        }
      }
    );

    this.tracks.forEach(
      (track) => {
        if (track.prototype.id && !track._fromStorage) {
          return;
        }

        tracks.push(track);
      }
    );

    this.tracks      = tracks;
    this.savedConfig = savedConfig;

    this.addTracks();
  },

  saveConfig: function () {
    if (this._constructing || !this.saveable) {
      return;
    }

    const config = [];

    this.tracks.forEach(
      (track) => {
        if (track.id && !(track instanceof LegendTrack) && !(track instanceof HighlightRegionTrack)) {
          // when saving height, initialHeight is the height of the track once margins have been added, while defaultHeight is the DEFINED height of the track.
          // Subtracting the difference between them gives you back the correct height to input back into the track when loading configuration
          const conf = {
            id         : track.id,
            namespace  : track.namespace,
            order      : track.order,
            autoHeight : track.autoHeight,
            height     : track.height - (track.initialHeight - track.defaultHeight),
          };

          if (track.config) {
            conf.config = Object.assign(conf.config || {}, track.config);
          }

          config.push(conf);
        }
      }
    );

    // Safari in private browsing mode does not allow writes to storage, so wrap in a try/catch to stop errors occuring
    try {
      window[this.storageType].setItem(this.saveKey, JSON.stringify(config));
    } catch (e) {
      // do nothing
    }
  },

  resetConfig: function () {
    // Non removable highlights should be re-added after reset
    let unremovableHighlights = [];

    if (this.tracksById.highlights) {
      this.tracksById.highlights.removeHighlights();
      unremovableHighlights = Object.values(this.tracksById.highlights.prop('featuresById'));
    }

    try {
      window[this.storageType].removeItem(this.saveKey);
    } catch (e) {
      // do nothing
    }

    this._constructing = true;
    this.savedConfig   = {};

    this.removeTracks([ ...this.tracks ]); // Shallow clone to ensure that removeTracks doesn't hit problems when splicing this.tracks
    this.addTracks($.extend(true, [], this.defaultTracks));

    if (unremovableHighlights.length) {
      this.addHighlights(unremovableHighlights);
    }

    this._constructing = false;
  },

  addDomElements: function (width) {
    this.menus          = $();
    this.labelContainer = $('<ul class="gv-label-container">').appendTo(this.container).sortable({
      items  : 'li:not(.gv-unsortable)',
      handle : '.gv-handle',
      axis   : 'y',
      helper : 'clone',
      cursor : 'move',
      update : this.updateTrackOrder.bind(this),
      start  : function (e, ui) {
        ui.placeholder.css({ height: ui.item.height(), visibility: 'visible' }).html(ui.item.html());
        ui.helper.hide();
      },
    });

    this.wrapper  = $('<div class="gv-wrapper">').appendTo(this.container);
    this.selector = $('<div class="gv-selector gv-crosshair">').appendTo(this.wrapper);

    this.selectorControls = this.zoomInHighlight = this.zoomOutHighlight = $();

    this.container.addClass('gv-canvas-container').width(width);

    if (!this.isStatic) {
      this.selectorControls = $(`
        <div class="gv-selector-controls gv-panel">
          <div class="gv-button-set">
          <div class="gv-position">
            <div class="gv-chr"></div>
            <div class="gv-start-end">
              <div class="gv-start"></div>
              <div class="gv-end"></div>
            </div>
          </div>
          </div>
          <div class="gv-button-set">
            <button class="gv-zoom-here">Zoom here</butto
          </div>
          <div class="gv-button-set">
            <button class="gv-center">Center</button>
          </div>
          <div class="gv-button-set">
            <button class="gv-highlight">Highlight</butto
          </div>
          <div class="gv-button-set">
            <button class="gv-cancel">Cancel</button>
          </div>
        </div>'
      `).appendTo(this.selector);

      this.zoomInHighlight = $(`
        <div class="gv-canvas-zoom gv-i">
          <div class="gv-t gv-l gv-h"></div>
          <div class="gv-t gv-r gv-h"></div>
          <div class="gv-t gv-l gv-v"></div>
          <div class="gv-t gv-r gv-v"></div>
          <div class="gv-b gv-l gv-h"></div>
          <div class="gv-b gv-r gv-h"></div>
          <div class="gv-b gv-l gv-v"></div>
          <div class="gv-b gv-r gv-v"></div>
        </div>
      `).appendTo('body');

      this.zoomOutHighlight = this.zoomInHighlight.clone().toggleClass('gv-i gv-o').appendTo('body');
    }
  },

  addUserEventHandlers: function () {
    const eventNamespace = this.eventNamespace;
    const documentEvents = {};
    const events         = {};

    events[`mousedown${eventNamespace}`] = (e) => {
      this.hideMessages();

      // Only scroll on left click, and do nothing if clicking on a button in selectorControls
      if ((!e.which || e.which === 1) && !(e.currentTarget === this.selector[0] && e.target !== e.currentTarget)) {
        this.mousedown(e);
      }

      return false;
    };

    events[`mousewheel${eventNamespace}`] = (e, delta, deltaX, deltaY) => {
      if (this.noWheelZoom) {
        return true;
      }

      this.hideMessages();

      if (this.wheelAction === 'zoom') {
        return this.mousewheelZoom(e, delta);
      }

      // Support horizontal wheel/2-finger scroll on trackpads
      if (deltaY === 0 && deltaX !== 0) {
        this.startDragScroll(e);
        this.move(-deltaX * 10);
        this.stopDragScroll(false);

        return false;
      }
    };

    events[`dblclick${eventNamespace}`] = (e) => {
      if (this.isStatic) {
        return true;
      }

      this.hideMessages();
      this.mousewheelZoom(e, 1);
    };

    this.container.on(events, '.gv-image-container, .gv-selector');

    this.selectorControls.on('click', (e) => {
      const pos = this.getSelectorPosition();

      switch (e.target.className) {
        case 'gv-zoom-here':
          this.setRange(pos.start, pos.end, true);

          break;
        case 'gv-center':
          this.moveTo(this.chr, pos.start, pos.end, true, true);
          this.cancelSelect();

          break;
        case 'gv-highlight':
          this.addHighlight({ chr: this.chr, start: pos.start, end: pos.end });
        case 'gv-cancel':
          this.cancelSelect();

          break;
        default: break;
      }
    });

    documentEvents[`mouseup${this.eventNamespace}`]    = this.mouseup.bind(this);
    documentEvents[`mousemove${this.eventNamespace}`]  = this.mousemove.bind(this);
    documentEvents[`keydown${this.eventNamespace}`]    = this.keydown.bind(this);
    documentEvents[`keyup${this.eventNamespace}`]      = this.keyup.bind(this);
    documentEvents[`mousewheel${this.eventNamespace}`] = (e) => {
      if (this.wheelAction === 'zoom') {
        if (this.wheelTimeout) {
          clearTimeout(this.wheelTimeout);
        }

        this.noWheelZoom  = this.noWheelZoom || e.target !== this.container[0];
        this.wheelTimeout = setTimeout(() => { this.noWheelZoom = false; }, 300);
      }
    };

    $(document).on(documentEvents);
    $(window).on(`${this.useHash ? 'hashchange' : 'popstate'}${this.eventNamespace}`, this.popState.bind(this));
  },

  onTracks: function (func, ...args) {
    this.tracks.forEach(
      (track) => {
        if (track.disabled) {
          return;
        }

        const mvc = track._interface[func];

        if (mvc) {
          track[mvc][func](...args);
        } else if (track[func]) {
          track[func](...args);
        }
      }
    );
  },

  reset: function (...args) {
    this.onTracks('reset', ...args);
    this.prev  = {};
    this.scale = 9e99; // arbitrary value so that setScale resets track scales as well
    this.setRange(this.start, this.end);
  },

  setWidth: function (width) {
    this.width  = width;
    this.width -= this.labelWidth;

    if (this.controlPanel) {
      this.width -= this.controlPanel.outerWidth(true);
    }

    if (this.superContainer) {
      this.superContainer.width(width);
      this.container.width(this.width);
    } else {
      this.container.width(width);
    }

    setTimeout(
      () => {
        this.onTracks('setWidth', Math.min(this.width, this.container.width())); // If this.container has borders, this.container.width() could be less than this.width
        this.reset('resizing');
      },
      1
    );
  },

  mousewheelZoom: function (e, delta) {
    clearTimeout(this.zoomDeltaTimeout);
    clearTimeout(this.zoomTimeout);

    this.zoomDeltaTimeout = setTimeout(
      () => {
        if (delta > 0) {
          this.zoomInHighlight.css({ left: e.pageX - 20, top: e.pageY - 20, display: 'block' }).animate(
            {
              width  : 80,
              height : 80,
              top    : '-=20',
              left   : '-=20',
            },
            {
              complete: function () {
                $(this).css({ width: 40, height: 40, display: 'none' });
              },
            }
          );
        } else {
          this.zoomOutHighlight.css({ left: e.pageX - 40, top: e.pageY - 40, display: 'block' }).animate(
            {
              width  : 40,
              height : 40,
              top    : '+=20',
              left   : '+=20',
            },
            {
              complete: function () {
                $(this).css({ width: 80, height: 80, display: 'none' });
              },
            }
          );
        }
      },
      100
    );

    this.zoomTimeout = setTimeout(
      () => {
        this[delta > 0 ? 'zoomIn' : 'zoomOut'](e.pageX - this.container.offset().left - this.labelWidth);

        if (this.dragAction === 'select') {
          this.moveSelector(e);
        }
      },
      300
    );

    return false;
  },

  startDragScroll: function (e) {
    this.dragging    = 'scroll';
    this.scrolling   = !e;
    this.dragOffset  = e ? e.pageX - this.left : 0;
    this.dragStart   = this.start;
    this.scrollDelta = Math.max(this.scale, this.defaultScrollDelta);
  },

  stopDragScroll: function (update) {
    this.dragging  = false;
    this.scrolling = false;

    if (update !== false) {
      if (this.start !== this.dragStart) {
        this.updateURL();
      }

      this.checkTrackHeights();
    }
  },

  startDragSelect: function (e) {
    if (!e) {
      return false;
    }

    const x = Math.max(0, e.pageX - this.wrapper.offset().left - 2);

    this.dragging        = 'select';
    this.selectorStalled = false;
    this.selectorStart   = x;

    this.selector.css({ left: x, width: 0 }).removeClass('gv-crosshair');
    this.selectorControls.hide();
  },

  stopDragSelect: function (e) {
    if (!e) {
      return false;
    }

    this.dragging        = false;
    this.selectorStalled = true;

    if (this.selector.outerWidth(true) < 2) {
      return this.cancelSelect();
    }

    // Calculate the position, so that selectorControls appear near the mouse cursor
    const top = Math.min(e.pageY - this.wrapper.offset().top, this.wrapper.outerHeight(true) - 1.2 * this.selectorControls.outerHeight(true));
    const pos = this.getSelectorPosition();

    this.selectorControls.find('.gv-chr').html(this.chr);
    this.selectorControls.find('.gv-start').html(pos.start);
    this.selectorControls.find('.gv-end').html(pos.end);

    this.selectorControls.find('.gv-selector-location').html(`${this.chr}:${pos.start}-${pos.end}`).end().css({
      top  : top,
      left : this.selector.outerWidth(true) / 2 - this.selectorControls.outerWidth(true) / 2,
    }).show();
  },

  cancelSelect: function (keepDragging) {
    if (!keepDragging) {
      this.dragging = false;
    }

    this.selectorStalled = false;

    this.selector.addClass('gv-crosshair').width(0);
    this.selectorControls.hide();

    if (this.dragAction === 'scroll') {
      this.selector.hide();
    }
  },

  dragSelect: function (e) {
    const x = e.pageX - this.wrapper.offset().left;

    if (x > this.selectorStart) {
      this.selector.css({
        left  : this.selectorStart,
        width : Math.min(x - this.selectorStart, this.width - this.selectorStart - 1),
      });
    } else {
      this.selector.css({
        left  : Math.max(x, 1),
        width : Math.min(this.selectorStart - x, this.selectorStart - 1),
      });
    }
  },

  setDragAction: function (action, keepSelect) {
    this.dragAction = action;

    if (this.dragAction === 'select') {
      this.selector.addClass('gv-crosshair').width(0).show();
    } else if (keepSelect && !this.selector.hasClass('gv-crosshair')) {
      this.selectorStalled = false;
    } else {
      this.cancelSelect();
      this.selector.hide();
    }
  },

  toggleSelect: function (on) {
    if (on) {
      this.prev.dragAction = 'scroll';
      this.setDragAction('select');
    } else {
      this.setDragAction(this.prev.dragAction, true);
      delete this.prev.dragAction;
    }
  },

  setWheelAction: function (action) {
    this.wheelAction = action;
  },

  keydown: function (e) {
    if (e.which === 16 && !this.prev.dragAction && this.dragAction === 'scroll') { // shift key
      this.toggleSelect(true);
    } else if (e.which === 27) { // escape key
      this.cancelSelect();
      this.closeMenus();
    }
  },

  keyup: function (e) {
    if (e.which === 16 && this.prev.dragAction) { // shift key
      this.toggleSelect();
    }
  },

  mousedown: function (e) {
    if (e.shiftKey) {
      if (this.dragAction === 'scroll') {
        this.toggleSelect(true);
      }
    } else if (this.prev.dragAction) {
      this.toggleSelect();
    }

    switch (this.dragAction) {
      case 'select':
        this.startDragSelect(e);

        break;
      case 'scroll':
        this.startDragScroll(e);

        break;
      default: break;
    }
  },

  mouseup: function (e) {
    switch (this.dragging) {
      case 'select':
        this.stopDragSelect(e);

        break;
      case 'scroll':
        this.stopDragScroll();

        break;
      default: break;
    }
  },

  mousemove: function (e) {
    if (this.dragging && !this.scrolling) {
      switch (this.dragAction) {
        case 'scroll':
          this.move(e.pageX - this.dragOffset - this.left);

          break;
        case 'select':
          this.dragSelect(e);

          break;
        default: break;
      }
    } else if (this.dragAction === 'select') {
      this.moveSelector(e);
    }
  },

  moveSelector: function (e) {
    if (!this.selectorStalled) {
      this.selector.css('left', e.pageX - this.wrapper.offset().left - 2);
    }
  },

  move: function (delta) {
    const scale = this.scale;

    if (scale > 1) {
      delta = Math.round(delta / scale) * scale; // Force stepping by base pair when in small regions
    }

    let left = this.left + delta;

    if (left <= this.minLeft) {
      left  = this.minLeft;
      delta = this.minLeft - this.left;
    } else if (left >= this.maxLeft) {
      left  = this.maxLeft;
      delta = this.maxLeft - this.left;
    }

    let start = Math.max(Math.round(this.start - delta / scale), 1);
    let end   = start + this.length - 1;

    if (end > this.chromosomeSize) {
      end   = this.chromosomeSize;
      start = end - this.length + 1;
    }

    this.left = left;

    if (start !== this.dragStart) {
      this.closeMenus();
      this.cancelSelect(true);
    }

    this.onTracks('move', delta);
    this.setRange(start, end);
  },

  moveTo: function (chr, start, end, update, keepLength) {
    if (typeof chr !== 'undefined' && String(chr) !== String(this.chr)) {
      if (this.canChangeChr) {
        if (this.genome && this.genome[chr]) {
          this.chr            = chr;
          this.chromosomeSize = this.genome[chr].size;
          this.start          = this.end = this.scale = -1;
        } else {
          this.die('Chromosome cannot be found in genome');
        }

        this.onTracks('changeChr');
      } else {
        this.die('Chromosome changing is not allowed');
      }
    }

    this.setRange(start, end, update, keepLength);

    if (this.prev.scale === this.scale) {
      this.left = Math.max(Math.min(this.left + Math.round((this.prev.start - this.start) * this.scale), this.maxLeft), this.minLeft);
      this.onTracks('moveTo', this.chr, this.start, this.end, (this.prev.start - this.start) * this.scale);
    }
  },

  setRange: function (start, end, update, keepLength) {
    this.prev.start = this.start;
    this.prev.end   = this.end;
    this.start      = Math.min(Math.max(typeof start === 'number' ? Math.floor(start) : parseInt(start, 10), 1), this.chromosomeSize);
    this.end        = Math.max(Math.min(typeof end   === 'number' ? Math.floor(end)   : parseInt(end,   10), this.chromosomeSize), 1);

    if (this.end < this.start) {
      this.end = Math.min(this.start + this.defaultLength - 1, this.chromosomeSize);
    }

    if (keepLength && this.end - this.start + 1 !== this.length) {
      if (this.end === this.chromosomeSize) {
        this.start = this.end - this.length + 1;
      } else {
        const center = (this.start + this.end) / 2;

        this.start = Math.max(Math.floor(center - this.length / 2), 1);
        this.end   = this.start + this.length - 1;

        if (this.end > this.chromosomeSize) {
          this.end   = this.chromosomeSize;
          this.start = this.end - this.length + 1;
        }
      }
    } else {
      this.length = this.end - this.start + 1;
    }

    this.setScale();

    if (update === true && (this.prev.start !== this.start || this.prev.end !== this.end)) {
      this.updateURL();
    }
  },

  setScale: function () {
    this.prev.scale  = this.scale;
    this.scale       = this.width / this.length;
    this.scaledStart = this.start * this.scale;

    if (this.prev.scale !== this.scale) {
      this.left        = 0;
      this.minLeft     = Math.round((this.end   - this.chromosomeSize) * this.scale);
      this.maxLeft     = Math.round((this.start - 1) * this.scale);
      this.labelBuffer = Math.ceil(this.textWidth / this.scale) * this.longestLabel;

      if (this.prev.scale) {
        this.cancelSelect();
        this.closeMenus();
      }

      this.onTracks('setScale');
      this.onTracks('makeFirstImage');
    }
  },

  checkTrackHeights: function () {
    if (this.dragging) {
      return;
    }

    this.onTracks('checkHeight');
  },

  resetTrackHeights: function () {
    this.onTracks('resetHeight');
  },

  zoomIn: function (x) {
    if (!x) {
      x = this.width / 2;
    }

    const start = Math.round(this.start + x / (2 * this.scale));
    const end   = this.length === 2 ? start : Math.round(start + (this.length - 1) / 2);

    this.setRange(start, end, true);
  },

  zoomOut: function (x) {
    if (!x) {
      x = this.width / 2;
    }

    const start = Math.round(this.start - x / this.scale);
    const end   = this.length === 1 ? start + 1 : Math.round(start + 2 * (this.length - 1));

    this.setRange(start, end, true);
  },

  addTrack: function (track, after) {
    return this.addTracks([ track ], after)[0];
  },

  addTracks: function (tracks, after) {
    const defaults = {
      browser : this,
      width   : Math.min(this.width, this.container.width()), // If this.container has borders, this.container.width() could be less than this.width
    };

    const push = Boolean(tracks);

    let order;

    tracks = tracks || [ ...this.tracks ];

    if (push && !this.tracks.filter(t => typeof t === 'function').length) {
      const [ insertAfter ] = (after ? this.tracks.filter(t => t.order < after) : this.tracks).sort((a, b) => b.order - a.order);

      if (insertAfter) {
        order = insertAfter.order + 0.1;
      }
    }

    for (let i = 0; i < tracks.length; i++) {
      tracks[i] = new tracks[i]({
        ...defaults,
        namespace : Genoverse.getTrackNamespace(tracks[i]),
        order     : typeof order === 'number' ? order : i,
        config    : this.savedConfig ? $.extend(true, {}, this.savedConfig[tracks[i].prototype.id]) : undefined,
      });

      if (tracks[i].id) {
        this.tracksById[tracks[i].id] = tracks[i];
      }

      if (push) {
        this.tracks.push(tracks[i]);
      } else {
        this.tracks[i] = tracks[i];
      }
    }

    this.sortTracks();
    this.saveConfig();

    return tracks;
  },

  removeTrack: function (track) {
    if (track) {
      this.removeTracks((track.prop('childTracks') || []).concat(track));
    }
  },

  removeTracks: function (tracks) {
    let i = tracks.length;

    while (i--) {
      const track = tracks[i];

      let j = this.tracks.length;

      while (j--) {
        if (track === this.tracks[j]) {
          this.tracks.splice(j, 1);

          break;
        }
      }

      if (track.id) {
        delete this.tracksById[track.id];
      }

      track.destructor(); // Destroy DOM elements and track itself
    }

    this.saveConfig();
  },

  sortTracks: function () {
    if (this.tracks.some(track => typeof track !== 'object')) {
      return;
    }

    const sorted     = this.tracks.slice().sort((a, b) => a.order - b.order);
    const labels     = $();
    const containers = $();

    sorted.forEach(
      (track, i) => {
        if (track.prop('parentTrack')) {
          return;
        }

        if (!track.prop('fixedOrder')) {
          track.prop('order', i);
        }

        const container = track.prop('superContainer') || track.prop('container');

        if (track.prop('menus').length) {
          track.prop('top', container.position().top);
        }

        labels.push(track.prop('label')[0]);
        containers.push(container[0]);
      }
    );

    this.labelContainer.append(labels);
    this.wrapper.append(containers);

    // Correct the order
    this.tracks = sorted;

    labels.map(function () { return $(this).data('track'); }).each(function () {
      if (this.prop('menus').length) {
        const diff = (this.prop('superContainer') || this.prop('container')).position().top - this.prop('top');

        this.prop('menus').css('top', (j, top) => parseInt(top, 10) + diff);
        this.prop('top', null);
      }
    });
  },

  updateTrackOrder: function (e, ui) {
    const track = ui.item.data('track');

    if (track.prop('unsortable') || track.prop('fixedOrder')) {
      return;
    }

    const prev  = ui.item.prev().data('track');
    const next  = ui.item.next().data('track');
    const p     = prev ? prev.prop('order') : 0;
    const n     = next ? next.prop('order') : 0;
    const o     = p || n;
    const order = (
      prev && next && Math.floor(n) === Math.floor(p)
        ? p + (n - p) / 2
        : o + ((p ? 1 : -1) * Math.abs(Math.round(o) - o || 1)) / 2
    );

    track.prop('order', order);

    this.sortTracks();
    this.saveConfig();
  },

  updateURL: function () {
    if (this.urlParamTemplate) {
      if (this.useHash) {
        window.location.hash = this.getQueryString();
      } else {
        window.history.pushState({}, '', this.getQueryString());
      }
    }
  },

  popState: function () {
    if (this.baseURL && !window.location.href.match(this.baseURL)) {
      return;
    }

    const coords = this.getCoords();
    const start  = parseInt(coords.start, 10);
    const end    = parseInt(coords.end,   10);

    if (
      (coords.chr && String(coords.chr) !== String(this.chr)) ||
      (coords.start && !(start === this.start && end === this.end))
    ) {
      // FIXME: a back action which changes scale or a zoom out will reset tracks, since scrollStart will not be the same as it was before
      this.moveTo(coords.chr, start, end);
      this.closeMenus();
      this.hideMessages();
    }
  },

  getCoords: function () {
    const coords = {};

    let match = `${decodeURIComponent(this.useHash ? window.location.hash.replace(/^#/, '?') || window.location.search : window.location.search)}&`.match(this.paramRegex);
    let i     = 0;

    if (!match) {
      return this.initialLocation;
    }

    match = match.slice(2, -1);

    this.urlParamTemplate.split('__').forEach(
      (part) => {
        const partMatch = part.match(/^(CHR|START|END)$/);

        if (partMatch) {
          coords[partMatch[1].toLowerCase()] = partMatch[1] === 'CHR' ? match[i++] : parseInt(match[i++], 10);
        }
      }
    );

    return (
      coords.chr && coords.start && coords.end && (this.genome ? this.genome[coords.chr] : true)
        ? coords
        : this.initialLocation
    );
  },

  getQueryString: function () {
    const location = this.urlParamTemplate
      .replace('__CHR__',   this.chr)
      .replace('__START__', this.start)
      .replace('__END__',   this.end);

    const currentLocation = `${decodeURIComponent(this.useHash ? window.location.hash.replace(/^#/, '?') : window.location.search)}&`;

    let newLocation = (
      currentLocation.match(this.paramRegex)
        ? currentLocation.replace(this.paramRegex, `$1${location}$5`).slice(0, -1)
        : `${currentLocation}${location}`
    );

    if (this.useHash) {
      newLocation = newLocation.replace(/^[&?]/, '');
    } else if (newLocation.indexOf('?') !== 0) {
      newLocation = `?${newLocation.replace(/^&/, '')}`;
    }

    return newLocation;
  },

  getChromosomeSize: function (chr) {
    return chr && this.genome && this.genome[chr] ? this.genome[chr].size : this.chromosomeSize;
  },

  supported: function () {
    const el = document.createElement('canvas');

    return !!(el.getContext && el.getContext('2d'));
  },

  die: function (error, el) {
    if (el && el.length) {
      el.html(error);
    } else {
      throw error;
    }

    this.failed = true;
  },

  menuTemplate: $(`
    <div class="gv-menu">
      <div class="gv-close gv-menu-button fas fa-times-circle"></div>
      <div class="gv-menu-loading">Loading...</div>
      <div class="gv-menu-error">An error has occurred</div>
      <div class="gv-menu-content">
        <div class="gv-title"></div>
        <table class="gv-focus-highlight">
          <tr>
            <td><a class="gv-focus" href="#">Focus here</a></td>
            <td><a class="gv-highlight" href="#">Highlight this feature</a></td>
          </tr>
        </table>
        <table></table>
      </div>
    </div>
  `).on('click', function (e) {
    if ($(e.target).hasClass('gv-close')) {
      $(this).fadeOut('fast', function () {
        const data = $(this).data();

        if (data.track) {
          data.track.prop('menus', data.track.prop('menus').not(this));
        }

        data.browser.menus = data.browser.menus.not(this);
      });
    }
  }),

  makeMenu: function (features, event, track) {
    if (!features) {
      return false;
    }

    features = [].concat(features);

    if (features.length === 0) {
      return false;
    }

    if (features.length === 1) {
      return this.makeFeatureMenu(features[0], event, track);
    }

    const menu      = this.menuTemplate.clone(true).data({ browser: this });
    const contentEl = $('.gv-menu-content', menu).addClass('gv-menu-content-first');
    const table     = $('table:not(.gv-focus-highlight)', contentEl);

    $('.gv-focus-highlight, .gv-menu-loading', menu).remove();
    $('.gv-title', menu).html(`${features.length} features`);

    (track ? track.model.sortFeatures(features) : features.sort((a, b) => a.start - b.start)).forEach(
      (feature) => {
        const location = `${feature.chr}:${feature.start}${feature.end === feature.start ? '' : `-${feature.end}`}`;
        const title    = feature.menuLabel || feature.name || (Array.isArray(feature.label) ? feature.label.join(' ') : feature.label) || String(feature.id);

        $('<a href="#">').html(title.match(location) ? title : `${location} ${title}`).on('click', (e) => {
          this.makeFeatureMenu(feature, e, track);

          return false;
        }).appendTo($('<td>').appendTo($('<tr>').appendTo(table)));
      }
    );

    $('<div class="gv-menu-scroll-wrapper">').append(table).appendTo(contentEl);

    menu.appendTo(this.superContainer || this.container).show();

    if (event) {
      menu.css({ left: 0, top: 0 }).position({ of: event, my: 'left top', collision: 'flipfit' });
    }

    this.menus = this.menus.add(menu);

    if (track) {
      track.prop('menus', track.prop('menus').add(menu));
    }

    return menu;
  },

  makeFeatureMenu: function (feature, e, track) {
    const container = this.superContainer || this.container;

    const focus = ({ currentTarget }) => {
      const data    = $(currentTarget).data();
      const length  = data.end - data.start + 1;
      const context = Math.max(Math.round(length / 4), 25);

      this.moveTo(data.chr, data.start - context, data.end + context, true);

      return false;
    };

    const highlight = ({ currentTarget }) => {
      this.addHighlight($(currentTarget).data());

      return false;
    };

    if (!feature.menuEl || feature.menuEl.data('hasErrored') === true) {
      const menu    = this.menuTemplate.clone(true).data({ browser: this, feature: feature });
      const content = $('.gv-menu-content', menu).remove();
      const loading = $('.gv-menu-loading', menu);

      let getMenu;

      try {
        getMenu = track ? track.controller.populateMenu(feature) : feature;
      } catch (error) {
        getMenu = $.Deferred().reject(error);
        menu.data('hasErrored', true);
      }

      const isDeferred = typeof getMenu === 'object' && typeof getMenu.promise === 'function';

      if (!isDeferred) {
        loading.hide();
      }

      $.when(getMenu).done(
        (menuProperties) => {
          [].concat(menuProperties).forEach(
            (properties, i) => {
              const el      = content.clone().addClass(i ? '' : 'gv-menu-content-first').appendTo(menu);
              const chr     = typeof properties.chr !== 'undefined' ? properties.chr : feature.chr;
              const start   = parseInt(typeof properties.start !== 'undefined' ? properties.start : feature.start, 10);
              const end     = parseInt(typeof properties.end   !== 'undefined' ? properties.end   : feature.end,   10);
              const columns = Math.max(...Object.values(properties).map(value => (Array.isArray(value) ? value.length : 1)));

              let table = '';

              $('.gv-title', el)[properties.title ? 'html' : 'remove'](properties.title);

              if (track && start && end && !this.isStatic) {
                const linkData = {
                  chr   : chr,
                  start : start,
                  end   : Math.max(end, start),
                  label : feature.label || (properties.title || '').replace(/<[^>]+>/g, ''),
                  color : feature.color,
                };

                $('.gv-focus',     el).data(linkData).on('click', focus);
                $('.gv-highlight', el).data(linkData).on('click', highlight);
              } else {
                $('.gv-focus-highlight', el).remove();
              }

              Object.entries(properties).forEach(
                ([ key, value ]) => {
                  if (/^start|end$/.test(key) && value === false) {
                    return;
                  }

                  if (key !== 'title') {
                    const colspan = value === '' ? ` colspan="${columns + 1}"` : '';

                    table += `<tr><td${colspan}>${key}</td>`;

                    if (!colspan) {
                      if (Array.isArray(value)) {
                        value.forEach(
                          (prop) => {
                            table += `<td>${prop}</td>`;
                          }
                        );
                      } else if (columns === 1) {
                        table += `<td>${value}</td>`;
                      } else {
                        table += `<td colspan="${columns}">${value}</td>`;
                      }
                    }

                    table += '</tr>';
                  }
                }
              );

              $('table:not(.gv-focus-highlight)', el)[table ? 'html' : 'remove'](table);
            }
          );

          if (isDeferred) {
            loading.hide();
          }
        }
      ).fail(
        (error) => {
          loading.hide();
          menu.data('hasErrored', true);
          $('.gv-menu-error', menu).css('display', 'block');
          console.error(error); // eslint-disable-line no-console
        }
      );

      if (track) {
        menu.addClass(track.id).data('track', track);
      }

      feature.menuEl = menu.appendTo(container);
    } else {
      feature.menuEl.appendTo(container); // Move the menu to the end of the container again, so that it will always be on top of other menus
    }

    this.menus = this.menus.add(feature.menuEl);

    if (track) {
      track.prop('menus', track.prop('menus').add(feature.menuEl));
    }

    feature.menuEl.show(); // Must show before positioning, else position will be wrong

    if (e) {
      feature.menuEl.css({ left: 0, top: 0 }).position({ of: e, my: 'left top', collision: 'flipfit' });
    }

    return feature.menuEl;
  },

  closeMenus: function (obj) {
    obj = obj || this;

    obj.menus.filter(':visible').children('.gv-close').trigger('click');
    obj.menus = $();
  },

  hideMessages: function () {
    if (this.autoHideMessages) {
      this.wrapper.find('.gv-message-container').addClass('gv-collapsed');
    }
  },

  getSelectorPosition: function () {
    const left  = this.selector.position().left;
    const width = this.selector.outerWidth(true);
    const start = Math.round(left / this.scale) + this.start;

    let end = Math.round((left + width) / this.scale) + this.start - 1;

    end = end <= start ? start : end;

    return {
      start,
      end,
      left,
      width,
    };
  },

  addHighlight: function (highlight) {
    this.addHighlights([ highlight ]);
  },

  addHighlights: function (highlights) {
    if (!this.tracksById.highlights) {
      this.addTrack(HighlightRegionTrack);
    }

    this.tracksById.highlights.addHighlights(highlights);
  },

  on: function (events, obj, fn, once) {
    const eventMap = {};

    function makeEventMap(types, handler) {
      types.split(' ').forEach(
        (type) => {
          eventMap[type] = (eventMap[type] || []).concat(handler);
        }
      );
    }

    if (typeof events === 'object') {
      Object.entries(events).forEach(
        ([ key, value ]) => makeEventMap(key, value)
      );

      obj = obj || this;
    } else {
      if (typeof fn === 'undefined') {
        fn  = obj;
        obj = this;
      }

      makeEventMap(events, fn);
    }

    const type = obj instanceof Track || obj === 'tracks' ? 'tracks' : 'browser';

    Object.entries(eventMap).forEach(
      ([ key, value ]) => {
        const event     = `${key}${once ? '.once' : ''}`;
        const fnStrings = value.map(func => func.toString());

        this.events[type][event] = this.events[type][event] || [];

        if (
          !this.events[type][event].some(
            (func) => {
              const f = func.toString();

              return fnStrings.some(fnString => fnString === f);
            }
          )
        ) {
          this.events[type][event].push(...value);
        }
      }
    );
  },

  once: function (events, obj, fn) {
    this.on(events, obj, fn, true);
  },

  destroy: function () {
    this.onTracks('destructor');
    (this.superContainer || this.container).empty();

    if (this.zoomInHighlight) {
      this.zoomInHighlight.add(this.zoomOutHighlight).remove();
    }

    this.container.off(this.eventNamespace);
    $(window).add(document).off(this.eventNamespace);

    Object.keys(this).forEach(
      (key) => { delete this[key]; }
    );
  },
}, {
  id    : 0,
  Track : Track,

  getAllTrackTypes: function (namespace, n) {
    namespace = namespace || Track;

    if (n) {
      namespace = namespace[n];
    }

    if (!namespace) {
      return [];
    }

    const trackTypes = {};

    Object.entries(namespace).forEach(
      ([ type, func ]) => {
        if (typeof func === 'function' && !Base[type] && !/^(Controller|Model|View)$/.test(type)) {
          Object.entries(Genoverse.getAllTrackTypes(namespace, type)).forEach(
            ([ subtype, fn ]) => {
              if (typeof fn === 'function') {
                trackTypes[`${type}.${subtype}`] = fn;
              }
            }
          );

          trackTypes[type] = func;
        }
      }
    );

    return trackTypes;
  },

  getTrackNamespace: function (track) {
    const trackTypes = Genoverse.getAllTrackTypes();
    const namespaces = Object.entries(trackTypes).map(
      ([ name, constructor ]) => (track === constructor || track.prototype instanceof constructor ? name : false) // Find all namespaces which this track could be
    ).filter(Boolean);

    let j = namespaces.length;

    // Find the most specific namespace for this track - the one which isn't a parent of any other namespaces this track could be
    while (namespaces.length > 1) {
      for (let i = 0; i < namespaces.length - 1; i++) {
        if (trackTypes[namespaces[i]].prototype instanceof trackTypes[namespaces[i + 1]]) {
          namespaces.splice(i + 1, 1);

          break;
        } else if (trackTypes[namespaces[i + 1]].prototype instanceof trackTypes[namespaces[i]]) {
          namespaces.splice(i, 1);

          break;
        }
      }

      if (j-- < 0) {
        break; // Stop infinite loop if something went really wrong
      }
    }

    return namespaces[0];
  },
});

export default Genoverse;
