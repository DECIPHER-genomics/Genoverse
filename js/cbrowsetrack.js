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
  
  sortData: function () {
    this.data.sort(function (a, b) { return a[0] - b[0]; });
  },
  
  getData: function () {
    var url   = this.source + this.cBrowse.getQueryString();
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
        
        $.extend(track, json);
      },
    });  
  },
    
  plot: function (x1, x2) {
    if (!x1 && !x2) {
      x1 = 0;
      x2 = 3 * this.width;
    }
    
    for (var i = 0; i < this.data.length; i++) {
      this.plotData(this.data[i], x1, x2);
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