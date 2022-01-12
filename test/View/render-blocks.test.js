const { afterTest, testTrackRender, testTrackRenderStatic } = require('../utils');

describe('Correctly render blocks where:', () => {
  afterEach(afterTest);

  const track = { height: 50, margin: 0, featureHeight: 10, featureMargin: {} };

  describe('feature heights and margins are set', () => {
    [
      { why: 'default track settings' },
      { why: 'no feature margin',      track: track },
      { why: 'feature margin top',     track: { ...track, featureMargin: { top: 1 } } },
      { why: 'track margin',           track: { ...track, margin: 1 } },
      { why: 'half feature height',    track: { ...track, featureHeight: 5 } },
      { why: 'default feature height', track: { height: 50, margin: 0, featureMargin: {} } },
    ].forEach(
      test => it(`with ${test.why}`, () => testTrackRenderStatic([{ start: 1, end: 10 }], test.track))
    );
  });

  describe('features are colored', () => {
    [
      { why: 'all red with feature.color', track: track },
      { why: 'all red with track.color',   track: { ...track, color: 'red' } },
    ].forEach((test) => {
      it(test.why, () => {
        const color = test.track.color ? undefined : 'red';

        return testTrackRenderStatic([
          { start: 1,  end: 5,  color: color },
          { start: 6,  end: 10, color: color },
          { start: 11, end: 15, color: color },
          { start: 16, end: 20, color: color },
        ], test.track);
      });
    });

    it('rgbk with feature.color', () => testTrackRenderStatic([
      { start: 1,  end: 5,  color: 'red'   },
      { start: 6,  end: 10, color: 'green' },
      { start: 11, end: 15, color: 'blue'  },
      { start: 16, end: 20 },
    ], track));

    it('rgbk with track.color = red', () => testTrackRenderStatic([
      { start: 1,  end: 5                  },
      { start: 6,  end: 10, color: 'green' },
      { start: 11, end: 15, color: 'blue'  },
      { start: 16, end: 20, color: 'black' },
    ], { ...track, color: 'red' }));

    it('feature.color = false', () => testTrackRenderStatic([{ start: 1, end: 5, color: false }], track));
  });

  describe('features have borders', () => {
    it('with default feature.color', () => testTrackRenderStatic([{ start: 1, end: 5, borderColor: 'blue' }], track));
    it('with feature.color = "red"', () => testTrackRenderStatic([{ start: 1, end: 5, borderColor: 'blue', color: 'red' }], track));
    it('with feature.color = false', () => testTrackRenderStatic([{ start: 1, end: 5, borderColor: 'blue', color: false }], track));
  });

  track.bump = true;

  describe('features are bumped (track.bump = true)', () => {
    [
      { why: 'no feature margin',                    track: track },
      { why: 'feature margin top',                   track: { ...track, featureMargin: { top: 1                      }           } },
      { why: 'feature margin bottom',                track: { ...track, featureMargin: { bottom: 1                   }           } },
      { why: 'feature margin right',                 track: { ...track, featureMargin: { right: 1                    }           } },
      { why: 'feature margin left (does nothing)',   track: { ...track, featureMargin: { left: 1                     }           } },
      { why: 'feature margin top, bottom and right', track: { ...track, featureMargin: { top: 1, bottom: 1, right: 1 }           } },
      { why: 'max depth',                            track: { ...track, featureMargin: { top: 1, bottom: 1, right: 1 }, depth: 2 } },
    ].forEach((test) => {
      it(`with ${test.why}`, () => testTrackRenderStatic([
        { start: 1, end: 10 },
        { start: 6, end: 10 },
        { start: 1, end: 5  },
      ], test.track));
    });
  });

  describe('the browser is dynamic', () => {
    describe('at chromosome start', () => {
      it('with a single feature on first image only', () => testTrackRender([
        { start: 1, end: 10 },
      ], track));

      it('with a feature on each (two) image', () => testTrackRender([
        { start: 1,  end: 10 },
        { start: 21, end: 30 },
      ], track));

      it('with a single feature spanning two images', () => testTrackRender([
        { start: 16, end: 25 },
      ], track));

      it('with bumped features spanning two images', () => testTrackRender([
        { start: 1, end: 10 },
        { start: 6, end: 25 },
      ], track));
    });

    describe('in the middle of the chromosome', () => {
      it('with a feature on each (three) image', () => testTrackRender([
        { start: 81,  end: 90  },
        { start: 101, end: 110 },
        { start: 121, end: 130 },
      ], track, { start: 101, end: 120 }));

      it('with a single feature spanning three images', () => testTrackRender([
        { start: 96, end: 125 },
      ], track, { start: 101, end: 120 }));

      it('with bumped features spanning multiple images', () => testTrackRender([
        { start: 1,   end: 200, color: 'red'    },
        { start: 81,  end: 90,  color: 'blue'   },
        { start: 86,  end: 105, color: 'green'  },
        { start: 88,  end: 130, color: 'yellow' },
        { start: 103, end: 103, color: 'orange' },
        { start: 110, end: 110, color: 'purple' },
        { start: 126, end: 135, color: 'pink'   },
        { start: 132, end: 132, color: 'black'  },
      ], track, { start: 101, end: 120 }));

      // bump takes precendence over y, so pink is bumped down as it overlaps with red.
      // This probably shouldn't be the case, but mixing feature.y and track.bump is not really supported.
      it('with bumped features and features with feature.y', () => testTrackRender([
        { start: 1,   end: 200, color: 'red'         },
        { start: 81,  end: 90,  color: 'blue',  y: 2 },
        { start: 86,  end: 105, color: 'green'       },
        { start: 88,  end: 130, color: 'yellow'      },
        { start: 103, end: 103, color: 'orange'      },
        { start: 110, end: 110, color: 'purple'      },
        { start: 126, end: 135, color: 'pink',  y: 0 },
        { start: 132, end: 132, color: 'black', y: 9 },
      ], track, { start: 101, end: 120 }));

      it('with bumped features of varying heights', () => testTrackRender([
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
      ], { ...track, featureMargin: { bottom: 1 } }, { start: 101, end: 120 }));
    });

    describe('at chromosome end', () => {
      it('with a single feature on last image only', () => testTrackRender([
        { start: 981, end: 990 },
      ], track, { start: 981, end: 1000 }));

      it('with a feature on each (two) image', () => testTrackRender([
        { start: 961, end: 970 },
        { start: 981, end: 990 },
      ], track, { start: 981, end: 1000 }));

      it('with a single feature spanning two images', () => testTrackRender([
        { start: 976, end: 985 },
      ], track, { start: 981, end: 1000 }));

      it('with bumped features spanning two images', () => testTrackRender([
        { start: 961, end: 970 },
        { start: 966, end: 985 },
      ], track, { start: 981, end: 1000 }));
    });
  });
});
