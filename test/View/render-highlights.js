'use strict';

describe('Correctly render highlights:', function () {
  afterEach(afterTest);

  var track           = { _testClass: Genoverse.Track.HighlightRegion };
  var defaultColors   = Genoverse.Track.HighlightRegion.prototype.colors;
  var genoverseConfig = { end: 1000, width: 1000 };

  function getInstructions(draw) {
    return {
      forward: { features: [ [ 0, 0, 1000, 15, '#FFFFFF' ] ].concat(draw.features), labels: draw.labels, background: draw.background },
      reverse: { features: draw.features.map(function (f) { f = [].concat(f); f[1] = 0; return f; }) } // Remove feature offset, no white background
    };
  }

  it('with a defined color', function () {
    var draw = {
      features : [ [ 99, 13, 101, 2, 'red' ] ],
      labels   : [ [ 'fillText', 'test', 99, 13, 'red' ] ]
    };

    return testTrackRenderStatic([{ start: 100, end: 200, label: 'test', color: 'red' }], track, getInstructions(draw), genoverseConfig);
  });

  it('with a mixture of defined colors and no colors', function () {
    var colors   = defaultColors.concat(defaultColors[0]);
    var features = [];
    var draw     = {
      features : [],
      labels   : []
    };

    colors.splice(3, 0, 'yellow');
    colors.splice(6, 0, 'pink');

    colors.forEach(function (c, i) {
      i++;

      features.push({ start: 50 * i, end: 25 + (50 * i), label: i.toString(), color: defaultColors.includes(c) ? undefined : c });

      draw.features.push([ 50 * i - 1, 13, 26, 2, c ]);
      draw.labels.push([ 'fillText', i.toString(), 50 * i - 1, 13, c ]);
    });

    return testTrackRenderStatic(features, track, getInstructions(draw), genoverseConfig);
  });

  describe('where two highlights overlap', function () {
    it('both labels are displayed', function () {
      var draw = {
        features : [ [ 99, 13, 401, 2, 'red' ], [ 399, 13, 2, 2, 'blue' ] ],
        labels   : [ [ 'fillText', 'test1', 99, 13, 'red' ], [ 'fillText', 'test2', 399, 13, 'blue' ] ]
      };

      return testTrackRenderStatic([{ start: 100, end: 500, label: 'test1', color: 'red' }, { start: 400, end: 401, label: 'test2', color: 'blue' }], track, getInstructions(draw), genoverseConfig);
    });

    it('second label is hidden', function () {
      var draw = {
        features : [ [ 99, 13, 101, 2, 'red' ], [ 109, 13, 11, 2, 'blue' ] ],
        labels   : [ [ 'fillText', 'test1', 99, 13, 'red' ] ]
      };

      return testTrackRenderStatic([{ start: 100, end: 200, label: 'test1', color: 'red' }, { start: 110, end: 120, label: 'test2', color: 'blue' }], track, getInstructions(draw), genoverseConfig);
    });
  });

  describe('backgrounds', function () {
    function drawBorder(context, x1, x2, color) {
      context.strokeStyle = color;
      context.lineWidth   = 2;

      context.beginPath();

      if (x1) {
        context.moveTo(x1, 0);
        context.lineTo(x1, 1);
      }

      if (x2) {
        context.moveTo(x2, 0);
        context.lineTo(x2, 1);
      }

      context.stroke();

      context.lineWidth = 1;
    }

    it('overlapping highlights, completely inside region', function () {
      var draw = {
        features   : [ [ 99, 13, 101, 2, 'red' ], [ 109, 13, 11, 2, 'blue' ] ],
        background : [
          [ 99,  0, 101, 1, '#FFCCCC' ], function (context) { drawBorder(context, 99.5,  200.5, 'red');  },
          [ 109, 0, 11,  1, '#CCCCFF' ], function (context) { drawBorder(context, 109.5, 120.5, 'blue'); }
        ]
      };

      return testTrackRenderStatic([{ start: 100, end: 200, color: 'red' }, { start: 110, end: 120, color: 'blue' }], track, getInstructions(draw), genoverseConfig);
    });

    it('only left highlight edge inside region', function () {
      var draw = {
        features   : [ [ 0, 13, 500, 2, 'red' ] ],
        background : [
          [ 0, 0, 500, 1, '#FFCCCC' ], function (context) { drawBorder(context, false, 500.5, 'red'); },
        ]
      };

      return testTrackRenderStatic([{ start: 100, end: 1500, color: 'red' }], track, getInstructions(draw), { start: 1000, end: 2000, chromsomeSize: 2000 });
    });

    it('only right highlight edge inside region', function () {
      var draw = {
        features   : [ [ 99, 13, 901, 2, 'red' ] ],
        background : [
          [ 99, 0, 901, 1, '#FFCCCC' ], function (context) { drawBorder(context, 99.5, false, 'red'); },
        ]
      };

      return testTrackRenderStatic([{ start: 100, end: 2000, color: 'red' }], track, getInstructions(draw), genoverseConfig);
    });

    it('neither highlight edge inside region', function () {
      var draw = {
        features   : [ [ 0, 13, 1000, 2, 'red'     ] ],
        background : [ [ 0, 0,  1000, 1, '#FFCCCC' ] ]
      };

      return testTrackRenderStatic([{ start: 100, end: 3000, color: 'red' }], track, getInstructions(draw), { start: 1000, end: 2000, chromsomeSize: 2000 });
    });
  });
});
