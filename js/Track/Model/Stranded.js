Genoverse.Track.Model.Stranded = Genoverse.Track.Model.extend({
  init: function (reset) {
    this.base(reset);

    if (!reset) {
      var otherTrack = this.prop('forwardTrack');

      if (otherTrack) {
        this.features     = otherTrack.prop('features');
        this.featuresById = otherTrack.prop('featuresById');
      }
    }
  },

  setURL: function (urlParams, update) {
    this.base($.extend(urlParams || this.urlParams, { strand: this.track.featureStrand }), update);
  },

  findFeatures: function () {
    var strand = this.track.featureStrand;
    return $.grep(this.base.apply(this, arguments), function (feature) { return feature.strand === strand; });
  }
});
