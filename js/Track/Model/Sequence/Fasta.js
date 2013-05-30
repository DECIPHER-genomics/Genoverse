Genoverse.Track.Model.Sequence.Fasta = Genoverse.Track.Model.Sequence.extend({

  // Defaults 
  name : 'Fasta',
  url  : '/data/Homo_sapiens.GRCh37.70.dna.chromosome.1.fa', // Example url
  
  // Following settings could be left undefined and will be detected automatically via .getStartByte()
  startByte  : undefined, // Byte in the file where the sequence actually starts
  lineLength : undefined, // Length of the sequence line in the file

  // TODO: Check if URL provided

  getData: function (start, end) {
    var promise = $.Deferred();

    $.when(this.getStartByte()).done(function () {
      start = start - start % this.chunkSize + 1;
      end   = end + this.chunkSize - end % this.chunkSize;

      var startByte = start - 1 + Math.floor((start - 1) / this.lineLength) + this.startByte;
      var endByte   = end   - 1 + Math.floor((end   - 1) / this.lineLength) + this.startByte;

      $.ajax({
        url       : this.parseUrl(start, end),
        dataType  : this.dataType,
        context   : this,
        headers   : { 'Range' : 'bytes='+ startByte +'-'+ endByte },
        xhrFields : this.xhrFields,
        success   : function (data) { this.receiveData(data, start, end); },
        error     : this.showError
      }).done(function () { promise.resolveWith(this) })
        .fail(function () { promise.rejectWith(this)  });;

    }).fail(function () { promise.rejectWith(this) });

    return promise;
  },

  getStartByte: function () {
    if (this.startByteRequest) 
      return this.startByteRequest;

    if (this.startByte === undefined || this.lineLength === undefined) {
      this.startByteRequest = $.ajax({
        url       : this.parseUrl(),
        dataType  : 'text',
        context   : this,
        headers   : {
          'Range' : 'bytes=0-300'
        },
        xhrFields : this.xhrFields,        
        success   : function (data) {
          if (data.indexOf('>') === 0) {
            this.startByte = data.indexOf('\n') + 1;
          } else {
            this.startByte = 0;
          }

          this.lineLength = data.indexOf('\n', this.startByte) - this.startByte;
        }
      });

      return this.startByteRequest;
    }
  },

});