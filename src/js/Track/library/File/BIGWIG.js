import Track                           from 'js/Track/library/Graph/Bar';
import BWReader                        from 'js/lib/BWReader';
import { URLFetchable, BlobFetchable } from 'js/lib/dalliance/bin';

export default Track.extend({
  name   : 'bigwig',
  height : 100,

  setDefaults: function (...args) {
    this.bwReader = null; // Not part of model since it needs to be shared between bar and line graphs
    this.base(...args);
  },

  getData: function (chr, start, end) {
    const deferred = $.Deferred();

    if (!this.bigwigFile) {
      this.bigwigFile = this.bigwigFile || (this.url ? new URLFetchable(this.url) : new BlobFetchable(this.track.dataFile));
    }

    const d = $.Deferred().done(() => {
      this.prop('bwReader').getValues(chr, start, end, (features, error) => {
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

    if (this.prop('bwReader')) {
      d.resolve();
    } else {
      new BWReader(this.bigwigFile, ((bwReader) => { // eslint-disable-line no-new
        if (bwReader) {
          this.prop('bwReader', bwReader);
          d.resolve();
        } else {
          this.receiveData([], chr, start, end);

          return deferred.resolveWith(this);
        }
      }));
    }

    return deferred;
  },
});
