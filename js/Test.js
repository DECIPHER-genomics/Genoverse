CBrowse.Track.Test = CBrowse.Track.extend({
  config: {
    height        : 150,
    fixedHeight   : true,
    featureHeight : 2,
    color         : '#000000',
    bump          : false,
    autoHeight    : false,
    allData       : true
  },

  testFunc: function() {
    alert('shit');
  },

  setFeatures: function (json) {
    console.time("timing setFeatures");
    var i = json.data.length;
    while (i--) {
      var feature = {
        sort: i,
        start: json.data[i][0],
        end:  json.data[i][0] + 10,
        id: "f" + i,
        color: "#000000",
        y: this.height/2 - json.data[i][1]*this.height/4,
        decorations: [], 
        bounds: {},
        visible: {},
        bottom: {},
        labelBottom: {}
      };

      //this.features.insert({ x: json.data[i][0], y: 0, w: 10, h: 1 }, feature);
      json.data[i] = feature;
    }

    json.features = json.data;
    delete json.data;
   
    if (this.allData) {
      this.url = false;
    }

    console.timeEnd("timing setFeatures");
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
  }

});