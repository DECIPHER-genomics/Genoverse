// FIXME: only first region highlighted from region select menu has bottom border
// TODO: stop flicker when new highlight is added
// TODO: add highlight this region link on feature menu, with different label (based on menu title if it exists)
// TODO: move shadeColor to View
// TODO: cycle through a group of colours for each new region highlighted

Genoverse.Track.HighlightRegion = Genoverse.Track.extend({
  id            : 'highlights',
  unsortable    : true,
  repeatLabels  : true,
  resizable     : false,
  border        : false,
  height        : 15,
  featureHeight : 2,
  order         : -1,
  orderReverse  : 9e99,
  controls      : 'off',
  color         : '#555',
  background    : '#DDD',
  labels        : 'separate',
  depth         : 1,
  featureMargin : { top: 13, right: 0, bottom: 0, left: 0 },
  margin        : 0,
  regions       : [],

  addRegion: function (region) {
    this.regions.push(region);
    this.model.init();
    this.reset();
  },

  getSettingsForLength: function () {
    return [ 0, { regions: this.regions }];
  },

  controller: Genoverse.Track.Controller.Stranded.extend({
    setDefaults: function () {
      if (this.prop('strand') === -1) {
        this.prop('labels', false);
        this.prop('border', false);
        this.prop('height', 2);
        this.prop('featureMargin').top = 0;
      }

      this.base();
    },

    setName: function (name) {
      if (this.prop('strand') === -1) {
        this.base('');
        this.minLabelHeight = 0;
        this.label.height(0);
      } else {
        this.base(name);
      }
    },

    makeImage: function (params) {
      if (this.prop('strand') === 1) {
        params.background = 'gv-full-height';
      }

      var rtn = this.base(params);
      params.container.addClass(params.background);
      return rtn;
    },

    render: function (features, img) {
      this.base(features, img);
      img.siblings('.gv-labels').css('top', this.prop('featureHeight') - this.prop('featureMargin').top);
    },

    renderBackground: function (f, img) {
      this.base(f, img);
      img.height(this.browser.wrapper.outerHeight(true));
    },

    click: $.noop
  }),

  model: Genoverse.Track.Model.Stranded.extend({
    url: false,

    insertFeature: function (feature) {
      feature.id         = feature.start + '-' + feature.end;
      feature.color      = feature.color      || this.prop('color');
      feature.background = feature.background || this.prop('background');

      this.base(feature);
    },

    getData: function (start, end) {
      this.receiveData(this.prop('regions'), start, end);
      return $.Deferred().resolveWith(this);
    },

    findFeatures: function () {
      return Genoverse.Track.Model.prototype.findFeatures.apply(this, arguments);
    }
  }),

  view: Genoverse.Track.View.extend({
    draw: function (features, featureContext, labelContext, scale) {
      if (this.prop('strand') === 1) {
        featureContext.fillStyle = '#FFF';
        featureContext.fillRect(0, 0, featureContext.canvas.width, featureContext.canvas.height);
      }

      this.base(features, featureContext, labelContext, scale);
    },

    drawBackground: function (features, context, params) {
      if (this.prop('strand') === -1) {
        return;
      }

      for (var i = 0; i < features.length; i++) {
        context.fillStyle = features[i].color;

        this.drawFeature($.extend(true, {}, features[i], {
          x           : features[i].position[params.scale].X,
          y           : 0,
          width       : features[i].position[params.scale].width,
          height      : context.canvas.height,
          color       : this.shadeColour(context.fillStyle, 0.8),
          border      : features[i].color,
          label       : false,
          decorations : true
        }), context, false, params.scale);
      }
    },

    decorateFeature: function (feature, context, scale) {
      var x1   = feature.x + 0.5;
      var x2   = x1 + feature.width;
      var draw = false;

      context.strokeStyle = feature.border;

      context.lineWidth   = 2;
      context.beginPath();

      if (x1 >= 0 && x1 <= this.width) {
        context.moveTo(x1, feature.y);
        context.lineTo(x1, feature.y + feature.height);
        draw = true;
      }

      if (x2 >= 0 && x2 <= this.width) {
        context.moveTo(x2, feature.y);
        context.lineTo(x2, feature.y + feature.height);
        draw = true;
      }

      if (draw) {
        context.stroke();
      }

      context.lineWidth = 1;
    },

    shadeColour: function (colour, percent) {
      var f = parseInt(colour.slice(1), 16);
      var R = f >> 16;
      var G = f >> 8 & 0x00FF;
      var B = f & 0x0000FF;

      return '#' + (
        0x1000000 +
        (Math.round((255 - R) * percent) + R) * 0x10000 +
        (Math.round((255 - G) * percent) + G) * 0x100 +
        (Math.round((255 - B) * percent) + B)
      ).toString(16).slice(1);
    }
  })
});