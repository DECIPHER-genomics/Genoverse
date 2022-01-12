const { afterTest, testTrackRenderStatic } = require('../utils');

describe('Correctly render insert variants:', () => {
  afterEach(afterTest);

  const track = { _testClass: Genoverse.Track.dbSNP, url: false, margin: 0, featureMargin: {} };

  it('when scale > 1', () => testTrackRenderStatic([{ start: 10, end: 5 }], track));

  it('when scale < 1', () => testTrackRenderStatic([{ start: 100, end: 50 }], track, { end: 1000 }));
});
