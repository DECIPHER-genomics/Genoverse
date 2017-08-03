Genoverse.Track.HighlightRegion = Genoverse.Track.extend({
  id               : 'highlights',
  unsortable       : true,
  fixedOrder       : true,
  repeatLabels     : true,
  resizable        : false,
  border           : false,
  alwaysReposition : true,
  height           : 15,
  featureHeight    : 2,
  order            : -1,
  orderReverse     : 9e99,
  controls         : 'off',
  colors           : [ '#777777', '#F08080', '#3CB371', '#6495ED', '#FFA500', '#9370DB' ],
  labels           : 'separate',
  depth            : 1,
  featureMargin    : { top: 13, right: 0, bottom: 0, left: 0 },
  margin           : 0,

  constructor: function () {
    this.colorIndex = 0;
    return this.base.apply(this, arguments);
  },

  addHighlights: function (highlights) {
    for (var i = 0; i < highlights.length; i++) {
      this.model.insertFeature($.extend({ label: (highlights[i].start + '-' + highlights[i].end) }, highlights[i]));
    }

    this.reset();
  },

  removeHighlights: function (highlights) {
    var featuresByChr = this.prop('featuresByChr');
    var featuresById  = this.prop('featuresById');
    var features, bounds, h;

    highlights = highlights || $.map(featuresById, function (f) { return f; });

    for (var i = 0; i < highlights.length; i++) {
      if (highlights[i].removable === false) {
        continue;
      }

      features = featuresByChr[highlights[i].chr];
      bounds   = { x: highlights[i].start, y: 0, w: highlights[i].end - highlights[i].start + 1, h: 1 };

      // RTree.remove only works if the second argument (the object to be removed) === the object found in the tree.
      // Here, while highlight is effectively the same object as the one in the tree, it has been cloned, so the === check fails.
      // To fix this, search for the feature to remove in the location of highlight.
      h = $.grep(features.search(bounds), function (item) { return item.id === highlights[i].id; });

      if (h.length) {
        features.remove(bounds, h[0]);
      }

      delete featuresById[highlights[i].id];
    }

    if (this.prop('strand') === 1) {
      this.prop('reverseTrack').removeHighlights(highlights);
    }

    this.reset();
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

    populateMenu: function (features) {
      var menu = [];
      var location, m;

      if (features.length > 1) {
        menu.push({ title: 'Highlights' });
      }

      for (var i = 0; i < features.length; i++) {
        location = features[i].start + '-' + features[i].end;
        m        = {
          title: features[i].label ? features[i].label[0] : location,
          start: false
        };

        m[m.title === location ? 'title' : 'Location'] = features[i].chr + ':' + location;
        m['<a class="gv-focus-highlight" href="#" data-chr="' + features[i].chr + '" data-start="' + features[i].start + '" data-end="' + features[i].end + '">Focus here</a>'] = '';

        if (features[i].removable !== false) {
          m['<a class="gv-remove-highlight"  href="#" data-id="' + features[i].id + '">Remove this highlight</a>'] = '';
          m['<a class="gv-remove-highlights" href="#">Remove all highlights</a>'] = '';
        }

        menu.push(m);
      }

      return menu;
    },

    click: function () {
      if (this.prop('strand') !== 1) {
        return;
      }

      var menuEl = this.base.apply(this, arguments);

      if (menuEl && !menuEl.data('highlightEvents')) {
        var track = this.track;

        menuEl.find('.gv-remove-highlight').on('click', function () {
          var id = $(this).data('id');
          track.removeHighlights($.grep(menuEl.data('feature'), function (f) { return f.id === id; }));
          return false;
        });

        menuEl.find('.gv-remove-highlights').on('click', function () {
          track.removeHighlights();
          return false;
        });

        menuEl.find('.gv-focus-highlight').on('click', function () {
          var data    = $(this).data();
          var length  = data.end - data.start + 1;
          var context = Math.max(Math.round(length / 4), 25);

          track.browser.moveTo(data.chr, data.start - context, data.end + context, true);

          return false;
        });

        menuEl.data('highlightEvents', true);
      }
    },

    getClickedFeatures: function (x, y, target) {
      var seen     = {};
      var scale    = this.scale;
      var features = $.grep(
        // feature positions
        this.featurePositions.search({ x: x, y: y, w: 1, h: 1 }).concat(
          // plus label positions where the labels are visible
          $.grep(this.labelPositions.search({ x: x, y: y, w: 1, h: 1 }), function (f) {
            return f.position[scale].label.visible !== false;
          })
        ), function (f) {
        // with duplicates removed
        var rtn = !seen[f.id];
        seen[f.id] = true;
        return rtn;
      });

      return features.length ? [ this.model.sortFeatures(features) ] : false;
    }
  }),

  model: Genoverse.Track.Model.Stranded.extend({
    url: false,

    insertFeature: function (feature) {
      feature.id   = feature.chr + ':' + feature.start + '-' + feature.end;
      feature.sort = feature.start;

      if (!feature.color) {
        var colors = this.prop('colors');
        var i      = this.prop('colorIndex');

        feature.color = colors[i++];

        this.prop('colorIndex', colors[i] ? i : 0);
      }

      if (!this.featuresById[feature.id]) {
        this.base(feature);
      }
    },

    findFeatures: function () {
      return Genoverse.Track.Model.prototype.findFeatures.apply(this, arguments);
    }
  }),

  view: Genoverse.Track.View.extend({
    positionFeatures: function (features, params) {
      var rtn = this.base.apply(this, arguments);

      // featureMargin.top gets used to define params.featureHeight, which is used to determine canvas height.
      // Since featureMargin.top = 13 on forward strand, the canvas has a 13px space at the bottom, meaning there is a gap before the background starts.
      // Reducing params.featureHeight here fixes that.
      params.featureHeight = Math.max(params.featureHeight - this.featureMargin.top, 0);

      return rtn;
    },

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
          color       : this.shadeColor(context.fillStyle, 0.8),
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
    }
  })
});
