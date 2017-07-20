Genoverse.Track.Scalebar = Genoverse.Track.extend({
  unsortable     : true,
  fixedOrder     : true,
  order          : 0,
  orderReverse   : 1e5,
  featureStrand  : 1,
  controls       : 'off',
  height         : 20,
  featureHeight  : 3,
  featureMargin  : { top: 0, right: 0, bottom: 2, left: 0 },
  margin         : 0,
  minPixPerMajor : 100, // Least number of pixels per written number
  color          : '#000000',
  autoHeight     : false,
  labels         : true,
  bump           : false,
  resizable      : false,
  click          : $.noop,
  colors         : {
    majorGuideLine : '#CCCCCC',
    minorGuideLine : '#E5E5E5'
  },

  setEvents: function () {
    var browser = this.browser;

    function resize() {
      $('.gv-bg.gv-full-height', browser.container).height(function () {
        return browser.wrapper.outerHeight(true) - $(this).parents('.gv-track-container').position().top;
      });
    }

    browser.on('afterAddTracks', resize);
    browser.on('afterResize', this, resize);
  },

  setScale: function () {
    var max       = this.prop('width') / this.prop('minPixPerMajor');
    var divisor   = 5;
    var majorUnit = -1;
    var fromDigit = ('' + this.browser.start).split(''); // Split into array of digits
    var toDigit   = ('' + this.browser.end).split('');
    var features  = {};
    var divisions, i;

    for (i = fromDigit.length; i < toDigit.length; i++) {
      fromDigit.unshift('0');
    }

    for (i = toDigit.length; i < fromDigit.length; i++) {
      toDigit.unshift('0');
    }

    // How many divisions would there be if we only kept i digits?
    for (i = 0; i < fromDigit.length; i++) {
      divisions = parseInt(toDigit.slice(0, fromDigit.length - i).join(''), 10) - parseInt(fromDigit.slice(0, fromDigit.length - i).join(''), 10);

      if (divisions && divisions <= max) {
        majorUnit = parseInt('1' + $.map(new Array(i), function () { return '0'; }).join(''), 10);
        break;
      }
    }

    if (majorUnit === -1) {
      majorUnit = this.browser.length === 1 ? 1 : parseInt('1' + $.map(new Array(fromDigit.length), function () { return '0'; }).join(''), 10);
      divisor   = 1;
    } else {
      // Improve things by trying simple multiples of 1<n zeroes>.
      // (eg if 100 will fit will 200, 400, 500).
      if (divisions * 5 <= max) {
        majorUnit /= 5;
        divisor    = 2;
      } else if (divisions * 4 <= max) {
        majorUnit /= 4;
        divisor    = 1;
      } else if (divisions * 2 <= max) {
        majorUnit /= 2;
      }
    }

    majorUnit = Math.max(majorUnit, 1);

    features[this.browser.chr] = new RTree();

    this.prop('minorUnit',     Math.max(majorUnit / divisor, 1));
    this.prop('majorUnit',     majorUnit);
    this.prop('featuresByChr', features);
    this.prop('featuresById',  {});
    this.prop('seen',          {});

    this.base();
  },

  setFeatures: function (chr, start, end) {
    var minorUnit = this.prop('minorUnit');
    var majorUnit = this.prop('majorUnit');
    var seen      = this.prop('seen');

    start = Math.max(start - (start % minorUnit) - majorUnit, 0);

    var flip = (start / minorUnit) % 2 ? 1 : -1;
    var feature, major, label;

    for (var x = start; x < end + minorUnit; x += minorUnit) {
      flip *= -1;

      if (seen[x]) {
        continue;
      }

      seen[x] = 1;

      feature = { id: chr + ':' + x, chr: chr, strand: 1, sort: x };
      major   = x && x % majorUnit === 0;

      if (flip === 1) {
        feature.start = x;
        feature.end   = x + minorUnit - 1;
      }

      if (major) {
        label = this.view.formatLabel(x);

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
        this.model.insertFeature(feature);
      }
    }
  },

  makeFirstImage: function (moveTo) {
    if (this.prop('strand') === -1) {
      moveTo = this.track.forwardTrack.prop('scrollStart');
    }

    return this.base(moveTo);
  },

  makeImage: function (params) {
    params.background    = 'gv-guidelines gv-full-height';
    params.featureHeight = this.prop('height');

    this.track.setFeatures(params.chr, params.start, params.end);

    var rtn = this.base(params);

    params.container.addClass('gv-full-height');

    return rtn;
  },

  makeReverseImage: function (params) {
    this.imgContainers.push(params.container.clone().html(params.container.children('.gv-data').clone(true).css({ opacity: 1, background: this.browser.wrapper.css('backgroundColor') }))[0]);
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
    var feature, start, end;

    featureContext.textBaseline = 'top';
    featureContext.fillStyle    = this.color;

    this.guideLines = { major: {} }; // FIXME: pass params to draw, rather than scale. set guideLines on params

    while (i--) {
      feature = features[i];
      start   = Math.round(feature.position[scale].X);
      end     = start + width - 1;

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

      // Fiddle the location so that these [additional major] lines overlap with normal lines
      if (feature.end < feature.start) {
        start--;
        end++;
      }

      this.guideLines[feature.start]             = start;
      this.guideLines[feature.start + minorUnit] = end;
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
