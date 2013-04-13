Genoverse.Track.Scalebar = Genoverse.Track.extend({

  height        : 20,
  featureHeight : 6,
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
  guideLines    : {},
  guideLinesByScale : {},
  //inherit       : [ 'Stranded' ],
  colors           : {
    background     : '#FFFFFF',
    majorGuideLine : '#CCCCCC',
    minorGuideLine : '#E5E5E5',
    sortHandle     : '#CFD4E7'
  },


  addDomElements: function () {
    this.base();
    this.container.css({ overflow: 'visible' });
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

    this.dataRegion = { start: 9e99, end: -9e99 };
    
    this.minorUnit = minorUnit;
    this.majorUnit = majorUnit;
    this.seen      = {};
    this.features  = new RTree();
    this.featuresById = {};

    if (!this.guideLinesByScale[this.scale]) {
      this.guideLinesByScale[this.scale] = { major: {}, minor: {} };
    }
    
    this.guideLines = this.guideLinesByScale[this.scale];
    this.base();
  },


  makeImage: function (params) {

    // TODO: check params
    params.scaledStart = params.start*params.scale;
    params.height      = this.height || 0;
    params.width       = this.width;

    var cls     = ("scale_" + params.scale).replace('.','_');
    var div     = this.imgContainer.clone().width(this.width).addClass(cls).css('left', params.left);      
    var bgImage = $('<img class="bg guidelines" />')
                    .width(this.width)
                    .height(this.browser.wrapper.outerHeight(true))
                    .data(params)
                    .prependTo(div);
    var image   = $('<img class="data" />').data(params).appendTo(div);

    this.imgContainers.push(div[0]);
    this.scrollContainer.append(this.imgContainers);

    this.setGuideLines(params.start, params.end);

    this.render(this.findFeatures(params.start, params.end), image);
    this.renderBackground(bgImage);
  },


  setGuideLines: function (start, end) {
    var start = Math.max(start - (start % this.minorUnit) - this.majorUnit, 0);
    
    var flip     = (start / this.minorUnit) % 2 ? 1 : -1;
    var features = [];
    var feature, major, label;
    for (var x = start; x < end + this.minorUnit; x += this.minorUnit) {
      flip *= -1;
      
      if (this.seen[x]) {
        continue;
      }
      
      this.seen[x] = 1;
      
      feature = { id: x, start: x, strand: 1 };
      major   = x && !(x % this.majorUnit);
      
      if (flip === 1) {
        feature.end = x + this.minorUnit - 1;
      } else {
        feature.end = x;
      }
      
      if (major) {
        feature.major = true;
        feature.label = this.formatLabel(x);
      }

      this.insertFeature(feature);
      features.push(feature);
      this.guideLines[major ? 'major' : 'minor'][x] = Math.round(x * this.scale);
    }

    return features;
  },


  draw: function (features, context, scale) {
    var i = features.length;
    context.textBaseline = 'top';

    while (i--) {
      var feature = features[i];
      context.fillRect(Math.round(feature.position[scale].X), 0, Math.ceil(feature.position[scale].width), this.featureHeight/2);
      if (feature.major) {
        context.fillRect(Math.round(feature.position[scale].X), 0, 1, this.featureHeight);
        context.fillText(feature.label, feature.position[scale].X, this.featureHeight);
      }
    }
    
    context.fillRect(0, 0, context.canvas.width, 1);
    context.fillRect(0, this.featureHeight/2, context.canvas.width, 1);
  },


  drawBackground: function (data, context) {
    // Draw background color
    // context.fillStyle = this.background || this.browser.colors.background;
    // context.fillRect(0, 0, context.canvas.width, 1);

    // Draw guidelines
    var guideLines  = { major: [ this.colors.majorGuideLine, this.majorUnit ], minor: [ this.colors.minorGuideLine, this.minorUnit ] };
    var scaledStart = Math.round(data.scaledStart);
    var x;
    
    for (var c in guideLines) {
      context.fillStyle = guideLines[c][0];
      
      for (x = Math.max(data.start - (data.start % guideLines[c][1]), 0); x < data.end + this.minorUnit; x += guideLines[c][1]) {
        context.fillRect((this.guideLines[c][x] || 0) - scaledStart, 0, 1, context.canvas.height);
      }
    }
  },


});


Genoverse.Track.on('afterInit afterResize', function () {
  var height = 0;
  for (var i=0; i<this.browser.tracks.length; i++) {
    height += this.browser.tracks[i].height || 0;
  }

  $('.guidelines', this.browser.container).height(Math.max(height, this.browser.wrapper.outerHeight(true)));
});