Genoverse.Track.Scalebar = Genoverse.Track.extend({

  height        : 20,
  featureHeight : 3,
  spacing       : 0,
  color         : '#000000',
  autoHeight    : false,
  unsortable    : true,
  forceLabels   : true,
  bump          : false,
  fixedHeight   : true,
  order         : 0,
  orderReverse  : 1e5,
  featureStrand : 1,
  inherit       : [ 'Stranded' ],
  
  reset: function () {
    this.container.children('.image_container').remove();
    this.init();
  },
  
  setScale: function () {
    this.base();
    
    var length = this.browser.length;
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
    
    this.minorUnit  = this.browser.minorUnit = minorUnit;
    this.majorUnit  = this.browser.majorUnit = majorUnit;
    this.seen       = {};
    this.features   = new RTree();
    this.featureIds = {};
    
    if (this.strand === 1) {
      if (!this.browser.guideLinesByScale) {
        this.browser.guideLinesByScale = {};
      }
      
      if (!this.browser.guideLinesByScale[this.scale]) {
        this.browser.guideLinesByScale[this.scale] = { major: {}, minor: {} };
      }
      
      this.browser.guideLines = this.browser.guideLinesByScale[this.scale];
    }
  },
  
  setFeatures: function (start, end) {
    start = Math.max(start - (start % this.minorUnit) - this.majorUnit, 0);
    
    var flip     = (start / this.minorUnit) % 2 ? 1 : -1;
    var features = [];
    var feature, major, label;
    
    for (var x = start; x < end + this.minorUnit; x += this.minorUnit) {
      flip *= -1;
      
      if (this.seen[x]) {
        continue;
      }
      
      this.seen[x] = 1;
      
      feature = { id: x, strand: 1 };
      major   = x && !(x % this.majorUnit);
      
      if (flip === 1) {
        feature.start = x;
        feature.end   = x + this.minorUnit - 1;
        feature.color = this.color;
      }
      
      if (major) {
        label = this.formatLabel(x);
        
        if (label !== this.lastLabel) {
          feature.label      = label;
          feature.labelColor = this.color;
          
          if (!feature.end) {
            feature.start = x;
            feature.end   = x;
            feature.color = this.browser.colors.background;
          }
        }
        
        this.lastLabel = label;
      }
      
      if (feature.end) {
        features.push(feature);
      }
      
      if (this.strand === 1) {
        this.browser.guideLines[major ? 'major' : 'minor'][x] = Math.round(x * this.scale);
      }
    }
    
    return this.parseFeatures({ features: features });
  },
  
  positionFeatures: function (features, startOffset, imageWidth) {
    var features = this.base(features, startOffset, imageWidth);
    
    this.labels = $.grep(features.fill[this.color], function (f) { return f[0] === 'fillText'; });
    
    if (features.fill[this.browser.colors.background]) {
      this.colorOrder = [ this.color, this.browser.colors.background ];
    }
    
    return features;
  },
  
  makeReverseImage: function (start, end, width, moved, cls, img) {
    var div      = this.imgContainer.clone().width(width).addClass(cls).css('left', img.container.position().left).data('img', img);
    var deferred = $.Deferred();
    
    this.imgContainers[moved < 0 ? 'unshift' : 'push'](div[0]);
    this.container.append(this.imgContainers);
    
    img.track     = this;
    img.container = div;
    
    img.images.clone().appendTo(div).load(function (e) { deferred.resolve({ target: e.target, img: img }); }).data('deferred', deferred);
    
    div = null;
    
    return deferred;
  },
  
  getData: function (image, deferred) {
    this.setFeatures(image.start, image.end);
    this.base(image, deferred);
  },
  
  afterDraw: function (image) {
    var i = this.labels.length;
    
    while (i--) {
      this.context.fillRect(Math.round(this.labels[i][1][1]), this.featureHeight, 1, 3);
    }
    
    this.context.fillRect(0, 0,                  image.width, 1);
    this.context.fillRect(0, this.featureHeight, image.width, 1);
  },
  
  drawBackground: function () {
    return this.strand === 1 ? this.base.apply(this, arguments) : false;
  },
  
  drawBackgroundColor: function (image, height) {
    this.context.fillStyle = this.browser.colors.background;
    this.context.fillRect(0, 0, this.width, height);
  }
});