import { URLFetchable, BlobFetchable } from 'js/lib/dalliance-lib';
import BWReader                        from 'js/lib/BWReader';
import Track                           from 'js/Track/library/File/BED';
import Model                           from 'js/Track/Model/File/BED';

export default Track.extend({
  name  : 'bigbed',
  model : Model.extend({
    getData: function (chr, start, end) {
      var model    = this;
      var deferred = $.Deferred();

      if (!this.bigbedFile) {
        this.bigbedFile = this.bigbedFile || (this.url ? new URLFetchable(this.url) : new BlobFetchable(this.track.dataFile));
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
