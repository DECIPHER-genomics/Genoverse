const { afterTest, testTrackRenderStatic } = require('../utils');

describe('Correctly render a chromosome:', () => {
  afterEach(afterTest);

  const genome = {
    '1': {
      size  : 1000,
      bands : [
        { id: 'p13',    start: 1,    end: 100,  type: 'gpos'    },
        { id: 'p12',    start: 101,  end: 250,  type: 'stalk'   },
        { id: 'p11.2',  start: 251,  end: 300,  type: 'gneg'    },
        { id: 'p11.1',  start: 301,  end: 350,  type: 'acen'    },
        { id: 'q11.1',  start: 351,  end: 450,  type: 'acen'    },
        { id: 'q11.21', start: 451,  end: 500,  type: 'gpos100' },
        { id: 'q11.22', start: 501,  end: 600,  type: 'gpos25'  },
        { id: 'q11.23', start: 601,  end: 700,  type: 'gpos33'  },
        { id: 'q12.1',  start: 701,  end: 800,  type: 'gpos50'  },
        { id: 'q12.2',  start: 801,  end: 900,  type: 'gpos66'  },
        { id: 'q12.3',  start: 901,  end: 1000, type: 'gvar'    },
      ],
    },
    '2': {
      size  : 1000,
      bands : [{ id: 'p13', start: 1, end: 1000, type: 'gpos' }],
    },
  };

  it('with all band types', () => testTrackRenderStatic(
    undefined,
    { _testClass: Genoverse.Track.Chromosome, featureHeight: 20 },
    { end: genome[1].size, genome: genome, chromosomeSize: genome[1].size, width: genome[1].size }
  ));

  it('with only one band', () => testTrackRenderStatic(
    undefined,
    { _testClass: Genoverse.Track.Chromosome, featureHeight: 20 },
    { chr: 2, end: genome[2].size, genome: genome, chromosomeSize: genome[2].size, width: genome[2].size }
  ));
});
