const { afterTest, testTrackRender, testTrackRenderStatic } = require('../utils');

describe('Correctly render scalebar:', () => {
  afterEach(afterTest);

  const track = { _testClass: Genoverse.Track.Scalebar };
  const width = 1000;

  const getInstructions = (end, $width, labelFunction, featureWidth, start, labelStart, labelOffset) => {
    const minus = end > $width ? 0 : $width / end;

    featureWidth = featureWidth || (end > $width ? 21 : 20);

    const step      = (featureWidth - (end > $width ? 1 : 0)) * 2;
    const labelStep = Math.max(step, 100);
    const draw      = [];

    for (let i = (start || 0) - minus; i <= $width; i += step) {
      draw.push([ i, 0, featureWidth, 3 ]);
    }

    for (let i = (typeof labelStart === 'number' ? labelStart : labelStep) - minus; i <= $width; i += labelStep) {
      const n = i + (labelOffset || 0);

      draw.push([ 'fillText', labelFunction(n + minus), i, 5 ]);
      draw.push([ i, 0, 1, 6 ]);
    }

    draw.push([ 0, 0, $width, 1 ]);
    draw.push([ 0, 3, $width, 1 ]);

    return draw;
  };

  const doTest = (end, labelFunction) => testTrackRenderStatic(undefined, track, getInstructions(end, width, labelFunction), { end: end, chromosomeSize: end, width: width });

  describe('at different scales', () => {
    it('in bytes, scale = 1', () => doTest(1000, n => n));
    it('in bytes, scale < 1', () => doTest(1e4,  n => `${n.toString().charAt(0)},000`));
    it('in bytes, scale > 1', () => doTest(100,  n => n / 10));
    it('in kb',               () => doTest(1e5,  n => `${(n / 10).toFixed(2)} kb`));
    it('in Mb',               () => doTest(1e7,  n => `${(n / 100).toFixed(2)} Mb`));
    it('in Gb',               () => doTest(1e10, n => `${(n / 100).toFixed(2)} Gb`));
    it('in Tb',               () => doTest(1e13, n => `${(n / 100).toFixed(2)} Tb`));
  });

  describe('spanning two images', () => {
    it('split on a boundary', () => {
      const end  = 1e7;
      const draw = {
        '1-5000000'        : getInstructions(end, width, n => (n < 200 ? `${(n * 5).toFixed(2)} kb` : `${(n / 200).toFixed(2)} Mb`)),
        '5000001-10000000' : getInstructions(end, width, n => `${(n / 200).toFixed(2)} Mb`, 0, 0, 0, 1000),
      };

      return testTrackRender(undefined, track, draw, { end: end / 2, chromosomeSize: end, width: width });
    });

    it('split mid section', () => {
      const end  = 25e4;
      const draw = {
        '1-125000'      : getInstructions(end, width, n => `${(n / 8).toFixed(2)} kb`, 81),
        '125001-250000' : getInstructions(end, width, n => `${(n / 8).toFixed(2)} kb`, 81, -40, -40, 1000),
      };

      return testTrackRender(undefined, track, draw, { end: end / 2, chromosomeSize: end, width: width });
    });
  });

  it('backgrounds', () => {
    const draw = [];

    for (let i = 0; i <= width; i += 40) {
      draw.push([ i - 1,  0, 1, 1, i        % 100 ? '#E5E5E5' : '#CCCCCC' ]);
      draw.push([ i + 18, 0, 1, 1, (i + 20) % 100 ? '#E5E5E5' : '#CCCCCC' ]);
    }

    return testTrackRenderStatic(undefined, track, { background: draw, features: getInstructions(width, width, n => n) }, { end: width, chromosomeSize: width, width: width });
  });
});
