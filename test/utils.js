require('../index'); // Genoverse library

Genoverse.ready.resolve();

const getDrawingInstructions = (draw, region, type, strand) => {
  let instructions = {};

  if (Array.isArray(draw)) {
    instructions[region] = { features: $.extend(true, [], draw) };
  } else if ($.isPlainObject(draw)) {
    draw = $.extend(true, {}, draw);

    if (strand) {
      return getDrawingInstructions(draw[strand === 1 ? 'forward' : 'reverse'] || draw, region, type);
    }

    if (typeof draw[region] !== 'undefined') {
      if (Array.isArray(draw[region])) {
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
    instructions = instructions.features || Object.values(instructions);
  }

  return instructions;
};

const testCanvas = (track, draw, image, height, instructionType, strand) => {
  const region       = `${image.data('start')}-${image.data('end')}`;
  const instructions = getDrawingInstructions(draw, region, instructionType, strand);

  if (/^(background|legend)$/.test(instructionType) && !instructions.length) {
    return;
  }

  const canvas  = document.createElement('canvas');
  const context = canvas.getContext('2d');

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

  instructions.forEach((instruction) => {
    if (typeof instruction === 'function') {
      instruction(context);

      return;
    }

    const func  = typeof instruction[0] === 'string' ? instruction.shift() : 'fillRect';
    const fill  = /fill/.test(func);
    const style = fill ? 'fillStyle' : 'strokeStyle';
    const color = (
      typeof instruction[instruction.length - 1] === 'string'
        ? instruction.pop()
        : (fill ? '' : track.prop('borderColor')) || track.prop('color') || 'black'
    );

    context[style] = color;
    context[func](...instruction);
  });

  expect(image[0].src).toBe(canvas.toDataURL());
};

const getTrackConfig = (features, draw) => ({
  data: features,

  beforeRender: function (f, image) {
    const params = image.data();

    params._testDeferred = {
      features   : $.Deferred(),
      labels     : this.prop('labels') === 'separate' ? $.Deferred() : undefined,
      background : params.background                  ? $.Deferred() : undefined,
      legend     : this.prop('legendTrack')           ? $.Deferred() : undefined,
    };

    this.browser._testDeferreds = [ this.browser._testDeferreds, ...Object.values(params._testDeferred) ];
  },

  afterRender: function (f, image) {
    const track    = this;
    const separate = this.prop('labels') === 'separate';
    const strand   = this instanceof Genoverse.Track.Controller.Stranded ? this.prop('strand') : undefined;

    const tests = [{ img: image, type: 'features', instructionType: separate || image.data('background') ? 'features' : '' }];

    if (separate) {
      tests.push({ img: image.next(), type: 'labels' });
    }

    if (this.prop('legendTrack')) {
      tests.push({ img: this.prop('legendTrack').prop('image'), type: 'legend' });
    }

    tests.forEach((test) => {
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
  },
});

const testTrackRender = (features, track, draw, genoverseConfig) =>  {
  const trackConfig = { ...track, ...getTrackConfig(features, draw) };
  const genoverse   = new Genoverse({
    chr            : 1,
    start          : 1,
    end            : 20,
    width          : 100,
    chromosomeSize : 1000,
    _testDeferreds : [],
    tracks         : [ (trackConfig._testClass || Genoverse.Track).extend(trackConfig) ],
    ...genoverseConfig,
  });

  const d = $.Deferred();

  setTimeout(() => { $.when(...genoverse._testDeferreds).done(d.resolve); }, 1);

  return d;
};

const testTrackRenderStatic = (features, track, draw, genoverseConfig) => testTrackRender(features, track, draw, { ...genoverseConfig, isStatic: true });

const afterTest = () => {
  $('body').empty();
};

module.exports = {
  Genoverse,
  testCanvas,
  testTrackRender,
  testTrackRenderStatic,
  afterTest,
};
