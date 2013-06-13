Genoverse.Track.Controller = Base.extend({
  scrollBuffer : 1.2,                  // number of widths, if left or right closer to the edges of viewpoint than the buffer, start making more images
  dataBuffer   : { start: 0, end: 0 }, // basepairs, extend data region for, when getting data from the origin

  constructor: function () {
    this.browser.wrapFunctions(this);
    
    this.imgRange    = {};
    this.scrollRange = {};
    this.dataLoading = []; // tracks incomplete requests for data
    this.order       = typeof this.order !== 'undefined' ? this.order : this.index;
    
    this.addDomElements();
    this.addUserEventHandlers();
    this.init();
  },

  init: function () { // FIXME: this should all be moved to model
    if (this.renderer) {
      this.featuresByRenderer   = {};
      this.featuresByIdRenderer = {};
      this.setRenderer(this.renderer, true);
    } else {
      this.dataRanges   = new RTree();
      this.features     = new RTree();
      this.featuresById = {};
    }
    
    this.scaleSettings = {};
  },
  
  reset: function () {
    this.resetImages();
    this.browser.closeMenus.call(this);
    
    if (this.url !== false) {
      this.init();
    }
  },
  
  resetImages: function () {
    this.imgRange    = {};
    this.scrollRange = {};
    this.scrollContainer.empty();
    this.resetImageRanges();
  },
  
  resetImageRanges: function () {
    this.left        = 0;
    this.scrollStart = 'ss_' + this.browser.start + '_' + this.browser.end;
    
    this.imgRange[this.scrollStart]    = this.imgRange[this.scrollStart]    || { left: this.width * -2, right: this.width * 2 };
    this.scrollRange[this.scrollStart] = this.scrollRange[this.scrollStart] || { start: this.browser.start - this.browser.length, end: this.browser.end + this.browser.length };
  },
  
  resetFeaturePositions: function () {
    this.scaleSettings    = {};
    this.featurePositions = new RTree();
    this.labelPositions   = this.labels === 'separate' ? new RTree() : this.featurePositions;
    
    for (var id in this.featuresById) {
      delete this.featuresById[id].position;
    }
  },
  
  rename: function (name) {
    this.name           = name;
    this.minLabelHeight = $('span.name', this.label).html(this.name).outerHeight(true);
    
    this.label.height(this.hidden ? 0 : Math.max(this.height, this.minLabelHeight));
  },
  
  addDomElements: function () {
    this.menus            = $();
    this.container        = $('<div class="track_container">').appendTo(this.browser.wrapper);
    this.scrollContainer  = $('<div class="scroll_container">').appendTo(this.container);
    this.imgContainer     = $('<div class="image_container">').width(this.width);
    this.messageContainer = $('<div class="message_container"><div class="messages"></div><span class="control collapse">&laquo;</span><span class="control expand">&raquo;</span></div>').appendTo(this.container);
    this.label            = $('<li>').appendTo(this.browser.labelContainer).height(this.height).data('track', this);
    this.context          = $('<canvas>')[0].getContext('2d');
    
    if (this.browser.trackBorder) {
      $('<div class="track_border">').appendTo(this.container);
    }
    
    if (this.unsortable) {
      this.label.addClass('unsortable');
    } else {
      $('<div class="handle">').appendTo(this.label);
    }
    
    this.minLabelHeight = $('<span class="name" title="' + (this.name || '') + '">' + (this.name || '') + '</span>').appendTo(this.label).outerHeight(true);
    
    var h = this.hidden ? 0 : Math.max(this.height, this.minLabelHeight);
    
    if (this.minLabelHeight) {
      this.label.height(h);
    }
    
    this.container.height(h);
  },
  
  addUserEventHandlers: function () {
    var track   = this;
    var browser = this.browser;
    
    this.container.on('mouseup', '.image_container', function (e) {
      if ((e.which && e.which !== 1) || browser.start !== browser.dragStart || (browser.dragAction === 'select' && browser.selector.outerWidth(true) > 2)) {
        return; // Only show menus on left click when not dragging and not selecting
      }
      
      track.click(e);
    });
    
    this.messageContainer.children().on('click', function () {
      var collapsed = track.messageContainer.children('.messages').is(':visible') ? ' collapsed' : '';
      track.messageContainer.attr('class', 'message_container' + collapsed);
      track.checkHeight();
    });
  },
  
  click: function (e) {
    var x = e.pageX - this.container.parent().offset().left + this.browser.scaledStart;
    var y = e.pageY - $(e.target).offset().top;
    var f = this[e.target.className === 'labels' ? 'labelPositions' : 'featurePositions'].search({ x: x, y: y, w: 1, h: 1 }).sort(function (a, b) { return a.sort - b.sort; })[0];
    
    if (f) {
      this.browser.makeMenu(f, e, this);
    }
  },
  
  // FIXME: messages are now hidden/shown instead of removed/added. This will cause a problem if a new message arrives with the same code as one that already exists.  
  showMessage: function (code, additionalText) {
    var messages = this.messageContainer.children('.messages');
    
    if (!messages.children('.' + code).show().length) {
      messages.prepend('<div class="msg ' + code + '">' + this.messages[code] + (additionalText || '') + '</div>');
      this.messageContainer.removeClass('collapsed');
    }
    
    var height = this.messageContainer.show().outerHeight(true);
    
    if (height > this.height) {
      this.resize(height);
    }
    
    messages = null;
  },
  
  hideMessage: function (code) {
    var messages = this.messageContainer.find('.msg');
    
    if (code) {
      if (!messages.filter('.' + code).hide().siblings().filter(function () { return this.style.display !== 'none'; }).length) {
        this.messageContainer.hide();
      }
    } else {
      messages.hide();
      this.messageContainer.hide();
    }
    
    messages = null;
  },
  
  checkHeight: function () {
    var autoHeight;
    
    if (this.threshold && this.browser.length > this.threshold) {
      autoHeight      = this.autoHeight;
      this.autoHeight = true;
      
      if (this.thresholdMessage) {
        this.showMessage('threshold', this.thresholdMessage);
        this.fullVisibleHeight = this.messageContainer.outerHeight(true);
      } else {
        this.fullVisibleHeight = 0;
      }
    } else {
      var bounds = { x: this.browser.scaledStart, w: this.width, y: 0, h: 9e99 };
      var scale  = this.scale;
      var height = Math.max.apply(Math, $.map(this.featurePositions.search(bounds), function (feature) { return feature.position[scale].bottom; }).concat(0));
      
      if (this.labels === 'separate') {
        this.labelTop = height;
        height += Math.max.apply(Math, $.map(this.labelPositions.search(bounds), function (feature) { return feature.position[scale].label.bottom; }).concat(0));
      }
      
      if (this.thresholdMessage) {
        this.hideMessage('threshold');
      }
      
      this.fullVisibleHeight = height || (this.messageContainer.is(':visible') ? this.messageContainer.outerHeight(true) : 0);
    }
    
    this.autoResize();
    
    if (typeof autoHeight !== 'undefined') {
      this.autoHeight = autoHeight;
    }
  },
  
  autoResize: function () {
    if (this.autoHeight || this.labels === 'separate') {
      this.resize(this[this.autoHeight ? 'fullVisibleHeight' : 'height'], this.labelTop);
    } else {
      this.toggleExpander();
    }
  },
  
  resize: function (height) {
    if (arguments[1] !== true && height < this.featureHeight) {
      height = 0;
    } else {
      height = this.hidden ? 0 : Math.max(height, this.minLabelHeight);
    }
    
    this.height = height;
    
    if (typeof arguments[1] === 'number') {
      this.imgContainers.children('.labels').css('top', arguments[1]);
    }
    
    this.container.add(this.label).height(height)[height ? 'show' : 'hide']();
    this.toggleExpander();
  },
  
  resetHeight: function () {
    if (this.resizable) {
      this.autoHeight = !!([ this.view.prototype.autoHeight, this.browser.autoHeight ].sort(function (a, b) {
        return (typeof a !== 'undefined' && a !== null ? 0 : 1) - (typeof b !== 'undefined' && b !== null ?  0 : 1);
      })[0]);
      
      this.resize(this.view.prototype.height + this.margin);
      this.initialHeight = this.height;
    }
  },
  
  toggleExpander: function () {
    if (!this.resizable) {
      return;
    }
    
    var track = this;
    
    // Note: this.fullVisibleHeight - this.featureMargin.top - this.featureMargin.bottom is not actually the correct value to test against, but it's the easiest best guess to obtain.
    // this.fullVisibleHeight is the maximum bottom position of the track's features in the region, which includes margin at the bottom of each feature and label
    // Therefore this.fullVisibleHeight includes this margin for the bottom-most feature.
    // The correct value (for a track using the default positionFeatures code) is:
    // this.fullVisibleHeight - ([there are labels in this region] ? (this.labels === 'separate' ? 0 : this.featureMargin.bottom + 1) + 2 : this.featureMargin.bottom)
    if (this.fullVisibleHeight - this.featureMargin.top - this.featureMargin.bottom > this.container.height()) {
      this.showMessage('resize');
      
      var height = this.messageContainer.outerHeight(true);
      
      if (height > this.height) {
        this.resize(height);
      }
      
      this.expander = (this.expander || $('<div class="expander static">').width(this.width).appendTo(this.container).on('click', function () {
        track.resize(track.fullVisibleHeight);
      }))[this.height === 0 ? 'hide' : 'show']();
    } else if (this.expander) {
      this.hideMessage('resize');
      this.expander.hide();
    }
  },
  
  setWidth: function (width) {
    this.width = width;
    this.imgContainer.width(width);
  },
  
  setScale: function () {
    var track = this;
    var featurePositions, labelPositions;
    
    this.scale = this.browser.scale;
    
    this.setModelView();
    this.resetImageRanges();
    
    if (this.renderer) {
      var renderer = this.getRenderer();
      
      if (renderer !== this.urlParams.renderer) {
        this.setRenderer(renderer);
      }
    }
    
    // Don't draw labels if the region is too big
    if (this.maxLabelRegion) {
      if (this.maxLabelRegion < this.browser.length) {
        this.labels = false;
      } else if (typeof this.view.prototype.labels !== 'undefined') {
        this.labels = this.view.prototype.labels;
      }
    }
    
    if (this.labels && this.labels !== 'overlay') {
      this.dataBuffer.start = Math.max(this.dataBuffer.start, this.browser.labelBuffer);
    }
    
    if (!this.scaleSettings[this.scale]) {
      featurePositions = featurePositions || new RTree();
      
      this.scaleSettings[this.scale] = {
        imgContainers    : $(),
        featurePositions : featurePositions,
        labelPositions   : this.labels === 'separate' ? labelPositions || new RTree() : featurePositions
      };
    }
    
    $.each(this.scaleSettings[this.scale], function (k, v) { track[k] = v; });
    
    this.hideMessage();
    
    if (this.scrollContainer.children().hide().filter('.' + this.scrollStart).show().length) {
      this.checkHeight();
    } else {
      this.scrollContainer.css('left', 0);
      this.makeFirstImage();
    }
  },
  
  setRenderer: function (renderer, permanent) {
    if (this.urlParams.renderer !== renderer) {
      this.urlParams.renderer = renderer;
      this.dataRanges         = new RTree();
      this.features           = (this.featuresByRenderer[renderer]   = this.featuresByRenderer[renderer]   || new RTree());
      this.featuresById       = (this.featuresByIdRenderer[renderer] = this.featuresByIdRenderer[renderer] || {});
    }
    
    if (permanent && this.renderer !== renderer) {
      this.renderer = renderer;
      this.reset();
      this.setScale();
    }
  },
  
  getRenderer: function () {
    return this.urlParams.renderer;
  },

  move: function (delta) {
    this.left += delta;
    this.scrollContainer.css('left', this.left);
    
    var scrollStart = this.scrollStart;
    
    if (this.imgRange[scrollStart].left + this.left > -this.scrollBuffer * this.width) {
      var end = this.scrollRange[scrollStart].start - 1;
      
      this.makeImage({
        scale : this.scale,
        start : end - this.browser.length + 1,
        end   : end,
        left  : this.imgRange[scrollStart].left,
        cls   : scrollStart
      });
      
      this.imgRange[scrollStart].left     -= this.width;
      this.scrollRange[scrollStart].start -= this.browser.length;
    }
    
    if (this.imgRange[scrollStart].right + this.left < this.scrollBuffer * this.width) {
      var start = this.scrollRange[scrollStart].end + 1;
      
      this.makeImage({
        scale : this.scale,
        start : start,
        end   : start + this.browser.length - 1,
        left  : this.imgRange[scrollStart].right,
        cls   : scrollStart
      });
      
      this.imgRange[scrollStart].right  += this.width;
      this.scrollRange[scrollStart].end += this.browser.length;
    }
  },
  
  moveTo: function (start, end, delta) {
    var scrollRange = this.scrollRange[this.scrollStart];
    var scrollStart = 'ss_' + start + '_' + end;
    
    if (this.scrollRange[scrollStart] || start > scrollRange.end || end < scrollRange.start) {
      this.resetImageRanges();
      
      if (!this.scrollContainer.css('left', 0).children().hide().filter('.' + scrollStart).show().length) {
        return this.makeFirstImage();
      }
    } else {
      this.move(typeof delta === 'number' ? delta : (start - this.browser.start) * this.scale);
    }
    
    this.checkHeight();
  },
  
  makeImage: function (params) {
    params.scaledStart   = params.scaledStart   || params.start * params.scale;
    params.width         = params.width         || this.width;
    params.height        = params.height        || this.height;
    params.featureHeight = params.featureHeight || 0;
    params.labelHeight   = params.labelHeight   || 0;
    
    var deferred;
    var tooLarge = this.threshold && this.threshold < this.browser.length;
    var div      = this.imgContainer.clone().addClass((params.cls + ' loading').replace('.', '_')).css({ left: params.left, display: params.cls === this.scrollStart ? 'block' : 'none' });
    var bgImage  = params.background ? $('<img class="bg">').hide().addClass(params.background).data(params).prependTo(div) : false;
    var image    = $('<img class="data">').hide().data(params).appendTo(div).on('load', function () {
      $(this).fadeIn('fast').parent().removeClass('loading');
      $(this).siblings('.bg').show();
    });
    
    params.container = div;
    
    this.imgContainers.push(div[0]);
    this.scrollContainer.append(this.imgContainers);
    
    if (!tooLarge && !this.checkDataRange(params.start, params.end)) {
      params.start -= this.dataBuffer.start;
      params.end   += this.dataBuffer.end;
      deferred      = this.getData(params.start, params.end);
    }

    if (!deferred) {
      deferred = $.Deferred();
      setTimeout($.proxy(deferred.resolve, this), 1); // This defer makes scrolling A LOT smoother, pushing render call to the end of the exec queue
    }
    
    return deferred.done(function () {
      var features = tooLarge ? [] : this.findFeatures(params.start, params.end);
      
      this.render(features, image);
      
      if (bgImage) {
        this.renderBackground(features, bgImage);
      }
    }).fail(function () { 
      // TODO: error handling here
    });
  },
  
  makeFirstImage: function () {
    var start   = this.browser.start;
    var end     = this.browser.end;
    var length  = this.browser.length;
    var scale   = this.scale;
    var cls     = this.scrollStart;
    var loading = this.imgContainer.clone().addClass('loading').prependTo(this.scrollContainer);
    
    function makeImages() {
      this.makeImage({ start: start, end: end, scale: scale, cls: cls, left: 0 });
      
      if (start > 1) {
        this.makeImage({ start: start - length, end: start - 1, scale: scale, cls: cls, left: -this.width });
      }
      
      if (end < this.browser.chromosomeSize) {
        this.makeImage({ start: end + 1, end: end + length, scale: scale, cls: cls, left: this.width });
      }
      
      loading.remove();
    }
    
    // FIXME: on zoom out, making more than 1 request
    if (this.threshold && this.threshold < length || this.checkDataRange(start, end)) {
      makeImages.call(this);
    } else {
      this.getData(start - this.dataBuffer.start - length, end + this.dataBuffer.end + length).done(makeImages);
    }
  },
  
  scaleFeatures: function (features, scale) {
    var add = Math.max(scale, 1);
    var feature;
    
    for (var i = 0; i < features.length; i++) {
      feature = features[i];
      
      if (!feature.position) {
        feature.position = {};
      }
      
      if (!feature.position[scale]) {
        feature.position[scale] = {
          start  : feature.start * scale,
          width  : (feature.end - feature.start) * scale + add,
          height : feature.height || this.featureHeight
        };
        
        if (feature.position[scale].width < this.minScaledWidth) {
          feature.position[scale].width = this.minScaledWidth;
        }
      }
    }
    
    return features;
  },
  
  positionFeatures: function (features, params) {
    for (var i = 0; i < features.length; i++) {
      this.positionFeature(features[i], params);
    }
    
    params.width         = Math.ceil(params.width);
    params.height        = Math.ceil(params.height);
    params.featureHeight = Math.max(Math.ceil(params.featureHeight), this.fixedHeight ? Math.max(this.height, this.minLabelHeight) : 0);
    params.labelHeight   = Math.ceil(params.labelHeight);
    
    return features;
  },
  
  positionFeature: function (feature, params) {
    var scale = params.scale;
    
    feature.position[scale].X = feature.position[scale].start - params.scaledStart; // FIXME: always have to reposition for X, in case a feature appears in 2 images. Pass scaledStart around instead?
    
    if (!feature.position[scale].positioned) {
      feature.position[scale].H = (feature.position[scale].height + this.featureMargin.top + this.featureMargin.bottom);
      feature.position[scale].W = feature.position[scale].width + (feature.marginRight || this.featureMargin.right);
      feature.position[scale].Y = (feature.y ? feature.y * (feature.position[scale].H + this.featureMargin.top + this.featureMargin.bottom) : this.top);
      
      if (feature.label) {
        if (typeof feature.label === 'string') {
          feature.label = feature.label.split('\n');
        }
        
        var context = this.context || $('<canvas>')[0].getContext('2d');
        
        feature.labelHeight = feature.labelHeight || (this.fontHeight + 2) * feature.label.length;
        feature.labelWidth  = feature.labelWidth  || Math.max.apply(Math, $.map(feature.label, function (l) { return Math.ceil(context.measureText(l).width); })) + 1;
        
        if (this.labels === true) {
          feature.position[scale].H += feature.labelHeight;
          feature.position[scale].W  = Math.max(feature.labelWidth, feature.position[scale].W);
        } else if (this.labels === 'separate' && !feature.position[scale].label) {
          feature.position[scale].label = {
            x: feature.position[scale].start,
            y: feature.position[scale].Y,
            w: feature.labelWidth,
            h: feature.labelHeight
          };
        }
      }
      
      var bounds = {
        x: feature.position[scale].start,
        y: feature.position[scale].Y,
        w: feature.position[scale].W,
        h: feature.position[scale].H
      };
      
      if (this.bump === true) {
        this.bumpFeature(bounds, feature, scale, this.scaleSettings[scale].featurePositions);
      }
      
      this.scaleSettings[scale].featurePositions.insert(bounds, feature);
      
      feature.position[scale].bottom = feature.position[scale].Y + feature.position[scale].H + this.margin;
      
      if (feature.position[scale].label) {
        var f = $.extend(true, {}, feature); // FIXME: hack to avoid changing feature.position[scale].Y in bumpFeature
        
        this.bumpFeature(feature.position[scale].label, f, scale, this.scaleSettings[scale].labelPositions);
        
        f.position[scale].label        = feature.position[scale].label;
        f.position[scale].label.bottom = f.position[scale].label.y + f.position[scale].label.h + this.margin;
        
        feature = f;
        
        this.scaleSettings[scale].labelPositions.insert(feature.position[scale].label, feature);
        
        params.labelHeight = Math.max(params.labelHeight, feature.position[scale].label.bottom);
      }
      
      feature.position[scale].positioned = true;
    }
    
    params.featureHeight = Math.max(params.featureHeight, feature.position[scale].bottom);
    params.height        = Math.max(params.height, params.featureHeight + params.labelHeight);
  },
  
  bumpFeature: function (bounds, feature, scale, tree) {
    var depth = 0;
    var bump;
    
    do {
      if (this.depth && ++depth >= this.depth) {
        if ($.grep(this.scaleSettings[scale].featurePositions.search(bounds), function (f) { return f.position[scale].visible !== false; }).length) {
          feature.position[scale].visible = false;
        }
        
        break;
      }
      
      bump = false;
      
      if ((tree.search(bounds)[0] || feature).id !== feature.id) {
        bounds.y += bounds.h;
        bump      = true;
      }
    } while (bump);
    
    feature.position[scale].Y = bounds.y;
  },
  
  render: function (features, img) {
    var params         = img.data();
        features       = this.positionFeatures(this.scaleFeatures(features, params.scale), params); // positionFeatures alters params.featureHeight, so this must happen before the canvases are created
    var featureCanvas  = $('<canvas>').attr({ width: params.width, height: params.featureHeight || 1 });
    var labelCanvas    = this.labels === 'separate' && params.labelHeight ? featureCanvas.clone().attr('height', params.labelHeight) : featureCanvas;
    var featureContext = featureCanvas[0].getContext('2d');
    var labelContext   = labelCanvas[0].getContext('2d');
    
    featureContext.font = labelContext.font = this.font;
    
    switch (this.labels) {
      case false     : break;
      case 'overlay' : labelContext.textAlign = 'center'; labelContext.textBaseline = 'middle'; break;
      default        : labelContext.textAlign = 'left';   labelContext.textBaseline = 'top';    break;
    }
    
    this.draw(features, featureContext, labelContext, params.scale);
    
    img.attr('src', featureCanvas[0].toDataURL());
    
    if (labelContext !== featureContext) {
      img.clone(true).attr({ 'class': 'labels', src: labelCanvas[0].toDataURL() }).insertAfter(img);
    }
    
    this.checkHeight();
    
    featureCanvas = labelCanvas = img = null;
  },
  
  renderBackground: function (features, img, height) {
    var canvas = $('<canvas>').attr({ width: this.width, height: height || 1 })[0];
    this.drawBackground(features, canvas.getContext('2d'), img.data());
    img.attr('src', canvas.toDataURL());
    canvas = img = null;
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
  
  showError: function (error) {
    console.log(arguments);
    this.showMessage('error', error);
  },
  
  receiveData: function (data, start, end) {
    this.setDataRange(start, end);
    
   // try {
      this.parseData(data, start, end);
    /*} catch (e) {
      this.showError(e);
    }*/
  },

  setDataRange: function (start, end) {
    if (this.allData) {
      start = 1;
      end   = this.browser.chromosomeSize;
    }
    
    this.dataRanges.insert({ x: start, w: end - start + 1, y: 0, h: 1 }, [ start, end ]);
  },
  
  checkDataRange: function (start, end) {
    start = Math.max(1, start);
    end   = Math.min(this.browser.chromosomeSize, end);
    
    var ranges = this.dataRanges.search({ x: start, w: end - start + 1, y: 0, h: 1 }).sort(function (a, b) { return a[0] - b[0]; });
    
    if (!ranges.length) {
      return false;
    }
    
    var s = ranges.length === 1 ? ranges[0][0] : 9e99;
    var e = ranges.length === 1 ? ranges[0][1] : -9e99;
    
    for (var i = 0; i < ranges.length - 1; i++) {
      // s0 <= s1 && ((e0 >= e1) || (e0 + 1 >= s1))
      if (ranges[i][0] <= ranges[i + 1][0] && ((ranges[i][1] >= ranges[i + 1][1]) || (ranges[i][1] + 1 >= ranges[i + 1][0]))) {
        s = Math.min(s, ranges[i][0]);
        e = Math.max(e, ranges[i + 1][1]);
      } else {
        return false;
      }
    }
    
    return start >= s && end <= e;
  },

  populateMenu: function (feature) {
    return feature;
  },
  
  show: function () {
    this.hidden = false;
    this.resize(this.initialHeight);
  },
  
  hide: function () {
    this.hidden = true;
    this.resize(0);
  },
  
  enable: function () {
    this.show();
    this.disabled = false;
    this.makeFirstImage();
  },
  
  disable: function () {
    this.hide();
    this.scrollContainer.css('left', 0);
    this.reset();
    this.disabled = true;
  },

  remove: function () {
    this.browser.removeTrack(this);
  },

  destroy: function () {
    this.container.add(this.label).add(this.menus).remove();
    
    for (var key in this) {
      delete this[key];
    }
  }
});