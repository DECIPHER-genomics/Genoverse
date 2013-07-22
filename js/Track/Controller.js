Genoverse.Track.Controller = Base.extend({
  height       : 12,        // The height of the track_container div
  margin       : 2,         // The spacing between this track and the next
  scrollBuffer : 1.2,       // Number of widths, if left or right closer to the edges of viewpoint than the buffer, start making more images
  threshold    : Infinity,  // Length above which the track is not drawn
  resizable    : true,      // Is the track resizable - can be true, false or 'auto'. Auto means the track will automatically resize to show all features, but the user cannot resize it themselves.
  hidden       : false,     // Is the track hidden by default
  border       : true,      // Does the track have a bottom border
  name         : undefined, // Need to have name in the interface, as Function.name exists, so prop('name') will not work properly
  autoHeight   : undefined, // Does the track automatically resize so that all the features are visible
  messages     : {
    error     : 'ERROR: ',
    threshold : 'Data for this track is not displayed in regions greater than ',
    resize    : 'Some features are currently hidden, resize to see all'
  },
  
  constructor: function (properties) {
    $.extend(this, properties);
    Genoverse.wrapFunctions(this);
    
    this.setDefaults();
    this.init();
  },
  
  init: function () {
    this.imgRange    = {};
    this.scrollRange = {};
    
    this.addDomElements();
    this.addUserEventHandlers();
  },
  
  setDefaults: function () {
    this.defaultHeight     = this.height; // TODO: check if this is needed - could use this.constructor.prototype.height/autoHeight instead?
    this.defaultAutoHeight = this.autoHeight;
    this.autoHeight        = typeof this.autoHeight !== 'undefined' ? this.autoHeight : this.height === this.constructor.prototype.height ? this.browser.autoHeight : false;
    this.height           += this.margin;
    this.initialHeight     = this.height;
    
    if (this.hidden) {
      this.height = 0;
    }
    
    if (this.resizable === 'auto') {
      this.autoHeight = true;
    }
  },
  
  reset: function () {
    this.resetImages();
    this.browser.closeMenus.call(this);
    
    if (this.url !== false) {
      this.model.init();
    }
    
    this.view.init();
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
  
  rename: function (name) {
    this.name           = name;
    this.minLabelHeight = $('span.name', this.label).html(this.name).outerHeight(true);
    this.label.height(this.hidden ? 0 : Math.max(this.height, this.minLabelHeight));
  },
  
  addDomElements: function () {
    var name = this.name || '';
    
    this.menus            = $();
    this.container        = $('<div class="track_container">').appendTo(this.browser.wrapper);
    this.scrollContainer  = $('<div class="scroll_container">').appendTo(this.container);
    this.imgContainer     = $('<div class="image_container">').width(this.width);
    this.messageContainer = $('<div class="message_container"><div class="messages"></div><span class="control collapse">&laquo;</span><span class="control expand">&raquo;</span></div>').appendTo(this.container);
    this.label            = $('<li>').appendTo(this.browser.labelContainer).height(this.height).data('track', this.track);
    this.context          = $('<canvas>')[0].getContext('2d');
    
    if (this.border) {
      $('<div class="track_border">').appendTo(this.container);
    }
    
    if (this.prop('unsortable')) {
      this.label.addClass('unsortable');
    } else {
      $('<div class="handle">').appendTo(this.label);
    }
    
    this.minLabelHeight = $('<span class="name" title="' + name + '">' + name + '</span>').appendTo(this.label).outerHeight(true);
    
    var h = this.hidden ? 0 : Math.max(this.height, this.minLabelHeight);
    
    if (this.minLabelHeight) {
      this.label.height(h);
    }
    
    this.container.height(h);
  },
  
  addUserEventHandlers: function () {
    var controller = this;
    var browser    = this.browser;
    
    this.container.on('mouseup', '.image_container', function (e) {
      if ((e.which && e.which !== 1) || browser.start !== browser.dragStart || (browser.dragAction === 'select' && browser.selector.outerWidth(true) > 2)) {
        return; // Only show menus on left click when not dragging and not selecting
      }

      controller.click(e);
    });
    
    this.messageContainer.children().on('click', function () {
      var collapsed = controller.messageContainer.children('.messages').is(':visible') ? ' collapsed' : '';
      controller.messageContainer.attr('class', 'message_container' + collapsed);
      controller.checkHeight();
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
  
  showError: function (error) {
    this.showMessage('error', error);
  },
  
  checkHeight: function () {
    if (this.browser.length > this.threshold) {
      if (this.thresholdMessage) {
        this.showMessage('threshold', this.thresholdMessage);
        this.prop('fullVisibleHeight', Math.max(this.messageContainer.outerHeight(true), this.minLabelHeight));
      } else {
        this.prop('fullVisibleHeight', 0);
      }
    } else if (this.thresholdMessage) {
      this.hideMessage('threshold');
    }
    
    if (!this.resizable) {
      return;
    }
    
    var autoHeight;
    
    if (this.browser.length > this.threshold) {
      autoHeight = this.prop('autoHeight');
      this.prop('autoHeight', true);
    } else {
      var bounds = { x: this.browser.scaledStart, w: this.width, y: 0, h: 9e99 };
      var scale  = this.scale;
      var height = Math.max.apply(Math, $.map(this.featurePositions.search(bounds), function (feature) { return feature.position[scale].bottom; }).concat(0));
      
      if (this.prop('labels') === 'separate') {
        this.labelTop = height;
        height += Math.max.apply(Math, $.map(this.labelPositions.search(bounds), function (feature) { return feature.position[scale].label.bottom; }).concat(0));
      }
      
      this.prop('fullVisibleHeight', height || (this.messageContainer.is(':visible') ? this.messageContainer.outerHeight(true) : 0));
    }
    
    this.autoResize();
    
    if (typeof autoHeight !== 'undefined') {
      this.prop('autoHeight', autoHeight);
    }
  },
  
  autoResize: function () {
    var autoHeight = this.prop('autoHeight');
    
    if (autoHeight || this.prop('labels') === 'separate') {
      this.resize(autoHeight ? this.prop('fullVisibleHeight') : this.height, this.labelTop);
    } else {
      this.toggleExpander();
    }
  },
  
  resize: function (height) {
    height = this.setHeight.apply(this, arguments);
    
    if (typeof arguments[1] === 'number') {
      this.imgContainers.children('.labels').css('top', arguments[1]);
    }
    
    this.container.add(this.label).height(height)[height ? 'show' : 'hide']();
    this.toggleExpander();
  },
  
  setHeight: function (height) {
    if (arguments[1] !== true && height < this.prop('featureHeight')) {
      height = 0;
    } else {
      height = this.hidden ? 0 : Math.max(height, this.prop('minLabelHeight'));
    }
    
    this.height = height;
    
    return height;
  },
  
  resetHeight: function () {  
    if (this.resizable) {
      this.autoHeight = !!([ this.defaultAutoHeight, this.browser.autoHeight ].sort(function (a, b) {
        return (typeof a !== 'undefined' && a !== null ? 0 : 1) - (typeof b !== 'undefined' && b !== null ?  0 : 1);
      })[0]);
      
      this.resize(this.defaultHeight + this.prop('margin'));
      this.initialHeight = this.height;
    }
  },
  
  toggleExpander: function () {
    if (this.resizable !== true) {
      return;
    }
    
    // Note: fullVisibleHeight - featureMargin.top - featureMargin.bottom is not actually the correct value to test against, but it's the easiest best guess to obtain.
    // fullVisibleHeight is the maximum bottom position of the track's features in the region, which includes margin at the bottom of each feature and label
    // Therefore fullVisibleHeight includes this margin for the bottom-most feature.
    // The correct value (for a track using the default positionFeatures code) is:
    // fullVisibleHeight - ([there are labels in this region] ? (labels === 'separate' ? 0 : featureMargin.bottom + 1) + 2 : featureMargin.bottom)
    if (this.prop('fullVisibleHeight') - this.prop('featureMargin').top - this.prop('featureMargin').bottom > this.height) {
      this.showMessage('resize');
      
      var controller = this;
      var height     = this.messageContainer.outerHeight(true);
      
      if (height > this.height) {
        this.resize(height);
      }
      
      this.expander = (this.expander || $('<div class="expander static">').width(this.width).appendTo(this.container).on('click', function () {
        controller.resize(controller.prop('fullVisibleHeight'));
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
    var controller = this;
    
    this.scale = this.browser.scale;
    
    this.track.setMVC();
    this.resetImageRanges();
    
    var labels = this.prop('labels');
    
    if (labels && labels !== 'overlay') {
      this.model.setLabelBuffer(this.browser.labelBuffer);
    }
    
    if (this.threshold !== Infinity && this.resizable !== 'auto') {
      this.thresholdMessage = this.view.formatLabel(this.threshold);
    }
    
    $.each(this.view.setScaleSettings(this.scale), function (k, v) { controller[k] = v; });
    
    this.hideMessage();
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
      this.makeFirstImage(scrollStart);
    } else {
      this.move(typeof delta === 'number' ? delta : (start - this.browser.start) * this.scale);
      this.checkHeight();
    }
  },
  
  makeImage: function (params) {
    params.scaledStart   = params.scaledStart   || params.start * params.scale;
    params.width         = params.width         || this.width;
    params.height        = params.height        || this.height;
    params.featureHeight = params.featureHeight || 0;
    params.labelHeight   = params.labelHeight   || 0;
    
    var deferred;
    var controller = this;
    var tooLarge   = this.browser.length > this.threshold;
    var div        = this.imgContainer.clone().addClass((params.cls + ' loading').replace('.', '_')).css({ left: params.left, display: params.cls === this.scrollStart ? 'block' : 'none' });
    var bgImage    = params.background ? $('<img class="bg">').hide().addClass(params.background).data(params).prependTo(div) : false;
    var image      = $('<img class="data">').hide().data(params).appendTo(div).on('load', function () {
      $(this).fadeIn('fast').parent().removeClass('loading');
      $(this).siblings('.bg').show();
    });
    
    params.container = div;
    
    this.imgContainers.push(div[0]);
    this.scrollContainer.append(this.imgContainers);
    
    if (!tooLarge && !this.model.checkDataRange(params.start, params.end)) {
      var buffer = this.prop('dataBuffer');
      
      params.start -= buffer.start;
      params.end   += buffer.end;
      deferred      = this.model.getData(params.start, params.end);
    }
    
    if (!deferred) {
      deferred = $.Deferred();
      setTimeout($.proxy(deferred.resolve, this), 1); // This defer makes scrolling A LOT smoother, pushing render call to the end of the exec queue
    }
    
    return deferred.done(function () {
      var features = tooLarge ? [] : controller.model.findFeatures(params.start, params.end);
      controller.render(features, image);
      
      if (bgImage) {
        controller.renderBackground(features, bgImage);
      }
    }).fail(function (e) {
      controller.showError(e);
    });
  },
  
  makeFirstImage: function (moveTo) {
    if (this.scrollContainer.children().hide().filter('.' + (moveTo || this.scrollStart)).show().length) {
      if (moveTo) {
        this.scrollContainer.css('left', 0);
      }
      
      return this.checkHeight();
    }
    
    var controller = this;
    var start      = this.browser.start;
    var end        = this.browser.end;
    var length     = this.browser.length;
    var scale      = this.scale;
    var cls        = this.scrollStart;
    var images     = [{ start: start, end: end, scale: scale, cls: cls, left: 0 }];
    var left       = 0;
    var width      = this.width;
    
    if (start > 1) {
      images.push({ start: start - length, end: start - 1, scale: scale, cls: cls, left: -this.width });
      left   = -this.width;
      width += this.width;
    }
    
    if (end < this.browser.chromosomeSize) {
      images.push({ start: end + 1, end: end + length, scale: scale, cls: cls, left: this.width });
      width += this.width;
    }
    
    var loading = this.imgContainer.clone().addClass('loading').css({ left: left, width: width }).prependTo(this.scrollContainer.css('left', 0));
    
    function makeImages() {
      for (var i = 0; i < images.length; i++) {
        controller.makeImage(images[i]);
      }
      
      loading.remove();
    }
    
    // FIXME: on zoom out, making more than 1 request
    if (length > this.threshold || this.model.checkDataRange(start, end)) {
      makeImages();
    } else {
      var buffer = this.prop('dataBuffer');
      
      this.model.getData(start - buffer.start - length, end + buffer.end + length).done(makeImages).fail(function (e) {
        controller.showError(e);
      });
    }
  },
  
  render: function (features, img) {
    var params         = img.data();
        features       = this.view.positionFeatures(this.view.scaleFeatures(features, params.scale), params); // positionFeatures alters params.featureHeight, so this must happen before the canvases are created
    var featureCanvas  = $('<canvas>').attr({ width: params.width, height: params.featureHeight || 1 });
    var labelCanvas    = this.prop('labels') === 'separate' && params.labelHeight ? featureCanvas.clone().attr('height', params.labelHeight) : featureCanvas;
    var featureContext = featureCanvas[0].getContext('2d');
    var labelContext   = labelCanvas[0].getContext('2d');
    
    featureContext.font = labelContext.font = this.prop('font');
    
    switch (this.prop('labels')) {
      case false     : break;
      case 'overlay' : labelContext.textAlign = 'center'; labelContext.textBaseline = 'middle'; break;
      default        : labelContext.textAlign = 'left';   labelContext.textBaseline = 'top';    break;
    }
    
    this.view.draw(features, featureContext, labelContext, params.scale);
    
    img.attr('src', featureCanvas[0].toDataURL());
    
    if (labelContext !== featureContext) {
      img.clone(true).attr({ 'class': 'labels', src: labelCanvas[0].toDataURL() }).insertAfter(img);
    }
    
    this.checkHeight();
    
    featureCanvas = labelCanvas = img = null;
  },
  
  renderBackground: function (features, img, height) {
    var canvas = $('<canvas>').attr({ width: this.width, height: height || 1 })[0];
    this.view.drawBackground(features, canvas.getContext('2d'), img.data());
    img.attr('src', canvas.toDataURL());
    canvas = img = null;
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
  
  destroy: function () {
    this.container.add(this.label).add(this.menus).remove();
  }
});