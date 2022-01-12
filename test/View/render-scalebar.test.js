const { afterTest, testTrackRender, testTrackRenderStatic } = require('../utils');

describe('Correctly render scalebar:', () => {
  afterEach(afterTest);

  const track = { _testClass: Genoverse.Track.Scalebar };
  const width = 1000;

  const doTest = end => testTrackRenderStatic(undefined, track, { end: end, chromosomeSize: end, width: width });

  describe('at different scales', () => {
    it('in bytes, scale = 1', () => doTest(1000));
    it('in bytes, scale < 1', () => doTest(1e4));
    it('in bytes, scale > 1', () => doTest(100));
    it('in kb',               () => doTest(1e5));
    it('in Mb',               () => doTest(1e7));
    it('in Gb',               () => doTest(1e10));
    it('in Tb',               () => doTest(1e13));
  });

  describe('spanning two images', () => {
    it('split on a boundary', () => {
      const end = 1e7;

      return testTrackRender(undefined, track, { end: end / 2, chromosomeSize: end, width: width });
    });

    it('split mid section', () => {
      const end = 25e4;

      return testTrackRender(undefined, track, { end: end / 2, chromosomeSize: end, width: width });
    });
  });

  it('backgrounds', () => testTrackRenderStatic(undefined, track, { end: width, chromosomeSize: width, width: width }));
});
