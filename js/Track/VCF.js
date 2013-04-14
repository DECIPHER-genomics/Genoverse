Genoverse.Track.VCF = Genoverse.Track.extend({

  // Defaults 
  name           : "VCF",  
  height         : 45,
  featureHeight  : 20,
  featureSpacing : 2,
  dataType       : 'text',
  color          : '#000000',

  parseData: function (text) {
    var lines = text.split("\n");
    for (var i=0; i<lines.length; i++) {
      if (!lines[i].length || lines[i].indexOf('#') === 0) continue;

      var fields  = lines[i].split("\t");
      if (fields.length < 5 || fields[0] != this.browser.chr) continue;

      var chr     = fields[0];
      var start   = fields[1]*1;
      var alleles = fields[4].split(",");
      var id      = fields[2] || fields[1];

      for (var j=0; j<alleles.length; j++) {
        var feature = {
          id     : id,
          start  : start,
          end    : start + alleles[j].length,
          width  : alleles[j].length,
          allele : alleles[j]
        };
        this.insertFeature(feature);        
      }
    }
  },

});