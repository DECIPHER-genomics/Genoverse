var Gene = require('../Gene')

module.exports = Gene.extend({
  setFeatureColor: function (feature) {
    var processedTranscript = {
      'sense_intronic'           : 1,
      'sense_overlapping'        : 1,
      'processed_transcript'     : 1,
      'nonsense_mediated_decay'  : 1,
      'non_stop_decay'           : 1,
      'antisense'                : 1,
      'retained_intron'          : 1,
      'tec'                      : 1,
      'non_coding'               : 1,
      'ambiguous_orf'            : 1,
      'disrupted_domain'         : 1,
      '3prime_overlapping_ncrna' : 1
    };

    feature.color = '#000000';

    if (feature.logic_name.indexOf('ensembl_havana') === 0) {
      feature.color      = '#CD9B1D';
      feature.labelColor = '#B78000';
      feature.legend     = 'Merged Ensembl/Havana';
    } else if (processedTranscript[feature.biotype.toLowerCase()]) {
      feature.color  = '#0000FF';
      feature.legend = 'Processed transcript';
    } else if (feature.biotype === 'protein_coding') {
      feature.color  = '#A00000';
      feature.legend = 'Protein coding';
    } else if (feature.biotype.indexOf('pseudogene') > -1) {
      feature.color  = '#666666';
      feature.legend = 'Pseudogene';
    } else if (/rna/i.test(feature.biotype) || feature.biotype === 'ribozyme') {
      feature.color  = '#8B668B';
      feature.legend = 'RNA gene';
    } else if (/^tr_.+_gene$/i.test(feature.biotype)) {
      feature.color  = '#CD6600';
      feature.legend = 'TR gene';
    } else if (/^ig_.+_gene$/i.test(feature.biotype)) {
      feature.color  = '#8B4500';
      feature.legend = 'IG gene';
    }

    feature.labelColor = feature.labelColor || feature.color;
  }
});