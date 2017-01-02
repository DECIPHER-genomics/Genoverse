Genoverse.Track.Model.File.GFF = Genoverse.Track.Model.File.extend({
  parseData: function (text) {
    var lines = text.split('\n');

    for (var i = 0; i < lines.length; i++) {
      if (!lines[i].length || lines[i].indexOf('#') === 0) {
        continue;
      }

      var fields = lines[i].split('\t');

      if (fields.length < 5) {
        continue;
      }

      var seqId = fields[0].toLowerCase();

      if (
        seqId === this.browser.chr                       ||
        seqId.toLowerCase() === 'chr' + this.browser.chr ||
        seqId.match('[^1-9]' + this.browser.chr + '$')   ||
        seqId.match('^' + this.browser.chr + '\\b')
      ) {
        this.insertFeature({
          id     : fields.slice(0, 5).join('|'),
          start  : parseInt(fields[3], 10),
          end    : parseInt(fields[4], 10),
          source : fields[1],
          type   : fields[2],
          score  : fields[5],
          strand : fields[6] + '1',
          label  : fields[1] + ' ' + fields[2] + ' ' + fields[3] + '-' + fields[4]
        });
      }
    }
  }
});

Genoverse.Track.Model.File.GTF = Genoverse.Track.Model.File.GFF;