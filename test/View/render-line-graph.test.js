const { afterTest, testTrackRenderStatic } = require('../utils');

describe('Correctly render line graph where:', () => {
  afterEach(afterTest);

  const track = { _testClass: Genoverse.Track.Graph.Line, height: 100, margin: 0, resizable: false, rescaleableY: false };
  const data  = [
    [ 10, 60, 20, 100, 40, 50, 0, 90, 70, 30 ],
    [ 40, 30, 20, 50, 90, 10, 10, 80, 60, 70 ],
  ];

  const getTrackConf = test => ({ ...track, ...test.conf });

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
  }, {
    why  : 'scale < 1, final bin is made of 2 bins',
    conf : { width: 100, start: 1, end: 250 },
  }, {
    why  : 'scale < 1, middle bin is made of 2 bins',
    conf : { width: 100, start: 1, end: 297 },
  }].forEach((testSet) => {
    describe(testSet.why, () => {
      const features = [{ start: 1, end: 10, coords: data[0] }];
      const tests    = [
        { why: 'no margin',                           conf: { margin: 0                                     } },
        { why: 'margin',                              conf: { margin: 10                                    } },
        { why: 'margin top and bottom, inverted',     conf: { margin: { top: 5, bottom: 20 }, invert: true  } },
        { why: 'margin top and bottom, not inverted', conf: { margin: { top: 5, bottom: 20 }, invert: false } },
        { why: 'lineWidth',                           conf: { margin: 0, lineWidth: 2                       } },
        { why: 'colored',                             conf: { margin: 0, color: 'red'                       } },
      ];

      describe('the graph has no fill', () => {
        tests.forEach(test => it(test.why, () => testTrackRenderStatic(features, getTrackConf(test), testSet.conf)));
      });

      describe('the graph has fill', () => {
        tests.map(t => ({ why: t.why, conf: { fill: true, ...t.conf } })).concat(
          { why: 'globalAlpha', conf: { fill: true, margin: 0, globalAlpha: 0.5 } }
        ).forEach((test) => {
          it(test.why, () => testTrackRenderStatic(features, getTrackConf(test), testSet.conf));
        });
      });

      describe('the graph has two datasets', () => {
        [
          { why: 'coloured red and blue',    conf: { margin: 0, datasets: [{ name: 1, color: 'red'               }, { name: 2, color: 'blue'                               }] } },
          { why: 'one filled, one not',      conf: { margin: 0, datasets: [{ name: 1, color: 'red', fill: true   }, { name: 2, color: 'blue'                               }] } },
          { why: 'one with lineWidth set',   conf: { margin: 0, datasets: [{ name: 1, color: 'red', lineWidth: 2 }, { name: 2, color: 'blue', fill: true                   }] } },
          { why: 'one with globalAlpha set', conf: { margin: 0, datasets: [{ name: 1, color: 'red', fill: true   }, { name: 2, color: 'blue', fill: true, globalAlpha: 0.5 }] } },
        ].forEach((test) => {
          it(test.why, () => testTrackRenderStatic([
            { start: 1, end: 10, coords: data[0], dataset: 1 },
            { start: 1, end: 10, coords: data[1], dataset: 2 },
          ], getTrackConf(test), testSet.conf));
        });
      });
    });
  });

  describe('data is not continuous', () => {
    const genoverseConf = { width: 100, start: 101, end: 200 };

    [
      { why: 'the graph has no fill', conf: { margin: 0, fill: false } },
      { why: 'the graph has fill',    conf: { margin: 0, fill: true  } },
    ].forEach((test) => {
      describe(test.why, () => {
        const coords = data[0].slice(0, 5);

        it('each data block is inside the image', () => testTrackRenderStatic([
          { start: 110, end: 114, coords: coords.map((d, i) => [ i + 110, d ]) },
          { start: 130, end: 134, coords: coords.map((d, i) => [ i + 130, d ]) },
          { start: 150, end: 154, coords: coords.map((d, i) => [ i + 150, d ]) },
        ], getTrackConf(test), genoverseConf));

        it('data blocks extend beyond the image', () => testTrackRenderStatic([
          { start: 98, end: 102, coords: coords.map((d, i) => [ i +  98, d ]) },
          { start: 150, end: 154, coords: coords.map((d, i) => [ i + 150, d ]) },
          { start: 198, end: 202, coords: coords.map((d, i) => [ i + 198, d ]) },
        ], getTrackConf(test), genoverseConf));
      });
    });
  });

  describe('data is spaced at > 1', () => {
    const features = [{ start: 1, end: 100, coords: data[0].slice(0, 9).map((d, i) => [ i + 1, d ]).filter((d, i) => i % 2) }];

    [
      { why: 'scale > 1', width: 200, coords: [[ 3, 60 ], [ 7, 100 ], [ 11, 50 ], [ 15, 90 ]] },
      { why: 'scale = 1', width: 100, coords: [[ 1, 60 ], [ 3, 100 ], [ 5,  50 ], [ 7,  90 ]] },
      { why: 'scale < 1', width: 25,  coords: [[ 1, 80 ], [ 2, 70 ]]                          },
    ].forEach((testSet) => {
      describe(testSet.why, () => {
        [
          { why: 'the graph has no fill', conf: { margin: 0, fill: false }, coords: testSet.coords },
          { why: 'the graph has fill',    conf: { margin: 0, fill: true  }, coords: [[ testSet.coords[0][0], 0 ]].concat(testSet.coords).concat([[ testSet.coords[testSet.coords.length - 1][0], 0 ]]) },
        ].forEach(test => it(test.why, () => testTrackRenderStatic(features, getTrackConf(test), { width: testSet.width, start: 1, end: 100 })));
      });
    });
  });

  describe('features are defined with', () => {
    const genoverseConf = { width: 100, start: 1, end: 100 };
    const trackConf     = { margin: 0, fill: true };

    [
      { why: 'x, y',            conf: trackConf, features: [ 10, 11, 12, 20, 21, 22 ].map(n => ({ y: n, x: n                 })) },
      { why: 'start == end, y', conf: trackConf, features: [ 10, 11, 12, 20, 21, 22 ].map(n => ({ y: n, start: n, end: n     })) },
      { why: 'start != end, y', conf: trackConf, features: [ 10, 20, 30             ].map(n => ({ y: n, start: n, end: n + 5 })) },
      { why: 'no y',            conf: trackConf, features: [ 10, 11, 12, 20, 21, 22 ].map(n => ({ start: n, end: n           })) },
    ].forEach(
      test => it(test.why, () => testTrackRenderStatic(test.features, getTrackConf(test), genoverseConf))
    );
  });

  describe('features have the wrong coords', () => {
    const genoverseConf = { width: 100, start: 1, end: 100 };
    const trackConf     = { margin: 0 };
    const makeFeatures  = coords => [{ start: 10, end: 12, coords: coords.map((n, i) => [ i + 10, n ]) }];

    [
      { why: 'too few coords',              conf: trackConf, features: makeFeatures([ 10, 20 ]),             coords: [[ 9, 10 ], [ 10, 20 ]]             },
      { why: 'too many coords',             conf: trackConf, features: makeFeatures([ 10, 20, 30, 20, 10 ]), coords: [[ 9, 10 ], [ 10, 20 ], [ 11, 30 ]] },
      { why: 'coords outside of start/end', conf: trackConf, features: [{ start: 10, end: 12, coords: [[ 1, 1 ], [ 2, 5 ], [ 3, 7 ], [ 20, 10 ], [ 21, 3 ]] }], coords: [] },
    ].forEach(
      test => it(test.why, () => testTrackRenderStatic(test.features, getTrackConf(test), genoverseConf))
    );
  });

  describe('yRange is set', () => {
    const coords        = [ 1, -8, 5, -5, 0, 7, -2 ];
    const genoverseConf = { width: 100, start: 1, end: 100 };
    const features      = [{ start: 1, end: 7, coords: coords }];

    [
      { why: 'with no margin', conf: { margin: 0 } },
      { why: 'with margin',    conf: { margin: 1 } },
    ].forEach((testSet) => {
      const m = testSet.conf.margin;

      describe(testSet.why, () => {
        [
          { why: 'yRange = [ -5, 5 ]',    conf: { yRange: [  -5, 5   ], height: 10, ...testSet.conf }, coords: [[ 0,  6 + m ], [ 1,  -3 + m ], [ 2, 10 + m ], [ 3,   0 + m ], [ 4,  5 + m ], [ 5, 12 + m ], [ 6,   3 + m ]] },
          { why: 'yRange = [ -1, 5 ]',    conf: { yRange: [  -1, 5   ], height: 12, ...testSet.conf }, coords: [[ 0,  4 + m ], [ 1, -14 + m ], [ 2, 12 + m ], [ 3,  -8 + m ], [ 4,  2 + m ], [ 5, 16 + m ], [ 6,  -2 + m ]] },
          { why: 'yRange = [ 0, 1 ]',     conf: { yRange: [   0, 1   ], height: 10, ...testSet.conf }, coords: [[ 0, 10 + m ], [ 1, -80 + m ], [ 2, 50 + m ], [ 3, -50 + m ], [ 4,  0 + m ], [ 5, 70 + m ], [ 6, -20 + m ]] },
          { why: 'yRange = [ -1, 0 ]',    conf: { yRange: [  -1, 0   ], height: 10, ...testSet.conf }, coords: [[ 0, 20 + m ], [ 1, -70 + m ], [ 2, 60 + m ], [ 3, -40 + m ], [ 4, 10 + m ], [ 5, 80 + m ], [ 6, -10 + m ]] },
          { why: 'yRange = [ 0.5, 7.5 ]', conf: { yRange: [ 0.5, 7.5 ], height: 70, ...testSet.conf }, coords: [[ 0,  5 + m ], [ 1, -85 + m ], [ 2, 45 + m ], [ 3, -55 + m ], [ 4, -5 + m ], [ 5, 65 + m ], [ 6, -25 + m ]] },
        ].forEach(
          test => it(test.why, () => testTrackRenderStatic(features, getTrackConf(test), genoverseConf))
        );
      });
    });
  });
});
