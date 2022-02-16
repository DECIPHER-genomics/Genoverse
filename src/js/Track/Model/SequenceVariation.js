import Model         from '../Model';
import SequenceModel from './Sequence/Ensembl';

export default Model.extend({
  seqModel: SequenceModel,

  getSeqModel: function () {
    const models = this.prop('models');

    models.seq = models.seq || this.track.newMVC(this.seqModel);

    return models.seq;
  },

  getData: function (chr, start, end) {
    const model    = this;
    const deferred = $.Deferred();
    const seqData  = this.getSeqModel().checkDataRange(chr, start, end);

    this.base(chr, start, end).done(() => {
      if (seqData) {
        deferred.resolve();
      } else {
        model.getSeqModel().getData(chr, start, end).done(deferred.resolve);
      }
    });

    return deferred;
  },

  insertFeature: function (feature) {
    return this.base({
      ...feature,
      end      : feature.start + feature.alt_allele.length - 1,
      length   : feature.alt_allele.length,
      sequence : feature.alt_allele,
    });
  },

  checkDataRange: function (chr, start, end) {
    return this.base(chr, start, end) && this.getSeqModel().checkDataRange(chr, start, end);
  },

  findFeatures: function (chr, start, end) {
    return this.getSeqModel().findFeatures(chr, start, end).concat(this.base(chr, start, end));
  },
});
