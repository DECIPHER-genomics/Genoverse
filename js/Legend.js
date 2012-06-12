CBrowse.on('afterSetTracks afterRemoveTracks', function () {
  for (var i in this.legends) {
    this.legends[i].setTracks();
  }
});

CBrowse.on('afterCheckTrackSize afterRemoveTracks', function () {
  for (var i in this.legends) {
    this.legends[i].makeImage();
  }
});

CBrowse.Track.on('afterResize', function (height, userResize) {
  if (this.legend && userResize === true) {
    this.legend.makeImage();
  }
});

CBrowse.Track.Legend = CBrowse.Track.extend({
  config: {
    textColor : '#000000',
    inherit   : [ 'Static' ]
  },
  
  init: function () {
    this.base();
    
    if (!this.cBrowse.legends) {
      this.cBrowse.legends = {};
    }
    
    this.cBrowse.legends[this.id] = this;
  },
  
  setTracks: function () {
    var legend = this;
    var type   = this.featureType;
    
    this.tracks = $.grep(this.cBrowse.tracks, function (t) { if (t.type === type) { t.legend = legend; return true; } });
  },
  
  getFeatures: function () {
    var bounds   = { x: this.cBrowse.scaledStart, y: 0, w: this.width };
    var features = {};
    
    $.each($.map(this.tracks, function (track) {
      bounds.h = track.height;
      return track.featurePositions.search(bounds).concat(track.labelPositions.search(bounds));
    }), function () {
      features[this.legend] = this.color;
    });
    
    // sort legend alphabetically
    return $.map(features, function (color, text) { return [[ text, color ]]; }).sort(function (a, b) {
      var x = a[0].toLowerCase();
      var y = b[0].toLowerCase();
      return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
  },
  
  positionFeatures: function (features) {
    var cols     = 2;
    var pad      = 5;
    var w        = 20;
    var x        = 0;
    var y        = 0;
    var xScale   = this.image.width / cols;
    var yScale   = this.fontHeight + pad;
    var fill     = {};
    
    fill[this.textColor] = [[ 'fillRect', [ 0, 0, this.width, 1 ] ]];
    
    this.colorOrder = [ this.textColor ];
    
    for (var i = 0; i < features.length; i++) {
      if (!fill[features[i][1]]) {
        fill[features[i][1]] = [];
        this.colorOrder.push(features[i][1]);
      }
      
      fill[features[i][1]].push([ 'fillRect', [ (x * xScale) + pad, (y * yScale) + pad, w, this.featureHeight ] ]);
      fill[this.textColor].push([ 'fillText', [ features[i][0], (x * xScale) + w + (2 * pad), (y * yScale) + pad ] ]);
      
      if (++x === cols) {
        x = 0;
        y++;
      }
    }
    
    this.height = this.featuresHeight = ((y + (x ? 1 : 0)) * yScale) + pad;
    
    fill[this.cBrowse.colors.background] = [[ 'fillRect', [ 0, 0, this.width, this.height ] ]];
    
    this.colorOrder.push(this.cBrowse.colors.background);
    
    return { fill: fill };
  },
  
  remove: function () {
    delete this.cBrowse.legends[this.id];
    this.base();
  }
});
