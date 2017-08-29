Genoverse.Track.Model.File.WIG = Genoverse.Track.Model.Graph.Bar.extend({
  dataType: 'text',

  getData: function () {
    if (!this.url) {
      this.isLocal  = true;
      this.dataFile = this.track.dataFile;

      return Genoverse.Track.Model.File.prototype.getData.apply(this, arguments);
    }

    return this.base.apply(this, arguments);
  },

  parseData: function (text, chr, s, e) {
    var lines    = text.split('\n');
    var features = [];
    var fields, chrom, start, step, span, line, feature, i;

    while (lines.length && (line = lines.shift())) {
      if (line.indexOf('#') != -1 || line.indexOf('browser') != -1 || line.indexOf('track') != -1) {
        continue;
      } else {
        break;
      }
    }

    if (line) {
      fields = line.split(/\s+/);
      chrom  = parseInt(fields[1].split('=')[1].replace('chr',''));

      if (fields[0] == 'fixedStep') {
        start = parseInt(fields[2].split('=')[1]);
        step  = parseInt(fields[3].split('=')[1]);
        span  = fields[4] ? parseInt(fields[4].split('=')[1]) : 1;

        for (i = 0; i < lines.length; i++){
          features.push({
            chr    : chrom,
            start  : start,
            end    : start + span,
            height : parseFloat(lines[i])
          });

          start += step;
        }
      } else if (fields[0] == 'variableStep') {
        span = fields[2] ? parseInt(fields[2].split('=')[1]) : 1;

        for (i = 0; i < lines.length; i++){
          fields  = lines[i].split(/\s+/);
          feature = {
            chr    : chrom,
            start  : parseInt(fields[0], 10),
            height : parseFloat(fields[1])
          };

          feature.end = feature.start + span;

          features.push(feature);
        }
      }
    }

    return this.base.call(this, features, chr, s, e);
  }
});
