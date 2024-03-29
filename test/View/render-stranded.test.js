const { afterTest, testTrackRenderStatic } = require('../utils');

describe('Correctly render stranded track:', () => {
  afterEach(afterTest);

  it('features are split between forward and reverse strand tracks', () => testTrackRenderStatic(
    [{ start: 1, end: 5, strand: 1, color: 'blue' }, { start: 11, end: 15, strand: -1, color: 'red' }],
    { stranded: true, margin: 0, featureHeight: 10, featureMargin: {} }
  ));
});
