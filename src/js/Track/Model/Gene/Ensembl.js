import Model from 'js/Track/Model/Gene';

// Ensembl REST API Gene model
export default Model.extend({
  url              : '//rest.ensembl.org/overlap/region/human/__CHR__:__START__-__END__?feature=gene;content-type=application/json',
  dataRequestLimit : 5000000, // As per e! REST API restrictions

  // The url above responds in json format, data is an array
  // We assume that parents always preceed children in data array, gene -> transcript -> exon
  // See rest.ensembl.org/documentation/info/feature_region for more details
  parseData: function (data, chr) {
    data.forEach(
      (feature) => {
        if (feature.feature_type === 'gene' && !this.featuresById[feature.id]) {
          feature.chr         = feature.chr || chr;
          feature.label       = parseInt(feature.strand, 10) === 1 ? `${feature.external_name || feature.id} >` : `< ${feature.external_name || feature.id}`;
          feature.transcripts = [];

          this.insertFeature(feature);
        }
      }
    );
  },
});
