CBrowse.TrackImage = Base.extend({
  constructor: function (config) {
    $.extend(this, config);
    this.bufferedStart = this.start - (this.labelScale * this.track.cBrowse.longestLabel);
  },
  
  getData: function () {
    var deferred = $.Deferred();
    var data     = this.start >= this.track.cBrowse.data.start && this.end <= this.track.cBrowse.data.end ? this.track.features.search({ x: this.bufferedStart, w: this.end - this.bufferedStart, y: 0, h: 1 }) : [];
    
    this.image = $('<img />').load(deferred.resolve);
    
    if (data.length) {
      this.draw(this.track.positionData(this.track.addOverlaps(this.scaleData(data.sort(function (a, b) { return a.start - b.start; }))), this.edges, this.func));
    } else {
      $.ajax({
        url      : this.track.url + this.getQueryString(),
        context  : this,
        dataType : 'json',
        success  : function (json) {
          this.track.setFeatures(json.data);
          this.draw(this.track.positionData(this.track.addOverlaps(this.scaleData(json.data)), this.edges, this.func));
        }
      });
    }
    
    return deferred;
  },
  
  getQueryString: function () {
    return (window.location.search + '&').replace(this.track.paramRegex, '$1chr=$3&start=' + this.bufferedStart + '&end=' + this.end + '$8').slice(0, -1);
  },
  
  scaleData: function (data) {
    var i = data.length;
        
    while (i--) {
      data[i].scaledStart = data[i].start * this.track.scale;
      data[i].scaledEnd   = data[i].end   * this.track.scale;
    }
    
    return data;
  },
  
  draw: function (features) {
    var i, colour;
    
    this.track.canvas.attr({ width: this.width, height: this.track.fullHeight });
    
    this.track.context.textBaseline = 'top'; // gets reset every time width/height are set on the canvas
    this.track.context.fillStyle    = this.background;
    this.track.context.fillRect(0, 0, this.width, this.track.fullHeight);
    
    this.track.cBrowse.decorateTrack(this.start, this.end, this.track);
    
    if (!this.track.colourOrder.length) {
      for (colour in features) {
        this.track.colourOrder.push(colour);
      }
    }
    
    var c = this.track.colourOrder.length;
    
    // reverse order - lower orders are more important so draw them last
    while (c--) {
      colour = this.track.colourOrder[c];
      
      if (colour) {
        this.track.context.fillStyle = colour;
        
        i = features[colour].length;
        
        while (i--) {
          this.track.context[features[colour][i][0]].apply(this.track.context, features[colour][i][1]);
        }
      }
    }
    
    this.container.append(this.image.attr('src', this.track.canvas[0].toDataURL()));
  }
});