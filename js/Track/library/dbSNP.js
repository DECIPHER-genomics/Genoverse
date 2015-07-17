Genoverse.Track.dbSNP = Genoverse.Track.extend({
  id               : 'dbSNP',
  name             : 'dbSNP',
  info             : 'All sequence variants from the database of Single Nucleotide Polymorphisms (dbSNP)',
  url              : '//rest.ensembl.org/overlap/region/human/__CHR__:__START__-__END__?feature=variation;content-type=application/json',
  dataRequestLimit : 5000000, // As per e! REST API restrictions
  threshold        : 1e5,
  labels           : false,
  legend           : true,
  autoHeight       : true,
  colorMap         : {
    transcript_ablation                : '#ff0000',
    splice_acceptor_variant            : '#FF581A',
    splice_donor_variant               : '#FF581A',
    stop_gained                        : '#ff0000',
    frameshift_variant                 : '#9400D3',
    stop_lost                          : '#ff0000',
    start_lost                         : '#ffd700',
    transcript_amplification           : '#ff69b4',
    inframe_insertion                  : '#ff69b4',
    inframe_deletion                   : '#ff69b4',
    missense_variant                   : '#ffd700',
    protein_altering_variant           : '#FF0080',
    splice_region_variant              : '#ff7f50',
    incomplete_terminal_codon_variant  : '#ff00ff',
    stop_retained_variant              : '#76ee00',
    synonymous_variant                 : '#76ee00',
    coding_sequence_variant            : '#458b00',
    mature_miRNA_variant               : '#458b00',
    '5_prime_UTR_variant'              : '#7ac5cd',
    '3_prime_UTR_variant'              : '#7ac5cd',
    non_coding_transcript_exon_variant : '#32cd32',
    intron_variant                     : '#02599c',
    NMD_transcript_variant             : '#ff4500',
    non_coding_transcript_variant      : '#32cd32',
    upstream_gene_variant              : '#a2b5cd',
    downstream_gene_variant            : '#a2b5cd',
    TFBS_ablation                      : '#a52a2a',
    TFBS_amplification                 : '#a52a2a',
    TF_binding_site_variant            : '#a52a2a',
    regulatory_region_ablation         : '#a52a2a',
    regulatory_region_amplification    : '#a52a2a',
    feature_elongation                 : '#7f7f7f',
    regulatory_region_variant          : '#a52a2a',
    feature_truncation                 : '#7f7f7f',
    intergenic_variant                 : '#636363'
  },

  constructor: function () {
    this.base.apply(this, arguments);

    if (this.legend === true) {
      this.type = this.id;

      this.browser.addTrack(Genoverse.Track.Legend.extend({
        id          : this.id   + 'Legend',
        name        : this.name + ' Legend',
        featureType : this.type
      }), this.order + 0.1);
    }
  },

  insertFeature: function (feature) {
    feature.color  = this.prop('colorMap')[feature.consequence_type];
    feature.legend = feature.consequence_type;

    if (feature.start > feature.end) {
      feature.decorations = true;
    }

    this.base(feature);
  },

  decorateFeature: function (feature, context, scale) {
    context.fillStyle = feature.color;
    context.beginPath();
    context.moveTo(feature.position[scale].X - 3, feature.position[scale].Y + this.featureHeight);
    context.lineTo(feature.position[scale].X,     feature.position[scale].Y + this.featureHeight - 4);
    context.lineTo(feature.position[scale].X + 3, feature.position[scale].Y + this.featureHeight);
    context.fill();

    if (scale > 1) {
      context.fillRect(feature.position[scale].X - 0.5, feature.position[scale].Y, 1.5, feature.position[scale].height);
    }
  },

  populateMenu: function (feature) {
    var deferred = $.Deferred();
    var menu     = [{
      title         : '<a href="http://www.ensembl.org/Homo_sapiens/Variation/Summary?v=' + feature.id + '" target="_blank">' + feature.id + '</a>',
      Location      : this.browser.chr + ':' + feature.start + '-' + feature.end,
      Consequence   : feature.consequence_type,
      'Alt alleles' : feature.alt_alleles.join(', ')
    }];

    $.ajax({
      url      : '//rest.ensembl.org/variation/human/' + feature.id + '?population_genotypes=1;content-type=application/json',
      dataType : 'json',
      success  : function (data) {
        var populationGenotypes = $.grep(data.population_genotypes, function (pop) { return /1000GENOMES.+ALL/.test(pop.population); }); // Only considering 1000 Genomes: ALL population
        var frequencies         = {};
        var pop, i, j;

        if (populationGenotypes.length) {
          for (i = 0; i < populationGenotypes.length; i++) {
            pop           = populationGenotypes[i];
            pop.frequency = parseFloat(pop.frequency, 10);
            pop.count     = parseInt(pop.count, 10);

            frequencies[pop.population] = frequencies[pop.population] || [];
            frequencies[pop.population].push(pop);
          }

          for (i in frequencies) {
            frequencies[i].sort(function (a, b) { return a.count < b.count; });

            pop = {
              title    : i + ' population genotypes',
              Genotype : [ 'Frequency', 'Count' ],
              start    : false,
              end      : false
            };

            for (j in frequencies[i]) {
              pop[frequencies[i][j].genotype] = [ (frequencies[i][j].frequency * 100).toFixed(2) + '%', frequencies[i][j].count ];
            }

            menu.push(pop);
          }

          pop = {
            start : false,
            end   : false
          };

          pop['<a href="http://www.ensembl.org/Homo_sapiens/Variation/Population?v=' + feature.id + '" target="_blank">See all population genotypes</a>'] = '';

          menu.push(pop);
        }

        deferred.resolve(menu);
      }
    });

    return deferred;
  },

  // Different settings for different zoom level
  5000: { // more than 5k
    bump: false
  },
  1: { // > 1 base-pair, but less then 5k
    bump: true
  }

});
