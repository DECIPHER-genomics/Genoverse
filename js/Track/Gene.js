Genoverse.Track.Gene = Genoverse.Track.extend({ 

  // Config
  height : 50,
  bump   : true,

  init: function () {
    this.base();
    this.setRenderer(this.renderer, true);
  },
  
  setRenderer: function (renderer, permanent) {
    if (renderer.match(/transcript/)) {
      this.separateLabels = false;
      this.maxLabelRegion = 1e5;
      this.featureHeight  = 8;
      this.bumpSpacing    = 2;
    } else if (renderer.match(/collapsed/)) {
      this.separateLabels = false;
      this.maxLabelRegion = 1e6;
      this.featureHeight  = 8;
      this.bumpSpacing    = 2;
    } else {
      this.separateLabels = true;
      this.maxLabelRegion = 1e7;
      this.featureHeight  = 6;
      this.bumpSpacing    = 1;
    }
    
    if (renderer.match(/nolabel/)) {
      this.maxLabelRegion = -1;
    }
    
    if (this.urlParams.renderer !== renderer || permanent) {
      this.base(renderer, permanent);
    }
  },
  
  getRenderer: function () {
    var renderer = this.renderer.split('_');
    
    if (this.browser.length > 1e7) {
      renderer[0] = 'gene';
    } else if (this.browser.length > 1e6 && this.renderer.match(/transcript/)) {
      renderer[0] = 'collapsed';
    }
    
    return renderer.join('_');
  },
  
  scaleFeatures: function (features) {
    if (this.urlParams.renderer.match(/gene/)) {
      return this.base(features);
    }
  
    var i = features.length;
    var j;
        
    while (i--) {
      features[i].scaledStart = features[i].start * this.scale;
      features[i].scaledEnd   = features[i].end   * this.scale;
      
      for (j = 0; j < features[i].exons.length; j++) {
        features[i].exons[j].scaledStart = features[i].exons[j].start * this.scale;
        features[i].exons[j].scaledEnd   = features[i].exons[j].end   * this.scale;
      }
    }
    
    return features;
  },
  
  positionFeatures: function (features, startOffset, imageWidth) {
    if (this.urlParams.renderer.match(/gene/)) {
      return this.base(features, startOffset, imageWidth);
    }
    
    var transcript, start, end, x, width, bounds, bump, j, k, label, labelStart, labelHeight, maxIndex, exon, exonStart, exonEnd, exonWidth, introns, intronY1, intronY2;
    var expanded   = this.urlParams.renderer.match(/transcript/);
    var context    = this.context;
    var showLabels = this.browser.length <= this.maxLabelRegion;
    var height     = 0;
    var scale      = this.scale > 1 ? this.scale : 1;
    var scaleKey   = this.scale;
    var intronY    = this.featureHeight / 2;
    var seen       = {};
    var draw       = { fill: {}, border: {}, highlight: {} };
    
    for (var i = 0; i < features.length; i++) {
      transcript = features[i];
      
      if (seen[transcript.id]) {
        continue;
      }
      
      seen[transcript.id] = 1;
      
      start   = transcript.scaledStart - startOffset;
      end     = transcript.scaledEnd   - startOffset;
      bounds  = transcript.bounds[scaleKey];
      introns = [];
      
      if (transcript.label && showLabels) {
        label       = transcript.label.split('\n');
        labelStart  = start;
        labelHeight = (this.fontHeight + 2) * label.length;
      } else {
        label       = false;
        labelHeight = 0;
      }
      
      if (bounds) {
        width      = bounds[0].w   - 1;
        maxIndex   = bounds.length - 1;
      } else {
        width = end - start;
        
        if (width < 1) {
          width = scale;
        }
        
        x      = transcript.scaledStart;
        bounds = [{ x: x, y: 0, w: width + 1, h: this.featureHeight + this.bumpSpacing }];
        
        if (label) {
          if (expanded && scale > 1 && start < -this.browser.labelBuffer) {
            bounds[0].h += labelHeight + 1;
          } else {
            bounds.push({ x: x, y: this.featureHeight + this.bumpSpacing + 1, w: Math.max.apply(Math, $.map(label, function (l) { return Math.ceil(context.measureText(l).width); }).concat(width)) + 1, h: labelHeight });
          }
        }
        
        maxIndex = bounds.length - 1;
        
        bounds[0].h += maxIndex;
        
        do {
          bump = false;
          j    = bounds.length;
          
          while (j--) {
            if ((this.featurePositions.search(bounds[j])[0] || transcript).id !== transcript.id) {
              k = bounds.length;
              
              while (k--) {
                bounds[k].y += bounds[j].h; // bump both transcript and label by the height of the current bounds
              }
              
              bump = true;
            }
          }
        } while (bump);
        
        this.featurePositions.insert(bounds[0], transcript);
        
        if (bounds[1]) {
          this.featurePositions.insert(bounds[1], transcript);
        }
        
        transcript.bounds[scaleKey] = bounds;
      }
      
      if (!draw.fill[transcript.color]) {
        draw.fill[transcript.color]   = [];
        draw.border[transcript.color] = [];
        
        if (transcript.order) {
          this.colorOrder[transcript.order] = transcript.color;
        }
      }
      
      if (scale > 1 && start < end) {
        start = Math.max(start, -1);
        end   = Math.min(end, imageWidth + 1);
        width = end - start;
      }
      
      if (bounds[1]) {
        for (j = 0; j < label.length; j++) {
          draw.fill[transcript.color].push([ 'fillText', [ label[j], labelStart, bounds[1].y + j * (this.fontHeight + 2) ], transcript.color ]);
        }
      }
      
      transcript.bottom[scaleKey] = bounds[maxIndex].y + bounds[maxIndex].h + this.spacing;
      
      height = Math.max(transcript.bottom[scaleKey], height);
      
      intronY1 = bounds[0].y + intronY;
      intronY2 = bounds[0].y + (transcript.strand > 0 ? 0 : this.featureHeight);
      
      for (j = 0; j < transcript.exons.length; j++) {
        exon      = transcript.exons[j];
        exonStart = exon.scaledStart - startOffset;
        exonEnd   = exon.scaledEnd   - startOffset;
        exonWidth = exonEnd - exonStart;
        
        if (exonWidth < 1) {
          exonWidth = scale;
        }
        
        if (scale > 1 && exonStart < exonEnd) {
          exonStart = Math.max(exonStart, -1);
          exonEnd   = Math.min(exonEnd, imageWidth + 1);
          exonWidth = exonEnd - exonStart;
        }
        
        if (exonWidth > 0) {
          if (exon.style === 'strokeRect') {
            draw.border[transcript.color].push([ 'strokeRect', [ exonStart, bounds[0].y + 1.5, exonWidth, this.featureHeight - 3 ] ]);
          } else {
            draw.fill[transcript.color].push([ 'fillRect', [ exonStart, bounds[0].y, exonWidth, this.featureHeight ] ]);
          }
        }
        
        if (this.urlParams.renderer.match(/transcript/)) {
          introns.push({ id: exon.id, x: exonStart, y1: intronY1, y2: intronY2, w: exonWidth });
        }
      }
      
      if (this.urlParams.renderer.match(/collapsed/)) {
        draw.fill[transcript.color].push([ 'fillRect', [ start, intronY1, width, 1 ] ]);
      } else if (introns.length > 1) {
        if (!this.decorations[transcript.color]) {
          this.decorations[transcript.color] = [];
        }
        
        this.decorations[transcript.color].push(introns);
      }
      
      if (transcript.highlight) {
        if (!draw.highlight[transcript.highlight]) {
          draw.highlight[transcript.highlight] = [];
        }
        
        draw.highlight[transcript.highlight].push([ 'fillRect', [ start, bounds[0].y, bounds[maxIndex].w, bounds[0].h + labelHeight ] ]);
      }
    }
    
    this.featuresHeight      = height;
    this.labelsHeight        = 0;
    this.fullHeight          = Math.max(height, this.initialHeight);
    this.heights.max         = Math.max(this.fullHeight, this.heights.max);
    this.heights.maxFeatures = Math.max(height, this.heights.maxFeatures);
    
    return draw;
  },
  
  // Draw intron "hats"
  decorateFeatures: function (image) {
    var i, j, exons, x, x1, x2, x3, xMid, y, y1, y2, y3, yScale;
    var xMax = image.width;
    
    for (var color in this.decorations) {
      this.context.strokeStyle = color;
      
      i = this.decorations[color].length;
      
      while (i--) {
        exons = this.decorations[color][i];
        
        for (j = 0; j < exons.length - 1; j++) {
          // For partially coding exons, the exon is duplicated in the decorations array, with one strokeRect and one fillRect
          // In this case, this exon can the same as the next one, in which case skip decoration - lines are only drawn from the edges of the exon boxes
          // and drawing this one would create an internal line
          if (exons[j].id === exons[j+1].id) {
            continue;
          }
          
          // If this is a partially coding exon, get x and y from the first bit of the exon
          if (j && exons[j].id === exons[j-1].id) {
            x = exons[j-1].x + exons[j-1].w;
            y = exons[j-1].y1;
          } else {
            x = exons[j].x + exons[j].w;
            y = exons[j].y1;
          }
          
          x1 = x;             // x coord of the right edge of the first exon
          x3 = exons[j+1].x;  // x coord of the left edge of the second exon
          
          // Skip if completely outside the image's region
          if (x3 < 0 || x1 > xMax) {
            continue;
          }
          
          xMid   = (x1 + x3) / 2;
          x2     = xMid;                     // x coord of the peak of the hat
          y1     = y3 = y;                   // y coord of the ends of the line (half way down the exon box)
          y2     = exons[j].y2;              // y coord of the peak of the hat  (level with the top (forward strand) or bottom (reverse strand) of the exon box)
          yScale = (y2 - y1) / (xMid - x1);  // Scale factor for recalculating coords if points lie outside the image region
          
          if (xMid < 0) {
            y2 = y + (yScale * x3);
            x2 = 0;
          } else if (xMid > xMax) {
            y2 = y + (yScale * (xMax - x));
            x2 = xMax;
          }
          
          if (x1 < 0) {
            y1 = xMid < 0 ? y2 : y - (yScale * x);
            x1 = 0;
          }
          
          if (x3 > xMax) {
            y3 = xMid > xMax ? y2 : y2 - (yScale * (xMax - x2));
            x3 = xMax;
          }
          
          this.context.beginPath();
          this.context.moveTo(x1, y1);
          this.context.lineTo(x2, y2);
          this.context.lineTo(x3, y3);
          this.context.stroke();
        }
      }
    }
  }
});