Genoverse.Track.HighlightRegion = Genoverse.Track.extend({
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
  featureMargin : { top: 13, right: 0, bottom: 0, left: 0 },
  margin        : 0,

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
    findFeatures: function () {
      return Genoverse.Track.Model.prototype.findFeatures.apply(this, arguments);
    }
  }),

  view: Genoverse.Track.View.extend({
    positionFeatures: function (originalFeatures, params) {
      if (this.prop('strand') === -1) {
        var scale    = params.scale;
        var features = $.extend(true, [], originalFeatures);
        var i        = features.length;

        while (i--) {
          delete features[i].position[scale].H;
          delete features[i].position[scale].Y;
          delete features[i].position[scale].bottom;
          delete features[i].position[scale].positioned;
        }

        return this.base(features, params);
      } else {
        return this.base(originalFeatures.reverse(), params);
      }
    },

    draw: function (features, featureContext, labelContext, scale) {
      if (this.prop('strand') === 1) {
        featureContext.fillStyle = '#FFF';
        featureContext.fillRect(0, 0, featureContext.canvas.width, featureContext.canvas.height);
      }

      this.base(features, featureContext, labelContext, scale);
    },

    drawBackground: function (features, context, params) {
      for (var i = 0; i < features.length; i++) {
        this.drawFeature($.extend({}, features[i], {
          x           : features[i].position[params.scale].X,
          y           : 0,
          width       : features[i].position[params.scale].width,
          height      : context.canvas.height,
          color       : this.prop('background'),
          label       : false,
          decorations : true
        }), context, false, params.scale);
      }
    },

    decorateFeature: function (feature, context, scale) {
      var x1 = feature.x + 0.5;
      var x2 = x1 + feature.width;

      context.strokeStyle = this.color;
      context.lineWidth   = 2;

      if (x1 >= 0 && x1 <= this.width) {
        context.moveTo(x1, feature.y);
        context.lineTo(x1, feature.y + feature.height);
      }

      if (x2 >= 0 && x2 <= this.width) {
        context.moveTo(x2, feature.y)
        context.lineTo(x2, feature.y + feature.height)
      }

      context.stroke();

      context.lineWidth = 1;
    }
  })
});