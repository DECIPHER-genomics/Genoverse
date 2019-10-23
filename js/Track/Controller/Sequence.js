Genoverse.Track.Controller.Sequence = Genoverse.Track.Controller.extend({
  getClickedFeatures: function (x, y) {
    var feature = this.base(x, y)[0];

    return feature ? this.makeSeqFeatureMenu(feature, Math.floor(x / this.scale)) : false;
  },

  makeSeqFeatureMenu: function (feature, pos) {
    feature.featureMenus      = feature.featureMenus      || {};
    feature.featureMenus[pos] = feature.featureMenus[pos] || {
      title    : feature.sequence.charAt(pos - feature.start),
      Location : feature.chr + ':' + pos
    }

    return feature.featureMenus[pos].title ? feature.featureMenus[pos] : undefined;
  }
});
