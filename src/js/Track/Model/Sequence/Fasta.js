import Model from '../Sequence';

export default Model.extend({
  url: 'https://wtsi-decipher-grp.github.io/Genoverse/data/Homo_sapiens.GRCh37.72.dna.chromosome.1.fa', // Example url

  // Following settings could be left undefined and will be detected automatically via .getStartByte()
  startByte  : undefined, // Byte in the file where the sequence actually starts
  lineLength : undefined, // Length of the sequence line in the file

  // TODO: Check if URL provided

  getData: function (chr, start, end) {
    const jQuery   = this.browser.jQuery;
    const deferred = jQuery.Deferred();

    jQuery.when(this.getStartByte()).done(() => {
      start = start - (start % this.chunkSize) + 1;
      end   = end + this.chunkSize - (end % this.chunkSize);

      const startByte = start - 1 + Math.floor((start - 1) / this.lineLength) + this.startByte;
      const endByte   = end   - 1 + Math.floor((end   - 1) / this.lineLength) + this.startByte;

      jQuery.ajax({
        url       : this.parseURL(),
        dataType  : this.dataType,
        headers   : { Range: `bytes=${startByte}-${endByte}` },
        xhrFields : this.xhrFields,
        success   : (data) =>  { this.receiveData(data, chr, start, end); },
        error     : this.track.controller.showError,
      }).done(() => {
        deferred.resolve();
      }).fail(() => {
        deferred.reject();
      });
    }).fail(() => {
      deferred.reject();
    });

    return deferred;
  },

  getStartByte: function () {
    if (this.startByteRequest) {
      return this.startByteRequest;
    }

    if (this.startByte === undefined || this.lineLength === undefined) {
      this.startByteRequest = this.browser.jQuery.ajax({
        url       : this.parseURL(),
        dataType  : 'text',
        headers   : { 'Range': 'bytes=0-300' },
        xhrFields : this.xhrFields,
        success   : (data) => {
          if (data.indexOf('>') === 0) {
            this.startByte = data.indexOf('\n') + 1;
          } else {
            this.startByte = 0;
          }

          this.lineLength = data.indexOf('\n', this.startByte) - this.startByte;
        },
      });

      return this.startByteRequest;
    }
  },
});
