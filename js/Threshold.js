CBrowse.Track.on('afterDraw', function (image) {
  if (this.cBrowse.thresholds && this.cBrowse.thresholds[this.id]) {
    this.cBrowse.thresholds[this.id].trackImg = image.container;
  }
});

CBrowse.Track.Threshold = CBrowse.Track.extend({
  config: {
    color   : '#FF0000',
    spacing : 0,
    inherit : [ 'Static' ]
  },
  
  constructor: function (config) {
    this.base(config);
    
    if (!this.cBrowse.thresholds) {
      this.cBrowse.thresholds = {};
    }
    
    this.cBrowse.thresholds[this.track.id] = this;
    
    this.container.hide();
    this.label.hide();
    this.resize();
  },
  
  resize: function () {
    this.height = this.featuresHeight = this.track.height;
  },
  
  positionFeatures: function () {
    if (this.cBrowse.length <= this.track.threshold) {
      return false;
    }
    
    var text  = 'This data is not displayed in regions greater than ' + this.formatLabel(this.track.threshold);
    var width = this.context.measureText(text).width;
    var fill  = {};
    
    fill[this.color] = [[ 'fillText', [ text, (this.width - width) / 2, (this.height - this.fontHeight) / 2 ] ]];
    
    return { fill: fill };
  },
  
  draw: function (image, features) {
    this.base(image, features);
    image.container.children().addClass('static').appendTo(this.trackImg).css('marginLeft', this.width).show();
  }
});
