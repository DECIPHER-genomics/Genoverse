import View from './Sequence';

export default View.extend({
  featureHeight : 15,
  featureMargin : { top: 0, right: 0, bottom: 4, left: 0 },
  bump          : true,
  showLegend    : false,

  positionFeature: function (feature, params) {
    const position = feature.position[params.scale];

    if (feature.alt_allele) {
      if (!position.positioned) {
        position.reference = { end: position.start + feature.ref_allele.length * params.scale };
      }

      position.reference.x = position.reference.end - params.scaledStart;
    }

    this.base(feature, params);
  },

  bumpFeature: function (bounds, feature, ...args) {
    if (feature.alt_allele) {
      this.base(bounds, feature, ...args);
    }
  },

  draw: function (features, featureContext, labelContext, scale) {
    const drawing = { seq: [], snv: [] };

    features.forEach(
      (feature) => { drawing[feature.alt_allele ? 'snv' : 'seq'].push(feature); }
    );

    this.base(drawing.seq, featureContext, labelContext, scale);
    this.highlightSNVs(drawing.snv, featureContext, scale);
    this.base(drawing.snv, featureContext, labelContext, scale);
    this.outlineSNVs(drawing.snv, featureContext, scale); // Redraw the outline for SNVs, since the feature will have been drawn on top of some of the outline created by highlightSNVs
  },

  highlightSNVs: function (features, context, scale) {
    features.forEach(
      (feature) => {
        const position  = feature.position[scale];
        const positionX = [ position.X, position.reference.x, position.X + position.width ];

        if (positionX[2] < 0 || positionX[0] > this.width) {
          return;
        }

        if (positionX[0] < 0 || positionX[2] > this.width) {
          this.truncateForDrawing(positionX);
        }

        const positionY = [ 0, position.Y - this.featureMargin.bottom / 2, position.Y, position.Y + this.featureHeight ];

        if (!feature.highlightColor) {
          this.setHighlightColor(feature);
        }

        context.strokeStyle = context.fillStyle = feature.highlightColor;
        context.lineWidth   = 2;

        context.beginPath();
        context.moveTo(positionX[0], positionY[0]);
        context.lineTo(positionX[1], positionY[0]);
        context.lineTo(positionX[1], positionY[1]);
        context.lineTo(positionX[2], positionY[2]);
        context.lineTo(positionX[2], positionY[3]);
        context.lineTo(positionX[0], positionY[3]);
        context.closePath();
        context.stroke();

        context.lineWidth   = 1;
        context.globalAlpha = 0.5;

        context.fill();

        context.globalAlpha = 1;
      }
    );
  },

  outlineSNVs: function (features, context, scale) {
    features.forEach(
      (feature) => {
        const position  = feature.position[scale];
        const positionX = [ position.X, position.X + position.width ];
        const positionY = [ position.Y, position.Y + this.featureHeight ];

        context.strokeStyle = feature.highlightColor;

        context.lineWidth = 2;

        context.beginPath();
        context.moveTo(positionX[1], positionY[0]);
        context.lineTo(positionX[1], positionY[1]);
        context.lineTo(positionX[0], positionY[1]);
        context.lineTo(positionX[0], positionY[0]);
        context.stroke();

        context.lineWidth = 1;
      }
    );
  },

  truncateForDrawing: function (positionX) {
    for (let i = 0; i < positionX.length; i++) {
      positionX[i] = Math.min(Math.max(positionX[i], -1), this.width + 1);
    }
  },

  setHighlightColor: function (feature) {
    feature.highlightColor = feature.alt_allele === '-' || feature.alt_allele.length < feature.ref_allele.length ? '#D31D00' : '#1DD300';
  },
});
