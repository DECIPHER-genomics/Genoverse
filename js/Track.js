CBrowse.Track = Base.extend({
  defaults: {
    height : 10,
    bump   : false
  },
  
  constructor: function (config) {
    var track = this;
    
    $.extend(this, this.defaults, config);
    
    this.spacing       = typeof this.spacing === 'undefined' ? this.cBrowse.trackSpacing : this.spacing;
    this.featureHeight = this.featureHeight || this.height;
    this.fixedHeight   = typeof this.fixedHeight === 'undefined' ? this.featureHeight === this.height : this.fixedHeight;
    this.height       += this.spacing;
    this.canvas        = $('<canvas>').appendTo(this.canvasContainer);
    this.container     = $('<div class="track_container">').height(this.height).appendTo(this.canvasContainer),
    this.imgContainer  = $('<div class="image_container">');
    this.context       = this.canvas[0].getContext('2d');
    this.fontHeight    = parseInt(this.context.font, 10);
    this.fontWidth     = this.context.measureText('W').width;
    this.fullHeight    = this.height;
    this.maxHeight     = this.height;
    this.initialHeight = this.height;
    this.scaleSettings = {};
    this.features      = new RTree();
    
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
          case 'expand'   : height = $(this).data('height'); track.autoHeight = true; break;
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
      var y        = e.pageY - track.container.offset().top;
      var features = track.featurePositions.search({ x: x, y: y, w: 1, h: 1 });
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
  
  reset: function () {
    this.scaleSettings = {};
    this.features      = new RTree();
    
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
      this.container.children('.scale_' + this.scale.toString().replace('.', '_')).remove();
      delete this.scaleSettings[this.scale];
    }
    
    if (!this.scaleSettings[this.scale]) {
      this.scaleSettings[this.scale] = {
        offsets          : { right: this.width, left: -this.width },
        featurePositions : new RTree(),
        imgContainers    : [],
        overlaps         : []
      };
    }
    
    var scaleSettings = this.scaleSettings[this.scale];
    
    $.each([ 'offsets', 'featurePositions', 'imgContainers', 'overlaps' ], function () {
      track[this] = scaleSettings[this];
    });
    
    this.container.css('left', 0).children().hide();
  },
  
  setFeatures: function (data) {
    var i = data.features.length;
    
    while (i--) {
      this.features.insert({ x: data.features[i].start, y: 0, w: data.features[i].end - data.features[i].start, h: 1 }, data.features[i]);
    }
  },
  
  positionData: function (data, edges, func) {
    var feature, start, end, x, y, width, bounds, bump, j, k, noLabel;
    var maxIndex = this.forceLabels || (data.length && data[0].label && this.cBrowse.length < 1e7) ? 1 : 0;
    var height   = this.initialHeight;
    var scale    = this.scale > 1 ? this.scale : 1;
    var seen     = {};
    var features = { fill: {}, border: {}, label: {} };
    
    this.colorOrder = [];
    
    for (var i = 0; i < data.length; i++) {
      feature = data[i];
      
      if (seen[feature.id]) {
        continue;
      }
      
      seen[feature.id] = 1;
      
      start   = feature.scaledStart - edges.start;
      end     = feature.scaledEnd   - edges.start;
      bounds  = feature.bounds;
      width   = start > end ? 1 : (end - start) || scale;
      noLabel = !feature.label || (scale > 1 && start < 0);
      
      if (!bounds) {
        x      = feature.scaledStart;
        y      = feature.y || 0;
        bounds = [{ x: x, y: y, w: width, h: this.featureHeight + maxIndex + 1 }];
        
        if (maxIndex) {
          bounds.push({ x: x, y: y + bounds[0].h, w: Math.ceil(this.context.measureText(feature.label).width) + 1, h: this.fontHeight + 2 });
        }
        
        if (this.bump) {
          do {
            bump = false;
            j    = bounds.length;
            
            while (j--) {
              if ((this.featurePositions.search(bounds[j])[0] || feature).id !== feature.id) {
                k = bounds.length;
                
                while (k--) {
                  bounds[k].y += bounds[j].h;
                }
                
                bump = true;
              }
            }
          } while (bump);
        }
        
        this.featurePositions.insert(bounds[0], feature);
        
        if (maxIndex) {
          bounds[1].h += 2;
          this.featurePositions.insert(bounds[1], feature);
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
      
      if (feature.labelOverlay && !features.label[feature.labelColor || feature.color]) {
        features.label[feature.labelColor || feature.color] = [];
      }
      
      if (scale > 1 && start < end) {
        start = Math.max(start, 0);
        end   = Math.min(end, this.cBrowse.fullWidth);
        width = end - start;
      }
      
      features.fill[feature.color].push([ 'fillRect', [ start, bounds[0].y, width, this.featureHeight ] ]);
      
      if (feature.borderColor) {
        features.border[feature.borderColor].push([ 'strokeRect', [ Math.round(start), Math.round(bounds[0].y) + 0.5, Math.round(width), Math.round(this.featureHeight) ] ]);
      }
      
      if (maxIndex && !noLabel) {
        if (!feature.labelOverlay) {
          features.fill[feature.color].push([ 'fillText', [ feature.label, start, bounds[1].y ], feature.labelColor ]);
        } else if (bounds[1].w < bounds[0].w) {
          features.label[feature.labelColor || feature.color].push([ 'fillText', [ feature.label, start + (feature.textAlign === 'center' ? (bounds[0].w - bounds[1].w) / 2 : 0), bounds[0].h / 2 ] ]);
        }
      }
      
      if ((feature.scaledStart + Math.max(width, maxIndex ? bounds[1].w : 0) > edges.end) || (feature.scaledStart < edges.start)) {
        this.overlaps[func]($.extend({}, feature, { bounds: bounds }));
      }
      
      feature.bottom = bounds[maxIndex].y + bounds[maxIndex].h;
      
      height = Math.max(feature.bottom, height);
    }
    
    this.fullHeight = height;
    this.maxHeight  = Math.max(height, this.maxHeight);
    
    return features;
  },
  
  beforeDraw: function (image) {
    var colors      = { major: [ this.cBrowse.colors.majorScaleLine, this.cBrowse.majorUnit ], minor: [ this.cBrowse.colors.minorScaleLine, this.cBrowse.minorUnit ] };
    var scaledStart = Math.round(image.start * this.scale) + 1;
    var x, c;
    
    for (c in colors) {
      this.context.fillStyle = colors[c][0];
      
      for (x = Math.max(image.start - (image.start % colors[c][1]), 0); x < image.end + this.cBrowse.minorUnit; x += colors[c][1]) {
        this.context.fillRect((this.cBrowse.scaleLines[c][x] || 0) - scaledStart, 0, 1, this.fullHeight);
      }
    }
    
    if (this.borderColor) {
      this.context.fillStyle = this.borderColor;
      
      this.context.fillRect(0, 0,                      image.width, 1);
      this.context.fillRect(0, this.featureHeight - 1, image.width, 1);
    }
  },
  
  afterDraw: $.noop  // implement in children
});
