Genoverse.Track.TranslatedSequence = Genoverse.Track.Sequence.extend({
  constructor: function (config) {
    this.base(config);
    this.featuresHeight = (this.featureHeight + this.bumpSpacing) * 3 + this.spacing;
    this.widestLabel    = this.lowerCase ? 'm' : 'M';
    this.chunkSize      = 600; // Must be divisible by 3 and 2
    this.buffer         = 2;
    this.codonTableId   = 1;
    this.codons         = {};
    
    var bases = this.lowerCase ? [ 't', 'c', 'a', 'g' ] : [ 'T', 'C', 'A', 'G' ];
    var x     = 0;
    var j, k;
    
    for (var i in bases) {
      for (j in bases) {
        for (k in bases) {
          this.codons[bases[i] + bases[j] + bases[k]] = x++;
        }
      }
    }
    
    if (this.lowerCase) {
      for (i in this.translate) {
        this.translate[i] = this.translate[i].toLowerCase();
      }
    }
  },
  
  /*
    Numerical ids based on BioPerl codon table ids.
    The amino acid codes are IUPAC recommendations for common amino acids:
      A      Ala      Alanine
      R      Arg      Arginine
      N      Asn      Asparagine
      D      Asp      Aspartic acid
      C      Cys      Cysteine
      Q      Gln      Glutamine
      E      Glu      Glutamic acid
      G      Gly      Glycine
      H      His      Histidine
      I      Ile      Isoleucine
      L      Leu      Leucine
      K      Lys      Lysine
      M      Met      Methionine
      F      Phe      Phenylalanine
      P      Pro      Proline
      O      Pyl      Pyrrolysine (22nd amino acid)
      U      Sec      Selenocysteine (21st amino acid)
      S      Ser      Serine
      T      Thr      Threonine
      W      Trp      Tryptophan
      Y      Tyr      Tyrosine
      V      Val      Valine
      B      Asx      Aspartic acid or Asparagine
      Z      Glx      Glutamine or Glutamic acid
      J      Xle      Isoleucine or Valine (mass spec ambiguity)
      X      Xaa      Any or unknown amino acid
  */
  translate: {                                                                                                                                        
    1  : 'FFLLSSSSYY**CC*WLLLLPPPPHHQQRRRRIIIMTTTTNNKKSSRRVVVVAAAADDEEGGGG',  // Standard
    2  : 'FFLLSSSSYY**CCWWLLLLPPPPHHQQRRRRIIMMTTTTNNKKSS**VVVVAAAADDEEGGGG',  // Vertebrate Mitochondrial
    3  : 'FFLLSSSSYY**CCWWTTTTPPPPHHQQRRRRIIMMTTTTNNKKSSRRVVVVAAAADDEEGGGG',  // Yeast Mitochondrial
    4  : 'FFLLSSSSYY**CCWWLLLLPPPPHHQQRRRRIIIMTTTTNNKKSSRRVVVVAAAADDEEGGGG',  // Mold Protozoan and CoelenterateMitochondrial and Mycoplasma/Spiroplasma
    5  : 'FFLLSSSSYY**CCWWLLLLPPPPHHQQRRRRIIMMTTTTNNKKSSSSVVVVAAAADDEEGGGG',  // Invertebrate Mitochondrial
    6  : 'FFLLSSSSYYQQCC*WLLLLPPPPHHQQRRRRIIIMTTTTNNKKSSRRVVVVAAAADDEEGGGG',  // Ciliate Dasycladacean and Hexamita Nuclear
    9  : 'FFLLSSSSYY**CCWWLLLLPPPPHHQQRRRRIIIMTTTTNNNKSSSSVVVVAAAADDEEGGGG',  // Echinoderm Mitochondrial
    11 : 'FFLLSSSSYY**CC*WLLLLPPPPHHQQRRRRIIIMTTTTNNKKSSRRVVVVAAAADDEEGGGG',  // Euplotid Nuclear
    10 : 'FFLLSSSSYY**CCCWLLLLPPPPHHQQRRRRIIIMTTTTNNKKSSRRVVVVAAAADDEEGGGG',  // Bacterial
    12 : 'FFLLSSSSYY**CC*WLLLSPPPPHHQQRRRRIIIMTTTTNNKKSSRRVVVVAAAADDEEGGGG',  // Alternative Yeast Nuclear
    13 : 'FFLLSSSSYY**CCWWLLLLPPPPHHQQRRRRIIMMTTTTNNKKSSGGVVVVAAAADDEEGGGG',  // Ascidian Mitochondrial
    14 : 'FFLLSSSSYYY*CCWWLLLLPPPPHHQQRRRRIIIMTTTTNNNKSSSSVVVVAAAADDEEGGGG',  // Flatworm Mitochondrial
    15 : 'FFLLSSSSYY*QCC*WLLLLPPPPHHQQRRRRIIIMTTTTNNKKSSRRVVVVAAAADDEEGGGG',  // Blepharisma Nuclear
    16 : 'FFLLSSSSYY*LCC*WLLLLPPPPHHQQRRRRIIIMTTTTNNKKSSRRVVVVAAAADDEEGGGG',  // Chlorophycean Mitochondrial
    21 : 'FFLLSSSSYY**CCWWLLLLPPPPHHQQRRRRIIMMTTTTNNNKSSSSVVVVAAAADDEEGGGG',  // Trematode Mitochondrial
    22 : 'FFLLSS*SYY*LCC*WLLLLPPPPHHQQRRRRIIIMTTTTNNKKSSRRVVVVAAAADDEEGGGG',  // Scenedesmus obliquus Mitochondrial
    23 : 'FF*LSSSSYY**CC*WLLLLPPPPHHQQRRRRIIIMTTTTNNKKSSRRVVVVAAAADDEEGGGG'   // Thraustochytrium Mitochondrial
  },
  
  parseFeatures: function (data, bounds) {
    if (data.codonTableId) {
      this.codonTableId = data.codonTableId;
    }
    
    return this.base(data, bounds);
  },
  
  draw: function () {
    this.drawn = {};
    return this.base.apply(this, arguments);
  },
  
  drawSequence: function (image, feature) {
    var scaledStart = this.scale * feature.start - image.scaledStart;
    var width       = this.scale * 3;
    var drawLabels  = this.labelWidth[this.widestLabel] < width - 1;
    var labelY      = (this.featureHeight + (this.lowerCase ? 0 : 1)) / 2;
    var phase       = 3;
    var start, id, codon, sequence, y, i;
    
    while (phase--) {
      for (i = phase - 2; i < feature.sequence.length; i += 3) {
        start = scaledStart + i * this.scale;
        
        if (start < -width || start > image.width) {
          continue;
        }
        
        id = phase + ':' + (feature.start + i) + ':' + feature.strand;
        
        if (this.drawn[id]) {
          continue;
        }
        
        sequence = feature.sequence.substr(i, 3);
        
        if (this.strand === -1) {
          sequence = sequence.split('').reverse().join('');
        }
        
        codon = typeof this.codons[sequence] === 'number' ? this.translate[this.codonTableId].charAt(this.codons[sequence]) : this.lowerCase ? 'x' : 'X';
        y     = phase * (this.featureHeight + this.bumpSpacing);
        
        this.context.fillStyle = this.colors[codon] || this.colors['default'];
        this.context.fillRect(start, y, width, this.featureHeight);
        
        if (!this.labelWidth[codon]) {
          this.labelWidth[codon] = Math.ceil(this.context.measureText(codon).width) + 1;
        }
        
        if (drawLabels) {
          this.context.fillStyle = this.labelColors[codon] || this.labelColors['default'];
          this.context.fillText(codon, start + (width - this.labelWidth[codon]) / 2, y + labelY);
        }
        
        this.drawn[id] = codon.toLowerCase() === 'x' ? 0 : 1;
      }
    }
  },
  
  click: function (e) {
    var x        = Math.floor((e.pageX - this.container.parent().offset().left + this.browser.scaledStart) / this.scale);
    var phase    = Math.floor((e.pageY - $(e.target).offset().top) / (this.featureHeight + this.bumpSpacing));
    var diff     = phase - (x % 3);
    var strand   = this.strand;
    var features = $.grep(this.features.search({ x: x, w: 1, y: 0, h: 1 }), function (f) { return f.strand === strand; });
    var i        = features.length;
    var seq, codon, feature;
    
    while (i--) {
      feature = features[i];
      
      if (diff === 0) {
        x--;
      } else if (diff === -1 || diff === 2) {
        x -= 2;
      }
      
      seq = feature.sequence.substr(x - feature.start, 3);
      
      if (strand === -1) {
        seq = seq.split('').reverse().join('');
      }
      
      codon = typeof this.codons[seq] === 'number' ? this.translate[this.codonTableId].charAt(this.codons[seq]) : this.lowerCase ? 'x' : 'X';
      
      if (codon.toLowerCase() !== 'x' || !i) {
        this.browser.makeMenu(this, this.menuFeature(feature, x, codon), { left: e.pageX, top: e.pageY });
        break;
      }
    }
  },
  
  menuFeature: function (feature, position, codon) {
    return {
      id    : feature.id + ':' + position,
      title : codon + '; Location: ' + this.browser.chr + ':' + position + '-' + (position + 2)
    };
  }
});