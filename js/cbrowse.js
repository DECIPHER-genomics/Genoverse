/*!
 * Copyright (c) 2011 Genome Research Ltd.
 * Authosr: Evgeny Bragin, Simon Brent
 * Released under the Modified-BSD license, see LICENSE.TXT
 */

var CBrowse = Base.extend({
  defaults: {
    urlParam: 'r',                     // Overwrite this for your URL style
    urlParamTemplate: 'CHR:START-END', // Overwrite this for your URL style
    image: new Image(),
    height: 0,
    width: 1000,
    chromosome: chromosomes["1"],
    zoom: 1,
    start: 0,
    delta: 0,
    hasData: [],
    colors: {
      foreground: '#000000',
      background: '#FFFFFF',
      border: '#A3A3A3',
      call: '#FF0000'
    }
  },

  constructor: function (config) {
    $.extend(this, this.defaults, config);
    
    if (!(this.container && this.container.length)) {
      this.die('You must supply a ' + (this.container ? 'valid ' : '') + 'container element');
    }
    
    this.paramRegex = new RegExp('([?&;])(' + this.urlParam + ')=' + this.urlParamTemplate.replace(/CHR(.)/, '(\\w+)($1)').replace(/START(.)/, '(\\d+)($1)').replace('END', '(\\d+)') + '([;&])');
    
    if (this.start && this.end) {
      this.render();
    }
  },
  
  render: function () {
    this.initDOM();
    this.initBumping();
    this.setRange(this.start, this.end);
    this.initScale();
    this.initTracks();
    this.getDataAndPlot();
  },
  
  initDOM: function () {
    $('.viewport', this.container).width(this.width);
    
    this.canvas  = $('canvas', this.container).attr('width', 3 * this.width).css('left', -this.width);
    this.mask    = $('.mask',  this.container).show();
    this.context = this.canvas[0].getContext('2d');    
    this.offset  = this.canvas.offset();
    
    this.initEventHandlers();
  },
  
  initBumping: function () {
    var i = this.width * 3;
    
    this.bump = [];
    
    while (i--) {
      this.bump.push(0);
    }
  },
  
  initScale: function () {
    this.scale       = this.zoom  * this.width / this.chromosome.size;
    this.scaledStart = this.start * this.scale;
    
    if (!this.end && this.zoom === 1) {
      this.end = this.chromosome.size;
    }
  },
  
  initTracks: function () {
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
      this.tracks[i] = new CBrowse.Track[this.tracks[i].type]($.extend(defaults, { offsetY: this.height, i: i, context: this.context }, this.tracks[i]));
      this.height   += this.tracks[i].height;
    }
    
    this.canvas.attr('height', this.height);
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
        cBrowse.dragStart       = cBrowse.start;
      }
    });
    
    $(document).bind({
      mousemove: function (e) {
        if (cBrowse.dragging) {
          var delta = e.pageX - cBrowse.draggingOffsetX;
          var start = cBrowse.dragStart - (delta - cBrowse.delta) / cBrowse.scale;
          
          cBrowse.offsetImage(delta);
          cBrowse.setRange(start, start + cBrowse.length, false);
          
          // TODO: GET REDRAW WORKING HERE WHEN YOU GO OUTSIDE RANGE
        }
      },
      mouseup: function (e) {
        console.log('mouseup');
        
        if (cBrowse.dragging) {
          cBrowse.delta = e.pageX - cBrowse.draggingOffsetX;
          cBrowse.updateURL();
          cBrowse.dragging = false; // Order of updateURL and dragging = false is only important if updateURL calls redraw
          
          console.log('delta: ' + cBrowse.delta);
        }
      }
    });
    
    window.onpopstate = function (e) {
      if (e.state !== null) {
        cBrowse.popState();
      }
    };
  },
  
  zoomIn: function (x) {
    if (!x) {
      x = this.width / 2;
    }
    
    var start = this.start + x / (2 * this.scale);
    var end   = start + this.length / 2;

    this.setRange(start, end);
  },
  
  zoomOut: function (x) {
    if (!x) {
      x = this.width / 2;
    }
    
    var start = this.start - x / this.scale;
    var end   = start + 2 * this.length;

    if (start < 0) {
      start = 0;
    }
    
    if (end > this.chromosome.size) {
      end = this.chromosome.size;
    }

    this.setRange(start, end);
  },
  
  popState: function () {
    var coords = this.parseURL();
    
    if (coords.length) {
      this.setRange(coords[0], coords[1], false);
      this.redraw();
    }
  },
  
  setChromosome: function (n) {
    if (chromosomes[n]) {
      this.chromosome = chromosomes[n];
    } else {
      this.die("Unknown chromosome " + n);
    }
  },
  
  setRange: function (start, end, update) {
    this.prevStart = this.start;
    this.prevEnd   = this.end;
    this.start     = parseInt(start, 10);
    this.end       = parseInt(end,   10);
    
    // THIS SHOULD NEVER HAPPEN
    if (this.end < this.start) {
      this.end  = this.start;
      this.start = parseInt(end, 10);
    }
    
    this.length = (this.end - this.start) || 1; // TODO: check when start = end
    this.zoom   = this.chromosome.size / this.length;
    
    this.initScale();
    
    if (update !== false && (this.prevStart !== this.start || this.prevEnd !== this.end)) {
      this.updateURL();
    }
  },
  
  redraw: function () {
    if (this.start >= this.hasData[0] && this.end <= this.hasData[1]) {
      return this.dragging && Math.abs(this.delta) < this.width ? false : this.plot();
    }
    
    if (!this.dragging) {
      this.mask.show();
    }
    
    this.getDataAndPlot();
  },
  
  // Get data for each track in this.tracks
  getDataAndPlot: function () {
    var cBrowse = this;
    
    $.when.apply($, $.map(this.tracks, function (track) { return track.getData(); })).done(function () {
      cBrowse.hasData = [ cBrowse.start - cBrowse.length, cBrowse.end + cBrowse.length ];
      cBrowse.plot();
    });
  },
  
  plot: function () {
    console.time("plot");
    
    var width   = 3 * this.width;
    //var offsetX = this.delta ? width + this.delta : 0;
    
    // TODO: reset dragging offsets into separate routine
    this.delta             = 0;
    this.context.fillStyle = this.colors.background;
    this.context.fillRect(0, 0, width, this.height);
    
    for (var i = 0; i < this.tracks.length; i++) {
      //this.tracks[i].plot(offsetX, offsetX + width);
      this.tracks[i].plot(0, width);
    }
    
    this.updateImage();
    
    console.timeEnd("plot");
  },
  
  updateImage: function () {    
    // save canvas image as data url (png format by default)
    this.dataURL   = this.canvas[0].toDataURL();
    this.image.src = this.dataURL;
    
    this.mask.hide();
  },
  
  offsetImage: function (x) {
    this.context.clearRect(0, 0, 3 * this.width, this.height);
    this.context.drawImage(this.image, x, 0);
  },
  
  getQueryString: function () {
    return (window.location.search + '&').replace(this.paramRegex, '$1$2=$3$4' + this.start + '$6' + this.end + '$8').slice(0, -1);
  },
  
  parseURL: function () {
    var coords = (window.location.search + '&').match(this.paramRegex);
    return [ coords[5], coords[7] ];
  },
  
  updateURL: function (redraw) {
    window.history.pushState({}, "", this.getQueryString());
    
    if (redraw !== false) {
      this.redraw();
    }
  },
  
  die: function (error) {
    alert(error);
    throw(error);
  },
  
  warn: function (error) {
    alert(error);
  }
});