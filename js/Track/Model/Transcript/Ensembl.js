// Ensembl REST API Transcript model
Genoverse.Track.Model.Transcript.Ensembl = Genoverse.Track.Model.Transcript.extend({
  url              : '//rest.ensembl.org/overlap/region/human/__CHR__:__START__-__END__?feature=transcript;feature=exon;feature=cds;content-type=application/json',
  dataRequestLimit : 5000000, // As per e! REST API restrictions
  
  // The url above responds in json format, data is an array
  // See rest.ensembl.org/documentation/info/feature_region for more details
  parseData: function (data) {
    for (var i = 0; i < data.length; i++) {
      var feature = data[i];
      
      if (feature.feature_type === 'transcript' && !this.featuresById[feature.ID]) {
        feature.id    = feature.ID;
        feature.label = feature.id;
        feature.exons = [];
        feature.cds   = [];
        
        this.insertFeature(feature);
      } else if (feature.feature_type === 'exon' && this.featuresById[feature.Parent]) {
        feature.id = feature.ID;
        
        if (!this.featuresById[feature.Parent].exons[feature.id]) {
          this.featuresById[feature.Parent].exons.push(feature);
          this.featuresById[feature.Parent].exons[feature.id] = feature;
        }
      } else if (feature.feature_type === 'cds' && this.featuresById[feature.Parent]) {
        feature.id = feature.start + '-' + feature.end;
        
        if (!this.featuresById[feature.Parent].cds[feature.id]) {
          this.featuresById[feature.Parent].cds.push(feature);
          this.featuresById[feature.Parent].cds[feature.id] = feature;
        }
      }
    }
  }
});
