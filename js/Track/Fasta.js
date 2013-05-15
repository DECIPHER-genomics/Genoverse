Genoverse.Track.Fasta = Genoverse.Track.Sequence.extend({

  // Defaults 
  name       : "Fasta",

  // Following settings could be left undefined and will be detected automatically via .getStartByte()
  startByte  : undefined, // Byte in the file where the sequence actually starts
  lineLength : undefined, // Length of the sequence line in the file

  getData: function (start, end) {
    var promise = $.Deferred();
    $.when(this.getStartByte()).done(function () {
      start = start - start % this.chunkSize + 1;
      end   = end + this.chunkSize - end % this.chunkSize;

      var startByte = start - 1 + Math.floor((start - 1) / this.lineLength) + this.startByte;
      var endByte   = end   - 1 + Math.floor((end   - 1) / this.lineLength) + this.startByte;

      $.ajax({
        url       : this.parseUrl(),
        dataType  : 'text',
        headers   : {
          'Range' : 'bytes='+ startByte +'-'+ endByte
        },
        context   : this, 
        xhrFields : this.xhrFields,
      }).done(function (sequence) {
        promise.resolveWith(this, [{
          start    : start,
          end      : end,
          sequence : sequence
        }]);
      }).fail(function () {
        promise.rejectWith(this, arguments);
      });
    });

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

  parseData: function (data) {
    data.sequence = data.sequence.replace(/\n/g, "").toLowerCase();
    for (var i=0; i<data.sequence.length; i+=this.chunkSize) {
      if (this.chunks[data.start + i]) continue;
      var feature = {
        id       : data.start + i,
        start    : data.start + i,
        end      : data.start + i + this.chunkSize,
        y        : this.yOffset,
        sequence : data.sequence.substr(i, this.chunkSize),
      };
      
      this.chunks[feature.start] = feature;
      this.features.insert({ x: feature.start, w: this.chunkSize, y:0, h:1 }, feature);
    }

  },


});