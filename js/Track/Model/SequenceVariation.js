Genoverse.Track.Model.SequenceVariation = Genoverse.Track.Model.extend({
  seqModel: Genoverse.Track.Model.Sequence.Ensembl,

  getSeqModel: function () {
    var models = this.prop('models');
    return models.seq = models.seq || this.track.newMVC(this.seqModel);
  },

  getData: function (start, end) {
    var deferred = $.Deferred();
    var seqData  = this.getSeqModel().checkDataRange(start, end);

    this.base(start, end).done(function () {
      if (seqData) {
        deferred.resolve();
      } else {
        this.getSeqModel().getData(start, end).done(deferred.resolve);
      }
    });

    return deferred;
  },

  checkDataRange: function (start, end) {
    return this.base(start, end) && this.getSeqModel().checkDataRange(start, end);
  },

  findFeatures: function (start, end) {
    return this.getSeqModel().findFeatures(start, end).concat(this.base(start, end));
  }
});