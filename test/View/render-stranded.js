'use strict';

describe('Correctly render stranded track:', function () {
  afterEach(afterTest);

  it('features are split between forward and reverse strand tracks', function () {
    return testTrackRenderStatic(
      [{ start: 1, end: 5, strand: 1, color: 'blue' }, { start: 11, end: 15, strand: -1, color: 'red' }],
      { stranded: true, margin: 0, featureHeight: 10, featureMargin: {} },
      { forward: [[ 0, 0, 25, 10, 'blue' ]], reverse: [[ 50, 0, 25, 10, 'red' ]] }
    );
  });
});
