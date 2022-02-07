import { URLFetchable, BlobFetchable } from 'js/lib/dalliance-lib';
import BWReader                        from 'js/lib/BWReader';
import Track                           from 'js/Track/library/Graph/Bar';

export default Track.extend({
  name   : 'bigwig',
  height : 100,

  setDefaults: function () {
    this.bwReader = null; // Not part of model since it needs to be shared between bar and line graphs
    this.base.apply(this, arguments);
  },

  getData: function (chr, start, end) {
    var model    = this;
    var deferred = $.Deferred();

    if (!this.bigwigFile) {
      this.bigwigFile = this.bigwigFile || (this.url ? new URLFetchable(this.url) : new BlobFetchable(this.track.dataFile));
    }

    var d = $.Deferred().done(function () {
      model.prop('bwReader').getValues(chr, start, end, function (features, error) {
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

    if (this.prop('bwReader')) {
      d.resolve();
    } else {
      new BWReader(this.bigwigFile, function (bwReader) {
        if (bwReader) {
          model.prop('bwReader', bwReader);
          d.resolve();
        } else {
          model.receiveData([], chr, start, end);
          return deferred.resolveWith(model);
        }
      });
    }

    return deferred;
  }
});
