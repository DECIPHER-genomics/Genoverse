var variationColorMap = {
  'Likely LOF' : '#FF3B0B',
  'Protein Altering' : '#E8810C',
  'In mRNA, not protein altering' : 'grey',
  'In annotated regulatory region' : '#008B00',
  'ncRNA' : 'black',
  'In UTR' : '#FF69B4',
  'Transcript amplification' : '#02599C',
  'Not in mRNA or annotation regulatory region' : '#48D048'
};


var dbSNPColorMap = {
   // Likely LOF
  'Transcript ablation' : '#FF3B0B',
  'Splice donor'        : '#FF3B0B',
  'Splice acceptor'     : '#FF3B0B',
  'Stop gained'         : '#FF3B0B',
  'Frameshift'          : '#FF3B0B',

   // Protein Altering
  'Stop lost' : '#E8810C',
  'Initiator codon' : '#E8810C',
  'Inframe insertion' : '#E8810C',
  'Inframe deletion' : '#E8810C',
  'Missense' : '#E8810C',

   // Transcript amplification
  'Transcript amplification' : '#02599C',

   // In annotated regulatory region
  'Splice region' : '#008B00',
  'Tfbs ablation' : '#008B00',
  'Regularoty region' : '#008B00',
  'Regulatory region ablation' : '#008B00',
  'Regulatory region amplification' : '#008B00',
  'Feature elongation' : '#008B00',
  'Feature truncation' : '#008B00',

   // In mRNA, not protein altering
  'Partial codon' : 'grey',
  'Synonymous' : 'grey',
  'Coding sequence' : 'grey',
  'NMD transcript'  : 'grey',

   // ncRNA        
  'Within mature miRNA' : 'black',
  'Non-coding exon' : 'black',
  'Within non coding gene' : 'black',

   // Not in mRNA or annotation regulatory region
  'Intronic'  : '#48D048',
  'Upstream'  : '#48D048',
  'Downstream': '#48D048',
  'Intergenic': '#48D048',

   // In UTR
  '5 prime UTR' : '#FF69B4',
  '3 prime UTR' : '#FF69B4',

  'Transcript amplification' : '#02599C',
};


var commonCNVType  = {
  "-1": 'Loss',
  "0" : 'Complex',
  "1" : 'Gain',
};


var commonCNVProof = {
  1 : 'Singleton',
  2 : 'Doubleton 1%',
  3 : '1%-5%',
  4 : '>5%',
};


var squishControl = $('<a title="squish">squish</a>').click(function(){
  var track = $(this).data('track');
  if (track.squished) {
    track.featureHeight  = 6;
    track.featureSpacing = 2;
    track.labels = true;
    track.reDraw();
    track.squished = false;
    track.resize(track.initialHeight);
    $(this).text('squish');
  } else {
    track.featureHeight  = 2;
    track.featureSpacing = 1;
    track.labels = false;
    track.reDraw();
    track.squished = true;
    track.resize(Math.min(track.fullVisibleHeight, track.height));
    $(this).text('unsquish');
  }  
});


var genesHI = {
  url           : '/gene;json?region=__CHR__:__START__-__END__',
  info          : 'Genes, coloured by haplo-insufficiency index (HI)',
  parseData     : function (data) {
    var i = data.length;
    while (i--) {
      data[i].id         = data[i].name;
      data[i].label      = data[i].name;
      data[i].color      = "rgb(" + (data[i].hi_rgb || '0,0,0') + ")";
      data[i].labelColor = "rgb(" + (data[i].hi_rgb || '0,0,0') + ")";
      data[i].start      = parseFloat(data[i].chr_start);
      data[i].end        = parseFloat(data[i].chr_end);
      this.insertFeature(data[i]);
    }
  },
  populateMenu : function (gene) {
    console.log(gene);
    return {
      title     : '<a target=_blank href="http://www.genenames.org/data/hgnc_data.php?match='+ gene.name+ '">' + gene.name + '</a>',
      Name      : gene.description,
      Synonyms  : gene.synonyms,
      Location  : gene.chr + ':' + gene.start + '-' + gene.end,
      OMIM      : gene.id_omim ? '<a target=_blank href="http://omim.org/'+ gene.id_omim +'">'+ gene.id_omim +'</a>' : '-',
      Morbid    : gene.id_morbid ? '<a target=_blank href="http://omim.org/'+ gene.id_morbid +'">'+ gene.id_morbid +'</a>' : '-',
      'UCSC ID' : gene.id_ucsc ? '<a target=_blank href="http://genome.cse.ucsc.edu/cgi-bin/hgGene?hgg_gene='+ gene.id_ucsc +'">'+ gene.id_ucsc +'</a>' : '-',
      Ensembl   : gene.id_ensembl ? '<a target=_blank href="http://www.ensembl.org/Homo_sapiens/Gene/Summary?g='+ gene.id_ensembl +'">'+ gene.id_ensembl +'</a>' : '-',
      Protein   : gene.id_uniprot ? '<a target=_blank href="http://www.uniprot.org/uniprot/'+ gene.id_uniprot +'">'+ gene.id_uniprot +'</a>' : '-',
      '%HI'     : gene.hi_index,
    };
  } 
};

var genesDDG = {
  url          : '/gene;json?region=__CHR__:__START__-__END__&filter=ddgenes',
  colorMap     : {
    Y: 'red',
    P: 'orange'
  },
  info         : 'Genes identified as being implicated in developmental disorders (curated by the DDD project)<br / ><a target=_blank href="https://decipher.sanger.ac.uk/ddd/ddd_genes">Development Disorder Genotype - Phenotype Database (DDG2P)</a>',
  background   : '#FFF9F0',
  parseData    : function (data) {
    var i = data.length;
    while (i--) {
      data[i].id         = data[i].name;
      data[i].label      = data[i].name;
      data[i].color      = this.colorMap[data[i].ddgene_code];
      data[i].labelColor = this.colorMap[data[i].ddgene_code];
      data[i].start      = parseFloat(data[i].chr_start);
      data[i].end        = parseFloat(data[i].chr_end);
      this.insertFeature(data[i]);
    }
  },
  populateMenu : function (gene) {

    var menu = [{
      title       : 'Developmental Disorder Gene',
      'Gene name' : '<a target=_blank href="http://www.genenames.org/data/hgnc_data.php?match='+ gene.name+ '">' + gene.name + '</a>',
    }];

    //var deferred = $.Deferred();

    $.ajax({
      url      : '/gene/'+ gene.name +';ddgene_info_json',
      dataType : 'json',
      async    : false,
      timeout  : 3000,
      success  : function (data) {
        for (var i=0; i<data.length; i++) {
          var disease = {
            title : data[i].disease,
            Mode  : data[i].mode,
            Consequence : data[i].consequence,
            Category : data[i].category,
          };
          menu.push(disease);
        }

        //deferred.resolve(menu);
      },
      error: function(){
        return true;
      },                
    });

    return menu;
  }
};


var genesLSDB = {
  url           : '/gene;json?region=__CHR__:__START__-__END__&filter=lsdb',
  info          : 'Genes having locus-specific database entries (LSDB)',
  background    : '#FFF9F0',
  parseData     : function (data) {
    var i = data.length;
    while (i--) {
      data[i].id         = data[i].name;
      data[i].label      = data[i].name;
      data[i].color      = 'black';
      data[i].labelColor = 'black';
      data[i].start      = parseFloat(data[i].chr_start);
      data[i].end        = parseFloat(data[i].chr_end);
      this.insertFeature(data[i]);
    }
  },
  populateMenu : function (gene) {
    return {
      title : gene.name,
      LSDB  : '<a target=_blank href="'+ gene.lsdb_url +'">' + gene.lsdb_url + '</a>',
    };
  }  
};


var genesControl = $('<select><optgroup label="Color/Filter"><option value="hi">Haplo-Insufficiency<option value="ddgenes">DD genes<option value="lsdb">LSDB</optgroup></select>').change(function(){
  var track = $(this).data('track');
  var option = $(this).val();
  if (option) {
    switch ($(this).val()) {
      case 'hi':
        track.extend(genesHI);
      break;
      case 'ddgenes':
        track.extend(genesDDG);
      break;
      case 'lsdb':
        track.extend(genesLSDB);
      break;
    };
    track.reset();
  }
});


var transcriptControl = $('<select><optgroup label="Color/Filter"><option value="ensembl_havana">Ensembl*Havana<option value="ensembl">Ensembl only<option value="havana">Havana only<option value="all">All</optgroup></select>').change(function(){
  var track = $(this).data('track');
  var option = $(this).val();
  if (option) {
    track.url = '';
    switch ($(this).val()) {
      case 'ensembl_havana':
        track.source = 'http://www.ensembl.org/das/Homo_sapiens.GRCh37.transcript-core-ensembl_havana_transcript';
      break;
      case 'ensembl':
        track.source = 'http://www.ensembl.org/das/Homo_sapiens.GRCh37.transcript-core-ensembl';
      break;
      case 'havana':
        track.source = 'http://www.ensembl.org/das/Homo_sapiens.GRCh37.transcript-core-havana';
      break;
      case 'all':
        track.source = 'http://www.ensembl.org/das/Homo_sapiens.GRCh37.transcript';
      break;
    };
    track.reset();
  }
});


var DECIPHERgainLossFilter = $('<select class="gain-loss-filter"><option value="">Gain/Loss<option value="gain">Gain only<option value="loss">Loss only</select>').change(function(){
  var track = $(this).data('track');
  var option = $(this).val();
    switch (option) {
      case '':
        track.filterFeature = function (feature) { };
      break;
      case 'gain':
        track.filterFeature = function (feature) { return feature.mean_ratio<=0; };
      break;
      case 'loss':
        track.filterFeature = function (feature) { return feature.mean_ratio>0; };
      break;
    };
    track.reset();
});


var ISCAGainLossFilter = $('<select class="gain-loss-filter"><option value="">Gain/Loss<option value="gain">Gain only<option value="loss">Loss only</select>').change(function(){
  var track = $(this).data('track');
  var option = $(this).val();
    switch (option) {
      case '':
        track.url = '/isca;json?region=__CHR__:__START__-__END__';
      break;
      case 'gain':
        track.url = '/isca;json?region=__CHR__:__START__-__END__&type=Gain';
      break;
      case 'loss':
        track.url = '/isca;json?region=__CHR__:__START__-__END__&type=Loss';
      break;
    };
    track.reset();
});


var ISCAPathogenicityFilter = $('<select><option value="pathogenic">Pathogenic<option value="benign">Benign<option value="uncertain">Uncertain<option value="any">Any</select>').change(function(){
  var track = $(this).data('track');
  var option = $(this).val();
    switch (option) {
      case 'pathogenic':
        track.filterFeature = function (featre) { 
          return !(featre.pathogenicity == 'Pathogenic' || featre.pathogenicity == 'Likely Pathogenic');
        };
      break;
      case 'benign':
        track.filterFeature = function (featre) { 
          return !(featre.pathogenicity == 'Benign' || featre.pathogenicity == 'Likely Benign');
        };
      break;
      case 'uncertain':
        track.filterFeature = function (featre) { 
          return featre.pathogenicity != 'Uncertain';
        };
      break;
      case 'any':
        track.filterFeature = function (featre) { 
          return false;
        };
      break;
    };
    track.reset();
});


function legend(colorMap) {
  table = '<table class="track_legend">';
  for (var key in colorMap) {
    table = table + '<tr><td style="background:'+ colorMap[key] +'">&nbsp;</td><td>'+ key +'</td></tr>';
  }
  table = table + '/<table>';
  
  return table;
};