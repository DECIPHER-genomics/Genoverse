'use strict';

describe('Correctly render transcripts where:', function () {
  afterEach(afterTest);

  function doTests(subFeatureJoinStyle, feature, draw, genoverseConfig) {
    var track = {
      margin        : 0,
      featureMargin : {},
      view          : Genoverse.Track.View.Transcript.extend({ subFeatureJoinStyle: subFeatureJoinStyle })
    };

    describe('track.subFeatureJoinStyle = "' + subFeatureJoinStyle + '"', function () {
      [
        { why: 'forward strand', strand:  1 },
        { why: 'reverse strand', strand: -1 }
      ].forEach(function (test) {
        var instructions = draw(test.strand);
        var func         = $.isArray(instructions) ? testTrackRenderStatic : testTrackRender;

        it(test.why, function () { return func([ $.extend({ strand: test.strand }, feature) ], track, instructions, $.extend({ start: 1, end: 1000, chromosomeSize: 1e9, width: 1000 }, genoverseConfig)); });
      });
    });
  }

  describe('there is one transcript on a single image', function () {
    describe('exons without cds', function () {
      var feature = {
        start       : 1,
        end         : 1000,
        subFeatures : [
          { start: 1,   end: 100,  height: 7, color: false, borderColor: 'black' },
          { start: 200, end: 300,  height: 7, color: false, borderColor: 'black' },
          { start: 500, end: 700,  height: 7, color: false, borderColor: 'black' },
          { start: 750, end: 760,  height: 7, color: false, borderColor: 'black' },
          { start: 950, end: 1000, height: 7, color: false, borderColor: 'black' }
        ]
      };

      doTests('curve', feature, function (strand) {
        var y = strand === 1 ? 1.5 : 8.5;

        return [
          [ 'strokeRect', 0,   1.5, 100, 7 ],
          [ 'strokeRect', 199, 1.5, 101, 7 ],
          [ 'strokeRect', 499, 1.5, 201, 7 ],
          [ 'strokeRect', 749, 1.5, 11,  7 ],
          [ 'strokeRect', 949, 1.5, 51,  7 ],
          function (context) { context.lineWidth = 0.5; },
          [ 'beginPath' ], [ 'moveTo', 100, 5 ], [ 'quadraticCurveTo', 149.5, y, 199, 5 ], [ 'stroke' ],
          [ 'beginPath' ], [ 'moveTo', 300, 5 ], [ 'quadraticCurveTo', 399.5, y, 499, 5 ], [ 'stroke' ],
          [ 'beginPath' ], [ 'moveTo', 700, 5 ], [ 'quadraticCurveTo', 724.5, y, 749, 5 ], [ 'stroke' ],
          [ 'beginPath' ], [ 'moveTo', 760, 5 ], [ 'quadraticCurveTo', 854.5, y, 949, 5 ], [ 'stroke' ]
        ];
      });

      doTests('peak', feature, function (strand) {
        var y = strand === 1 ? 1.5 : 8.5;

        return [
          [ 'strokeRect', 0,   1.5, 100, 7 ],
          [ 'strokeRect', 199, 1.5, 101, 7 ],
          [ 'strokeRect', 499, 1.5, 201, 7 ],
          [ 'strokeRect', 749, 1.5, 11,  7 ],
          [ 'strokeRect', 949, 1.5, 51,  7 ],
          function (context) { context.lineWidth = 0.5; },
          [ 'beginPath' ], [ 'moveTo', 100, 5 ], [ 'lineTo', 149.5, y ], [ 'lineTo', 199, 5 ], [ 'stroke' ],
          [ 'beginPath' ], [ 'moveTo', 300, 5 ], [ 'lineTo', 399.5, y ], [ 'lineTo', 499, 5 ], [ 'stroke' ],
          [ 'beginPath' ], [ 'moveTo', 700, 5 ], [ 'lineTo', 724.5, y ], [ 'lineTo', 749, 5 ], [ 'stroke' ],
          [ 'beginPath' ], [ 'moveTo', 760, 5 ], [ 'lineTo', 854.5, y ], [ 'lineTo', 949, 5 ], [ 'stroke' ]
        ];
      });

      doTests('line', feature, function () {
        return [
          [ 'strokeRect', 0,   1.5, 100, 7 ],
          [ 'strokeRect', 199, 1.5, 101, 7 ],
          [ 'strokeRect', 499, 1.5, 201, 7 ],
          [ 'strokeRect', 749, 1.5, 11,  7 ],
          [ 'strokeRect', 949, 1.5, 51,  7 ],
          function (context) { context.lineWidth = 0.5; },
          [ 'beginPath' ], [ 'moveTo', 100, 5.5 ], [ 'lineTo', 199, 5.5 ], [ 'stroke' ],
          [ 'beginPath' ], [ 'moveTo', 300, 5.5 ], [ 'lineTo', 499, 5.5 ], [ 'stroke' ],
          [ 'beginPath' ], [ 'moveTo', 700, 5.5 ], [ 'lineTo', 749, 5.5 ], [ 'stroke' ],
          [ 'beginPath' ], [ 'moveTo', 760, 5.5 ], [ 'lineTo', 949, 5.5 ], [ 'stroke' ]
        ];
      });
    });

    describe('exons with cds', function () {
      var feature = {
        start       : 1,
        end         : 1000,
        subFeatures : [
          { start: 1,   end: 100,  height: 7, color: false, borderColor: 'black' },
          { start: 200, end: 250,  height: 7, color: false, borderColor: 'black' },
          { start: 250, end: 300,  height: 10                                    },
          { start: 500, end: 700,  height: 10                                    },
          { start: 750, end: 755,  height: 10                                    },
          { start: 755, end: 760,  height: 7, color: false, borderColor: 'black' },
          { start: 950, end: 1000, height: 7, color: false, borderColor: 'black' }
        ]
      };

      doTests('curve', feature, function (strand) {
        var y = strand === 1 ? 0 : 10;

        return [
          [ 'strokeRect', 0,   1.5, 100, 7  ],
          [ 'strokeRect', 199, 1.5, 51,  7  ],
          [ 'strokeRect', 754, 1.5, 6,   7  ],
          [ 'strokeRect', 949, 1.5, 51,  7  ],
          [ 'fillRect',   249, 0,   51,  10 ],
          [ 'fillRect',   499, 0,   201, 10 ],
          [ 'fillRect',   749, 0,   6,   10 ],
          function (context) { context.lineWidth = 0.5; },
          [ 'beginPath' ], [ 'moveTo', 100, 5 ], [ 'quadraticCurveTo', 149.5, y, 199, 5 ], [ 'stroke' ],
          [ 'beginPath' ], [ 'moveTo', 300, 5 ], [ 'quadraticCurveTo', 399.5, y, 499, 5 ], [ 'stroke' ],
          [ 'beginPath' ], [ 'moveTo', 700, 5 ], [ 'quadraticCurveTo', 724.5, y, 749, 5 ], [ 'stroke' ],
          [ 'beginPath' ], [ 'moveTo', 760, 5 ], [ 'quadraticCurveTo', 854.5, y, 949, 5 ], [ 'stroke' ]
        ];
      });

      doTests('peak', feature, function (strand) {
        var y = strand === 1 ? 0 : 10;

        return [
          [ 'strokeRect', 0,   1.5, 100, 7  ],
          [ 'strokeRect', 199, 1.5, 51,  7  ],
          [ 'strokeRect', 754, 1.5, 6,   7  ],
          [ 'strokeRect', 949, 1.5, 51,  7  ],
          [ 'fillRect',   249, 0,   51,  10 ],
          [ 'fillRect',   499, 0,   201, 10 ],
          [ 'fillRect',   749, 0,   6,   10 ],,
          function (context) { context.lineWidth = 0.5; },
          [ 'beginPath' ], [ 'moveTo', 100, 5 ], [ 'lineTo', 149.5, y ], [ 'lineTo', 199, 5 ], [ 'stroke' ],
          [ 'beginPath' ], [ 'moveTo', 300, 5 ], [ 'lineTo', 399.5, y ], [ 'lineTo', 499, 5 ], [ 'stroke' ],
          [ 'beginPath' ], [ 'moveTo', 700, 5 ], [ 'lineTo', 724.5, y ], [ 'lineTo', 749, 5 ], [ 'stroke' ],
          [ 'beginPath' ], [ 'moveTo', 760, 5 ], [ 'lineTo', 854.5, y ], [ 'lineTo', 949, 5 ], [ 'stroke' ]
        ];
      });

      doTests('line', feature, function (strand) {
        return [
          [ 'strokeRect', 0,   1.5, 100, 7  ],
          [ 'strokeRect', 199, 1.5, 51,  7  ],
          [ 'strokeRect', 754, 1.5, 6,   7  ],
          [ 'strokeRect', 949, 1.5, 51,  7  ],
          [ 'fillRect',   249, 0,   51,  10 ],
          [ 'fillRect',   499, 0,   201, 10 ],
          [ 'fillRect',   749, 0,   6,   10 ],
          function (context) { context.lineWidth = 0.5; },
          [ 'beginPath' ], [ 'moveTo', 100, 5.5 ], [ 'lineTo', 199, 5.5 ], [ 'stroke' ],
          [ 'beginPath' ], [ 'moveTo', 300, 5.5 ], [ 'lineTo', 499, 5.5 ], [ 'stroke' ],
          [ 'beginPath' ], [ 'moveTo', 700, 5.5 ], [ 'lineTo', 749, 5.5 ], [ 'stroke' ],
          [ 'beginPath' ], [ 'moveTo', 760, 5.5 ], [ 'lineTo', 949, 5.5 ], [ 'stroke' ]
        ];
      });
    });
  });

  describe('a transcript spans two images, with intron peak on the first image', function () {
    describe('exons without cds', function () {
      // These numbers have been chosen to avoid false negatives due to floating point errors
      var feature = {
        start       : 1,
        end         : 1500,
        subFeatures : [{ start: 1, end: 100, height: 7, color: false, borderColor: 'black' }, { start: 1301, end: 1500, height: 7, color: false, borderColor: 'black' }]
      };

      doTests('curve', feature, function (strand) {
        var y = strand === 1 ? 1.5 : 8.5;

        return {
          '1-1000': [
            [ 'strokeRect', 0, 1.5, 100, 7 ],
            function (context) { context.lineWidth = 0.5; },
            [ 'beginPath' ], [ 'moveTo', 100, 5 ], [ 'quadraticCurveTo', 700, y, 1300, 5 ], [ 'stroke' ]
          ],
          '1001-2000': [
            [ 'strokeRect', 300, 1.5, 200, 7 ],
            function (context) { context.lineWidth = 0.5; },
            [ 'beginPath' ], [ 'moveTo', -900, 5 ], [ 'quadraticCurveTo', -300, y, 300, 5 ], [ 'stroke' ]
          ]
        };
      });

      doTests('peak', feature, function (strand) {
        var y1 = strand === 1 ? 1.5 : 8.5;
        var y2 = y1 + 1.75 * strand;

        return {
          '1-1000': [
            [ 'strokeRect', 0, 1.5, 100, 7 ],
            function (context) { context.lineWidth = 0.5; },
            [ 'beginPath' ], [ 'moveTo', 100, 5 ], [ 'lineTo', 700, y1 ], [ 'lineTo', 1000, y2 ], [ 'stroke' ]
          ],
          '1001-2000': [
            [ 'strokeRect', 300, 1.5, 200, 7 ],
            function (context) { context.lineWidth = 0.5; },
            [ 'beginPath' ], [ 'moveTo', 0, y2 ], [ 'lineTo', 300, 5 ], [ 'stroke' ]
          ]
        };
      });

      doTests('line', feature, function () {
        return {
          '1-1000': [
            [ 'strokeRect', 0, 1.5, 100, 7 ],
            function (context) { context.lineWidth = 0.5; },
            [ 'beginPath' ], [ 'moveTo', 100, 5.5 ], [ 'lineTo', 1000, 5.5 ], [ 'stroke' ]
          ],
          '1001-2000': [
            [ 'strokeRect', 300, 1.5, 200, 7 ],
            function (context) { context.lineWidth = 0.5; },
            [ 'beginPath' ], [ 'moveTo', 0, 5.5 ], [ 'lineTo', 300, 5.5 ], [ 'stroke' ]
          ]
        };
      });
    });

    describe('exons with cds', function () {
      // These numbers have been chosen to avoid false negatives due to floating point errors
      var feature = {
        start       : 1,
        end         : 1500,
        subFeatures : [
          { start: 1,    end: 101,  height: 7, color: false, borderColor: 'black' },
          { start: 101,  end: 300,  height: 10                                    },
          { start: 1301, end: 1400, height: 10                                    },
          { start: 1400, end: 1500, height: 7, color: false, borderColor: 'black' }
        ]
      };

      doTests('curve', feature, function (strand) {
        var y = strand === 1 ? 0 : 10;

        return {
          '1-1000': [
            [ 'strokeRect', 0,   1.5, 101, 7  ],
            [ 'fillRect',   100, 0,   200, 10 ],
            function (context) { context.lineWidth = 0.5; },
            [ 'beginPath' ], [ 'moveTo', 300, 5 ], [ 'quadraticCurveTo', 800, y, 1300, 5 ], [ 'stroke' ]
          ],
          '1001-2000': [
            [ 'fillRect',   300, 0,   100, 10 ],
            [ 'strokeRect', 399, 1.5, 101, 7  ],
            function (context) { context.lineWidth = 0.5; },
            [ 'beginPath' ], [ 'moveTo', -700, 5 ], [ 'quadraticCurveTo', -200, y, 300, 5 ], [ 'stroke' ]
          ]
        };
      });

      doTests('peak', feature, function (strand) {
        var y1 = strand === 1 ? 0 : 10;
        var y2 = y1 + 2 * strand;

        return {
          '1-1000': [
            [ 'strokeRect', 0,   1.5, 101, 7  ],
            [ 'fillRect',   100, 0,   200, 10 ],
            function (context) { context.lineWidth = 0.5; },
            [ 'beginPath' ], [ 'moveTo', 300, 5 ], [ 'lineTo', 800, y1 ], [ 'lineTo', 1000, y2 ], [ 'stroke' ]
          ],
          '1001-2000': [
            [ 'fillRect',   300, 0,   100, 10 ],
            [ 'strokeRect', 399, 1.5, 101, 7  ],
            function (context) { context.lineWidth = 0.5; },
            [ 'beginPath' ], [ 'moveTo', 0, y2 ], [ 'lineTo', 300, 5 ], [ 'stroke' ]
          ]
        };
      });

      doTests('line', feature, function (strand) {
        return {
          '1-1000': [
            [ 'strokeRect', 0,   1.5, 101, 7  ],
            [ 'fillRect',   100, 0,   200, 10 ],
            function (context) { context.lineWidth = 0.5; },
            [ 'beginPath' ], [ 'moveTo', 200, 5.5 ], [ 'lineTo', 1000, 5.5 ], [ 'stroke' ]
          ],
          '1001-2000': [
            [ 'fillRect',   300, 0,   100, 10 ],
            [ 'strokeRect', 399, 1.5, 101, 7  ],
            function (context) { context.lineWidth = 0.5; },
            [ 'beginPath' ], [ 'moveTo', 0, 5.5 ], [ 'lineTo', 300, 5.5 ], [ 'stroke' ]
          ]
        };
      });
   });
  });

  describe('a transcript spans two images, with intron peak on the second image', function () {
    describe('exons without cds', function () {
      // These numbers have been chosen to avoid false negatives due to floating point errors
      var feature = {
        start       : 1,
        end         : 2000,
        subFeatures : [{ start: 1, end: 900, height: 7, color: false, borderColor: 'black' }, { start: 1901, end: 2000, height: 7, color: false, borderColor: 'black' }]
      };

      doTests('curve', feature, function (strand) {
        var y = strand === 1 ? 1.5 : 8.5;

        return {
          '1-1000': [
            [ 'strokeRect', 0, 1.5, 900, 7 ],
            function (context) { context.lineWidth = 0.5; },
            [ 'beginPath' ], [ 'moveTo', 900, 5 ], [ 'quadraticCurveTo', 1400, y, 1900, 5 ], [ 'stroke' ]
          ],
          '1001-2000': [
            [ 'strokeRect', 900, 1.5, 100, 7 ],
            function (context) { context.lineWidth = 0.5; },
            [ 'beginPath' ], [ 'moveTo', -100, 5 ], [ 'quadraticCurveTo', 400, y, 900, 5 ], [ 'stroke' ]
          ]
        };
      });

      doTests('peak', feature, function (strand) {
        var y1 = strand === 1 ? 1.5 : 8.5;
        var y2 = 5 - (0.7 * strand);

        return {
          '1-1000': [
            [ 'strokeRect', 0, 1.5, 900, 7 ],
            function (context) { context.lineWidth = 0.5; },
            [ 'beginPath' ], [ 'moveTo', 900, 5 ], [ 'lineTo', 1000, y2 ], [ 'stroke' ]
          ],
          '1001-2000': [
            [ 'strokeRect', 900, 1.5, 100, 7 ],
            function (context) { context.lineWidth = 0.5; },
            [ 'beginPath' ], [ 'moveTo', 0, y2 ], [ 'lineTo', 400, y1 ], [ 'lineTo', 900, 5 ], [ 'stroke' ]
          ]
        };
      });

      doTests('line', feature, function () {
        return {
          '1-1000': [
            [ 'strokeRect', 0, 1.5, 900, 7 ],
            function (context) { context.lineWidth = 0.5; },
            [ 'beginPath' ], [ 'moveTo', 900, 5.5 ], [ 'lineTo', 1000, 5.5 ], [ 'stroke' ]
          ],
          '1001-2000': [
            [ 'strokeRect', 900, 1.5, 100, 7 ],
            function (context) { context.lineWidth = 0.5; },
            [ 'beginPath' ], [ 'moveTo', 0, 5.5 ], [ 'lineTo', 900, 5.5 ], [ 'stroke' ]
          ]
        };
      });
    });

    describe('exons with cds', function () {
      // These numbers have been chosen to avoid false negatives due to floating point errors
      var feature = {
        start       : 1,
        end         : 2000,
        subFeatures : [
          { start: 1,    end: 801,  height: 7, color: false, borderColor: 'black' },
          { start: 801,  end: 900,  height: 10                                    },
          { start: 1901, end: 1950, height: 10                                    },
          { start: 1950, end: 2000, height: 7, color: false, borderColor: 'black' }
        ]
      };

      doTests('curve', feature, function (strand) {
        var y = strand === 1 ? 0 : 10;

        return {
          '1-1000': [
            [ 'strokeRect', 0,   1.5, 801, 7  ],
            [ 'fillRect',   800, 0,   100, 10 ],
            function (context) { context.lineWidth = 0.5; },
            [ 'beginPath' ], [ 'moveTo', 900, 5 ], [ 'quadraticCurveTo', 1400, y, 1900, 5 ], [ 'stroke' ]
          ],
          '1001-2000': [
            [ 'fillRect',   900, 0,   50, 10 ],
            [ 'strokeRect', 949, 1.5, 51, 7  ],
            function (context) { context.lineWidth = 0.5; },
            [ 'beginPath' ], [ 'moveTo', -100, 5 ], [ 'quadraticCurveTo', 400, y, 900, 5 ], [ 'stroke' ]
          ]
        };
      });

      doTests('peak', feature, function (strand) {
        var y1 = strand === 1 ? 0 : 10;
        var y2 = 5 - strand;

        return {
          '1-1000': [
            [ 'strokeRect', 0,   1.5, 801, 7  ],
            [ 'fillRect',   800, 0,   100, 10 ],
            function (context) { context.lineWidth = 0.5; },
            [ 'beginPath' ], [ 'moveTo', 900, 5 ], [ 'lineTo', 1000, y2 ], [ 'stroke' ]
          ],
          '1001-2000': [
            [ 'fillRect',   900, 0,   50, 10 ],
            [ 'strokeRect', 949, 1.5, 51, 7  ],
            function (context) { context.lineWidth = 0.5; },
            [ 'beginPath' ], [ 'moveTo', 0, y2 ], [ 'lineTo', 400, y1 ], [ 'lineTo', 900, 5 ], [ 'stroke' ]
          ]
        };
      });

      doTests('line', feature, function () {
        return {
          '1-1000': [
            [ 'strokeRect', 0,   1.5, 801, 7  ],
            [ 'fillRect',   800, 0,   100, 10 ],
            function (context) { context.lineWidth = 0.5; },
            [ 'beginPath' ], [ 'moveTo', 900, 5.5 ], [ 'lineTo', 1000, 5.5 ], [ 'stroke' ]
          ],
          '1001-2000': [
            [ 'fillRect',   900, 0,   50, 10 ],
            [ 'strokeRect', 949, 1.5, 51, 7  ],
            function (context) { context.lineWidth = 0.5; },
            [ 'beginPath' ], [ 'moveTo', 0, 5.5 ], [ 'lineTo', 900, 5.5 ], [ 'stroke' ]
          ]
        };
      });
    });
  });

  describe('a transcript spans three images, with intron peak on the second image', function () {
    describe('exons without cds', function () {
      var genoverseConfig = { start: 1001, end: 2000 };

      // These numbers have been chosen to avoid false negatives due to floating point errors
      var feature = {
        start       : 1,
        end         : 3000,
        subFeatures : [{ start: 1, end: 500, height: 7, color: false, borderColor: 'black' }, { start: 2501, end: 3000, height: 7, color: false, borderColor: 'black' }]
      };

      doTests('curve', feature, function (strand) {
        var y = strand === 1 ? 1.5 : 8.5;

        return {
          '1-1000': [
            [ 'strokeRect', 0, 1.5, 500, 7 ],
            function (context) { context.lineWidth = 0.5; },
            [ 'beginPath' ], [ 'moveTo', 500, 5 ], [ 'quadraticCurveTo', 1500, y, 2500, 5 ], [ 'stroke' ]
          ],
          '1001-2000': [
            function (context) { context.lineWidth = 0.5; },
            [ 'beginPath' ], [ 'moveTo', -500, 5 ], [ 'quadraticCurveTo', 500, y, 1500, 5 ], [ 'stroke' ]
          ],
          '2001-3000': [
            [ 'strokeRect', 500, 1.5, 500, 7 ],
            function (context) { context.lineWidth = 0.5; },
            [ 'beginPath' ], [ 'moveTo', -1500, 5 ], [ 'quadraticCurveTo', -500, y, 500, 5 ], [ 'stroke' ]
          ]
        };
      }, genoverseConfig);

      doTests('peak', feature, function (strand) {
        var y1 = strand === 1 ? 1.5 : 8.5;
        var y2 = 5 - (1.75 * strand);

        return {
          '1-1000': [
            [ 'strokeRect', 0, 1.5, 500, 7 ],
            function (context) { context.lineWidth = 0.5; },
            [ 'beginPath' ], [ 'moveTo', 500, 5 ], [ 'lineTo', 1000, y2 ], [ 'stroke' ]
          ],
          '1001-2000': [
            function (context) { context.lineWidth = 0.5; },
            [ 'beginPath' ], [ 'moveTo', 0,  y2  ], [ 'lineTo', 500, y1  ], [ 'stroke' ],
            [ 'beginPath' ], [ 'moveTo', 500, y1 ], [ 'lineTo', 1000, y2 ], [ 'stroke' ]
          ],
          '2001-3000': [
            [ 'strokeRect', 500, 1.5, 500, 7 ],
            function (context) { context.lineWidth = 0.5; },
            [ 'beginPath' ], [ 'moveTo', 0, y2 ], [ 'lineTo', 500, 5 ], [ 'stroke' ]
          ]
        };
      }, genoverseConfig);

      doTests('line', feature, function () {
        return {
          '1-1000': [
            [ 'strokeRect', 0, 1.5, 500, 7 ],
            function (context) { context.lineWidth = 0.5; },
            [ 'beginPath' ], [ 'moveTo', 500, 5.5 ], [ 'lineTo', 1000, 5.5 ], [ 'stroke' ]
          ],
          '1001-2000': [
            function (context) { context.lineWidth = 0.5; },
            [ 'beginPath' ], [ 'moveTo', 0, 5.5 ], [ 'lineTo', 1000, 5.5 ], [ 'stroke' ]
          ],
          '2001-3000': [
            [ 'strokeRect', 500, 1.5, 500, 7 ],
            function (context) { context.lineWidth = 0.5; },
            [ 'beginPath' ], [ 'moveTo', 0, 5.5 ], [ 'lineTo', 500, 5.5 ], [ 'stroke' ]
          ]
        };
      }, genoverseConfig);
    });

    describe('exons with cds', function () {
      var genoverseConfig = { start: 1001, end: 2000 };

      // These numbers have been chosen to avoid false negatives due to floating point errors
      var feature = {
        start       : 1,
        end         : 3000,
        subFeatures : [
          { start: 1,    end: 401,  height: 7, color: false, borderColor: 'black' },
          { start: 401,  end: 500,  height: 10                                    },
          { start: 2501, end: 2600, height: 10                                    },
          { start: 2600, end: 3000, height: 7, color: false, borderColor: 'black' }
        ]
      };

      doTests('curve', feature, function (strand) {
        var y = strand === 1 ? 0 : 10;

        return {
          '1-1000': [
            [ 'strokeRect', 0,   1.5, 401, 7  ],
            [ 'fillRect',   400, 0,   100, 10 ],
            function (context) { context.lineWidth = 0.5; },
            [ 'beginPath' ], [ 'moveTo', 500, 5 ], [ 'quadraticCurveTo', 1500, y, 2500, 5 ], [ 'stroke' ]
          ],
          '1001-2000': [
            function (context) { context.lineWidth = 0.5; },
            [ 'beginPath' ], [ 'moveTo', -500, 5 ], [ 'quadraticCurveTo', 500, y, 1500, 5 ], [ 'stroke' ]
          ],
          '2001-3000': [
            [ 'fillRect',   500, 0,   100, 10 ],
            [ 'strokeRect', 599, 1.5, 401, 7  ],
            function (context) { context.lineWidth = 0.5; },
            [ 'beginPath' ], [ 'moveTo', -1500, 5 ], [ 'quadraticCurveTo', -500, y, 500, 5 ], [ 'stroke' ]
          ]
        };
      }, genoverseConfig);

      doTests('peak', feature, function (strand) {
        var y1 = strand === 1 ? 0 : 10;
        var y2 = 5 - (2.5 * strand);

        return {
          '1-1000': [
            [ 'strokeRect', 0,   1.5, 401, 7  ],
            [ 'fillRect',   400, 0,   100, 10 ],
            function (context) { context.lineWidth = 0.5; },
            [ 'beginPath' ], [ 'moveTo', 500, 5 ], [ 'lineTo', 1000, y2 ], [ 'stroke' ]
          ],
          '1001-2000': [
            function (context) { context.lineWidth = 0.5; },
            [ 'beginPath' ], [ 'moveTo', 0,  y2  ], [ 'lineTo', 500, y1  ], [ 'stroke' ],
            [ 'beginPath' ], [ 'moveTo', 500, y1 ], [ 'lineTo', 1000, y2 ], [ 'stroke' ]
          ],
          '2001-3000': [
            [ 'fillRect',   500, 0,   100, 10 ],
            [ 'strokeRect', 599, 1.5, 401, 7  ],
            function (context) { context.lineWidth = 0.5; },
            [ 'beginPath' ], [ 'moveTo', 0, y2 ], [ 'lineTo', 500, 5 ], [ 'stroke' ]
          ]
        };
      }, genoverseConfig);

      doTests('line', feature, function () {
        return {
          '1-1000': [
            [ 'strokeRect', 0,   1.5, 401, 7  ],
            [ 'fillRect',   400, 0,   100, 10 ],
            function (context) { context.lineWidth = 0.5; },
            [ 'beginPath' ], [ 'moveTo', 500, 5.5 ], [ 'lineTo', 1000, 5.5 ], [ 'stroke' ]
          ],
          '1001-2000': [
            function (context) { context.lineWidth = 0.5; },
            [ 'beginPath' ], [ 'moveTo', 0, 5.5 ], [ 'lineTo', 1000, 5.5 ], [ 'stroke' ]
          ],
          '2001-3000': [
            [ 'fillRect',   500, 0,   100, 10 ],
            [ 'strokeRect', 599, 1.5, 401, 7  ],
            function (context) { context.lineWidth = 0.5; },
            [ 'beginPath' ], [ 'moveTo', 0, 5.5 ], [ 'lineTo', 500, 5.5 ], [ 'stroke' ]
          ]
        };
      }, genoverseConfig);
    });
  });
});
