import View from 'js/Track/View';

export default View.extend({
  featureMargin : { top: 0, right: 0, bottom: 0, left: 0 },
  colors        : { 'default': '#CCCCCC', A: '#73E973', T: '#DE4C61', G: '#FFFF77', C: '#688EC0' },
  labelColors   : { 'default': '#000000', T: '#FFFFFF', C: '#FFFFFF' },
  labels        : 'overlay',

  setDefaults: function (...args) {
    this.base(...args);

    const lowerCase = this.prop('lowerCase');

    this.labelYOffset = typeof this.labelYOffset === 'number' ? this.labelYOffset : (this.featureHeight + 1) / 2;
    this.widestLabel  = typeof this.widestLabel  === 'string' ? this.widestLabel : lowerCase ? 'g' : 'G';
    this.labelWidth   = {};

    this.labelWidth[this.widestLabel] = Math.ceil(this.context.measureText(this.widestLabel).width) + 1;

    if (lowerCase) {
      [ this.colors, this.labelColors ].forEach(
        colorObject => Object.entries(colorObject).forEach(([ letter, color ]) => {
          colorObject[letter.toLowerCase()] = color;
        })
      );
    }
  },

  draw: function (features, featureContext, labelContext, scale) {
    featureContext.textBaseline = 'middle';
    featureContext.textAlign    = 'center';

    const width = Math.max(scale, this.minScaledWidth);

    features.forEach(feature => this.drawSequence(feature, featureContext, scale, width));
  },

  drawSequence: function (feature, context, scale, width) {
    const drawLabels = this.labelWidth[this.widestLabel] < width - 1;

    for (let i = 0; i < feature.sequence.length; i++) {
      const start = feature.position[scale].X + i * scale;

      if (start < -scale || start > context.canvas.width) {
        continue;
      }

      const bp = feature.sequence.charAt(i);

      context.fillStyle = this.colors[bp] || this.colors.default;
      context.fillRect(start, feature.position[scale].Y, width, this.featureHeight);

      if (drawLabels) {
        context.fillStyle = this.labelColors[bp] || this.labelColors.default;
        context.fillText(bp, start + (width / 2), feature.position[scale].Y + this.labelYOffset);
      }
    }
  },
});
