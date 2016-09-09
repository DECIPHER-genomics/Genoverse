'use strict';

describe('Correctly render legends:', function () {
  afterEach(afterTest);

  var track = {
    id            : 'test',
    margin        : 0,
    featureHeight : 10,
    featureMargin : {},
    legend        : true
  };

  function setText(context) {
    context.textAlign    = 'center';
    context.textBaseline = 'middle';
  }

  it('multiple feature types', function () {
    return testTrackRenderStatic(
      [{ start: 1, end: 5, color: 'red', legend: 'test1' }, { start: 6, end: 10, color: 'blue', legend: 'test2' }, { start: 11, end: 15, color: 'green', legend: 'test3' }],
      track,
      {
        features : [ [ 0, 0, 250, 10, 'red' ], [ 250, 0, 250, 10, 'blue' ], [ 500, 0, 250, 10, 'green' ] ],
        legend   : [
          setText,
          [ 5,   5,  20, 12, 'red'   ], [ 'fillText', 'test1', 43,  11.5 ],
          [ 505, 5,  20, 12, 'blue'  ], [ 'fillText', 'test2', 543, 11.5 ],
          [ 5,   20, 20, 12, 'green' ], [ 'fillText', 'test3', 43,  26.5 ]
        ]
      },
      { width: 1000 }
    );
  });

  it('legends are sorted alphabetically, regardless of feature order', function () {
    return testTrackRenderStatic(
      [{ start: 1, end: 5, color: 'red', legend: 'zzz' }, { start: 6, end: 10, color: 'blue', legend: 'aaa' }, { start: 11, end: 15, color: 'green', legend: 'bbb' }],
      track,
      {
        features : [ [ 0, 0, 250, 10, 'red' ], [ 250, 0, 250, 10, 'blue' ], [ 500, 0, 250, 10, 'green' ] ],
        legend   : [
          setText,
          [ 5,   5,  20, 12, 'blue'  ], [ 'fillText', 'aaa', 39.5,  11.5 ],
          [ 505, 5,  20, 12, 'green' ], [ 'fillText', 'bbb', 539.5, 11.5 ],
          [ 5,   20, 20, 12, 'red'   ], [ 'fillText', 'zzz', 38,    26.5 ]
        ]
      },
      { width: 1000 }
    );
  });

  it("feature doesn't have legend property", function () {
    return testTrackRenderStatic(
      [{ start: 1, end: 5, color: 'red', legend: 'zzz' }, { start: 6, end: 10, color: 'blue', legend: 'aaa' }, { start: 11, end: 15, color: 'green' }],
      track,
      {
        features : [ [ 0, 0, 250, 10, 'red' ], [ 250, 0, 250, 10, 'blue' ], [ 500, 0, 250, 10, 'green' ] ],
        legend   : [
          setText,
          [ 5,   5, 20, 12, 'blue' ], [ 'fillText', 'aaa', 39.5, 11.5 ],
          [ 505, 5, 20, 12, 'red'  ], [ 'fillText', 'zzz', 538,  11.5 ]
        ]
      },
      { width: 1000 }
    );
  });
});
