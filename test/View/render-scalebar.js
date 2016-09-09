'use strict';

describe('Correctly render scalebar:', function () {
  afterEach(afterTest);

  var track = { _testClass: Genoverse.Track.Scalebar };
  var width = 1000;

  function doTest(end, labelFunction) {
    return testTrackRenderStatic(undefined, track, getInstructions(end, width, labelFunction), { end: end, chromosomeSize: end, width: width });
  }

  function getInstructions(end, width, labelFunction, featureWidth, start, labelStart, labelOffset) {
    var minus        = end > width ? 0 : width / end;
        featureWidth = featureWidth || (end > width ? 21 : 20);
    var step         = (featureWidth - (end > width ? 1 : 0)) * 2;
    var labelStep    = Math.max(step, 100);
    var draw         = [];

    for (var i = (start || 0) - minus; i <= width; i += step) {
      draw.push([ i, 0, featureWidth, 3 ]);
    }

    for (i = (typeof labelStart === 'number' ? labelStart : labelStep) - minus; i <= width; i += labelStep) {
      var n = i + (labelOffset || 0);

      draw.push([ 'fillText', labelFunction(n + minus), i, 5 ]);
      draw.push([ i, 0, 1, 6 ]);
    }

    draw.push([ 0, 0, width, 1 ]);
    draw.push([ 0, 3, width, 1 ]);

    return draw;
  }

  describe('at different scales', function () {
    it('in bytes, scale = 1', function () {
      return doTest(1000, function (n) { return n; });
    });

    it('in bytes, scale < 1', function () {
      return doTest(1e4, function (n) { return n.toString().charAt(0) + ',000'; });
    });

    it('in bytes, scale > 1', function () {
      return doTest(100, function (n) { return n / 10; });
    });

    it('in kb', function () {
      return doTest(1e5, function (n) { return (n / 10).toFixed(2) + ' kb'; });
    });

    it('in Mb', function () {
      return doTest(1e7, function (n) { return (n / 100).toFixed(2) + ' Mb'; });
    });

    it('in Gb', function () {
      return doTest(1e10, function (n) { return (n / 100).toFixed(2) + ' Gb'; });
    });

    it('in Tb', function () {
      return doTest(1e13, function (n) { return (n / 100).toFixed(2) + ' Tb'; });
    });
  });

  describe('spanning two images', function () {
    it('split on a boundary', function () {
      var end  = 1e7;
      var draw = {
        '1-5000000'        : getInstructions(end, width, function (n) { return n < 200 ? ((n * 5).toFixed(2) + ' kb') : ((n / 200).toFixed(2) + ' Mb'); }),
        '5000001-10000000' : getInstructions(end, width, function (n) { return (n / 200).toFixed(2) + ' Mb'; }, 0, 0, 0, 1000)
      };

      return testTrackRender(undefined, track, draw, { end: end / 2, chromosomeSize: end, width: width });
    });

    it('split mid section', function () {
      var end  = 25e4;
      var draw = {
        '1-125000'      : getInstructions(end, width, function (n) { return (n / 8).toFixed(2) + ' kb'; }, 81),
        '125001-250000' : getInstructions(end, width, function (n) { return (n / 8).toFixed(2) + ' kb'; }, 81, -40, -40, 1000)
      };

      return testTrackRender(undefined, track, draw, { end: end / 2, chromosomeSize: end, width: width });
    });
  });

  it('backgrounds', function () {
    var draw = [];

    for (var i = 0; i <= width; i += 40) {
      draw.push([ i - 1,  0, 1, 1, i        % 100 ? '#E5E5E5' : '#CCCCCC' ]);
      draw.push([ i + 18, 0, 1, 1, (i + 20) % 100 ? '#E5E5E5' : '#CCCCCC' ]);
    }

    return testTrackRenderStatic(undefined, track, { background: draw, features: getInstructions(width, width, function (n) { return n; }) }, { end: width, chromosomeSize: width, width: width });
  });
});
