const Genoverse = require('../src/js/Genoverse').default;

Genoverse.configure({ css: false, fontawesome: false });

const getTrackConfig = features => ({
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
    const separate = this.prop('labels') === 'separate';
    const tests    = [{ img: image, type: 'features', instructionType: separate || image.data('background') ? 'features' : '' }];

    if (separate) {
      tests.push({ img: image.next(), type: 'labels' });
    }

    if (this.prop('legendTrack')) {
      tests.push({ img: this.prop('legendTrack').prop('image'), type: 'legend' });
    }

    tests.forEach((test) => {
      if (test.img.length) {
        expect(test.img[0].src).toMatchSnapshot();
      }

      image.data('_testDeferred')[test.type].resolve();
    });
  },

  afterRenderBackground: function (f, image) {
    expect(image.src).toMatchSnapshot();

    image.next().data('_testDeferred').background.resolve();
  },
});

const testTrackRender = (features, track, genoverseConfig) =>  {
  const trackConfig = { ...track, ...getTrackConfig(features) };
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

const testTrackRenderStatic = (features, track, genoverseConfig) => testTrackRender(features, track, { ...genoverseConfig, isStatic: true });

const afterTest = () => {
  $('body').empty();
};

module.exports = {
  Genoverse,
  testTrackRender,
  testTrackRenderStatic,
  afterTest,
};
