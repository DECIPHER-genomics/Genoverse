import Track, { Controller as TrackController, Model as TrackModel, View as TrackView } from 'js/Track';

const Controller = TrackController.extend({
  addDomElements: function () {
    this.base();

    this.image = $('<img>').appendTo(this.imgContainer);

    this.container.toggleClass('gv-track-container gv-track-container-static').prepend(this.imgContainer);
    this.scrollContainer.add(this.messageContainer).remove();
  },

  reset: function (...args) {
    delete this.stringified;
    this.base(...args);
  },

  setWidth: function (width) {
    this.base(width);
    this.image.width = this.width;
  },

  makeFirstImage: function (...args) {
    this.base(...args);
    this.container.css('left', 0);
    this.imgContainer.show();
  },

  makeImage: function (params) {
    if (this.prop('disabled')) {
      return $.Deferred().resolve();
    }

    const features = this.view.positionFeatures(this.model.findFeatures(params.chr, params.start, params.end), params);

    if (features) {
      const string = JSON.stringify(features);

      if (this.stringified !== string) {
        const height = this.prop('height');

        params.width         = this.width;
        params.featureHeight = height;

        this.render(features, this.image.data(params));
        this.imgContainer.children(':last').show();
        this.resize(height, undefined, false);

        this.stringified = string;
      }
    }

    return $.Deferred().resolve();
  },
});

const Model = TrackModel.extend({
  url            : false,
  checkDataRange : () => true,
});

const View = TrackView.extend({
  featureMargin   : { top: 0, right: 1, bottom: 0, left: 1 },
  positionFeature : () => {},
  scaleFeatures   : features => features,

  draw: function (features, featureContext, labelContext, scale) {
    features.forEach(
      feature => this.drawFeature(feature, featureContext, labelContext, scale)
    );
  },
});

export default Track.extend({
  controls   : 'off',
  resizable  : false,
  controller : Controller,
  model      : Model,
  view       : View,
});

export { Controller, Model, View };
