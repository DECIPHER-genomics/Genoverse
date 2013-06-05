Genoverse.Track.Scaleline = Genoverse.Track.Static.extend({
  strand : 1,
  color  : '#000000',
  height : 12,
  labels : 'overlay',
  
  resize: $.noop,
  
  setScale: function () {
    this.scaleline = false;
    this.base();
  },
  
  render: function () {
    this.base.apply(this, arguments);
    this.drawnScale = this.scale;
  },
  
  positionFeatures: function (features, params) {
    if (this.scale === this.drawnScale) {
      return false;
    } else if (this.scaleline) {
      return this.scaleline;
    }
    
    var text   = this.formatLabel(this.browser.length);
    var text2  = this.strand === 1 ? 'Forward strand' : 'Reverse strand';
    var width1 = this.context.measureText(text).width;
    var width2 = this.context.measureText(text2).width;
    var bg     = this.browser.colors.background;
    var x1, x2;
    
    switch (this.strand) {
      case 1  : x1 = 0;  x2 = this.width - width2 - 40; break;
      default : x1 = 25; x2 = 30; break;
    }
    
    this.scaleline = [
      { x: x1,                             y: this.height / 2, width: this.width - 25, height: 1, decorations: true },
      { x: (this.width - width1 - 10) / 2, y: 0,               width: width1 + 10,     height: this.height, color: bg, labelColor: this.color, labelWidth: width1, label: text  },
      { x: x2,                             y: 0,               width: width2 + 10,     height: this.height, color: bg, labelColor: this.color, labelWidth: width2, label: text2 }
    ];
    
    return this.base(this.scaleline, params);
  },
  
  decorateFeature: function (feature, context) {
    var x = this.strand === 1 ? this.width - 25 : 25;
    
    context.strokeStyle = this.color;
    
    context.beginPath();
    context.moveTo(x,                      this.height * 0.25);
    context.lineTo(x + (this.strand * 20), this.height * 0.5);
    context.lineTo(x,                      this.height * 0.75);
    context.closePath();
    context.stroke();
    context.fill();
  }
});