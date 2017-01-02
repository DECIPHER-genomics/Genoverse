Genoverse.Track.Model.File.BED = Genoverse.Track.Model.File.extend({
  parseData: function (text) {
    var lines = text.split('\n');

    for (var i = 0; i < lines.length; i++) {
      var fields = lines[i].split('\t');

      if (fields.length < 3) {
        continue;
      }

      if (fields[0] === this.browser.chr || fields[0].toLowerCase() === 'chr' + this.browser.chr || fields[0].match('[^1-9]' + this.browser.chr + '$')) {
        var score = parseFloat(fields[4], 10);
        var color = '#000000';

        if (fields[8]) {
          color = 'rgb(' + fields[8] + ')';
        } else {
          color = this.scoreColor(isNaN(score) ? 1000 : score);
        }

        this.insertFeature({
          start           : parseInt(fields[1], 10),
          end             : parseInt(fields[2], 10),
          id              : fields[1] + '-' + fields[3],
          label           : fields[3],
          color           : color,
          originalFeature : fields
        });
      }
    }
  },

  // As per https://genome.ucsc.edu/FAQ/FAQformat.html#format1 specification
  scoreColor: function (score) {
    if (score <= 166) { return 'rgb(219,219,219)'; }
    if (score <= 277) { return 'rgb(186,186,186)'; }
    if (score <= 388) { return 'rgb(154,154,154)'; }
    if (score <= 499) { return 'rgb(122,122,122)'; }
    if (score <= 611) { return 'rgb(94,94,94)';    }
    if (score <= 722) { return 'rgb(67,67,67)';    }
    if (score <= 833) { return 'rgb(42,42,42)';    }
    if (score <= 944) { return 'rgb(21,21,21)';    }
    return '#000000';
  }
});