/*!
 * Copyright (c) 2011 Genome Research Ltd.
 * Authors: Evgeny Bragin, Simon Brent
 * Released under the Modified-BSD license, see LICENSE.TXT
 */

CBrowse.Track = Base.extend({
  defaults: {
    pointSize: 1.5,
    height: 200
  },
  
  constructor: function (config) {
    $.extend(this, this.defaults, config);
  },
  
  getQueryString: function () {
    var start = this.cBrowse.start - this.cBrowse.length;
    var end   = this.cBrowse.stop  + this.cBrowse.length;
    
    return (window.location.search + '&').replace(this.cBrowse.paramRegex, '$1chr=$3&start=' + start + '&end=' + end + '$8').slice(0, -1);
  },
  
  getData: function () {
    var url   = this.source + this.getQueryString();
    var track = this;
    
    this.data = [];
    
    if (this.xhr) {
      this.xhr.abort();
      this.xhr = false;
    }
    
    return this.xhr = $.ajax({
      url: url,
      dataType: "json",
      beforeSend: function () {
        console.log("started getting data for track" + track.i);
        // TODO: performance checks
      },
      success: function (json) {
        console.log("got data for track" + track.i);
        
        var i = json.data.length;
        
        while (i--) {
          json.data[i].scaledStart = json.data[i].start * track.cBrowse.scale;
          json.data[i].scaledStop  = json.data[i].stop  * track.cBrowse.scale;
        }
        
        $.extend(true, track, json);
      },
    });  
  },
    
  plot: function (plotStart, plotEnd) {
    for (var i = 0; i < this.data.length; i++) {
      this.plotData(this.data[i], plotStart, plotEnd);
    }
  },
  
  point: function (x, y) {
    if (y > this.offsetY && y < this.offsetY + this.height) {
      this.context.fillRect(x, y, this.pointSize, this.pointSize);
    }
  },
  
  vline: function (x, y, l) {
    this.context.fillStyle = this.colors.border;
    this.context.fillRect(x, y, this.pointSize, l);
    this.context.fillStyle = this.colors.foreground;
  },
  
  hline: function (x, y, l) {
    if (l < this.pointSize) {
      l = this.pointSize;
    }
    
    this.context.fillRect(x, y, l, this.pointSize);
  },

  die: function (error) {
    this.cBrowse.die(error);
  },

  warn: function (error) {
    this.cBrowse.warn(error);
  }
});