var Genoverse = Base.extend({
  defaults: {
    urlParamTemplate : 'r=__CHR__:__START__-__END__', // Overwrite this for your URL style
    width            : 1000,
    height           : 200,
    labelWidth       : 134,
    buffer           : 1,
    longestLabel     : 30,
    trackSpacing     : 2,
    tracks           : [],
    dragAction       : 'scroll', // options are: scroll, select, off
    wheelAction      : 'zoom',   // options are: zoom, off
    colors           : {
      background     : '#FFFFFF',
      majorGuideLine : '#CCCCCC',
      minorGuideLine : '#E5E5E5',
      sortHandle     : '#CFD4E7'
    }
  },
  
  constructor: function (config) {
    if (!this.supported()) {
      this.die('Your browser does not support this functionality');
    }
    
    $.extend(this, this.defaults, config);
    
    if (!(this.container && this.container.length)) {
      this.die('You must supply a ' + (this.container ? 'valid ' : '') + 'container element');
    }
    
    for (var key in this) {
      if (typeof this[key] === 'function' && !key.match(/^(base|extend|constructor|functionWrap|debugWrap)$/)) {
        this.functionWrap(key);
      }
    }
    
    this.init();
  },

  init: function () {
    var browser = this;
    var width   = this.width;
    
    this.paramRegex = new RegExp('([?&;])' + this.urlParamTemplate
      .replace(/(\b(\w+=)?__CHR__(.)?)/,   '$2(\\w+)$3')
      .replace(/(\b(\w+=)?__START__(.)?)/, '$2(\\d+)$3')
      .replace(/(\b(\w+=)?__END__(.)?)/,   '$2(\\d+)$3') + '([;&])'
    );
    
    this.history        = {};
    this.prev           = {};
    this.backgrounds    = {};
    this.useHash        = typeof window.history.pushState !== 'function';
    this.wrapperLeft    = this.labelWidth - width;
    this.width         -= this.labelWidth;
    this.textWidth      = document.createElement('canvas').getContext('2d').measureText('W').width;
    this.menuContainer  = $('<div class="menu_container">').css({ width: width - this.labelWidth - 1, left: this.labelWidth + 1 }).appendTo(this.container);
    this.labelContainer = $('<ul class="label_container">').width(this.labelWidth).appendTo(this.container).sortable({
      items       : 'li:not(.unsortable)',
      handle      : '.handle',
      placeholder : 'label',
      axis        : 'y',
      helper      : 'clone',
      cursor      : 'move',
      start       : function (e, ui) {
        ui.placeholder.css({ height: ui.item.height(), visibility: 'visible', background: browser.colors.sortHandle }).html(ui.item.html());
        ui.helper.hide();
      },
      update      : function (e, ui) {
        browser.tracks[ui.item.data('index')].container[ui.item[0].previousSibling ? 'insertAfter' : 'insertBefore'](browser.tracks[$(ui.item[0].previousSibling || ui.item[0].nextSibling).data('index')].container);
      }
    });
    
    this.wrapper  = $('<div class="wrapper">').appendTo(this.container);
    this.selector = $('<div class="selector crosshair"></div>').appendTo(this.wrapper);

    this.container.width(width);
    
    this.selectorControls = $('                      \
      <div class="selector_controls">                \
        <button class="zoomHere">Zoom here</button>  \
        <button class="center">Center</button>       \
        <button class="summary">Summary</button>     \
        <button class="cancel">Cancel</button>       \
      </div>                                         \
    ').appendTo(this.selector);
    
    this.zoomInHighlight = $('     \
      <div class="canvas_zoom i">  \
        <div class="t l h"></div>  \
        <div class="t r h"></div>  \
        <div class="t l v"></div>  \
        <div class="t r v"></div>  \
        <div class="b l h"></div>  \
        <div class="b r h"></div>  \
        <div class="b l v"></div>  \
        <div class="b r v"></div>  \
      </div>                       \
    ').appendTo('body');
    
    this.zoomOutHighlight = this.zoomInHighlight.clone().toggleClass('i o').appendTo('body');
    
    var coords = this.chr && this.start && this.end ? { chr: this.chr, start: this.start, end: this.end } : this.getCoords();
    
    this.chr = coords.chr;
    
    this.setRange(coords.start, coords.end);
    this.setHistory();
    this.setTracks();
    this.makeImage();
    this.addUserEventHandlers();
  },

  addUserEventHandlers: function () {
    var browser = this;
    
    this.container.on({
      mousedown: function (e) {
        if (!e.which || e.which === 1) { // Only scroll on left click
          browser.mousedown(e);
        }
        
        return false;
      },
      mousewheel: function (e, delta) {
        if (browser.wheelAction === 'zoom') {
          return browser.mousewheelZoom(e, delta);
        }
      }
    }, '.image_container, .overlay, .selector');

    $(document).on('mouseup',   $.proxy(this.mouseup,   this));
    $(document).on('mousemove', $.proxy(this.mousemove, this));
    
    this.selectorControls.on('click', function (e) {
      var left  = browser.selector.position().left;
      var width = browser.selector.outerWidth(true);
      var start = Math.round(left / browser.scale) + browser.start;
      var end   = Math.round((left + width) / browser.scale) + browser.start - 1;
          end   = end <= start ? start : end;
      
      switch (e.target.className) {
        case 'zoomHere' : browser.cancelSelect(); browser.setRange(start, end, true); break;
        case 'center'   : browser.move(null, browser.width / 2 - (left + width / 2), 'fast');
                          browser.updateURL();
                          browser.setHistory();
                          browser.cancelSelect(); break;
        case 'summary'  : browser.summary(start, end); break;
        case 'cancel'   : browser.cancelSelect(); break;
        default         : break;
      }
    });
    
    this.menuContainer.on('click', '.menu .close', function () {
      $(this).parent().fadeOut('fast');
    });
    
    if (this.useHash) {
      $(window).on('hashchange', function () {  
        browser.popState();
      });
    } else {
      window.onpopstate = function () {
        browser.popState();
      };
    }
  },
  
  reset: function () {
    var i = this.tracks.length;
    
    while (i--) {
      this.tracks[i].reset();
    }
    
    this.scale   = 9e99; // arbitrary value so that setScale resets track scales as well
    this.history = {};
    
    this.setRange(this.start, this.end);
    this.makeImage();
  },

  mousewheelZoom: function (e, delta) {
    var browser = this;
    
    if (this.dragAction === 'select') {
      this.cancelSelect();
      this.moveSelector(e);
    }
    
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
    }, 300);
    
    return false;
  },

  startDragScroll: function (e) {
    this.dragging   = true;
    this.prev.left  = this.left;
    this.dragOffset = e ? e.pageX - this.left : 0;
    this.dragStart  = this.start;
  },

  stopDragScroll: function (e, update) {
    this.dragging = false;
    
    $('.overlay', this.wrapper).add('.menu', this.menuContainer).css({
      left       : function (i, left) { return parseInt(left, 10) + parseInt($(this).css('marginLeft'), 10); },
      marginLeft : 0
    });
    
    if (update !== false) {
      if (this.start !== this.dragStart) {
        this.updateURL();
        this.setHistory();
        this.redraw();
      }
      
      this.checkTrackSize();
    }
  },

  startDragSelect: function (e) {
    if (!e) {
      return false;
    }
    
    var x = Math.max(0, e.pageX - this.wrapper.offset().left - 2);
    
    this.dragging        = true;
    this.selectorStalled = false;
    this.selectorStart   = x;
    
    this.selector.css({ left: x, width: 0 }).removeClass('crosshair');
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
    
    this.selectorControls.css({
      marginTop : -this.selectorControls.outerHeight() / 2,
      left      : this.selector.outerWidth(true) / 2 - this.selectorControls.outerWidth(true) / 2
    }).show();
  },

  cancelSelect: function () {
    this.dragging        = false;
    this.selectorStalled = false;
    
    this.selector.addClass('crosshair').width(0);
    this.selectorControls.hide();
  },

  dragSelect: function (e) {
    var x = e.pageX - this.wrapper.offset().left - 2;

    if (x > this.selectorStart) {
      this.selector.css({ 
        left  : this.selectorStart, 
        width : Math.min(x - this.selectorStart, this.width - this.selectorStart) - 4
      });
    } else {
      this.selector.css({ 
        left  : Math.max(x, 1), 
        width : Math.min(this.selectorStart - x, this.selectorStart - 1)
      });
    }    
  },

  setDragAction: function (action) {
    this.dragAction = action;
    
    if (this.dragAction === 'select') {
      this.selector.show();
    } else {
      this.cancelSelect();
      this.selector.hide();
    }
  },

  setWheelAction: function (action) {
    this.wheelAction = action;
  },

  mousedown: function (e) {
    switch (this.dragAction) {
      case 'select' : this.startDragSelect(e); break;
      case 'scroll' : this.startDragScroll(e); break;
      default       : break;
    }
  },
  
  mouseup: function (e, update) {
    if (!this.dragging) {
      return false;
    }
    
    switch (this.dragAction) {
      case 'select' : this.stopDragSelect(e);         break;
      case 'scroll' : this.stopDragScroll(e, update); break;
      default       : break;
    }
  },
  
  mousemove: function (e) {
    if (this.dragging) {
      switch (this.dragAction) {
        case 'scroll' : this.move(e);       break;
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

  move: function (e, delta, speed) {
    var wrapperOffset = this.wrapper.offset().left;
    var start, end, step;
    
    this.left = e ? e.pageX - this.dragOffset : this.left + delta;
    
    if (this.left < this.minLeft) {
      this.left = this.minLeft;
      
      start = this.chromosomeSize - this.length + 1;
      end   = this.chromosomeSize;
    } else if (this.left > this.maxLeft) {
      this.left = this.maxLeft;
      
      start = 1;
      end   = this.length;
    } else {
      start = e ? this.dragStart - (this.left - this.prev.left) / this.scale : this.start - delta / this.scale;
      end   = start + this.length - 1;
    }
    
    if (speed) {
      $('.track_container', this.container).stop().animate({ left: this.left }, speed);
      $('.overlay', this.wrapper).add('.menu', this.menuContainer).animate({ marginLeft: this.left - this.prev.left }, speed);
    } else {
      $('.track_container', this.container).css('left', this.left);
      $('.overlay', this.wrapper).add('.menu', this.menuContainer).css('marginLeft', this.left - this.prev.left);
    }
    
    $('.expander', this.wrapper).css('left', -this.left);
    $('.image_container img.static', this.container).css('marginLeft', function () { return wrapperOffset - $(this.parentNode).offset().left; });
    
    this.setRange(start, end);
    
    if (this.redraw()) {
      step = this.left - this.prev.left > 0 ? 1 : -1;
      
      this.stopDragScroll(e, false);
      this.startDragScroll(e);
      this.move(false, step); // Force the scroll on 1px in order to ensure the URL updates correctly (otherwise it might not if scrolling a very small amount on the boundary)
    }
  },
  
  checkTrackSize: function () {
    if (this.dragging) {
      return;
    }
    
    for (var i = 0; i < this.tracks.length; i++) {
      if (!this.tracks[i].fixedHeight) {
        this.tracks[i].checkSize();
        
        if (this.tracks[i].autoHeight || this.tracks[i].separateLabels) {
          this.tracks[i].resize(this.tracks[i][this.tracks[i].autoHeight ? 'fullVisibleHeight' : 'height'], this.tracks[i].labelTop);
        } else {
          this.tracks[i].toggleExpander();
        }
      }
    }
  },

  resetTrackHeights: function () {
    var track;
    
    for (var i = 0; i < this.tracks.length; i++) {
      track = this.tracks[i];
      
      if (track.resizable) {
        track.autoHeight = !!([ (track.config || {}).autoHeight, track.defaults.autoHeight, this.autoHeight ].sort(function (a, b) {
          return (typeof a !== 'undefined' && a !== null ? 0 : 1) - (typeof b !== 'undefined' && b !== null ?  0 : 1);
        })[0]);
        
        track.heightToggler[track.autoHeight ? 'addClass' : 'removeClass']('auto_height');
        
        track.resize(((track.config || {}).height || track.defaults.height) + track.spacing);
      }
    }
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
    
    if (start < 1) {
      start = 1;
    }
    
    if (end > this.chromosomeSize) {
      end = this.chromosomeSize;
    }
    
    this.setRange(start, end, true);
  },
  
  redraw: function () {
    if (this.left === 0 || (this.left > 0 && this.left < this.offsets.right) || (this.left < 0 && Math.abs(this.left) < Math.abs(this.offsets.left + this.wrapperLeft))) {
      return false;
    }
    
    this.makeImage();
    
    return true;
  },
  
  setRange: function (start, end, update, force) {
    this.prev.start = this.start;
    this.prev.end   = this.end;
    this.start      = typeof start === 'number' ? Math.round(start) : parseInt(start, 10);
    this.end        = typeof end   === 'number' ? Math.round(end)   : parseInt(end,   10);
    
    if (this.start < 1) {
      this.start = 1;
    }
    
    if (this.end > this.chromosomeSize) {
      this.end = this.chromosomeSize;
    }
    
    this.length = this.end - this.start + 1;
    
    this.setScale(force);
    
    if (update === true && (this.prev.start !== this.start || this.prev.end !== this.end)) {
      this.updateURL();
      this.setHistory();
      this.makeImage();
    }
  },
  
  setScale: function (force) {
    this.prev.scale  = this.scale;
    this.scale       = this.width / this.length;
    this.scaledStart = this.start * this.scale;
    
    if (force || this.prev.scale !== this.scale) {
      this.dataRegion  = { start: 9e99, end: -9e99 };
      this.offsets     = { right: this.width, left: -this.width };
      this.left        = 0;
      this.prev.left   = 0;
      this.minLeft     = Math.round((this.end   - this.chromosomeSize) * this.scale);
      this.maxLeft     = Math.round((this.start - 1) * this.scale);
      this.scrollStart = 'ss_' + this.start + '_' + this.end;
      this.labelBuffer = Math.ceil(this.textWidth / this.scale) * this.longestLabel;
      
      if (this.prev.scale) {
        var i = this.tracks.length;
        
        this.menuContainer.children().hide();
        
        while (i--) {
          this.tracks[i].setScale();
        }
        
        if (this.backgrounds) {
          for (var c in this.backgrounds) {
            i = this.backgrounds[c].length;
            
            while (i--) {
              this.backgrounds[c][i].scaledStart = this.backgrounds[c][i].start * this.scale;
              this.backgrounds[c][i].scaledEnd   = this.backgrounds[c][i].end   * this.scale;
            }
          }
        }
      }
    }
  },
  
  setTracks: function (tracks, index) {
    var defaults = {
      browser         : this,
      canvasContainer : this.wrapper,
      width           : this.width
    };
    
    var push = !!tracks;
    var hierarchy, Class, subClass;
    
    tracks = tracks || this.tracks;
    index  = index  || 0;
    
    for (var i = 0; i < tracks.length; i++) {
      if (typeof tracks[i].extend === 'function') {
        continue;
      }
      
      // Well, this is probably ugly, there could be a nicer way of doing it.
      hierarchy = (tracks[i].type || '').split('.');
      Class     = Genoverse.Track;
      
      while (subClass = hierarchy.shift()) {
        Class = Class[subClass];
      }
      
      tracks[i] = new Class($.extend(tracks[i], defaults, { index: i + index }));
      
      if (push) {
        this.tracks.push(tracks[i]);
      }
      
      if (tracks[i].strand === -1 && tracks[i].orderReverse) {
        tracks[i].order = tracks[i].orderReverse;
      }
    }
    
    if (!push) {
      this.sortTracks(); // initial sort
    }
    
    return tracks;
  },
  
  addTracks: function (tracks) {
    this.setTracks(tracks, this.tracks.length);
    this.sortTracks();
    this.makeTrackImages(tracks);
  },
  
  removeTracks: function (tracks) {
    var i      = tracks.length;
    var redraw = false;
    var track, j, k, bg;
    
    tracks.sort(function (a, b) { return a.index - b.index; }); // tracks must be ordered low to high by index for splice to work correctly (splice is done in track.remove())
    
    while (i--) {
      track = tracks[i];
      j     = track.backgrounds ? track.backgrounds.length : 0;
      
      while (j--) {
        bg = this.backgrounds[track.backgrounds[j].background];
        k  = bg.length;
        
        while (k--) {
          if (bg[k] === track.backgrounds[j]) {
            bg.splice(k, 1);
            redraw = true;
            break;
          }
        }
        
        if (bg.length === 0) {
          delete this.backgrounds[track.backgrounds[j].background];
        }
      }
      
      track.remove();
    }
    
    this.updateTracks(redraw);
  },
  
  updateTracks: function (redrawBackground) {
    var i = this.tracks.length;
    
    while (i--) {
      // redraw all backgrounds if a track which contributed to this.backgrounds has been added removed
      if (redrawBackground) {
        $(this.tracks[i].imgContainers).each(function () {
          $(this).children('.bg').remove().end().data('img').drawBackground();
        });
      }
      
      // correct track index
      if (this.tracks[i].index !== i) {
        this.tracks[i].index = i;
        this.tracks[i].label.data('index', i);
      }
    }
  },
  
  sortTracks: function () {
    var sorted     = $.extend([], this.tracks).sort(function (a, b) { return a.order - b.order; });
    var labels     = $();
    var containers = $();
    
    for (var i = 0; i < sorted.length; i++) {
      labels.push(sorted[i].label[0]);
      containers.push(sorted[i].canvas[0], sorted[i].container.detach()[0]);
    }
    
    this.labelContainer.append(labels);
    this.wrapper.append(containers);
    
    sorted = labels = containers = null;
  },
  
  makeImage: function () {
    var left = -this.left;
    var dir  = left < 0 ? 'right' : 'left';
    var start, end;
    
    if (left) {
      start = left > 0 ? this.dataRegion.end   : this.dataRegion.start - (this.buffer * this.length);
      end   = left < 0 ? this.dataRegion.start : this.dataRegion.end   + (this.buffer * this.length);
    } else {
      start = this.start - this.length;
      end   = this.end   + this.length + 1;
    }
    
    var width = Math.round((end - start) * this.scale);
    
    this.dataRegion.start = Math.min(start, this.dataRegion.start);
    this.dataRegion.end   = Math.max(end,   this.dataRegion.end);
    this.offsets[dir]    += width;
    
    if (this.updateFromHistory()) {
      return;
    }
    
    this.makeTrackImages(this.tracks, start, end, width);
  },
  
  makeTrackImages: function (tracks, start, end, width) {
    start = start || this.dataRegion.start;
    end   = end   || this.dataRegion.end;
    width = width || Math.round((end - start + 1) * this.scale);
    
    var browser    = this;
    var left       = -this.left;
    var dataRegion = $.extend({}, this.dataRegion);
    var offsets    = $.extend({}, this.offsets);
    var allTracks  = tracks.length === this.tracks.length;
    var overlay    = this.makeOverlays(width, allTracks ? false : tracks);
    
    function removeOverlay() {
      if (overlay) {
        overlay.remove();
        overlay = null;
      }
    }
    
    $.when.apply($, $.map(tracks, function (track) { return track.makeImage(start, end, width, left, browser.scrollStart); })).done(function () {
      var redraw = false;
      
      $.when.apply($, $.map($.map(arguments, function (a) {
        $(a.target).show();
        return a.img;
      }), function (i) { 
        if (i.track.backgrounds && !allTracks) {
          i.track.scaleFeatures(i.track.backgrounds);
          redraw = true;
        }
        
        return i.drawBackground();
      })).done(removeOverlay);
      
      if (allTracks) {
        browser.prev.history = browser.start + '-' + browser.end;
        browser.setHistory(dataRegion, offsets);
      } else {
        browser.updateTracks(redraw);
      }
      
      browser.checkTrackSize();
    }).fail(removeOverlay);
  },
  
  makeOverlays: function (width, tracks) {
    var overlay = $('<div class="overlay">').css({ left: this.left ? (width - (Math.abs(this.left) % width)) * (width > Math.abs(this.left) || this.left > 0 ? -1 : 1) : -this.width, width: width });
    
    if (tracks) {
      overlay = $($.map(
        $.map(tracks, function (t) { return [ t, t.forwardTrack || t.reverseTrack ]; }),
        function (track) { return track ? overlay.clone().addClass('track').css({ top: track.container.position().top, height: track.height })[0] : false; }
      ));
    }
    
    return overlay.prependTo(this.wrapper);
  },
  
  updateURL: function () {
    if (this.useHash) {
      window.location.hash = this.getQueryString();
    } else {
      window.history.pushState({}, '', this.getQueryString());
    }
  },
  
  setHistory: function (dataRegion, offsets) {
    if (this.prev.history) {
      var history = {
        dataRegion : dataRegion || this.history[this.prev.history].dataRegion,
        offsets    : offsets    || this.history[this.prev.history].offsets
      };
      
      if (!this.history[this.start + '-' + this.end] || (dataRegion && offsets)) {
        this.history[this.start + '-' + this.end] = $.extend({
          left        : this.left,
          scrollStart : this.scrollStart
        }, history);
      }
      
      if (dataRegion && offsets) {
        for (var i in this.history) {
          if (this.history[i].scrollStart === this.scrollStart) {
            $.extend(this.history[i], history);
          }
        }
      }
    }
  },
  
  popState: function () {
    var coords = this.getCoords();
    
    if (coords.start && !(parseInt(coords.start, 10) === this.start && parseInt(coords.end, 10) === this.end)) {
      this.setRange(coords.start, coords.end);
      
      if (!this.updateFromHistory()) {
        this.reset();
      }
    }
    
    var delta = Math.round((this.start - this.prev.start) * this.scale);
    
    $('.menu', this.menuContainer).css('left', function (i, left) { return parseInt(left, 10) - delta; });
  },
  
  updateFromHistory: function () {
    var history = this.history[this.start + '-' + this.end];
    
    if (history && (this.prev.start !== this.start || this.prev.end !== this.end)) {
      var images = $('.track_container .' + history.scrollStart, this.container);
      
      if (images.length) {
        var newTracks = $.grep(this.tracks, function (track) { return !$(track.imgContainers).filter('.' + history.scrollStart).length; });
        
        $('.track_container', this.container).css('left', history.left).children('.image_container').hide();
        
        $.extend(this, history);
        
        if (newTracks.length) {
          this.makeTrackImages(newTracks);
        }
        
        this.checkTrackSize();
        
        images.show();
        images = null;
        
        return true;
      }
    }
    
    return false;
  },
  
  getCoords: function () {
    var match  = ((this.useHash ? window.location.hash.replace(/^#/, '?') || window.location.search : window.location.search) + '&').match(this.paramRegex).slice(2, -1);
    var coords = {};
    var i      = 0;
    
    $.each(this.urlParamTemplate.split('__'), function () {
      var tmp = this.match(/^(CHR|START|END)$/);
      
      if (tmp) {
        coords[tmp[1].toLowerCase()] = match[i++];
      }
    });
    
    return coords;
  },
  
  getQueryString: function () {
    var location = this.urlParamTemplate
      .replace('__CHR__',   this.chr)
      .replace('__START__', this.start)
      .replace('__END__',   this.end);
    
    return this.useHash ? location : (window.location.search + '&').replace(this.paramRegex, '$1' + location + '$5').slice(0, -1);
  },
    
  supported: function () {
    var elem = document.createElement('canvas');
    return !!(elem.getContext && elem.getContext('2d'));
  },
  
  die: function (error) {
    alert(error);
    throw(error);
  },
  
  menuTemplate: $('               \
    <div class="menu">            \
      <div class="close">x</div>  \
      <table></table>             \
    </div>                        \
  '),
  
  // Creates a menu template only. Implement properly in a plugin
  makeMenu: function (track, feature, position) {
    var offset = this.menuContainer.offset();
    
    position.left -= offset.left;
    position.top  -= offset.top;
    
    var menu = this.menuTemplate.clone().appendTo(this.menuContainer).css({
      left : position.left,
      top  : function () { return position.top - parseInt($(this).css('marginTop'), 10); }
    });
    
    track.menus.push(menu[0]);
    
    $.when(track.populateMenu(feature)).done(function (items) {
      $('table', menu).append(
        (items.title ? '<tr class="header"><th colspan="2" class="title">' + items.title + '</th></tr>' : '') +
        $.map(items, function (value, key) {
          if (key !== 'title') {
            return '<tr><td>'+ key +'</td><td>'+ value +'</td></tr>';
          }
        }).join()
      );
      
      menu.show();
    });
    
    return menu;
  },

  // Provide summary of a region (as a popup menu)
  summary: function (start, end) {
    alert(
      'Not implemented' + "\n" +
      'Start: ' + start + "\n" +
      'End: '   + end   + "\n"
    );
  },

  /**
   * functionWrap - wraps event handlers and adds debugging functionality
   **/
  functionWrap: function (key, obj) {
    var func = key.substring(0, 1).toUpperCase() + key.substring(1);
        name = (obj ? (obj.name || '') + '(' + (obj.type || 'Track.') + ')' : 'Genoverse.') + key;
        obj  = obj || this;
    
    if (obj.debug) {
      this.debugWrap(obj, key, name, func);
    }
    
    // turn function into system event, enabling eventHandlers for before/after the event
    if (obj.systemEventHandlers['before' + func] || obj.systemEventHandlers['after' + func]) {
      obj['__original' + func] = obj[key];

      obj[key] = function () {
        var i, rtn;
        
        if (this.systemEventHandlers['before' + func]) {
          for (i = 0; i < this.systemEventHandlers['before' + func].length; i++) {
            // TODO: Should it stop once beforeFunc returned false or something??
            this.systemEventHandlers['before' + func][i].apply(this, arguments);
          }
        }
        
        rtn = this['__original' + func].apply(this, arguments);
        
        if (this.systemEventHandlers['after' + func]) {
          for (i = 0; i < this.systemEventHandlers['after' + func].length; i++) {
            // TODO: Should it stop once afterFunc returned false or something??
            this.systemEventHandlers['after' + func][i].apply(this, arguments);
          }
        }
        
        return rtn;
      };
    }
  },
  
  debugWrap: function (obj, key, name, func) {
    // Debugging functionality
    // Enabled by "debug": true || { functionName: true, ...} option
    // if "debug": true, simply log function call
    if (obj.debug === true) {
      if (!obj.systemEventHandlers['before' + func]) {
        obj.systemEventHandlers['before' + func] = [];
      }
      
      obj.systemEventHandlers['before' + func].unshift(function () {
        console.log(name + ' is called');
      });
    }
    
    // if debug: { functionName: true, ...}, log function time
    if (typeof obj.debug === 'object' && obj.debug[key]) {
      if (!obj.systemEventHandlers['before' + func]) {
        obj.systemEventHandlers['before' + func] = [];
      }
      
      if (!obj.systemEventHandlers['after' + func]) {
        obj.systemEventHandlers['after' + func] = [];
      }
      
      obj.systemEventHandlers['before' + func].unshift(function () {
        console.time(name);
      });
      
      obj.systemEventHandlers['after' + func].push(function () {
        console.timeEnd(name);
      });
    }
  },
  
  systemEventHandlers: {}
}, {
  on: function (events, handler) {
    $.each(events.split(' '), function () {
      if (typeof Genoverse.prototype.systemEventHandlers[this] === 'undefined') {
        Genoverse.prototype.systemEventHandlers[this] = [];
      }
      
      Genoverse.prototype.systemEventHandlers[this].push(handler);
    });
  }
});

window.Genoverse = Genoverse;