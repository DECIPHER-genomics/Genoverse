Genoverse.Track.Model.SequenceVariation = Genoverse.Track.Model.extend({
  seqModel: Genoverse.Track.Model.Sequence.Ensembl,
  
  constructor: function () {
    this.base.apply(this, arguments);
    this.prop('models').seq = this.track.newMVC(this.seqModel);
  },
  
  getData: function (start, end) {
    var deferred = $.Deferred();
    var seqData  = this.prop('models').seq.checkDataRange(start, end);
    
    this.base(start, end).done(function () {
      if (seqData) {
        deferred.resolve();
      } else {
        this.prop('models').seq.getData(start, end).done(deferred.resolve);
      }
    });
    
    return deferred;
  },
  
  checkDataRange: function (start, end) {
    return this.base(start, end) && this.prop('models').seq.checkDataRange(start, end);
  },
  
  findFeatures: function (start, end) {
    return this.prop('models').seq.findFeatures(start, end).concat(this.base(start, end));
  }
});