const { afterTest, testTrackRenderStatic } = require('../utils');

describe('Correctly render legends:', () => {
  afterEach(afterTest);

  const track = {
    id            : 'test',
    margin        : 0,
    featureHeight : 10,
    featureMargin : {},
    legend        : true,
  };

  it('multiple feature types', () => testTrackRenderStatic(
    [{ start: 1, end: 5, color: 'red', legend: 'test1' }, { start: 6, end: 10, color: 'blue', legend: 'test2' }, { start: 11, end: 15, color: 'green', legend: 'test3' }],
    track,
    { width: 1000 }
  ));

  it('legends are sorted alphabetically, regardless of feature order', () => testTrackRenderStatic(
    [{ start: 1, end: 5, color: 'red', legend: 'zzz' }, { start: 6, end: 10, color: 'blue', legend: 'aaa' }, { start: 11, end: 15, color: 'green', legend: 'bbb' }],
    track,
    { width: 1000 }
  ));

  it("feature doesn't have legend property", () => testTrackRenderStatic(
    [{ start: 1, end: 5, color: 'red', legend: 'zzz' }, { start: 6, end: 10, color: 'blue', legend: 'aaa' }, { start: 11, end: 15, color: 'green' }],
    track,
    { width: 1000 }
  ));
});
