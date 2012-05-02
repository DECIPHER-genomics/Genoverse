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
    this.context.fillStyle = '#CCCCCC';
    this.context.fillRect(0, this.height/2, image.width, 1);

    this.context.fillStyle = '#CCCCCC';
    this.context.fillRect(0, this.height/4, image.width, 1);
    this.context.fillRect(0, 3*this.height/4, image.width, 1);
  },

  afterDraw: function (image) {
    var bounds = { x: image.bufferedStart, w: image.end - image.bufferedStart };
    var calls  = this.calls.search(bounds);
    var i = calls.length;
    console.log(bounds);
    console.log(calls);

    this.context.globalAlpha = 0.5;
    while (i--) {
      start      = calls[i].start * this.scale - image.scaledStart;
      end        = calls[i].end * this.scale   - image.scaledStart;

      var lingrad = this.context.createLinearGradient(0,0,0,150);
      lingrad.addColorStop(0, calls[i].color);
      lingrad.addColorStop(0.5, '#fff');

      this.context.fillStyle = lingrad;
      this.context.fillRect(start, calls[i].y, end-start, this.height/2-calls[i].y);
    }

    this.context.globalAlpha = 1;
    //this.context.globalAlpha = 0.5;
    this.context.fillStyle = '#7F7F7F';
    this.context.fillRect(0, 0, image.width, 1);
  },

  parseFeatures: function (json, bounds) {
    var features = new Array();

    var halfHeight = this.height/2;
    var quarterHeight = this.height/4;

    for (var i = 0; i < json.data.length; i++) {
      features.push({
        sort: i,
        start: json.data[i][0],
        end:  json.data[i][0] + 10,
        id: "p" + i,
        color: "#000000",
        y: halfHeight - json.data[i][1]*quarterHeight,
        bounds: {},
        visible: {},
        bottom: {}
      });
    }

    this.features = new FRegion(features);

    var calls = new Array();
    for (var i = 0; i < json.calls.length; i++) {
      var call = json.calls[i];
      calls.push({
        sort: i,
        start: call.start,
        end:  call.stop,
        id: "c" + i,
        color: call.ratio > 0 ? "#13BF04" : "#FF2F00",
        y: halfHeight - call.ratio*quarterHeight,
        bounds: {},
        visible: {},
        bottom: {}
      });
    }
    this.calls = new FRegion(calls);

    if (this.allData) {
      this.url = false;
    }

    return this.features.search(bounds);
  },

});