Genoverse.Track.Threshold = Genoverse.Track.extend({
  config: {
    color   : '#FF0000',
    spacing : 0,
    inherit : [ 'Static' ]
  },
  
  constructor: function (config) {
    this.base(config);
    
    this.container.hide();
    this.label.hide();
    
    this.height = this.featuresHeight = this.fontHeight + 2;
  },
  
  resize: $.noop,
  
  positionFeatures: function () {
    if (this.browser.length <= this.track.threshold) {
      return false;
    }
    
    var text  = 'This data is not displayed in regions greater than ' + this.formatLabel(this.track.threshold);
    var width = this.context.measureText(text).width;
    var fill  = {};
    
    fill[this.color] = [[ 'fillText', [ text, (this.width - width) / 2, 0 ] ]];
    
    return { fill: fill };
  },
  
  draw: function (trackImgContainer) {
    this.image.makeImage();
    this.base(this.image);
    this.image.container.children().addClass('static').appendTo(trackImgContainer).css({ marginTop: -this.height / 2, marginLeft: this.width - this.browser.left });
  }
});
