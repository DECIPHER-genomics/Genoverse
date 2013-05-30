Genoverse.Track.Model = Base.extend({

  dataType     : 'json',
  threshold    : undefined,
  xhrFields    : {},
  buffer       : 0,
  //constructor : $.noop,

  constructor : function () {
    //debugger;
    console.log('contructor!');
    this.features     = this.features     || new RTree();
    this.featuresById = this.featuresById || {};
    this.dataRanges   = this.dataRanges   || {};
    //this.scaleSettings = {};
  },


  getData: function (start, end) {
    return this.url ? $.ajax({
      url       : this.parseUrl(start, end),
      dataType  : this.dataType,
      context   : this,
      xhrFields : this.xhrFields,
      success   : function (data) { this.receiveData(data, start, end); },
      error     : function (xhr, statusText) { this.showError(statusText + ' while getting the data, see console for more details', arguments) }
    }) : $.Deferred().resolveWith(this);
  },

  /**
  * parseData(data) - parse raw data from the data source (e.g. online web service)
  * extract features and insert it into the internal features storage (RTree)
  *
  * >> data - raw data from the data source (e.g. ajax response)
  * << nothing
  *
  * every feature extracted this routine must construct a hash with at least 3 values:
  *  {
  *    id    : [unique feature id, string],
  *    start : [chromosomal start position, integer],
  *    end   : [chromosomal end position, integer],
  *    [other optional key/value pairs]
  *  }
  *
  * and call this.insertFeature(feature)
  */
  parseData: function (data) {
    // Example of parseData function when data is an array of hashes like { start: ..., end: ... }
    for (var i = 0; i < data.length; i++) {
      var feature = data[i];
      
      feature.sort = start + i;
      
      this.insertFeature(feature);
    }
  },
  
  insertFeature: function (feature) {
    // Make sure we have a unique ID, this method is not efficient, so better supply your own id
    if (!feature.id) {
      feature.id = JSON.stringify(feature).hashCode();
    }
    
    if (!this.featuresById[feature.id]) {
      this.features.insert({ x: feature.start, y: 0, w: feature.end - feature.start + 1, h: 1 }, feature);
      this.featuresById[feature.id] = feature;
    }
  },
  
  findFeatures: function (start, end) {
    return this.features.search({ x: start - this.dataBuffer.start, y: 0, w: end - start + this.dataBuffer.start + this.dataBuffer.end + 1, h: 1 }).sort(function (a, b) { return a.sort - b.sort; });
  },

  // Do not overwrite this
  type: 'model'
});