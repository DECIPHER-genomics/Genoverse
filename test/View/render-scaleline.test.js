const { afterTest, testTrackRender } = require('../utils');

describe('Correctly render scale line:', () => {
  afterEach(afterTest);

  const width = 1000;

  const doTest = (size, label, strand) => {
    const text     = label(size);
    const forward  = strand === 'Forward';
    const noStrand = strand === 'No';

    return testTrackRender(
      undefined,
      { _testClass: Genoverse.Track.Scaleline, strand: noStrand ? false : forward ? 1 : -1 },
      [
        [ 0, 7, 1000, 1 ],
        (context) => {
          const w = context.measureText(text).width;

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
            context.clearRect(forward ? 905 : 12, 0, 83, 14);
          }
        },
        [ 'fillText', text, 500, 7.5 ],
      ].concat(
        noStrand ? [] : [[ 'fillText', `${strand  } strand`, forward ? 946.5 : 53.5, 7.5 ]]
      ),
      { end: size, chromosomeSize: size, width: width }
    );
  };

  [ 'Forward', 'Reverse', 'No' ].forEach((strand) => {
    describe(`${strand} strand`, () => {
      it('in bytes', () => doTest(10,   n => `${n} bp`, strand));
      it('in kb',    () => doTest(1e5,  n => `${(n / 1e3).toFixed(2)} kb`, strand));
      it('in Mb',    () => doTest(1e7,  n => `${(n / 1e6).toFixed(2)} Mb`, strand));
      it('in Gb',    () => doTest(1e10, n => `${(n / 1e9).toFixed(2)} Gb`, strand));
      it('in Tb',    () => doTest(1e13, n => `${(n / 1e12).toFixed(2)} Tb`, strand));
    });
  });
});
