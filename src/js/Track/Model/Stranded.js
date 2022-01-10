import Model from 'js/Track/Model';

export default Model.extend({
  init: function (reset) {
    this.base(reset);

    if (!reset) {
      const otherTrack = this.prop('forwardTrack');

      if (otherTrack) {
        this.featuresByChr = otherTrack.prop('featuresByChr');
        this.features      = otherTrack.prop('features');
        this.featuresById  = otherTrack.prop('featuresById');
      }
    }
  },

  parseURL: function (...args) {
    if (!this.urlParams.strand) {
      this.urlParams.strand = this.prop('featureStrand');
    }

    return this.base(...args);
  },

  findFeatures: function (...args) {
    const strand = this.track.featureStrand;

    return this.base(...args).filter(feature => feature.strand === strand);
  },
});
