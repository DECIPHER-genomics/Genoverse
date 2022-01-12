const { Genoverse, afterTest, testTrackRenderStatic } = require('../utils');

describe('Correctly render bar graph where:', () => {
  afterEach(afterTest);

  const track = { _testClass: Genoverse.Track.Graph.Bar, height: 100, margin: 0, resizable: false, rescaleableY: false };
  const data  = [
    [ 10, 60, 20, 100, 40, 50, 0, 90, 70, 30 ],
    [ 40, 30, 20, 50, 90, 10, 10, 80, 60, 70 ],
  ];

  const makeFeatures = _data => _data.map(
    (d, i) => ({ start: i + 1, end: i + 1, height: d })
  );

  const addMargin = (_features, margin) => _features.map(
    f => [ f[0], f[1] + margin, f[2], f[3] ]
  );

  const getTrackConf = test => ({ ...track, ...test.conf });

  const draw = (test) => {
    let $draw = test.draw.filter(d => d);

    const conf = getTrackConf(test);

    if (!$draw.length) {
      return [ conf ];
    }

    const { margin } = conf;

    let marginTop    = margin.top    || margin;
    let marginBottom = margin.bottom || margin;

    if (conf.invert) {
      [ marginTop, marginBottom ] = [ marginBottom, marginTop ];
    }

    if (conf.color) {
      $draw = $draw.map(d => d.concat(conf.color));
    }

    const instructions = [
      (context) => { context.globalAlpha = conf.globalAlpha || 1; },
      ...$draw,
      [ 'clearRect', 0, 0,                       1e6, marginTop - 1 ],
      [ 'clearRect', 0, conf.height + marginTop, 1e6, marginBottom  ],
    ];

    return [ conf, instructions ];
  };

  const features = data.map(d => makeFeatures(d));

  [{
    why   : 'scale > 1',
    conf  : { width: 100, start: 1, end: 10 },
    draw  : data[0].map((d, i) => [ i * 10, 0, 10, d ]),
    draw2 : data[1].map((d, i) => [ i * 10, 0, 10, d ]),
  }, {
    why   : 'scale = 1',
    conf  : { width: 100, start: 1, end: 100 },
    draw  : data[0].map((d, i) => [ i, 0, 1, d ]),
    draw2 : data[1].map((d, i) => [ i, 0, 1, d ]),
  }, {
    why   : 'scale < 1, all bins of equal size',
    conf  : { width: 100, start: 1, end: 200 },
    draw  : [ 35, 60, 45, 45, 50 ].map((d, i) => [ i, 0, 1, d ]),
    draw2 : [ 35, 35, 50, 45, 65 ].map((d, i) => [ i, 0, 1, d ]),
  }, {
    why   : 'scale < 1, final bin size = 1',
    conf  : { width: 100, start: 1, end: 300 },
    draw  : [ 30, 190 / 3, 160 / 3, 30 ].map((d, i) => [ i, 0, 1, d ]),
    draw2 : [ 30,    50,    50, 70 ].map((d, i) => [ i, 0, 1, d ]),
  }, {
    why   : 'scale < 1, final bin is small',
    conf  : { width: 100, start: 1, end: 400 },
    draw  : [ 47.5,   45, 50 ].map((d, i) => [ i, 0, 1, d ]),
    draw2 : [   35, 47.5, 65 ].map((d, i) => [ i, 0, 1, d ]),
  }].forEach((testSet) => {
    describe(testSet.why, () => {
      [
        { why: 'no margin',                           conf: { margin: 0                                     } },
        { why: 'margin',                              conf: { margin: 10                                    } },
        { why: 'margin top and bottom, inverted',     conf: { margin: { top: 5, bottom: 20 }, invert: true  } },
        { why: 'margin top and bottom, not inverted', conf: { margin: { top: 5, bottom: 20 }, invert: false } },
        { why: 'colored',                             conf: { margin: 0, color: 'red'                       } },
      ].forEach((test) => {
        const m = test.conf.margin[test.conf.invert ? 'bottom' : 'top'] || test.conf.margin;

        test.draw = m ? addMargin(testSet.draw, m) : testSet.draw;

        it(test.why, () => testTrackRenderStatic(features[0], ...draw(test), testSet.conf));
      });

      describe('the graph has two datasets', () => {
        [
          { why: 'coloured red and blue',    conf: { margin: 0, datasets: [{ name: 1, color: 'red'             }, { name: 2, color: 'blue'                               }] } },
          { why: 'one with globalAlpha set', conf: { margin: 0, datasets: [{ name: 1, color: 'red', fill: true }, { name: 2, color: 'blue', fill: true, globalAlpha: 0.5 }] } },
        ].forEach((test) => {
          const conf = [
            { ...test.conf, ...test.conf.datasets[0] },
            { ...test.conf, ...test.conf.datasets[1] },
          ];

          it(test.why, () => {
            test.draw = [ testSet.draw, testSet.draw2 ].map(
              (d, i) => draw({ draw: d, conf: conf[i] })
            ).reduce(
              (arr, d) => arr.concat(d[1]),
              []
            );

            return testTrackRenderStatic(
              [
                ...features[0].map(f => ({ ...f, dataset: 1 })),
                ...features[1].map(f => ({ ...f, dataset: 2 })),
              ],
              getTrackConf(test),
              test.draw,
              testSet.conf
            );
          });
        });
      });
    });
  });

  describe('yRange is set', () => {
    const genoverseConf = { width: 100, start: 1, end: 100 };
    const _data         = [ 1, -8, 5, -5, 0, 7, -2 ];
    const _features     = makeFeatures(_data);

    [
      { why: 'with no margin', conf: { margin: 0 } },
      { why: 'with margin',    conf: { margin: 1 } },
    ].forEach((testSet) => {
      const m = testSet.conf.margin;

      describe(testSet.why, () => {
        [
          { why: 'yRange = [ -5, 5 ]',    conf: { yRange: [  -5, 5   ], height: 10, ...testSet.conf }, draw: _data.map((d, i) => [ i,  5 + m, 1,      d ]) },
          { why: 'yRange = [ -1, 5 ]',    conf: { yRange: [  -1, 5   ], height: 12, ...testSet.conf }, draw: _data.map((d, i) => [ i,  2 + m, 1,  2 * d ]) },
          { why: 'yRange = [ 0, 1 ]',     conf: { yRange: [   0, 1   ], height: 10, ...testSet.conf }, draw: _data.map((d, i) => [ i,  0 + m, 1, 10 * d ]) },
          { why: 'yRange = [ -1, 0 ]',    conf: { yRange: [  -1, 0   ], height: 10, ...testSet.conf }, draw: _data.map((d, i) => [ i, 10 + m, 1, 10 * d ]) },
          { why: 'yRange = [ 0.5, 7.5 ]', conf: { yRange: [ 0.5, 7.5 ], height: 70, ...testSet.conf }, draw: _data.map((d, i) => [ i, -5 + m, 1, 10 * d ]) },
        ].forEach(
          test => it(test.why, () => testTrackRenderStatic(_features, ...draw(test), genoverseConf))
        );
      });
    });
  });
});
