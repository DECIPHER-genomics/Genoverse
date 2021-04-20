var Controller = require('../Controller')
var Model = require('../Model')
var View = require('../View')

var StaticController = Controller.extend({
  addDomElements: function () {
    this.base();

    this.image = $('<img>').appendTo(this.imgContainer);

    this.container.toggleClass('gv-track-container gv-track-container-static').prepend(this.imgContainer);
    this.scrollContainer.add(this.messageContainer).remove();
  },

  reset: function () {
    delete this.stringified;
    this.base.apply(this, arguments);
  },

  setWidth: function (width) {
    this.base(width);
    this.image.width = this.width;
  },

  makeFirstImage: function () {
    this.base.apply(this, arguments);
    this.container.css('left', 0);
    this.imgContainer.show();
  },

  makeImage: function (params) {
    if (this.prop('disabled')) {
      return $.Deferred().resolve();
    }

    var features = this.view.positionFeatures(this.model.findFeatures(params.chr, params.start, params.end), params);

    if (features) {
      var string = JSON.stringify(features);

      if (this.stringified !== string) {
        var height = this.prop('height');

        params.width         = this.width;
        params.featureHeight = height;

        this.render(features, this.image.data(params));
        this.imgContainer.children(':last').show();
        this.resize(height, undefined, false);

        this.stringified = string;
      }
    }

    return $.Deferred().resolve();
  }
});

var StaticModel = Model.extend({
  url            : false,
  checkDataRange : function () { return true; }
});

var StaticView = View.extend({
  featureMargin : { top: 0, right: 1, bottom: 0, left: 1 },

  positionFeature : $.noop,
  scaleFeatures   : function (features) { return features; },

  draw: function (features, featureContext, labelContext, scale) {
    for (var i = 0; i < features.length; i++) {
      this.drawFeature(features[i], featureContext, labelContext, scale);
    }
  }
});

var StaticTrack = TrackClass.extend({
  controls   : 'off',
  resizable  : false,
  controller : StaticController,
  model      : StaticModel,
  view       : StaticView
});

module.exports = {
  View: StaticView,
  Model: StaticModel,
  Controller: StaticController,
  Track: StaticTrack,
}
