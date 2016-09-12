'use strict';

// TODO: bytes, kb, mb, gb, tb

describe('Correctly render scale line:', function () {
  afterEach(afterTest);

  var width = 1000;

  function doTest(size, label, strand) {
    var text    = label(size);
    var forward = strand === 'Forward';

    return testTrackRender(
      undefined,
      { _testClass: Genoverse.Track.Scaleline, strand: forward ? 1 : -1 },
      [
        [ forward ? 0 : 25, 7, 975, 1 ],
        function (context) {
          var w = context.measureText(text).width;

          context.beginPath();
          context.moveTo(forward ? 975 : 25, 3.5);
          context.lineTo(forward ? 995 : 5,  7);
          context.lineTo(forward ? 975 : 25, 10.5);
          context.closePath();
          context.stroke();
          context.fill();
          context.clearRect((width - w - 10) / 2, 0, w + 10, 14);
          context.clearRect(forward ? 886 : 30, 0, 84, 14);
        },
        [ 'fillText', text,               500,                7.5 ],
        [ 'fillText', strand + ' strand', forward ? 928 : 72, 7.5 ],
      ],
      { end: size, chromosomeSize: size, width: width }
    );
  }

  [ 'Forward', 'Reverse' ].forEach(function (strand) {
    describe(strand + ' strand', function () {
      it('in bytes', function () {
        return doTest(10, function (n) { return n + ' bp'; }, strand);
      });

      it('in kb', function () {
        return doTest(1e5, function (n) { return (n / 1e3).toFixed(2) + ' kb'; }, strand);
      });

      it('in Mb', function () {
        return doTest(1e7, function (n) { return (n / 1e6).toFixed(2) + ' Mb'; }, strand);
      });

      it('in Gb', function () {
        return doTest(1e10, function (n) { return (n / 1e9).toFixed(2) + ' Gb'; }, strand);
      });

      it('in Tb', function () {
        return doTest(1e13, function (n) { return (n / 1e12).toFixed(2) + ' Tb'; }, strand);
      });
    });
  });
});
