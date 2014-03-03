Genoverse.Track.Model.SequenceVariation = Genoverse.Track.Model.extend({
  seqModel: Genoverse.Track.Model.Sequence.Ensembl,
  
  constructor: function () {
    this.base.apply(this, arguments);
    this.prop('models').seq = this.track.newMVC(this.seqModel);
  },
  
  getData: function (start, end) {
    var deferred = $.Deferred();
    
    this.base(start, end).done(function () { this.prop('models').seq.getData(start, end).done(deferred.resolve); });
    
    return deferred;
  },
  
  findFeatures: function (start, end) {
    return this.prop('models').seq.findFeatures(start, end).concat(this.base(start, end));
  }
});