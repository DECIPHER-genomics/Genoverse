import Base          from 'basejs';
import wrapFunctions from 'js/wrap-functions';

export default Base.extend({
  scrollBuffer   : 1.2,      // Number of widths, if left or right closer to the edges of viewpoint than the buffer, start making more images
  threshold      : Infinity, // Length above which the track is not drawn
  clickTolerance : 0,        // pixels of tolerance added to a click position when finding features for popup menus, when scale < 1
  messages       : undefined,

  constructor: function (properties) {
    Object.assign(this, properties);
    wrapFunctions(this, 'Controller');
    this.init();
  },

  init: function () {
    this.setDefaults();
    this.addDomElements();
    this.addUserEventHandlers();

    this.deferreds = []; // tracks deferreds so they can be stopped if the track is destroyed
  },

  setDefaults: function () {
    this.imgRange    = {};
    this.scrollRange = {};
    this.messages    = this.messages || {
      error     : 'ERROR: ',
      threshold : 'Data for this track is not displayed in regions greater than ',
      resize    : 'Some features are currently hidden, <a class="gv-resize">resize to see all</a>',
    };
  },

  reset: function (arg) {
    this.abort();
    this.setDefaults();
    this.resetImages();
    this.browser.closeMenus(this);

    if (arg !== 'resizing') {
      this.setScale();
      this.makeFirstImage();
    }
  },

  resetImages: function () {
    this.scrollContainer.empty();
    this.resetImageRanges();
  },

  resetImageRanges: function () {
    const browser = this.browser;

    this.left        = 0;
    this.scrollStart = [ 'ss', browser.chr, browser.start, browser.end ].join('-');

    this.imgRange[this.scrollStart]    = this.imgRange[this.scrollStart]    || { left: this.width * -2, right: this.width * 2 };
    this.scrollRange[this.scrollStart] = this.scrollRange[this.scrollStart] || { start: Math.max(browser.start - browser.length, 1), end: Math.min(browser.end + browser.length, browser.chromosomeSize) };
  },

  setName: function (name, configName) {
    this.track.name = name;
    this.labelName  = this.labelName || $('<span class="gv-name">').appendTo(this.label);

    this.labelName.attr('title', name).html(
      configName && configName.length
        ? configName.map(part => `<span class="gv-name-part">${part}</span>`)
        : name
    );

    this.minLabelHeight = this.label.parents('body').length ? Math.max(this.labelName.outerHeight(true), this.labelName.outerHeight()) : 0;

    this.setLabelHeight(true);

    if (name && !this.track._constructing && this.track.height < this.minLabelHeight) {
      this.resize(this.minLabelHeight);
    }
  },

  addDomElements: function () {
    const name = this.track.name || '';

    this.menus            = $();
    this.container        = $('<div class="gv-track-container">').appendTo(this.browser.wrapper);
    this.scrollContainer  = $('<div class="gv-scroll-container">').appendTo(this.container);
    this.imgContainer     = $('<div class="gv-image-container">').width(this.width).addClass(this.prop('invert') ? 'gv-invert' : '');
    this.label            = $('<li>').appendTo(this.browser.labelContainer).height(this.prop('height')).data('track', this.track);
    this.context          = $('<canvas>')[0].getContext('2d');
    this.messageContainer = $(`
      <div class="gv-message-container">
        <div class="gv-messages"></div>
        <i class="gv-control gv-collapse fas fa-angle-double-left"></i>
        <i class="gv-control gv-expand fas fa-angle-double-right"></i>
      </div>
    `).appendTo(this.container);

    if (this.prop('border')) {
      $('<div class="gv-track-border">').appendTo(this.container);
    }

    if (this.prop('unsortable')) {
      this.label.addClass('gv-unsortable');
    } else {
      $('<div class="gv-handle">').appendTo(this.label);
    }

    if (this.prop('children')) {
      this.superContainer = $('<div class="gv-track-container gv-track-super-container">').insertAfter(this.container);
      this.container.appendTo(this.superContainer);
    } else if (this.prop('parentTrack')) {
      this.superContainer = this.prop('parentTrack').prop('superContainer');

      this.container.appendTo(this.superContainer);
      this.label.remove();

      this.label = this.prop('parentTrack').prop('label');
    }

    this.setName(name, this.track.configName);

    this.container.height(this.prop('disabled') ? 0 : Math.max(this.prop('height'), this.minLabelHeight));
  },

  addUserEventHandlers: function () {
    const controller = this;
    const browser    = this.browser;

    this.container.on('mouseup', '.gv-image-container', (e) => {
      if ((e.which && e.which !== 1) || (typeof browser.dragStart === 'number' && browser.start !== browser.dragStart) || (browser.dragAction === 'select' && browser.selector.outerWidth(true) > 2)) {
        return; // Only show menus on left click when not dragging and not selecting
      }

      controller.click(e);
    });

    this.messageContainer.children().on('click', () => {
      const collapsed = controller.messageContainer.children('.gv-messages').is(':visible') ? ' gv-collapsed' : '';
      const code      = controller.messageContainer.find('.gv-msg').data('code');

      controller.messageContainer.attr('class', `gv-message-container${collapsed}`);
      controller.checkHeight();

      if (code !== 'error') {
        document.cookie = `gv_msg_${code}_${controller.prop('id')}=1; expires=${collapsed ? 'Tue, 19 Jan 2038' : 'Thu, 01 Jan 1970'} 00:00:00 GMT; path=/`;
      }
    });
  },

  click: function (e) {
    const target = $(e.target);
    const x      = e.pageX - this.container.parent().offset().left + this.browser.scaledStart;

    let y = e.pageY - target.offset().top;

    if (this.imgContainer.hasClass('gv-invert')) {
      y = target.height() - y;
    }

    return this.browser.makeMenu(this.getClickedFeatures(x, y, target), e, this.track);
  },

  getClickedFeatures: function (x, y, target) {
    const bounds    = { x: x, y: y, w: 1, h: 1 };
    const scale     = this.scale;
    const tolerance = scale < 1 ? this.clickTolerance : 0;

    if (tolerance) {
      bounds.x -= tolerance / 2;
      bounds.w += tolerance;
    }

    const features = this[target && target.hasClass('gv-labels') ? 'labelPositions' : 'featurePositions'].search(bounds);

    if (tolerance) {
      return features.filter(
        (f) => {
          const featureBounds = f.position[scale].bounds;
          const center        = featureBounds.x + (featureBounds.w / 2);
          const minX          = Math.min(featureBounds.x,                   center - (tolerance / 2));
          const maxX          = Math.max(featureBounds.x + featureBounds.w, center + (tolerance / 2));

          return x >= minX && x <= maxX;
        }
      ).sort(
        (a, b) => Math.abs(a.position[scale].start - x) - Math.abs(b.position[scale].start - x)
      );
    }

    return this.model.sortFeatures(features);
  },

  // FIXME: messages are now hidden/shown instead of removed/added. This will cause a problem if a new message arrives with the same code as one that already exists.
  showMessage: function (code, additionalText) {
    let messages = this.messageContainer.children('.gv-messages');

    if (!messages.children(`.gv-${code}`).show().length) {
      const msg = $(`<div class="gv-msg gv-${code}">${this.messages[code]}${additionalText || ''}</div>`).data('code', code).prependTo(messages);

      if (code === 'resize') {
        const controller = this;

        msg.children('a.gv-resize').on('click', () => {
          controller.resize(controller.fullVisibleHeight);
        });
      }

      this.messageContainer[document.cookie.match(`${[ 'gv_msg', code, this.prop('id') ].join('_')}=1`) ? 'addClass' : 'removeClass']('gv-collapsed');
    }

    const height = this.messageContainer.show().outerHeight(true);

    if (height > this.prop('height')) {
      this.resize(height, undefined, false);
    }

    messages = null;
  },

  hideMessage: function (code) {
    let messages = this.messageContainer.find('.gv-msg');

    if (code) {
      messages = messages.filter(`.gv-${code}`).hide();

      if (messages.length && !messages.siblings().filter(function () { return this.style.display !== 'none'; }).length) {
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
        this.fullVisibleHeight = Math.max(this.messageContainer.outerHeight(true), this.minLabelHeight);
      } else {
        this.fullVisibleHeight = 0;
      }
    } else if (this.thresholdMessage) {
      this.hideMessage('threshold');
    }

    if (!this.prop('resizable')) {
      return;
    }

    let autoHeight;

    if (this.browser.length > this.threshold) {
      autoHeight = this.prop('autoHeight');
      this.prop('autoHeight', true);
    } else {
      this.fullVisibleHeight = this.visibleFeatureHeight() || (this.messageContainer.is(':visible') ? this.messageContainer.outerHeight(true) : this.prop('hideEmpty') ? 0 : this.minLabelHeight);
    }

    this.autoResize();

    if (typeof autoHeight !== 'undefined') {
      this.prop('autoHeight', autoHeight);
    }
  },

  visibleFeatureHeight: function () {
    const bounds    = { x: this.browser.scaledStart, w: this.width, y: 0, h: 9e99 };
    const scale     = this.scale;
    const features  = this.featurePositions.search(bounds);
    const minHeight = this.prop('hideEmpty') ? 0 : this.minLabelHeight;

    let height = Math.max(...features.map(feature => feature.position[scale].bottom).concat(minHeight));

    if (this.prop('labels') === 'separate') {
      this.labelTop = height;
      height       += Math.max(...this.labelPositions.search(bounds).concat(this.prop('repeatLabels') ? features : []).map(feature => feature.position[scale].label.bottom).concat(minHeight));
    }

    return height;
  },

  autoResize: function () {
    const autoHeight = this.prop('autoHeight');

    if (autoHeight || this.prop('labels') === 'separate') {
      this.resize(autoHeight ? this.fullVisibleHeight : this.prop('height'), this.labelTop, false);
    } else {
      this.toggleExpander(false);
    }
  },

  resize: function (height, arg, saveConfig) {
    height = this.track.setHeight(height, arg);

    if (typeof arg === 'number') {
      this.imgContainers.children('.gv-labels').css('top', arg);
    }

    this.container.height(height)[height ? 'show' : 'hide']();
    this.setLabelHeight();
    this.toggleExpander();

    if (saveConfig !== false) {
      this.browser.saveConfig();
    }
  },

  toggleExpander: function (saveConfig) {
    if (this.prop('resizable') !== true) {
      return;
    }

    const featureMargin = this.prop('featureMargin');
    const height        = this.prop('height');

    // Note: fullVisibleHeight - featureMargin.top - featureMargin.bottom is not actually the correct value to test against, but it's the easiest best guess to obtain.
    // fullVisibleHeight is the maximum bottom position of the track's features in the region, which includes margin at the bottom of each feature and label
    // Therefore fullVisibleHeight includes this margin for the bottom-most feature.
    // The correct value (for a track using the default positionFeatures code) is:
    // fullVisibleHeight - ([there are labels in this region] ? (labels === 'separate' ? 0 : featureMargin.bottom + 1) + 2 : featureMargin.bottom)
    if (this.fullVisibleHeight - featureMargin.top - featureMargin.bottom > height && !this.prop('disabled')) {
      this.showMessage('resize');

      const controller = this;
      const h          = this.messageContainer.outerHeight(true);

      if (h > height) {
        this.resize(h, undefined, saveConfig);
      }

      this.expander = (this.expander || $('<div class="gv-expander gv-static">').width(this.width).appendTo(this.container).on('click', () => {
        controller.resize(controller.fullVisibleHeight);
      }))[this.prop('height') === 0 ? 'hide' : 'show']();
    } else if (this.expander) {
      this.hideMessage('resize');
      this.expander.hide();
    }
  },

  setLabelHeight: function (enforceMinHeight) {
    const parent = this.prop('parentTrack');

    if (parent) {
      parent.controller.setLabelHeight();

      return;
    }

    const tracks = [ this ].concat(this.prop('childTracks') || []);
    const height = tracks.reduce((h, track) => h + (track.prop('disabled') ? 0 : track.prop('height')), 0);

    this.label.height(this.prop('disabled') ? 0 : enforceMinHeight && this.minLabelHeight ? Math.max(height, this.minLabelHeight) : height);

    if (tracks.length > 1) {
      let top = tracks[0].prop('height');

      tracks.slice(1).forEach((track) => {
        const h = track.prop('height');

        track.prop('labelName').css('top', top)[h ? 'removeClass' : 'addClass']('gv-hide');
        top += h;
      });
    }
  },

  setWidth: function (width) {
    const track = this.track;

    [ this, track, track.model, track.view ].forEach((obj) => { obj.width = width; });

    this.imgContainer.add(this.expander).width(width);
  },

  setScale: function () {
    const controller = this;

    this.scale = this.browser.scale;

    this.track.setMVC();
    this.resetImageRanges();

    const labels = this.prop('labels');

    if (labels && labels !== 'overlay') {
      this.model.setLabelBuffer(this.browser.labelBuffer);
    }

    if (this.threshold !== Infinity && this.prop('resizable') !== 'auto') {
      this.thresholdMessage = this.view.formatLabel(this.threshold);
    }

    Object.entries(this.view.setScaleSettings(this.scale)).forEach(
      ([ key, value ]) => { controller[key] = value; }
    );

    this.hideMessage();
  },

  move: function (delta) {
    this.left += delta;
    this.scrollContainer.css('left', this.left);

    const scrollStart = this.scrollStart;

    if (this.imgRange[scrollStart] && this.imgRange[scrollStart].left + this.left > -this.scrollBuffer * this.width) {
      const end = this.scrollRange[scrollStart].start - 1;

      this.makeImage({
        scale : this.scale,
        chr   : this.browser.chr,
        start : end - this.browser.length + 1,
        end   : end,
        left  : this.imgRange[scrollStart].left,
        cls   : scrollStart,
      });

      (this.imgRange[scrollStart]    || {}).left  -= this.width;
      (this.scrollRange[scrollStart] || {}).start -= this.browser.length;
    }

    if (this.imgRange[scrollStart] && this.imgRange[scrollStart].right + this.left < this.scrollBuffer * this.width) {
      const start = this.scrollRange[scrollStart].end + 1;

      this.makeImage({
        scale : this.scale,
        chr   : this.browser.chr,
        start : start,
        end   : start + this.browser.length - 1,
        left  : this.imgRange[scrollStart].right,
        cls   : scrollStart,
      });

      (this.imgRange[scrollStart]    || {}).right += this.width;
      (this.scrollRange[scrollStart] || {}).end   += this.browser.length;
    }
  },

  moveTo: function (chr, start, end, delta) {
    const scrollRange = this.scrollRange[this.scrollStart];
    const scrollStart = [ 'ss', chr, start, end ].join('-');

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
    params.height        = params.height        || this.prop('height');
    params.featureHeight = params.featureHeight || 0;
    params.labelHeight   = params.labelHeight   || 0;

    const controller = this;
    const tooLarge   = this.browser.length > this.threshold;
    const div        = this.imgContainer.clone().addClass((`${params.cls} gv-loading`).replace('.', '_')).css({ left: params.left, display: params.cls === this.scrollStart ? 'block' : 'none' });
    const bgImage    = params.background ? $('<img class="gv-bg">').hide().addClass(params.background).data(params).prependTo(div) : false;
    const image      = $('<img class="gv-data">').hide().data(params).appendTo(div).on('load', function () {
      $(this).fadeIn('fast').parent().removeClass('gv-loading');
      $(this).siblings('.gv-bg').show();
    });

    let deferred;

    params.container = div;

    this.imgContainers.push(div[0]);
    this.scrollContainer.append(this.imgContainers);

    if (!tooLarge && !this.model.checkDataRange(params.chr, params.start, params.end)) {
      const buffer = this.prop('dataBuffer');

      params.start -= buffer.start;
      params.end   += buffer.end;
      deferred      = this.model.getData(params.chr, params.start, params.end);
    }

    if (!deferred) {
      deferred = $.Deferred();
      setTimeout(deferred.resolve.bind(this), 1); // This defer makes scrolling A LOT smoother, pushing render call to the end of the exec queue
    }

    this.deferreds.push(deferred);

    return deferred.done(
      () => {
        const features = tooLarge ? [] : controller.model.findFeatures(params.chr, params.start, params.end);

        controller.render(features, image);

        if (bgImage) {
          controller.renderBackground(features, bgImage);
        }
      }
    ).fail(
      (e) => { controller.showError(e); }
    );
  },

  makeFirstImage: function (moveTo) {
    const deferred = $.Deferred();

    if (this.scrollContainer.children().hide().filter(`.${moveTo || this.scrollStart}`).show().length) {
      this.scrollContainer.css('left', 0);
      this.checkHeight();

      return deferred.resolve();
    }

    const controller = this;
    const chr        = this.browser.chr;
    const start      = this.browser.start;
    const end        = this.browser.end;
    const length     = this.browser.length;
    const scale      = this.scale;
    const cls        = this.scrollStart;
    const images     = [{ chr: chr, start: start, end: end, scale: scale, cls: cls, left: 0 }];

    let left  = 0;
    let width = this.width;

    if (!this.browser.isStatic) {
      if (start > 1) {
        images.push({ chr: chr, start: start - length, end: start - 1, scale: scale, cls: cls, left: -this.width });
        left   = -this.width;
        width += this.width;
      }

      if (end < this.browser.getChromosomeSize(chr)) {
        images.push({ chr: chr, start: end + 1, end: end + length, scale: scale, cls: cls, left: this.width });
        width += this.width;
      }
    }

    const loading = this.imgContainer.clone().addClass('gv-loading').css({ left: left, width: width }).prependTo(this.scrollContainer.css('left', 0));

    function makeImages() {
      $.when(...images.map(image => controller.makeImage(image))).done(deferred.resolve);

      loading.remove();
    }

    if (length > this.threshold || this.model.checkDataRange(chr, start, end)) {
      makeImages();
    } else {
      const buffer = this.prop('dataBuffer');

      this.model.getData(chr, start - buffer.start - length, end + buffer.end + length).done(makeImages).fail((e) => {
        controller.showError(e);
      });
    }

    return deferred;
  },

  render: function (features, img) {
    const params = img.data();

    // positionFeatures alters params.featureHeight, so this must happen before the canvases are created
    features = this.view.positionFeatures(this.view.scaleFeatures(features, params.scale), params);

    const featureCanvas = $('<canvas>').attr({ width: params.width, height: params.featureHeight || 1 });
    const labelCanvas   = this.prop('labels') === 'separate' && params.labelHeight ? featureCanvas.clone().attr('height', params.labelHeight) : featureCanvas;

    const featureContext = featureCanvas[0].getContext('2d');
    const labelContext   = labelCanvas[0].getContext('2d');

    featureContext.font = labelContext.font = this.prop('font');

    switch (this.prop('labels')) {
      case false: break;
      case 'overlay':
        labelContext.textAlign    = 'center';
        labelContext.textBaseline = 'middle';

        break;
      default:
        labelContext.textAlign    = 'left';
        labelContext.textBaseline = 'top';

        break;
    }

    this.view.draw(features, featureContext, labelContext, params.scale);

    img.attr('src', featureCanvas[0].toDataURL());

    if (labelContext !== featureContext) {
      img.clone(true).attr({ 'class': 'gv-labels', src: labelCanvas[0].toDataURL() }).insertAfter(img);
    }

    this.checkHeight();
  },

  renderBackground: function (features, img, height) {
    const canvas = $('<canvas>').attr({ width: this.width, height: height || 1 })[0];

    this.view.drawBackground(features, canvas.getContext('2d'), img.data());
    img.attr('src', canvas.toDataURL());
  },

  populateMenu: function (feature) {
    const title = feature.label ? feature.label[0] : feature.id;

    return {
      title    : title,
      Location : `${feature.chr}:${feature.start}-${feature.end}`,
      ...Object.entries(feature).reduce(
        (acc, [ key, value ]) => {
          if (typeof value === 'object' || value === title || [ 'chr', 'start', 'end', 'sort' ].includes(key)) {
            return acc;
          }

          return Object.assign(acc, { [key]: value });
        },
        {}
      ),
    };
  },

  abort: function () {
    this.deferreds.forEach(
      (deferred) => {
        if (deferred.state() === 'pending') {
          deferred.reject();
        }
      }
    );

    this.deferreds = [];
  },

  destroy: function () {
    this.abort();
    this.container.add(this.label).add(this.menus).remove();
  },
});
