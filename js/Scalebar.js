CBrowse.Track.Scalebar = CBrowse.Track.extend({
  defaults: {
    height        : 20,
    featureHeight : 3,
    labelY        : 15,
    borderTop     : 0.5,
    borderBottom  : 3.5,
    guideLines    : true
  },
  
  reset: function () {
    this.base();
    this.features = {};
  },
  
  setScale: function (edges) {
    var length = this.cBrowse.length;
    var majorUnit, minorUnit, exponent, mantissa;
    
    if (length <= 51) {
      majorUnit = 10;
      minorUnit = 1; 
    } else {
      exponent = Math.pow(10, Math.floor(Math.log(length) / Math.log(10)));
      mantissa = length / exponent;
      
      if (mantissa < 1.2) {
        majorUnit = exponent / 10;
        minorUnit = majorUnit / 5;
      } else if (mantissa < 2.5) {
        majorUnit = exponent / 5;
        minorUnit = majorUnit / 4;
      } else if (mantissa < 5) {
        majorUnit = exponent / 2;
        minorUnit = majorUnit / 5;
      } else {
        majorUnit = exponent;
        minorUnit = majorUnit / 5;
      }
    }
    
    this.minorUnit = this.cBrowse.minorUnit = minorUnit;
    this.majorUnit = this.cBrowse.majorUnit = majorUnit;
    
    if (this.guideLines) {
      this.cBrowse.guideLines = { major: {}, minor: {} };
    }
    
    this.base(edges);
    this.positionData();
  },
  
  positionData: function () {
    var flip  = 1;
    var width = Math.round(this.minorUnit * this.scale);
    var features, start, major;
    
    this.labelOffset = Math.ceil(this.fontWidth / this.scale) * this.cBrowse.longestLabel;
    this.features    = {};
    
    for (var x = 0; x < this.cBrowse.chromosome.size; x += this.minorUnit) {
      features = [];
      start    = Math.round(x * this.scale);
      major    = x && !(x % this.majorUnit);
      
      if ((flip *= -1) === 1) {
        features.push([ 'fillRect', [ start, 0, width, this.featureHeight ] ]); // Black part of scalebar
      }
      
      if (major) {
        features.push([ 'fillText', [ x.toLocaleString(), start, this.labelY ] ]); // Location label
        features.push([ 'fillRect', [ start, this.borderBottom, 1, 3 ] ]);         // Indicator dash
      }
      
      if (features.length) {
        this.features[x] = features;
      }
      
      if (this.guideLines) {
        this.cBrowse.guideLines[major ? 'major' : 'minor'][x] = start;
      }
    }
  },
  
  makeImage: function (start, end, width, moved) {
    var func     = moved < 0 ? 'unshift' : 'push';
    var pos      = moved < 0 ? 'right'   : 'left';
    var div      = this.imgContainer.clone().width(width);
    var deferred = $.Deferred();
    
    this.draw(start, end, width);
    
    this.imgContainers[func](div.append($('<img />').load(deferred.resolve).attr('src', this.canvas[0].toDataURL())).css(pos, this.offsets[pos])[0]);
    this.container.append(this.imgContainers);
    
    this.offsets[pos] += width;
    
    return deferred;
  },
  
  draw: function (start, end, width) {
    this.canvas.attr({ width: width, height: this.fullHeight });
    
    this.context.fillStyle = this.cBrowse.colors.background;
    this.context.fillRect(0, 0, width, this.fullHeight);
    
    var scaledStart = Math.round(start * this.scale) + 1;
    var i, position;
    
    if (this.guideLines) {
      this.cBrowse.decorateTrack(start, end, this);
    }
    
    start -= this.labelOffset; // Ensure drawing of labels which overlap the edge of the image
    
    this.context.fillStyle = '#000';
    
    for (var x = start - (start % this.minorUnit); x < end; x += this.minorUnit) {
      i = this.features[x] ? this.features[x].length : 0;
      
      while (i--) {
        position = this.features[x][i][1].slice();
        position[this.features[x][i][0] === 'fillText' ? 1 : 0] -= scaledStart;
        
        this.context[this.features[x][i][0]].apply(this.context, position);
      }
    }
    
    this.hLine(this.borderTop,    0, width);
    this.hLine(this.borderBottom, 0, width);
  },
  
  drawLine: function (x1, y1, x2, y2) {
    this.context.beginPath();
    this.context.moveTo(x1, y1);
    this.context.lineTo(x2, y2);
    this.context.stroke();
  },
  
  hLine: function (y, x1, x2) {
    this.drawLine(x1, y, x2, y);
  }
});
