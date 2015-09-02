Genoverse.Track.View.Transcript = Genoverse.Track.View.extend({
  featureHeight   : 10,
  labels          : true,
  repeatLabels    : true,
  bump            : true,
  intronStyle     : 'curve',
  intronLineWidth : 0.5,

  drawFeature: function (transcript, featureContext, labelContext, scale) {
    this.setFeatureColor(transcript);

    var exons  = ($.isArray(transcript.exons) ? $.extend(true, [], transcript.exons) : $.map($.extend(true, {}, transcript.exons || {}), function (e) { return e; })).sort(function (a, b) { return a.start - b.start; });
    var cds    = ($.isArray(transcript.cds)   ? $.extend(true, [], transcript.cds)   : $.map($.extend(true, {}, transcript.cds   || {}), function (c) { return c; })).sort(function (a, b) { return a.start - b.start; });
    var add    = Math.max(scale, this.widthCorrection);
    var coding = {};
    var i, x, w;

    // Get intron lines to be drawn off the left and right edges of the image
    if (!exons.length || exons[0].start > transcript.start) {
      exons.unshift({ start: transcript.start, end: transcript.start });
    }

    if (!exons.length || exons[exons.length - 1].end < transcript.end) {
      exons.push({ start: transcript.end, end: transcript.end });
    }

    featureContext.fillStyle = featureContext.strokeStyle = transcript.color || this.color;

    for (i = 0; i < cds.length; i++) {
      x = transcript.x + (cds[i].start - transcript.start) * scale;
      w = Math.max((cds[i].end - cds[i].start) * scale + add, this.minScaledWidth);

      if (x > this.width || x + w < 0) {
        continue;
      }

      featureContext.fillRect(x, transcript.y, w, transcript.height);

      coding[cds[i].start + ':' + cds[i].end] = true;
    }

    for (i = 0; i < exons.length; i++) {
      // No need to draw the strokeRect if it is entirely inside a fillRect
      if (!coding[exons[i].start + ':' + exons[i].end]) {
        x = transcript.x + (exons[i].start - transcript.start) * scale;
        w = Math.max((exons[i].end - exons[i].start) * scale + add, this.minScaledWidth);

        if (!(x > this.width || x + w < 0)) {
          featureContext.lineWidth = 1;
          featureContext.strokeRect(x, transcript.y + 1.5, w, transcript.height - 3);
        }
      }

      if (i) {
        x = transcript.x + (exons[i - 1].end - transcript.start) * scale + add;
        w = (exons[i].start - exons[i - 1].end) * scale - add;

        if (x > this.width || x + w < 0) {
          continue;
        }

        this.drawIntron({
          x      : x,
          y      : transcript.y + transcript.height / 2,
          width  : w,
          height : (transcript.height - (coding[exons[i].start + ':' + exons[i].end] ? 0 : 3)) / 2 * (transcript.strand > 0 ? -1 : 1)
        }, featureContext);
      }
    }

    if (this.labels && transcript.label) {
      this.drawLabel(transcript, labelContext, scale);
    }
  },

  drawIntron: function (intron, context) {
    var coords = this.getTruncatedIntronCoords(intron);

    if (!coords) {
      return;
    }

    context.beginPath();
    context.moveTo(coords.x1, coords.y1);

    context.lineWidth = this.intronLineWidth;

    switch (this.intronStyle) {
      case 'line':
        context.lineTo(coords.x3, coords.y1);
        break;
      case 'hat':
        context.lineTo(coords.x2, coords.y2);
        context.lineTo(coords.x3, coords.y3);
        break;
      case 'curve':
        context.quadraticCurveTo(coords.x2, coords.y2, coords.x3, coords.y3);
        break;
      default: break;
    }

    context.stroke();
  },

  getTruncatedIntronCoords: function (intron) {
    var y1 = intron.y; // y coord of the ends of the line (half way down the exon box)
    var y3 = y1;

    if (this.intronStyle === 'line') {
      this.truncateForDrawing(intron);
      y1 += 0.5; // Sharpen line
    }

    var x1 = intron.x;                // x coord of the right edge of the first exon
    var x3 = intron.x + intron.width; // x coord of the left edge of the second exon

    // Skip if completely outside the image's region
    if (x3 < 0 || x1 > this.width) {
      return false;
    }

    var x2, y2, xMid, yScale;

    // Truncate the coordinates of the line being drawn, so it is inside the image's region
    if (this.intronStyle === 'hat') {
      xMid   = (x1 + x3) / 2;
      x2     = xMid;                     // x coord of the peak of the hat/curve
      y2     = intron.y + intron.height; // y coord of the peak of the hat/curve (level with the top (forward strand) or bottom (reverse strand) of the exon box)
      yScale = (y2 - y1) / (xMid - x1);  // Scale factor for recalculating coords if points lie outside the image region

      if (xMid < 0) {
        y2 = intron.y + (yScale * x3);
        x2 = 0;
      } else if (xMid > this.width) {
        y2 = intron.y + (yScale * (this.width - intron.x));
        x2 = this.width;
      }

      if (x1 < 0) {
        y1 = xMid < 0 ? y2 : intron.y - (yScale * intron.x);
        x1 = 0;
      }

      if (x3 > this.width) {
        y3 = xMid > this.width ? y2 : y2 - (yScale * (this.width - x2));
        x3 = this.width;
      }
    } else if (this.intronStyle === 'curve') {
      // TODO: try truncating when style is curve
      x2 = intron.x + intron.width / 2;
      y2 = intron.y + intron.height;
    }

    return {
      x1: x1, y1: y1,
      x2: x2, y2: y2,
      x3: x3, y3: y3
    };
  }
});
