CBrowse.Track.Test = CBrowse.Track.extend({
  config: {
    height        : 20,
    featureHeight : 3,
    color         : '#000000',
    bump          : false,
    autoHeight    : false
  },

  makeImage: function () {
    this.setFeatures.apply(this, arguments);
    return this.base.apply(this, arguments);
  },

  setFeatures: function (start, end) {
    console.log(start);
    console.log(end);

    var features = [
      {
        start: 500000,
        end: 1000500,
        color: '#000000',
        id: 'f1'
      },
      {
        start: 905500,
        end: 1055500,
        color: '#000000',
        id: 'f2'
      },
    ];

    this.base({ features: features });
  },


  afterDraw: function (image) {
    this.context.fillStyle = 'red';
    this.context.fillRect(0, 0, image.width, 1);
  }

});