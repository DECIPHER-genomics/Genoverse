const { afterTest, testTrackRender } = require('../utils');

describe('Correctly render scale line:', () => {
  afterEach(afterTest);

  const width = 1000;

  const doTest = (size, strand) => {
    const forward  = strand === 'Forward';
    const noStrand = strand === 'No';

    return testTrackRender(
      undefined,
      { _testClass: Genoverse.Track.Scaleline, strand: noStrand ? false : forward ? 1 : -1 },
      { end: size, chromosomeSize: size, width: width }
    );
  };

  [ 'Forward', 'Reverse', 'No' ].forEach((strand) => {
    describe(`${strand} strand`, () => {
      it('in bytes', () => doTest(10,   strand));
      it('in kb',    () => doTest(1e5,  strand));
      it('in Mb',    () => doTest(1e7,  strand));
      it('in Gb',    () => doTest(1e10, strand));
      it('in Tb',    () => doTest(1e13, strand));
    });
  });
});
