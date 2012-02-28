var CBrowse = Base.extend({
  defaults: {
    urlParamTemplate : 'r=CHR:START-END', // Overwrite this for your URL style
    width            : 1000,
    height           : 200,
    labelWidth       : 134,
    buffer           : 1,
    longestLabel     : 30,
    tracks           : [],
    colors           : {
      foreground: '#000000',
      background: '#FFFFFF'
    }
  },

  constructor: function (config) {
    var cBrowse = this;
    
    $.extend(this, this.defaults, config);
    
    if (!(this.container && this.container.length)) {
      this.die('You must supply a ' + (this.container ? 'valid ' : '') + 'container element');
    }
    
    this.init();
  },

  init: function () {
    var cBrowse = this;
    var width   = this.width;
    
    this.data           = { start: 9e99, end: -9e99 };
    this.history        = {};
    this.prev           = {};
    this.width         -= this.labelWidth;
    this.fullWidth      = this.width * (2 * this.buffer + 1);
    this.wrapperLeft    = this.labelWidth - this.width;
    this.paramRegex     = new RegExp('([?&;])' + this.urlParamTemplate.replace(/^(\w+)=/, '($1)=').replace(/CHR(.)/, '(\\w+)($1)').replace(/START(.)/, '(\\d+)($1)').replace('END', '(\\d+)') + '([;&])');
    this.labelContainer = $('<div class="label_container">').width(this.labelWidth).appendTo(this.container);
    this.menuContainer  = $('<div class="menu_container">').css({ width: width - this.labelWidth - 1, left: this.labelWidth + 1 }).appendTo(this.container);
    
    this.container.width(width).on({
      mousedown: function (e) {
        cBrowse.mousedown(e);
        return false;
      },
      mousewheel: function (e, delta) {
        cBrowse[delta > 0 ? 'zoomIn' : 'zoomOut'](e.pageX - cBrowse.container.offset().left - cBrowse.labelWidth);
        return false;
      }
    }, '.image_container');
    
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
    
    this.setRange(coords[5], coords[7], false);
    this.setHistory(true);
    this.setTracks();
    this.makeImage();
  },
  
  reset: function () {
    var i = this.tracks.length;
    
    while (i--) {
      this.tracks[i].reset();
    }
    
    this.scale   = 9e99; // arbitrary value so that setScale resets track scales as well
    this.data    = { start: 9e99, end: -9e99 };
    this.history = {};
    
    this.setRange(this.start, this.end, false);
    this.makeImage();
  },
  
  mousedown: function (e) {
    var cBrowse = this;
    
    this.dragging   = true;
    this.prev.left  = this.left;
    this.dragOffset = e.pageX - this.left;
    this.dragStart  = this.start;
    this.dragEvent  = function (e2) { cBrowse.mousemove(e2); };
    
    $(document).on('mousemove', this.dragEvent);
  },
  
  mouseup: function (e, update) {
    this.dragging = false;
    
    if (this.left !== this.prev.left && update !== false) {
      this.updateURL();
    }
    
    $(document).off('mousemove', this.dragEvent);
  },
  
  mousemove: function (e) {
    var star, end;
    
    this.left = e.pageX - this.dragOffset;
    
    if (this.left < this.minLeft) {
      this.prev.left = this.left;
      this.left      = this.minLeft;
      
      start = this.chromosomeSize - this.length + 1;
      end   = this.chromosomeSize;
    } else if (this.left > this.maxLeft) {
      this.prev.left = this.left;
      this.left      = this.maxLeft;
      
      start = 1;
      end   = this.length;
    } else {
      start = this.dragStart - (this.left - this.prev.left) / this.scale;
      end   = start + this.length - 1;
    }
    
    $('.track_container', this.container).css('left', this.left);
    
    this.setRange(start, end, false);
    
    if (this.redraw()) {
      this.mouseup(e, false);
      this.mousedown(e);
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
      this.edges     = { start: 9e99, end: -9e99 };
      this.offsets   = { right: this.width, left: -this.width };
      this.left      = 0;
      this.prev.left = 0;
      this.minLeft   = Math.round((this.end   - this.chromosomeSize) * this.scale);
      this.maxLeft   = Math.round((this.start - 1) * this.scale);
      
      if (this.prev.scale) {
        this.menuContainer.children().hide();
        
        var i = this.tracks.length;
        
        while (i--) {
          this.tracks[i].setScale();
        }
      }
    }
  },
  
  setTracks: function () {
    var defaults = {
      cBrowse         : this,
      canvasContainer : $('<div class="wrapper">').appendTo(this.container),
      paramRegex      : this.paramRegex,
      width           : this.width
    };
    
    for (var i = 0; i < this.tracks.length; i++) {
      this.tracks[i] = new CBrowse.Track[this.tracks[i].type]($.extend(this.tracks[i], defaults));
      
      if (this.tracks[i].name) {
        this.tracks[i].label = $('<div>', { html: this.tracks[i].name, css: { marginTop: i && !this.tracks[i-1].label ? this.tracks[i-1].height : 0, height: this.tracks[i].height } }).appendTo(this.labelContainer);
      }
    }
  },
  
  makeImage: function () {
    var cBrowse = this;
    var left    = -this.left;
    var dir     = left < 0 ? 'right' : 'left';
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
    
    var edges   = $.extend({}, this.edges);
    var offsets = $.extend({}, this.offsets);
    
    $.when.apply($, $.map(this.tracks, function (track) { return track.makeImage(start, end, width, left); })).done(function () {
      var cls = 'scale_' + cBrowse.scale.toString().replace('.', '_');
      
      $($.map(arguments, function (a) { return a.target; })).show().parent().addClass(cls);
      
      cBrowse.prev.history = cBrowse.start + ':' + cBrowse.end;
      
      cBrowse.history[cBrowse.prev.history] = {
        left    : cBrowse.left,
        images  : '.' + cls,
        edges   : edges,
        offsets : offsets
      };
      
      cBrowse.data.start = Math.min(start, cBrowse.data.start);
      cBrowse.data.end   = Math.max(end,   cBrowse.data.end);
    });
  },
  
  updateURL: function (redraw) {
    this.setHistory();
    
    if (redraw !== false) {
      this.redraw();
    }
  },
  
  setHistory: function (replace) {
    if (this.prev.location === this.start + ':' + this.end) {
      return;
    }
    
    this.prev.location = this.start + ':' + this.end;
    
    window.history[replace ? 'replaceState' : 'pushState']({}, '', this.getQueryString());
    
    if (this.prev.history) {
      this.history[this.start + ':' + this.end] = {
        left    : this.left,
        images  : '.scale_' + this.scale.toString().replace('.', '_'),
        edges   : this.history[this.prev.history].edges,
        offsets : this.history[this.prev.history].offsets
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
    var history = this.history[this.start + ':' + this.end];
    
    if (history) {
      var images = $('.track_container ' + history.images, this.container);
      
      if (images.length) { 
        $('.track_container', this.container).css('left', history.left).children().hide();
        images.show();
        
        this.left     = history.left;
        this.edges    = history.edges;
        this.offsets  = history.offsets;
        
        images = null;
        
        return true;
      }
    }
    
    return false;
  },
  
  getQueryString: function () {
    return (window.location.search + '&').replace(this.paramRegex, '$1$2=$3$4' + this.start + '$6' + this.end + '$8').slice(0, -1);
  },
  
  decorateTrack : $.noop, // implement in plugin
  makeMenu      : $.noop  // implement in plugin
});
