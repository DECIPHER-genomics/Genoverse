Genoverse.Track.Model.File.BED = Genoverse.Track.Model.File.extend({
  parseData: function (text, chr) {
    var lines = text.split('\n');

    for (var i = 0; i < lines.length; i++) {
      var fields = lines[i].split('\t');
     
      if (fields.length < 3 || fields[0] == 'track' || fields[0] == 'browser') {
        continue;
      }
      console.log(fields);
      var len = fields.length;

      if (fields[0] == chr || fields[0].toLowerCase() == 'chr' + chr || fields[0].match('[^1-9]' + chr + '$')) {
        var feature = {};
        feature.chr = chr;
        feature.start = parseInt(fields[1], 10);
        feature.end   = parseInt(fields[2], 10);
        feature.name  = fields[3];

        if (len > 3) feature.score = parseFloat(fields[4], 10);
        if (len > 5) feature.strand = fields[5];

        if (len > 7) {
          feature.thickStart = fields[6];
          feature.thickEnd   = fields[7];
          if(feature.thickEnd == feature.thickStart == feature.chromStart) feature.drawThickBlock = false;
        }

        var color = '#000000';

        if (fields[8]) {
          color = 'rgb(' + fields[8] + ')';
        } else {
          color = this.scoreColor(isNaN(score) ? 1000 : score);
        }

        if(len == 12){ //subfeatures present
          feature.blockCount = parseInt(fields[9],10);
          var subfeatures = [];
          var blockSizes = fields[10].split(",");
          var blockStarts = fields[11].split(",");
          blockSizes.pop();
          blockStarts.pop();

          for(var j = 0; j < blockSizes.length; j++){
            var subfeature = {};
            subfeature.start = feature.start + parseInt(blockStarts[j]);
            subfeature.end = subfeature.start + parseInt(blockSizes[j]);
            subfeature.height = 7;
            subfeature.color = 'black';
            subfeatures.push(subfeature);
          }

          feature.subFeatures = subfeatures;
        }
        console.log(feature);
        this.insertFeature(feature);
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
