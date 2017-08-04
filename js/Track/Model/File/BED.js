Genoverse.Track.Model.File.BED = Genoverse.Track.Model.File.extend({
  parseData: function (text, chr) {
    var lines = text.split('\n');

    for (var i = 0; i < lines.length; i++) {
      var fields = lines[i].split('\t');

      if (fields.length < 3 || fields[0] == 'track' || fields[0] == 'browser') {
        continue;
      }

      var len = fields.length;

      if (fields[0] == chr || fields[0].toLowerCase() == 'chr' + chr || fields[0].match('[^1-9]' + chr + '$')) {
        var feature = {};
        feature.chr = chr;
        feature.start = parseInt(fields[1], 10);
        feature.end   = parseInt(fields[2], 10);
        feature.name  = fields[3];

        if (len > 3) feature.score  = parseFloat(fields[4], 10);
        if (len > 5) feature.strand = fields[5];

        if (len > 7) {
          feature.thickStart  = fields[6];
          feature.thickEnd    = fields[7];
          feature.drawThick = (feature.thickStart == feature.thickEnd) ? false : true;
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
          var blockSizes  = fields[10].split(",").filter(function(n){ return n; });
          var blockStarts = fields[11].split(",").filter(function(n){ return n; });

          for(var j = 0; j < blockSizes.length; j++){
            var subfeature    = {};
            subfeature.start  = feature.start + parseInt(blockStarts[j], 10);
            subfeature.end    = subfeature.start + parseInt(blockSizes[j], 10);
            subfeature.height = this.prop('thinHeight'); // if subfeature lies entirely left / right to [ thickStart, thickEnd ]

            if(feature.drawThick && subfeature.start <= feature.thickEnd && subfeature.end >= feature.thickStart){
              //some kind of an overlap for sure
              if(subfeature.start > feature.thickStart && subfeature.end < feature.thickEnd){
                // subfeature within thickBlock, draw thick
                subfeature.height = this.prop('thickHeight');
                subfeatures.push(subfeature);
              }
              else if(subfeature.start < feature.thickStart && subfeature.end <= feature.thickEnd){
                //left overlap, split subfeature into 2 - thin | thick
                var thinFeature  = $.extend({}, subfeature, { end : feature.thickStart });
                var thickFeature = $.extend({}, subfeature, { start : feature.thickStart, height : this.prop('thickHeight') });

                subfeatures = subfeatures.concat([thinFeature, thickFeature]);
              }
              else if(subfeature.start >= feature.thickStart && subfeature.end > feature.thickEnd){
                //right overlap, split subfeature into 2 - thick | thin
                var thinFeature  = $.extend({}, subfeature, { start : feature.thickEnd });
                var thickFeature = $.extend({}, subfeature, { end : feature.thickEnd, height : this.prop('thickHeight') });

                subfeatures = subfeatures.concat([thickFeature, thinFeature]);
              }else{
                //thickBlock lies within subfeature, split into 3 - thin | thick | thin
                // the least possible case but lets be prepared for the outliers
                var thinFeature1 = $.extend({}, subfeature, { end : feature.thickStart });
                var thickFeature = { start : feature.thickStart, end : feature.thickEnd, height: this.prop('thickHeight') };
                var thinFeature2 = $.extend({}, subfeature, { start : feature.thickEnd });

                subfeatures = subfeatures.concat([thinFeature1, thickFeature, thinFeature2]);
              }
            }else{
              // no thick block
              subfeatures.push(subfeature);
            }

          }

          if(subfeatures.length) feature.subFeatures = subfeatures;
        }
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
