'use strict';

function getDrawingInstructions(draw, region, type, strand) {
  var instructions = {};

  if ($.isArray(draw)) {
    instructions[region] = { features: $.extend(true, [], draw) };
  } else if ($.isPlainObject(draw)) {
    draw = $.extend(true, {}, draw);

    if (strand) {
      return getDrawingInstructions(draw[strand === 1 ? 'forward' : 'reverse'] || draw, region, type);
    }

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
    instructions = instructions.features || $.map(instructions, function (v) { return v; });
  }

  return instructions;
}

function getTrackConfig(features, draw) {
  return {
    data: features,

    beforeRender: function (f, image) {
      var params = image.data();

      params._testDeferred = {
        features   : $.Deferred(),
        labels     : this.prop('labels') === 'separate' ? $.Deferred() : undefined,
        background : !!params.background                ? $.Deferred() : undefined,
        legend     : this.prop('legendTrack')           ? $.Deferred() : undefined
      };

      this.browser._testDeferreds = this.browser._testDeferreds.concat($.map(params._testDeferred, function (d) { return d; }));
    },

    afterRender: function (f, image) {
      var track    = this;
      var separate = this.prop('labels') === 'separate';
      var strand   = this instanceof Genoverse.Track.Controller.Stranded ? this.prop('strand') : undefined;

      var tests = [{ img: image, type: 'features', instructionType: separate || image.data('background') ? 'features' : '' }];

      if (separate) {
        tests.push({ img: image.next(), type: 'labels' });
      }

      if (this.prop('legendTrack')) {
        tests.push({ img: this.prop('legendTrack').prop('image'), type: 'legend' });
      }

      tests.forEach(function (test) {
        if (test.img.length) {
          testCanvas(
            track,
            draw,
            test.img,
            test.img.data(test.type === 'labels' ? 'labelHeight' : 'featureHeight'),
            typeof test.instructionType !== 'undefined' ? test.instructionType : test.type,
            strand
          );
        }

        image.data('_testDeferred')[test.type].resolve();
      });
    },

    afterRenderBackground: function (f, image, height) {
      testCanvas(
        this,
        draw,
        image,
        height || 1,
        'background',
        this instanceof Genoverse.Track.Controller.Stranded ? this.prop('strand') : undefined
      );

      image.next().data('_testDeferred').background.resolve();
    }
  };
};

global.testCanvas = function (track, draw, image, height, instructionType, strand) {
  var region       = image.data('start') + '-' + image.data('end');
  var instructions = getDrawingInstructions(draw, region, instructionType, strand);

  if (/^(background|legend)$/.test(instructionType) && !instructions.length) {
    return;
  }

  var canvas  = document.createElement('canvas');
  var context = canvas.getContext('2d');

  canvas.width  = image.data('width');
  canvas.height = height;

  if (track.prop('labels') === 'overlay') {
    context.textAlign    = 'center';
    context.textBaseline = 'middle';
  } else {
    context.textAlign    = 'left';
    context.textBaseline = 'top';
  }

  context.font      = track.prop('font');
  context.lineWidth = 1;

  instructions.forEach(function (instruction) {
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

  expect(image[0].src).toEqual(canvas.toDataURL(), [ 'Drawing is incorrect for', region, instructionType, (strand ? strand === 1 ? 'forward strand' : 'reverse strand' : '') ].filter(function (a) { return a; }).join(' '));
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
    tracks         : [ (trackConfig._testClass || Genoverse.Track).extend(trackConfig) ],
  }, genoverseConfig || {}));

  var d = $.Deferred();

  setTimeout(function () { $.when.apply($, genoverse._testDeferreds).done(d.resolve); }, 1);

  return d;
};

global.testTrackRenderStatic = function (features, track, draw, genoverseConfig) {
  return testTrackRender(features, track, draw, $.extend(genoverseConfig || {}, { isStatic: true }));
};

global.afterTest = function () {
  $('body').empty();
};