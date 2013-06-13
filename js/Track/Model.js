Genoverse.Track.Model = Base.extend({
  dataType  : 'json',
  threshold : undefined,
  xhrFields : {},
  buffer    : 0,
  
  constructor : function () {
    this.dataRanges   = this.dataRanges   || new RTree();
    this.features     = this.features     || new RTree();
    this.featuresById = this.featuresById || {};
    
    if (this.urlParams) {
      this._url = this.url; // Remember original url
      this.setURL();
    }
  },
  
  setURL: function (urlParams, update) {
    urlParams = urlParams || this.urlParams;
    
    if (update && this._url) {
      this.url = this._url;
    }

    this.url += (this.url.indexOf('?') === -1 ? '?' : '&') + decodeURIComponent($.param(urlParams, true));
  },
  
  
  parseURL: function (start, end, url) {
    if (this.allData) {
      start = 1;
      end   = this.browser.chromosomeSize;
    }
    
    return (url || this.url).replace(/__CHR__/, this.browser.chr).replace(/__START__/, start).replace(/__END__/, end);
  },
  
  getData: function (start, end, done) {
    start = Math.max(1, start);
    end   = Math.min(this.browser.chromosomeSize, end);
    
    var track    = this;
    var deferred = $.Deferred();
    var bins     = [];
    var length   = end - start + 1;
    
    if (!this.url) {
      return deferred.resolveWith(this);
    }
   
    if (this.dataRequestLimit && length > this.dataRequestLimit) {
      var i = Math.ceil(length / this.dataRequestLimit);
     
      while (i--) {
        bins.push([ start, i ? start += this.dataRequestLimit - 1 : end ]);
        start++;
      }
    } else {
      bins.push([ start, end ]);
    }
   
    $.when.apply($, $.map(bins, function (bin) {
      var request = $.ajax({
        url       : track.parseURL(bin[0], bin[1]),
        dataType  : track.dataType,
        context   : track,
        xhrFields : track.xhrFields,
        success   : function (data) { this.receiveData(data, bin[0], bin[1]); },
        error     : function (xhr, statusText) { this.showError(statusText + ' while getting the data, see console for more details', arguments); },
        complete  : function (xhr) { this.dataLoading = $.grep(this.dataLoading, function (t) { return xhr !== t; }); }
      });
      
      request.coords = [ bin[0], bin[1] ]; // store actual start and end on the request, in case they are needed
      
      if (typeof done === 'function') {
        request.done(done);
      }
      
      track.dataLoading.push(request);
      
      return request;
    })).done(function () { deferred.resolveWith(track); });
     
    return deferred;
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
  parseData: function (data, start, end) {
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
  }
});
