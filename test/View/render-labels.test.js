const { afterTest, testTrackRender, testTrackRenderStatic } = require('../utils');

describe('Correctly render labels where:', () => {
  afterEach(afterTest);

  const track = { resizable: 'auto', margin: 0, featureHeight: 15, featureMargin: {}, bump: true };

  it('labels are disabled (track.labels = false)', () => testTrackRenderStatic([
    { start: 1, end: 10, label: 'abc' },
  ], { labels: false, ...track }));

  describe('labels appear below their features (track.labels = true)', () => {
    it('with a label shorter than its feature', () => testTrackRenderStatic([
      { start: 1, end: 10, label: 'abc' },
    ], track));

    it('with a label longer than its feature', () => testTrackRenderStatic([
      { start: 1, end: 10, label: 'WWWWWWWWWW' },
    ], track));

    it('with a multi-line label', () => testTrackRenderStatic([
      { start: 1, end: 10, label: 'abc\ndef' },
    ], track));

    it('with bumped features', () => testTrackRenderStatic([
      { start: 1, end: 10, label: 'abc' },
      { start: 6, end: 6,  label: 'def' },
    ], track));

    it('with a multi-line label and bumped features', () => testTrackRenderStatic([
      { start: 1, end: 10, label: 'abc\ndef' },
      { start: 6, end: 6,  label: 'def' },
    ], track));

    it('with a label longer than its feature and bumped features', () => testTrackRenderStatic([
      { start: 1,  end: 10, label: 'WWWWWW' },
      { start: 13, end: 13, label: 'abc' },
      { start: 14, end: 14, label: 'def' },
    ], track));

    describe('with a repeated label (track.repeatLabels = true)', () => {
      describe('where the label is shorter than its feature', () => {
        it('and browser.scale > 1', () => testTrackRender([
          { start: 85, end: 128, label: 'abc' },
        ], { repeatLabels: true, ...track }, { start: 101, end: 120 }));

        it('and browser.scale <= 1', () => testTrackRender([
          { start: 151, end: 650, label: 'abc' },
        ], { repeatLabels: true, ...track }, { start: 301, end: 500 }));
      });

      describe('where the label is shorter than its feature, but not shown on the last image', () => {
        it('and browser.scale > 1', () => testTrackRender([
          { start: 85, end: 127, label: 'abc' },
        ], { repeatLabels: true, ...track }, { start: 101, end: 120 }));

        it('and browser.scale <= 1', () => testTrackRender([
          { start: 151, end: 510, label: 'abc' },
        ], { repeatLabels: true, ...track }, { start: 301, end: 500 }));
      });

      describe('where the label is longer than its feature', () => {
        it('and browser.scale > 1', () => testTrackRender([
          { start: 85, end: 125, label: 'WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW' },
        ], { repeatLabels: true, ...track }, { start: 101, end: 120, longestLabel: 59 }));

        it('and browser.scale <= 1', () => testTrackRender([
          { start: 151, end: 510, label: 'WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW' },
        ], { repeatLabels: true, ...track }, { start: 301, end: 500, longestLabel: 59 }));
      });
    });
  });

  describe('labels appear overlaid on their features (track.labels = "overlay")', () => {
    const tr = { labels: 'overlay', ...track };

    it('with a label shorter than its feature', () => testTrackRenderStatic([
      { start: 1, end: 10, label: 'WWW', labelColor: 'white' },
    ], tr));

    it('with a label longer than its feature', () => testTrackRenderStatic([
      { start: 1, end: 10, label: 'WWWWWWWWWW', labelColor: 'white' },
    ], tr));

    it('with a multi-line label (gets joined with space)', () => testTrackRenderStatic([
      { start: 1, end: 10, label: 'abc\ndef', labelColor: 'white' },
    ], tr));

    it('with bumped features', () => testTrackRenderStatic([
      { start: 1, end: 10, label: 'abc', labelColor: 'white' },
      { start: 6, end: 7,  label: 'd',   labelColor: 'white' },
    ], tr));

    describe('with a repeated label (track.repeatLabels = true)', () => {
      describe('where the label is shorter than its feature', () => {
        it('and browser.scale > 1', () => testTrackRender([
          { start: 85, end: 138, label: 'abc', labelColor: 'red' },
        ], { repeatLabels: true, ...tr }, { start: 101, end: 120 }));

        it('and browser.scale <= 1', () => testTrackRender([
          { start: 151, end: 650, label: 'abc', labelColor: 'red' },
        ], { repeatLabels: true, ...tr }, { start: 301, end: 500 }));
      });

      describe('where the label is shorter than its feature, but not shown on the last image', () => {
        it('and browser.scale > 1', () => testTrackRender([
          { start: 85, end: 137, label: 'abc', labelColor: 'red' },
        ], { repeatLabels: true, ...tr }, { start: 101, end: 120 }));

        it('and browser.scale <= 1', () => testTrackRender([
          { start: 151, end: 550, label: 'abc', labelColor: 'red' },
        ], { repeatLabels: true, ...tr }, { start: 301, end: 500 }));
      });

      it('where the label is longer than its feature', () => testTrackRender([
        { start: 85, end: 125, label: 'WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW', labelColor: 'white' },
      ], { repeatLabels: true, ...tr }, { start: 101, end: 120, longestLabel: 59 }));
    });
  });

  describe('labels appear on a separate image - all labels are below all features (track.labels = "separate")', () => {
    const tr = { labels: 'separate', ...track };

    it('with bumped features and unbumped labels', () => testTrackRenderStatic([
      { start: 1, end: 10, label: 'abc' },
      { start: 6, end: 6,  label: 'def' },
    ], tr));

    it('with bumped features and bumped labels', () => testTrackRenderStatic([
      { start: 1, end: 10, label: 'WWW' },
      { start: 6, end: 6,  label: 'abc' },
    ], tr));

    it('with bumped features and bumped labels and track.depth', () => testTrackRenderStatic([
      { start: 1, end: 10, label: 'WWW' },
      { start: 6, end: 6,  label: 'abc' },
    ], { depth: 1, height: 50, ...tr }));

    describe('with a repeated label (track.repeatLabels = true)', () => {
      describe('where the label is shorter than its feature', () => {
        it('and browser.scale > 1', () => testTrackRender([
          { start: 85, end: 128, label: 'abc' },
        ], { repeatLabels: true, ...tr }, { start: 101, end: 120 }));

        it('and browser.scale <= 1', () => testTrackRender([
          { start: 151, end: 650, label: 'abc' },
        ], { repeatLabels: true, ...tr }, { start: 301, end: 500 }));
      });

      describe('where the label is shorter than its feature, but not shown on the last image', () => {
        it('and browser.scale > 1', () => testTrackRender([
          { start: 85, end: 127, label: 'abc' },
        ], { repeatLabels: true, ...tr }, { start: 101, end: 120 }));

        it('and browser.scale <= 1', () => testTrackRender([
          { start: 151, end: 510, label: 'abc' },
        ], { repeatLabels: true, ...tr }, { start: 301, end: 500 }));
      });

      describe('where the label is longer than its feature', () => {
        it('and browser.scale > 1', () => testTrackRender([
          { start: 85, end: 125, label: 'WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW' },
        ], { repeatLabels: true, ...tr }, { start: 101, end: 120, longestLabel: 59 }));

        it('and browser.scale <= 1', () => testTrackRender([
          { start: 151, end: 510, label: 'WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW' },
        ], { repeatLabels: true, ...tr }, { start: 301, end: 500, longestLabel: 59 }));
      });
    });
  });

  describe('a label spans two images', () => {
    describe('where a feature spans two images, but its label does not', () => {
      it('with track.labels = true', () => testTrackRender([
        { start: 16, end: 25, label: 'a' },
      ], track));

      it('with track.labels = "overlay"', () => testTrackRender([
        { start: 6, end: 21, label: 'a', labelColor: 'white' },
      ], { labels: 'overlay', ...track }));

      it('with track.labels = "separate"', () => testTrackRender([
        { start: 16, end: 25, label: 'a' },
      ], { labels: 'separate', ...track }));
    });

    describe('where a label spans two images, but its feature does not', () => {
      it('with track.labels = true', () => testTrackRender([
        { start: 19, end: 19, label: 'abcdef' },
      ], track));

      it('with track.labels = "separate"', () => testTrackRender([
        { start: 19, end: 19, label: 'abcdef' },
      ], { labels: 'separate', ...track }));
    });

    describe('where both feature and label span two images', () => {
      it('with track.labels = true', () => testTrackRender([
        { start: 16, end: 25, label: 'abcdef' },
      ], track));

      it('with track.labels = "overlay"', () => testTrackRender([
        { start: 16, end: 25, label: 'abcdef', labelColor: 'white' },
      ], { labels: 'overlay', ...track }));

      it('with track.labels = "separate"', () => testTrackRender([
        { start: 16, end: 25, label: 'abcdef' },
      ], { labels: 'separate', ...track }));
    });

    describe('with bumped features and labels', () => {
      it('with track.labels = true', () => testTrackRender([
        { start: 16, end: 25, label: 'a'      },
        { start: 16, end: 25, label: 'abcdef' },
        { start: 19, end: 19, label: 'qwerty' },
      ], track));

      it('with track.labels = "overlay"', () => testTrackRender([
        { start: 16, end: 25, label: 'a',      labelColor: 'white' },
        { start: 16, end: 25, label: 'abcdef', labelColor: 'white' },
        { start: 17, end: 19, label: 'b',      labelColor: 'white' },
      ], { labels: 'overlay', ...track }));

      it('with track.labels = "separate"', () => testTrackRender([
        { start: 16, end: 25, label: 'a'      },
        { start: 16, end: 25, label: 'abcdef' },
        { start: 19, end: 19, label: 'qwerty' },
      ], { labels: 'separate', ...track }));
    });
  });

  describe('labels are colored', () => {
    it('red label with feature.labelColor', () => testTrackRenderStatic([
      { start: 1, end: 10, label: 'abc', labelColor: 'red' },
    ], track));

    it('red label with feature.color', () => testTrackRenderStatic([
      { start: 1, end: 10, label: 'abc', color: 'red' },
    ], track));

    it('red label with track.fontColor', () => testTrackRenderStatic([
      { start: 1, end: 10, label: 'abc' },
    ], { fontColor: 'red', ...track }));

    it('a mixture of all three methods (order of precendence = feature.labelColor > track.fontColor > feature.color)', () => testTrackRenderStatic([
      { start: 1, end: 10, label: 'abc', labelColor: 'green' },
      { start: 1, end: 10, label: 'abc', color: 'blue'  },
      { start: 1, end: 10, label: 'abc' },
    ], { fontColor: 'red', ...track }));
  });

  describe('labels might be forced to be separate', () => {
    [
      { why: 'track.bump = "labels"',                              track: Genoverse.Track.extend({ bump: 'labels'                    }), expected: 'separate' },
      { why: 'track.depth is set',                                 track: Genoverse.Track.extend({ depth: 1                          }), expected: 'separate' },
      { why: 'track.bump = "labels" and track.labels = "overlay"', track: Genoverse.Track.extend({ bump: 'labels', labels: 'overlay' }), expected: 'overlay'  },
      { why: 'track.depth is set and track.labels = "overlay"',    track: Genoverse.Track.extend({ depth: 1,       labels: 'overlay' }), expected: 'overlay'  },
      { why: 'track.bump = "labels" and track.labels = false',     track: Genoverse.Track.extend({ bump: 'labels', labels: false     }), expected: false      },
      { why: 'track.depth is set and track.labels = false',        track: Genoverse.Track.extend({ depth: 1,       labels: false     }), expected: false      },
    ].forEach((test) => {
      it(`because ${test.why}`, () => {
        expect(new Genoverse({ tracks: [ test.track ], chromosomeSize: 1000 }).tracks[0].prop('labels')).toBe(test.expected);
      });
    });
  });
});
