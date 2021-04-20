const { Static } = require('../../Track')

module.exports = Static.Track.extend({
  strand     : 1,
  color      : '#000000',
  height     : 12,
  labels     : 'overlay',
  unsortable : true,
  fixedOrder : true,
  arrowWidth : 7,

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
    }

    if (scaleline) {
      return scaleline;
    }

    var strand     = this.prop('strand');
    var height     = this.prop('height');
    var text       = this.formatLabel(this.browser.length);
    var width      = this.context.measureText(text).width;
    var textMargin = 10; // 5px each side
    var y          = height / 2;
    var x1         = 0;
    var x2         = (this.width - width - textMargin) / 2;

    if (strand) {
      var strandText  = strand === 1 ? 'Forward strand' : 'Reverse strand';
      var strandWidth = this.context.measureText(strandText).width;
      var x3          = (
        strand === 1
          ? this.width - this.prop('arrowWidth') - strandWidth - (1.5 * textMargin)
          : this.prop('arrowWidth') + (0.5 * textMargin)
      );

      scaleline = [
        { x: x1, y: y, width: this.width,               height: 1, decorations: true },
        { x: x2, y: 0, width: width       + textMargin, height: height, clear: true, color: false, labelColor: this.color, labelWidth: width,       label: text       },
        { x: x3, y: 0, width: strandWidth + textMargin, height: height, clear: true, color: false, labelColor: this.color, labelWidth: strandWidth, label: strandText }
      ];
    } else {
      scaleline = [
        { x: x1, y: y, width: this.width,         height: 1, decorations: true },
        { x: x2, y: 0, width: width + textMargin, height: height, clear: true, color: false, labelColor: this.color, labelWidth: width, label: text }
      ];
    }

    return this.base(this.prop('scaleline', scaleline), params);
  },

  decorateFeature: function (feature, context) {
    var strand     = this.prop('strand');
    var height     = this.prop('height');
    var arrowWidth = this.prop('arrowWidth');
    var width      = this.width;

    context.strokeStyle = this.color;

    [ -1, 1 ].filter(
      function (dir) { return strand ? dir === strand : true; }
    ).forEach(
      function (dir) {
        var x1 = dir === 1 ? width - arrowWidth : arrowWidth;
        var x2 = x1 + (dir * arrowWidth);

        context.beginPath();
        context.moveTo(x1, height * 0.25);
        context.lineTo(x2, height * 0.5);
        context.lineTo(x1, height * 0.75);
        context.closePath();
        context.stroke();
        context.fill();
      }
    );
  }
});