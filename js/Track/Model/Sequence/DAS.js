Genoverse.Track.Model.Sequence.DAS = Genoverse.Track.Model.Sequence.extend({

  name     : 'DAS Sequence',
  dataType : 'xml',
  url      : 'http://www.ensembl.org/das/Homo_sapiens.GRCh37.reference/sequence?segment=__CHR__:__START__,__END__', // Example url

  parseData: function (data) {
    var track = this;
    $(data).find('SEQUENCE').each(function (index, SEQUENCE) {

      var sequence = $(SEQUENCE).text();
      var start = parseInt(SEQUENCE.getAttribute('start'));

      // Check if the sequence is multi-line or not
      if (track.multiLine === undefined) {
        if (sequence.indexOf("\n") !== -1) {
          track.multiLine = true;
        } else {
          track.multiLine = false;
        }
      }

      if (track.multiLine) {
        sequence = sequence.replace(/\n/g, "");
        sequence = sequence.toUpperCase();
      }

      track.base.apply(track, [ sequence, start ]);
    });
  },

});  