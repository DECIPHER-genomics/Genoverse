Genoverse.Track.View.Transcript.Ensembl = Genoverse.Track.View.Transcript.extend({
  setFeatureColor: function (feature) {
    Genoverse.Track.View.Gene.Ensembl.prototype.setFeatureColor(feature);

    for (var i = 0; i < (feature.subFeatures || []).length; i++) {
      if (feature.subFeatures[i].utr) {
        feature.subFeatures[i].color       = false;
        feature.subFeatures[i].borderColor = feature.color;
      }
    }
  }
});