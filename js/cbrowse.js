/*!
 * Copyright (c) 2011 Genome Research Ltd.
 * Authosr: Evgeny Bragin, Simon Brent
 * Released under the Modified-BSD license, see LICENSE.TXT
 */

var CBrowse = Base.extend({
  defaults: {
    image: new Image(),
    width: 1000,
    chromosome: chromosomes["1"],
    zoom: 1,
    start: 0,
    delta: 0,
    hasData: [],
    colors: {
      foreground: '#000000',
      border: '#A3A3A3',
      call: '#FF0000'
    }
  },

  constructor: function (config) {
    $.extend(this, this.defaults, config);
    
    if (!(this.container && this.container.length)) {
      this.die('You must supply a ' + (this.container ? 'valid ' : '') + 'container element');
    }
    
    this.bump = [];
    
    var i = this.width * 3;
    
    while (i--) {
      this.bump.push(0);
    }
    
    if (this.start && this.stop) {
      this.setRange(this.start, this.stop);
    }
    
    this.initTracks();
  },
  
  // Overwrite this function for your URL style
  parseURL: function () {
    var coords = (window.location.search + '&').match(/[?&;]r=\w+:(\d+)-(\d+)[;&]/);
    coords.unshift();
    return coords;
  },
  
  initTracks: function () {
    this.height = 0;
    
    if (!this.tracks) {
      return false;
    }
    
    var defaults = {
      width:   this.width,
      colors:  this.colors,
      cBrowse: this
    };
    
    for (var i = 0; i < this.tracks.length; i++) {
      // Copy some default values from cBrowse to Track
      this.tracks[i] = new CBrowse.Track[this.tracks[i].type]($.extend(defaults, { offsetY: this.height, i: i }, this.tracks[i]));
      this.height   += this.tracks[i].height;
    }
  },
  
  setChromosome: function (n) {
    if (chromosomes[n]) {
      this.chromosome = chromosomes[n];
    } else {
      this.die("Unknown chromosome " + n);
    }
  },
  
  setRange: function (start, stop, update) {
    this.prevStart = this.start;
    this.prevStop  = this.stop;
    this.start     = parseInt(start, 10);
    this.stop      = parseInt(stop,  10);
    
    // THIS SHOULD NEVER HAPPEN
    if (this.stop < this.start) {
      this.stop  = this.start;
      this.start = parseInt(stop, 10);
    }
    
    this.length = (this.stop - this.start) || 1; // TODO: check when start = stop
    this.zoom   = this.chromosome.size / this.length;
    
    this.initScale();
    
    if (update !== false && (this.prevStart !== this.start || this.prevStop !== this.stop)) {
      this.updateURL();
    }
  },
  
  setTracks: function (tracks) {
    this.tracks = tracks;
  },
  
  // Get data for each track in this.tracks
  getDataAndPlot: function () {
    var cBrowse = this;
    
    $.when.apply($, $.map(this.tracks, function (track) { return track.getDataAndPlot(); })).done(function () {
      cBrowse.hasData = [ cBrowse.start - cBrowse.length, cBrowse.stop + cBrowse.length ];
      cBrowse.plot();
    });
  },
  
  initDOM: function () {
    this.canvas      = $('canvas',        this.container).attr('width', 3 * this.width).attr('height', this.height).css('left', -this.width);
    this.mask        = $('.mask',         this.container).show();
    this.featureInfo = $('.feature_info', this.container);
    /*this.viewPort    = */$('.viewport',     this.container).css({ width: this.width, height: this.height });
    this.context     = this.canvas[0].getContext('2d');    
    this.offset      = this.canvas.offset();
    
    for (var i = 0; i < this.tracks.length; i++) {
      this.tracks[i].context = this.context;
    }
  },
  
  initScale: function () {
    this.scale   = this.zoom  * this.width / this.chromosome.size;
    this.offsetX = this.start * this.scale;
    
    if (!this.stop && this.zoom === 1) {
      this.stop = this.chromosome.size;
    }
  },
  
  zoomIn: function (x) {
    if (!x) {
      x = this.width / 2;
    }
    
    var start = this.start + x / (2 * this.scale);
    var stop  = start + this.length / 2;

    this.setRange(start, stop);
  },
  
  zoomOut: function (x) {
    if (!x) {
      x = this.width / 2;
    }
    
    var start = this.start - x / this.scale;
    var stop  = start + 2 * this.length;

    if (start < 0) {
      start = 0;
    }
    
    if (stop > this.chromosome.size) {
      stop = this.chromosome.size;
    }

    this.setRange(start, stop);
  },
  
  updateURL: function () {
    window.history.pushState({}, "", this.baseURL + '?r=' + this.chromosome.id + ':' + this.start + '-' + this.stop);
    this.PLOT2();
    //window.location.hash = new Date().getTime();
    //window.location.hash = 'r=' + this.chromosome.id + ':' + this.start + '-' + this.stop;
  },
    
  initEventHandlers: function () {
    var cBrowse = this;
    
    $('a.zoom_in', this.container).bind('click', function () {
      cBrowse.zoomIn();
      return false;
    });
    
    $('a.zoom_out', this.container).bind('click', function () {
      cBrowse.zoomOut();
      return false;
    });
    
    this.canvas.bind({
      dblclick: function (e) {
        var x = e.pageX - cBrowse.offset.left - cBrowse.width;
        cBrowse.zoomIn(x);
        return false;
      },
      mousedown: function (e) {
        console.log('mousedown');
        
        if (cBrowse.zoom === 1) {
          return false;
        }
        
        cBrowse.dragging        = true;
        cBrowse.draggingOffsetX = e.pageX - cBrowse.delta;
      }
    });
    
    $(document).bind({
      mousemove: function (e) {
        if (cBrowse.dragging) {
          cBrowse.offsetImage(e.pageX - cBrowse.draggingOffsetX);
        }
      },
      mouseup: function (e) {
        console.log('mouseup');
        
        if (cBrowse.dragging) {
          var delta = e.pageX - cBrowse.draggingOffsetX - cBrowse.delta;
          var start = cBrowse.start - delta / cBrowse.scale;
          
          cBrowse.delta += delta;
          cBrowse.setRange(start, start + cBrowse.length);
          cBrowse.dragging = false;
          
          console.log('delta: ' + cBrowse.delta, start);
        }
      }
    });
    
    window.onpopstate = function () { cBrowse.popState(); };
  },
  
  popState: function () {
    var coords = this.parseURL();
    
    if (coords.length) {
      this.setRange(coords[1], coords[2], false);
      this.PLOT2();
    }
  },
  
  PLOT2: function () {
    if (this.start - this.hasData[0] >= 0 && this.hasData[1] - this.stop >= 0) {
      return this.dragging && Math.abs(this.delta) < this.width ? false : this.plot();
    }
    
    if (!this.dragging) {
      this.mask.show();
    }
    
    this.getDataAndPlot();
  },
  
  updateImage: function (x1, x2) {
    if (!x1 && !x2) {
      x1 = 0;
      x2 = 3 * this.width;
    }
    
    // save canvas image as data url (png format by default)
    this.dataURL   = this.canvas[0].toDataURL();
    this.image.src = this.dataURL;
    
    this.mask.hide();
  },
  
  plot: function (x1, x2) {
    console.time("plot");
    
    if (!x1 && !x2) {
      x1 = 0;
      x2 = 3 * this.width;
    }
    
    // TODO: reset dragging offsets into separate routine
    this.delta             = 0;
    this.context.fillStyle = '#fff';
    this.offsetX           = this.start * this.scale;
    
    this.context.fillRect(x1, 0, x2, this.height);
    
    for (var i = 0; i < this.tracks.length; i++) {
      this.tracks[i].plot(x1, x2);
    }  
    
    this.updateImage();

    console.timeEnd("plot");
  },
  
  offsetImage: function (x) {
    this.context.clearRect(0, 0, 3 * this.width, this.height);
    this.context.drawImage(this.image, x, 0);
  },
  
  render: function () {
    this.initDOM();
    this.initScale();
    this.getDataAndPlot();
    this.initEventHandlers();
  },
  
  die: function (error) {
    alert(error);
    throw(error);
  },
  
  warn: function (error) {
    alert(error);
  }
});