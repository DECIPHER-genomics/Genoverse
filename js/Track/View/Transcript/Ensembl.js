import View     from 'js/Track/View/Transcript';
import GeneView from 'js/Track/View/Gene/Ensembl';

export default View.extend({
  setFeatureColor: function (feature) {
    GeneView.prototype.setFeatureColor(feature);

    for (var i = 0; i < (feature.subFeatures || []).length; i++) {
      if (feature.subFeatures[i].utr) {
        feature.subFeatures[i].color       = false;
        feature.subFeatures[i].borderColor = feature.color;
      }
    }
  }
});
