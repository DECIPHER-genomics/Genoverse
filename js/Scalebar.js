CBrowse.Track.Scalebar = CBrowse.Track.Block.extend({
  defaults: {
    height        : 20,
    featureHeight : 3,
    labelY        : 15,
    color         : '#000000',
    guideLines    : true,
    bump          : false,
    forceLabels   : true,
    labelUnits    : [ 'bp', 'Kb', 'Mb', 'Gb', 'Tb' ]
  },
  
  setScale: function () {
    this.base();
    
    var length = this.cBrowse.length;
    var majorUnit, minorUnit, exponent, mantissa;
    
    if (length <= 51) {
      majorUnit = 10;
      minorUnit = 1;
    } else {
      exponent = Math.pow(10, Math.floor(Math.log(length) / Math.log(10)));
      mantissa = length / exponent;
      
      if (mantissa < 1.2) {
        majorUnit = exponent  / 10;
        minorUnit = majorUnit / 5;
      } else if (mantissa < 2.5) {
        majorUnit = exponent  / 5;
        minorUnit = majorUnit / 4;
      } else if (mantissa < 5) {
        majorUnit = exponent  / 2;
        minorUnit = majorUnit / 5;
      } else {
        majorUnit = exponent;
        minorUnit = majorUnit / 5;
      }
    }
    
    this.minorUnit = this.cBrowse.minorUnit = minorUnit;
    this.majorUnit = this.cBrowse.majorUnit = majorUnit;
    this.seen      = {};
    this.features  = new RTree();
    
    if (this.guideLines) {
      this.cBrowse.guideLines = { major: {}, minor: {} };
    }
  },
  
  setFeatures: function (start, end) {
    start  = Math.max(start - (start % this.minorUnit), 0);
    
    var flip = (start / this.minorUnit) % 2 ? 1 : -1;
    var data = [];
    var feature, major;
    
    for (var x = start; x < end + this.minorUnit; x += this.minorUnit) {
      flip *= -1;
      
      if (this.seen[x]) {
        continue;
      }
      
      this.seen[x] = 1;
      
      feature = { id: x };
      major   = x && !(x % this.majorUnit);
      
      if (flip === 1) {
        feature.start  = x;
        feature.end    = x + this.minorUnit;
        feature.colour = this.color;
      }
      
      if (major) {
        feature.label = this.formatLabel(x);
        
        if (!feature.end) {
          feature.start  = x;
          feature.end    = x;
          feature.colour = this.color;
        }
      }
      
      if (feature.end) {
        data.push(feature);
      }
      
      if (this.guideLines !== false) {
        this.cBrowse.guideLines[major ? 'major' : 'minor'][x] = Math.round(x * this.scale);
      }
    }
    
    this.base(data);
  },
  
  positionData: function (data, edges, func) {
    var data = this.base(data, edges, func);
    this.data = data[this.color];
    return data;
  },
  
  makeImage: function (start, end, width, moved) {
    this.setFeatures(start, end);
    return this.base(start, end, width, moved);
  },
  
  afterDraw: function (image) {
    var i = this.data.length;
    
    while (i--) {
      if (this.data[i][0] === 'fillText') {
        this.context.fillRect(Math.round(this.data[i][1][1]), this.featureHeight, 1, 3);
      }
    }
    
    this.context.fillRect(0, 0,                  image.width, 1);
    this.context.fillRect(0, this.featureHeight, image.width, 1);
  },
  
  formatLabel: function (x) {
    var str = x.toString();
    
    if (this.minorUnit < 1000) {
      return str.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
    } else {
      var power = Math.floor((str.length - 1) / 3);
      var unit  = this.labelUnits[power];
      
      x /= Math.pow(10, power * 3);
      
      return Math.floor(x) + (unit === 'bp' ? '' : '.' + (x.toString().split('.')[1] || '').concat('00').substring(0, 2)) + ' ' + unit;
    }
  }
});
