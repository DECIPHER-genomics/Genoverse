var FRegion = function(features){
  var _features    = new Array();
  var _featuresSortedByEnds = new Array();
  var _isSorted   = false;

  if (features && typeof features == 'object') {
    _features = features;
  }

  this.insert = function (element) {
    _features.push(element);
    _isSorted = false;
  }

  this.sort = function (force) {
    if (_isSorted && !force) return;

    _features.sort(function (a, b) { return a.start - b.start });

    _features.every(function(element, index){
      element.index = index;
      return true;
    })

    // Shallow copy of the features array, to be sorted by feature ends
    _featuresSortedByEnds = _features.slice();
    _featuresSortedByEnds.sort(function (a, b) { return a.end - b.end });

    _isSorted = true;
  }

  this.bruteForceSearch = function (bounds) {
    var features = new Array();
    var a = bounds.x;
    var b = a + bounds.w;

    for (var i = 0; i < _features.length; i++) {
      if (_features[i].start < b && _features[i].end > a) {
        features.push(_features[i]);
      }
    }
    return features;
  }

  this.binarySearch = function (bounds) {
    if (!_isSorted) this.sort();

    var a = bounds.x;
    var b = a + bounds.w;

    var iA = this.findFirstEndingAfterX(a);
    var iB = this.findLastStartingBeforeX(b);

    if (_features[iA].start < b && _features[iA].end > a) {
      return _features.slice(iA, iB + 1);
    } else {
      return [];
    }
  }

  /* search for nearest element to the left of x within indexes iStart, iEnd
   */
  this.findLastStartingBeforeX = function (x, iStart, iEnd) {
    if (!_isSorted) this.sort();

    if (iStart === undefined) iStart = 0;
    if (iEnd   === undefined) iEnd   = _features.length - 1;
    var iMiddle = Math.floor((iEnd+iStart)/2);

    if (iStart == iMiddle) {
      return iStart;
    } else if (_features[iMiddle].start < x) {
      return this.findLastStartingBeforeX(x, iMiddle, iEnd);
    } else if (_features[iMiddle].start >= x) {
      return this.findLastStartingBeforeX(x, iStart, iMiddle);
    }
  }

  this.findFirstEndingAfterX = function (x, iStart, iEnd) {
    if (!_isSorted) this.sort();

    if (iStart === undefined) iStart = 0;
    if (iEnd   === undefined) iEnd   = _featuresSortedByEnds.length - 1;
    var iMiddle = Math.ceil((iEnd+iStart)/2);

    if (iEnd == iMiddle) {
      // Return real index (position) in the original array
      return _featuresSortedByEnds[iEnd].index;
    } else if (_featuresSortedByEnds[iMiddle].end < x) {
      return this.findFirstEndingAfterX(x, iMiddle, iEnd);
    } else if (_featuresSortedByEnds[iMiddle].end >= x) {
      return this.findFirstEndingAfterX(x, iStart, iMiddle);
    }
  }

  this.search = function (bounds) {
    //return this.bruteForceSearch(bounds);
    return this.binarySearch(bounds);
  }

  this.getElement = function (i) {
    return _features[i];
  }
}
