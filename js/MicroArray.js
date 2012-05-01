CBrowse.Track.MicroArray = CBrowse.Track.extend({
  config: {
    height        : 150,
    fixedHeight   : true,
    featureHeight : 2,
    color         : '#000000',
    bump          : false,
    autoHeight    : false,
    allData       : true
  },

  positionFeatures: function (features, startOffset) {
      var feature, start, end, x, y, width, bounds, bump, depth, j, k, labelStart, labelWidth, maxIndex;
      var showLabels   = this.forceLabels === true || !(this.maxLabelRegion && this.cBrowse.length > this.maxLabelRegion);
      var height       = 0;
      var labelsHeight = 0;
      var scale        = this.scale > 1 ? this.scale : 1;
      var scaleKey     = this.scale;
      var seen         = {};
      var draw         = { fill: {}, border: {}, label: {} };

      for (var i = 0; i < features.length; i++) {
        feature = features[i];
        
        if (seen[feature.id]) {
          continue;
        }
        
        seen[feature.id] = 1;
        
        start      = feature.scaledStart - startOffset;
        end        = feature.scaledEnd   - startOffset;
        bounds     = feature.bounds[scaleKey];
        labelStart = start;
        labelWidth = feature.label ? Math.ceil(this.context.measureText(feature.label).width) + 1 : 0;
        
        if (bounds) {
          width      = bounds[0].w   - 1;
          maxIndex   = bounds.length - 1;
        } else {
          width = end - start;
          
          if (width < 0) {
            width = 1;
          } else if (width < 1) {
            width = scale;
          }
          
          x      = feature.scaledStart;
          y      = feature.y || 0;
          bounds = [{ x: x, y: y, w: width + 1, h: this.featureHeight + this.bumpSpacing }];
          
          if (feature.label && showLabels && !this.labelOverlay && this.forceLabels !== 'off' && !(scale > 1 && start < -this.cBrowse.labelBuffer)) {
            if (this.separateLabels) {
              bounds.push({ x: x, y: y, w: labelWidth, h: this.fontHeight + 2 });
            } else {
              bounds.push({ x: x, y: y + this.featureHeight + this.bumpSpacing + 1, w: Math.max(labelWidth, width + 1), h: this.fontHeight + 2 });
            }
          }
          
          maxIndex = bounds.length - 1;
          
          bounds[0].h += this.separateLabels ? 0 : maxIndex;
          
          //this.featurePositions.insert(bounds[0], feature);
          
          if (bounds[1]) {
            //this.labelPositions.insert(bounds[1], feature);
          }
          
          feature.bounds[scaleKey] = bounds;
        }
        
        if (feature.visible[scaleKey] === false) {
          continue;
        }
        
        if (!draw.fill[feature.color]) {
          draw.fill[feature.color] = [];
          
          if (feature.order) {
            this.colorOrder[feature.order] = feature.color;
          }
        }
        
        if (feature.borderColor && !draw.border[feature.borderColor]) {
          draw.border[feature.borderColor] = [];
        }
        
        if ((this.separateLabels || this.labelOverlay) && !draw.label[feature.labelColor]) {
          draw.label[feature.labelColor] = [];
        } else if (feature.labelColor && feature.labelColor !== feature.color && !draw.fill[feature.labelColor]) {
          draw.fill[feature.labelColor] = [];
        }
        
        // truncate features in very small regions (where scale > 1) - make the features start at 1px outside the canvas to ensure no lines are drawn at the borders incorrectly
        if (scale > 1 && start < end) {
          start = Math.max(start, -1);
          end   = Math.min(end, this.cBrowse.fullWidth + 1);
          width = end - start;
        }
        
        if (width > 0) {
          draw.fill[feature.color].push([ 'fillRect', [ start, bounds[0].y, width, this.featureHeight ] ]);
          
          if (feature.borderColor) {
            draw.border[feature.borderColor].push([ 'strokeRect', [ start, bounds[0].y + 0.5, width, this.featureHeight ] ]);
          }
        }
        
        if (this.labelOverlay && labelWidth < width - 1) { // Don't show overlaid labels on features which aren't wider than the label
          draw.label[feature.labelColor].push([ 'fillText', [ feature.label, labelStart + (width - labelWidth) / 2, bounds[0].y + bounds[0].h / 2 ], feature.labelColor ]);
        } else if (bounds[1]) {
          draw[this.separateLabels ? 'label' : 'fill'][feature.labelColor].push([ 'fillText', [ feature.label, labelStart, bounds[1].y ], feature.labelColor ]);
        }
        
        if (this.separateLabels && bounds[1]) {
          feature.bottom[scaleKey]      = bounds[0].y + bounds[0].h + this.spacing;
          feature.labelBottom[scaleKey] = bounds[1].y + bounds[1].h + this.spacing;
          labelsHeight                  = Math.max(feature.labelBottom[scaleKey], labelsHeight);
        } else {
          feature.bottom[scaleKey] = bounds[maxIndex].y + bounds[maxIndex].h + this.spacing;
        }
        
        if (feature.decorations) {
          for (j = 0; j < feature.decorations.length; j++) {
            if (!this.decorations[feature.decorations[j].color]) {
              this.decorations[feature.decorations[j].color] = [];
            }
            
            this.decorations[feature.decorations[j].color].push([ feature, feature.decorations[j] ]);
          }
        }
        
        if (feature.highlight) {
          if (!draw.fill[feature.highlight]) {
            draw.fill[feature.highlight] = [];
          }
          
          draw.fill[feature.highlight].push([ 'fillRect', [ start - 1, bounds[0].y - 1, Math.max(labelWidth, width + 1) + 1, bounds[0].h + 1 ] ]);
          
          if (this.separateLabels && bounds[1]) {
            if (!draw.label[feature.highlight]) {
              draw.label[feature.highlight] = [];
            }
          
            draw.label[feature.highlight].push([ 'fillRect', [ start, bounds[1].y, labelWidth, this.fontHeight ] ]);
          }
        }
        
        height = Math.max(feature.bottom[scaleKey], height);
      }
      
      this.featuresHeight      = height;
      this.labelsHeight        = labelsHeight;
      this.fullHeight          = Math.max(height, this.initialHeight) + labelsHeight;
      this.heights.max         = Math.max(this.fullHeight, this.heights.max);
      this.heights.maxFeatures = Math.max(height, this.heights.maxFeatures);
      
      return draw;
  },

  setFeatures: function (json) {
    console.time("timing setFeatures");
    var i = json.data.length;
    json.features = [];
    
    while (i--) {
      var feature = {
        sort: i,
        start: json.data[i][0],
        end:  json.data[i][0] + 10,
        id: "f" + i,
        color: "#000000",
        y: this.height/2 - json.data[i][1]*this.height/4,
        decorations: [], 
        bounds: {},
        visible: {},
        bottom: {},
        labelBottom: {}
      };

      //this.features.insert({ x: json.data[i][0], y: 0, w: 10, h: 1 }, feature);
      json.data[i] = feature;
    }

    json.features = json.data;
    delete json.data;
   
    if (this.allData) {
      this.url = false;
    }

    console.timeEnd("timing setFeatures");
  },

  beforeDraw: function (image) {
    this.context.fillStyle = '#89BDFF';
    this.context.fillRect(0, this.height/2, image.width, 1);
    this.context.fillRect(0, this.height/4, image.width, 1);
    this.context.fillRect(0, 3*this.height/4, image.width, 1);
  },

  afterDraw: function (image) {
    this.context.fillStyle = 'black';
    this.context.fillRect(0, 0, image.width, 1);
    this.context.fillRect(0, this.height-1, image.width, 1);
  }

});