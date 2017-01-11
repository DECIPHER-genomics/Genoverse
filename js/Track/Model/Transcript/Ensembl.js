// Ensembl REST API Transcript model
Genoverse.Track.Model.Transcript.Ensembl = Genoverse.Track.Model.Transcript.extend({
  url              : '//rest.ensembl.org/overlap/region/human/__CHR__:__START__-__END__?feature=transcript;feature=exon;feature=cds;content-type=application/json',
  dataRequestLimit : 5000000, // As per e! REST API restrictions

  setDefaults: function () {
    this.geneIds   = {};
    this.seenGenes = 0;

    this.base.apply(this, arguments);
  },

  // The url above responds in json format, data is an array
  // See rest.ensembl.org/documentation/info/feature_region for more details
  parseData: function (data, chr) {
    for (var i = 0; i < data.length; i++) {
      var feature = data[i];

      if (feature.feature_type === 'transcript' && !this.featuresById[feature.id]) {
        this.geneIds[feature.Parent] = this.geneIds[feature.Parent] || ++this.seenGenes;

        feature.chr   = feature.chr || chr;
        feature.label = parseInt(feature.strand, 10) === 1 ? (feature.external_name || feature.id) + ' >' : '< ' + (feature.external_name || feature.id);
        feature.sort  = (this.geneIds[feature.Parent] * 1e10) + (feature.logic_name.indexOf('ensembl_havana') === 0 ? 0 : 2e9) + (feature.biotype === 'protein_coding' ? 0 : 1e9) + feature.start + i;
        feature.exons = {};
        feature.cds   = {};

        this.insertFeature(feature);
      } else if (feature.feature_type === 'exon' && this.featuresById[feature.Parent]) {
        if (!this.featuresById[feature.Parent].exons[feature.id]) {
          this.featuresById[feature.Parent].exons[feature.id] = feature;
        }
      } else if (feature.feature_type === 'cds' && this.featuresById[feature.Parent]) {
        feature.id = feature.chr + ':' + feature.start + '-' + feature.end;

        if (!this.featuresById[feature.Parent].cds[feature.id]) {
          this.featuresById[feature.Parent].cds[feature.id] = feature;
        }
      }
    }
  }
});
