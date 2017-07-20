Genoverse.Track.Scaleline = Genoverse.Track.Static.extend({
  strand     : 1,
  color      : '#000000',
  height     : 12,
  labels     : 'overlay',
  unsortable : true,
  fixedOrder : true,

  resize: $.noop,

  makeFirstImage: function () {
    this.prop('scaleline', false);
    this.base.apply(this, arguments);
  },

  render: function (f, img) {
    this.base(f, img);
    this.prop('drawnScale', img.data('scale'));
  },

  positionFeatures: function (features, params) {
    var scaleline = this.prop('scaleline');

    if (params.scale === this.drawnScale) {
      return false;
    } else if (scaleline) {
      return scaleline;
    }

    var strand = this.prop('strand');
    var height = this.prop('height');
    var text   = this.formatLabel(this.browser.length);
    var text2  = strand === 1 ? 'Forward strand' : 'Reverse strand';
    var width1 = this.context.measureText(text).width;
    var width2 = this.context.measureText(text2).width;
    var x1, x2;

    if (strand === 1) {
      x1 = 0;
      x2 = this.width - width2 - 40;
    } else {
      x1 = 25;
      x2 = 30;
    }

    scaleline = [
      { x: x1,                             y: height / 2, width: this.width - 25, height: 1, decorations: true },
      { x: (this.width - width1 - 10) / 2, y: 0,          width: width1 + 10,     height: height, clear: true, color: false, labelColor: this.color, labelWidth: width1, label: text  },
      { x: x2,                             y: 0,          width: width2 + 10,     height: height, clear: true, color: false, labelColor: this.color, labelWidth: width2, label: text2 }
    ];

    return this.base(this.prop('scaleline', scaleline), params);
  },

  decorateFeature: function (feature, context) {
    var strand = this.prop('strand');
    var height = this.prop('height');
    var x      = strand === 1 ? this.width - 25 : 25;

    context.strokeStyle = this.color;

    context.beginPath();
    context.moveTo(x,                 height * 0.25);
    context.lineTo(x + (strand * 20), height * 0.5);
    context.lineTo(x,                 height * 0.75);
    context.closePath();
    context.stroke();
    context.fill();
  }
});