import Model                           from 'js/Track/Model/File/BED';
import Track                           from 'js/Track/library/File/BED';
import BWReader                        from 'js/lib/BWReader';
import { URLFetchable, BlobFetchable } from 'js/lib/dalliance/bin';

export default Track.extend({
  name  : 'bigbed',
  model : Model.extend({
    getData: function (chr, start, end) {
      const deferred = $.Deferred();

      if (!this.bigbedFile) {
        this.bigbedFile = this.bigbedFile || (this.url ? new URLFetchable(this.url) : new BlobFetchable(this.track.dataFile));
      }

      const d = $.Deferred().done(() => {
        this.bwReader.getValues(chr, start, end, (features, error) => {
          if (!error) {
            features.sort((a, b) => a.start - b.start);

            if (features.length) {
              this.receiveData(features, chr, features[0].start, features[features.length - 1].end);
            } else {
              this.receiveData(features, chr, start, end);
            }
          }

          deferred.resolveWith(this);
        });
      });

      if (this.bwReader) {
        d.resolve();
      } else {
        new BWReader(this.bigbedFile, ((bwReader) => { // eslint-disable-line no-new
          if (bwReader) {
            this.bwReader = bwReader;
            d.resolve();
          } else {
            this.receiveData([], chr, start, end);

            return deferred.resolveWith(this);
          }
        }));
      }

      return deferred;
    },
  }),
});
