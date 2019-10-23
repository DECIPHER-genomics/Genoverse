'use strict';

describe('Correctly render line graph where:', function () {
  afterEach(afterTest);

  var track = { _testClass: Genoverse.Track.Graph.Line, height: 100, margin: 0, resizable: false, rescaleableY: false };
  var data  = [
    [ 10, 60, 20, 100, 40, 50, 0, 90, 70, 30 ],
    [ 40, 30, 20, 50, 90, 10, 10, 80, 60, 70 ]
  ];

  function draw(test) {
    var coords = test.coords.filter(c => c);
    var conf   = getTrackConf(test);

    if (!coords.length) {
      return [ conf ];
    }

    var { margin, fill } = conf;
    var marginTop        = margin.top    || margin;
    var marginBottom     = margin.bottom || margin;

    if (conf.invert) {
      [ marginTop, marginBottom ] = [ marginBottom, marginTop ];
    }

    var instructions = [
      function (context) {
        context.lineWidth   = conf.lineWidth   || 1;
        context.globalAlpha = conf.globalAlpha || 1;
      },
      [ 'beginPath' ],
      [ 'moveTo', ...coords[0] ]
    ].concat(
      coords.slice(1, fill ? -1 : undefined).map(c => [ 'lineTo', ...c ]),
      [[ 'stroke', conf.color ]]
    ).concat(
      fill ? [[ 'lineTo', ...coords[coords.length - 1] ], [ 'closePath' ], [ 'fill', conf.color ]] : []
    ).concat([
      [ 'clearRect', 0, 0,                       1e6, marginTop - 1 ],
      [ 'clearRect', 0, conf.height + marginTop, 1e6, marginBottom  ]
    ]);

    return [ conf, instructions ];
  }

  function drawMultiple(coords, conf) {
    return coords.reduce((arr, c) => arr.concat(draw({ coords: c, conf: conf })[1]), []);
  }

  function addFillCoords(coords) {
    return [[ coords[0][0], 0 ]].concat(coords, [[ coords[coords.length -1][0], 0 ]]);
  }

  function addMargin(coords, margin) {
    return coords.map(c => [ c[0], c[1] + margin ]);
  }

  function getTrackConf(test) {
    return $.extend({}, track, test.conf);
  }

  [{
    why     : 'scale > 1',
    conf    : { width: 100, start: 1, end: 10 },
    coords  : [[5, 10], [15, 60], [25, 20], [35, 100], [45, 40], [55, 50], [65,  0], [75, 90], [85, 70], [95, 30]],
    coords2 : [[5, 40], [15, 30], [25, 20], [35,  50], [45, 90], [55, 10], [65, 10], [75, 80], [85, 60], [95, 70]]
  }, {
    why     : 'scale = 1',
    conf    : { width: 100, start: 1, end: 100 },
    coords  : [[0, 10], [1, 60], [2, 20], [3, 100], [4, 40], [5, 50], [6,  0], [7, 90], [8, 70], [9, 30]],
    coords2 : [[0, 40], [1, 30], [2, 20], [3,  50], [4, 90], [5, 10], [6, 10], [7, 80], [8, 60], [9, 70]]
  }, {
    why     : 'scale < 1, all bins of equal size',
    conf    : { width: 100, start: 1, end: 200 },
    coords  : [[0, 35], [1, 60], [2, 45], [3, 45], [4, 50]],
    coords2 : [[0, 35], [1, 35], [2, 50], [3, 45], [4, 65]]
  }, {
    why     : 'scale < 1, final bin size = 1',
    conf    : { width: 100, start: 1, end: 300 },
    coords  : [[0, 30], [1, 190/3], [2, 160/3], [3, 30]],
    coords2 : [[0, 30], [1,    50], [2,    50], [3, 70]]
  }, {
    why     : 'scale < 1, final bin is small',
    conf    : { width: 100, start: 1, end: 400 },
    coords  : [[0, 47.5], [1,   45], [2, 50]],
    coords2 : [[0,   35], [1, 47.5], [2, 65]]
  }, {
    why     : 'scale < 1, final bin is made of 2 bins',
    conf    : { width: 100, start: 1, end: 250 },
    coords  : [[0, 35], [1, 60], [2, 45], [3, 47.5]],
    coords2 : [[0, 35], [1, 35], [2, 50], [3, 55]]
  }, {
    why     : 'scale < 1, middle bin is made of 2 bins',
    conf    : { width: 100, start: 1, end: 297 },
    coords  : [[0, 35], [1, 60], [2,   45], [3, 50]],
    coords2 : [[0, 35], [1, 35], [2, 47.5], [3, 65]]
  }].forEach(function (testSet) {
    describe(testSet.why, function () {
      var features = [{ start: 1, end: 10, coords: data[0] }];
      var tests    = [
        { why: 'no margin',                           conf: { margin: 0                                     } },
        { why: 'margin',                              conf: { margin: 10                                    } },
        { why: 'margin top and bottom, inverted',     conf: { margin: { top: 5, bottom: 20 }, invert: true  } },
        { why: 'margin top and bottom, not inverted', conf: { margin: { top: 5, bottom: 20 }, invert: false } },
        { why: 'lineWidth',                           conf: { margin: 0, lineWidth: 2                       } },
        { why: 'colored',                             conf: { margin: 0, color: 'red'                       } }
      ];

      describe('the graph has no fill', function () {
        tests.forEach(function (test) {
          var m = test.conf.margin[test.conf.invert ? 'bottom' : 'top'] || test.conf.margin;

          test.coords = m ? addMargin(testSet.coords, m) : testSet.coords;

          it(test.why, () => testTrackRenderStatic(features, ...draw(test), testSet.conf));
        });
      });

      describe('the graph has fill', function () {
        tests.map(t => ({ why: t.why, conf: $.extend({ fill: true }, t.conf) })).concat(
          { why: 'globalAlpha', conf: { fill: true, margin: 0, globalAlpha: 0.5 } }
        ).forEach(function (test) {
          var coords = addFillCoords(testSet.coords);
          var m      = test.conf.margin[test.conf.invert ? 'bottom' : 'top'] || test.conf.margin;

          test.coords = m ? addMargin(coords, m) : coords;

          it(test.why, () => testTrackRenderStatic(features, ...draw(test), testSet.conf));
        });
      });

      describe('the graph has two datasets', function () {
        [
          { why: 'coloured red and blue',    conf: { margin: 0, datasets: [{ name: 1, color: 'red'               }, { name: 2, color: 'blue'                               }] } },
          { why: 'one filled, one not',      conf: { margin: 0, datasets: [{ name: 1, color: 'red', fill: true   }, { name: 2, color: 'blue'                               }] } },
          { why: 'one with lineWidth set',   conf: { margin: 0, datasets: [{ name: 1, color: 'red', lineWidth: 2 }, { name: 2, color: 'blue', fill: true                   }] } },
          { why: 'one with globalAlpha set', conf: { margin: 0, datasets: [{ name: 1, color: 'red', fill: true   }, { name: 2, color: 'blue', fill: true, globalAlpha: 0.5 }] } }
        ].forEach(function (test) {
          var conf = [
            $.extend({}, test.conf, test.conf.datasets[0]),
            $.extend({}, test.conf, test.conf.datasets[1])
          ];

          it(test.why, function () {
            test.draw = [ testSet.coords, testSet.coords2 ].map((c, i) => draw({ coords: conf[i].fill ? addFillCoords(c) : c, conf: conf[i] })).reduce((arr, c) => arr.concat(c[1]), []);

            return testTrackRenderStatic([
              { start: 1, end: 10, coords: data[0], dataset: 1 },
              { start: 1, end: 10, coords: data[1], dataset: 2 }
            ], getTrackConf(test), test.draw, testSet.conf)
          });
        });
      });
    });
  });

  describe('data is not continuous', function () {
    var genoverseConf = { width: 100, start: 101, end: 200 };

    [
      { why: 'the graph has no fill', conf: { margin: 0, fill: false } },
      { why: 'the graph has fill',    conf: { margin: 0, fill: true  } },
    ].forEach(function (test) {
      describe(test.why, function () {
        var coords = data[0].slice(0, 5);
        var fill   = test.conf.fill;

        it('each data block is inside the image', () => testTrackRenderStatic([
          { start: 110, end: 114, coords: coords.map((d, i) => [ i + 110, d ]) },
          { start: 130, end: 134, coords: coords.map((d, i) => [ i + 130, d ]) },
          { start: 150, end: 154, coords: coords.map((d, i) => [ i + 150, d ]) }
        ], getTrackConf(test), drawMultiple([
          [ fill ? [ 9, 0] : null, [9,  10], [10, 60], [11, 20], [12, 100], [13, 40], fill ? [13, 0] : null ],
          [ fill ? [29, 0] : null, [29, 10], [30, 60], [31, 20], [32, 100], [33, 40], fill ? [33, 0] : null ],
          [ fill ? [49, 0] : null, [49, 10], [50, 60], [51, 20], [52, 100], [53, 40], fill ? [53, 0] : null ]
        ], test.conf), genoverseConf));

        it('data blocks extend beyond the image', () => testTrackRenderStatic([
          { start:  98, end: 102, coords: coords.map((d, i) => [ i +  98, d ]) },
          { start: 150, end: 154, coords: coords.map((d, i) => [ i + 150, d ]) },
          { start: 198, end: 202, coords: coords.map((d, i) => [ i + 198, d ]) }
        ], getTrackConf(test), drawMultiple([
          [ fill ? [-1, 0] : null, [-1, 20], [ 0, 100], [ 1, 40],                        fill ? [  1, 0] : null ],
          [ fill ? [49, 0] : null, [49, 10], [50,  60], [51, 20], [ 52, 100], [ 53, 40], fill ? [ 53, 0] : null ],
          [ fill ? [97, 0] : null, [97, 10], [98,  60], [99, 20], [100, 100], [101, 40], fill ? [101, 0] : null ]
        ], test.conf), genoverseConf));
      });
    });
  });

  describe('data is spaced at > 1', function () {
    var features = [{ start: 1, end: 100, coords: data[0].slice(0, 9).map((d, i) => [ i + 1, d ]).filter((d, i) => i % 2) }];

    [
      { why: 'scale > 1', width: 200, coords: [[3, 60], [7, 100], [11, 50], [15, 90]] },
      { why: 'scale = 1', width: 100, coords: [[1, 60], [3, 100], [5,  50], [7,  90]] },
      { why: 'scale < 1', width: 25,  coords: [[1, 80], [2, 70]]                      }
    ].forEach(function (testSet) {
      describe(testSet.why, function () {
        [
          { why: 'the graph has no fill', conf: { margin: 0, fill: false }, coords: testSet.coords },
          { why: 'the graph has fill',    conf: { margin: 0, fill: true  }, coords: [[ testSet.coords[0][0], 0 ]].concat(testSet.coords).concat([[ testSet.coords[testSet.coords.length - 1][0], 0 ]]) }
        ].forEach(test => it(test.why, () => testTrackRenderStatic(features, ...draw(test), { width: testSet.width, start: 1, end: 100 })));
      });
    });
  });

  describe('features are defined with', function () {
    var genoverseConf = { width: 100, start: 1, end: 100 };
    var trackConf     = { margin: 0, fill: true };
    var toDraw        = [
      [ [ [9,  0], [9,  10], [10, 11], [11, 12], [11, 0] ], [ [19, 0], [19, 20], [20, 21], [21, 22], [21, 0] ]                                 ],
      [ [ [12, 0], [12, 10], [12,  0]                    ], [ [22, 0], [22, 20], [22,  0]                    ], [ [32, 0], [32, 30], [32, 0] ] ]
    ];

    [
      { why: 'x, y',            conf: trackConf, features: [ 10, 11, 12, 20, 21, 22 ].map(n => ({ y: n, x: n                 })), draw: toDraw[0] },
      { why: 'start == end, y', conf: trackConf, features: [ 10, 11, 12, 20, 21, 22 ].map(n => ({ y: n, start: n, end: n     })), draw: toDraw[0] },
      { why: 'start != end, y', conf: trackConf, features: [ 10, 20, 30             ].map(n => ({ y: n, start: n, end: n + 5 })), draw: toDraw[1] },
      { why: 'no y',            conf: trackConf, features: [ 10, 11, 12, 20, 21, 22 ].map(n => ({ start: n, end: n           })), draw: [] }
    ].forEach(test => it(test.why, () => testTrackRenderStatic(test.features, getTrackConf(test), test.draw.length ? drawMultiple(test.draw, trackConf) : test.draw, genoverseConf)));
  });

  describe('features have the wrong coords', function () {
    var genoverseConf = { width: 100, start: 1, end: 100 };
    var trackConf     = { margin: 0 };

    function makeFeatures(coords) {
      return [{ start: 10, end: 12, coords: coords.map((n, i) => [ i + 10, n ]) }];
    }

    [
      { why: 'too few coords',              conf: trackConf, features: makeFeatures([ 10, 20 ]),                                                      coords: [[9, 10], [10, 20]]           },
      { why: 'too many coords',             conf: trackConf, features: makeFeatures([ 10, 20, 30, 20, 10 ]),                                          coords: [[9, 10], [10, 20], [11, 30]] },
      { why: 'coords outside of start/end', conf: trackConf, features: [{ start: 10, end: 12, coords: [[1, 1], [2, 5], [3, 7], [20, 10], [21, 3]] }], coords: []                            }
    ].forEach(test => it(test.why, () => testTrackRenderStatic(test.features, ...draw(test), genoverseConf)));
  });

  describe('yRange is set', function () {
    var coords        = [ 1, -8, 5, -5, 0, 7, -2 ];
    var genoverseConf = { width: 100, start: 1, end: 100 };
    var features      = [{ start: 1, end: 7, coords: coords }];

    [
      { why: 'with no margin', conf: { margin: 0 } },
      { why: 'with margin',    conf: { margin: 1 } }
    ].forEach(function (testSet) {
      var m = testSet.conf.margin;

      describe(testSet.why, function () {
        [
          { why: 'yRange = [ -5, 5 ]',    conf: $.extend({ yRange: [  -5, 5   ], height: 10 }, testSet.conf), coords: [[0,  6+m], [1,  -3+m], [2, 10+m], [3,   0+m], [4,  5+m], [5, 12+m], [6,   3+m]] },
          { why: 'yRange = [ -1, 5 ]',    conf: $.extend({ yRange: [  -1, 5   ], height: 12 }, testSet.conf), coords: [[0,  4+m], [1, -14+m], [2, 12+m], [3,  -8+m], [4,  2+m], [5, 16+m], [6,  -2+m]] },
          { why: 'yRange = [ 0, 1 ]',     conf: $.extend({ yRange: [   0, 1   ], height: 10 }, testSet.conf), coords: [[0, 10+m], [1, -80+m], [2, 50+m], [3, -50+m], [4,  0+m], [5, 70+m], [6, -20+m]] },
          { why: 'yRange = [ -1, 0 ]',    conf: $.extend({ yRange: [  -1, 0   ], height: 10 }, testSet.conf), coords: [[0, 20+m], [1, -70+m], [2, 60+m], [3, -40+m], [4, 10+m], [5, 80+m], [6, -10+m]] },
          { why: 'yRange = [ 0.5, 7.5 ]', conf: $.extend({ yRange: [ 0.5, 7.5 ], height: 70 }, testSet.conf), coords: [[0,  5+m], [1, -85+m], [2, 45+m], [3, -55+m], [4, -5+m], [5, 65+m], [6, -25+m]] }
        ].forEach(test => it(test.why, () => testTrackRenderStatic(features, ...draw(test), genoverseConf)));
      });
    });
  });
});
