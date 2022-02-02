import View from 'js/Track/View';

export default View.extend({
  featureHeight       : 12,
  utrHeight           : 7,
  labels              : true,
  repeatLabels        : true,
  bump                : true,
  subFeatureJoinStyle : 'curve',

  scaleFeatures: function (features, scale) {
    var subFeatures, j;

    for (var i = 0; i < features.length; i++) {
      subFeatures = features[i].subFeatures || [];

      if (subFeatures.length) {
        for (j = 0; j < subFeatures.length; j++) {
          if (subFeatures[j].utr) {
            subFeatures[j].height = this.utrHeight;
          }
        }

        features[i].height = Math.max.apply(Math, subFeatures.map(function (c) { return c.fake ? 0 : c.height || 0; }).concat(this.featureHeight));
      }
    }

    return this.base(features, scale);
  }
});
