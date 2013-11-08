Genoverse.Track.Scalebar = Genoverse.Track.extend({
  unsortable    : true,
  order         : 1,
  orderReverse  : 1e5,
  featureStrand : 1,
  controls      : 'off',
  height        : 20,
  featureHeight : 3,
  featureMargin : { top: 0, right: 0, bottom: 2, left: 0 },
  margin        : 0,
  color         : '#000000',
  autoHeight    : false,
  labels        : true,
  bump          : false,
  resizable     : false,
  colors        : {
    majorGuideLine : '#CCCCCC',
    minorGuideLine : '#E5E5E5'
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
    
    this.prop('minorUnit',    minorUnit);
    this.prop('majorUnit',    majorUnit);
    this.prop('features',     new RTree());
    this.prop('featuresById', {});
    this.prop('seen',         {});
    
    this.base();
  },
  
  setFeatures: function (start, end) {
    var minorUnit = this.prop('minorUnit');
    var majorUnit = this.prop('majorUnit');
    var seen      = this.prop('seen');
    
    start = Math.max(start - (start % minorUnit) - majorUnit, 0);
    
    var flip  = (start / minorUnit) % 2 ? 1 : -1;
    var feature, major, label;
    
    for (var x = start; x < end + minorUnit; x += minorUnit) {
      flip *= -1;
      
      if (seen[x]) {
        continue;
      }
      
      seen[x] = 1;
      
      feature = { id: x, strand: 1, sort: x };
      major   = x && x % majorUnit === 0;
      
      if (flip === 1) {
        feature.start = x;
        feature.end   = x + minorUnit - 1;
      }
      
      if (major) {
        label = this.track.view.formatLabel(x);
        
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
  
  makeFirstImage: function (moveTo) {
    if (this.prop('strand') === -1) {
      moveTo = this.track.forwardTrack.scrollStart;
    }
    
    return this.base(moveTo);
  },
  
  makeImage: function (params) {
    params.background    = 'guidelines fullHeight';
    params.featureHeight = this.prop('height');
    
    this.track.setFeatures.apply(this.track.model, [ params.start, params.end ]);
    
    var rtn = this.base(params);
    
    params.container.addClass('fullHeight');
    
    return rtn;
  },
  
  makeReverseImage: function (params) {
    this.imgContainers.push(params.container.clone().html(params.container.children('.data').clone(true).css('background', '#FFF'))[0]);
    this.scrollContainer.append(this.imgContainers);
  },
  
  renderBackground: function (f, bgImage) {
    this.base(f, bgImage);
    bgImage.height(this.browser.wrapper.outerHeight(true));
  },
  
  draw: function (features, featureContext, labelContext, scale) {
    var i         = features.length;
    var minorUnit = this.prop('minorUnit');
    var width     = Math.ceil(minorUnit * scale);
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
      this.guideLines[feature.start + minorUnit] = start + width - 1;
    }
    
    featureContext.fillRect(0, 0, featureContext.canvas.width, 1);
    featureContext.fillRect(0, this.featureHeight, featureContext.canvas.width, 1);
  },
  
  // Draw guidelines
  drawBackground: function (f, context) {
    for (var i in this.guideLines) {
      if (this.guideLines[i] >= 0 && this.guideLines[i] <= this.width) {
        context.fillStyle = this.track.colors[this.guideLines.major[i] ? 'majorGuideLine' : 'minorGuideLine' ];
        context.fillRect(this.guideLines[i], 0, 1, context.canvas.height);
      }
    }
  },
  
  formatLabel: function (label) {
    return this.prop('minorUnit') < 1000 ? label.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,') : this.base(label);
  }
});

Genoverse.Track.on('afterResize', function () {
  $('.bg.fullHeight', this.browser.container).height(this.browser.wrapper.outerHeight(true));
});

Genoverse.on('afterAddTracks', function () {
  $('.bg.fullHeight', this.container).height(this.wrapper.outerHeight(true));
});