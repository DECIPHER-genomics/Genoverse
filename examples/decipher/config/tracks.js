var myPatientSeqVar = {

  name             : 'My Patient: SNVs, InDels',
  id               : 'myPatientSeqVar',
  category         : 'My Patient',
  tags             : ['My patient', 'DECIPHER', 'Sequence', 'Variants'],
  threshold        : 5000,
  type             : 'Sequence',
  height           : 60,
  info             : 'Sequence variant(s) observed in the current patient' + legend(variationColorMap),
  variationUrl     : "/sequence_variant;json?region=__CHR__:__START__-__END__&id_patient=269856",
  variations       : [],
  background       : '#F7FFF2',
  variationColor   : function (variation) {
    return variationColorMap[variation.vep_category]
  },
  populateMenu     : function (feature) {
    return {
      title    : feature.reference_allele + '/' + feature.alternate_allele,
      Patient  : '<a href="/patient/'+ feature.id_patient +'">' + feature.id_patient + '</a>',
      Location : feature.chr + ':' + feature.start + '-' + feature.end,
      Genotype : feature.genotype,
      Type     : feature.variant_type,
      Consequence: feature.vep_category,
    };
  },

  complementary : false,
  distance      : 0.2,
  yOffset       : 35,
  featureHeight : 15,
  shadow        : {
    offsetX : 0,
    offsetY : 0,
    blur    : 5,
    color   : "black"
  },
  thresholdWarning : 'Reference sequence is not displayed at this zoom level',

  getVariationData: function (start, end) {
    return $.ajax({
      url      : Genoverse.Track.prototype.parseUrl.apply(this, [start, end, this.variationUrl]),
      dataType : 'json',
      xhrFields: this.xhrFields
    });
  },


  parseVariationData: function (data) {
    this.variations = [];
    for (var i=0; i<data.length; i++) {
      var variation   = data[i];
      variation.start = variation.chr_start *1;
      variation.end   = variation.chr_end *1;
      variation.type  = 'InDel';
      variation.reference_allele = variation.reference_allele.toLowerCase();
      variation.alternate_allele = variation.alternate_allele.toLowerCase();
      variation.sequence = variation.alternate_allele;
      variation.width = variation.end - variation.start + 1;

      this.variations.push(variation);
    }
  },

  render: function (features, img) {
    var track  = this;
    var params = img.data();
    img.data({ height: this.yOffset + this.featureHeight + this.shadow.blur });

    var base   = this.base;
    var render = function (data) {
      track.parseVariationData(data);
      track.scaleFeatures(track.variations, params.scale);
      track.positionFeatures(track.variations, params);
      base.call(track, features, img);
    };

    if (!!$.when) {
      $.when(this.getVariationData(params.start, params.end))
       .done(render);
    } else {
      $.ajax({
        url       : Genoverse.Track.prototype.parseUrl.apply(this, [params.start, params.end, this.variationUrl]),
        dataType  : 'json',
        xhrFields : this.xhrFields,
        async     : true,
        success   : render
      });
    }
  },

  draw: function (features, context, scale) {
    this.base(features, context, scale);

    // TODO: overlapping variations only
    this.drawVariations(this.variations, context, scale);
  },

  drawVariations: function (variations, context, scale) {
    for (var i = 0; i < variations.length; i++) {
      var variation = variations[i];
      if (variation.chr != this.browser.chr) continue;

      var position  = variation.position[scale];

      var referenceScaledWidth = scale * variation.reference_allele.length;
      var alternateScaledWidth = scale * variation.alternate_allele.length;
      var halfDelta = (referenceScaledWidth - alternateScaledWidth)/2;

      position.X += halfDelta;
      position.Y = this.yOffset - (1 + this.distance)*this.featureHeight;

      var referenceScaledWidth = variation.reference_allele.length * this.scale; 
      var alternateScaledWidth = variation.alternate_allele.length * this.scale; 

      context.strokeStyle = this.variationColor(variation);
      this.applyShadow(context);

      context.beginPath();
      context.moveTo(position.X, position.Y);
      context.lineTo(position.X + alternateScaledWidth, position.Y);
      context.lineTo(position.X + alternateScaledWidth, position.Y + this.featureHeight);

      context.lineTo(position.X + alternateScaledWidth + halfDelta, this.yOffset);
      context.lineTo(position.X + alternateScaledWidth + halfDelta, this.yOffset + this.featureHeight);
      context.lineTo(position.X - halfDelta, this.yOffset + this.featureHeight);
      context.lineTo(position.X - halfDelta, this.yOffset);

      context.lineTo(position.X, position.Y + this.featureHeight);
      context.lineTo(position.X, position.Y);
      context.closePath();

      context.stroke();
      this.repealShadow(context);

      context.fillStyle   = this.variationColor(variation);
      context.globalAlpha = 0.5;
      context.fill();
      context.globalAlpha = 1;

      this.drawSequence(
        variation,
        context,
        scale
      );

    }    
  },

  variationColor: function (variation) {
    return '#1DD300';
  },

  click: function (e) {
    var x = (e.pageX - this.container.parent().offset().left)/this.scale + this.browser.start;
    var y = e.pageY - $(e.target).offset().top;    

    for (var i = 0; i < this.variations.length; i++) {
      var variation = this.variations[i];
      if (x > variation.start && x < variation.start + Math.max(variation.reference_allele.length, variation.alternate_allele.length)) {
        this.browser.makeMenu(variation, { left: e.pageX, top: e.pageY }, this);
      }
    }
  },

  populateMenu: function (variation) {
    return {
      title : variation.type,
      Start : variation.start,
      End   : variation.end
    };
  },

  applyShadow: function (context) {
    if (this.shadow) {
      context.shadowOffsetX = this.shadow.offsetX;
      context.shadowOffsetY = this.shadow.offsetY;
      context.shadowBlur    = this.shadow.blur;
      context.shadowColor   = this.shadow.color;
    }
  },

  repealShadow: function (context) {
    context.shadowBlur = 0;
  },

};



var myPatientCNV = {
  name             : 'My Patient: CNVs',
  id               : 'myPatientCNV',
  category         : 'My Patient',
  tags             : ['My patient', 'DECIPHER', 'CNV', 'Copy number', 'Variants'],
  url              : '/patient_features;json?region=__CHR__:__START__-__END__&id_patient=269856',
  height           : 55,
  featureHeight    : 10,
  labels           : 'overlay',
  resizable        : true,
  featureSpacing   : 5,
  background       : '#F7FFF2',
  xhrFields        : { withCredentials: true },
  info             : 'Copy-number variant(s) observed in the current patient',
  parseData        : function (data) {
    var i = data.length;

    while (i--) {
      data[i].id         = data[i].chr_start + '_' + data[i].chr_end;
      data[i].label      = 'Affected patient';
      data[i].mean_ratio = parseFloat(data[i].mean_ratio);
      data[i].color      = data[i].mean_ratio > 0 ? "#0052FF" : "#FF2F00";
      data[i].labelColor = 'white';
      data[i].start      = parseFloat(data[i].chr_start);
      data[i].end        = parseFloat(data[i].chr_end);
      this.insertFeature(data[i]);
    }
  },
  populateMenu : function (feature) {
    return {
      title        : '('+ this.browser.chr +':'+ feature.start +'-'+ feature.end +')'+ (feature.mean_ratio > 0 ? 'Dup' : 'Del'),
      Patient      : '<a href="/patient/'+ feature.id_patient +'">'+ feature.id_patient +'</a>',
      Length       : (feature.end - feature.start + 1) + ' bp',
      Location     : this.browser.chr +':'+ feature.start +'-'+ feature.end,
      'Mean ratio' : feature.mean_ratio,
      Inheritance  : feature.classification_type,
    };
  }    
};



var decipherPatientsSeqVar = {
  name             : "DECIPHER: SNVs, InDels", 
  category         : 'DECIPHER Patients',
  tags             : ['Patients', 'DECIPHER', 'Other', 'Sequence', 'Variants'],
  url              : "/sequence_variant;json?region=__CHR__:__START__-__END__",
  height           : 55,
  featureHeight    : 30,
  info             : 'Sequence variants observed in other DECIPHER patients' + legend(variationColorMap),
  shadow        : {
    offsetX : 0,
    offsetY : 0,
    blur    : 5,
    color   : "black"
  },

  parseData        : function (data) {
    for (var i=0; i<data.length; i++) {
      if (data[i].id_patient == this.browser.id_patient) continue;
      data[i].id    = data[i].id_patient + '-' + data[i].chr_start;
      data[i].label = data[i].id;
      data[i].color = variationColorMap[data[i].vep_category];
      data[i].start = parseFloat(data[i].chr_start);
      data[i].end   = parseFloat(data[i].chr_end);
      this.insertFeature(data[i]);
    }
  },

  populateMenu     : function (feature) {
    return {
      title    : feature.reference_allele + '/' + feature.alternate_allele,
      Patient  : '<a href="/patient/'+ feature.id_patient +'">' + feature.id_patient + '</a>',
      Location : feature.chr + ':' + feature.start + '-' + feature.end,
      Genotype : feature.genotype,
      Type     : feature.variant_type,
      Consequence: feature.vep_category,
    };
  },

  draw: function(features, context, scale) {
    context.shadowOffsetX = this.shadow.offsetX;
    context.shadowOffsetY = this.shadow.offsetY;
    context.shadowBlur    = this.shadow.blur;
    context.shadowColor   = this.shadow.color;
    this.base(features, context, scale);
  }

};



var decipherPatientsCNV = {
  name             : 'DECIPHER: CNVs',
  id               : 'decipherPatientsCNV',
  category         : 'DECIPHER Patients',
  tags             : ['Patients', 'DECIPHER', 'Other', 'CVN', 'Copy number', 'Variants'],
  url              : '/patient_features;json?region=__CHR__:__START__-__END__',
  height           : 200,
  //hidden         : true,
  xhrFields        : { withCredentials: true },
  featureHeight    : 6,
  featureSpacing   : 2,
  labels           : true,
  bump             : true,
  resizable        : true,
  info             : 'Copy-number variants observed in other DECIPHER patients',
  controls         : [ DECIPHERgainLossFilter, squishControl ],
  filterFeature    : function (featre) { },
  parseData        : function (data) {
    var i = data.length;
    while (i--) {
      if (this.filterFeature(data[i])) continue;
      if (data[i].id_patient == this.browser.id_patient) continue;

      data[i].id         = data[i].id_patient;
      data[i].label      = data[i].id_patient;
      data[i].mean_ratio = parseFloat(data[i].mean_ratio);
      data[i].color      = data[i].mean_ratio > 0 ? "#0052FF" : "#FF2F00";
      data[i].labelColor = data[i].mean_ratio > 0 ? "#0052FF" : "#FF2F00";
      data[i].start      = parseFloat(data[i].chr_start);
      data[i].end        = parseFloat(data[i].chr_end);
      this.insertFeature(data[i]);
    }
  },

  // findFeatures     : function (start, end) {
  //   return this.base(start, end).sort(function (a, b) { a.width > b.width });
  // },

  populateMenu     : function (feature) {
    return {
      title   : '('+ this.browser.chr +':'+ feature.start +'-'+ feature.end +')'+ (feature.mean_ratio > 0 ? 'Dup' : 'Del'),
      Patient : '<a href="/patient/'+ feature.id_patient +'">'+ feature.id_patient +'</a>',
      Length  : (feature.end - feature.start + 1) + ' bp',
      Location: this.browser.chr +':'+ feature.start +'-'+ feature.end,
      'Mean ratio': feature.mean_ratio,
      Inheritance : feature.classification_type,
    };
  },
};



var populationCNV = {
  name             : 'Population: CNVs',
  category         : 'Population',
  tags             : ['Population', 'Common', 'CNV', 'Variants', 'Copy number'],
  url              : '/cnv;json?region=__CHR__:__START__-__END__',
  height           : 55,
  featureHeight    : 10,
  featureSpacing   : 2,
  bump             : true,
  resizable        : true,
  info             : 'Common copy-number variants observed in the general population<br /><a target=_blank href="https://decipher.sanger.ac.uk/pdfs/CNV_Consensus_Track.pdf">What is the CNV Consensus Track</a>',

  colors           : { 
    1: {
      "-1" : "#FFD6D6",
      "0"  : "#DEDEDE",
      "1"  : "#E0E0FF"
    },
    2: {
      "-1" : "#FFA3A3",
      "0"  : "#ABABAB",
      "1"  : "#ADADFF"
    },
    3: {
      "-1" : "#FF7070",
      "0"  : "#919191",
      "1"  : "#7A7AFF"
    },
    4: {
      "-1" : "#FF3D3D",
      "0"  : "#5E5E5E",
      "1"  : "#4747FF"
    }
  },

  parseData : function (data) {
    var i = data.length;
    while (i--) {
      var cnv = data[i];
      cnv.color = this.colors[cnv.proof][cnv.type];
      cnv.start = parseFloat(cnv.chr_start);
      cnv.end   = parseFloat(cnv.chr_end);
      this.insertFeature(cnv);
    }
  },

  populateMenu : function (feature) {
    return {
      title   : 'Consensus CNV',
      Type    : commonCNVType[feature.type],
      Proof   : commonCNVProof[feature.proof],
      Location: this.browser.chr +':'+ feature.start +'-'+ feature.end,
      Length  : (feature.end - feature.start + 1) + ' bp',
    };
  }  
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
  url              : '/syndrome_features;json?region=__CHR__:__START__-__END__',
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


var ISCA = {
  name          : 'ISCA',
  id            : 'ISCA',
  url           : '/isca;json?region=__CHR__:__START__-__END__',
  height        : 55,
  featureHeight : 6,
  featureSpacing: 2,
  bump          : true,
  labels        : true,
  resizable     : true,
  info          : 'ISCA test track (pathogenic)',
  background    : '#FFF9F0',
  controls      : [ ISCAGainLossFilter, ISCAPathogenicityFilter, squishControl ],
  filterFeature    : function (featre) { 
    return !(featre.pathogenicity == 'Pathogenic' || featre.pathogenicity == 'Likely Pathogenic');
  },
  parseData     : function (data) {
    var i = data.length;
    while (i--) {
      if (this.filterFeature(data[i])) continue;

      var transparency = '0,0';
      switch(data[i].pathogenicity) {
        case 'Likely Pathogenic':
          transparency = '140,140';
        break;
        case 'Likely Benign':
          transparency = '140,140';
        break;
        case 'Uncertain':
          transparency = '230,230';
        break;
      };

      switch(data[i].type) {
        case 'Gain':
          data[i].color = 'rgb('+ transparency +',255)';
          data[i].labelColor = 'rgb(0,0,255)';
        break;
        case 'Loss':
          data[i].color = 'rgb(255,'+ transparency +')';
          data[i].labelColor = 'rgb(255,0,0)';
        break;
      };

      data[i].id     = data[i].id_isca;
      data[i].label  = data[i].id_isca;
      data[i].start  = parseFloat(data[i].chr_start);
      data[i].end    = parseFloat(data[i].chr_end);
      this.insertFeature(data[i]);
    }
  },
  populateMenu: function (feature) {
    return {
      title         : '<a target=_blank href="http://www.iscaconsortium.org/isca/ucsc/hg19/DetailsPages/'+ feature.id_isca +'.html">'+ feature.id_isca + '</a>',
      Location      : feature.chr + ':' + feature.start + '-' + feature.end,
      Pathogenicity : feature.pathogenicity,
      Type          : feature.type
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
  url              : '/gene;json?region=__CHR__:__START__-__END__',
  height           : 100,
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
  name             : 'Transcripts',
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
  myPatientSeqVar, 
  myPatientCNV,
  decipherPatientsSeqVar, 
  decipherPatientsCNV,
  syndromes,
  dbSNP, 
  populationCNV,
  genes, 
  transcripts,
  ISCA,
  HGMD
];


var defaultTracks = [
  {
    type : 'Scalebar',
    height : 25,
  },  
  genes, 
  myPatientSeqVar, 
  myPatientCNV,
  decipherPatientsSeqVar, 
  decipherPatientsCNV,
  syndromes,
  dbSNP, 
  populationCNV,
  ISCA,
  HGMD
];