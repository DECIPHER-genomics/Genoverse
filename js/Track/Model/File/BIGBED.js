Genoverse.Track.Model.File.BIGBED = Genoverse.Track.Model.File.extend({
  getData: function (chr, start, end) {
    var model    = this;
    var deferred = $.Deferred();

    if (!this.bigbedFile) {
      this.bigbedFile = this.bigbedFile || (this.url ? new dallianceLib.URLFetchable(this.url) : new dallianceLib.BlobFetchable(this.track.dataFile));
    }

    var d = $.Deferred().done(function () {
      model.bb.getValues(chr, start, end, function (features, error) {
        if (!error) {
          features.sort(function (a, b) { return a.start - b.start; });
          model.receiveData(features.join('\n'), chr, features[0].start, features[features.length - 1].end);
          deferred.resolveWith(model);
        }
      });
    });

    if (model.bb) {
      d.resolve();
    } else {
      new BWReader(this.bigbedFile, function (bb) {
        if (bb) {
          model.bb = bb;
          d.resolve();
        } else {
          model.receiveData([], chr, start, end);
          return deferred.resolveWith(model);
        }
      });
    }

    return deferred;
  },
  parseData : function(data, chr, start, end){
    return Genoverse.Track.Model.File.BED.prototype.parseData.call(this, data, chr);
  },

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
