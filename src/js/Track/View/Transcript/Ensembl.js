import GeneView from '../Gene/Ensembl';
import View     from '../Transcript';

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
