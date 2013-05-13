Genoverse.Track.File.VCF = Genoverse.Track.File.extend({

  // Defaults 
  name           : "VCF",  
  height         : 45,
  featureHeight  : 20,
  featureSpacing : 2,
  dataType       : 'text',
  labels         : 'overlay',
  color          : '#000000',

  parseData: function (text) {
    //debugger;
    var lines = text.split("\n");
    for (var i=0; i<lines.length; i++) {
      if (!lines[i].length || lines[i].indexOf('#') === 0) continue;

      var fields  = lines[i].split("\t");

      if (fields.length < 5) continue;

      if (fields[0] == this.browser.chr || fields[0] == 'chr' + this.browser.chr || fields[0].match('0*'+ this.browser.chr +'$')) {
        var chr     = fields[0];
        var start   = fields[1]*1;
        var alleles = fields[4].split(",");
        var id      = i;

        for (var j=0; j<alleles.length; j++) {
          var end     = start + Math.max(fields[3].length, alleles[j].length);
          
          var feature = {
            id     : id,
            start  : start,
            end    : end,
            width  : end - start,
            allele : alleles[j],
            label  : alleles[j],
            labelColor: 'white',
            originalFeature: fields,
          };
          this.insertFeature(feature);        
        }
      }

    }
  },


  populateMenu: function (feature) {
    return {
      title  : '<a target=_blank href="http://www.1000genomes.org/node/101">VCF feature details</a>',
      CHROM  : feature.originalFeature[0],
      POS    : feature.originalFeature[1],
      ID     : feature.originalFeature[2],
      REF    : feature.originalFeature[3],
      ALT    : feature.originalFeature[4],
      QUAL   : feature.originalFeature[5],
      FILTER : feature.originalFeature[6],
      INFO   : feature.originalFeature[7].split(';').join('<br>')
    };
  },


});