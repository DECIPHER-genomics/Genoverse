'use strict';

// TODO: bytes, kb, mb, gb, tb

describe('Correctly render scale line:', function () {
  afterEach(afterTest);

  var width = 1000;

  function doTest(size, label, strand) {
    var text     = label(size);
    var forward  = strand === 'Forward';
    var noStrand = strand === 'No';

    return testTrackRender(
      undefined,
      { _testClass: Genoverse.Track.Scaleline, strand: noStrand ? false : forward ? 1 : -1 },
      [
        [ 0, 7, 1000, 1 ],
        function (context) {
          var w = context.measureText(text).width;

          if (noStrand || forward) {
            context.beginPath();
            context.moveTo(993, 3.5);
            context.lineTo(1000,  7);
            context.lineTo(993, 10.5);
            context.closePath();
            context.stroke();
            context.fill();
          }

          if (noStrand || !forward) {
            context.beginPath();
            context.moveTo(7, 3.5);
            context.lineTo(0,  7);
            context.lineTo(7, 10.5);
            context.closePath();
            context.stroke();
            context.fill();
          }

          context.clearRect((width - w - 10) / 2, 0, w + 10, 14);

          if (!noStrand) {
            var x = forward ? 909 : 12;
            var strandClearWidth = forward ? 79 : 80;
            context.clearRect(x, 0, strandClearWidth, 14);
          }
        },
        [ 'fillText', text, 500, 7.5 ],
      ].concat(
        noStrand ? [] : [[ 'fillText', strand + ' strand', forward ? 948.5 : 52, 7.5 ]],
      ),
      { end: size, chromosomeSize: size, width: width }
    );
  }

  [ 'Forward', 'Reverse', 'No' ].forEach(function (strand) {
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
