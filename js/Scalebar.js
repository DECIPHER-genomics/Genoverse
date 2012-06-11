CBrowse.Track.Scalebar = CBrowse.Track.extend({
  config: {
    height        : 20,
    featureHeight : 3,
    color         : '#000000',
    autoHeight    : false,
    unsortable    : true,
    order         : 1
  },
  
  constructor: function (config) {
    this.guideLines  = true;
    this.forceLabels = true;
    this.bump        = false;
    this.fixedHeight = true;
    this.spacing     = 0;
    
    this.base(config);
    
    if (this.type === 'Scalebar') {
      this.cBrowse.tracks.push({ type: 'ScalebarBottom' });
    }
  },
  
  reset: function () {
    this.container.children('.image_container').remove();
    this.init();
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
      if (!this.cBrowse.guideLinesByScale) {
        this.cBrowse.guideLinesByScale = {};
      }
      
      if (!this.cBrowse.guideLinesByScale[this.scale]) {
        this.cBrowse.guideLinesByScale[this.scale] = { major: {}, minor: {} };
      }
      
      this.cBrowse.guideLines = this.cBrowse.guideLinesByScale[this.scale];
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
      
      feature = { id: x };
      major   = x && !(x % this.majorUnit);
      
      if (flip === 1) {
        feature.start = x;
        feature.end   = x + this.minorUnit;
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
            feature.color = this.color;
          }
        }
        
        this.lastLabel = label;
      }
      
      if (feature.end) {
        features.push(feature);
      }
      
      if (this.guideLines) {
        this.cBrowse.guideLines[major ? 'major' : 'minor'][x] = Math.round(x * this.scale);
      }
    }
    
    return this.parseFeatures({ features: features });
  },
  
  positionFeatures: function (features, startOffset, imageWidth) {
    var features = this.base(features, startOffset, imageWidth);
    this.data = features.fill[this.color];
    return features;
  },
  
  makeImage: function (start, end, width, moved, cls) {
    var deferred    = $.Deferred();
    var bottomTrack = this.bottomTrack;
    
    this.setFeatures(start, end);
    
    $.when(this.base(start, end, width, moved, cls)).done(function (dfd) {
      $.when(bottomTrack._makeImage($.extend(true, {}, dfd.img), width, moved, cls)).done(function (dfd2) {
        deferred.resolve({ target: [ dfd.target, dfd2.target ], img: [ dfd.img, dfd2.img ] });
      });
    });
    
    return deferred;
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
  
  drawBackgroundColor: function (image, height) {
    this.context.fillStyle = this.cBrowse.colors.background;
    this.context.fillRect(0, 0, this.width, height);
  }
});

CBrowse.Track.ScalebarBottom = CBrowse.Track.Scalebar.extend({
  constructor: function (config) {
    this.base($.extend(config, { guideLines: false, order: 1e5 }));
    $.grep(this.cBrowse.tracks, function (t) { return t.type === 'Scalebar'; })[0].bottomTrack = this;
  },
  
  _makeImage: function (img, width, moved, cls) {
    var dir      = moved < 0 ? 'right' : 'left';
    var div      = this.imgContainer.clone().width(width).addClass(cls).css(dir, this.offsets[dir]).data('img', img);
    var deferred = $.Deferred();
    
    this.imgContainers[moved < 0 ? 'unshift' : 'push'](div[0]);
    this.container.append(this.imgContainers);
    
    this.offsets[dir] += width;
    
    img.track     = this;
    img.container = div;
    
    img.images.clone().appendTo(div).load(function (e) { deferred.resolve({ target: e.target, img: img }); }).data('deferred', deferred);
    
    return deferred;
  },
  
  makeImage      : $.noop,
  drawBackground : $.noop
});