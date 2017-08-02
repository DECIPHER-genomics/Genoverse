'use strict';

describe('Correctly render labels where:', function () {
  afterEach(afterTest);

  var track = { resizable: 'auto', margin: 0, featureHeight: 15, featureMargin: {}, bump: true };

  it('labels are disabled (track.labels = false)', function () {
    return testTrackRenderStatic([
      { start: 1, end: 10, label: 'abc' }
    ], $.extend({ labels: false }, track), [ [ 'fillRect', 0, 0, 50, 15 ] ]);
  });

  describe('labels appear below their features (track.labels = true)', function () {
    it('with a label shorter than its feature', function () {
      return testTrackRenderStatic([
        { start: 1, end: 10, label: 'abc' }
      ], track, [ [ 'fillRect', 0, 0, 50, 15 ], [ 'fillText', 'abc', 0, 15 ] ]);
    });

    it('with a label longer than its feature', function () {
      return testTrackRenderStatic([
        { start: 1, end: 10, label: 'WWWWWWWWWW' }
      ], track, [ [ 'fillRect', 0, 0, 50, 15 ], [ 'fillText', 'WWWWWWWWWW', 0, 15 ] ]);
    });

    it('with a multi-line label', function () {
      return testTrackRenderStatic([
        { start: 1, end: 10, label: 'abc\ndef' }
      ], track, [ [ 'fillRect', 0, 0, 50, 15 ], [ 'fillText', 'abc', 0, 15 ], [ 'fillText', 'def', 0, 27 ] ]);
    });

    it('with bumped features', function () {
      return testTrackRenderStatic([
        { start: 1, end: 10, label: 'abc' },
        { start: 6, end: 6,  label: 'def' }
      ], track, [ [ 'fillRect', 0, 0, 50, 15 ], [ 'fillText', 'abc', 0, 15 ], [ 'fillRect', 25, 27, 5, 15 ], [ 'fillText', 'def', 25, 42 ] ]);
    });

    it('with a multi-line label and bumped features', function () {
      return testTrackRenderStatic([
        { start: 1, end: 10, label: 'abc\ndef' },
        { start: 6, end: 6,  label: 'def' }
      ], track, [ [ 'fillRect', 0, 0, 50, 15 ], [ 'fillText', 'abc', 0, 15 ], [ 'fillText', 'def', 0, 27 ], [ 'fillRect', 25, 39, 5, 15 ], [ 'fillText', 'def', 25, 54 ] ]);
    });

    it('with a label longer than its feature and bumped features', function () {
      return testTrackRenderStatic([
        { start: 1,  end: 10, label: 'WWWWWW' },
        { start: 13, end: 13, label: 'abc' },
        { start: 14, end: 14, label: 'def' },
      ], track, [ [ 'fillRect', 0, 0, 50, 15 ], [ 'fillText', 'WWWWWW', 0, 15 ], [ 'fillRect', 60, 27, 5, 15 ], [ 'fillText', 'abc', 60, 42 ], [ 'fillRect', 65, 0, 5, 15 ], [ 'fillText', 'def', 65, 15 ] ]);
    });

    describe('with a repeated label (track.repeatLabels = true)', function () {
      describe('where the label is shorter than its feature', function () {
        it('and browser.scale > 1', function () {
          return testTrackRender([
            { start: 85, end: 128, label: 'abc' }
          ], $.extend({ repeatLabels: true }, track), {
            '81-100'  : [ [ 'fillRect', 20, 0, 80,  15 ], [ 'fillText', 'abc', 20, 15 ] ],
            '101-120' : [ [ 'fillRect', 0,  0, 100, 15 ], [ 'fillText', 'abc', 20, 15 ] ],
            '121-140' : [ [ 'fillRect', 0,  0, 40,  15 ], [ 'fillText', 'abc', 20, 15 ] ]
          }, { start: 101, end: 120 });
        });

        it('and browser.scale <= 1', function () {
          return testTrackRender([
            { start: 151, end: 650, label: 'abc' }
          ], $.extend({ repeatLabels: true }, track), {
            '101-300' : [ [ 'fillRect', 25, 0, 75,   15 ], [ 'fillText', 'abc', 25, 15 ] ],
            '301-500' : [ [ 'fillRect', 0,  0, 100,  15 ], [ 'fillText', 'abc', 25, 15 ] ],
            '501-700' : [ [ 'fillRect', 0,  0, 75.5, 15 ], [ 'fillText', 'abc', 25, 15 ] ]
          }, { start: 301, end: 500 });
        });
      });

      describe('where the label is shorter than its feature, but not shown on the last image', function () {
        it('and browser.scale > 1', function () {
          return testTrackRender([
            { start: 85, end: 127, label: 'abc' }
          ], $.extend({ repeatLabels: true }, track), {
            '81-100'  : [ [ 'fillRect', 20, 0, 80,  15 ], [ 'fillText', 'abc', 20, 15 ] ],
            '101-120' : [ [ 'fillRect', 0,  0, 100, 15 ], [ 'fillText', 'abc', 20, 15 ] ],
            '121-140' : [ [ 'fillRect', 0,  0, 35,  15 ]                                ]
          }, { start: 101, end: 120 });
        });

        it('and browser.scale <= 1', function () {
          return testTrackRender([
            { start: 151, end: 510, label: 'abc' }
          ], $.extend({ repeatLabels: true }, track), {
            '101-300' : [ [ 'fillRect', 25, 0, 75,  15 ], [ 'fillText', 'abc', 25, 15 ] ],
            '301-500' : [ [ 'fillRect', 0,  0, 100, 15 ], [ 'fillText', 'abc', 25, 15 ] ],
            '501-700' : [ [ 'fillRect', 0,  0, 5.5, 15 ]                                ]
          }, { start: 301, end: 500 });
        });
      });

      describe('where the label is longer than its feature', function () {
        it('and browser.scale > 1', function () {
          return testTrackRender([
            { start: 85, end: 125, label: 'WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW' }
          ], $.extend({ repeatLabels: true }, track), {
            '81-100'  : [ [ 'fillRect', 20, 0, 80,  15 ], [ 'fillText', 'WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW',  20,  15 ] ],
            '101-120' : [ [ 'fillRect', 0,  0, 100, 15 ], [ 'fillText', 'WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW', -80,  15 ] ],
            '121-140' : [ [ 'fillRect', 0,  0, 25,  15 ], [ 'fillText', 'WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW', -180, 15 ] ]
          }, { start: 101, end: 120, longestLabel: 59 });
        });

        it('and browser.scale <= 1', function () {
          return testTrackRender([
            { start: 151, end: 510, label: 'WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW' }
          ], $.extend({ repeatLabels: true }, track), {
            '101-300' : [ [ 'fillRect', 25, 0, 75,  15 ], [ 'fillText', 'WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW',  25,  15 ] ],
            '301-500' : [ [ 'fillRect', 0,  0, 100, 15 ], [ 'fillText', 'WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW', -75,  15 ] ],
            '501-700' : [ [ 'fillRect', 0,  0, 5.5, 15 ], [ 'fillText', 'WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW', -175, 15 ] ],
          }, { start: 301, end: 500, longestLabel: 59 });
        });
      });
    });
  });

  describe('labels appear overlaid on their features (track.labels = "overlay")', function () {
    var tr = $.extend({ labels: 'overlay' }, track);

    it('with a label shorter than its feature', function () {
      return testTrackRenderStatic([
        { start: 1, end: 10, label: 'WWW', labelColor: 'white' }
      ], tr, [ [ 'fillRect', 0, 0, 50, 15 ], [ 'fillText', 'WWW', 25, 8, 'white' ] ]);
    });

    it('with a label longer than its feature', function () {
      return testTrackRenderStatic([
        { start: 1, end: 10, label: 'WWWWWWWWWW', labelColor: 'white' }
      ], tr, [ [ 'fillRect', 0, 0, 50, 15 ] ]);
    });

    it('with a multi-line label (gets joined with space)', function () {
      return testTrackRenderStatic([
        { start: 1, end: 10, label: 'abc\ndef', labelColor: 'white' }
      ], tr, [ [ 'fillRect', 0, 0, 50, 15 ], [ 'fillText', 'abc def', 25, 8, 'white' ] ]);
    });

    it('with bumped features', function () {
      return testTrackRenderStatic([
        { start: 1, end: 10, label: 'abc', labelColor: 'white' },
        { start: 6, end: 7,  label: 'd',   labelColor: 'white' }
      ], tr, [ [ 'fillRect', 0, 0, 50, 15 ], [ 'fillText', 'abc', 25, 8, 'white' ], [ 'fillRect', 25, 15, 10, 15 ], [ 'fillText', 'd', 30, 23, 'white' ] ]);
    });

    describe('with a repeated label (track.repeatLabels = true)', function () {
      describe('where the label is shorter than its feature', function () {
        it('and browser.scale > 1', function () {
          return testTrackRender([
            { start: 85, end: 138, label: 'abc', labelColor: 'red' }
          ], $.extend({ repeatLabels: true }, tr), {
            '81-100'  : [ [ 'fillRect', 20, 0, 80,  15 ], [ 'fillText', 'abc', 70, 8, 'red' ] ],
            '101-120' : [ [ 'fillRect', 0,  0, 100, 15 ], [ 'fillText', 'abc', 70, 8, 'red' ] ],
            '121-140' : [ [ 'fillRect', 0,  0, 90,  15 ], [ 'fillText', 'abc', 70, 8, 'red' ] ]
          }, { start: 101, end: 120 });
        });

        it('and browser.scale <= 1', function () {
          return testTrackRender([
            { start: 151, end: 650, label: 'abc', labelColor: 'red' }
          ], $.extend({ repeatLabels: true }, tr), {
            '101-300' : [ [ 'fillRect', 25, 0, 75,   15 ], [ 'fillText', 'abc', 66.75, 8, 'red' ] ],
            '301-500' : [ [ 'fillRect', 0,  0, 100,  15 ], [ 'fillText', 'abc', 50.25, 8, 'red' ] ],
            '501-700' : [ [ 'fillRect', 0,  0, 75.5, 15 ], [ 'fillText', 'abc', 33.75, 8, 'red' ] ]
          }, { start: 301, end: 500 });
        });
      });

      describe('where the label is shorter than its feature, but not shown on the last image', function () {
        it('and browser.scale > 1', function () {
          return testTrackRender([
            { start: 85, end: 137, label: 'abc', labelColor: 'red' }
          ], $.extend({ repeatLabels: true }, tr), {
            '81-100'  : [ [ 'fillRect', 20, 0, 80,  15 ], [ 'fillText', 'abc', 70, 8, 'red' ] ],
            '101-120' : [ [ 'fillRect', 0,  0, 100, 15 ], [ 'fillText', 'abc', 70, 8, 'red' ] ],
            '121-140' : [ [ 'fillRect', 0,  0, 85,  15 ]                                      ]
          }, { start: 101, end: 120 });
        });

        it('and browser.scale <= 1', function () {
          return testTrackRender([
            { start: 151, end: 550, label: 'abc', labelColor: 'red' }
          ], $.extend({ repeatLabels: true }, tr), {
            '101-300' : [ [ 'fillRect', 25, 0, 75,   15 ], [ 'fillText', 'abc', 75.125, 8, 'red' ] ],
            '301-500' : [ [ 'fillRect', 0,  0, 100,  15 ], [ 'fillText', 'abc', 75.375, 8, 'red' ] ],
            '501-700' : [ [ 'fillRect', 0,  0, 25.5, 15 ]                                          ]
          }, { start: 301, end: 500 });
        });
      });

      it('where the label is longer than its feature', function () {
        return testTrackRender([
          { start: 85, end: 125, label: 'WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW', labelColor: 'white' }
        ], $.extend({ repeatLabels: true }, tr), {
          '81-100'  : [ [ 'fillRect', 20, 0, 80,  15 ] ],
          '101-120' : [ [ 'fillRect', 0,  0, 100, 15 ] ],
          '121-140' : [ [ 'fillRect', 0,  0, 25,  15 ] ]
        }, { start: 101, end: 120, longestLabel: 59 });
      });
    });
  });

  describe('labels appear on a separate image - all labels are below all features (track.labels = "separate")', function () {
    var tr = $.extend({ labels: 'separate' }, track);

    it('with bumped features and unbumped labels', function () {
      return testTrackRenderStatic([
        { start: 1, end: 10, label: 'abc' },
        { start: 6, end: 6,  label: 'def' }
      ], tr, {
        features : [ [ 'fillRect', 0, 0, 50, 15 ], [ 'fillRect', 25, 15, 5, 15 ] ],
        labels   : [ [ 'fillText', 'abc', 0, 0  ], [ 'fillText', 'def', 25, 0  ] ]
      });
    });

    it('with bumped features and bumped labels', function () {
      return testTrackRenderStatic([
        { start: 1, end: 10, label: 'WWW' },
        { start: 6, end: 6,  label: 'abc' }
      ], tr, {
        features : [ [ 'fillRect', 0, 0, 50, 15 ], [ 'fillRect', 25, 15, 5, 15 ] ],
        labels   : [ [ 'fillText', 'WWW', 0, 0  ], [ 'fillText', 'abc', 25, 12 ] ]
      });
    });

    it('with bumped features and bumped labels and track.depth', function () {
      return testTrackRenderStatic([
        { start: 1, end: 10, label: 'WWW' },
        { start: 6, end: 6,  label: 'abc' }
      ], $.extend({ depth: 1, height: 50 }, tr), {
        features : [ [ 'fillRect', 0, 0, 50, 15 ] ],
        labels   : [ [ 'fillText', 'WWW', 0, 0  ] ]
      });
    });

    describe('with a repeated label (track.repeatLabels = true)', function () {
      describe('where the label is shorter than its feature', function () {
        it('and browser.scale > 1', function () {
          return testTrackRender([
            { start: 85, end: 128, label: 'abc' }
          ], $.extend({ repeatLabels: true }, tr), {
            '81-100'  : { features : [ [ 'fillRect', 20, 0, 80,  15 ] ], labels: [ [ 'fillText', 'abc', 20, 0 ] ] },
            '101-120' : { features : [ [ 'fillRect', 0,  0, 100, 15 ] ], labels: [ [ 'fillText', 'abc', 20, 0 ] ] },
            '121-140' : { features : [ [ 'fillRect', 0,  0, 40,  15 ] ], labels: [ [ 'fillText', 'abc', 20, 0 ] ] }
          }, { start: 101, end: 120 });
        });

        it('and browser.scale <= 1', function () {
          return testTrackRender([
            { start: 151, end: 650, label: 'abc' }
          ], $.extend({ repeatLabels: true }, tr), {
            '101-300' : { features : [ [ 'fillRect', 25, 0, 75,   15 ] ], labels: [ [ 'fillText', 'abc', 25, 0 ] ] },
            '301-500' : { features : [ [ 'fillRect', 0,  0, 100,  15 ] ], labels: [ [ 'fillText', 'abc', 25, 0 ] ] },
            '501-700' : { features : [ [ 'fillRect', 0,  0, 75.5, 15 ] ], labels: [ [ 'fillText', 'abc', 25, 0 ] ] }
          }, { start: 301, end: 500 });
        });
      });

      describe('where the label is shorter than its feature, but not shown on the last image', function () {
        it('and browser.scale > 1', function () {
          return testTrackRender([
            { start: 85, end: 127, label: 'abc' }
          ], $.extend({ repeatLabels: true }, tr), {
            '81-100'  : { features : [ [ 'fillRect', 20, 0, 80,  15 ] ], labels: [ [ 'fillText', 'abc', 20, 0 ] ] },
            '101-120' : { features : [ [ 'fillRect', 0,  0, 100, 15 ] ], labels: [ [ 'fillText', 'abc', 20, 0 ] ] },
            '121-140' : { features : [ [ 'fillRect', 0,  0, 35,  15 ] ]                                           }
          }, { start: 101, end: 120 });
        });

        it('and browser.scale <= 1', function () {
          return testTrackRender([
            { start: 151, end: 510, label: 'abc' }
          ], $.extend({ repeatLabels: true }, tr), {
            '101-300' : { features : [ [ 'fillRect', 25, 0, 75,  15 ] ], labels: [ [ 'fillText', 'abc', 25, 0 ] ] },
            '301-500' : { features : [ [ 'fillRect', 0,  0, 100, 15 ] ], labels: [ [ 'fillText', 'abc', 25, 0 ] ] },
            '501-700' : { features : [ [ 'fillRect', 0,  0, 5.5, 15 ] ]                                           }
          }, { start: 301, end: 500 });
        });
      });

      describe('where the label is longer than its feature', function () {
        it('and browser.scale > 1', function () {
          return testTrackRender([
            { start: 85, end: 125, label: 'WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW' }
          ], $.extend({ repeatLabels: true }, tr), {
            '81-100'  : { features : [ [ 'fillRect', 20, 0, 80,  15 ] ], labels: [ [ 'fillText', 'WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW',  20,  0 ] ] },
            '101-120' : { features : [ [ 'fillRect', 0,  0, 100, 15 ] ], labels: [ [ 'fillText', 'WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW', -80,  0 ] ] },
            '121-140' : { features : [ [ 'fillRect', 0,  0, 25,  15 ] ], labels: [ [ 'fillText', 'WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW', -180, 0 ] ] }
          }, { start: 101, end: 120, longestLabel: 59 });
        });

        it('and browser.scale <= 1', function () {
          return testTrackRender([
            { start: 151, end: 510, label: 'WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW' }
          ], $.extend({ repeatLabels: true }, tr), {
            '101-300' : { features : [ [ 'fillRect', 25, 0, 75,  15 ] ], labels: [ [ 'fillText', 'WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW',  25,  0 ] ] },
            '301-500' : { features : [ [ 'fillRect', 0,  0, 100, 15 ] ], labels: [ [ 'fillText', 'WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW', -75,  0 ] ] },
            '501-700' : { features : [ [ 'fillRect', 0,  0, 5.5, 15 ] ], labels: [ [ 'fillText', 'WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW', -175, 0 ] ] },
          }, { start: 301, end: 500, longestLabel: 59 });
        });
      });
    });
  });

  describe('a label spans two images', function () {
    describe('where a feature spans two images, but its label does not', function () {
      it('with track.labels = true', function () {
        return testTrackRender([
          { start: 16, end: 25, label: 'a' },
        ], track, {
          '1-20'  : [ [ 'fillRect', 75, 0, 25, 15 ], [ 'fillText', 'a', 75, 15 ] ],
          '21-40' : [ [ 'fillRect', 0,  0, 25, 15 ] ]
        });
      });

      it('with track.labels = "overlay"', function () {
        return testTrackRender([
          { start: 6, end: 21, label: 'a', labelColor: 'white' },
        ], $.extend({ labels: 'overlay' }, track), {
          '1-20'  : [ [ 'fillRect', 25, 0, 75, 15 ], [ 'fillText', 'a', 65, 8, 'white' ] ],
          '21-40' : [ [ 'fillRect', 0,  0, 5, 15 ] ]
        });
      });

      it('with track.labels = "separate"', function () {
        return testTrackRender([
          { start: 16, end: 25, label: 'a' },
        ], $.extend({ labels: 'separate' }, track), {
          '1-20'  : { features: [ [ 'fillRect', 75, 0, 25, 15 ] ], labels: [ [ 'fillText', 'a', 75, 0 ] ] },
          '21-40' : { features: [ [ 'fillRect', 0,  0, 25, 15 ] ] }
        });
      });
    });

    describe('where a label spans two images, but its feature does not', function () {
      it('with track.labels = true', function () {
        return testTrackRender([
          { start: 19, end: 19, label: 'abcdef' },
        ], track, {
          '1-20'  : [ [ 'fillRect', 90, 0, 5, 15 ], [ 'fillText', 'abcdef', 90, 15 ] ],
          '21-40' : [ [ 'fillText', 'abcdef', -10, 15 ] ]
        });
      });

      it('with track.labels = "separate"', function () {
        return testTrackRender([
          { start: 19, end: 19, label: 'abcdef' },
        ], $.extend({ labels: 'separate' }, track), {
          '1-20'  : { labels: [ [ 'fillText', 'abcdef',  90, 0 ] ], features: [ [ 'fillRect', 90, 0, 5, 15 ] ] },
          '21-40' : { labels: [ [ 'fillText', 'abcdef', -10, 0 ] ] }
        });
      });
    });

    describe('where both feature and label span two images', function () {
      it('with track.labels = true', function () {
        return testTrackRender([
          { start: 16, end: 25, label: 'abcdef' },
        ], track, {
          '1-20'  : [ [ 'fillRect', 75, 0, 25, 15 ], [ 'fillText', 'abcdef',  75, 15 ] ],
          '21-40' : [ [ 'fillRect', 0,  0, 25, 15 ], [ 'fillText', 'abcdef', -25, 15 ] ]
        });
      });

      it('with track.labels = "overlay"', function () {
        return testTrackRender([
          { start: 16, end: 25, label: 'abcdef', labelColor: 'white' },
        ], $.extend({ labels: 'overlay' }, track), {
          '1-20'  : [ [ 'fillRect', 75, 0, 25, 15 ], [ 'fillText', 'abcdef', 100, 8, 'white' ] ],
          '21-40' : [ [ 'fillRect', 0,  0, 25, 15 ], [ 'fillText', 'abcdef', 0,   8, 'white' ] ]
        });
      });

      it('with track.labels = "separate"', function () {
        return testTrackRender([
          { start: 16, end: 25, label: 'abcdef' },
        ], $.extend({ labels: 'separate' }, track), {
          '1-20'  : { features: [ [ 'fillRect', 75, 0, 25, 15 ] ], labels: [ [ 'fillText', 'abcdef',  75, 0 ] ] },
          '21-40' : { features: [ [ 'fillRect', 0,  0, 25, 15 ] ], labels: [ [ 'fillText', 'abcdef', -25, 0 ] ] }
        });
      });
    });

    describe('with bumped features and labels', function () {
      it('with track.labels = true', function () {
        return testTrackRender([
          { start: 16, end: 25, label: 'a'      },
          { start: 16, end: 25, label: 'abcdef' },
          { start: 19, end: 19, label: 'qwerty' }
        ], track, {
          '1-20'  : [ [ 'fillRect', 75, 0, 25, 15 ], [ 'fillText', 'a', 75, 15 ], [ 'fillRect', 75, 27, 25, 15 ], [ 'fillText', 'abcdef', 75,  42 ], [ 'fillRect', 90, 54, 5, 15 ], [ 'fillText', 'qwerty',  90, 69 ] ],
          '21-40' : [ [ 'fillRect', 0,  0, 25, 15 ],                              [ 'fillRect', 0,  27, 25, 15 ], [ 'fillText', 'abcdef', -25, 42 ],                                [ 'fillText', 'qwerty', -10, 69 ] ]
        });
      });

      it('with track.labels = "overlay"', function () {
        return testTrackRender([
          { start: 16, end: 25, label: 'a',      labelColor: 'white' },
          { start: 16, end: 25, label: 'abcdef', labelColor: 'white' },
          { start: 17, end: 19, label: 'b',      labelColor: 'white' }
        ], $.extend({ labels: 'overlay' }, track), {
          '1-20': [
            [ 'fillRect', 75, 0,  25, 15 ], [ 'fillText', 'a',      100,  8,  'white' ],
            [ 'fillRect', 75, 15, 25, 15 ], [ 'fillText', 'abcdef', 100,  23, 'white' ],
            [ 'fillRect', 80, 30, 15, 15 ], [ 'fillText', 'b',      87.5, 38, 'white' ]
          ],
          '21-40': [
            [ 'fillRect', 0, 0,  25, 15 ], [ 'fillText', 'a',      0, 8,  'white' ],
            [ 'fillRect', 0, 15, 25, 15 ], [ 'fillText', 'abcdef', 0, 23, 'white' ]
          ]
        });
      });

      it('with track.labels = "separate"', function () {
        return testTrackRender([
          { start: 16, end: 25, label: 'a'      },
          { start: 16, end: 25, label: 'abcdef' },
          { start: 19, end: 19, label: 'qwerty' }
        ], $.extend({ labels: 'separate' }, track), {
          '1-20': {
            features : [ [ 'fillRect', 75, 0, 25, 15 ], [ 'fillRect', 75, 15, 25, 15   ], [ 'fillRect', 90, 30, 5, 15   ] ],
            labels   : [ [ 'fillText', 'a', 75, 0 ],    [ 'fillText', 'abcdef', 75, 12 ], [ 'fillText', 'qwerty', 90, 0 ] ]
          },
          '21-40': {
            features : [ [ 'fillRect', 0, 0, 25, 15 ], [ 'fillRect', 0, 15, 25, 15     ]                                   ],
            labels   : [                               [ 'fillText', 'abcdef', -25, 12 ], [ 'fillText', 'qwerty', -10, 0 ] ]
          }
        });
      });
    });
  });

  describe('labels are colored', function () {
    it('red label with feature.labelColor', function () {
      return testTrackRenderStatic([
        { start: 1, end: 10, label: 'abc', labelColor: 'red' }
      ], track, [ [ 'fillRect', 0, 0, 50, 15 ], [ 'fillText', 'abc', 0, 15, 'red' ] ]);
    });

    it('red label with feature.color', function () {
      return testTrackRenderStatic([
        { start: 1, end: 10, label: 'abc', color: 'red' }
      ], track, [ [ 'fillRect', 0, 0, 50, 15, 'red' ], [ 'fillText', 'abc', 0, 15, 'red' ] ]);
    });

    it('red label with track.fontColor', function () {
      return testTrackRenderStatic([
        { start: 1, end: 10, label: 'abc' }
      ], $.extend({ fontColor: 'red' }, track), [ [ 'fillRect', 0, 0, 50, 15 ], [ 'fillText', 'abc', 0, 15, 'red' ] ]);
    });

    it('a mixture of all three methods (order of precendence = feature.labelColor > track.fontColor > feature.color)', function () {
      return testTrackRenderStatic([
        { start: 1, end: 10, label: 'abc', labelColor : 'green' },
        { start: 1, end: 10, label: 'abc', color      : 'blue'  },
        { start: 1, end: 10, label: 'abc' },
      ], $.extend({ fontColor: 'red' }, track), [
        [ 'fillRect', 0, 0,  50, 15         ], [ 'fillText', 'abc', 0, 15, 'green' ],
        [ 'fillRect', 0, 27, 50, 15, 'blue' ], [ 'fillText', 'abc', 0, 42, 'red'   ],
        [ 'fillRect', 0, 54, 50, 15         ], [ 'fillText', 'abc', 0, 69, 'red'   ]
      ]);
    });
  });

  describe('labels might be forced to be separate', function () {
    [
      { why: 'track.bump = "labels"',                              track: Genoverse.Track.extend({ bump  : 'labels'                    }), expected: 'separate' },
      { why: 'track.depth is set',                                 track: Genoverse.Track.extend({ depth : 1                           }), expected: 'separate' },
      { why: 'track.bump = "labels" and track.labels = "overlay"', track: Genoverse.Track.extend({ bump  : 'labels', labels: 'overlay' }), expected: 'overlay'  },
      { why: 'track.depth is set and track.labels = "overlay"',    track: Genoverse.Track.extend({ depth : 1,        labels: 'overlay' }), expected: 'overlay'  },
      { why: 'track.bump = "labels" and track.labels = false',     track: Genoverse.Track.extend({ bump  : 'labels', labels: false     }), expected: false      },
      { why: 'track.depth is set and track.labels = false',        track: Genoverse.Track.extend({ depth : 1,        labels: false     }), expected: false      }
    ].forEach(function (test) {
      it('because ' + test.why, function () {
        expect(new Genoverse({ tracks: [ test.track ], chromosomeSize: 1000 }).tracks[0].prop('labels')).toEqual(test.expected);
      });
    });
  });
});
