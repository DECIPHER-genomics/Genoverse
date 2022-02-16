import Track from './Static';

export default Track.extend({
  strand     : 1,
  color      : '#000000',
  height     : 12,
  labels     : 'overlay',
  unsortable : true,
  fixedOrder : true,
  arrowWidth : 7,

  resize: () => {},

  makeFirstImage: function (...args) {
    this.prop('scaleline', false);
    this.base(...args);
  },

  render: function (f, img) {
    this.base(f, img);
    this.prop('drawnScale', img.data('scale'));
  },

  positionFeatures: function (features, params) {
    let scaleline = this.prop('scaleline');

    if (params.scale === this.drawnScale) {
      return false;
    }

    if (scaleline) {
      return scaleline;
    }

    const strand     = this.prop('strand');
    const height     = this.prop('height');
    const text       = this.formatLabel(this.browser.length);
    const width      = this.context.measureText(text).width;
    const textMargin = 10; // 5px each side
    const y          = height / 2;
    const x1         = 0;
    const x2         = (this.width - width - textMargin) / 2;

    if (strand) {
      const strandText  = strand === 1 ? 'Forward strand' : 'Reverse strand';
      const strandWidth = this.context.measureText(strandText).width;
      const x3          = (
        strand === 1
          ? this.width - this.prop('arrowWidth') - strandWidth - (1.5 * textMargin)
          : this.prop('arrowWidth') + (0.5 * textMargin)
      );

      scaleline = [
        { x: x1, y: y, width: this.width,               height: 1, decorations: true },
        { x: x2, y: 0, width: width       + textMargin, height: height, clear: true, color: false, labelColor: this.color, labelWidth: width,       label: text       },
        { x: x3, y: 0, width: strandWidth + textMargin, height: height, clear: true, color: false, labelColor: this.color, labelWidth: strandWidth, label: strandText },
      ];
    } else {
      scaleline = [
        { x: x1, y: y, width: this.width,         height: 1, decorations: true },
        { x: x2, y: 0, width: width + textMargin, height: height, clear: true, color: false, labelColor: this.color, labelWidth: width, label: text },
      ];
    }

    return this.base(this.prop('scaleline', scaleline), params);
  },

  decorateFeature: function (feature, context) {
    const strand     = this.prop('strand');
    const height     = this.prop('height');
    const arrowWidth = this.prop('arrowWidth');
    const width      = this.width;

    context.strokeStyle = this.color;

    [ -1, 1 ].filter(
      dir => (strand ? dir === strand : true)
    ).forEach(
      (dir) => {
        const x1 = dir === 1 ? width - arrowWidth : arrowWidth;
        const x2 = x1 + (dir * arrowWidth);

        context.beginPath();
        context.moveTo(x1, height * 0.25);
        context.lineTo(x2, height * 0.5);
        context.lineTo(x1, height * 0.75);
        context.closePath();
        context.stroke();
        context.fill();
      }
    );
  },
});
