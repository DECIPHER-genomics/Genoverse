Genoverse.Track.DAS.Band = Genoverse.Track.DAS.extend({

  // Defaults
  name         : "Chromosome bands", 
  labelOverlay : true, 
  allData      : true, 
  dataType     : 'xml',
  depth        : null,
  url          : 'http://www.ensembl.org/das/Homo_sapiens.GRCh37.karyotype/features?segment=__CHR__',


  colorMap : {
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


  setFeatureColor: function (feature) {
    feature.labelColor = '#FFFFFF';

    feature.color = this.colorMap[feature.type];
    var match = /^grey(\d+)$/i.exec(feature.color);
    if (match) {
      if (match[1] > 70) { 
        feature.labelColor = '#000000';
      }

      var c = Math.round(match[1]*2.55);
      feature.color = "rgb("+c+","+c+","+c+")";
    }

    if (feature.color == 'white') feature.labelColor = '#000000';
  },

  
  parseData: function (data, bounds) {
    var features = this.base(data, bounds);
    var i = features.length;
    
    while (i--) {
      var feature         = features[i];
      feature.sort        = i;
      feature.bounds      = {};
      feature.visible     = {};
      feature.bottom      = {};
      feature.labelBottom = {};

      this.setFeatureColor(feature);
      this.features.insert({ x: feature.start, w: feature.end - feature.start, y:0, h:1 }, feature);
    }

    return this.features.search(bounds);
  },


  afterDraw: function (image) {
    this.context.globalAlpha = 1;
    this.context.fillStyle   = '#000000';
    this.context.fillRect(0, 0, image.width, 1);
    this.context.fillRect(0, this.featureHeight, image.width, 1);
  },


});