CBrowse.Track.DASBand = CBrowse.Track.DAS.extend({

  config: {
    name         : "Chromosome bands", 
    labelOverlay : true, 
    allData      : true, 
    dataType     : 'xml',
    depth        : null
  },
  
  colors : {
    "default"      : "grey50",
    "band:acen"    : "slategrey",
    "band:gneg"    : "white",
    "band:gpos"    : "black",
    "band:gpos100" : "black",
    "band:gpos25"  : "grey85",
    "band:gpos33"  : "grey75",
    "band:gpos50"  : "grey60",
    "band:gpos66"  : "grey50",
    "band:gpos75"  : "grey40",
    "band:gvar"    : "grey88",
    "band:mark"    : "blue",
    "band:stalk"   : "slategrey",
    "band:tip"     : "black"
  },
  
  parseFeatures: function (data, bounds) {
    var features = this.base(data, bounds);
    var i = features.length;
    
    while (i--) {
      var feature         = features[i];
      feature.color       = 'slategrey';
      feature.labelColor  = '#FFFFFF';
      feature.sort        = i;
      feature.bounds      = {};
      feature.visible     = {};
      feature.bottom      = {};
      feature.labelBottom = {};
      console.log(feature);
      this.features.insert({ x: feature.start, w: feature.end - feature.start, y:0, h:1 }, feature);
    }

    return this.features.search(bounds);
  }

});