import View from '../View';

export default View.extend({
  featureHeight       : 12,
  utrHeight           : 7,
  labels              : true,
  repeatLabels        : true,
  bump                : true,
  subFeatureJoinStyle : 'curve',

  scaleFeatures: function (features, scale) {
    features.forEach(
      (feature) => {
        const subFeatures = feature.subFeatures || [];

        if (subFeatures.length) {
          subFeatures.forEach(
            (subFeature) => {
              if (subFeature.utr) {
                subFeature.height = this.utrHeight;
              }
            }
          );

          feature.height = Math.max(...subFeatures.map(c => (c.fake ? 0 : c.height || 0)).concat(this.featureHeight));
        }
      }
    );

    return this.base(features, scale);
  },
});
