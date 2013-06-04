Genoverse.Track.Scalebar = Genoverse.Track.extend({
  height        : 20,
  featureHeight : 3,
  spacing       : 0,
  color         : '#000000',
  autoHeight    : false,
  unsortable    : true,
  labels        : true,
  bump          : false,
  fixedHeight   : true,
  order         : 0,
  orderReverse  : 1e5,
  featureStrand : 1,
  controls      : 'off',
  colors        : {
    majorGuideLine : '#CCCCCC',
    minorGuideLine : '#E5E5E5'
  },
  
  reset: function () {
    this.scrollContainer.children('.image_container').remove();
    this.init();
  },
  
  setScale: function () {
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

    this.dataRegion   = { start: 9e99, end: -9e99 };
    this.minorUnit    = minorUnit;
    this.majorUnit    = majorUnit;
    this.seen         = {};
    this.features     = new RTree();
    this.featuresById = {};
    
    this.base();
  },
  
  makeImage: function (params) {
    params.background    = 'guidelines fullHeight';
    params.featureHeight = this.height;
    
    this.setFeatures(params.start, params.end);
    
    var rtn = this.base(params);
    
    params.container.addClass('fullHeight');
    
    return rtn;
  },
  
  makeReverseImage: function (params) {
    this.imgContainers.push(params.container.clone().html(params.container.children('.data').clone(true).css('background', '#FFF'))[0]);
    this.scrollContainer.append(this.imgContainers);
  },
  
  setFeatures: function (start, end) {
    start = Math.max(start - (start % this.minorUnit) - this.majorUnit, 0);
    
    var flip  = (start / this.minorUnit) % 2 ? 1 : -1;
    var feature, major, label;
    
    for (var x = start; x < end + this.minorUnit; x += this.minorUnit) {
      flip *= -1;
      
      if (this.seen[x]) {
        continue;
      }
      
      this.seen[x] = 1;
      
      feature = { id: x, strand: 1, sort: x };
      major   = x && !(x % this.majorUnit);
      
      if (flip === 1) {
        feature.start = x;
        feature.end   = x + this.minorUnit - 1;
      }
      
      if (major) {
        label = this.formatLabel(x);
        
        if (label !== this.lastLabel) {
          feature.label = label;
          
          if (!feature.end) {
            feature.start = x;
            feature.end   = x - 1;
          }
        }
        
        this.lastLabel = label;
      }
      
      if (feature.end) {
        this.insertFeature(feature);
      }
    }
  },
  
  draw: function (features, featureContext, labelContext, scale) {
    var i     = features.length;
    var width = Math.ceil(this.minorUnit * this.scale);
    var feature, start;
    
    featureContext.textBaseline = 'top';
    featureContext.fillStyle    = this.color;
    
    this.guideLines = { major: {} }; // FIXME: pass params to draw, rather than scale. set guideLines on params
    
    while (i--) {
      feature = features[i];
      start   = Math.round(feature.position[scale].X);
      
      this.drawFeature($.extend({}, feature, {
        x      : start,
        y      : 0,
        width  : Math.ceil(feature.position[scale].width),
        height : this.featureHeight
      }), featureContext, labelContext, scale);
      
      if (feature.label) {
        if (start > -1) {
          featureContext.fillRect(start, this.featureHeight, 1, this.featureHeight);
        }
        
        this.guideLines.major[feature.start] = true;
      }
      
      this.guideLines[feature.start] = start;
      this.guideLines[feature.start + this.minorUnit] = start + width - 1;
    }
    
    featureContext.fillRect(0, 0, featureContext.canvas.width, 1);
    featureContext.fillRect(0, this.featureHeight, featureContext.canvas.width, 1);
  },
  
  // Draw guidelines
  drawBackground: function (f, context) {
    for (var i in this.guideLines) {
      if (this.guideLines[i] >= 0 && this.guideLines[i] <= this.width) {
        context.fillStyle = this.colors[this.guideLines.major[i] ? 'majorGuideLine' : 'minorGuideLine' ];
        context.fillRect(this.guideLines[i], 0, 1, context.canvas.height);
      }
    }
  },

  afterRenderBackground: function (f, bgImage) {
    bgImage.height(this.browser.wrapper.outerHeight(true));
  }
});

Genoverse.Track.on('afterInit afterResize', function () {
  $('.bg.fullHeight', this.browser.container).height(this.browser.wrapper.outerHeight(true));
});