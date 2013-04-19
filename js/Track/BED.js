Genoverse.Track.BED = Genoverse.Track.extend({

  // Defaults 
  name           : "BED",
  height         : 45,
  featureHeight  : 5,
  featureSpacing : 2,
  bump           : true,
  dataType       : 'text',
  color          : '#000000',
  labels         : true,

  parseData: function (text) {
    var lines = text.split("\n");

    for (var i=0; i<lines.length; i++) {

      var fields = lines[i].split("\t");
      if (fields.length < 3 || fields[0] != 'chr' + this.browser.chr) continue;

      var start = fields[1]*1;
      var end   = fields[2]*1;
      var id    = fields[3];
      this.insertFeature({
        start : fields[1]*1,
        end   : fields[2]*1,
        id    : fields[3],
        label : fields[3],
        color : 'rgb('+ (fields[8] || '0,0,0') +')'
      });
    }

  },

});