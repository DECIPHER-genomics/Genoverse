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
      var id    = fields[1] + '-' + fields[3];
      var score = isNaN(parseFloat(fields[4])) ? 1000 : fields[4];
      var color = "#000000";

      if (fields[8]) {
        color = 'rgb('+ fields[8] +')';
      } else if (!isNaN(parseFloat(fields[4]))) {
        color = this.scoreColor(fields[4]);
      }

      this.insertFeature({
        start : start,
        end   : end,
        id    : id,
        label : fields[3],
        color : color,
        originalFeature : fields,
      });
    }
  },

  // As per https://genome.ucsc.edu/FAQ/FAQformat.html#format1 specification
  scoreColor: function (score) {
    if (score <=166) return 'rgb(219,219,219)';
    if (score <=277) return 'rgb(186,186,186)'; 
    if (score <=388) return 'rgb(154,154,154)'; 
    if (score <=499) return 'rgb(122,122,122)'; 
    if (score <=611) return 'rgb(94,94,94)'; 
    if (score <=722) return 'rgb(67,67,67)'; 
    if (score <=833) return 'rgb(42,42,42)'; 
    if (score <=944) return 'rgb(21,21,21)'; 
    return "#000000";
  },


  populateMenu: function (feature) {
    return {
      title       : '<a target=_blank href="https://genome.ucsc.edu/FAQ/FAQformat.html#format1">BED feature details</a>',
      chrom       : feature.originalFeature[0],
      chromStart  : feature.originalFeature[1],
      chromEnd    : feature.originalFeature[2],
      name        : feature.originalFeature[3],
      score       : feature.originalFeature[4],
      strand      : feature.originalFeature[5],
      thickStart  : feature.originalFeature[6],
      thickEnd    : feature.originalFeature[7],
      itemRgb     : feature.originalFeature[8],
      blockCount  : feature.originalFeature[9],
      blockSizes  : feature.originalFeature[10],
      blockStarts : feature.originalFeature[11],
    };
  },

});