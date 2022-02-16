import Track, { Model, View } from '../../Track';
import StrandedController     from '../Controller/Stranded';
import StrandedModel          from '../Model/Stranded';

export default Track.extend({
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

  constructor: function (...args) {
    this.colorIndex = 0;

    return this.base(...args);
  },

  addHighlights: function (highlights) {
    highlights.forEach(
      highlight => this.model.insertFeature({ label: `${highlight.start}-${highlight.end}`, ...highlight })
    );

    this.reset();
  },

  removeHighlights: function (highlights) {
    const featuresByChr = this.prop('featuresByChr');
    const featuresById  = this.prop('featuresById');

    highlights = highlights || Object.values(featuresById);

    highlights.forEach(
      (highlight) => {
        if (highlight.removable === false) {
          return;
        }

        const features = featuresByChr[highlight.chr];
        const bounds   = { x: highlight.start, y: 0, w: highlight.end - highlight.start + 1, h: 1 };

        // RTree.remove only works if the second argument (the object to be removed) === the object found in the tree.
        // Here, while highlight is effectively the same object as the one in the tree, it has been cloned, so the === check fails.
        // To fix this, search for the feature to remove in the location of highlight.
        const h = features.search(bounds).filter(item => item.id === highlight.id);

        if (h.length) {
          features.remove(bounds, h[0]);
        }

        delete featuresById[highlight.id];
      }
    );

    if (this.prop('strand') === 1) {
      this.prop('reverseTrack').removeHighlights(highlights);
    }

    this.reset();
  },

  controller: StrandedController.extend({
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

      const rtn = this.base(params);

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
      const menu = [];

      if (features.length > 1) {
        menu.push({ title: 'Highlights' });
      }

      features.forEach(
        (feature) => {
          const location = `${feature.start}-${feature.end}`;
          const m        = {
            title : feature.label ? feature.label[0] : location,
            start : false,
          };

          m[m.title === location ? 'title' : 'Location']                                                                                               = `${feature.chr}:${location}`;
          m[`<a class="gv-focus-highlight" href="#" data-chr="${feature.chr}" data-start="${feature.start}" data-end="${feature.end}">Focus here</a>`] = '';

          if (feature.removable !== false) {
            m[`<a class="gv-remove-highlight"  href="#" data-id="${feature.id}">Remove this highlight</a>`] = '';
            m['<a class="gv-remove-highlights" href="#">Remove all highlights</a>']                         = '';
          }

          menu.push(m);
        }
      );

      return menu;
    },

    click: function (...args) {
      if (this.prop('strand') !== 1) {
        return;
      }

      const menuEl = this.base(...args);

      if (menuEl && !menuEl.data('highlightEvents')) {
        const track = this.track;

        menuEl.find('.gv-remove-highlight').on('click', function () {
          const id = $(this).data('id');

          track.removeHighlights(menuEl.data('feature').filter(f => f.id === id));

          return false;
        });

        menuEl.find('.gv-remove-highlights').on('click', () => {
          track.removeHighlights();

          return false;
        });

        menuEl.find('.gv-focus-highlight').on('click', function () {
          const data    = $(this).data();
          const length  = data.end - data.start + 1;
          const context = Math.max(Math.round(length / 4), 25);

          track.browser.moveTo(data.chr, data.start - context, data.end + context, true);

          return false;
        });

        menuEl.data('highlightEvents', true);
      }
    },

    getClickedFeatures: function (x, y) {
      const seen     = {};
      const scale    = this.scale;
      const features =
      this.featurePositions.search({ x: x, y: y, w: 1, h: 1 }).concat( // feature positions
        this.labelPositions.search({ x: x, y: y, w: 1, h: 1 }).filter(// plus label positions where the labels are visible
          f => f.position[scale].label.visible !== false
        )
      ).filter(
        (f) => {
          // with duplicates removed
          const rtn = !seen[f.id];

          seen[f.id] = true;

          return rtn;
        }
      );

      return features.length ? [ this.model.sortFeatures(features) ] : false;
    },
  }),

  model: StrandedModel.extend({
    url: false,

    insertFeature: function (feature) {
      feature.id   = `${feature.chr}:${feature.start}-${feature.end}`;
      feature.sort = feature.start;

      if (!feature.color) {
        const colors = this.prop('colors');

        let i = this.prop('colorIndex');

        feature.color = colors[i++];

        this.prop('colorIndex', colors[i] ? i : 0);
      }

      if (!this.featuresById[feature.id]) {
        this.base(feature);
      }
    },

    findFeatures: function (...args) {
      return Model.prototype.findFeatures.call(this, ...args);
    },
  }),

  view: View.extend({
    positionFeatures: function (features, params) {
      const rtn = this.base(features, params);

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

      features.forEach(
        (feature) => {
          context.fillStyle = feature.color;

          this.drawFeature(
            $.extend(true, {}, feature, {
              x           : feature.position[params.scale].X,
              y           : 0,
              width       : feature.position[params.scale].width,
              height      : context.canvas.height,
              color       : this.shadeColor(context.fillStyle, 0.8),
              border      : feature.color,
              label       : false,
              decorations : true,
            }),
            context,
            false,
            params.scale
          );
        }
      );
    },

    decorateFeature: function (feature, context) {
      const x1 = feature.x + 0.5;
      const x2 = x1 + feature.width;

      let draw = false;

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
  }),
});
