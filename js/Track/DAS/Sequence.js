Genoverse.Track.Sequence.DAS = Genoverse.Track.Sequence.extend({

  // Defaults 
  source : 'http://www.ensembl.org/das/Homo_sapiens.GRCh37.reference',

  init: function () {
    this.base();
    if (!this.url) this.url = this.source + '/sequence?segment=__CHR__:__START__,__END__';
  },  


  parseData: function (data) {
    var track = this;
    $(data).find('SEQUENCE').each(function (index, SEQUENCE) {
      var sequence = $(SEQUENCE).text();
      var start = parseInt(SEQUENCE.getAttribute('start'));
      track.base(sequence, start);
    });
  }

});