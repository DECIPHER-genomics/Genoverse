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
    }) : false;
    
    if (this.track.separateLabels) {
      var deferreds = [];
      
      this.image = $('<img class="features" /><img class="labels" />').each(function () {
        var dfd = $.Deferred();
        $(this).load(dfd.resolve);
        deferreds.push(dfd);
      });
      
      $.when.apply($, deferreds).done(function () {
        deferred.resolve({ target: $.map(arguments, function (a) { return a.target; }) });
      });
    } else {
      this.image = $('<img />').load(deferred.resolve);
    }
    
    if (features || !this.track.url) {
      this.draw(this.track.positionData(this.track.addOverlaps(this.scaleFeatures(features.sort(function (a, b) { return a.start - b.start; }))), this.edges, this.func));
    } else {
      this.track.ajax = $.ajax({
        url      : this.track.url + this.getQueryString(),
        data     : this.track.urlParams,
        context  : this,
        dataType : this.track.url.match(/^http/) ? 'jsonp' : 'json',
        error    : function () { deferred.reject(); },
        success  : function (json) {
          delete this.track.ajax;
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
    var track = this.track;
    var i, color, labelColor;
    
    if (!track.colorOrder.length) {
      for (color in features.fill) {
        track.colorOrder.push(color);
      }
    }
    
    track.canvas.attr({ width: this.width, height: track.featuresHeight });
    track.context.textBaseline = 'top';
    
    track.beforeDraw(this);
    
    this.drawFeatures(features.fill,   'fillStyle', track.colorOrder);
    this.drawFeatures(features.border, 'strokeStyle');
    
    if (track.separateLabels) {
      track.afterDraw(this);
      
      this.container.append(this.image.filter('.features').attr('src', track.canvas[0].toDataURL())).data('img', this);
      
      track.canvas.attr({ width: this.width, height: track.labelsHeight });
      track.context.textBaseline = 'top';
      
      track.beforeDraw(this);
      
      this.drawFeatures(features.label, 'fillStyle');
      
      track.afterDraw(this);
      
      this.container.append(this.image.filter('.labels').attr('src', track.canvas[0].toDataURL()).css('top', track.maxFeaturesHeight).load(function () {
        $(this).parent().siblings().children('.labels').css('top', track.maxFeaturesHeight);
      }));
    } else {
      track.context.textBaseline = 'middle'; // labels overlaid on features - use middle to position them correctly
      
      this.drawFeatures(features.label, 'fillStyle');
      
      track.afterDraw(this);
      
      this.container.append(this.image.attr('src', track.canvas[0].toDataURL())).data('img', this);
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
    var height = this.track.fullBackground ? this.track.fullHeight : 1;
    
    this.track.canvas.attr({ width: this.width, height: height });
    this.track.context.fillStyle = this.background;
    this.track.context.fillRect(0, 0, this.width, height);
    this.track.drawBackground(this, height);
    
    return this.track.canvas[0].toDataURL();
  }
});