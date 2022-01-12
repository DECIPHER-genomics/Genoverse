const { afterTest, testTrackRender, testTrackRenderStatic } = require('../utils');

describe('Correctly render transcripts where:', () => {
  afterEach(afterTest);

  const doTests = (subFeatureJoinStyle, feature, genoverseConfig, func = testTrackRender) => {
    const track = {
      margin        : 0,
      featureMargin : {},
      view          : Genoverse.Track.View.Transcript.extend({ subFeatureJoinStyle: subFeatureJoinStyle }),
    };

    describe(`track.subFeatureJoinStyle = "${subFeatureJoinStyle}"`, () => {
      [
        { why: 'forward strand', strand: 1  },
        { why: 'reverse strand', strand: -1 },
      ].forEach(
        test => it(test.why, () => func([{ strand: test.strand, ...feature }], track, { start: 1, end: 1000, chromosomeSize: 1e9, width: 1000, ...genoverseConfig }))
      );
    });
  };

  describe('there is one transcript on a single image', () => {
    describe('exons without cds', () => {
      const feature = {
        start       : 1,
        end         : 1000,
        subFeatures : [
          { start: 1,   end: 100,  height: 7, color: false, borderColor: 'black' },
          { start: 200, end: 300,  height: 7, color: false, borderColor: 'black' },
          { start: 500, end: 700,  height: 7, color: false, borderColor: 'black' },
          { start: 750, end: 760,  height: 7, color: false, borderColor: 'black' },
          { start: 950, end: 1000, height: 7, color: false, borderColor: 'black' },
        ],
      };

      doTests('curve', feature, undefined, testTrackRenderStatic);
      doTests('peak',  feature, undefined, testTrackRenderStatic);
      doTests('line',  feature, undefined, testTrackRenderStatic);
    });

    describe('exons with cds', () => {
      const feature = {
        start       : 1,
        end         : 1000,
        subFeatures : [
          { start: 1,   end: 100,  height: 7, color: false, borderColor: 'black' },
          { start: 200, end: 250,  height: 7, color: false, borderColor: 'black' },
          { start: 250, end: 300,  height: 10                                    },
          { start: 500, end: 700,  height: 10                                    },
          { start: 750, end: 755,  height: 10                                    },
          { start: 755, end: 760,  height: 7, color: false, borderColor: 'black' },
          { start: 950, end: 1000, height: 7, color: false, borderColor: 'black' },
        ],
      };

      doTests('curve', feature, undefined, testTrackRenderStatic);
      doTests('peak',  feature, undefined, testTrackRenderStatic);
      doTests('line',  feature, undefined, testTrackRenderStatic);
    });
  });

  describe('a transcript spans two images, with intron peak on the first image', () => {
    describe('exons without cds', () => {
      // These numbers have been chosen to avoid false negatives due to floating point errors
      const feature = {
        start       : 1,
        end         : 1500,
        subFeatures : [{ start: 1, end: 100, height: 7, color: false, borderColor: 'black' }, { start: 1301, end: 1500, height: 7, color: false, borderColor: 'black' }],
      };

      doTests('curve', feature);
      doTests('peak',  feature);
      doTests('line',  feature);
    });

    describe('exons with cds', () => {
      // These numbers have been chosen to avoid false negatives due to floating point errors
      const feature = {
        start       : 1,
        end         : 1500,
        subFeatures : [
          { start: 1,    end: 101,  height: 7, color: false, borderColor: 'black' },
          { start: 101,  end: 300,  height: 10                                    },
          { start: 1301, end: 1400, height: 10                                    },
          { start: 1400, end: 1500, height: 7, color: false, borderColor: 'black' },
        ],
      };

      doTests('curve', feature);
      doTests('peak',  feature);
      doTests('line',  feature);
    });
  });

  describe('a transcript spans two images, with intron peak on the second image', () => {
    describe('exons without cds', () => {
      // These numbers have been chosen to avoid false negatives due to floating point errors
      const feature = {
        start       : 1,
        end         : 2000,
        subFeatures : [{ start: 1, end: 900, height: 7, color: false, borderColor: 'black' }, { start: 1901, end: 2000, height: 7, color: false, borderColor: 'black' }],
      };

      doTests('curve', feature);
      doTests('peak',  feature);
      doTests('line',  feature);
    });

    describe('exons with cds', () => {
      // These numbers have been chosen to avoid false negatives due to floating point errors
      const feature = {
        start       : 1,
        end         : 2000,
        subFeatures : [
          { start: 1,    end: 801,  height: 7, color: false, borderColor: 'black' },
          { start: 801,  end: 900,  height: 10                                    },
          { start: 1901, end: 1950, height: 10                                    },
          { start: 1950, end: 2000, height: 7, color: false, borderColor: 'black' },
        ],
      };

      doTests('curve', feature);
      doTests('peak',  feature);
      doTests('line',  feature);
    });
  });

  describe('a transcript spans three images, with intron peak on the second image', () => {
    describe('exons without cds', () => {
      const genoverseConfig = { start: 1001, end: 2000 };

      // These numbers have been chosen to avoid false negatives due to floating point errors
      const feature = {
        start       : 1,
        end         : 3000,
        subFeatures : [{ start: 1, end: 500, height: 7, color: false, borderColor: 'black' }, { start: 2501, end: 3000, height: 7, color: false, borderColor: 'black' }],
      };

      doTests('curve', feature, genoverseConfig);
      doTests('peak',  feature, genoverseConfig);
      doTests('line',  feature, genoverseConfig);
    });

    describe('exons with cds', () => {
      const genoverseConfig = { start: 1001, end: 2000 };

      // These numbers have been chosen to avoid false negatives due to floating point errors
      const feature = {
        start       : 1,
        end         : 3000,
        subFeatures : [
          { start: 1,    end: 401,  height: 7, color: false, borderColor: 'black' },
          { start: 401,  end: 500,  height: 10                                    },
          { start: 2501, end: 2600, height: 10                                    },
          { start: 2600, end: 3000, height: 7, color: false, borderColor: 'black' },
        ],
      };

      doTests('curve', feature, genoverseConfig);
      doTests('peak',  feature, genoverseConfig);
      doTests('line',  feature, genoverseConfig);
    });
  });
});
