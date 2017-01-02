Genoverse.Track.Model.File.VCF = Genoverse.Track.Model.File.extend({
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

      if (fields[0] === this.browser.chr || fields[0] === 'chr' + this.browser.chr) {
        var id      = fields.slice(0, 3).join('|');
        var start   = parseInt(fields[1], 10);
        var alleles = fields[4].split(',');

        alleles.unshift(fields[3]);

        for (var j = 0; j < alleles.length; j++) {
          var end = start + alleles[j].length - 1;

          this.insertFeature({
            id              : id + '|' + alleles[j],
            sort            : j,
            start           : start,
            end             : end,
            width           : end - start,
            allele          : j === 0 ? 'REF' : 'ALT',
            sequence        : alleles[j],
            label           : alleles[j],
            labelColor      : '#FFFFFF',
            originalFeature : fields
          });
        }
      }
    }
  }
});