Genoverse.Track.View.SequenceVariation = Genoverse.Track.View.Sequence.extend({
  featureHeight : 15,
  featureMargin : { top: 0, right: 0, bottom: 4, left: 0 },
  bump          : true,
  showLegend    : false,

  positionFeature: function (feature, params) {
    var position = feature.position[params.scale];

    if (feature.alt_allele) {
      if (!position.positioned) {
        position.reference = { end: position.start + feature.ref_allele.length * params.scale };
      }

      position.reference.x = position.reference.end - params.scaledStart;
    }

    this.base(feature, params);
  },

  bumpFeature: function (bounds, feature) {
    if (feature.alt_allele) {
      this.base.apply(this, arguments);
    }
  },

  draw: function (features, featureContext, labelContext, scale) {
    var drawing = { seq: [], snv: [] };

    for (var i = 0; i < features.length; i++) {
      drawing[features[i].alt_allele ? 'snv' : 'seq'].push(features[i]);
    }

    this.base(drawing.seq, featureContext, labelContext, scale);
    this.highlightSNVs(drawing.snv, featureContext, scale);
    this.base(drawing.snv, featureContext, labelContext, scale);
    this.outlineSNVs(drawing.snv, featureContext, scale); // Redraw the outline for SNVs, since the feature will have been drawn on top of some of the outline created by highlightSNVs
  },

  highlightSNVs: function (features, context, scale) {
    var position, positionX, positionY;

    for (var i = 0; i < features.length; i++) {
      position  = features[i].position[scale];
      positionX = [ position.X, position.reference.x, position.X + position.width ];

      if (positionX[2] < 0 || positionX[0] > this.width) {
        continue;
      }

      if (positionX[0] < 0 || positionX[2] > this.width) {
        this.truncateForDrawing(positionX);
      }

      positionY = [ 0, position.Y - this.featureMargin.bottom / 2, position.Y, position.Y + this.featureHeight ];

      if (!features[i].highlightColor) {
        this.setHighlightColor(features[i]);
      }

      context.strokeStyle = context.fillStyle = features[i].highlightColor;
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
  },

  outlineSNVs: function (features, context, scale) {
    var position, positionX, positionY;

    for (var i = 0; i < features.length; i++) {
      position  = features[i].position[scale];
      positionX = [ position.X, position.X + position.width ];
      positionY = [ position.Y, position.Y + this.featureHeight ];

      context.strokeStyle = features[i].highlightColor;

      context.lineWidth = 2;

      context.beginPath();
      context.moveTo(positionX[1], positionY[0]);
      context.lineTo(positionX[1], positionY[1]);
      context.lineTo(positionX[0], positionY[1]);
      context.lineTo(positionX[0], positionY[0]);
      context.stroke();

      context.lineWidth = 1;
    }
  },

  truncateForDrawing: function (positionX) {
    for (var i in positionX) {
      positionX[i] = Math.min(Math.max(positionX[i], -1), this.width + 1);
    }
  },

  setHighlightColor: function (feature) {
    feature.highlightColor = feature.alt_allele === '-' || feature.alt_allele.length < feature.ref_allele.length ? '#D31D00' : '#1DD300';
  }
});
