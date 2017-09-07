Genoverse.Track.File.BIGBED = Genoverse.Track.File.BED.extend({
  name  : 'bigbed',
  model : Genoverse.Track.Model.File.BED.extend({
    getData: function (chr, start, end) {
      var model    = this;
      var deferred = $.Deferred();

      if (!this.bigbedFile) {
        this.bigbedFile = this.bigbedFile || (this.url ? new dallianceLib.URLFetchable(this.url) : new dallianceLib.BlobFetchable(this.track.dataFile));
      }

      var d = $.Deferred().done(function () {
        model.bwReader.getValues(chr, start, end, function (features, error) {
          if (!error) {
            features.sort(function (a, b) { return a.start - b.start; });

            if (features.length) {
              model.receiveData(features, chr, features[0].start, features[features.length - 1].end);
            } else {
              model.receiveData(features, chr, start, end);
            }
          }

          deferred.resolveWith(model);
        });
      });

      if (this.bwReader) {
        d.resolve();
      } else {
        new BWReader(this.bigbedFile, function (bwReader) {
          if (bwReader) {
            model.bwReader = bwReader;
            d.resolve();
          } else {
            model.receiveData([], chr, start, end);
            return deferred.resolveWith(model);
          }
        });
      }

      return deferred;
    }
  })
});

Genoverse.Track.File.BB = Genoverse.Track.File.BIGBED;
