var Model = require('../Model')
var SequenceEnsembl = require('./Sequence/Ensembl')

module.exports = Model.extend({
  seqModel: SequenceEnsembl,

  getSeqModel: function () {
    var models = this.prop('models');
    models.seq = models.seq || this.track.newMVC(this.seqModel);
    return models.seq;
  },

  getData: function (chr, start, end) {
    var model    = this;
    var deferred = $.Deferred();
    var seqData  = this.getSeqModel().checkDataRange(chr, start, end);

    this.base(chr, start, end).done(function () {
      if (seqData) {
        deferred.resolve();
      } else {
        model.getSeqModel().getData(chr, start, end).done(deferred.resolve);
      }
    });

    return deferred;
  },

  insertFeature: function (feature) {
    return this.base($.extend(feature, {
      end      : feature.start + feature.alt_allele.length - 1,
      length   : feature.alt_allele.length,
      sequence : feature.alt_allele
    }));
  },

  checkDataRange: function (chr, start, end) {
    return this.base(chr, start, end) && this.getSeqModel().checkDataRange(chr, start, end);
  },

  findFeatures: function (chr, start, end) {
    return this.getSeqModel().findFeatures(chr, start, end).concat(this.base(chr, start, end));
  }
});
