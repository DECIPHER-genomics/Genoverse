Genoverse.Track.Model = Base.extend({
  dataBuffer : { start: 0, end: 0 }, // basepairs to extend data region for, when getting data from the origin
  xhrFields  : {},
  dataType   : 'json',
  allData    : false,
  url        : undefined,
  urlParams  : {}, // hash of URL params
  
  constructor: function (properties) {
    $.extend(this, properties);
    Genoverse.wrapFunctions(this);
    this.init();
  },
  
  init: function (reset) {
    this.setDefaults(reset);
    
    if (reset) {
      for (var i in this.featuresById) {
        delete this.featuresById[i].position;
      }
    } else {
      this.dataRanges   = new RTree();
      this.features     = new RTree();
      this.featuresById = {};
    }
    
    this.dataLoading = []; // tracks incomplete requests for data
  },
  
  setDefaults: function (reset) {
    if (!this._url) {
      this._url = this.url; // Remember original url
    }
    
    if (this.url || (this._url && reset)) {
      this.setURL(undefined, reset);
    }
  },
  
  setURL: function (urlParams, update) {
    urlParams = urlParams || this.urlParams;
    
    if (update && this._url) {
      this.url = this._url;
    }

    this.url += (this.url.indexOf('?') === -1 ? '?' : '&') + decodeURIComponent($.param(urlParams, true));
    this.url  = this.url.replace(/[&?]$/, '');
  },
  
  parseURL: function (start, end, url) {
    if (this.allData) {
      start = 1;
      end   = this.browser.chromosomeSize;
    }
    
    return (url || this.url).replace(/__CHR__/, this.browser.chr).replace(/__START__/, start).replace(/__END__/, end);
  },
  
  setLabelBuffer: function (buffer) {
    this.dataBuffer.start = Math.max(this.dataBuffer.start, buffer);
  },
  
  getData: function (start, end, done) {
    start = Math.max(1, start);
    end   = Math.min(this.browser.chromosomeSize, end);
    
    var model    = this;
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
        url       : model.parseURL(bin[0], bin[1]),
        dataType  : model.dataType,
        context   : model,
        xhrFields : model.xhrFields,
        success   : function (data) { this.receiveData(data, bin[0], bin[1]); },
        error     : function (xhr, statusText) { this.track.controller.showError(statusText + ' while getting the data, see console for more details', arguments); },
        complete  : function (xhr) { this.dataLoading = $.grep(this.dataLoading, function (t) { return xhr !== t; }); }
      });
      
      request.coords = [ bin[0], bin[1] ]; // store actual start and end on the request, in case they are needed
      
      if (typeof done === 'function') {
        request.done(done);
      }
      
      model.dataLoading.push(request);
      
      return request;
    })).done(function () { deferred.resolveWith(model); });
    
    return deferred;
  },
  
  receiveData: function (data, start, end) {
    start = Math.max(start, 1);
    end   = Math.min(end, this.browser.chromosomeSize);
    
    this.setDataRange(start, end);
    this.parseData(data, start, end);
    
    if (this.allData) {
      this.url = false;
    }
  },
  
  /**
  * parseData(data, start, end) - parse raw data from the data source (e.g. online web service)
  * extract features and insert it into the internal features storage (RTree)
  *
  * >> data  - raw data from the data source (e.g. ajax response)
  * >> start - start location of the data
  * >> end   - end   location of the data
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
  
  setDataRange: function (start, end) {
    if (this.allData) {
      start = 1;
      end   = this.browser.chromosomeSize;
    }
    
    this.dataRanges.insert({ x: start, w: end - start + 1, y: 0, h: 1 }, [ start, end ]);
  },
  
  checkDataRange: function (start, end) {
    start = Math.max(1, start);
    end   = Math.min(this.browser.chromosomeSize, end);
    
    var ranges = this.dataRanges.search({ x: start, w: end - start + 1, y: 0, h: 1 }).sort(function (a, b) { return a[0] - b[0]; });
    
    if (!ranges.length) {
      return false;
    }
    
    var s = ranges.length === 1 ? ranges[0][0] : 9e99;
    var e = ranges.length === 1 ? ranges[0][1] : -9e99;
    
    for (var i = 0; i < ranges.length - 1; i++) {
      // s0 <= s1 && ((e0 >= e1) || (e0 + 1 >= s1))
      if (ranges[i][0] <= ranges[i + 1][0] && ((ranges[i][1] >= ranges[i + 1][1]) || (ranges[i][1] + 1 >= ranges[i + 1][0]))) {
        s = Math.min(s, ranges[i][0]);
        e = Math.max(e, ranges[i + 1][1]);
      } else {
        return false;
      }
    }
    
    return start >= s && end <= e;
  },
  
  insertFeature: function (feature) {
    // Make sure we have a unique ID, this method is not efficient, so better supply your own id
    if (!feature.id) {
      feature.id = this.hashCode(JSON.stringify(feature));
    }
    
    if (!this.featuresById[feature.id]) {
      this.features.insert({ x: feature.start, y: 0, w: feature.end - feature.start + 1, h: 1 }, feature);
      this.featuresById[feature.id] = feature;
    }
  },
  
  findFeatures: function (start, end) {
    return this.features.search({ x: start - this.dataBuffer.start, y: 0, w: end - start + this.dataBuffer.start + this.dataBuffer.end + 1, h: 1 }).sort(function (a, b) { return a.sort - b.sort; });
  },
  
  abort: function () {
    for (var i = 0; i < this.dataLoading.length; i++) {
      this.dataLoading[i].abort();
    }
    
    this.dataLoading = [];
  },
  
  hashCode: function (string) {
    var hash = 0;
    var chr;
    
    if (!string.length) {
      return hash;
    }
    
    for (var i = 0; i < string.length; i++) {
      chr  = string.charCodeAt(i);
      hash = ((hash << 5) - hash) + chr;
      hash = hash & hash; // Convert to 32bit integer
    }
    
    return '' + hash;
  }
});
