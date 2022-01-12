const { afterTest, testTrackRenderStatic } = require('../utils');

describe('Correctly render highlights:', () => {
  afterEach(afterTest);

  const track           = { _testClass: Genoverse.Track.HighlightRegion };
  const defaultColors   = Genoverse.Track.HighlightRegion.prototype.colors;
  const genoverseConfig = { end: 1000, width: 1000 };

  it('with a defined color', () => testTrackRenderStatic([{ start: 100, end: 200, label: 'test', color: 'red' }], track, genoverseConfig));

  it('with a mixture of defined colors and no colors', () => {
    const colors   = defaultColors.concat(defaultColors[0]);
    const features = [];

    colors.splice(3, 0, 'yellow');
    colors.splice(6, 0, 'pink');

    colors.forEach((c, i) => {
      i++;

      features.push({ start: 50 * i, end: 25 + (50 * i), label: i.toString(), color: defaultColors.includes(c) ? undefined : c });
    });

    return testTrackRenderStatic(features, track, genoverseConfig);
  });

  describe('where two highlights overlap', () => {
    it('both labels are displayed', () => testTrackRenderStatic(
      [{ start: 100, end: 500, label: 'test1', color: 'red' }, { start: 400, end: 401, label: 'test2', color: 'blue' }],
      track,
      genoverseConfig
    ));

    it('second label is hidden', () => testTrackRenderStatic(
      [{ start: 100, end: 200, label: 'test1', color: 'red' }, { start: 110, end: 120, label: 'test2', color: 'blue' }],
      track,
      genoverseConfig
    ));
  });

  describe('backgrounds', () => {
    it('overlapping highlights, completely inside region', () => testTrackRenderStatic(
      [{ start: 100, end: 200, color: 'red' }, { start: 110, end: 120, color: 'blue' }],
      track,
      genoverseConfig
    ));

    it('only left highlight edge inside region', () => testTrackRenderStatic(
      [{ start: 100, end: 1500, color: 'red' }],
      track,
      { start: 1000, end: 2000, chromsomeSize: 2000 }
    ));

    it('only right highlight edge inside region', () => testTrackRenderStatic(
      [{ start: 100, end: 2000, color: 'red' }],
      track,
      genoverseConfig
    ));

    it('neither highlight edge inside region', () => testTrackRenderStatic(
      [{ start: 100, end: 3000, color: 'red' }],
      track,
      { start: 1000, end: 2000, chromsomeSize: 2000 }
    ));
  });
});
