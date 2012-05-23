var CBrowse = Base.extend({
  defaults: {
    urlParamTemplate : 'r=__CHR__:__START__-__END__', // Overwrite this for your URL style
    width            : 1000,
    height           : 200,
    labelWidth       : 134,
    buffer           : 1,
    longestLabel     : 30,
    trackSpacing     : 2,
    tracks           : [],
    colors           : {
      background     : '#FFFFFF',
      majorScaleLine : '#CCCCCC',
      minorScaleLine : '#E5E5E5',
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
      if (typeof this[key] === 'function' && !key.match(/^(base|extend|constructor|functionWrap)$/)) {
        this.functionWrap(key);
      }
    }

    this.init();
  },

  init: function () {
    var cBrowse = this;
    var width   = this.width;
    
    this.history        = {};
    this.prev           = {};
    this.backgrounds    = {};
    this.tracksById     = {};
    this.wrapperLeft    = this.labelWidth - width;
    this.width         -= this.labelWidth;
    this.paramRegex     = new RegExp('([?&;])' + this.urlParamTemplate.replace(/^(\w+)=/, '($1)=').replace(/__CHR__(.)/, '(\\w+)($1)').replace(/__START__(.)/, '(\\d+)($1)').replace('__END__', '(\\d+)') + '([;&])');
    this.menuContainer  = $('<div class="menu_container">').css({ width: width - this.labelWidth - 1, left: this.labelWidth + 1 }).appendTo(this.container);
    this.labelContainer = $('<ul class="label_container">').width(this.labelWidth).appendTo(this.container).sortable({
      items       : 'li:not(.unsortable)',
      axis        : 'y',
      helper      : 'clone',
      placeholder : 'label',
      start       : function (e, ui) {
        ui.placeholder.css({ height: ui.item.height(), visibility: 'visible', background: cBrowse.colors.sortHandle }).html(ui.item.html());
        ui.helper.hide();
      },
      update      : function (e, ui) {
        cBrowse.tracks[ui.item.data('index')].container[ui.item[0].previousSibling ? 'insertAfter' : 'insertBefore'](cBrowse.tracks[$(ui.item[0].previousSibling || ui.item[0].nextSibling).data('index')].container);
      }
    });
    
    this.wrapper = $('<div class="wrapper">').appendTo(this.container);
    
    this.container.width(width).on({
      mousedown: function (e) {
        if (!e.which || e.which === 1) {  // Only scroll on left click
          cBrowse.mousedown(e);
        }
        
        return false;
      },
      mousewheel: function (e, delta) { 
        return cBrowse.mousewheelZoom(e, delta);
      }
    }, '.image_container, .overlay');
    
    $(document).on('mouseup', function (e) {
      if (cBrowse.dragging) {
        cBrowse.mouseup(e);
      }
    });
    
    window.onpopstate = function (e) {
      if (e.state !== null) {
        cBrowse.popState(e.state);
      }
    };
    
    var coords = (window.location.search + '&').match(this.paramRegex);
    
    this.chromosome = coords[3];
    
    this.setRange(coords[5], coords[7], false);
    this.setHistory('replaceState');
    this.setTracks();
    
    this.labelBuffer = Math.ceil(this.tracks[0].context.measureText('W').width / this.scale) * this.longestLabel;
    
    this.zoomInHighlight = $([
      '<div class="canvas_zoom i">',
        '<div class="t l h"></div>',
        '<div class="t r h"></div>',
        '<div class="t l v"></div>',
        '<div class="t r v"></div>',
        '<div class="b l h"></div>',
        '<div class="b r h"></div>',
        '<div class="b l v"></div>',
        '<div class="b r v"></div>',
      '</div>'
    ].join('')).appendTo('body');
    
    this.zoomOutHighlight = this.zoomInHighlight.clone().toggleClass('i o').appendTo('body');
    
    this.makeImage();
  },
  
  reset: function () {
    var i = this.tracks.length;
    
    while (i--) {
      this.tracks[i].reset();
    }
    
    this.scale   = 9e99; // arbitrary value so that setScale resets track scales as well
    this.history = {};
    
    this.setRange(this.start, this.end, false);
    this.makeImage();
  },

  mousewheelZoom: function (e, delta) {
    var cBrowse = this;
    clearTimeout(cBrowse.zoomDeltaTimeout);
    clearTimeout(cBrowse.zoomTimeout);
    
    cBrowse.zoomDeltaTimeout = setTimeout(function () {
      if (delta > 0) {
        cBrowse.zoomInHighlight.css({ left: e.pageX - 20, top: e.pageY - 20, display: 'block' }).animate({
          width: 80, height: 80, top: '-=20', left: '-=20'
        }, {
          complete: function () { $(this).css({ width: 40, height: 40, display: 'none' }); }
        });
      } else {
        cBrowse.zoomOutHighlight.css({ left: e.pageX - 20, top: e.pageY - 20, display: 'block' }).animate({
          width: 40, height: 40, top: '+=10', left: '+=10'
        }, {
          complete: function () { $(this).css({ width: 80, height: 80, display: 'none' }); }
        });
      }
    }, 100);
    
    cBrowse.zoomTimeout = setTimeout(function () {
      cBrowse[delta > 0 ? 'zoomIn' : 'zoomOut'](e.pageX - cBrowse.container.offset().left - cBrowse.labelWidth);
    }, 300);
    
    return false;
  },
  
  mousedown: function (e) {
    var cBrowse = this;
    
    this.dragging   = true;
    this.prev.left  = this.left;
    this.dragOffset = e.pageX - this.left;
    this.dragStart  = this.start;
    this.dragEvent  = function (e2) { cBrowse.move(e2); };
    
    $(document).on('mousemove', this.dragEvent);
  },
  
  mouseup: function (e, update) {
    this.dragging = false;
    
    $(document).off('mousemove', this.dragEvent);
    
    $('.overlay', this.wrapper).add('.menu', this.menuContainer).css({
      left       : function (i, left) { return parseInt(left, 10) + parseInt($(this).css('marginLeft'), 10); },
      marginLeft : 0
    });
    
    if (this.left !== this.prev.left && update !== false) {
      this.updateURL();
    }
    
    if (update !== false) {
      this.checkTrackSize();
    }
  },
  
  move: function (e, delta, speed) {
    var start, end;
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
      start = e ? this.dragStart - (this.left - this.prev.left) / this.scale : this.start - delta/this.scale;
      end   = start + this.length - 1;
    }

    if (speed) {
      var cBrowse = this;
      $('.track_container', this.container).stop().animate({ left: this.left }, speed);
      $('.overlay', this.wrapper).add('.menu', this.menuContainer).animate({ marginLeft: this.left - this.prev.left }, speed);
    } else {
      $('.track_container', this.container).css('left', this.left);
      $('.overlay', this.wrapper).add('.menu', this.menuContainer).css('marginLeft', this.left - this.prev.left);
    }

    this.setRange(start, end, false);

    if (this.redraw() && e) {
      this.mouseup(e, false);
      this.mousedown(e);
    } else if (!e) {
      this.updateURL();
      this.checkTrackSize();
    }
  },

  checkTrackSize: function () {
    for (var i = 0; i < this.tracks.length; i++) {
      if (!this.tracks[i].fixedHeight) {
        if (!this.dragging) {

          this.tracks[i].checkSize();

          if (this.tracks[i].autoHeight) {
            this.tracks[i].resize(this.tracks[i].fullVizibleHeight, this.tracks[i].labelTop);
          }
          
          if (this.tracks[i].sizeHandle) {
            this.tracks[i].sizeHandle.data('height', this.tracks[i].fullVizibleHeight);
          }
          
        }
      }
    }
  },
  
  zoomIn: function (x) {
    if (!x) {
      x = this.width / 2;
    }
    
    var start = Math.round(this.start + x / (2 * this.scale));
    var end   = Math.round(start + (this.length - 1) / 2);
    
    this.setRange(start, end);
  },
  
  zoomOut: function (x) {
    if (!x) {
      x = this.width / 2;
    }
    
    var start = Math.round(this.start - x / this.scale);
    var end   = Math.round(start + 2 * (this.length - 1));
    
    if (start < 1) {
      start = 1;
    }
    
    if (end > this.chromosomeSize) {
      end = this.chromosomeSize;
    }
    
    this.abortAjax();
    this.setRange(start, end);
  },
  
  redraw: function () {
    if ((this.left > 0 && this.left < this.offsets.right) || (this.left < 0 && Math.abs(this.left) < Math.abs(this.offsets.left + this.wrapperLeft))) {
      return false;
    }
    
    this.makeImage();
    
    return true;
  },
  
  setRange: function (start, end, update) {
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
    
    if (this.end === this.start) {
      this.end++;
    }
    
    this.length = this.end - this.start + 1;
    
    this.setScale();
    
    if (update !== false && (this.prev.start !== this.start || this.prev.end !== this.end)) {
      this.updateURL();
    }
  },
  
  setScale: function () {
    this.prev.scale  = this.scale;
    this.scale       = this.width / this.length;
    this.scaledStart = this.start * this.scale;
    
    if (this.prev.scale !== this.scale) {
      this.edges       = { start: 9e99, end: -9e99 };
      this.offsets     = { right: this.width, left: -this.width };
      this.left        = 0;
      this.prev.left   = 0;
      this.minLeft     = Math.round((this.end   - this.chromosomeSize) * this.scale);
      this.maxLeft     = Math.round((this.start - 1) * this.scale);
      this.scrollStart = 'ss_' + this.start + '_' + this.end;
      
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
      cBrowse         : this,
      canvasContainer : this.wrapper,
      paramRegex      : this.paramRegex,
      width           : this.width
    };
    
    var push = !!tracks;
    
    tracks = tracks || this.tracks;
    index  = index  || 0;
    
    for (var i = 0; i < tracks.length; i++) {
      if (tracks[i].type) {
        tracks[i] = new CBrowse.Track[tracks[i].type]($.extend(tracks[i], defaults, { index: i + index }));
      } else {
        tracks[i] = new CBrowse.Track($.extend(tracks[i], defaults, { index: i + index }));
      }
      
      if (push) {
        this.tracks.push(tracks[i]);
      }
      
      if (tracks[i].id) {
        this.tracksById[tracks[i].id] = tracks[i];
      }
      
      if (this.left) {
        tracks[i].offsets = this.left < 0 ? { right: this.offsets.right, left: -this.offsets.right } : { right: -this.offsets.left, left: this.offsets.left };
      }
    }
  },
  
  addTracks: function (tracks) {
    this.setTracks(tracks, this.tracks.length);
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
        
        if (this.tracks[i].label) {
          this.tracks[i].label.data('index', i);
        }
      }
    }
  },
  
  makeImage: function () {
    var left = -this.left;
    var dir  = left < 0 ? 'right' : 'left';
    var start, end;
    
    if (left) {
      start = left > 0 ? this.edges.end   : this.edges.start - (this.buffer * this.length);
      end   = left < 0 ? this.edges.start : this.edges.end   + (this.buffer * this.length);
    } else {
      start = this.start - this.length;
      end   = this.end   + this.length;
    }
    
    var width = Math.round((end - start) * this.scale);
    
    this.edges.start  = Math.min(start, this.edges.start);
    this.edges.end    = Math.max(end,   this.edges.end);
    this.offsets[dir] = this.tracks[0].offsets[dir] + width;
    
    if (this.updateFromHistory()) {
      return;
    }
    
    this.makeTrackImages(this.tracks, start, end, width);
  },
  
  makeTrackImages: function (tracks, start, end, width) {
    start = start || this.edges.start;
    end   = end   || this.edges.end;
    width = width || Math.round((end - start) * this.scale);
    
    var cBrowse   = this;
    var left      = -this.left;
    var edges     = $.extend({}, this.edges);
    var offsets   = $.extend({}, this.offsets);
    var allTracks = tracks.length === this.tracks.length;
    var overlay   = allTracks ? $('<div class="overlay">').prependTo(this.wrapper).css(left < 0 ? 'right' : 'left', left ? width - (Math.abs(left) % width) : 0).width(width) : false;
    
    function removeOverlay() {
      if (overlay) {
        overlay.remove();
        overlay = null;
      }
    }
    
    $.when.apply($, $.map(tracks, function (track) { return track.makeImage(start, end, width, left, cBrowse.scrollStart); })).done(function () {
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
        cBrowse.prev.history = cBrowse.start + '-' + cBrowse.end;
        cBrowse.setHistory(false, edges, offsets);
      } else {
        cBrowse.updateTracks(redraw);
      }
      
      cBrowse.checkTrackSize();
    }).fail(removeOverlay);
  },
  
  updateURL: function (redraw) {
    this.setHistory();
    
    if (redraw !== false) {
      this.redraw();
    }
  },
  
  setHistory: function (action, edges, offsets) {
    if (action !== false) {
      if (this.prev.location === this.start + '-' + this.end) {
        return;
      }
      
      this.prev.location = this.start + '-' + this.end;
    
      window.history[action || 'pushState']({}, '', this.getQueryString());
    }
    
    if (this.prev.history) {
      this.history[this.start + '-' + this.end] = {
        left    : this.left,
        images  : this.scrollStart,
        edges   : edges   || this.history[this.prev.history].edges,
        offsets : offsets || this.history[this.prev.history].offsets
      };
    }
  },
  
  popState: function () {
    var coords = (window.location.search + '&').match(this.paramRegex);
    
    if (coords.length) {
      this.setRange(coords[5], coords[7], false);
      
      if (!this.updateFromHistory()) {
        this.reset();
      }
    }
  },
  
  updateFromHistory: function () {
    var history = this.history[this.start + '-' + this.end];
    
    if (history) {
      var images = $('.track_container .' + history.images, this.container);
      
      if (images.length) {
        $('.track_container', this.container).css('left', history.left).children().hide();
        
        this.left    = history.left;
        this.edges   = history.edges;
        this.offsets = history.offsets;
        
        this.checkTrackSize();
        
        images.show();
        images = null;
        
        return true;
      }
    }
    
    return false;
  },
  
  abortAjax: function () {
    var i = this.tracks.length;
    
    while (i--) {
      if (this.tracks[i].ajax) {
        this.tracks[i].ajax.abort();
      }
    }
  },
  
  getQueryString: function () {
    return (window.location.search + '&').replace(this.paramRegex, '$1$2=$3$4' + this.start + '$6' + this.end + '$8').slice(0, -1);
  },
  
  supported: function () {
    var elem = document.createElement('canvas');
    return !!(elem.getContext && elem.getContext('2d') && typeof window.history.pushState === 'function');
  },
  
  die: function (error) {
    alert(error);
    throw(error);
  },

  makeMenu: $.noop, // implement in plugin

  /**
   * 
   * functionWrap - wraps event handlers & adds debugging functionality
   *
   **/
  functionWrap: function (key) {
    var func = key.substring(0, 1).toUpperCase() + key.substring(1);
    var name = 'CBrowse.' + key;
    var i, rtn;
    
    //
    // Debugging functionality
    // enabled by "debug": true || { functionName: true, ...} option
    //
    // if "debug": true, simply log function call
    if (this.debug === true) {
      if (!this.systemEventHandlers['before' + func]) { this.systemEventHandlers['before' + func] = []; }
      this.systemEventHandlers['before' + func].unshift(function(){
        console.log(name +' is called');
      });
    }

    // if debug: { functionName: true, ...}, log function time
    if (typeof(this.debug) === "object" && this.debug[key]) {
      if (!this.systemEventHandlers['before' + func]) { this.systemEventHandlers['before' + func] = []; }
      if (!this.systemEventHandlers['after'  + func]) { this.systemEventHandlers['after'  + func] = []; }
      this.systemEventHandlers['before' + func].unshift(function(){
        console.time(name);
      });
      this.systemEventHandlers['after' + func].push(function(){
        console.timeEnd(name);
      });
    }
    // End of debugging functionality

    // 
    // turn function into system event, enabling eventHandlers for before/after the event
    if (this.systemEventHandlers['before' + func] || this.systemEventHandlers['after' + func]) {
      this['__original' + func] = this[key];

      this[key] = function () {
        if (this.systemEventHandlers['before' + func]) {
          for (i = 0; i < this.systemEventHandlers['before' + func].length; i++) {
            // TODO: Should it stop once beforeFnc returned false or something??
            this.systemEventHandlers['before' + func][i].apply(this, arguments);
          }
        }
        
        rtn = this['__original' + func].apply(this, arguments);
        
        if (this.systemEventHandlers['after' + func]) {
          for (i = 0; i < this.systemEventHandlers['after' + func].length; i++) {
            // TODO: Should it stop once afterFn returned false or something??
            this.systemEventHandlers['after' + func][i].apply(this, arguments);
          }
        }
        
        return rtn;
      }
    }
    
  },
  
  systemEventHandlers: {}

}, {
  on: function (event, handler) {
    if (typeof CBrowse.prototype.systemEventHandlers[event] === 'undefined') {
      CBrowse.prototype.systemEventHandlers[event] = [];
    }
    
    CBrowse.prototype.systemEventHandlers[event].push(handler);
  }
});
