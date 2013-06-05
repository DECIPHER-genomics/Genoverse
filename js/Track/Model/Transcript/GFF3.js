// Basic GFF3 model for transcripts
// See http://www.broadinstitute.org/annotation/gebo/help/gff3.html 
Genoverse.Track.Model.Transcript.GFF3 = Genoverse.Track.Model.Transcript.extend({

  name     : 'GFF3 Transcript',
  dataType : 'text',

  parseData: function (text) {
    //debugger;
    var lines = text.split("\n");
    for (var i=0; i<lines.length; i++) {
      if (!lines[i].length || lines[i].indexOf('#') === 0) continue;

      var fields  = lines[i].split("\t");

      if (fields.length < 5) continue;

      if (fields[0] == this.browser.chr || fields[0] == 'chr' + this.browser.chr || fields[0].match('[^1-9]'+ this.browser.chr +'$')) {
        var feature = {};

        if (fields[8]) {
          var frame = fields[8].split(';');
          for (var j=0; j<frame.length; j++) {
            var keyValue = frame[j].split('=');
            if (keyValue.length == 2) feature[keyValue[0].toLowerCase()] = keyValue[1];
          }
        }

        feature.start  = fields[3]*1;
        feature.end    = fields[4]*1;
        feature.id     = feature.id || fields.slice(0,5).join("|");

        feature.source = fields[1];
        feature.type   = fields[2];
        feature.score  = fields[5];
        feature.strand = fields[6];

        // Assuming here that parent always goes first in the GFF file, 
        // which seems to be the case for most examples
        if (feature.parent) {
          if (!$.grep(this.featuresById[feature.parent].exons, function (exon) { return exon.id == feature.id }).length) {
            this.featuresById[feature.parent].exons.push(feature);
          }
        } else {
          feature.label = feature.name || feature.id || '';
          feature.exons = [];
          this.insertFeature(feature);
        }

      }
    }
  },

});