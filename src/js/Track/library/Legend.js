import Static, { Controller as StaticController, Model as StaticModel, View as StaticView } from 'js/Track/library/Static';

const Controller = StaticController.extend({
  init: function () {
    this.base();

    this.container.addClass('gv-track-container-legend');

    this.browser.legends[this.track.id] = this.track;

    this.track.setTracks();
  },

  destroy: function () {
    delete this.browser.legends[this.prop('id')];
    this.base();
  },
});

const Model = StaticModel.extend({
  findFeatures: function () {
    const bounds   = { x: this.browser.scaledStart, y: 0, w: this.width };
    const features = this.track.tracks.flatMap(
      (track) => {
        const featurePositions = track.prop('featurePositions');
        const $bounds          = { ...bounds, h: track.prop('height') };

        return featurePositions ? featurePositions.search($bounds).concat(track.prop('labelPositions').search($bounds)) : [];
      }
    ).reduce(
      (acc, feature) => {
        if (Array.isArray(feature.legend)) {
          feature.legend.forEach((legend) => { acc[legend.label] = legend.color; });
        } else if (feature.legend) {
          acc[feature.legend] = feature.legendColor || feature.color;
        }

        return acc;
      },
      {}
    );

    return this.sortFeatures(
      Object.entries(features).map(([ text, color ]) => [ text, color ])
    );
  },

  sortFeatures: function (features) {
    // sort legend alphabetically
    return features.sort((a, b) => a[0].localeCompare(b[0]));
  },
});

const View = StaticView.extend({
  textColor     : '#000000',
  labels        : 'overlay',
  featureHeight : 12,

  positionFeatures: function (features, params) {
    if (params.positioned) {
      return features;
    }

    const cols = 2;
    const pad  = 5;
    const w    = 20;

    let x = 0;
    let y = 0;

    const xScale    = this.width / cols;
    const yScale    = this.fontHeight + pad;
    const xOffest   = params.xOffset || 0;
    const $features = [];

    features.forEach(
      ([ text, color ]) => {
        const xPos       = (x * xScale) + pad;
        const yPos       = (y * yScale) + pad;
        const labelWidth = this.context.measureText(text).width;

        $features.push(
          { x: xPos + xOffest,           y: yPos, width: w,              height: this.featureHeight, color: color },
          { x: xPos + xOffest + pad + w, y: yPos, width: labelWidth + 1, height: this.featureHeight, color: false, labelColor: this.textColor, labelWidth: labelWidth, label: text }
        );

        if (++x === cols) {
          x = 0;
          y++;
        }
      }
    );

    params.height     = this.prop('height', features.length ? ((y + (x ? 1 : 0)) * yScale) + pad : 0);
    params.width      = this.width;
    params.positioned = true;

    return this.base($features, params);
  },
});

export default Static.extend({
  unsortable  : true,
  lockToTrack : true, // Always put the legend just below the last track that the legend is for
  removable   : false,

  controller : Controller,
  model      : Model,
  view       : View,

  setDefaults: function () {
    this.order = typeof this.order !== 'undefined' ? this.order : 9e99;
    this.id    = this.id   || 'legend';
    this.type  = this.type || 'legend';
    this.base();
  },

  setEvents: function () {
    this.browser.on({
      'afterAddTracks afterRemoveTracks': function () {
        Object.values(this.legends).forEach(
          legend => legend.setTracks()
        );

        this.sortTracks();
      },
      afterRemoveTracks: function (tracks) {
        tracks.forEach(
          (track) => {
            if (track.legendTrack && track.legendTrack.tracks.length === 0) {
              track.legendTrack.remove();
            }
          }
        );

        Object.values(this.legends).forEach(
          legend => legend.controller.makeImage({})
        );
      },
      afterUpdateTrackOrder: function (e, ui) {
        const track       = ui.item.data('track');
        const legendTrack = this.legends[track.id] || track.legendTrack;

        // If a legend track, or a track with a sortable legend has been reordered, its lockToTrack status is ignored from now on.
        // This allows a legend to initially be locked to a track, but then to be reordered once the browser has been initialized
        if (legendTrack && legendTrack.lockToTrack && legendTrack.unsortable === false) {
          legendTrack.lockToTrack = false;
        }

        Object.values(this.legends).forEach(
          legend => legend.updateOrder()
        );

        this.sortTracks();
      },
    });

    this.browser.on(
      {
        afterPositionFeatures: function (features, params) {
          const legend = this.prop('legendTrack');

          if (legend) {
            setTimeout(() => { legend.controller.makeImage(params); }, 1);
          }
        },
        afterResize: function (height, userResize) {
          const legend = this.prop('legendTrack');

          if (legend && userResize === true) {
            legend.controller.makeImage({});
          }
        },
        afterCheckHeight: function () {
          const legend = this.prop('legendTrack');

          if (legend) {
            legend.controller.makeImage({});
          }
        },
        afterSetMVC: function () {
          const legend = this.prop('legendTrack');

          if (legend && legend.tracks.length) {
            legend.disable();

            if (this.legend !== false) {
              legend.enable();
            }
          }
        },
      },
      this
    );
  },

  setTracks: function () {
    const type = this.type;

    this.tracks = this.browser.tracks.filter(
      (track) => {
        if (track.legendType === type) {
          track.legendTrack = track.legendTrack || this;

          return true;
        }

        return false;
      }
    ).flatMap(
      track => [ track ].concat(
        track.prop('childTracks'),
        track.prop('parentTrack')
      ).filter(
        t => t && t !== this && !t.prop('disabled')
      )
    );

    this.updateOrder();

    if (typeof this.controller === 'object') {
      this[this.tracks.length ? 'enable' : 'disable']();
    } else {
      this.disabled = !this.tracks.length;
    }
  },

  updateOrder: function () {
    if (this.lockToTrack) {
      const tracks = this.tracks.filter(t => !t.prop('parentTrack'));

      if (tracks.length) {
        this.order = tracks[tracks.length - 1].order + 0.1;
      }
    }
  },

  enable: function () {
    this.base();
    this.controller.makeImage({});
  },

  disable: function () {
    delete this.controller.stringified;
    this.base();
  },
});

export { Controller, Model, View };
