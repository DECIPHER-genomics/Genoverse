/*!
 * Copyright (c) 2011 Genome Research Ltd.
 * Author: Evgeny Bragin
 * Released under the Modified-BSD license, see LICENSE.TXT
 */


/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * 
 * Constructors
 *
 */

CBrowse = function(config) {
  for (var key in this.defaults) this[key] = this.defaults[key];
  for (var key in config) this[key] = config[key];

  this.initTracks();
};

CBrowse.prototype.initTracks = function() {
  this.height = 0;
  if (!this.tracks) return false;
  
  for (var i = 0; i < this.tracks.length; i++) {
    //Copy some default values from cBrowse to Track
    track = {
      width: this.width,
      colors: this.colors,
      cBrowse: this,
      offsetY: this.height,
      i: i
    };
    
    for (var key in this.tracks[i]) track[key] = this.tracks[i][key];
    
    //TODO: bless
    this.tracks[i] = new CBrowseTrack(track);
    this.height += track.height;
  }
}






/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * 
 * Defaults
 *
 */


CBrowse.prototype.defaults = {
  image: new Image(),
  width: 1000,
  chromosome: chromosomes["1"],
  zoom: 1,
  start: 0,
  delta: 0,
  colors: {
    foreground: '#000000',
    border: '#A3A3A3',
    call: '#FF0000'
  }
}




/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * 
 * Setters
 *
 */

CBrowse.prototype.setChromosome = function(n) {
  if (chromosomes[n]) {
    this.chromosome = chromosomes[n];
  } else {
    this.die("Unknown chromosome " + n);
  }
}

CBrowse.prototype.setStart = function(start) {
  this.start = parseInt(start);
  if (this.stop && this.chromosome) {
    this.zoom = this.chromosome.size/(this.stop - this.start);
    this.initScale();
  }
}

CBrowse.prototype.setStop = function(stop) {
  this.stop  = parseInt(stop);
  if (this.start && this.chromosome) {
    this.zoom = this.chromosome.size/(this.stop - this.start);
    this.initScale();
  }
}

CBrowse.prototype.setTracks = function(tracks) {
  this.tracks = tracks;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
// ...
//

// Get data for each track in this.tracks
CBrowse.prototype.getDataAndPlot = function() {
  this.ajaxCounter = 0;
  for (var i = 0; i < this.tracks.length; i++) {
    this.tracks[i].getDataAndPlotWhenAllFinished();
  }
}

CBrowse.prototype.initDOM = function() {

  this.window = $('#window').css({ width: this.width+'px', height: this.height+'px'});
  this.canvas = $('canvas').attr('width', 3*this.width).attr('height', this.height).css('left', (-this.width) + 'px')[0];
  this.mask   = $('#mask').css({ width: this.width+'px', height: this.height+'px', top: $('#window').offset().top}).show()
  
  this.context = this.canvas.getContext("2d");    
  this.offset  = $(this.canvas).offset();
  this.featureInfo = $('#feature_info');
  
  for (var i = 0; i < this.tracks.length; i++) {
    this.tracks[i].context = this.context;
  }
}

CBrowse.prototype.initScale = function() {
  this.scale = this.zoom * this.width / this.chromosome.size;
  this.offsetX = this.start * this.scale;
  if (!this.stop && this.zoom == 1) this.stop = this.chromosome.size;
}


CBrowse.prototype.zoomIn = function(x) {
  if (!x) x = this.width/2;
  
  this.mask.show();
  var start = this.start + (x - 2*this.delta)/(2*this.scale);
  var stop  = start + (this.stop - this.start)/2;

  this.setStart(start);
  this.setStop(stop);
  
  setTimeout("cBrowse.plot();", 100);    
}

CBrowse.prototype.zoomOut = function(x) {
  if (!x) x = this.width/2;
  
  this.mask.show();
  var start = this.start - (x + this.delta)/this.scale;
  var stop   = start + 2*(this.stop - this.start);

  if (start < 0) start = 0;
  if (stop > this.chromosome.size) stop = this.chromosome.size;

  this.setStart(start);
  this.setStop(stop);
  
  setTimeout("cBrowse.plot();", 100);    
}

CBrowse.prototype.initEventHandlers = function() {
  var cBrowse = this;

  $('a.zoom_in').click(function(){
    cBrowse.zoomIn();
  });

  $('a.zoom_out').click(function(){
    cBrowse.zoomOut();
  });
  
  $(this.canvas).dblclick(function(e){
    var x = e.clientX - cBrowse.offset.left - cBrowse.width;
    cBrowse.zoomIn(x);
  });

  $(this.canvas).mousedown(function(e){
    console.log('mousedown');
    if (cBrowse.zoom == 1) return false;
    
    cBrowse.dragging = true;
    cBrowse.draggingOffsetX  = e.clientX - cBrowse.delta;
  });

  $(this.canvas).mousemove(function(e){
    if (!cBrowse.dragging) {
      var x = e.clientX - cBrowse.offset.left;
      var y = e.clientY - cBrowse.offset.top;
      
      for (var i=0; i < cBrowse.tracks.length; i++) {
        var track = cBrowse.tracks[i];
        if (y > track.offsetY && y < track.offsetY + track.height) {
          track.mousemove(x, y);
          break;
        }
      }
    }
  });
  
  $(document).mousemove(function(e){
    if (cBrowse.dragging) {
        cBrowse.lastClientX = e.clientX;
        var x = e.clientX - cBrowse.draggingOffsetX;
        //$('#image_0').css('left', - cBrowse.width + x);
        cBrowse.hideFeatureInfo();
        cBrowse.offsetImage(x);
    }
  });
  
  $(document).mouseup(function(e){
    console.log('mouseup');
    if (cBrowse.dragging) {
      cBrowse.dragging = false;
      cBrowse.delta = e.clientX - cBrowse.draggingOffsetX;

      console.log('delta: ' + cBrowse.delta);
      
      if (Math.abs(cBrowse.delta) < cBrowse.width) {
        cBrowse.updateURL(cBrowse.delta);
        return false;
      }
      
      cBrowse.mask.show();
      
      cBrowse.start = cBrowse.start - cBrowse.delta/cBrowse.scale;
      
      if (cBrowse.delta > 0) {
      // moved right
        setTimeout("cBrowse.plot(0, "+ cBrowse.delta +")", 100);
        cBrowse.delta = 0;
      } else { 
      // moved left
        setTimeout("cBrowse.plot(" + (3*cBrowse.width + cBrowse.delta) + "," + 3*cBrowse.width + ")", 100);
        cBrowse.delta = 0;
      }
      
      //cBrowse.plot();
    }
  });
}

CBrowse.prototype.hideFeatureInfo = function(){
  this.featureInfo.hide();
}

CBrowse.prototype.updateURL = function(delta) {
  var start, stop;
  if (delta) {
    start = this.start - delta/this.scale;
  } else {
    start = this.start;
  }
  stop = start + this.chromosome.size/this.zoom
  history.pushState({}, "", this.baseURL + start + ";" + stop);
}

CBrowse.prototype.updateImage = function(x1, x2) {
  if (!x1 && !x2) {
    x1 = 0;
    x2 = 3*this.width;
  }
  this.dataURL = this.canvas.toDataURL();
  this.image.src = this.dataURL;
  this.mask.hide();  
}



CBrowse.prototype.plot = function(x1, x2) {
  console.time("plot");
  this.hideFeatureInfo();
  
  if (!x1 && !x2) {
    x1 = 0;
    x2 = 3*this.width;
  }
  
  //TODO: reset dragging offsets into separate routine
  this.delta = 0;
  
  this.context.fillStyle = this.colors.foreground;
  this.offsetX = this.start * this.scale;
  
  this.context.clearRect(x1, 0, x2, this.height);
  
  for (var i = 0; i < this.tracks.length; i++) {
    this.tracks[i].plot(x1, x2);
  }  
  
  //save canvas image as data url (png format by default)
  this.dataURL = this.canvas.toDataURL();
  this.image.src = this.dataURL;
  this.mask.hide();

  console.timeEnd("plot");
  this.updateURL();
  //this.offsetImage(0);
}

CBrowse.prototype.offsetImage = function(x) {
  this.context.clearRect(0,0, 3*this.width, this.height);
  this.context.drawImage(this.image, x, 0);
}


CBrowse.prototype.render = function() {
  this.initDOM();
  this.initScale();
  this.getDataAndPlot();
  this.initEventHandlers();
}

CBrowse.prototype.die = function(error) {
  alert(error);
  throw(error);
}

CBrowse.prototype.warn = function(error) {
  alert(error);
}
