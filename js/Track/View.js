Genoverse.Track.View = Base.extend({
  top            : 2,
  height         : 12,
  featureMargin  : { top: 0, right: 1, bottom: 2, left: 1 }, // left is never used
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
  
  drawBackground  : $.noop,
  decorateFeature : $.noop,
  
  constructor: function () {
    var margin = [ 'Top', 'Right', 'Bottom', 'Left' ];
    
    for (var i in margin) {
      if (typeof this['featureMargin' + margin[i]] === 'number') {
        this.featureMargin[margin[i].toLowerCase()] = this['featureMargin' + margin[i]];
      }
    }
    
    this.featureHeight  = typeof this.featureHeight !== 'undefined' ? this.featureHeight : this.view.prototype.height; // Base feature height must on default track height if not set
    this.margin         = typeof this.margin        !== 'undefined' ? this.margin        : this.browser.trackMargin;
    this.fixedHeight    = typeof this.fixedHeight   !== 'undefined' ? this.fixedHeight   : this.featureHeight === this.height && !this.bump;
    this.autoHeight     = typeof this.autoHeight    !== 'undefined' ? this.autoHeight    : !this.fixedHeight && !config.height ? this.browser.autoHeight : false;
    this.resizable      = typeof this.resizable     !== 'undefined' ? this.resizable     : !this.fixedHeight;
    this.height        += this.margin;
    this.initialHeight  = this.height;
    this.minLabelHeight = 0;
    this.font           = this.fontWeight + ' ' + this.fontHeight + 'px ' + this.fontFamily;
    this.labelUnits     = [ 'bp', 'kb', 'Mb', 'Gb', 'Tb' ];
    
    if (this.hidden) {
      this.height = 0;
    }
    
    if (this.autoHeight === 'force') {
      this.autoHeight  = true;
      this.fixedHeight = false;
      this.resizable   = false;
    } else if (this.threshold) {
      this.thresholdMessage = this.formatLabel(this.threshold);
    }
    
    if (this.labels && this.labels !== 'overlay' && (this.depth || this.bump === 'labels')) {
      this.labels = 'separate';
    }
    
    // FIXME: this should be in a plugin
    if (this.heightToggler) {
      this.heightToggler[!this.fixedHeight && this.resizable !== false ? 'show' : 'hide']();
    }
  },
  
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
          labelContext.fillText(feature.label[i], labelStart, i * (this.fontHeight + 2) + (feature.labelPosition ? feature.labelPosition.y : feature.y + feature.height + this.featureMargin.bottom + 1));
        }
      }
    }    
  },
  
  formatLabel: function (label) {
    var power = Math.floor((label.toString().length - 1) / 3);
    var unit  = this.labelUnits[power];
    
    label /= Math.pow(10, power * 3);
    
    return Math.floor(label) + (unit === 'bp' ? '' : '.' + (label.toString().split('.')[1] || '').concat('00').substring(0, 2)) + ' ' + unit;
  }
});
