Genoverse.Track.Model.File.BAM = Genoverse.Track.Model.File.extend({
  getData: function (chr, start, end) {
    var model    = this;
    var deferred = $.Deferred();

    if (!this.bamFile) {
      if (this.url) {
        this.bamFile = new dallianceLib.URLFetchable(this.url);
        this.baiFile = new dallianceLib.URLFetchable(this.url + this.prop('indexExt'));
      } else if (this.dataFile && this.indexFile) {
        this.bamFile = new dallianceLib.BlobFetchable(this.dataFile);
        this.baiFile = new dallianceLib.BlobFetchable(this.indexFile);
      } else {
        return deferred.rejectWith(model, [ 'BAM files must be accompanied by a .bai index file' ]);
      }
    }

    dallianceLib.makeBam(this.bamFile, this.baiFile, null, function (bam, makeBamError) {
      if (makeBamError) {
        console.error(makeBamError); // eslint-disable-line no-console
      } else {
        bam.fetch(chr, start, end, function (features, fetchBamError) {
          if (fetchBamError) {
            console.error(fetchBamError); // eslint-disable-line no-console
          } else {
            model.receiveData(features, chr, start, end);
            deferred.resolveWith(model);
          }
        });
      }
    });

    return deferred;
  },

  insertFeature: function (feature) {
    feature.id       = feature.chr + ':' + feature.readName + ':' + feature.pos;
    feature.start    = feature.pos + 1;
    feature.end      = feature.start + feature.seq.length;
    feature.sequence = feature.seq;

    return this.base(feature);
  }
});
