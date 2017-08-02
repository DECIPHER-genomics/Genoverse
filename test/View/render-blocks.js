'use strict';

describe('Correctly render blocks where:', function () {
  afterEach(afterTest);

  var track = { height: 50, margin: 0, featureHeight: 10, featureMargin: {} };

  describe('feature heights and margins are set', function () {
    [
      { why: 'default track settings', draw: [ [ 0, 3, 50, 12 ] ] },
      { why: 'no feature margin',      draw: [ [ 0, 0, 50, 10 ] ], track: track },
      { why: 'feature margin top',     draw: [ [ 0, 1, 50, 10 ] ], track: $.extend({}, track, { featureMargin: { top: 1 } }) },
      { why: 'track margin',           draw: [ [ 0, 0, 50, 10 ] ], track: $.extend({}, track, { margin: 1 }) },
      { why: 'half feature height',    draw: [ [ 0, 0, 50, 5  ] ], track: $.extend({}, track, { featureHeight: 5 }) },
      { why: 'default feature height', draw: [ [ 0, 0, 50, 50 ] ], track: { height: 50, margin: 0, featureMargin: {} } }
    ].forEach(function (test) {
      it('with ' + test.why, function () {
        return testTrackRenderStatic([{ start: 1, end: 10 }], test.track, test.draw);
      });
    });
  });

  describe('features are colored', function () {
    [
      { why: 'all red with feature.color', track: track },
      { why: 'all red with track.color',   track: $.extend({}, track, { color: 'red' }) },
    ].forEach(function (test) {
      it(test.why, function () {
        var color = test.track.color ? undefined : 'red';

        return testTrackRenderStatic([
          { start: 1,  end: 5,  color: color },
          { start: 6,  end: 10, color: color },
          { start: 11, end: 15, color: color },
          { start: 16, end: 20, color: color },
        ], test.track, [ [ 0, 0, 100, 10, 'red' ] ]);
      });
    });

    it('rgbk with feature.color', function () {
      return testTrackRenderStatic([
        { start: 1,  end: 5,  color: 'red'   },
        { start: 6,  end: 10, color: 'green' },
        { start: 11, end: 15, color: 'blue'  },
        { start: 16, end: 20  },
      ], track, [ [ 0, 0, 25, 10, 'red' ], [ 25, 0, 25, 10, 'green' ], [ 50, 0, 25, 10, 'blue' ], [ 75, 0, 25, 10 ] ]);
    });

    it('rgbk with track.color = red', function () {
      return testTrackRenderStatic([
        { start: 1,  end: 5                  },
        { start: 6,  end: 10, color: 'green' },
        { start: 11, end: 15, color: 'blue'  },
        { start: 16, end: 20, color: 'black' },
      ], $.extend({}, track, { color: 'red' }), [ [ 0, 0, 25, 10 ], [ 25, 0, 25, 10, 'green' ], [ 50, 0, 25, 10, 'blue' ], [ 75, 0, 25, 10, 'black' ] ]);
    });

    it('feature.color = false', function () {
      return testTrackRenderStatic([{ start: 1, end: 5, color: false }], track, []);
    });
  });

  describe('features have borders', function () {
    it('with default feature.color', function () {
      return testTrackRenderStatic([{ start: 1, end: 5, borderColor: 'blue' }], track, [ [ 'fillRect', 0, 0, 25, 10 ], [ 'strokeRect', 0, 0.5, 25, 10, 'blue' ] ]);
    });

    it('with feature.color = "red"', function () {
      return testTrackRenderStatic([{ start: 1, end: 5, borderColor: 'blue', color: 'red' }], track, [ [ 'fillRect', 0, 0, 25, 10, 'red' ], [ 'strokeRect', 0, 0.5, 25, 10, 'blue' ] ]);
    });

    it('with feature.color = false', function () {
      return testTrackRenderStatic([{ start: 1, end: 5, borderColor: 'blue', color: false }], track, [ [ 'strokeRect', 0, 0.5, 25, 10, 'blue' ] ]);
    });
  });

  track.bump = true;

  describe('features are bumped (track.bump = true)', function () {
    [
      { why: 'no feature margin',                    draw: [ [ 0, 0, 50, 20 ]                                        ], track: track },
      { why: 'feature margin top',                   draw: [ [ 0, 1, 50, 10 ], [ 0, 12, 50, 10 ]                     ], track: $.extend({}, track, { featureMargin: { top: 1                      }           }) },
      { why: 'feature margin bottom',                draw: [ [ 0, 0, 50, 10 ], [ 0, 11, 50, 10 ]                     ], track: $.extend({}, track, { featureMargin: { bottom: 1                   }           }) },
      { why: 'feature margin right',                 draw: [ [ 0, 0, 50, 10 ], [ 0, 10, 25, 10 ], [ 25, 20, 25, 10 ] ], track: $.extend({}, track, { featureMargin: { right: 1                    }           }) },
      { why: 'feature margin left (does nothing)',   draw: [ [ 0, 0, 50, 20 ]                                        ], track: $.extend({}, track, { featureMargin: { left: 1                     }           }) },
      { why: 'feature margin top, bottom and right', draw: [ [ 0, 1, 50, 10 ], [ 0, 13, 25, 10 ], [ 25, 25, 25, 10 ] ], track: $.extend({}, track, { featureMargin: { top: 1, bottom: 1, right: 1 }           }) },
      { why: 'max depth',                            draw: [ [ 0, 1, 50, 10 ], [ 0, 13, 25, 10 ]                     ], track: $.extend({}, track, { featureMargin: { top: 1, bottom: 1, right: 1 }, depth: 2 }) },
    ].forEach(function (test) {
      it('with ' + test.why, function () {
        return testTrackRenderStatic([
          { start: 1, end: 10 },
          { start: 6, end: 10 },
          { start: 1, end: 5  }
        ], test.track, test.draw);
      });
    });
  });

  describe('the browser is dynamic', function () {
    describe('at chromosome start', function () {
      it('with a single feature on first image only', function () {
        return testTrackRender([
          { start: 1, end: 10 },
        ], track, { '1-20': [ [ 0, 0, 50, 10 ] ], '21-40': [] });
      });

      it('with a feature on each (two) image', function () {
        return testTrackRender([
          { start: 1,  end: 10 },
          { start: 21, end: 30 },
        ], track, { '1-20': [ [ 0, 0, 50, 10 ] ], '21-40': [ [ 0, 0, 50, 10 ] ] });
      });

      it('with a single feature spanning two images', function () {
        return testTrackRender([
          { start: 16, end: 25 },
        ], track, { '1-20': [ [ 75, 0, 25, 10 ] ], '21-40': [ [ 0, 0, 25, 10 ] ] });
      });

      it('with bumped features spanning two images', function () {
        return testTrackRender([
          { start: 1, end: 10 },
          { start: 6, end: 25 },
        ], track, { '1-20': [ [ 0, 0, 50, 10 ], [ 25, 10, 75, 10 ] ], '21-40': [ [ 0, 10, 25, 10 ] ] });
      });
    });

    describe('in the middle of the chromosome', function () {
      it('with a feature on each (three) image', function () {
        return testTrackRender([
          { start: 81,  end: 90  },
          { start: 101, end: 110 },
          { start: 121, end: 130 },
        ], track, { '81-100': [ [ 0, 0, 50, 10 ] ], '101-120': [ [ 0, 0, 50, 10 ] ], '121-140': [ [ 0, 0, 50, 10 ] ] }, { start: 101, end: 120 });
      });

      it('with a single feature spanning three images', function () {
        return testTrackRender([
          { start: 96, end: 125 },
        ], track, { '81-100': [ [ 75, 0, 25, 10 ] ], '101-120': [ [ 0, 0, 100, 10 ] ], '121-140': [ [ 0, 0, 25, 10 ] ] }, { start: 101, end: 120 });
      });

      it('with bumped features spanning multiple images', function () {
        return testTrackRender([
          { start: 1,   end: 200, color: 'red'    },
          { start: 81,  end: 90,  color: 'blue'   },
          { start: 86,  end: 105, color: 'green'  },
          { start: 88,  end: 130, color: 'yellow' },
          { start: 103, end: 103, color: 'orange' },
          { start: 110, end: 110, color: 'purple' },
          { start: 126, end: 135, color: 'pink'   },
          { start: 132, end: 132, color: 'black'  },
        ], track, {
          '81-100'  : [ [ 0, 0, 100, 10, 'red' ], [ 35, 30, 65,  10, 'yellow' ], [ 25, 20, 75, 10, 'green' ], [ 0,  10, 50, 10, 'blue'   ] ],
          '101-120' : [ [ 0, 0, 100, 10, 'red' ], [ 0,  30, 100, 10, 'yellow' ], [ 0,  20, 25, 10, 'green' ], [ 10, 10, 5,  10, 'orange' ], [ 45, 10, 5, 10, 'purple' ] ],
          '121-140' : [ [ 0, 0, 100, 10, 'red' ], [ 0,  30, 50,  10, 'yellow' ], [ 25, 10, 50, 10, 'pink'  ], [ 55, 20, 5,  10, 'black'  ] ]
        }, { start: 101, end: 120 });
      });

      it('with bumped features and features with feature.y', function () {
        // bump takes precendence over y, so pink is bumped down as it overlaps with red.
        // This probably shouldn't be the case, but mixing feature.y and track.bump is not really supported.
        return testTrackRender([
          { start: 1,   end: 200, color: 'red'         },
          { start: 81,  end: 90,  color: 'blue',  y: 2 },
          { start: 86,  end: 105, color: 'green'       },
          { start: 88,  end: 130, color: 'yellow'      },
          { start: 103, end: 103, color: 'orange'      },
          { start: 110, end: 110, color: 'purple'      },
          { start: 126, end: 135, color: 'pink',  y: 0 },
          { start: 132, end: 132, color: 'black', y: 9 },
        ], track, {
          '81-100'  : [ [ 0, 0, 100, 10, 'red' ], [ 35, 30, 65,  10, 'yellow' ], [ 25, 10, 75, 10, 'green' ], [ 0,  20, 50, 10, 'blue'   ] ],
          '101-120' : [ [ 0, 0, 100, 10, 'red' ], [ 0,  30, 100, 10, 'yellow' ], [ 0,  10, 25, 10, 'green' ], [ 10, 20, 5,  10, 'orange' ], [ 45, 10, 5, 10, 'purple' ] ],
          '121-140' : [ [ 0, 0, 100, 10, 'red' ], [ 0,  30, 50,  10, 'yellow' ], [ 25, 10, 50, 10, 'pink'  ], [ 55, 90, 5,  10, 'black'  ] ]
        }, { start: 101, end: 120 });
      });

      it('with bumped features of varying heights', function () {
        return testTrackRender([
          { start: 1,   end: 200, color: 'red'               },
          { start: 81,  end: 90,  color: 'blue',  height: 15 },
          { start: 86,  end: 105, color: 'green'             },
          { start: 88,  end: 130, color: 'yellow'            },
          { start: 103, end: 103, color: 'orange'            },
          { start: 110, end: 110, color: 'purple'            },
          { start: 110, end: 110, color: 'grey',  height: 8  },
          { start: 110, end: 110, color: 'aqua',  height: 5  },
          { start: 126, end: 135, color: 'pink',  height: 20 },
          { start: 132, end: 132, color: 'black'  },
        ], $.extend({}, track, { featureMargin: { bottom: 1 } }), {
          '81-100'  : [ [ 0, 0, 100, 10, 'red' ], [ 35, 38, 65,  10, 'yellow' ], [ 25, 27, 75, 10, 'green' ], [ 0,  11, 50, 15, 'blue'   ] ],
          '101-120' : [ [ 0, 0, 100, 10, 'red' ], [ 0,  38, 100, 10, 'yellow' ], [ 0,  27, 25, 10, 'green' ], [ 10, 11, 5,  10, 'orange' ], [ 45, 11, 5, 10, 'purple' ], [ 45, 22, 5, 8, 'grey' ], [ 45, 31, 5, 5, 'aqua' ] ],
          '121-140' : [ [ 0, 0, 100, 10, 'red' ], [ 0,  38, 50,  10, 'yellow' ], [ 25, 11, 50, 20, 'pink'  ], [ 55, 32, 5,  10, 'black'  ] ]
        }, { start: 101, end: 120 });
      });
    });

    describe('at chromosome end', function () {
      it('with a single feature on last image only', function () {
        return testTrackRender([
          { start: 981, end: 990 },
        ], track, { '961-980': [], '981-1000': [ [ 0, 0, 50, 10 ] ] }, { start: 981, end: 1000 });
      });

      it('with a feature on each (two) image', function () {
        return testTrackRender([
          { start: 961, end: 970 },
          { start: 981, end: 990 },
        ], track, { '961-980': [ [ 0, 0, 50, 10 ] ], '981-1000': [ [ 0, 0, 50, 10 ] ] }, { start: 981, end: 1000 });
      });

      it('with a single feature spanning two images', function () {
        return testTrackRender([
          { start: 976, end: 985 },
        ], track, { '961-980': [ [ 75, 0, 25, 10 ] ], '981-1000': [ [ 0, 0, 25, 10 ] ] }, { start: 981, end: 1000 });
      });

      it('with bumped features spanning two images', function () {
        return testTrackRender([
          { start: 961, end: 970 },
          { start: 966, end: 985 },
        ], track, { '961-980': [ [ 0, 0, 50, 10 ], [ 25, 10, 75, 10 ] ], '981-1000': [ [ 0, 10, 25, 10 ] ] }, { start: 981, end: 1000 });
      });
    });
  });
});
