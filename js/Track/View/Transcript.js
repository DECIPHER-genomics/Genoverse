Genoverse.Track.View.Transcript = Genoverse.Track.View.extend({
  featureHeight : 10,
  labels        : true,
  repeatLabels  : true,
  bump          : true,
  intronStyle   : 'bezierCurve',
  lineWidth     : 0.5,

  drawFeature: function (transcript, featureContext, labelContext, scale) {
    this.setFeatureColor(transcript);

    var exons = $.map($.extend(true, {}, transcript.exons || {}), function (e) { return e; }).sort(function (a, b) { return a.start - b.start; });
    var cds   = $.map($.extend(true, {}, transcript.cds   || {}), function (c) { return c; }).sort(function (a, b) { return a.start - b.start; });
    var exon, i;

    // Get intron lines to be drawn off the left and right edges of the image
    if (!exons.length || exons[0].start > transcript.start) {
      exons.unshift({ start: transcript.start, end: transcript.start });
    }

    if (!exons.length || exons[exons.length - 1].end < transcript.end) {
      exons.push({ start: transcript.end, end: transcript.end });
    }

    for (i = 0; i < exons.length; i++) {
      exon = exons[i];

      featureContext.strokeStyle = exon.color || transcript.color || this.color;
      featureContext.lineWidth   = 1;

      featureContext.strokeRect(
        transcript.x + (exon.start - transcript.start) * scale,
        transcript.y + 1.5,
        Math.max(1, (exon.end - exon.start + 1) * scale),
        transcript.height - 3
      );

      if (i) {
        this.drawIntron({
          x      : transcript.x + (exons[i - 1].end - transcript.start + 1) * scale,
          y      : transcript.y + transcript.height / 2 + 0.5,
          width  : (exon.start - exons[i - 1].end - 1) * scale,
          height : transcript.strand > 0 ? -transcript.height / 2 : transcript.height / 2
        }, featureContext);
      }
    }

    for (i = 0; i < cds.length; i++) {
      featureContext.fillStyle = cds[i].color || transcript.color || this.color;

      featureContext.fillRect(
        transcript.x + (cds[i].start - transcript.start) * scale,
        transcript.y,
        Math.max(1, (cds[i].end - cds[i].start + 1) * scale),
        transcript.height
      );
    }

    if (this.labels && transcript.label) {
      this.drawLabel(transcript, labelContext, scale);
    }
  },

  drawIntron: function (intron, context) {
    context.beginPath();
    context.lineWidth = this.lineWidth;

    switch (this.intronStyle) {
      case 'line':
        context.moveTo(intron.x, intron.y);
        context.lineTo(intron.x + intron.width, intron.y);
        break;
      case 'hat':
        context.moveTo(intron.x, intron.y);
        context.lineTo(intron.x + intron.width / 2, intron.y + intron.height);
        context.lineTo(intron.x + intron.width, intron.y);
        break;
      case 'bezierCurve':
        context.moveTo(intron.x, intron.y);
        context.bezierCurveTo(intron.x, intron.y + intron.height, intron.x + intron.width, intron.y + intron.height, intron.x + intron.width, intron.y);
        break;
      default: break;
    }

    context.stroke();
    context.closePath();
  }
});
