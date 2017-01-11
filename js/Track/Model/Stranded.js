Genoverse.Track.Model.Stranded = Genoverse.Track.Model.extend({
  init: function (reset) {
    this.base(reset);

    if (!reset) {
      var otherTrack = this.prop('forwardTrack');

      if (otherTrack) {
        this.featuresByChr = otherTrack.prop('featuresByChr');
        this.features      = otherTrack.prop('features');
        this.featuresById  = otherTrack.prop('featuresById');
      }
    }
  },

  parseURL: function () {
    if (!this.urlParams.strand) {
      this.urlParams.strand = this.prop('featureStrand');
    }

    return this.base.apply(this, arguments);
  },

  findFeatures: function () {
    var strand = this.track.featureStrand;
    return $.grep(this.base.apply(this, arguments), function (feature) { return feature.strand === strand; });
  }
});
