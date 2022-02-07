import Base          from 'basejs';
import RTree         from 'rtree';
import wrapFunctions from 'js/wrap-functions';

export default Base.extend({
  fontHeight       : 10,
  fontFamily       : 'sans-serif',
  fontWeight       : 'normal',
  fontColor        : undefined, // label color defaults to this, or feature color, or track.color (below), in that order of precedence
  color            : '#000000',
  minScaledWidth   : 0.5,
  precisionFactor  : 0, // Rounding factor to be applied to feature start/width when drawing, e.g. 2 = starts and widths will be rounded to the nearest 0.5
  widthCorrection  : 1, // Pixels to add to the end of a feature when scale > 1 - ensures that 1bp features are always at least 1px wide
  labels           : true,
  repeatLabels     : false,
  bump             : false,
  alwaysReposition : false,
  depth            : undefined,
  featureHeight    : undefined, // defaults to track height
  featureMargin    : undefined, // e.g. { top: 3, right: 1, bottom: 1, left: 0 }

  subFeatureJoinStyle     : false, // Can be 'line', 'peak', 'curve'
  subFeatureJoinLineWidth : 0.5,

  constructor: function (properties) {
    $.extend(this, properties);
    wrapFunctions(this, 'View');
    this.init();
  },

  // difference between init and constructor: init gets called on reset, if reset is implemented
  init: function () {
    this.setDefaults();
    this.scaleSettings = {};
  },

  setDefaults: function () {
    this.featureMargin = this.featureMargin || { top: 3, right: 1, bottom: 1, left: 0 };

    var margin = [ 'top', 'right', 'bottom', 'left' ];

    for (var i = 0; i < margin.length; i++) {
      if (typeof this.featureMargin[margin[i]] !== 'number') {
        this.featureMargin[margin[i]] = 0;
      }
    }

    this.context       = $('<canvas>')[0].getContext('2d');
    this.featureHeight = typeof this.featureHeight !== 'undefined' ? this.featureHeight : this.prop('defaultHeight');
    this.font          = this.fontWeight + ' ' + this.fontHeight + 'px ' + this.fontFamily;
    this.labelUnits    = [ 'bp', 'kb', 'Mb', 'Gb', 'Tb' ];

    this.context.font = this.font;

    if (this.labels && this.labels !== 'overlay' && (this.depth || this.bump === 'labels')) {
      this.labels = 'separate';
    }
  },

  setScaleSettings: function (scale) {
    var chr = this.browser.chr;

    if (!this.scaleSettings[chr]) {
      this.scaleSettings[chr] = {};
    }

    if (!this.scaleSettings[chr][scale]) {
      var featurePositions = new RTree();

      this.scaleSettings[chr][scale] = {
        imgContainers    : $(),
        featurePositions : featurePositions,
        labelPositions   : this.labels === 'separate' ? new RTree() : featurePositions
      };
    }

    return this.scaleSettings[chr][scale];
  },

  roundPixelValue: function (value) {
    if (this.precisionFactor) {
      return Math.round(value * this.precisionFactor) / this.precisionFactor;
    }

    return value;
  },

  scaleFeatures: function (features, scale) {
    var add = this.roundPixelValue(Math.max(scale, this.widthCorrection));
    var feature, j;

    for (var i = 0; i < features.length; i++) {
      feature = features[i];

      if (!feature.position) {
        feature.position = {};
      }

      if (!feature.position[scale]) {
        feature.position[scale] = {
          start  : this.roundPixelValue(feature.start * scale),
          width  : Math.max(this.roundPixelValue((feature.end - feature.start) * scale + add), this.minScaledWidth),
          height : feature.height || this.featureHeight
        };
      }

      if (feature.subFeatures) {
        for (j = 0; j < feature.subFeatures.length; j++) {
          if (typeof feature.subFeatures[j].height === 'undefined') {
            feature.subFeatures[j].height = feature.position[scale].height;
          }
        }

        this.scaleFeatures(feature.subFeatures, scale);
      }
    }

    return features;
  },

  positionFeatures: function (features, params) {
    params.margin = this.prop('margin');

    for (var i = 0; i < features.length; i++) {
      this.positionFeature(features[i], params);
    }

    params.width         = Math.ceil(params.width);
    params.height        = Math.ceil(params.height);
    params.featureHeight = Math.max(Math.ceil(params.featureHeight), this.prop('resizable') ? Math.max(this.prop('height'), this.prop('minLabelHeight')) : 0);
    params.labelHeight   = Math.ceil(params.labelHeight);

    return features;
  },

  positionFeature: function (feature, params) {
    var scale         = params.scale;
    var scaleSettings = this.scaleSettings[feature.chr][scale];

    if (!scaleSettings) {
      return;
    }

    var subFeatures = feature.subFeatures || [];
    var i;

    feature.position[scale].X = feature.position[scale].start - params.scaledStart; // FIXME: always have to reposition for X, in case a feature appears in 2 images. Pass scaledStart around instead?

    for (i = 0; i < subFeatures.length; i++) {
      subFeatures[i].position[scale].x = subFeatures[i].position[scale].start - params.scaledStart;

      if (this.subFeatureJoinStyle) {
        subFeatures[i].position[scale].join   = subFeatures[i].position[scale].join || {};
        subFeatures[i].position[scale].join.x = subFeatures[i].position[scale].start + subFeatures[i].position[scale].width - params.scaledStart;
      }
    }

    if (this.alwaysReposition || !feature.position[scale].positioned) {
      feature.position[scale].H = feature.position[scale].height + this.featureMargin.bottom;
      feature.position[scale].W = feature.position[scale].width  + (feature.marginRight || this.featureMargin.right);
      feature.position[scale].Y = (
        typeof feature.position[scale].y === 'number' ? feature.position[scale].y :
          typeof feature.y               === 'number' ? feature.y * feature.position[scale].H : 0
      ) + (feature.marginTop || this.featureMargin.top);

      if (feature.label) {
        if (typeof feature.label === 'string') {
          feature.label = feature.label.split('\n');
        }

        var context = this.context;

        feature.labelHeight = feature.labelHeight || (this.fontHeight + 2) * feature.label.length;
        feature.labelWidth  = feature.labelWidth  || Math.max.apply(Math, $.map(feature.label, function (l) { return Math.ceil(context.measureText(l).width); })) + 1;

        if (this.labels === true) {
          feature.position[scale].H += feature.labelHeight;
          feature.position[scale].W  = Math.max(feature.labelWidth, feature.position[scale].W);
        } else if (this.labels === 'separate' && !feature.position[scale].label) {
          feature.position[scale].label = {
            x : feature.position[scale].start,
            y : feature.position[scale].Y,
            w : feature.labelWidth,
            h : feature.labelHeight
          };
        }
      }

      var bounds = {
        x : feature.position[scale].start,
        y : feature.position[scale].Y,
        w : feature.position[scale].W,
        h : feature.position[scale].H + (feature.marginTop || this.featureMargin.top)
      };

      feature.position[scale].bounds = bounds;

      if (this.bump === true) {
        this.bumpFeature(bounds, feature, scale, scaleSettings.featurePositions);
      }

      scaleSettings.featurePositions.insert(bounds, feature);

      feature.position[scale].bottom     = feature.position[scale].Y + bounds.h + params.margin;
      feature.position[scale].positioned = true;
    }

    var join = this.subFeatureJoinStyle && subFeatures.length ? {
      height : (Math.max.apply(Math, subFeatures.map(function (c) { return c.fake ? 0 : c.position[scale].height; })) / 2) * (feature.strand > 0 ? -1 : 1),
      y      : feature.position[scale].Y + feature.position[scale].height / 2
    } : false;

    for (i = 0; i < subFeatures.length; i++) {
      subFeatures[i].position[scale].y = feature.position[scale].Y + (feature.position[scale].height - subFeatures[i].position[scale].height) / 2;

      if (join && subFeatures[i + 1]) {
        $.extend(subFeatures[i].position[scale].join, { width: subFeatures[i + 1].position[scale].x - subFeatures[i].position[scale].join.x }, join);
      }
    }

    if (this.labels === 'separate' && feature.position[scale].label) {
      if (this.alwaysReposition || !feature.position[scale].label.positioned) {
        this.bumpFeature(feature.position[scale].label, feature, scale, scaleSettings.labelPositions);

        feature.position[scale].label.bottom     = feature.position[scale].label.y + feature.position[scale].label.h + params.margin;
        feature.position[scale].label.positioned = true;

        scaleSettings.labelPositions.insert(feature.position[scale].label, feature);
      }

      params.labelHeight = Math.max(params.labelHeight, feature.position[scale].label.bottom);
    }

    params.featureHeight = Math.max(params.featureHeight, feature.position[scale].bottom);
    params.height        = Math.max(params.height, params.featureHeight + params.labelHeight);
  },

  // FIXME: should label bumping bounds be distinct from feature bumping bounds when label is smaller than feature?
  bumpFeature: function (bounds, feature, scale, tree) {
    var depth         = 0;
    var scaleSettings = this.scaleSettings[feature.chr][scale];
    var labels        = tree === scaleSettings.labelPositions && tree !== scaleSettings.featurePositions;
    var bump, clash, searchResults, i;

    do {
      if (this.depth && ++depth >= this.depth) {
        if (!labels) {
          searchResults = scaleSettings.featurePositions.search(bounds);
          i             = searchResults.length;

          while (i--) {
            if (searchResults[i].position[scale].visible !== false) {
              feature.position[scale].visible = false;
              break;
            }
          }
        }

        break;
      }

      bump  = false;
      clash = tree.search(bounds)[0];

      if (clash && clash.id !== feature.id) {
        bounds.y = clash.position[scale][labels ? 'label' : 'bounds'].y + clash.position[scale][labels ? 'label' : 'bounds'].h;
        bump     = true;
      }
    } while (bump);

    if (!labels) {
      feature.position[scale].Y = bounds.y;
    }
  },

  draw: function (features, featureContext, labelContext, scale) {
    var feature, f;

    for (var i = 0; i < features.length; i++) {
      feature = features[i];

      if (feature.position[scale].visible !== false) {
        // TODO: extend with feature.position[scale], rationalize keys
        f = $.extend({}, feature, {
          x             : feature.position[scale].X,
          y             : feature.position[scale].Y,
          width         : feature.position[scale].width,
          height        : feature.position[scale].height,
          labelPosition : feature.position[scale].label
        });

        this.drawFeature(f, featureContext, labelContext, scale);

        if (f.legend !== feature.legend) {
          feature.legend      = f.legend;
          feature.legendColor = f.color;
        }
      }
    }
  },

  drawFeature: function (feature, featureContext, labelContext, scale) {
    if (feature.color !== false && !feature.color) {
      this.setFeatureColor(feature);
    }

    if (feature.subFeatures) {
      this.drawSubFeatures(feature, featureContext, labelContext, scale);
    } else {
      if (feature.x < 0 || feature.x + feature.width > this.width) {
        this.truncateForDrawing(feature);
      }

      if (feature.color !== false) {
        featureContext.fillStyle = feature.color;
        featureContext.fillRect(feature.x, feature.y, feature.width, feature.height);
      }

      if (feature.clear === true) {
        featureContext.clearRect(feature.x, feature.y, feature.width, feature.height);
      }

      if (feature.borderColor) {
        featureContext.strokeStyle = feature.borderColor;
        featureContext.strokeRect(feature.x, Math.floor(feature.y) + 0.5, feature.width, feature.height);
      }
    }

    if (this.labels && feature.label) {
      this.drawLabel(feature, labelContext, scale);
    }

    if (feature.decorations) {
      this.decorateFeature(feature, featureContext, scale);
    }
  },

  drawSubFeatures: function (feature, featureContext, labelContext, scale) {
    var clonedFeature = $.extend(true, {}, feature, { subFeatures: false, label: false });
    var subFeatures   = $.extend(true, [], feature.subFeatures);
    var joinColor     = feature.joinColor || feature.color;

    for (var i = 0; i < subFeatures.length; i++) {
      if (!subFeatures[i].fake) {
        this.drawFeature($.extend({}, clonedFeature, subFeatures[i].position[scale], subFeatures[i]), featureContext, labelContext, scale);
      }

      if (subFeatures[i].position[scale].join && subFeatures[i].position[scale].join.width > 0) {
        this.drawSubFeatureJoin($.extend({ color: joinColor }, subFeatures[i].position[scale].join), featureContext);
      }
    }
  },

  drawLabel: function (feature, context, scale) {
    var original = feature.untruncated;
    var width    = (original || feature).width;

    if (this.labels === 'overlay' && feature.labelWidth >= Math.floor(width)) {
      return;
    }

    if (feature.labelPosition) {
      context.labelPositions = context.labelPositions || new RTree();
    }

    if (typeof feature.label === 'string') {
      feature.label = [ feature.label ];
    }

    var x       = (original || feature).x;
    var n       = this.repeatLabels ? Math.ceil((width - Math.max(scale, 1) - (this.labels === 'overlay' ? feature.labelWidth : 0)) / this.width) || 1 : 1;
    var spacing = width / n;
    var label, start, j, y, currentY, h;

    if (this.repeatLabels && (scale > 1 || this.labels !== 'overlay')) { // Ensure there's always a label in each image
      spacing = this.browser.length * scale;
      n = Math.ceil(width / spacing);
    }

    if (!feature.labelColor) {
      this.setLabelColor(feature);
    }

    context.fillStyle = feature.labelColor;

    if (this.labels === 'overlay') {
      label = [ feature.label.join(' ') ];
      y     = feature.y + (feature.height + 1) / 2;
      h     = 0;
    } else {
      label = feature.label;
      y     = feature.labelPosition ? feature.labelPosition.y : feature.y + feature.height + this.featureMargin.bottom;
      h     = this.fontHeight + 2;
    }

    var i      = context.textAlign === 'center' ? 0.5 : 0;
    var offset = feature.labelWidth * i;

    if (n > 1) {
      i += Math.max(Math.floor(-(feature.labelWidth + x) / spacing), 0);
    }

    for (; i < n; i++) {
      start = x + (i * spacing);

      if (start + feature.labelWidth >= 0) {
        if ((start - offset > this.width) || (i >= 1 && start + feature.labelWidth > feature.position[scale].X + feature.position[scale].width)) {
          break;
        }

        for (j = 0; j < label.length; j++) {
          currentY = y + (j * h);

          if (context.labelPositions && context.labelPositions.search({ x: start, y: currentY, w: feature.labelWidth, h: h }).length) {
            feature.position[scale].label.visible = false;
            continue;
          }

          context.fillText(label[j], start, currentY);

          if (context.labelPositions) {
            context.labelPositions.insert({ x: start, y: currentY, w: feature.labelWidth, h: h }, label[j]);
          }
        }
      }
    }
  },

  setFeatureColor: function (feature) {
    feature.color = this.color;
  },

  setLabelColor: function (feature) {
    feature.labelColor = this.fontColor || feature.color || this.color;
  },

  // Method to lighten a color by an amount, adapted from https://stackoverflow.com/questions/5560248/programmatically-lighten-or-darken-a-hex-color-or-rgb-and-blend-colors
  shadeColor: function (color, percent) {
    var f = parseInt(color.slice(1), 16);
    var R = f >> 16;
    var G = (f >> 8) & 0x00FF;
    var B = f & 0x0000FF;

    return '#' + (
      0x1000000 +
      (Math.round((255 - R) * percent) + R) * 0x10000 +
      (Math.round((255 - G) * percent) + G) * 0x100 +
      (Math.round((255 - B) * percent) + B)
    ).toString(16).slice(1);
  },

  // truncate features - make the features start at 1px outside the canvas to ensure no lines are drawn at the borders incorrectly
  truncateForDrawing: function (feature) {
    var start = Math.min(Math.max(feature.x, -1), this.width + 1);
    var width = feature.x - start + feature.width;

    if (width + start > this.width) {
      width = this.width - start + 1;
    }

    feature.untruncated = { x: feature.x, width: feature.width };
    feature.x           = start;
    feature.width       = Math.max(width, 0);
  },

  drawSubFeatureJoin: function (join, context) {
    var coords = this.truncateSubFeatureJoinForDrawing(join);

    if (!coords) {
      return;
    }

    var lineWidth = context.lineWidth;

    context.strokeStyle = join.color;
    context.lineWidth   = this.subFeatureJoinLineWidth;

    context.beginPath();
    context.moveTo(coords.x1, coords.y1);

    switch (this.subFeatureJoinStyle) {
      case 'line':
        context.lineTo(coords.x3, coords.y1);
        break;
      case 'peak':
        context.lineTo(coords.x2, coords.y2);
        context.lineTo(coords.x3, coords.y3);
        break;
      case 'curve':
        context.quadraticCurveTo(coords.x2, coords.y2, coords.x3, coords.y3);
        break;
      default: break;
    }

    context.stroke();

    context.lineWidth = lineWidth;
  },

  truncateSubFeatureJoinForDrawing: function (coords) {
    var y1 = coords.y; // y coord of the ends of the line (half way down the exon box)
    var y3 = y1;

    if (this.subFeatureJoinStyle === 'line') {
      this.truncateForDrawing(coords);
      y1 += 0.5; // Sharpen line
    }

    var x1 = coords.x;                // x coord of the right edge of the first exon
    var x3 = coords.x + coords.width; // x coord of the left edge of the second exon

    // Skip if completely outside the image's region
    if (x3 < 0 || x1 > this.width) {
      return false;
    }

    var x2, y2, xMid, yScale;

    // Truncate the coordinates of the line being drawn, so it is inside the image's region
    if (this.subFeatureJoinStyle === 'peak') {
      xMid   = (x1 + x3) / 2;
      x2     = xMid;                     // x coord of the peak of the peak/curve
      y2     = coords.y + coords.height; // y coord of the peak of the peak/curve (level with the top (forward strand) or bottom (reverse strand) of the exon box)
      yScale = (y2 - y1) / (xMid - x1);  // Scale factor for recalculating coords if points lie outside the image region

      if (xMid < 0) {
        y2 = coords.y + (yScale * x3);
        x2 = 0;
      } else if (xMid > this.width) {
        y2 = coords.y + (yScale * (this.width - coords.x));
        x2 = this.width;
      }

      if (x1 < 0) {
        y1 = xMid < 0 ? y2 : coords.y - (yScale * coords.x);
        x1 = 0;
      }

      if (x3 > this.width) {
        y3 = xMid > this.width ? y2 : y2 - (yScale * (this.width - x2));
        x3 = this.width;
      }
    } else if (this.subFeatureJoinStyle === 'curve') {
      // TODO: try truncating when style is curve
      x2 = coords.x + coords.width / 2;
      y2 = coords.y + coords.height;
    }

    return {
      x1 : x1,
      y1 : y1,
      x2 : x2,
      y2 : y2,
      x3 : x3,
      y3 : y3
    };
  },

  formatLabel: function (label) {
    var power = Math.floor((label.toString().length - 1) / 3);
    var unit  = this.labelUnits[power];

    label /= Math.pow(10, power * 3);

    return Math.floor(label) + (unit === 'bp' ? '' : '.' + (label.toString().split('.')[1] || '').concat('00').substring(0, 2)) + ' ' + unit;
  },

  drawBackground  : $.noop,
  decorateFeature : $.noop // decoration for the features
});
