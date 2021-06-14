const genomeHash = require('./Genomes');

const runningInModule = Boolean(typeof module === 'object' && typeof module.exports === 'object');
const Genoverse = Base.extend({
  // Defaults
  baseClassName      : 'Genoverse',
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

  constructor: function (config) {
    var browser = this;

    if (!this.supported()) {
      return this.die('Your browser does not support this functionality');
    }

    config = config || {};

    config.container = $(config.container); // Make sure container is a jquery object, jquery recognises itself automatically

    if (!(config.container && config.container.length)) {
      config.container = $('<div>').appendTo('body');
    }

    config.container.addClass('genoverse').data('genoverse', this);

    $.extend(this, config);

    this.eventNamespace = '.genoverse.' + (++Genoverse.id);
    this.events         = { browser: {}, tracks: {} };

    $.when(Genoverse.ready, this.loadGenome(), this.loadPlugins()).always(function () {
      Genoverse.wrapFunctions(browser);
      browser.init();
    });
  },

  loadGenome: function () {
    if (typeof this.genome === 'string') {
      var genomeName = this.genome.toLowerCase();
      if(runningInModule) {
        this.genome = genomeHash[genomeName];
        return;
      }

      return $.ajax({
        url      : Genoverse.origin + 'js/genomes/' + genomeName + '.js',
        dataType : 'script',
        context  : this,
        success  : function () {
          this.genomeName = this.genome;
          this.genome     = Genoverse.Genomes[genomeName];

          if (!this.genome) {
            this.die('Unable to load genome ' + genomeName);
          }
        }
      });
    }
  },

  loadPlugins: function (plugins) {
    var browser         = this;
    var loadPluginsTask = $.Deferred();
    var i;

    plugins = plugins || this.plugins;

    this.loadedPlugins = this.loadedPlugins || {};

    for (i in Genoverse.Plugins) {
      this.loadedPlugins[i] = this.loadedPlugins[i] || 'script';
    }

    if (typeof plugins === 'string') {
      plugins = [ plugins ];
    }

    plugins = plugins.map(function (plugin) {
      return Array.isArray(plugin) ? plugin : [ plugin, {}];
    });

    var pluginsByName = plugins.reduce(
      function (acc, plugin) {
        acc[plugin[0]] = plugin;
        return acc;
      },
      {}
    );

    function loadPlugin(arg) {
      var plugin   = arg[0];
      var css      = Genoverse.origin + 'css/'        + plugin + '.css';
      var js       = Genoverse.origin + 'js/plugins/' + plugin + '.js';
      var deferred = $.Deferred();

      function done() {
        browser.loadedPlugins[plugin] = browser.loadedPlugins[plugin] || 'script';
        deferred.resolve(arg);
      }

      function getCSS() {
        var doNotGetCss =
          runningInModule ||
          Genoverse.Plugins[plugin].noCSS ||
          $('link[href="' + css + '"]').length;

        if (doNotGetCss) {
          return done();
        }

        $('<link href="' + css + '" rel="stylesheet">').on('load', done).appendTo('body');
      }

      if (browser.loadedPlugins[plugin] || $('script[src="' + js + '"]').length) {
        getCSS();
      } else if (!runningInModule) {
        $.getScript(js, getCSS);
      }

      return deferred;
    }

    function initializePlugin(plugin, conf) {
      if (typeof Genoverse.Plugins[plugin] !== 'function' || browser.loadedPlugins[plugin] === true) {
        return [];
      }

      var requires = Genoverse.Plugins[plugin].requires;
      var deferred = $.Deferred();

      function init() {
        if (browser.loadedPlugins[plugin] !== true) {
          Genoverse.Plugins[plugin].call(browser, conf);
          // We use a different class here so this doesn't conflict with the old version of Genoverse running elsewhere
          // TODO: Remove this once we're only using one version, or find a different way to scope the styles eventually
          browser.container.addClass('gvm-' + plugin.replace(/([A-Z])/g, '-$1').toLowerCase() + '-plugin');
          browser.loadedPlugins[plugin] = true;
        }

        deferred.resolve();
      }

      if (requires) {
        $.when(
          browser.loadPlugins(
            [].concat(requires).map(function (pluginName) {
              return pluginsByName[pluginName] || pluginName;
            })
          )
        ).done(init);
      } else {
        init();
      }

      return deferred;
    }

    // Load plugins css file
    $.when.apply($, $.map(plugins, loadPlugin)).done(function () {
      var pluginsLoaded = [];
      var plugin;

      for (i = 0; i < arguments.length; i++) {
        plugin = arguments[i];

        if (browser.loadedPlugins[plugin[0]] !== true) {
          pluginsLoaded.push(initializePlugin(plugin[0], plugin[1]));
        }
      }

      $.when.apply($, pluginsLoaded).always(loadPluginsTask.resolve);
    });

    return loadPluginsTask;
  },

  init: function () {
    var width = this.width;

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
    this.saveKey          = this.saveKey ? 'genoverse-' + this.saveKey : 'genoverse';
    this.urlParamTemplate = this.urlParamTemplate || '';
    this.useHash          = typeof this.useHash === 'boolean' ? this.useHash : typeof window.history.pushState !== 'function';
    this.textWidth        = document.createElement('canvas').getContext('2d').measureText('W').width;
    this.labelWidth       = this.labelContainer.outerWidth(true) || 0;
    this.width            = Math.min(this.width - this.labelWidth, this.wrapper.width() || Infinity); // Recalculate the width to ignore the affect of borders

    this.paramRegex       = this.urlParamTemplate ? new RegExp('([?&;])' + this.urlParamTemplate
      .replace(/(\b(\w+=)?__CHR__(.)?)/,   '$2([\\w\\.]+)$3')
      .replace(/(\b(\w+=)?__START__(.)?)/, '$2(\\d+)$3')
      .replace(/(\b(\w+=)?__END__(.)?)/,   '$2(\\d+)$3') + '([;&])'
    ) : '';

    var coords = this.getCoords();

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
    var config;

    this.defaultTracks = $.extend(true, [], this.tracks);

    try {
      config = window[this.storageType].getItem(this.saveKey);
    } catch (e) {}

    if (config) {
      config = JSON.parse(config);
    } else {
      return this.addTracks();
    }

    var tracksByNamespace = Genoverse.getAllTrackTypes();
    var tracks                = [];
    var tracksById            = {};
    var tracksFromLibraryById = {};
    var savedConfig           = {};
    var i, prop, track, trackFromLibrary, trackId;

    function setConfig($track, conf) {
      for (prop in conf) {
        if (prop === 'config') {
          savedConfig[conf.id] = conf[prop];
        } else {
          if (prop === 'height') {
            conf[prop] = parseInt(conf[prop], 10);

            if (isNaN(conf[prop])) {
              continue;
            }
          }

          $track.prototype[prop] = conf[prop];
        }
      }
    }

    for (i = 0; i < this.tracks.length; i++) {
      if (this.tracks[i].prototype.id) {
        tracksById[this.tracks[i].prototype.id] = this.tracks[i];
      }
    }

    for (i = 0; i < this.tracksLibrary.length; i++) {
      track = this.tracksLibrary[i]

      if (typeof track === "function" && track.prototype.id) {
        tracksFromLibraryById[track.prototype.id] = track;
      }

      if (typeof track === "object") {
        const tracksCount = track.tracks.length
        if(tracksCount > 0){
          for (j = 0; j < tracksCount; j++) {
            if (this.tracksLibrary[i].tracks[j].prototype.id) {
              tracksFromLibraryById[track.tracks[j].prototype.id] = track.tracks[j];
            }
          }
        }
      }
    }

    for (i = 0; i < config.length; i++) {
      track = tracksById[config[i].id];
      trackFromLibrary = tracksFromLibraryById[config[i].id];

      if (track) {
        setConfig(track, config[i]);
        track._fromStorage = true;
      }
      else if(trackFromLibrary) {
        trackFromLibrary._fromStorage = true;
        setConfig(trackFromLibrary, config[i]);
        tracks.push(trackFromLibrary);
      }
      else if (tracksByNamespace[config[i].namespace]) {
        track   = tracksByNamespace[config[i].namespace];
        trackId = track.prototype.id;

        this.trackIds          = this.trackIds          || {};
        this.trackIds[trackId] = this.trackIds[trackId] || 1;

        if (tracksById[trackId]) {
          track = tracksById[trackId];
        }

        setConfig(track, config[i]);
        tracks.push(track);
      }
    }

    for (i = 0; i < this.tracks.length; i++) {
      if (this.tracks[i].prototype.id && !this.tracks[i]._fromStorage) {
        continue;
      }

      tracks.push(this.tracks[i]);
    }

    this.tracks      = tracks;
    this.savedConfig = savedConfig;

    this.addTracks();
  },

  saveConfig: function () {
    if (this._constructing || !this.saveable) {
      return;
    }

    var config = [];
    var conf, j;

    for (var i = 0; i < this.tracks.length; i++) {
      if (this.tracks[i].id && !(this.tracks[i].className && this.tracks[i].className === "Legend") && !(this.tracks[i].className && this.tracks[i].className === "HighlightRegion")) {
        // when saving height, initialHeight is the height of the track once margins have been added, while defaultHeight is the DEFINED height of the track.
        // Subtracting the difference between them gives you back the correct height to input back into the track when loading configuration
        conf = {
          id         : this.tracks[i].id,
          namespace  : this.tracks[i].namespace,
          order      : this.tracks[i].order,
          autoHeight : this.tracks[i].autoHeight,
          height     : this.tracks[i].height - (this.tracks[i].initialHeight - this.tracks[i].defaultHeight)
        };

        if (this.tracks[i].config) {
          for (j in this.tracks[i].config) {
            conf.config    = conf.config || {};
            conf.config[j] = this.tracks[i].config[j];
          }
        }

        config.push(conf);
      }
    }

    // Safari in private browsing mode does not allow writes to storage, so wrap in a try/catch to stop errors occuring
    try {
      window[this.storageType].setItem(this.saveKey, JSON.stringify(config));
    } catch (e) {}
  },

  resetConfig: function () {
    // Non removable highlights should be re-added after reset
    var unremovableHighlights = [];

    if (this.tracksById.highlights) {
      this.tracksById.highlights.removeHighlights();
      unremovableHighlights = $.map(this.tracksById.highlights.prop('featuresById'), function (h) { return h; });
    }

    try {
      window[this.storageType].removeItem(this.saveKey);
    } catch (e) {}

    this._constructing = true;
    this.savedConfig   = {};

    this.removeTracks($.extend([],    this.tracks)); // Shallow clone to ensure that removeTracks doesn't hit problems when splicing this.tracks
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
      update : $.proxy(this.updateTrackOrder, this),
      start  : function (e, ui) {
        ui.placeholder.css({ height: ui.item.height(), visibility: 'visible' }).html(ui.item.html());
        ui.helper.hide();
      }
    });

    this.wrapper  = $('<div class="gv-wrapper">').appendTo(this.container);
    this.selector = $('<div class="gv-selector gv-crosshair">').appendTo(this.wrapper);

    this.selectorControls = this.zoomInHighlight = this.zoomOutHighlight = $();

    this.container.addClass('gv-canvas-container').width(width);

    if (!this.isStatic) {
      this.selectorControls = $(
        '<div class="gv-selector-controls gv-panel">'         +
        '  <div class="gv-button-set">'                       +
        '  <div class="gv-position">'                         +
        '    <div class="gv-chr"></div>'                      +
        '    <div class="gv-start-end">'                      +
        '      <div class="gv-start"></div>'                  +
        '      <div class="gv-end"></div>'                    +
        '    </div>'                                          +
        '  </div>'                                            +
        '  </div>'                                            +
        '  <div class="gv-button-set">'                       +
        '    <button class="gv-zoom-here">Zoom here</button>' +
        '  </div>'                                            +
        '  <div class="gv-button-set">'                       +
        '    <button class="gv-center">Center</button>'       +
        '  </div>'                                            +
        '  <div class="gv-button-set">'                       +
        '    <button class="gv-highlight">Highlight</button>' +
        '  </div>'                                            +
        '  <div class="gv-button-set">'                       +
        '    <button class="gv-cancel">Cancel</button>'       +
        '  </div>'                                            +
        '</div>'
      ).appendTo(this.selector);

      this.zoomInHighlight = $(
        '<div class="gv-canvas-zoom gv-i">' +
        '  <div class="gv-t gv-l gv-h"></div>' +
        '  <div class="gv-t gv-r gv-h"></div>' +
        '  <div class="gv-t gv-l gv-v"></div>' +
        '  <div class="gv-t gv-r gv-v"></div>' +
        '  <div class="gv-b gv-l gv-h"></div>' +
        '  <div class="gv-b gv-r gv-h"></div>' +
        '  <div class="gv-b gv-l gv-v"></div>' +
        '  <div class="gv-b gv-r gv-v"></div>' +
        '</div>'
      ).appendTo('body');

      this.zoomOutHighlight = this.zoomInHighlight.clone().toggleClass('gv-i gv-o').appendTo('body');
    }
  },

  addUserEventHandlers: function () {
    var browser        = this;
    var eventNamespace = this.eventNamespace;
    var documentEvents = {};
    var events         = {};

    events['mousedown' + eventNamespace] = function (e) {
      browser.hideMessages();

      // Only scroll on left click, and do nothing if clicking on a button in selectorControls
      if ((!e.which || e.which === 1) && !(this === browser.selector[0] && e.target !== this)) {
        browser.mousedown(e);
      }

      return false;
    };

    events['mousewheel' + eventNamespace] = function (e, delta, deltaX, deltaY) {
      if (browser.noWheelZoom) {
        return true;
      }

      browser.hideMessages();

      if (browser.wheelAction === 'zoom') {
        return browser.mousewheelZoom(e, delta);
      }

      // Support horizontal wheel/2-finger scroll on trackpads
      if (deltaY === 0 && deltaX !== 0) {
        browser.startDragScroll(e);
        browser.move(-deltaX * 10);
        browser.stopDragScroll(false);
        return false;
      }
    };

    events['dblclick' + eventNamespace] = function (e) {
      if (browser.isStatic) {
        return true;
      }

      browser.hideMessages();
      browser.mousewheelZoom(e, 1);
    };

    this.container.on(events, '.gv-image-container, .gv-selector');

    this.selectorControls.on('click', function (e) {
      var pos = browser.getSelectorPosition();

      switch (e.target.className) {
        case 'gv-zoom-here' : browser.setRange(pos.start, pos.end, true); break;
        case 'gv-center'    : browser.moveTo(browser.chr, pos.start, pos.end, true, true); browser.cancelSelect(); break;
        case 'gv-highlight' : browser.addHighlight({ chr: browser.chr, start: pos.start, end: pos.end });
        case 'gv-cancel'    : browser.cancelSelect(); break;
        default             : break;
      }
    });

    documentEvents['mouseup'    + this.eventNamespace] = $.proxy(this.mouseup,   this);
    documentEvents['mousemove'  + this.eventNamespace] = $.proxy(this.mousemove, this);
    documentEvents['keydown'    + this.eventNamespace] = $.proxy(this.keydown,   this);
    documentEvents['keyup'      + this.eventNamespace] = $.proxy(this.keyup,     this);
    documentEvents['mousewheel' + this.eventNamespace] = function (e) {
      if (browser.wheelAction === 'zoom') {
        if (browser.wheelTimeout) {
          clearTimeout(browser.wheelTimeout);
        }

        browser.noWheelZoom  = browser.noWheelZoom || e.target !== browser.container[0];
        browser.wheelTimeout = setTimeout(function () { browser.noWheelZoom = false; }, 300);
      }
    };

    $(document).on(documentEvents);
    $(window).on((this.useHash ? 'hashchange' : 'popstate') + this.eventNamespace, $.proxy(this.popState, this));
  },

  onTracks: function () {
    var args = $.extend([], arguments);
    var func = args.shift();
    var mvc;

    for (var i = 0; i < this.tracks.length; i++) {
      if (this.tracks[i].disabled) {
        continue;
      }

      mvc = this.tracks[i]._interface[func];

      if (mvc) {
        this.tracks[i][mvc][func].apply(this.tracks[i][mvc], args);
      } else if (this.tracks[i][func]) {
        this.tracks[i][func].apply(this.tracks[i], args);
      }
    }
  },

  reset: function () {
    this.onTracks.apply(this, [ 'reset' ].concat([].slice.call(arguments)));
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
      (function () {
        this.onTracks('setWidth', Math.min(this.width, this.container.width())); // If this.container has borders, this.container.width() could be less than this.width
        this.reset('resizing');
      }).bind(this),
      1
    );
  },

  mousewheelZoom: function (e, delta) {
    var browser = this;

    clearTimeout(this.zoomDeltaTimeout);
    clearTimeout(this.zoomTimeout);

    this.zoomDeltaTimeout = setTimeout(function () {
      if (delta > 0) {
        browser.zoomInHighlight.css({ left: e.pageX - 20, top: e.pageY - 20, display: 'block' }).animate({
          width: 80, height: 80, top: '-=20', left: '-=20'
        }, {
          complete: function () { $(this).css({ width: 40, height: 40, display: 'none' }); }
        });
      } else {
        browser.zoomOutHighlight.css({ left: e.pageX - 40, top: e.pageY - 40, display: 'block' }).animate({
          width: 40, height: 40, top: '+=20', left: '+=20'
        }, {
          complete: function () { $(this).css({ width: 80, height: 80, display: 'none' }); }
        });
      }
    }, 100);

    this.zoomTimeout = setTimeout(function () {
      browser[delta > 0 ? 'zoomIn' : 'zoomOut'](e.pageX - browser.container.offset().left - browser.labelWidth);

      if (browser.dragAction === 'select') {
        browser.moveSelector(e);
      }
    }, 300);

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

    var x = Math.max(0, e.pageX - this.wrapper.offset().left - 2);

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
    var top = Math.min(e.pageY - this.wrapper.offset().top, this.wrapper.outerHeight(true) - 1.2 * this.selectorControls.outerHeight(true));
    var pos = this.getSelectorPosition();

    this.selectorControls.find('.gv-chr').html(this.chr);
    this.selectorControls.find('.gv-start').html(pos.start);
    this.selectorControls.find('.gv-end').html(pos.end);

    this.selectorControls.find('.gv-selector-location').html(this.chr + ':' + pos.start + '-' + pos.end).end().css({
      top  : top,
      left : this.selector.outerWidth(true) / 2 - this.selectorControls.outerWidth(true) / 2
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
    var x = e.pageX - this.wrapper.offset().left;

    if (x > this.selectorStart) {
      this.selector.css({
        left  : this.selectorStart,
        width : Math.min(x - this.selectorStart, this.width - this.selectorStart - 1)
      });
    } else {
      this.selector.css({
        left  : Math.max(x, 1),
        width : Math.min(this.selectorStart - x, this.selectorStart - 1)
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
      case 'select' : this.startDragSelect(e); break;
      case 'scroll' : this.startDragScroll(e); break;
      default       : break;
    }
  },

  mouseup: function (e) {
    switch (this.dragging) {
      case 'select' : this.stopDragSelect(e); break;
      case 'scroll' : this.stopDragScroll();  break;
      default       : break;
    }
  },

  mousemove: function (e) {
    if (this.dragging && !this.scrolling) {
      switch (this.dragAction) {
        case 'scroll' : this.move(e.pageX - this.dragOffset - this.left); break;
        case 'select' : this.dragSelect(e); break;
        default       : break;
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
    var scale = this.scale;
    var start, end, left;

    if (scale > 1) {
      delta = Math.round(delta / scale) * scale; // Force stepping by base pair when in small regions
    }

    left = this.left + delta;

    if (left <= this.minLeft) {
      left  = this.minLeft;
      delta = this.minLeft - this.left;
    } else if (left >= this.maxLeft) {
      left  = this.maxLeft;
      delta = this.maxLeft - this.left;
    }

    start = Math.max(Math.round(this.start - delta / scale), 1);
    end   = start + this.length - 1;

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
    if (typeof chr !== 'undefined' && chr != this.chr) {
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
        var center = (this.start + this.end) / 2;
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

    var start = Math.round(this.start + x / (2 * this.scale));
    var end   = this.length === 2 ? start : Math.round(start + (this.length - 1) / 2);

    this.setRange(start, end, true);
  },

  zoomOut: function (x) {
    if (!x) {
      x = this.width / 2;
    }

    var start = Math.round(this.start - x / this.scale);
    var end   = this.length === 1 ? start + 1 : Math.round(start + 2 * (this.length - 1));

    this.setRange(start, end, true);
  },

  addTrack: function (track, after) {
    return this.addTracks([ track ], after)[0];
  },

  addTracks: function (tracks, after) {
    var defaults = {
      browser : this,
      width   : Math.min(this.width, this.container.width()) // If this.container has borders, this.container.width() could be less than this.width
    };

    var push = !!tracks;
    var order;

    tracks = tracks || $.extend([], this.tracks);

    if (push && !$.grep(this.tracks, function (t) { return typeof t === 'function'; }).length) {
      var insertAfter = (after ? $.grep(this.tracks, function (t) { return t.order < after; }) : this.tracks).sort(function (a, b) { return b.order - a.order; })[0];

      if (insertAfter) {
        order = insertAfter.order + 0.1;
      }
    }

    for (var i = 0; i < tracks.length; i++) {
      tracks[i] = new tracks[i]($.extend(defaults, {
        namespace : Genoverse.getTrackNamespace(tracks[i]),
        order     : typeof order === 'number' ? order : i,
        config    : this.savedConfig ? $.extend(true, {}, this.savedConfig[tracks[i].prototype.id]) : undefined
      }));

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
    var i = tracks.length;
    var track, j;

    while (i--) {
      track = tracks[i];
      j     = this.tracks.length;

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
    if ($.grep(this.tracks, function (t) { return typeof t !== 'object'; }).length) {
      return;
    }

    var sorted     = $.extend([], this.tracks).sort(function (a, b) { return a.order - b.order; });
    var labels     = $();
    var containers = $();
    var container;

    for (var i = 0; i < sorted.length; i++) {
      if (sorted[i].prop('parentTrack')) {
        continue;
      }

      if (!sorted[i].prop('fixedOrder')) {
        sorted[i].prop('order', i);
      }

      container = sorted[i].prop('superContainer') || sorted[i].prop('container');

      if (sorted[i].prop('menus').length) {
        sorted[i].prop('top', container.position().top);
      }

      labels.push(sorted[i].prop('label')[0]);
      containers.push(container[0]);
    }

    this.labelContainer.append(labels);
    this.wrapper.append(containers);

    // Correct the order
    this.tracks = sorted;

    labels.map(function () { return $(this).data('track'); }).each(function () {
      if (this.prop('menus').length) {
        var diff = (this.prop('superContainer') || this.prop('container')).position().top - this.prop('top');
        this.prop('menus').css('top', function (j, top) { return parseInt(top, 10) + diff; });
        this.prop('top', null);
      }
    });

    sorted = labels = containers = null;
  },

  updateTrackOrder: function (e, ui) {
    var track = ui.item.data('track');

    if (track.prop('unsortable') || track.prop('fixedOrder')) {
      return;
    }

    var prev = ui.item.prev().data('track');
    var next = ui.item.next().data('track');
    var p    = prev ? prev.prop('order') : 0;
    var n    = next ? next.prop('order') : 0;
    var o    = p || n;
    var order;

    if (prev && next && Math.floor(n) === Math.floor(p)) {
      order = p + (n - p) / 2;
    } else {
      order = o + ((p ? 1 : -1) * Math.abs(Math.round(o) - o || 1)) / 2;
    }

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

    var coords = this.getCoords();
    var start  = parseInt(coords.start, 10);
    var end    = parseInt(coords.end,   10);

    if (
      (coords.chr && coords.chr != this.chr) ||
      (coords.start && !(start === this.start && end === this.end))
    ) {
      // FIXME: a back action which changes scale or a zoom out will reset tracks, since scrollStart will not be the same as it was before
      this.moveTo(coords.chr, start, end);
      this.closeMenus();
      this.hideMessages();
    }
  },

  getCoords: function () {
    var match  = ((this.useHash ? window.location.hash.replace(/^#/, '?') || decodeURIComponent(window.location.search) : decodeURIComponent(window.location.search)) + '&').match(this.paramRegex);
    var coords = {};
    var i      = 0;

    if (!match) {
      return this.initialLocation;
    }

    match = match.slice(2, -1);

    $.each(this.urlParamTemplate.split('__'), function () {
      var tmp = this.match(/^(CHR|START|END)$/);

      if (tmp) {
        coords[tmp[1].toLowerCase()] = tmp[1] === 'CHR' ? match[i++] : parseInt(match[i++], 10);
      }
    });

    return coords.chr && coords.start && coords.end ? coords : this.initialLocation;
  },

  getQueryString: function () {
    var location = this.urlParamTemplate
      .replace('__CHR__',   this.chr)
      .replace('__START__', this.start)
      .replace('__END__',   this.end);

    var currentLocation = (this.useHash ? window.location.hash.replace(/^#/, '?') : decodeURIComponent(window.location.search)) + '&';

    var newLocation = (
      currentLocation.match(this.paramRegex)
        ? currentLocation.replace(this.paramRegex, '$1' + location + '$5').slice(0, -1)
        : currentLocation + location
    );

    if (this.useHash) {
      newLocation = newLocation.replace(/^[&?]/, '');
    } else if (newLocation.indexOf('?') !== 0) {
      newLocation = '?' + newLocation.replace(/^&/, '');
    }

    return newLocation;
  },

  getChromosomeSize: function (chr) {
    return chr && this.genome && this.genome[chr] ? this.genome[chr].size : this.chromosomeSize;
  },

  supported: function () {
    var el = document.createElement('canvas');
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

  menuTemplate: $(
    '<div class="gvm-menu gv-wrap-values">'                                        +
      '<div class="gv-close gv-menu-button fas fa-times-circle"></div>'            +
      '<div class="gv-menu-loading">Loading...</div>'                              +
      '<div class="gv-menu-error">An error has occurred</div>'                     +
      '<div class="gv-menu-content">'                                              +
        '<div class="gv-title"></div>'                                             +
        '<table class="gv-focus-highlight">'                                       +
          '<tr>'                                                                   +
            '<td><a class="gv-focus" href="#">Focus here</a></td>'                 +
            '<td><a class="gv-highlight" href="#">Highlight this feature</a></td>' +
          '</tr>'                                                                  +
        '</table>'                                                                 +
        '<table></table>'                                                          +
      '</div>'                                                                     +
    '</div>'
  ).on('click', function (e) {
    if ($(e.target).hasClass('gv-close')) {
      $(this).fadeOut('fast', function () {
        var data = $(this).data();

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

    if (!Array.isArray(features)) {
      features = [ features ];
    }

    if (features.length === 0) {
      return false;
    }

    if (features.length === 1) {
      return this.makeFeatureMenu(features[0], event, track);
    }

    var browser   = this;
    var menu      = this.menuTemplate.clone(true).data({ browser: this });
    var contentEl = $('.gv-menu-content', menu).addClass('gv-menu-content-first');
    var table     = $('table:not(.gv-focus-highlight)', contentEl);

    $('.gv-focus-highlight, .gv-menu-loading', menu).remove();
    $('.gv-title', menu).html(features.length + ' features');

    $.each(features.sort(function (a, b) { return a.start - b.start; }), function (i, feature) {
      var location = feature.chr + ':' + feature.start + (feature.end === feature.start ? '' : '-' + feature.end);
      var title    = feature.menuLabel || feature.name || (Array.isArray(feature.label) ? feature.label.join(' ') : feature.label) || (feature.id + '');

      $('<a href="#">').html(title.match(location) ? title : (location + ' ' + title)).on('click', function (e) {
        browser.makeFeatureMenu(feature, e, track);
        return false;
      }).appendTo($('<td>').appendTo($('<tr>').appendTo(table)));
    });

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
    var browser   = this;
    var container = this.superContainer || this.container;
    var menu, content, loading, getMenu, isDeferred, i, j,  el, chr, start, end, linkData, key, columns, colspan;

    function focus() {
      var data    = $(this).data();
      var length  = data.end - data.start + 1;
      var context = Math.max(Math.round(length / 4), 25);

      browser.moveTo(data.chr, data.start - context, data.end + context, true);

      return false;
    }

    function highlight() {
      browser.addHighlight($(this).data());
      return false;
    }

    if (!feature.menuEl || feature.menuEl.data('hasErrored') === true) {
      menu    = browser.menuTemplate.clone(true).data({ browser: browser, feature: feature });
      content = $('.gv-menu-content', menu).remove();
      loading = $('.gv-menu-loading', menu);

      try {
        getMenu = track ? track.controller.populateMenu(feature) : feature;
      } catch (error) {
        getMenu = $.Deferred().reject(error);
        menu.data('hasErrored', true);
      }

      isDeferred = typeof getMenu === 'object' && typeof getMenu.promise === 'function';

      if (!isDeferred) {
        loading.hide();
      }

      $.when(getMenu).done(function (properties) {
        var table;

        if (!Array.isArray(properties)) {
          properties = [ properties ];
        }

        for (i = 0; i < properties.length; i++) {
          table   = '';
          el      = content.clone().addClass(i ? '' : 'gv-menu-content-first').appendTo(menu);
          chr     = typeof properties[i].chr !== 'undefined' ? properties[i].chr : feature.chr;
          start   = parseInt(typeof properties[i].start !== 'undefined' ? properties[i].start : feature.start, 10);
          end     = parseInt(typeof properties[i].end   !== 'undefined' ? properties[i].end   : feature.end,   10);
          columns = Math.max.apply(Math, $.map(properties[i], function (v) { return Array.isArray(v) ? v.length : 1; }));

          $('.gv-title', el)[properties[i].title ? 'html' : 'remove'](properties[i].title);

          if (track && start && end && !browser.isStatic) {
            linkData = { chr: chr, start: start, end: Math.max(end, start), label: feature.label || (properties[i].title || '').replace(/<[^>]+>/g, ''), color: feature.color };

            $('.gv-focus',     el).data(linkData).on('click', focus);
            $('.gv-highlight', el).data(linkData).on('click', highlight);
          } else {
            $('.gv-focus-highlight', el).remove();
          }

          for (key in properties[i]) {
            if (/^start|end$/.test(key) && properties[i][key] === false) {
              continue;
            }

            if (key !== 'title') {
              colspan = properties[i][key] === '' ? ' colspan="' + (columns + 1) + '"' : '';
              table  += '<tr><td' + colspan + '>' + key + '</td>';

              if (!colspan) {
                if (Array.isArray(properties[i][key])) {
                  for (j = 0; j < properties[i][key].length; j++) {
                    table += '<td>' + properties[i][key][j] + '</td>';
                  }
                } else if (columns === 1) {
                  table += '<td>' + properties[i][key] + '</td>';
                } else {
                  table += '<td colspan="' + columns + '">' + properties[i][key] + '</td>';
                }
              }

              table += '</tr>';
            }
          }

          $('table:not(.gv-focus-highlight)', el)[table ? 'html' : 'remove'](table);
        }

        if (isDeferred) {
          loading.hide();
        }
      }).fail(function (error) {
        loading.hide();
        menu.data('hasErrored', true);
        $('.gv-menu-error', menu).css('display', 'block');
        console.error(error);
      });

      if (track) {
        menu.addClass(track.id).data('track', track);
      }

      feature.menuEl = menu.appendTo(container);
    } else {
      feature.menuEl.appendTo(container); // Move the menu to the end of the container again, so that it will always be on top of other menus
    }

    browser.menus = browser.menus.add(feature.menuEl);

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
    var left  = this.selector.position().left;
    var width = this.selector.outerWidth(true);
    var start = Math.round(left / this.scale) + this.start;
    var end   = Math.round((left + width) / this.scale) + this.start - 1;
        end   = end <= start ? start : end;

    return { start: start, end: end, left: left, width: width };
  },

  addHighlight: function (highlight) {
    this.addHighlights([ highlight ]);
  },

  addHighlights: function (highlights) {
    if (!this.tracksById.highlights) {
      this.addTrack(Genoverse.Track.HighlightRegion);
    }

    this.tracksById.highlights.addHighlights(highlights);
  },

  on: function (events, obj, fn, once) {
    var browser  = this;
    var eventMap = {};
    var i, j, f, fnString, event;

    function makeEventMap(types, handler) {
      types = types.split(' ');

      for (j = 0; j < types.length; j++) {
        eventMap[types[j]] = (eventMap[types[j]] || []).concat(handler);
      }
    }

    function makeFnString(func) {
      return func.toString();
    }

    function compare(func) {
      f = func.toString();

      for (j = 0; j < fnString.length; j++) {
        if (f === fnString[j]) {
          return true;
        }
      }
    }

    if (typeof events === 'object') {
      for (i in events) {
        makeEventMap(i, events[i]);
      }

      obj = obj || this;
    } else {
      if (typeof fn === 'undefined') {
        fn  = obj;
        obj = this;
      }

      makeEventMap(events, fn);
    }

    var type = (obj.baseClassName && obj.baseClassName === 'Track') || obj === 'tracks' ? 'tracks' : 'browser';

    for (i in eventMap) {
      event = i + (once ? '.once' : '');

      browser.events[type][event] = browser.events[type][event] || [];
      fnString = $.map(eventMap[i], makeFnString);

      if (!$.grep(browser.events[type][event], compare).length) {
        browser.events[type][event].push.apply(browser.events[type][event], eventMap[i]);
      }
    }
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

    for (var key in this) {
      delete this[key];
    }
  }
}, {
  id      : 0,
  ready   : $.Deferred(),
  origin  : (($('script[src]').filter(function () { return /\/(?:Genoverse|genoverse\.min.*)\.js$/.test(this.src); }).attr('src') || '').match(/(.*)js\/\w+/) || [])[1] || '',
  Genomes : {},
  Plugins : {},

  wrapFunctions: function (obj) {
    for (var key in obj) {
      if (typeof obj[key] === 'function' && typeof obj[key].ancestor !== 'function' && !key.match(/^(base|extend|constructor|on|once|prop|loadPlugins|loadGenome)$/)) {
        Genoverse.functionWrap(key, obj);
      }
    }
  },

  /**
   * functionWrap - wraps event handlers and adds debugging functionality
   */
  functionWrap: function (key, obj) {
    obj.functions = obj.functions || {};

    if (obj.functions[key] || /^(before|after)/.test(key)) {
      return;
    }

    var func      = key.substring(0, 1).toUpperCase() + key.substring(1);
    var isBrowser = obj.baseClassName && obj.baseClassName === 'Genoverse';
    var mainObj   = isBrowser || obj.baseClassName && obj.baseClassName === 'Track' ? obj : obj.track;
    var events    = isBrowser ? obj.events.browser : obj.browser.events.tracks;
    var debug;

    if (mainObj.debug) {
      debug = [ isBrowser ? 'Genoverse' : mainObj.id || mainObj.name || 'Track' ];

      if (!isBrowser && obj !== mainObj) {
        debug.push(obj.baseClassName && obj.baseClassName === 'Controller' ? 'Controller' : obj.baseClassName && obj.baseClassName === 'Model' ? 'Model' : 'View');
      }

      debug = debug.concat(key).join('.');
    }

    obj.functions[key] = obj[key];

    obj[key] = function () {
      var args          = [].slice.call(arguments);
      var currentConfig = (this._currentConfig || (this.track ? this.track._currentConfig : {}) || {}).func;
      var rtn;

      // Debugging functionality
      // Enabled by "debug": true || 'time' || { functionName: true, ...} option
      if (mainObj.debug === true) { // if "debug": true, simply log function call
        console.log(debug);
      } else if (mainObj.debug === 'time' || (typeof mainObj.debug === 'object' && mainObj.debug[key])) { // if debug: 'time' || { functionName: true, ...}, log function time
        console.time('time: ' + debug);
      }

      function trigger(when) {
        var once  = events[when + func + '.once'] || [];

        const funcs = (events[when + func] || []).concat(once);
        if (typeof mainObj[when + func] === 'function') {
          funcs.push(mainObj[when + func])
        }
        // This was added to fix the "Features are drawn correctly" test (test/track_config/config-settings.js).
        // I found that the `beforeDrawFeature` is stored a little deeper.
        if (typeof mainObj.track === 'object' && typeof mainObj.track[when + func] === 'function') {
          funcs.push(mainObj.track[when + func]);
        }

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
        console.timeEnd('time: ' + debug);
      }

      return rtn;
    };
  },

  getAllTrackTypes: function (namespace, n) {
    namespace = namespace || Genoverse.Track;

    if (n) {
      namespace = namespace[n];
    }

    if (!namespace) {
      return [];
    }

    var trackTypes = {};

    $.each(namespace, function (type, func) {
      if (typeof func === 'function' && !Base[type] && !/^(Controller|Model|View)$/.test(type)) {
        $.each(Genoverse.getAllTrackTypes(namespace, type), function (subtype, fn) {
          if (typeof fn === 'function') {
            trackTypes[type + '.' + subtype] = fn;
          }
        });

        trackTypes[type] = func;
      }
    });

    return trackTypes;
  },

  getTrackNamespace: function (track) {
    var trackTypes = Genoverse.getAllTrackTypes();
    var namespaces = $.map(trackTypes, function (constructor, name) { return track === constructor || track.prototype instanceof constructor ? name : null; }); // Find all namespaces which this track could be
    var j          = namespaces.length;
    var i;

    // Find the most specific namespace for this track - the one which isn't a parent of any other namespaces this track could be
    while (namespaces.length > 1) {
      for (i = 0; i < namespaces.length - 1; i++) {
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
  }
});

$(function () {
  if(runningInModule) {
    return Genoverse.ready.resolve();
  }

  if ($('link[href^="' + Genoverse.origin + 'css/genoverse.css"]').length) {
    Genoverse.ready.resolve();
  } else {
    $('<link href="' + Genoverse.origin + 'css/genoverse.css" rel="stylesheet">').prependTo('body').on('load', Genoverse.ready.resolve);
  }
});

module.exports = Genoverse;
