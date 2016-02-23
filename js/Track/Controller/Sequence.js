Genoverse.Track.Controller.Sequence = Genoverse.Track.Controller.extend({
  getClickedFeatures: function (x, y) {
    return this.makeSeqFeatureMenu(this.base(x, y)[0], Math.floor(x / this.scale));
  },

  makeSeqFeatureMenu: function (feature, pos) {
    feature.featureMenus      = feature.featureMenus      || {};
    feature.featureMenus[pos] = feature.featureMenus[pos] || {
      title    : feature.sequence.charAt(pos - feature.start),
      Location : this.browser.chr + ':' + pos
    }

    return feature.featureMenus[pos].title ? feature.featureMenus[pos] : undefined;
  }
});
