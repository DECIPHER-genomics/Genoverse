CBrowse.TrackImage = Base.extend({
  constructor: function (config) {
    $.extend(this, config);
    this.bufferedStart = Math.max(this.start - (this.labelScale * this.track.cBrowse.longestLabel), 1);
  },
  
  getData: function () {
    var deferred = $.Deferred();
    var data     = !this.track.url || (this.start >= this.track.cBrowse.data.start && this.end <= this.track.cBrowse.data.end) ? this.track.features.search({
      x: this.bufferedStart,
      y: 0,
      w: this.end - this.bufferedStart,
      h: 1
    }) : [];
    
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
    var i, color;
    
    this.track.canvas.attr({ width: this.width, height: this.track.fullHeight });
    
    this.track.context.textBaseline = 'top'; // gets reset every time width/height are set on the canvas
    this.track.context.fillStyle    = this.background;
    this.track.context.fillRect(0, 0, this.width, this.track.fullHeight);
    
    this.track.beforeDraw(this);
    
    if (!this.track.colorOrder.length) {
      for (color in features) {
        this.track.colorOrder.push(color);
      }
    }
    
    var c = this.track.colorOrder.length;
    
    // reverse order - lower orders are more important so draw them last
    while (c--) {
      color = this.track.colorOrder[c];
      
      if (color) {
        this.track.context.fillStyle = color;
        
        i = features[color].length;
        
        while (i--) {
          this.track.context[features[color][i][0]].apply(this.track.context, features[color][i][1]);
        }
      }
    }
    
    this.track.afterDraw(this);
    
    this.container.append(this.image.attr('src', this.track.canvas[0].toDataURL()));
  }
});