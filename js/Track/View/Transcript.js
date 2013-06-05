Genoverse.Track.View.Transcript = Genoverse.Track.View.extend({

  height        : 150,
  featureHeight : 10,
  labels        : true,
  bump          : true,
  intronStyle   : 'line',
  lineWidth     : 0.5,

  drawFeature: function(transcript, featureContext, labelContext, scale) {
    if (transcript.exons && transcript.exons.length) {
      var exons = transcript.exons.sort(function(a, b){ return a.start - b.start });
      for (var i=0; i<exons.length; i++) {
        var exon = exons[i];
        featureContext.strokeStyle = exon.color || transcript.color || this.color;
        featureContext.lineWidth   = 1;
        featureContext.strokeRect(
          transcript.x + (exon.start - transcript.start) * scale,
          transcript.y + 1.5,
          (exon.end - exon.start) * scale, 
          transcript.height - 2
        );

        if (i) this.drawIntron({
          x: transcript.x + (exons[i-1].end - transcript.start) * scale,
          y: transcript.y + transcript.height/2 + 0.5,
          width: (exon.start - exons[i-1].end) * scale,
          height: transcript.strand > 0 ? -transcript.height/2 : transcript.height/2,
        }, featureContext);
      }
    }

    if (transcript.cds && transcript.cds.length) {
      for (var i=0; i<transcript.cds.length; i++) {
        var cds = transcript.cds[i];
        featureContext.fillStyle = cds.color || transcript.color || this.color;
        featureContext.fillRect(
          transcript.x + (cds.start - transcript.start) * scale,
          transcript.y, 
          (cds.end - cds.start) * scale, 
          transcript.height
        );
      }
    }

    if (this.labels && transcript.label) {
      this.drawLabel(transcript, labelContext, scale)
    }
  },  

  drawIntron: function (intron, context) {
    context.beginPath();
    context.lineWidth = this.lineWidth;
    switch (this.intronStyle) {
      case 'line' :
        context.moveTo(intron.x, intron.y);
        context.lineTo(intron.x + intron.width, intron.y);
      break;
      case 'hat' :
        context.moveTo(intron.x, intron.y);
        context.lineTo(intron.x + intron.width/2, intron.y + intron.height);
        context.lineTo(intron.x + intron.width, intron.y);
      break;
      case 'bezierCurve' :
        context.moveTo(intron.x, intron.y);
        context.bezierCurveTo(intron.x, intron.y + intron.height, intron.x + intron.width, intron.y + intron.height, intron.x + intron.width, intron.y);
      break;
    }
    context.stroke();
    context.closePath();
  }

});