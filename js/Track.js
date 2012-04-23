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
    
    this.featureHeight  = this.featureHeight || this.height;
    this.separateLabels = typeof this.separateLabels === 'undefined' ? !!this.depth : this.separateLabels;
    this.spacing        = typeof this.spacing        === 'undefined' ? this.cBrowse.trackSpacing : this.spacing;
    this.fixedHeight    = typeof this.fixedHeight    === 'undefined' ? this.featureHeight === this.height && !(this.bump || this.bumpLabels) : this.fixedHeight;
    this.height        += this.spacing;
    this.canvas         = $('<canvas>').appendTo(this.canvasContainer);
    this.container      = $('<div class="track_container">').height(this.height).appendTo(this.canvasContainer),
    this.imgContainer   = $('<div class="image_container">');
    this.context        = this.canvas[0].getContext('2d');
    this.fontHeight     = parseInt(this.context.font, 10);
    this.initialHeight  = this.height;
    this.dataRegion     = { start: 9e99, end: -9e99 };
    
    this.init();
    this.setScale();
    
    if (this.name) {
      this.label          = $('<li><span class="name">' + this.name + '</span></li>').appendTo(this.cBrowse.labelContainer).data('index', this.index);
      this.minLabelHeight = this.label.children('.name').height();
      this.label.height(Math.max(this.height, this.minLabelHeight));
    }
    
    if (!this.fixedHeight) {
      this.autoHeight = typeof this.autoHeight === 'undefined' ? this.cBrowse.autoHeight : this.autoHeight;
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

    if (this.debug) {
      for (var key in this) {
        if (typeof this[key] === 'function') {
          this.debugWrap(this, key);
        }
      }
    }
  },
  
  init: function () {
    this.scaleSettings = {};
    this.features      = new RTree();
  },
  
  reset: function () {
    if (this.ajax) {
      this.ajax.abort();
    }
    
    if (this.url !== false) {
      this.init();
    }
    
    this.container.empty();
  },
  
  resize: function (height) {
    if (height < this.featureHeight) {
      height = 0;
    } else {
      height = Math.max(height, this.minLabelHeight);
    }
    
    this.height = height;
    
    this.container.height(height);
    this.label.height(height)[height ? 'show' : 'hide']();
  },
  
  setScale: function () {
    var track = this;
    var featurePositions, labelPositions;
    
    this.scale = this.cBrowse.scale;
    
    if (this.scaleSettings[this.scale] && !this.cBrowse.history[this.cBrowse.start + '-' + this.cBrowse.end]) {
      featurePositions = this.scaleSettings[this.scale].featurePositions;
      labelPositions   = this.scaleSettings[this.scale].labelPositions;
      
      this.container.children('.' + this.cBrowse.scrollStart).remove();
      delete this.scaleSettings[this.scale];
    }
    
    if (!this.scaleSettings[this.scale]) {
      this.scaleSettings[this.scale] = {
        offsets          : { right: this.width, left: -this.width },
        featurePositions : featurePositions || new RTree(),
        imgContainers    : [],
        heights          : { max: this.height, maxFeatures: 0 }
      };
      
      this.scaleSettings[this.scale].labelPositions = this.separateLabels ? labelPositions || new RTree() : this.scaleSettings[this.scale].featurePositions;
    }
    
    var scaleSettings = this.scaleSettings[this.scale];
    
    $.each([ 'offsets', 'featurePositions', 'labelPositions', 'imgContainers', 'heights' ], function () {
      track[this] = scaleSettings[this];
    });
    
    this.container.css('left', 0).children().hide();
  },
  
  setFeatures: function (data) {
    var i = data.features.length;
    
    while (i--) {
      data.features[i].sort        = i;
      data.features[i].bounds      = {};
      data.features[i].visible     = {};
      data.features[i].bottom      = {};
      data.features[i].labelBottom = {};
      this.features.insert({ x: data.features[i].start, y: 0, w: data.features[i].end - data.features[i].start, h: 1 }, data.features[i]);
    }
    
    if (this.allData) {
      this.url = false;
    }
  },
  
  scaleFeatures: function (features) {
    var i = features.length;
    while (i--) {
      features[i].scaledStart = features[i].start * this.scale;
      features[i].scaledEnd   = features[i].end   * this.scale;
    }
    
    return features;
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
        
        if (this.bump) {
          depth = 0;
          
          if (this.separateLabels) { // labels are drawn on a separate image, below the features
            j = bounds.length;
            
            while (j--) {
              do {
                if (j === 0 && this.depth && ++depth >= this.depth) {
                  if ($.grep(this.featurePositions.search(bounds[0]), function (f) { return f.visible[scaleKey] !== false; }).length) {
                    feature.visible[scaleKey] = false;
                  }
                  
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
  
  makeImage: function (start, end, width, moved, cls) {
    var dir   = moved < 0 ? 'right' : 'left';
    var div   = this.imgContainer.clone().width(width).addClass(cls);
    var image = new CBrowse.TrackImage({
      track       : this,
      container   : div,
      start       : start, 
      end         : end,
      width       : width,
      scaledStart : start * this.scale,
      background  : this.cBrowse.colors.background
    });
    
    this.imgContainers[moved < 0 ? 'unshift' : 'push'](div[0]);
    this.container.append(this.imgContainers);
    
    div.css(dir, this.offsets[dir]);
    
    this.offsets[dir] += width;
    
    var deferred = image.makeImage();
    
    this.getData(image, deferred);
    
    return deferred;
  },
  
  getData: function (image, deferred) {
    var features = !this.url || (image.start >= this.dataRegion.start && image.end <= this.dataRegion.end) ? this.features.search({ x: image.bufferedStart, y: 0, w: image.end - image.bufferedStart, h: 1 }) : false;
    
    if (features) {
      this.draw(image, features.sort(function (a, b) { return a.sort - b.sort; }));
    } else {
      this.ajax = $.ajax({
        url      : this.url,
        data     : this.getQueryString(image.bufferedStart, image.end),
        dataType : 'json',
        context  : this,
        error    : function () { deferred.reject(); },
        success  : function (json) {
          delete this.ajax;
          this.dataRegion.start = Math.min(image.start, this.dataRegion.start);
          this.dataRegion.end   = Math.max(image.end,   this.dataRegion.end);
          
          this.setFeatures(json);
          this.draw(image, json.features);
        }
      });
    }
  },
  
  getQueryString: function (start, end) {
    var search = window.location.search.split(/[?&;]/);
    var data   = {
      chr   : this.cBrowse.chromosome,
      start : this.allData ? 1 : start,
      end   : this.allData ? this.cBrowse.chromosomeSize : end
    };
    
    for (var i = 0; i < search.length; i++) {
      if (search[i] && !('&' + search[i] + '&').match(this.cBrowse.paramRegex)) {
        search[i] = search[i].split('=');
        data[search[i][0]] = search[i][1];
      }
    }
    
    return $.extend(data, this.urlParams);
  },
  
  draw: function (image, features) {
    this.colorOrder  = [];
    this.decorations = {};
    image.draw(this.positionFeatures(this.scaleFeatures(features), image.scaledStart));
  },
  
  drawBackground: function (image, height) {
    var scaleLines  = { major: [ this.cBrowse.colors.majorScaleLine, this.cBrowse.majorUnit ], minor: [ this.cBrowse.colors.minorScaleLine, this.cBrowse.minorUnit ] };
    var scaledStart = Math.round(image.scaledStart);
    var x;
    
    if (this.cBrowse.backgrounds) {
      this.drawBackgroundColor(image, height, scaledStart);
    }
    
    for (var c in scaleLines) {
      this.context.fillStyle = scaleLines[c][0];
      
      for (x = Math.max(image.start - (image.start % scaleLines[c][1]), 0); x < image.end + this.cBrowse.minorUnit; x += scaleLines[c][1]) {
        this.context.fillRect((this.cBrowse.scaleLines[c][x] || 0) - scaledStart, 0, 1, height);
      }
    }
  },
  
  drawBackgroundColor: function (image, height, scaledStart) {
    var backgrounds = this.cBrowse.backgrounds;
    var i, start, end;
    
    for (var c in backgrounds) {
      this.context.fillStyle = c;
      
      i = backgrounds[c].length;
      
      while (i--) {
        if (backgrounds[c][i].end >= image.start && backgrounds[c][i].start <= image.end) {
          start = Math.max(backgrounds[c][i].scaledStart - scaledStart, 0);
          end   = Math.min(backgrounds[c][i].scaledEnd   - scaledStart, image.width);
          
          this.context.fillRect(start, 0, end - start, height);
        }
      }
    }
  },

  // initial version of debug functionality
  // to use pass debug: 1 into configuration of the track to debug and profile all calls
  // TODO: implement debug levels
  debugWrap: function (obj, key) {
    obj['__original_' + key] = obj[key];

    obj[key] = function () {
      var name = (obj.name || '') + '(' + (obj.type || 'Track') + ').' + key;

      console.log(name + ' is called');
      console.time(name);

      var result = this['__original_' + key].apply(this, arguments);

      console.timeEnd(name);
      return result;
    }
  },
  
  beforeDraw       : $.noop, // decoration for the track, drawn before the features
  decorateFeatures : $.noop, // decoration for the features
  afterDraw        : $.noop  // decoration for the track, drawn after the features
});
