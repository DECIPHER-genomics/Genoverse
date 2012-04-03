CBrowse.Track = Base.extend({
  defaults: {
    height      : 10,
    bump        : false,
    bumpSpacing : 2,
    urlParams   : {}
  },
  
  constructor: function (config) {
    var track = this;
    
    $.extend(this, this.defaults, this.config, config);
    
    this.spacing           = typeof this.spacing === 'undefined' ? this.cBrowse.trackSpacing : this.spacing;
    this.featureHeight     = this.featureHeight || this.height;
    this.fixedHeight       = typeof this.fixedHeight === 'undefined' ? this.featureHeight === this.height : this.fixedHeight;
    this.height           += this.spacing;
    this.canvas            = $('<canvas>').appendTo(this.canvasContainer);
    this.container         = $('<div class="track_container">').height(this.height).appendTo(this.canvasContainer),
    this.imgContainer      = $('<div class="image_container">');
    this.context           = this.canvas[0].getContext('2d');
    this.fontHeight        = parseInt(this.context.font, 10);
    this.fontWidth         = this.context.measureText('W').width;
    this.separateLabels    = this.separateLabels || !!this.depth;
    this.initialHeight     = this.height;
    this.maxHeight         = this.height;
    this.maxFeaturesHeight = 0;
    
    this.init();
    this.setScale();
    
    if (this.name) {
      this.label = $('<li>', {
        html    : this.name,
        'class' : 'label',
        height  : this.height
      }).appendTo(this.cBrowse.labelContainer).data('index', this.index);
    }
    
    if (!this.fixedHeight) {
      this.sizeHandle = $('<div class="size_handle"><div class="expand" title="Show all">+</div><div class="collapse" title="Collapse">-</div></div>').appendTo(this.label).children().on('click', function (e) {
        var height;
        
        switch (e.target.className) {
          case 'expand'   : height = $(this).data('height'); track.autoHeight = true;  break;
          case 'collapse' : height = track.initialHeight;    track.autoHeight = false; break;
          default         : return;
        }
        
        track.resize(height);
      });
    }
    
    this.container.on('mouseup', '.image_container', function (e) {
      if ((e.which && e.which !== 1) || (track.cBrowse.prev.left !== track.cBrowse.left)) {
        return; // Only show menus on left click when not dragging
      }
      
      var x        = e.pageX - track.container.parent().offset().left + track.cBrowse.scaledStart;
      var y        = e.pageY - $(e.target).offset().top;
      var features = track[e.target.className === 'labels' ? 'labelPositions' : 'featurePositions'].search({ x: x, y: y, w: 1, h: 1 });
      var i        = features.length;
      var seen     = {};
      
      while (i--) {
        if (seen[features[i].id]) {
          continue;
        }
        
        seen[features[i].id] = 1;
        
        track.cBrowse.makeMenu(features[i], { left: e.pageX, top: e.pageY }, track.name);
      }
    });
  },
  
  init: function () {
    this.scaleSettings = {};
    this.features      = new RTree();
  },
  
  reset: function () {
    if (this.ajax) {
      this.ajax.abort();
    }
    
    this.init();
    this.container.empty();
  },
  
  resize: function (height) {
    this.height = height;
    
    this.container.height(height);
    this.label.height(height);
  },
  
  makeImage: function (start, end, width, moved) {
    var func = moved < 0 ? 'unshift' : 'push';
    var dir  = moved < 0 ? 'right'   : 'left';
    var div  = this.imgContainer.clone().width(width);
    
    var img = new CBrowse.TrackImage({
      track      : this,
      container  : div,
      start      : start, 
      end        : end,
      width      : width,
      edges      : { start: start * this.scale, end: end * this.scale },
      func       : func,
      labelScale : Math.ceil(this.fontWidth / this.scale),
      background : this.cBrowse.colors.background
    });
    
    this.imgContainers[func](div[0]);
    this.container.append(this.imgContainers);
    
    div.css(dir, this.offsets[dir]);
    
    this.offsets[dir] += width;
    
    return img.getData();
  },
  
  addOverlaps: function (data) {
    data = this.overlaps.concat(data);
    this.overlaps = [];
    return data;
  },
  
  setScale: function () {
    var track = this;
    
    this.scale = this.cBrowse.scale;
    
    if (this.scaleSettings[this.scale] && !this.cBrowse.history[this.cBrowse.start + ':' + this.cBrowse.end]) {
      this.container.children('.' + this.cBrowse.scrollStart).remove();
      delete this.scaleSettings[this.scale];
    }
    
    if (!this.scaleSettings[this.scale]) {
      this.scaleSettings[this.scale] = {
        offsets          : { right: this.width, left: -this.width },
        featurePositions : new RTree(),
        imgContainers    : [],
        overlaps         : []
      };
      
      this.scaleSettings[this.scale].labelPositions = this.separateLabels ? new RTree() : this.scaleSettings[this.scale].featurePositions;
    }
    
    var scaleSettings = this.scaleSettings[this.scale];
    
    $.each([ 'offsets', 'featurePositions', 'labelPositions', 'imgContainers', 'overlaps' ], function () {
      track[this] = scaleSettings[this];
    });
    
    this.maxFeaturesHeight = 0;
    
    this.container.css('left', 0).children().hide();
  },
  
  setFeatures: function (data) {
    var i = data.features.length;
    
    while (i--) {
      this.features.insert({ x: data.features[i].start, y: 0, w: data.features[i].end - data.features[i].start, h: 1 }, data.features[i]);
    }
  },
  
  positionData: function (data, edges, func) {
    var feature, start, end, x, y, width, bounds, bump, depth, j, k, labelWidth, maxIndex;
    var showLabels   = this.forceLabels === true || !(this.maxLabelRegion && this.cBrowse.length > this.maxLabelRegion);
    var height       = this.initialHeight;
    var labelsHeight = 1;
    var scale        = this.scale > 1 ? this.scale : 1;
    var seen         = {};
    var features     = { fill: {}, border: {}, label: {} };
    
    this.colorOrder = [];
    
    for (var i = 0; i < data.length; i++) {
      feature = data[i];
      
      if (seen[feature.id]) {
        continue;
      }
      
      seen[feature.id] = 1;
      
      start      = feature.scaledStart - edges.start;
      end        = feature.scaledEnd   - edges.start;
      bounds     = feature.bounds;
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
        
        if (feature.label && showLabels && !this.labelOverlay && this.forceLabels !== 'off' && !(scale > 1 && start < 0)) {
          if (this.separateLabels) {
            bounds.push({ x: x, y: y, w: labelWidth, h: this.fontHeight + 2 });
          } else {
            bounds.push({ x: x, y: y + this.featureHeight + 1, w: Math.max(labelWidth, width + 1), h: this.fontHeight + 2 });
          }
        }
        
        maxIndex = bounds.length - 1;
        
        bounds[0].h += this.separateLabels ? 0 : maxIndex;
        
        if (this.bump) {
          depth = 0;
          
          if (this.separateLabels) { // labels are drawn on a separate image, below the features
            j = bounds.length;
            
            while (j--) {
              do {
                if (j === 0 && this.depth && ++depth >= this.depth) {
                  break;
                }
                
                bump = false;
                
                if ((this[j ? 'labelPositions' : 'featurePositions'].search(bounds[j])[0] || feature).id !== feature.id) {
                  bounds[j].y += bounds[j].h;
                  bump      = true;
                }
              } while (bump);
            }
          } else { // labels and features drawn on the same image
            do {
              bump = false;
              j    = bounds.length;
              
              while (j--) {
                if ((this[j ? 'labelPositions' : 'featurePositions'].search(bounds[j])[0] || feature).id !== feature.id) {
                  k = bounds.length;
                  
                  while (k--) {
                    bounds[k].y += bounds[j].h; // bump both feature and label by the height of the current bounds
                  }
                  
                  bump = true;
                }
              }
            } while (bump);
          }
        } else if (this.bumpLabels && bounds[1]) { // labels are bumped, but features aren't
          do {
            bump = false;
            
            if ((this.labelPositions.search(bounds[1])[0] || feature).id !== feature.id) {
              bounds[1].y++;
              bump = true;
            }
          } while (bump);
        }
        
        this.featurePositions.insert(bounds[0], feature);
        
        if (bounds[1]) {
          this.labelPositions.insert(bounds[1], feature);
        }
      }
      
      if (!features.fill[feature.color]) {
        features.fill[feature.color] = [];
        
        if (feature.order) {
          this.colorOrder[feature.order] = feature.color;
        }
      }
      
      if (feature.borderColor && !features.border[feature.borderColor]) {
        features.border[feature.borderColor] = [];
      }
      
      if ((this.separateLabels || this.labelOverlay) && !features.label[feature.labelColor]) {
        features.label[feature.labelColor] = [];
      } else if (feature.labelColor && feature.labelColor !== feature.color && !features.fill[feature.labelColor]) {
        features.fill[feature.labelColor] = [];
      }
      
      if (scale > 1 && start < end) {
        start = Math.max(start, 0);
        end   = Math.min(end, this.cBrowse.fullWidth);
        width = end - start;
      }
      
      features.fill[feature.color].push([ 'fillRect', [ start, bounds[0].y, width, this.featureHeight ] ]);
      
      if (feature.borderColor) {
        features.border[feature.borderColor].push([ 'strokeRect', [ start, bounds[0].y + 0.5, width, this.featureHeight ] ]);
      }
      
      if (this.labelOverlay && labelWidth < width - 1) { // Don't show overlaid labels on features which aren't wider than the label
        features.label[feature.labelColor].push([ 'fillText', [ feature.label, start + (width - labelWidth) / 2, bounds[0].y + bounds[0].h / 2 ], feature.labelColor ]);
      } else if (bounds[1]) {
        features[this.separateLabels ? 'label' : 'fill'][feature.labelColor].push([ 'fillText', [ feature.label, start, bounds[1].y ], feature.labelColor ]);
      }
      
      if ((feature.scaledStart + Math.max(width, bounds[1] ? labelWidth : 0) > edges.end) || (feature.scaledStart < edges.start)) {
        this.overlaps[func]($.extend({}, feature, { bounds: bounds }));
      }
      
      if (this.separateLabels && bounds[1]) {
        feature.bottom      = bounds[0].y + bounds[0].h + this.spacing;
        feature.labelBottom = bounds[1].y + bounds[1].h + this.spacing;
        labelsHeight        = Math.max(feature.labelBottom, labelsHeight);
      } else {
        feature.bottom = bounds[maxIndex].y + bounds[maxIndex].h + this.spacing;
      }
      
      height = Math.max(feature.bottom, height);
    }
    
    this.featuresHeight    = height;
    this.labelsHeight      = labelsHeight;
    this.fullHeight        = height + labelsHeight;
    this.maxHeight         = Math.max(this.fullHeight, this.maxHeight);
    this.maxFeaturesHeight = Math.max(height, this.maxFeaturesHeight);
    
    return features;
  },
  
  drawBackground: function (image, height) {
    var scaleLines  = { major: [ this.cBrowse.colors.majorScaleLine, this.cBrowse.majorUnit ], minor: [ this.cBrowse.colors.minorScaleLine, this.cBrowse.minorUnit ] };
    var scaledStart = Math.round(image.start * this.scale) + 1;
    var x;
    
    if (this.cBrowse.backgrounds) {
      this.drawBackgroundColor(scaledStart, height);
    }
    
    for (var c in scaleLines) {
      this.context.fillStyle = scaleLines[c][0];
      
      for (x = Math.max(image.start - (image.start % scaleLines[c][1]), 0); x < image.end + this.cBrowse.minorUnit; x += scaleLines[c][1]) {
        this.context.fillRect((this.cBrowse.scaleLines[c][x] || 0) - scaledStart, 0, 1, height);
      }
    }
  },
  
  drawBackgroundColor: function (scaledStart, height) {
    var backgrounds = this.cBrowse.backgrounds;
    var i;
    
    for (var c in backgrounds) {
      this.context.fillStyle = c;
      
      i = backgrounds[c].length;
      
      while (i--) {
        this.context.fillRect(backgrounds[c][i].scaledStart - scaledStart, 0, backgrounds[c][i].scaledEnd - backgrounds[c][i].scaledStart, height);
      }
    }
  },
  
  beforeDraw : $.noop,  // implement in children
  afterDraw  : $.noop   // implement in children
});
