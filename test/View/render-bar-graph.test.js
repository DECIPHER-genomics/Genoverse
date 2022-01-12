const { Genoverse, afterTest, testTrackRenderStatic } = require('../utils');

describe('Correctly render bar graph where:', () => {
  afterEach(afterTest);

  const track = { _testClass: Genoverse.Track.Graph.Bar, height: 100, margin: 0, resizable: false, rescaleableY: false };
  const data  = [
    [ 10, 60, 20, 100, 40, 50, 0, 90, 70, 30 ],
    [ 40, 30, 20, 50, 90, 10, 10, 80, 60, 70 ],
  ];

  const makeFeatures = $data => $data.map(
    (d, i) => ({ start: i + 1, end: i + 1, height: d })
  );

  const getTrackConf = test => ({ ...track, ...test.conf });

  const features = data.map(d => makeFeatures(d));

  [{
    why  : 'scale > 1',
    conf : { width: 100, start: 1, end: 10 },
  }, {
    why  : 'scale = 1',
    conf : { width: 100, start: 1, end: 100 },
  }, {
    why  : 'scale < 1, all bins of equal size',
    conf : { width: 100, start: 1, end: 200 },
  }, {
    why  : 'scale < 1, final bin size = 1',
    conf : { width: 100, start: 1, end: 300 },
  }, {
    why  : 'scale < 1, final bin is small',
    conf : { width: 100, start: 1, end: 400 },
  }].forEach((testSet) => {
    describe(testSet.why, () => {
      [
        { why: 'no margin',                           conf: { margin: 0                                     } },
        { why: 'margin',                              conf: { margin: 10                                    } },
        { why: 'margin top and bottom, inverted',     conf: { margin: { top: 5, bottom: 20 }, invert: true  } },
        { why: 'margin top and bottom, not inverted', conf: { margin: { top: 5, bottom: 20 }, invert: false } },
        { why: 'colored',                             conf: { margin: 0, color: 'red'                       } },
      ].forEach((test) => {
        it(test.why, () => testTrackRenderStatic(features[0], getTrackConf(test), testSet.conf));
      });

      describe('the graph has two datasets', () => {
        [
          { why: 'coloured red and blue',    conf: { margin: 0, datasets: [{ name: 1, color: 'red'             }, { name: 2, color: 'blue'                               }] } },
          { why: 'one with globalAlpha set', conf: { margin: 0, datasets: [{ name: 1, color: 'red', fill: true }, { name: 2, color: 'blue', fill: true, globalAlpha: 0.5 }] } },
        ].forEach((test) => {
          it(test.why, () => testTrackRenderStatic(
            [
              ...features[0].map(f => ({ ...f, dataset: 1 })),
              ...features[1].map(f => ({ ...f, dataset: 2 })),
            ],
            getTrackConf(test),
            testSet.conf
          ));
        });
      });
    });
  });

  describe('yRange is set', () => {
    const genoverseConf = { width: 100, start: 1, end: 100 };
    const $data         = [ 1, -8, 5, -5, 0, 7, -2 ];
    const $features     = makeFeatures($data);

    [
      { why: 'with no margin', conf: { margin: 0 } },
      { why: 'with margin',    conf: { margin: 1 } },
    ].forEach((testSet) => {
      describe(testSet.why, () => {
        [
          { why: 'yRange = [ -5, 5 ]',    conf: { yRange: [  -5, 5   ], height: 10, ...testSet.conf } },
          { why: 'yRange = [ -1, 5 ]',    conf: { yRange: [  -1, 5   ], height: 12, ...testSet.conf } },
          { why: 'yRange = [ 0, 1 ]',     conf: { yRange: [   0, 1   ], height: 10, ...testSet.conf } },
          { why: 'yRange = [ -1, 0 ]',    conf: { yRange: [  -1, 0   ], height: 10, ...testSet.conf } },
          { why: 'yRange = [ 0.5, 7.5 ]', conf: { yRange: [ 0.5, 7.5 ], height: 70, ...testSet.conf } },
        ].forEach(
          test => it(test.why, () => testTrackRenderStatic($features, getTrackConf(test), genoverseConf))
        );
      });
    });
  });
});
