var Transcript = require('../Transcript')
var GeneEnsemblView = require('../Gene/Ensembl')

module.exports = Transcript.extend({
  setFeatureColor: function (feature) {
    GeneEnsemblView.prototype.setFeatureColor(feature);

    for (var i = 0; i < (feature.subFeatures || []).length; i++) {
      if (feature.subFeatures[i].utr) {
        feature.subFeatures[i].color       = false;
        feature.subFeatures[i].borderColor = feature.color;
      }
    }
  }
});