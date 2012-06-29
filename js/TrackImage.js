Genoverse.TrackImage = Base.extend({
  constructor: function (config) {
    $.extend(this, config);
    this.bufferedStart = Math.max(this.start - (this.track.labelOverlay ? 0 : this.track.browser.labelBuffer), 1);
    this.container.data('img', this);
  },
  
  makeImage: function () {
    var img      = this;
    var deferred = $.Deferred();
    
    if (this.track.separateLabels) {
      this.images = $('<img class="features" /><img class="labels" />');
      
      $.when.apply($, this.images.map(function () {
        var dfd = $.Deferred();
        $(this).load(dfd.resolve).data('deferred', dfd);
        return dfd;
      })).done(function () {
        deferred.resolve({ target: $.map(arguments, function (a) { return a.target; }), img: img });
      });
    } else {
      this.images = $('<img />').load(function (e) { deferred.resolve({ target: e.target, img: img }); }).data('deferred', deferred);
    }
    
    return deferred;
  },
  
  draw: function (features) {
    if (features === false) {
      return;
    }
    
    var img   = this;
    var track = this.track;
    var i, color, labelColor, labels;
    
    if (!track.colorOrder.length) {
      for (color in features.fill) {
        track.colorOrder.push(color);
      }
    }
    
    if (track.featuresHeight === 0) {
      return this.images.each(function () { $(this).data('deferred').resolve({ target: this, img: img }); });
    }
    
    track.canvas.attr({ width: this.width, height: track.featuresHeight });
    track.context.textBaseline = 'top';
    
    track.beforeDraw(this);
    
    this.drawFeatures(features.highlight, 'fillStyle');
    this.drawFeatures(features.fill,      'fillStyle', track.colorOrder);
    this.drawFeatures(features.border,    'strokeStyle');
    
    track.decorateFeatures(this);
    
    if (track.separateLabels) {
      labels = this.images.filter('.labels');
      
      track.afterDraw(this);
      
      this.container.append(this.images.filter('.features').attr('src', track.canvas[0].toDataURL()));
      
      if (track.labelsHeight === 0) {
        return labels.data('deferred').resolve({ target: labels, img: img });
      }
      
      track.canvas.attr({ width: this.width, height: track.labelsHeight });
      track.context.textBaseline = 'top';
      
      this.drawFeatures(features.labelHighlight, 'fillStyle');
      this.drawFeatures(features.label,          'fillStyle');
      
      this.container.append(labels.attr('src', track.canvas[0].toDataURL()));
    } else {
      track.context.textBaseline = 'middle'; // labels overlaid on features - use middle to position them correctly
      
      this.drawFeatures(features.label, 'fillStyle');
      
      track.afterDraw(this);
      
      this.container.append(this.images.attr('src', track.canvas[0].toDataURL()));
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
    })).done(deferred.resolve);
    
    return deferred;
  }
});