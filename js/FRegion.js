var FRegion = function(features){
  var __features = new Array();
  var __sorted   = false;

  if (features && typeof features == 'object') {
    __features = features;
  }

  this.insert = function (element) {
    __features.push(element);
    __sorted = false;
  }

  this.sort = function () {
    __features.sort(function (a, b) { return a.start - b.start; });    
    __sorted = true;
  }

  this.search = function (a, b) {
    var features = new Array();
    for (var i = 0; i < __features.length; i++) {
      if (__features[i].start <= b && __features[i].end >= a) {
        features.push(__features[i]);
      }
    }
    return features;
  }

}
