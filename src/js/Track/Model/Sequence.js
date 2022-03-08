import Model from '../Model';

// Abstract Sequence model
// assumes that the data source responds with raw sequence text
// see Fasta model for more specific example
export default Model.extend({
  threshold : 100000,
  chunkSize : 1000,
  buffer    : 0,
  dataType  : 'text',

  setChrProps: function () {
    const chr = this.browser.chr;

    this.base();

    this.chunksByChr      = this.chunksByChr || {};
    this.chunksByChr[chr] = this.chunksByChr[chr] || {};
  },

  getData: function (chr, start, end) {
    start = start - (start % this.chunkSize) + 1;
    end   = end + this.chunkSize - (end % this.chunkSize);

    return this.base(chr, start, end);
  },

  parseData: function (data, chr, start) {
    data = data.replace(/\n/g, '');

    if (this.prop('lowerCase')) {
      data = data.toLowerCase();
    }

    for (let i = 0; i < data.length; i += this.chunkSize) {
      if (this.chunksByChr[chr][start + i]) {
        continue;
      }

      const feature = {
        id       : `${chr}:${start}:${i}`,
        chr      : chr,
        start    : start + i,
        end      : start + i + this.chunkSize - 1,
        sequence : data.substr(i, this.chunkSize),
        sort     : start + i,
      };

      this.chunksByChr[chr][feature.start] = feature;
      this.insertFeature(feature);
    }
  },
});
