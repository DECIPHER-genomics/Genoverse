// Abstract Sequence model
// assumes that the data source responds with raw sequence text
// see Fasta model for more specific example
Genoverse.Track.Model.Sequence = Genoverse.Track.Model.extend({
  threshold : 100000,  
  chunkSize : 1000,
  buffer    : 0,
  dataType  : 'text',
  
  init: function () {
    this.base();
    this.chunks = {};
  },
  
  getData: function (start, end) {
    var start = start - start % this.chunkSize + 1;
    var end  = end + this.chunkSize - end % this.chunkSize;    
    return this.base(start, end);
  },
  
  parseData: function (data, start, end) {
    data = data.replace(/\n/g, '');
    
    if (this.prop('lowerCase')) {
      data = data.toLowerCase();
    }
    
    for (var i = 0; i < data.length; i += this.chunkSize) {
      if (this.chunks[start + i]) {
        continue;
      }
      
      var feature = {
        id       : start + i,
        start    : start + i,
        end      : start + i + this.chunkSize,
        sequence : data.substr(i, this.chunkSize),
      };
      
      this.chunks[feature.start] = feature;
      this.insertFeature(feature);
    }
  }
});