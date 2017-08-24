Genoverse.Track.Model.File.BIGWIG = Genoverse.Track.Model.Graph.Bar.extend({
  getData: function (chr, start, end) {
    var model    = this;
    var deferred = $.Deferred();

    if (!this.bigwigFile) {
      this.bigwigFile = this.bigwigFile || (this.url ? new dallianceLib.URLFetchable(this.url) : new dallianceLib.BlobFetchable(this.track.dataFile));
    }

    var d = $.Deferred().done(function () {
      model.bw.getValues(chr, start, end, function (features, error) {
        if (!error) {
          features.sort(function (a, b) { return a.start - b.start; });
          model.receiveData(features, chr, features[0].start, features[features.length - 1].end);
          deferred.resolveWith(model);
        }
      });
    });

    if (model.bw) {
      d.resolve();
    } else {
      new BWReader(this.bigwigFile, function (bw) {
        if (bw) {
          model.bw = bw;
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
