import GeneView from 'js/Track/View/Gene/Ensembl';
import View     from 'js/Track/View/Transcript';

export default View.extend({
  setFeatureColor: function (feature) {
    GeneView.prototype.setFeatureColor(feature);

    (feature.subFeatures || []).forEach(
      (subFeature) => {
        if (subFeature.utr) {
          subFeature.color       = false;
          subFeature.borderColor = feature.color;
        }
      }
    );
  },
});
