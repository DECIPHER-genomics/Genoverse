Genoverse.Track.Model.Annotation.GFF = Genoverse.Track.Model.Annotation.extend({

  // Defaults 
  name           : "GFF",
  dataType       : 'text',

  parseData: function (text) {
    var lines = text.split("\n");
    for (var i=0; i<lines.length; i++) {
      if (!lines[i].length || lines[i].indexOf('#') === 0) continue;

      var fields  = lines[i].split("\t");

      if (fields.length < 5) continue;
      if (fields[0] == this.browser.chr || fields[0].toLowerCase() == 'chr' + this.browser.chr || fields[0].match('[^1-9]'+ this.browser.chr +'$')) {
        var feature = {};


        feature.id     = fields.slice(0,5).join("|");
        feature.start  = fields[3]*1;
        feature.end    = fields[4]*1;

        feature.source = fields[1];
        feature.type   = fields[2];
        feature.score  = fields[5];
        feature.strand = fields[6] + '1';
        feature.label  = feature.source + ' ' + feature.type + ' ' + feature.start + '-' + feature.end;

        this.insertFeature(feature);
      }
    }
  },

});

Genoverse.Track.Model.Annotation.GTF = Genoverse.Track.Model.Annotation.GFF;