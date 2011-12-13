/*!
 * Copyright (c) 2011 Genome Research Ltd.
 * Author: Evgeny Bragin
 * Released under the Modified-BSD license, see LICENSE.TXT
 */

var CBrowseTrack = Base.extend({
  defaults: {
    image: new Image(),
    pointSize: 1.5,
    height: 200
  },
  
  constructor: function (config) {  
    $.extend(this, this.defaults, config);
  },
  
  sortData: function () {
    this.data.sort(function (a, b) { return a[0] - b[0]; });
  },
  
  getDataAndPlotWhenAllFinished: function () {
    var url   = this.source;
    var track = this;
    
    this.data = [];
    
    $.ajax({
      url: url,
      dataType: "json",
      beforeSend: function () {
        console.log("started getting data for track" + track.i);
        
        track.cBrowse.ajaxCounter++;
        // TODO: performance checks
      },
      success: function (jsonData) {
        console.log("got data for track" + track.i);
        
        $.extend(track, jsonData);
        track.plot();
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log(jqXHR);
        track.warn("Failed to get json from " + url + "\nerror: " + errorThrown);
      },
      complete: function () {
        track.cBrowse.ajaxCounter--;
        
        if (track.cBrowse.ajaxCounter === 0) {
          track.cBrowse.updateImage();
          track.cBrowse.updateCallShortCuts();
        }
      }
    });  
  },
  
  mousemove: function (x, y) {
    x = x - this.cBrowse.delta;
    
    for (var i = 0; i < this.currentCalls.length; i++) {
      var call = this.currentCalls[i];
    //console.log(call.scaledStart, call.scaledStop, x, x > call.scaledStart, x < call.scaledStop, call.start, call.stop);  
      if (x > call.scaledStart && x < call.scaledStop) {
        this.showFeatureInfo(call, {
          top:  this.cBrowse.offset.top  + this.offsetY     + this.height - 20,
          left: this.cBrowse.offset.left + call.scaledStart + this.cBrowse.delta
        });
        
        break;
      }
    }
  },
  
  showFeatureInfo: function (feature, coordinates) {
    this.cBrowse.featureInfo.html(
      '<table>' +
        '<tr><td>Start position:   </td><td>' + feature.start.toLocaleString()                + '</td></tr>' +
        '<tr><td>Stop position:    </td><td>' + feature.stop.toLocaleString()                 + '</td></tr>' +
        '<tr><td>Size:             </td><td>' + (feature.stop-feature.start).toLocaleString() + '</td></tr>' +
        '<tr><td>Ratio:            </td><td>' + feature.ratio                                 + '</td></tr>' +
        '<tr><td>Probes:           </td><td>' + feature.probes                                + '</td></tr>' +
        '<tr><td>P-value:          </td><td>' + feature.pvalue                                + '</td></tr>' +
        '<tr><td>W-score:          </td><td>' + feature.wscore                                + '</td></tr>' +
        '<tr><td>Novelty:          </td><td>' + feature.novelty                               + '</td></tr>' +
        '<tr><td>Links:            </td><td>' +
          '<a href="http://www.ensembl.org/Homo_sapiens/Location/View?r= '+ this.cBrowse.chromosome.id + ':' + feature.start + '-' + feature.stop + '" target="_blank">e!</a> ' +
          '<a href="http://genome.ucsc.edu/cgi-bin/hgTracks?db=hg19&position=Chr' + this.cBrowse.chromosome.id + ':' + feature.start + '-' + feature.stop + '" target="_blank">UCSC</a>' + 
        '</td></tr>' +
      '</table>'
    ).css(coordinates).show();
  },
  
  decorate: function (x1, x2) {
    this.context.fillStyle = this.colors.border;
    this.context.fillRect(x1, this.offsetY, x2, 1); // borders
    
    this.context.fillStyle = '#3B62FF';
    this.context.fillRect(x1, this.offsetY + this.height/2, x2, 1);
    
    this.context.fillStyle = this.colors.border;
    
    // coordinates
    for (var x = 0; x < this.cBrowse.chromosome.size; x += 10000000) {
      var position = x * this.cBrowse.scale + this.width - this.cBrowse.offsetX;
      
      if (position > x1 && position < x2) {
        this.context.fillRect(position, this.offsetY, 1, 7);
        this.context.fillText(x.toLocaleString(), position + 2, this.offsetY + 10);
      }
    }
    
    this.context.fillRect(x1, this.cBrowse.height - 1, x2, 1);
    
    this.context.fillStyle = this.colors.foreground;
  },
  
  getCurrentCalls: function () {
    //calls
    this.currentCalls = [];
    
    if (this.calls) {
      for (var i = 0; i < this.calls.length; i++) {
        var call = this.calls[i];
        
        call.scaledStart  = call.start * this.cBrowse.scale + this.width - this.cBrowse.offsetX;
        call.scaledStop   = call.stop  * this.cBrowse.scale + this.width - this.cBrowse.offsetX;
        call.scaledLength = call.scaledStop - call.scaledStart;
        
        if (call.scaledStop > 0 && call.scaledStart < 3 * this.width) {
          this.currentCalls.push(call);
        }
      }
    }
  },
  
  plotCurrentCalls: function (x1, x2) {
    if (this.currentCalls.length) {
      this.context.fillStyle = this.colors.call;
      
      for (var i = 0; i < this.currentCalls.length; i++) {
        if (this.currentCalls[i].scaledStart < x2 && this.currentCalls[i].scaledStop > x1) {
          this.context.fillRect(this.currentCalls[i].scaledStart, this.offsetY + this.height/2 - this.currentCalls[i].ratio*this.height/5, this.currentCalls[i].scaledLength, 1);
        }
      }
    }
    
    this.context.fillStyle = this.colors.foreground;
  },
  
  plot: function (x1, x2) {
    if (!x1 && !x2) {
      x1 = 0;
      x2 = 3 * this.width;
    }
    
    for (var i = 0; i < this.data.length; i++) {
      this.plotData(this.data[i], x1, x2);
    }
    
    this.decorate(x1, x2);
    this.getCurrentCalls();
    this.plotCurrentCalls(x1, x2);
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

CBrowseTrack.SNP = CBrowseTrack.extend({
  plotData: function (probe, x1, x2) {
    var x = probe[0] * this.cBrowse.scale + this.width - this.cBrowse.offsetX;
    
    if (x < x1 || x > x2) {
      return false;
    }

    this.point(x, this.offsetY + this.height/20 + probe[1]*this.height*0.9);
    this.vline(x, this.offsetY + this.height/2, -probe[2]*this.height/5);
  }
});

CBrowseTrack.aCGH = CBrowseTrack.extend({
  plotData: function (probe, x1, x2) {
    var x = probe[0] * this.cBrowse.scale + this.width - this.cBrowse.offsetX;
    
    if (x < x1 || x > x2) {
      return false;
    }
    
    this.point(x, this.offsetY + this.height/2 - probe[1]*this.height/5);
  }
});


CBrowseTrack.Exome = CBrowseTrack.extend({
  plotData: function (probe, x1, x2) {
    var a = probe[0] * this.cBrowse.scale + this.width - this.cBrowse.offsetX;
    var b = probe[1] * this.cBrowse.scale + this.width - this.cBrowse.offsetX;
    
    if (!(a < x2 && b > x1)) {
      return false;
    }

    this.vline((a+b)/2, this.offsetY + this.height/2, -probe[3]*this.height/5);  
    this.hline(a, this.offsetY + this.height/2 - probe[2]*this.height/5, b-a);
  }
});


