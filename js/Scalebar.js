CBrowse.Track.Scalebar = CBrowse.Track.extend({
  config: {
    height        : 20,
    featureHeight : 3,
    color         : '#000000',
    bumpSpacing   : 1,
    autoHeight    : false
  },
  
  constructor: function (config) {
    this.scaleLines  = true;
    this.forceLabels = true;
    this.labelUnits  = [ 'bp', 'Kb', 'Mb', 'Gb', 'Tb' ];
    this.bump        = false;
    this.fixedHeight = true;
    this.spacing     = 0;
    
    this.base(config);
    
    if (this.type === 'Scalebar') {
      this.cBrowse.labelContainer.css('top', this.height);
    }
  },
  
  reset: function () {
    this.init();
    this.container.empty();
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
    
    if (this.scaleLines) {
      this.cBrowse.scaleLines = { major: {}, minor: {} };
    }
  },
  
  setFeatures: function (start, end) {
    start  = Math.max(start - (start % this.minorUnit), 0);
    
    var flip     = (start / this.minorUnit) % 2 ? 1 : -1;
    var features = [];
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
        feature.start = x;
        feature.end   = x + this.minorUnit;
        feature.color = this.color;
      }
      
      if (major) {
        feature.label      = this.formatLabel(x);
        feature.labelColor = this.color;
        
        if (!feature.end) {
          feature.start = x;
          feature.end   = x;
          feature.color = this.color;
        }
      }
      
      if (feature.end) {
        features.push(feature);
      }
      
      if (this.scaleLines) {
        this.cBrowse.scaleLines[major ? 'major' : 'minor'][x] = Math.round(x * this.scale);
      }
    }
    
    this.base({ features: features });
  },
  
  positionData: function (data, edges) {
    var data = this.base(data, edges);
    this.data = data.fill[this.color];
    return data;
  },
  
  makeImage: function () {
    this.setFeatures.apply(this, arguments);
    return this.base.apply(this, arguments);
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
  
  drawBackgroundColor: function (scaledStart, height) {
    this.context.fillStyle = this.cBrowse.colors.background;
    this.context.fillRect(0, 0, this.width, height);
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

CBrowse.Track.ScalebarBottom = CBrowse.Track.Scalebar.extend({
  constructor: function (config) {
    this.base($.extend(config, { scaleLines: false }));
  },
  
  drawBackground: $.noop
});