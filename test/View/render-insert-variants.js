'use strict';

describe('Correctly render insert variants:', function () {
  afterEach(afterTest);

  var track = { _testClass: Genoverse.Track.dbSNP, url: false, margin: 0, featureMargin: {} };

  it('when scale > 1', function () {
    return testTrackRenderStatic([{ start: 10, end: 5 }], track, [
      [ 44.5, 0, 1.5, 12 ],
      [ 'beginPath' ], [ 'moveTo', 42, 12 ], [ 'lineTo', 45, 8 ], [ 'lineTo', 48, 12 ], [ 'fill' ]
    ]);
  });

  it('when scale < 1', function () {
    return testTrackRenderStatic([{ start: 100, end: 50 }], track, [
      [ 9.9, 0, 0.5, 12 ],
      [ 'beginPath' ], [ 'moveTo', 6.9, 12 ], [ 'lineTo', 9.9, 8 ], [ 'lineTo', 12.9, 12 ], [ 'fill' ]
    ], { end: 1000 });
  });
});
