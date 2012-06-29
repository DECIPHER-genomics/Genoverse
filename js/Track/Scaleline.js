Genoverse.Track.Scaleline = Genoverse.Track.extend({
  config: {
    color          : '#000000',
    height         : 12,
    featuresHeight : 14,
    inherit        : [ 'Static' ]
  },
  
  resize: $.noop,
  
  positionFeatures: function () {
    if (this.scale === this.drawnScale) {
      return false;
    }
    
    var text   = this.formatLabel(this.browser.length);
    var text2  = 'Forward strand';
    var width1 = this.context.measureText(text).width;
    var width2 = this.context.measureText(text2).width;
    var fill   = {};
    
    fill[this.color] = [
      [ 'fillRect', [ 0,                                       this.height / 2, (this.width - width1 - 10) / 2,            1 ] ],
      [ 'fillRect', [ width1 + (this.width - width1 + 10) / 2, this.height / 2, ((this.width - width1) / 2) - width2 - 45, 1 ] ],
      [ 'fillRect', [ this.width - 30,                         this.height / 2, 5,                                         1 ] ],
      [ 'fillText', [ text, (this.width - width1) / 2, 2 ] ],
      [ 'fillText', [ text2, this.width - width2 - 35, 2 ] ]
    ];
    
    fill[this.browser.colors.background] = [[ 'fillRect', [ 0, 0, this.width, this.height ] ]];
    
    this.drawnScale = this.scale;
    
    return { fill: fill };
  },
  
  decorateFeatures: function () {
    this.context.strokeStyle = this.color;
    
    this.context.beginPath();
    this.context.moveTo(this.width - 25, this.height * 0.25);
    this.context.lineTo(this.width - 5,  this.height * 0.5);
    this.context.lineTo(this.width - 25, this.height * 0.75);
    this.context.closePath();
    this.context.stroke();
    this.context.fill();
  }
});
