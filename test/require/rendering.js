'use strict';

function getDrawingInstructions(draw, region, type) {
  var instructions = {};

  if ($.isArray(draw)) {
    instructions[region] = { features: draw };
  } else if ($.isPlainObject(draw)) {
    if (typeof draw[region] !== 'undefined') {
      if ($.isArray(draw[region])) {
        instructions[region] = { features: draw[region] };
      } else {
        instructions = draw;
      }
    } else if (typeof draw.features !== 'undefined' || typeof draw.labels !== 'undefined' || typeof draw.background !== 'undefined') {
      instructions[region] = draw;
    }
  }

  instructions = instructions[region] || {};

  if (type) {
    instructions = instructions[type] || [];
  } else {
    instructions = $.map(instructions, function (v) { return v; });
  }

  return instructions;
}

function getTrackConfig(features, draw) {
  return {
    data: features,

    beforeMakeImage: function (params) {
      params._testDeferred = Array(this.prop('labels') === 'separate' ? 2 : 1).fill($.Deferred());
      this.browser._testDeferreds = this.browser._testDeferreds.concat(params._testDeferred);
    },

    afterRender: function (f, image) {
      var track    = this;
      var separate = this.prop('labels') === 'separate' && image.next().length;

      (separate ? [ image, image.next() ] : [ image ]).forEach(function (img, i) {
        var canvas  = document.createElement('canvas');
        var context = canvas.getContext('2d');
        var region  = img.data('start') + '-' + img.data('end');

        canvas.width  = img.data('width');
        canvas.height = img.data(separate && i === 1 ? 'labelHeight' : 'featureHeight');

        if (track.prop('labels') === 'overlay') {
          context.textAlign    = 'center';
          context.textBaseline = 'middle';
        } else {
          context.textAlign    = 'left';
          context.textBaseline = 'top';
        }

        context.font      = track.prop('font');
        context.lineWidth = 1;

        getDrawingInstructions(draw, region, separate ? i ? 'labels' : 'features' : '').forEach(function (instruction) {
          if (typeof instruction === 'function') {
            return instruction(context);
          }

          var func   = typeof instruction[0] === 'string' ? instruction.shift() : 'fillRect';
          var fill   = /fill/.test(func);
          var style  = fill ? 'fillStyle' : 'strokeStyle';
          var color;

          if (typeof instruction[instruction.length - 1] === 'string') {
            color = instruction.pop();
          } else {
            color = (fill ? '' : track.prop('borderColor')) || track.prop('color') || 'black';
          }

          context[style] = color;
          context[func].apply(context, instruction);
        });

        expect(canvas.toDataURL()).toEqual(img[0].src, 'Drawing is incorrect for ' + region + (separate ? i === 1 ? ' labels' : ' features' : ''));

        img.data('_testDeferred').shift().resolve();
      });
    }
  };
};

global.testTrackRender = function (features, track, draw, genoverseConfig) {
  var trackConfig = $.extend(track || {}, getTrackConfig(features, draw));
  var genoverse   = new Genoverse($.extend({
    chr            : 1,
    start          : 1,
    end            : 20,
    width          : 100,
    chromosomeSize : 1000,
    _testDeferreds : [],
    tracks         : [ (trackConfig._testClass || Genoverse.Track).extend(trackConfig) ]
  }, genoverseConfig || {}));

  return $.when.apply($, genoverse._testDeferreds);
};

global.testTrackRenderStatic = function (features, track, draw, genoverseConfig) {
  return testTrackRender(features, track, draw, $.extend(genoverseConfig || {}, { isStatic: true }));
};
