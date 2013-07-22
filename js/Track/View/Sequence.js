Genoverse.Track.View.Sequence = Genoverse.Track.View.extend({
  featureMargin : { top: 0, right: 0, bottom: 0, left: 0 },
  colors        : { 'default': '#CCCCCC', A: '#00986A', T: '#0772A1', G: '#FF8E00', C: '#FFDD73' },
  labelColors   : { 'default': '#000000', A: '#FFFFFF', T: '#FFFFFF' },
  
  constructor: function () {
    this.base.apply(this, arguments);
    
    this.labelWidth   = {};
    this.widestLabel  = this.lowerCase ? 'g' : 'G';
    this.labelYOffset = (this.featureHeight + (this.lowerCase ? 0 : 1)) / 2;
    
    if (this.lowerCase) {
      for (var key in this.colors) {
        this.colors[key.toLowerCase()] = this.colors[key];
      }
      
      for (key in this.labelColors) {
        this.colors[key.toLowerCase()] = this.colors[key];
      }      
    }
  },

  draw: function (features, featureContext, labelContext, scale) {
    featureContext.textBaseline = 'middle';
    featureContext.textAlign    = 'left';
    
    if (!this.labelWidth[this.widestLabel]) {
      this.labelWidth[this.widestLabel] = Math.ceil(this.context.measureText(this.widestLabel).width) + 1;
    }
    
    for (var i = 0; i < features.length; i++) {
      this.drawSequence(features[i], featureContext, scale);
    }
  },
  
  drawSequence: function (feature, context, scale) {
    var drawLabels = this.labelWidth[this.widestLabel] < scale - 1;
    var start, bp;
    
    for (var i = 0; i < feature.sequence.length; i++) {
      start = feature.position[scale].X + i * scale;
      
      if (start < -scale || start > context.canvas.width) {
        continue;
      }
      
      bp = feature.sequence.charAt(i);
      
      context.fillStyle = this.colors[bp] || this.colors['default'];
      context.fillRect(start, feature.position[scale].Y, scale, this.featureHeight);
      
      if (!this.labelWidth[bp]) {
        this.labelWidth[bp] = Math.ceil(context.measureText(bp).width) + 1;
      }
      
      if (drawLabels) {
        context.fillStyle = this.labelColors[bp] || this.labelColors['default'];
        context.fillText(bp, start + (scale - this.labelWidth[bp]) / 2, feature.position[scale].Y + this.labelYOffset);
      }
    }
  },
  
  click: $.noop
});