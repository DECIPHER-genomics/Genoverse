Genoverse.Track = Base.extend({

  // Defaults
  height         : 12,
  dataType       : 'json',
  fontSize       : 10,
  fontFamily     : 'sans-serif',
  fontWeight     : 'normal',
  bump           : false,
  bumpSpacing    : 2,
  featureSpacing : 1,
  urlParams      : {},
  urlTemplate    : {},
  inherit        : [],
  xhrFields      : {},

  constructor: function (config) {
    // Deep clone all [..] and {..} objects in this to prevent sharing between instances
    var deepCopy = {};
    for (var key in this) {
      if (typeof this[key] === 'object') deepCopy[key] = this[key];
    }
    this.extend($.extend(true, {}, deepCopy));

    // Use Base.extend to make any funciton in config have this.base
    this.extend(config);
    var track = this;
    
    for (var i = 0; i < this.inherit.length; i++) {
      if (Genoverse.Track[this.inherit[i]]) {
        this.extend(Genoverse.Track[this.inherit[i]]);
      }
    }
    
    if (typeof this.inheritedConstructor === 'function') {
      this.inheritedConstructor(config);
    }
    
    for (var key in this) {
      if (typeof this[key] === 'function' && !key.match(/^(base|extend|constructor|functionWrap|debugWrap)$/)) {
        this.browser.functionWrap(key, this);
      }
    }
    
    if (this.url) {
      this.url = this.url.split('?');
      
      if (this.url[1]) {
        $.each(this.url[1].split(/[;&]/), function () {
          var tmp = this.split('=');
          track[tmp[1].match(/__(CHR|START|END)__/) ? 'urlTemplate' : 'urlParams'][tmp[0]] = tmp[1];
        });
      }
      
      this.url = this.url[0];
      
      if (this.browser.proxy) {
        this.urlParams.url = this.url;
        this.url = this.browser.proxy;
      }
    }
    
    this.addDomElements(config);
    this.addUserEventHandlers();
    this.init();
    this.setScale();
  },

  addDomElements: function (config) {
    var track = this;

    this.order          = typeof this.order          !== 'undefined' ? this.order          : this.index;
    this.separateLabels = typeof this.separateLabels !== 'undefined' ? this.separateLabels : !!this.depth;
    this.spacing        = typeof this.spacing        !== 'undefined' ? this.spacing        : this.browser.trackSpacing;
    this.featureHeight  = typeof this.featureHeight  !== 'undefined' ? this.featureHeight  : this.height;
    this.fixedHeight    = typeof this.fixedHeight    !== 'undefined' ? this.fixedHeight    : this.featureHeight === this.height && !(this.bump || this.bumpLabels);
    this.autoHeight     = typeof this.autoHeight     !== 'undefined' ? this.autoHeight     : !this.fixedHeight && !config.height ? this.browser.autoHeight : false;
    this.resizable      = typeof this.resizable      !== 'undefined' ? this.resizable      : !this.fixedHeight;
    this.height        += this.spacing;
    this.initialHeight  = this.height;
    this.minLabelHeight = 0;
    this.canvas         = $('<canvas>').appendTo(this.browser.wrapper);
    this.container      = $('<div class="track_container">').appendTo(this.browser.wrapper);
    this.imgContainer   = $('<div class="image_container">');
    this.label          = $('<li>').appendTo(this.browser.labelContainer).height(this.height).data('index', this.index);
    this.menus          = $();
    this.context        = this.canvas[0].getContext('2d');
    this.font           = this.fontWeight + ' ' + this.fontSize + 'px ' + this.fontFamily;
    this.context.font   = this.font;
    this.fontHeight     = this.fontSize;
    this.labelUnits     = [ 'bp', 'Kb', 'Mb', 'Gb', 'Tb' ];

    if (this.hidden) {
      this.height  = 0;
    }
    
    if (this.autoHeight === 'force') {
      this.autoHeight  = true;
      this.fixedHeight = false;
      this.resizable   = false;
    } else if (this.threshold) {
      this.thresholdMessage = this.browser.setTracks([{ type: 'Threshold', track: this }], this.browser.tracks.length)[0];
    }
    
   
    if (this.name) {
      if (this.unsortable) {
        this.label.addClass('unsortable');
      } else {
        $('<div class="handle"></div>').appendTo(this.label);
      }
      
      this.minLabelHeight = $('<span class="name">' + this.name + '</span>').appendTo(this.label).outerHeight(true);
      this.label.height(this.hidden ? 0 : Math.max(this.height, this.minLabelHeight));
    } else {
      this.label.addClass('unsortable');
    }
    
    this.container.height(this.hidden ? 0 : Math.max(this.height, this.minLabelHeight));
    
    if (!this.fixedHeight && this.resizable !== false) {
      this.heightToggler = $('<div class="height_toggler"><div class="auto">Set track to auto-adjust height</div><div class="fixed">Set track to fixed height</div></div>').on({
        mouseover : function () { $(this).children(track.autoHeight ? '.fixed' : '.auto').show(); },
        mouseout  : function () { $(this).children().hide(); },
        click     : function () {
          var height;
          
          if (track.autoHeight = !track.autoHeight) {
            track.heightBeforeToggle = track.height;
            height = track.fullVisibleHeight;
          } else {
            height = track.heightBeforeToggle || track.initialHeight;
          }
          
          $(this).toggleClass('auto_height').children(':visible').hide().siblings().show();
          
          track.resize(height, true);
        }
      }).addClass(this.autoHeight ? 'auto_height' : '').appendTo(this.label);
    }
  },
  
  init: function () {
    if (this.renderer) {
      this.urlParams.renderer = this.renderer;
      this.featuresByRenderer = {};
      this.features           = this.featuresByRenderer[this.renderer] = new RTree();
    } else {
      this.features = new RTree();
    }
    
    this.dataRegion    = { start: 9e99, end: -9e99 };
    this.scaleSettings = {};
    this.featureIds    = {};
  },
  
  reset: function () {
    this.container.children('.image_container').remove();
    
    if (this.url !== false) {
      this.init();
    }
  },
  
  addUserEventHandlers: function () {
    var track   = this;
    var browser = this.browser;
    
    this.container.on('mouseup', '.image_container', function (e) {
      if ((e.which && e.which !== 1) || (browser.prev.left !== browser.left) || (browser.dragAction === 'select' && browser.selector.outerWidth(true) > 2)) {
        return; // Only show menus on left click when not dragging and not selecting
      }

      track.click(e);
    });
  },
  
  click: function (e) {
    var x = e.pageX - this.container.parent().offset().left + this.browser.scaledStart;
    var y = e.pageY - $(e.target).offset().top;
    var feature = this[e.target.className === 'labels' ? 'labelPositions' : 'featurePositions'].search({ x: x, y: y, w: 1, h: 1 }).sort(function (a, b) { return a.sort - b.sort; })[0];
    
    if (feature) {
      this.browser.makeMenu(feature, { left: e.pageX, top: e.pageY }, this);
    }
  },
  
  checkSize: function () {
    if (this.threshold && this.browser.length > this.threshold) {
      this.fullVisibleHeight = 0;
      return;
    }
    
    var bounds = { x: this.browser.scaledStart, w: this.width, y: 0, h: this.heights.max };
    var scale  = this.scale;
    var height = Math.max.apply(Math, $.map(this.featurePositions.search(bounds), function (feature) { return feature.bottom[scale]; }).concat(0));
    
    if (this.separateLabels) {
      this.labelTop = height;
      height += Math.max.apply(Math, $.map(this.labelPositions.search(bounds), function (feature) { return feature.labelBottom[scale]; }).concat(0));
    }
    
    if (!height && this.errorMessage) {
      height = this.errorMessage.height;
    }
    
    this.fullVisibleHeight = height;
  },
  
  resize: function (height) {
    if (arguments[1] !== true && height < this.featureHeight) {
      height = 0;
    } else {
      height = this.hidden ? 0 : Math.max(height, this.minLabelHeight);
    }
    
    this.height = height;
    
    if (typeof arguments[1] === 'number') {
      $(this.imgContainers).children('.labels').css('top', arguments[1]);
    }
    
    this.container.height(height);
    this.label.height(height);//[height ? 'show' : 'hide']();
    this.toggleExpander();
  },
  
  toggleExpander: function () {
    if (!this.resizable) {
      return;
    }
    
    var track = this;
    
    // Note: this.fullVisibleHeight - this.bumpSpacing is not actually the correct value to test against, but it's the easiest best guess to obtain.
    // this.fullVisibleHeight is the maximum bottom position of the track's features in the region, which includes spacing at the bottom of each feature and label
    // Therefore this.fullVisibleHeight includes this spacing for the bottom-most feature.
    // The correct value (for a track using the default positionFeatures code) is:
    // this.fullVisibleHeight - ([there are labels in this region] ? (this.separateLabels ? 0 : this.bumpSpacing + 1) + 2 : this.bumpSpacing)
    //                                                                ^ padding on label y-position                     ^ margin on label height
    if (this.fullVisibleHeight - this.bumpSpacing > this.height) {
      this.expander = (this.expander || $('<div class="expander">').width(this.width).appendTo(this.container).on('click', function () {
        track.resize(track.fullVisibleHeight);
      })).css('left', -this.browser.left)[this.height === 0 ? 'hide' : 'show']();
    } else if (this.expander) {
      this.expander.hide();
    }    
  },
  
  remove: function () {
    var thresholdMessage = this.thresholdMessage;
    
    if (thresholdMessage) {
      delete this.thresholdMessage;
      return this.browser.removeTracks([ this, thresholdMessage ]);
    }
    
    this.container.add(this.label).add(this.menus).remove();
    this.browser.tracks.splice(this.index, 1);
  },
  
  setScale: function () {
    var track = this;
    var featurePositions, labelPositions;
    
    this.scale = this.browser.scale;
    
    // Reset scaleSettings if the user has zoomed back to a previously existent zoom level, but has scrolled to a new region.
    // This is needed to get the newly created images in the right place.
    // Sadly we have to throw away all other images generated at this zoom level for it to work, 
    // since the new image probably won't fit exactly with the positioning of the old images,
    // and there would probably be a gap between this image and the old ones.
    if (this.scaleSettings[this.scale] && !this.browser.history[this.browser.start + '-' + this.browser.end]) {
      featurePositions = this.scaleSettings[this.scale].featurePositions;
      labelPositions   = this.scaleSettings[this.scale].labelPositions;
      
      this.container.children('.' + this.browser.scrollStart).remove();
      
      delete this.scaleSettings[this.scale];
    }
    
    if (!this.scaleSettings[this.scale]) {
      featurePositions = featurePositions || new RTree();
      
      this.scaleSettings[this.scale] = {
        imgContainers    : [],
        heights          : { max: this.height, maxFeatures: 0 },
        featurePositions : featurePositions,
        labelPositions   : this.separateLabels ? labelPositions || new RTree() : featurePositions
      };
    }
    
    var scaleSettings = this.scaleSettings[this.scale];
    
    $.each([ 'featurePositions', 'labelPositions', 'imgContainers', 'heights' ], function () {
      track[this] = scaleSettings[this];
    });
    
    if (this.renderer) {
      var renderer = this.getRenderer();
      
      if (renderer !== this.urlParams.renderer) {
        this.setRenderer(renderer);
      }
    }
    
    this.container.css('left', this.browser.left).children('.image_container').hide();
  },
  
  setRenderer: function (renderer, permanent) {
    if (this.urlParams.renderer !== renderer) {
      this.urlParams.renderer = renderer;
      this.dataRegion = { start: 9e99, end: -9e99 };
      
      if (!this.featuresByRenderer[renderer]) {
        this.featuresByRenderer[renderer] = new RTree();
      }
      
      this.features = this.featuresByRenderer[renderer];
    }
    
    if (permanent && this.renderer !== renderer) {
      this.renderer = renderer;
      
      var browser = this.browser;
      var img     = $(this.imgContainers).filter(browser.left > 0 ? ':first' : ':last').data('img');
      
      if (img) {
        this.reset();
        this.setScale();
        browser.makeTrackImages([ this ]);
      }
    }
  },
  
  getRenderer: function () {
    return this.urlParams.renderer;
  },
  
  parseData: function (data, bounds) {
    var i = data.features.length;
    
    while (i--) {
      data.features[i].sort        = i;
      data.features[i].bounds      = {};
      data.features[i].visible     = {};
      data.features[i].bottom      = {};
      data.features[i].labelBottom = {};
      
      if (!this.featureIds[data.features[i].id]) {
        this.features.insert({ x: data.features[i].start, y: 0, w: data.features[i].end - data.features[i].start + 1, h: 1 }, data.features[i]);
        this.featureIds[data.features[i].id] = 1;
      }
    }
    
    if (this.allData) {
      return this.features.search(bounds).sort(function (a, b) { return a.sort - b.sort; });
    } else {
      return data.features;
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
  
  positionFeatures: function (features, startOffset, imageWidth) {
    var feature, start, end, x, y, width, originalWidth, bounds, bump, depth, j, k, labelStart, labelWidth, maxIndex;
    var showLabels   = this.forceLabels === true || !(this.maxLabelRegion && this.browser.length > this.maxLabelRegion);
    var height       = 0;
    var labelsHeight = 0;
    var scale        = this.scale > 1 ? this.scale : 1;
    var scaleKey     = this.scale;
    var seen         = {};
    var draw         = { fill: {}, border: {}, label: {}, highlight: {}, labelHighlight: {} };
    
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
        width      = bounds[0].w   - this.featureSpacing;
        maxIndex   = bounds.length - 1;
      } else {
        width = end - start + scale;
        
        if (end < start) {
          width = 1;
        } else if (width < scale) {
          width = scale;
        }
        
        x      = feature.scaledStart;
        y      = feature.y ? feature.y * (this.featureHeight + this.bumpSpacing) : 0;
        bounds = [{ x: x, y: y, w: width + this.featureSpacing, h: this.featureHeight + this.bumpSpacing }];
        
        if (feature.label && showLabels && !this.labelOverlay && this.forceLabels !== 'off' && !(scale > 1 && start < -this.browser.labelBuffer)) {
          if (this.separateLabels) {
            bounds.push({ x: x, y: y, w: labelWidth, h: this.fontHeight + 2 });
          } else {
            bounds.push({ x: x, y: y + this.featureHeight + this.bumpSpacing + 1, w: Math.max(labelWidth, width + this.featureSpacing), h: this.fontHeight + 2 });
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
              if (this.depth && ++depth >= this.depth) {
                if ($.grep(this.featurePositions.search(bounds[0]), function (f) { return f.visible[scaleKey] !== false; }).length) {
                  feature.visible[scaleKey] = false;
                }
                
                break;
              }
            
              bump = false;
              j    = bounds.length;
              
              while (j--) {              
                if ((this.featurePositions.search(bounds[j])[0] || feature).id !== feature.id) {
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
      
      if (feature.labelColor) {
        if ((this.separateLabels || this.labelOverlay) && !draw.label[feature.labelColor]) {
          draw.label[feature.labelColor] = [];
        } else if (feature.labelColor !== feature.color && !draw.fill[feature.labelColor]) {
          draw.fill[feature.labelColor] = [];
        }
      }
      
      originalWidth = width;
      
      // truncate features in very small regions (where scale > 1) - make the features start at 1px outside the canvas to ensure no lines are drawn at the borders incorrectly
      if (scale > 1 && start < end && (start < 0 || end > imageWidth)) {
        start = Math.max(start, -1);
        end   = Math.min(end, imageWidth + 1);
        width = end - start + scale;
      }
      
      if (width > 0) {
        draw.fill[feature.color].push([ 'fillRect', [ start, bounds[0].y, width, this.featureHeight ] ]);
        
        if (feature.borderColor) {
          draw.border[feature.borderColor].push([ 'strokeRect', [ start, bounds[0].y + 0.5, width, this.featureHeight ] ]);
        }
      }
      
      if (this.labelOverlay && feature.label && labelWidth < originalWidth - 1) { // Don't show overlaid labels on features which aren't wider than the label
        draw.label[feature.labelColor].push([ 'fillText', [ feature.label, labelStart + (originalWidth - labelWidth) / 2, bounds[0].y + bounds[0].h / 2 ] ]);
      } else if (bounds[1]) {
        draw[this.separateLabels ? 'label' : 'fill'][feature.labelColor].push([ 'fillText', [ feature.label, labelStart, bounds[1].y ] ]);
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
        if (!draw.highlight[feature.highlight]) {
          draw.highlight[feature.highlight] = [];
        }
        
        if (bounds[1]) {
          if (this.separateLabels) {
            if (!draw.labelHighlight[feature.highlight]) {
              draw.labelHighlight[feature.highlight] = [];
            }
            
            draw.labelHighlight[feature.highlight].push([ 'fillRect', [ start, bounds[1].y, labelWidth, this.fontHeight ] ]);
          } else {
            draw.highlight[feature.highlight].push([ 'fillRect', [ start - 1, bounds[0].y - 1, Math.max(labelWidth, width + 1) + 1, bounds[0].h + bounds[1].h ] ]);
          }
        } else {
          draw.highlight[feature.highlight].push([ 'fillRect', [ start - 1, bounds[0].y - 1, width + 2, bounds[0].h + 1] ]);
        }
      }
      
      height = Math.max(feature.bottom[scaleKey], height);
    }
    
    this.featuresHeight      = Math.max(height, this.fixedHeight ? Math.max(this.height, this.minLabelHeight) : 0);
    this.labelsHeight        = labelsHeight;
    this.fullHeight          = Math.max(height, this.initialHeight) + labelsHeight;
    this.heights.max         = Math.max(this.fullHeight, this.heights.max);
    this.heights.maxFeatures = Math.max(height, this.heights.maxFeatures);
    
    return draw;
  },
  
  makeImage: function (start, end, width, moved, cls) {
    var div   = this.imgContainer.clone().width(width).addClass(cls);
    var prev  = $(this.imgContainers).filter('.' + this.browser.scrollStart + ':' + (moved < 0 ? 'first' : 'last'));
    var image = new Genoverse.TrackImage({
      track       : this,
      container   : div,
      start       : start, 
      end         : end,
      width       : width,
      scaledStart : start * this.scale,
      background  : this.browser.colors.background
    });
    
    div.css('left', prev.length ? prev.position().left + (moved < 0 ? -this.width : prev.width()) : -this.browser.offsets.right);
    
    this.imgContainers[moved < 0 ? 'unshift' : 'push'](div[0]);
    this.container.append(this.imgContainers);
    
    var deferred = image.makeImage();
    
    this.getData(image, deferred);
    
    if (this.thresholdMessage) {
      this.thresholdMessage.draw(div);
    }
    
    div = prev = null;
    
    return deferred;
  },
  
  getData: function (image, deferred) {
    if (this.threshold && this.browser.length > this.threshold) {
      return this.draw(image, []);
    }
    
    var bounds   = { x: image.bufferedStart, y: 0, w: image.end - image.bufferedStart, h: 1 };
    var features = !this.url || (image.start >= this.dataRegion.start && image.end <= this.dataRegion.end) ? this.features.search(bounds) : false;
    
    if (features) {
      this.draw(image, features.sort(function (a, b) { return a.sort - b.sort; }));
    } else {
      $.ajax({
        url      : this.url,
        data     : this.getQueryString(image.bufferedStart, image.end),
        dataType : this.dataType,
        context  : this,
        xhrFields: this.xhrFields,
        success  : function (data) {
          this.dataRegion.start = Math.min(image.start, this.dataRegion.start);
          this.dataRegion.end   = Math.max(image.end,   this.dataRegion.end);
          try {
            this.draw(image, this.parseData(data, bounds));
          } catch (e) {
            this.showError(image, deferred, e + ' ' + e.fileName + ':' + e.lineNumber);
          }
          
          if (this.allData) {
            this.url = false;
          }
        },
        error: function (jqXHR, textStatus, errorThrown) {
          this.showError(image, deferred, errorThrown.message);
        }
      });
    }
  },
  
  showError: function (image, deferred, error) {
    if (!this.errorMessage) {
      this.errorMessage = this.browser.setTracks([{ type: 'Error', track: this }], this.browser.tracks.length)[0];
    }
    
    this.errorMessage.draw(this.imgContainers[0], error);
    deferred.resolve({ target: image.images, img: image }); 
  },
  
  getQueryString: function (start, end) {
    var chr      = this.browser.chr;
    var data     = {};
    var template = false;
        start    = this.allData ? 1 : Math.max(start, 1);
        end      = this.allData ? this.browser.chromosomeSize : Math.min(end, this.browser.chromosomeSize);
    
    $.each(this.urlTemplate, function (key, val) {
      data[key] = val.replace(/__CHR__/, chr).replace(/__START__/, start).replace(/__END__/, end);
      template  = true;
    });
    
    if (!template) {
      data = { chr: chr, start: start, end: end };
    }
    
    return $.extend(data, this.urlParams);
  },
  
  draw: function (image, features) {
    this.colorOrder  = [];
    this.decorations = {};

    image.draw(this.positionFeatures(this.scaleFeatures(features), image.scaledStart, image.width));
  },
  
  drawBackground: function (image, height) {
    var guideLines  = { major: [ this.browser.colors.majorGuideLine, this.browser.majorUnit ], minor: [ this.browser.colors.minorGuideLine, this.browser.minorUnit ] };
    var scaledStart = Math.round(image.scaledStart);
    var x;
    
    if (this.browser.backgrounds) {
      this.drawBackgroundColor(image, height, scaledStart);
    }
    
    for (var c in guideLines) {
      this.context.fillStyle = guideLines[c][0];
      
      for (x = Math.max(image.start - (image.start % guideLines[c][1]), 0); x < image.end + this.browser.minorUnit; x += guideLines[c][1]) {
        this.context.fillRect((this.browser.guideLines[c][x] || 0) - scaledStart, 0, 1, height);
      }
    }
  },
  
  drawBackgroundColor: function (image, height, scaledStart) {
    var backgrounds = this.browser.backgrounds;
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
  
  formatLabel: function (label) {
    var str = label.toString();
    
    if (this.minorUnit < 1000) {
      return str.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
    } else {
      var power = Math.floor((str.length - 1) / 3);
      var unit  = this.labelUnits[power];
      
      label /= Math.pow(10, power * 3);
      
      return Math.floor(label) + (unit === 'bp' ? '' : '.' + (label.toString().split('.')[1] || '').concat('00').substring(0, 2)) + ' ' + unit;
    }
  },
  
  populateMenu: function (feature) {
    return {
      title : feature.label || feature.id,
      Start : feature.start,
      End   : feature.end
    };
  },
  
  show: function () {
    this.hidden = false; 
    this.resize(this.initialHeight);
  },

  hide: function () {
    this.hidden = true; 
    this.resize(0);
  },


  beforeDraw          : $.noop, // decoration for the track, drawn before the features
  decorateFeatures    : $.noop, // decoration for the features
  afterDraw           : $.noop, // decoration for the track, drawn after the features
  systemEventHandlers : {}
}, {
  on: function (events, handler) {
    $.each(events.split(' '), function () {
      if (typeof Genoverse.Track.prototype.systemEventHandlers[this] === 'undefined') {
        Genoverse.Track.prototype.systemEventHandlers[this] = [];
      }
      
      Genoverse.Track.prototype.systemEventHandlers[this].push(handler);
    });
  }
});
