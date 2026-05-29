const { $, Genoverse, afterTest } = require('../utils');

describe('All ensembl biotypes should be categorised by setFeatureColor:', () => {
  afterEach(afterTest);

  // select * from (select distinct(biotype) from transcript union select distinct(biotype) from gene) biotypes order by biotype;
  const ensemblBiotypes = [ 'artifact', 'IG_C_gene', 'IG_C_pseudogene', 'IG_D_gene', 'IG_J_gene', 'IG_J_pseudogene', 'IG_pseudogene', 'IG_V_gene', 'IG_V_pseudogene', 'lncRNA', 'LRG_gene', 'miRNA', 'misc_RNA', 'Mt_rRNA', 'Mt_tRNA', 'nonsense_mediated_decay', 'non_stop_decay', 'processed_pseudogene', 'processed_transcript', 'protein_coding', 'protein_coding_LoF', 'pseudogene', 'retained_intron', 'ribozyme', 'rRNA', 'rRNA_pseudogene', 'scaRNA', 'scRNA', 'snoRNA', 'snRNA', 'sRNA', 'TEC', 'transcribed_processed_pseudogene', 'transcribed_unitary_pseudogene', 'transcribed_unprocessed_pseudogene', 'translated_processed_pseudogene', 'translated_unprocessed_pseudogene', 'TR_C_gene', 'TR_D_gene', 'TR_J_gene', 'TR_J_pseudogene', 'TR_V_gene', 'TR_V_pseudogene', 'unitary_pseudogene', 'unprocessed_pseudogene', 'vault_RNA' ];

  ensemblBiotypes.forEach(
    biotype => it(
      `${biotype} should be categorised by setFeatureColor`, () => {
        const feature = { logic_name: '', biotype: biotype };

        const [ track ] = new Genoverse({
          chr            : 1,
          start          : 1,
          end            : 100,
          chromosomeSize : 100,
          tracks         : [ Genoverse.Track.Gene.extend($.extend(true, {}, { data: [ feature ] })) ],
        }).tracks;

        track.view.setFeatureColor(feature);

        expect(feature.legend).toBeDefined();
      }
    )
  );
});
