CBrowse.TrackImage = Base.extend({
  constructor: function (config) {
    $.extend(this, config);
    this.bufferedStart = Math.max(this.start - (this.labelScale * this.track.cBrowse.longestLabel), 1);
  },
  
  getData: function () {
    var deferred = $.Deferred();
    var features = !this.track.url || (this.start >= this.track.cBrowse.data.start && this.end <= this.track.cBrowse.data.end) ? this.track.features.search({
      x: this.bufferedStart,
      y: 0,
      w: this.end - this.bufferedStart,
      h: 1
    }) : [];
    
    this.image = $('<img />').load(deferred.resolve);
    
    if (features.length) {
      this.draw(this.track.positionData(this.track.addOverlaps(this.scaleFeatures(features.sort(function (a, b) { return a.start - b.start; }))), this.edges, this.func));
    } else {
      $.ajax({
        url      : this.track.url + this.getQueryString(),
        data     : this.track.urlParams,
        context  : this,
        dataType : 'json',
        success  : function (json) {
          this.track.setFeatures(json);
          this.draw(this.track.positionData(this.track.addOverlaps(this.scaleFeatures(json.features)), this.edges, this.func));
        }
      });
    }
    
    return deferred;
  },
  
  getQueryString: function () {
    return (window.location.search + '&').replace(this.track.paramRegex, '$1chr=$3&start=' + this.bufferedStart + '&end=' + this.end + '$8').slice(0, -1);
  },
  
  scaleFeatures: function (features) {
    var i = features.length;
        
    while (i--) {
      features[i].scaledStart = features[i].start * this.track.scale;
      features[i].scaledEnd   = features[i].end   * this.track.scale;
    }
    
    return features;
  },
  
  draw: function (features) {
    var i, color, labelColor;
    
    if (!this.track.colorOrder.length) {
      for (color in features.fill) {
        this.track.colorOrder.push(color);
      }
    }
    
    this.track.canvas.attr({ width: this.width, height: this.track.fullHeight });
    
    this.track.context.textBaseline = 'top';
    this.track.context.fillStyle    = this.background;
    this.track.context.fillRect(0, 0, this.width, this.track.fullHeight);
    
    this.track.beforeDraw(this);
    
    this.drawFeatures(features.fill,   'fillStyle', this.track.colorOrder);
    this.drawFeatures(features.border, 'strokeStyle');
    
    this.track.context.textBaseline = 'middle';
    this.drawFeatures(features.label, 'fillStyle');
    
    this.track.afterDraw(this);
    
    this.container.append(this.image.attr('src', this.track.canvas[0].toDataURL()));
    
    if (!this.track.fixedHeight) {
      this.drawBackground();
    }
  },
  
  drawFeatures: function (features, style, order) {
    var color, i;
    
    if (!order) {
      order = [];
      
      for (color in features) {
        order.push(color);
      }
    }
    
    var c = order.length;
    
    // reverse order - lower orders are more important so draw them last
    while (c--) {
      color = order[c];
      
      if (color) {
        this.track.context[style] = color;
        
        
        i = features[color].length;
        
        while (i--) {
          this.track.context[features[color][i][0]].apply(this.track.context, features[color][i][1]);
        }
      }
    }
  },
  
  drawBackground: function () {
    this.track.canvas.attr({ width: this.width, height: 100 });
    this.track.context.fillStyle = this.background;
    this.track.context.fillRect(0, 0, this.width, 100);
    this.track.beforeDraw(this);
    
    this.container.data('bg', 'url(' + this.track.canvas[0].toDataURL() + ')');
  }
});