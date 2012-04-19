CBrowse.Track.Test = CBrowse.Track.extend({
  config: {
    height        : 200,
    fixedHeight   : true,
    featureHeight : 1,
    color         : '#000000',
    bump          : false,
    autoHeight    : false,
    allData       : true
  },

  setFeatures: function (json) {
    var i = json.data.length;
    
    while (i--) {
      var feature = {
        sort: i,
        bounds: {},
        visible: {},
        bottom: {},
        labelBottom: {}
      };

      this.features.insert({ x: json.data[i][0], y: 10, w: 10, h: 1 }, feature);
    }
    
    if (this.allData) {
      this.url = false;
    }
  },

  afterDraw: function (image) {
    this.context.fillStyle = 'red';
    this.context.fillRect(0, 0, image.width, 1);
  }

});