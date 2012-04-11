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
      this.image = $('<img class="features" /><img class="labels" />');
      
      $.when.apply($, this.image.map(function () {
        var dfd = $.Deferred();
        $(this).load(dfd.resolve).data('deferred', dfd);
        return dfd;
      })).done(function () {
        deferred.resolve({ target: $.map(arguments, function (a) { return a.target; }) });
      });
    } else {
      this.image = $('<img />').load(deferred.resolve).data('deferred', deferred);
    }
    
    this.image.data('img', this);
    
    if (features || !this.track.url) {
      this.draw(this.track.positionData(this.scaleFeatures(features.sort(function (a, b) { return a.sort - b.sort; })), this.edges));
    } else {
      this.track.ajax = $.ajax({
        url      : this.track.url,
        data     : this.urlParams(),
        context  : this,
        dataType : this.track.url.match(/^http/) ? 'jsonp' : 'json',
        error    : function () { deferred.reject(); },
        success  : function (json) {
          delete this.track.ajax;
          this.track.setFeatures(json);
          this.draw(this.track.positionData(this.scaleFeatures(json.features), this.edges));
        }
      });
    }
    
    return deferred;
  },
  
  urlParams: function () {
    return $.extend({
      chr   : this.track.cBrowse.chromosome,
      start : this.bufferedStart,
      end   : this.end
    }, this.track.urlParams, this.track.allData ? { start: 1, end: this.track.cBrowse.chromosomeSize } : {});
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
    var i, color, labelColor, labels;
    
    if (!track.colorOrder.length) {
      for (color in features.fill) {
        track.colorOrder.push(color);
      }
    }
    
    if (track.featuresHeight === 0) {
      return this.image.each(function () { $(this).data('deferred').resolve({ target: this }); });
    }
    
    track.canvas.attr({ width: this.width, height: track.featuresHeight });
    track.context.textBaseline = 'top';
    
    track.beforeDraw(this);
    
    this.drawFeatures(features.fill,   'fillStyle', track.colorOrder);
    this.drawFeatures(features.border, 'strokeStyle');
    
    track.drawDecorations(this);
    
    if (track.separateLabels) {
      labels = this.image.filter('.labels');
      
      track.afterDraw(this);
      
      this.container.append(this.image.filter('.features').attr('src', track.canvas[0].toDataURL()));
      
      if (track.labelsHeight === 0) {
        return labels.data('deferred').resolve({ target: labels });
      }
      
      track.canvas.attr({ width: this.width, height: track.labelsHeight });
      track.context.textBaseline = 'top';
      
      this.drawFeatures(features.label, 'fillStyle');
      
      this.container.append(labels.attr('src', track.canvas[0].toDataURL()).css('top', track.heights.maxFeatures).load(function () {
        $(this).parent().siblings('.' + track.cBrowse.scrollStart).children('.labels').css('top', track.heights.maxFeatures);
      }));
    } else {
      track.context.textBaseline = 'middle'; // labels overlaid on features - use middle to position them correctly
      
      this.drawFeatures(features.label, 'fillStyle');
      
      track.afterDraw(this);
      
      this.container.append(this.image.attr('src', track.canvas[0].toDataURL()));
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
    var backgrounds = $();
    var deferred    = $.Deferred();
    var heights     = this.track.backgrounds ? [ this.track.fullHeight, 1 ] : [ 1 ];
    
    for (var i = 0; i < heights.length; i++) {
      this.track.canvas.attr({ width: this.width, height: heights[i] });
      this.track.context.fillStyle = this.background;
      this.track.context.fillRect(0, 0, this.width, heights[i]);
      this.track.drawBackground(this, heights[i]);
      
      backgrounds.push($('<img class="bg" src="' + this.track.canvas[0].toDataURL() + '"/>').prependTo(this.container)[0]);
    }
    
    backgrounds.last().height('100%');
    
    $.when.apply($, backgrounds.map(function () {
      var dfd = $.Deferred();
      $(this).load(dfd.resolve);
      return dfd;
    })).done(function () {
      deferred.resolve();
    });
    
    return deferred;
  }
});