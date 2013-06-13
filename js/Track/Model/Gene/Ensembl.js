// Ensembl REST API Gene model
Genoverse.Track.Model.Gene.Ensembl = Genoverse.Track.Model.Gene.extend({
  
  name             : 'e! Genes',
  url              : 'http://beta.rest.ensembl.org/feature/region/human/__CHR__:__START__-__END__?feature=gene;content-type=application/json',
  dataRequestLimit : 5000000, // As per e! REST API restrictions
  
  // The url above responds in json format, data is an array
  // We assume that parents always preceed children in data array, gene -> transcript -> exon
  // See http://beta.rest.ensembl.org/documentation/info/feature_region for more details
  parseData: function (data) {
    for (var i = 0; i < data.length; i++) {
      var feature = data[i];
      
      if (feature.feature_type === 'gene' && !this.featuresById[feature.ID]) {
        feature.id          = feature.ID;
        feature.label       = feature.external_name || feature.id;
        feature.transcripts = [];
        
        this.insertFeature(feature);
      }
    }
  }
});