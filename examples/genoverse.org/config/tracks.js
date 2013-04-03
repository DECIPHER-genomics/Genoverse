var sequence = {
  name     : 'Sequence',
  type     : 'Sequence',
  id       : 'Sequence',
  tags     : ['Sequence'],
  info     : 'Reference sequence colored by basepair',
};


var dbSNP = {
  name             : "Population: SNVs, InDels", 
  category         : 'Population',
  tags             : ['Population', 'Common', 'Sequence', 'Variants', 'dbSNP', 'Ensembl'],
  id               : "dbSNP", 
  url              : "http://beta.ensembl.org/Homo_sapiens/Genoverse/fetch_features/_variation?r=__CHR__:__START__-__END__&id=variation_feature_variation&db=core",
  height           : 55,
  featureHeight    : 30,
  threshold        : 1e5,
  info             : 'All sequence variants observed in the general population (example: dbSNP)' + legend(dbSNPColorMap),

  parseData        : function (data) {
    var snps = data.features;
    for (var i=0; i<snps.length; i++) {
      snps[i].color = dbSNPColorMap[snps[i].legend];
      this.insertFeature(snps[i]);
    }
  },

  populateMenu     : function (feature) {
    var v = (feature.menu.match(/v=(\w+)/))[1];
    var menu = { title: '<a target=_blank href="http://www.ensembl.org/Homo_sapiens/Variation/Summary?v='+ v +'">'+ v +'</a>' };
    $.ajax({
      url      : 'http://beta.ensembl.org'+ feature.menu,
      dataType : 'json',
      async    : false,
      timeout  : 3000,
      success  : function (data) {
        for (var i=0; i<data.entries.length; i++) {
          var type = data.entries[i].type;
          if (type) menu[type] = data.entries[i].link;
        }
      },
      error: function () {
        return true;
      }
    });
    return menu;
  }  
};


var syndromes = {
  name             : 'DECIPHER: Syndromes',
  category         : 'Syndromes',
  tags             : ['Syndromes', 'DECIPHER', 'CNV', 'Copy number', 'Pathogenic'],
  url              : 'https://decipher.sanger.ac.uk/syndrome_features;json?region=__CHR__:__START__-__END__',
  height           : 55,
  featureHeight    : 6,
  featureSpacing   : 2,
  labels           : true,
  bump             : true,
  resizable        : true,
  spacing          : 10,
  background       : '#FFF9F0',
  info             : 'Micro deletion/duplication syndromes (curated by the DECIPHER consortium)',

  parseData        : function (data) {
    var i = data.length;
    while (i--) {
      data[i].id         = data[i].id_syndrome;
      data[i].label      = data[i].name;
      data[i].color      = data[i].mean_ratio > 0 ? "#0052FF" : "#FF2F00";
      data[i].labelColor = data[i].mean_ratio > 0 ? "#0052FF" : "#FF2F00";
      data[i].start      = parseFloat(data[i].chr_start);
      data[i].end        = parseFloat(data[i].chr_end);
      this.insertFeature(data[i]);
    }
  },

  populateMenu : function (feature) {
    return {
      title    : '<a target="_blank" href="/syndrome/'+ feature.id +'">' + feature.label + '</a>',
      Location : feature.chr + ':' + feature.start + '-' + feature.end,
      Length   : (feature.end - feature.start + 1) + ' bp',
      'Copy Number' : feature.copy_number,
    };
  }  
};


var HGMD = {
  name          : "HGMD", 
  url           : '/hgmd;json?region=__CHR__:__START__-__END__',
  height        : 55,
  featureHeight : 30,
  info          : 'Human Gene Mutation Database (public)',
  background    : '#FFF9F0',
  parseData     : function (data) {
    var i = data.length;
    while (i--) {
      data[i].id         = data[i].id_variant;
      data[i].label      = data[i].id_hgmd;
      data[i].color      = 'black';
      data[i].start      = parseFloat(data[i].chr_start);
      data[i].end        = parseFloat(data[i].chr_end);
      this.insertFeature(data[i]);
    }
  },
  populateMenu : function (feature) {
    return {
      title     : feature.feature,
      'HGMD ID' : '<a target=_blank href="http://www.hgmd.cf.ac.uk/ac/gene.php?gene='+ feature.gene_name +'&accession='+ feature.id_hgmd +'">'+ feature.id_hgmd + '</a>',
      Location  : feature.chr + ':' + feature.start + '-' + feature.end,
      Gene      : feature.gene_name,
    };
  },
};



var genes = $.extend({
  name             : 'Genes',
  category         : 'Genes',
  tags             : ['Genes', 'HI', 'Haplo-insufficiency', 'Developmental', 'DDG2P', 'OMIM'],
  url              : 'https://decipher.sanger.ac.uk/gene;json?region=__CHR__:__START__-__END__',
  height           : 200,
  featureHeight    : 6,
  featureSpacing   : 2,
  bump             : true,
  labels           : true,
  resizable        : true,
  info             : 'Genes, coloured by haplo-insufficiency index (HI)',
  controls         : [ genesControl, squishControl ],
}, genesHI);


var transcripts = {
  type             : 'DAS.Transcript',
  name             : 'Transcripts (DAS)',
  category         : 'Genes',
  tags             : ['Genes', 'Transcripts', 'Ensembl', 'Structure'],
  source           : 'http://www.ensembl.org/das/Homo_sapiens.GRCh37.transcript-core-ensembl_havana_transcript',
  controls         : [ transcriptControl ],
  populateMenu     : function (feature) {
    return {
      title    : '<a target="_blank" href="http://www.ensembl.org/Homo_sapiens/transview?t='+ feature.id +'">'+ feature.id +'</a>',
      Location : this.browser.chr + ':' + feature.start + '-' + feature.end,
      Length   : (feature.end - feature.start + 1) + ' bp',
      Type     : feature.type,
    };
  },  
};


var tracksLibrary = [
  sequence,
  syndromes,
  dbSNP, 
  genes, 
  transcripts,
  HGMD
];


var defaultTracks = [
  {
    type   : 'Scalebar',
    height : 25,
    name   : 'Chr 1'
  },
  sequence,
  genes, 
  syndromes
];