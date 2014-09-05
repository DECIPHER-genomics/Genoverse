Genoverse.Track.Legend = Genoverse.Track.Static.extend({
  textColor     : '#000000',
  labels        : 'overlay',
  unsortable    : true,
  lockToTrack   : true,  // Always put the legend just below the last track that the legend is for
  featureHeight : 12,
  
  controller: Genoverse.Track.Controller.Static.extend({
    init: function () {
      this.base();
      
      this.container.addClass('track_container_legend');

      if (!this.browser.legends) {
        this.browser.legends = {};
      }
      
      this.browser.legends[this.track.id] = this;
      this.track.setTracks();
    }
  }),
  
  setEvents: function () {
    this.browser.on({
      'afterInit afterAddTracks afterRemoveTracks': function () {
        for (var i in this.legends) {
          this.legends[i].track.setTracks();
        }
      },
      afterRemoveTracks: function (tracks) {
        for (var i in tracks) {
          if (tracks[i].controller.legend && tracks[i].controller.legend.track.tracks.length === 0) {
            tracks[i].controller.legend.track.remove();
          }
        }

        for (var i in this.legends) {
          this.legends[i].makeImage({});
        }
      },
      afterUpdateTrackOrder: function () {
        for (var i in this.legends) {
          this.legends[i].track.updateOrder();
        }
      }
    });
    
    this.browser.on({
      afterPositionFeatures: function (features, params) {
        var legend = this.prop('legend');
        
        if (legend) {
          setTimeout(function () { legend.makeImage(params); }, 1);
        }
      },
      afterResize: function (height, userResize) {
        var legend = this.prop('legend');
        
        if (legend && userResize === true) {
          legend.makeImage({});
        }
      },
      afterCheckHeight: function () {
        var legend = this.prop('legend');
        
        if (legend) {
          legend.makeImage({});
        }
      }
    }, this);
  },
  
  setTracks: function () {
    var legend = this;
    var type   = this.featureType;
    
    this.tracks = $.grep(this.browser.tracks, function (t) { if (t.type === type) { t.controller.legend = legend.controller; return true; } });
    this.updateOrder();
  },

  updateOrder: function () {
    if (!this.lockToTrack || !this.tracks.length || this.browser._constructing) {
      return;
    }

    this.order = this.tracks[this.tracks.length - 1].order + 0.1;
    this.browser.sortTracks();
  },

  findFeatures: function () {
    var bounds   = { x: this.browser.scaledStart, y: 0, w: this.width };
    var features = {};
    
    $.each($.map(this.track.tracks, function (track) {
      var featurePositions = track.prop('featurePositions');
      bounds.h = track.prop('height');
      return featurePositions ? featurePositions.search(bounds).concat(track.prop('labelPositions').search(bounds)) : [];
    }), function () {
      if (this.legend) {
        features[this.legend] = this.color;
      }
    });
    
    // sort legend alphabetically
    return $.map(features, function (color, text) { return [[ text, color ]]; }).sort(function (a, b) {
      var x = a[0].toLowerCase();
      var y = b[0].toLowerCase();
      return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
  },
  
  positionFeatures: function (f, params) {
    if (params.positioned) {
      return f;
    }
    
    var cols     = 2;
    var pad      = 5;
    var w        = 20;
    var x        = 0;
    var y        = 0;
    var xScale   = this.width / cols;
    var yScale   = this.fontHeight + pad;
    var features = [];
    var xPos, yPos, labelWidth;
    
    for (var i = 0; i < f.length; i++) {
      xPos       = (x * xScale) + pad;
      yPos       = (y * yScale) + pad;
      labelWidth = this.context.measureText(f[i][0]).width;
      
      features.push(
        { x: xPos,           y: yPos, width: w,              height: this.featureHeight, color: f[i][1] },
        { x: xPos + pad + w, y: yPos, width: labelWidth + 1, height: this.featureHeight, color: false, labelColor: this.textColor, labelWidth: labelWidth, label: f[i][0] }
      );
      
      if (++x === cols) {
        x = 0;
        y++;
      }
    }
    
    params.height     = this.prop('height', f.length ? ((y + (x ? 1 : 0)) * yScale) + pad : 0);
    params.width      = this.width;
    params.positioned = true;
    
    return this.base(features, params);
  },
  
  enable: function () {
    this.base();
    this.controller.makeImage({});
  },
  
  disable: function () {
    delete this.controller.stringified;
    this.base();
  },
  
  destroy: function () {
    delete this.browser.legends[this.id];
    this.base();
  }
});
