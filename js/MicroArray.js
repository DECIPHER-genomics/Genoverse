CBrowse.Track.MicroArray = CBrowse.Track.extend({
  config: {
    height        : 150,
    fixedHeight   : true,
    featureHeight : 1,
    color         : '#000000',
    bump          : false,
    autoHeight    : false,
    allData       : true
  },

  beforeDraw: function (image) {
    this.context.fillStyle = '#89BDFF';
    this.context.fillRect(0, this.height/2, image.width, 1);
    this.context.fillRect(0, this.height/4, image.width, 1);
    this.context.fillRect(0, 3*this.height/4, image.width, 1);
  },

  afterDraw: function (image) {
    this.context.fillStyle = 'black';
    this.context.fillRect(0, 0, image.width, 1);
    this.context.fillRect(0, this.height-1, image.width, 1);
  },

  parseFeatures: function (json, bounds) {
    console.time('MicroArray.parseFeatures');
    var features = new Array();
    var i = json.data.length;

    var halfHeight = this.height/2;
    var quarterHeight = this.height/4;
    for (i = 0; i < json.data.length; i++) {
      features.push({
        sort: i,
        start: json.data[i][0],
        end:  json.data[i][0] + 10,
        id: "f" + i,
        color: "#000000",
        y: halfHeight - json.data[i][1]*quarterHeight,
        bounds: {},
        visible: {},
        bottom: {}
      });
    }

    this.features = new FRegion(features);

    if (this.allData) {
      this.url = false;
    }

    console.timeEnd('MicroArray.parseFeatures');
    return this.features.search(bounds);
  },

});