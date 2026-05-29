import View from '../Gene';

/**
  * Provides a function setFeatureColor for defining the feature colour and legend label
  * for ensembl genes and transcripts based on their logic_name and biotype properties.
  *
  * Biotypes are defined in
  *   https://www.ensembl.org/info/genome/genebuild/biotypes.html
  *
  * Ensembl colours are defined in
  *   https://github.com/Ensembl/ensembl-webcode/blob/main/conf/ini-files/COLOUR.ini
  */

export default View.extend({
  setFeatureColor: function (feature) {
    const processedTranscript = {
      'sense_intronic'                 : 1,
      'sense_overlapping'              : 1,
      'processed_transcript'           : 1,
      'nonsense_mediated_decay'        : 1,
      'non_stop_decay'                 : 1,
      'antisense'                      : 1,
      'retained_intron'                : 1,
      'tec'                            : 1,
      'non_coding'                     : 1,
      'ambiguous_orf'                  : 1,
      'disrupted_domain'               : 1,
      '3prime_overlapping_ncrna'       : 1,
      'protein_coding_CDS_not_defined' : 1, // new in e108
    };

    feature.color = '#000000';

    const logicName = feature.logic_name || '';
    const biotype   = (feature.biotype || '').toLowerCase();

    if (logicName.indexOf('ensembl_havana') === 0) {
      feature.color      = '#CD9B1D';
      feature.labelColor = '#B78000';
      feature.legend     = 'Merged Ensembl/Havana';
    } else if (processedTranscript[biotype]) {
      feature.color  = '#0000FF';
      feature.legend = 'Processed transcript';
    } else if (feature.biotype.indexOf('protein_coding') > -1) {
      feature.color  = '#A00000';
      feature.legend = 'Protein coding';
    } else if (feature.biotype === 'artifact' || biotype.indexOf('pseudogene') > -1) {
      feature.color  = '#666666';
      feature.legend = 'Pseudogene';
    } else if (/rna/.test(biotype) || biotype === 'ribozyme') {
      feature.color  = '#8B668B';
      feature.legend = 'RNA gene';
    } else if (/^tr(?:_.+)?_gene$/.test(biotype)) {
      feature.color  = '#CD6600';
      feature.legend = 'TR gene';
    } else if (/^ig_.+_gene$/.test(biotype)) {
      feature.color  = '#8B4500';
      feature.legend = 'IG gene';
    } else if (biotype === 'lrg_gene') {
      feature.color  = '#8080FF';
      feature.legend = 'LRG gene';
    }

    feature.labelColor = feature.labelColor || feature.color;
  },
});
