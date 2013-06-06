Genoverse.Track.View = Base.extend({
  top            : 2,
  height         : 12,
  bumpSpacing    : 1,
  featureSpacing : 1,
  repeatLabel    : true,
  minScaledWidth : 0.5,
  fontHeight     : 10,
  fontFamily     : 'sans-serif',
  fontWeight     : 'normal',
  fontColor      : '#000000',
  color          : '#000000',
  labels         : true,
  bump           : false,
  messages       : {
    error     : 'ERROR: ',
    threshold : 'Data for this track is not displayed in regions greater than ',
    resize    : 'Some features are currently hidden, resize to see all'
  },
  
  constructor     : $.noop,
  drawBackground  : $.noop,
  decorateFeature : $.noop,
  
  draw: function (features, featureContext, labelContext, scale) {
    var feature;
    
    for (var i = 0; i < features.length; i++) {
      feature = features[i];
      
      if (feature.position[scale].visible !== false) {
        // TODO: extend with feature.position[scale], rationalize keys
        this.drawFeature($.extend({}, feature, {
          x             : feature.position[scale].X,
          y             : feature.position[scale].Y,
          width         : feature.position[scale].width,
          height        : feature.position[scale].height,
          labelPosition : feature.position[scale].label
        }), featureContext, labelContext, scale);
      }
    }
  },
  
  drawFeature: function (feature, featureContext, labelContext, scale) {
    if (feature.x < 0 || feature.x + feature.width > this.width) {
      this.truncateForDrawing(feature);
    }
    
    if (feature.color !== false) {
      featureContext.fillStyle = feature.color || this.color;
      featureContext.fillRect(feature.x, feature.y, feature.width, feature.height);
    }
    
    if (this.labels && feature.label) {
      this.drawLabel(feature, labelContext, scale);
    }
    
    if (feature.borderColor) {
      featureContext.strokeStyle = feature.borderColor;
      featureContext.strokeRect(feature.x, feature.y + 0.5, feature.width, feature.height);
    }
    
    if (feature.decorations) {
      this.decorateFeature(feature, featureContext, scale);
    }
  },
  
  drawLabel: function (feature, labelContext, scale) {
    var labelStart = feature.x;
    
    if (feature.untruncated) {
      labelStart = this.repeatLabel && feature.untruncated.x < -this.width && feature.untruncated.x + feature.untruncated.width > feature.labelWidth ? 0 : feature.untruncated.x;
    }
    
    if (typeof feature.label === 'string') {
      feature.label = [ feature.label ];
    }
    
    if (labelStart > 0 || labelStart + feature.labelWidth < this.width) {
      labelContext.fillStyle = feature.labelColor || feature.color || this.fontColor || this.color;
      
      if (this.labels === 'overlay') {
        var featureWidth = feature.untruncated ? feature.untruncated.width : feature.width;
        
        if (feature.labelWidth < featureWidth) {
          if (featureWidth < this.width) {
            labelContext.fillText(feature.label.join(' '), labelStart + featureWidth / 2, feature.y + (feature.height + 1) / 2);
          } else {
            labelContext.fillText(feature.label.join(' '), labelStart, feature.y + (feature.height + 1) / 2);
          }
        }
      } else {
        for (var i = 0; i < feature.label.length; i++) {
          labelContext.fillText(feature.label[i], labelStart, i * (this.fontHeight + 2) + (feature.labelPosition ? feature.labelPosition.y : feature.y + feature.height));
        }
      }
    }    
  },
  
  formatLabel: function (label) {
    var str = label.toString();
    
    if (this.minorUnit < 1000) {
      return str.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
    } else {
      var power = Math.floor((str.length - 1) / 3);
      var unit  = this.labelUnits[power];
      
      label /= Math.pow(10, power * 3);
      
      return Math.floor(label) + (unit === 'bp' ? '' : '.' + (label.toString().split('.')[1] || '').concat('00').substring(0, 2)) + ' ' + unit;
    }
  }
});
