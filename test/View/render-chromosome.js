'use strict';

describe('Correctly render a chromosome:', function () {
  afterEach(afterTest);

  var genome = {
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
        { id: 'q12.3',  start: 901,  end: 1000, type: 'gvar'    }
      ]
    },
    '2': {
      size  : 1000,
      bands : [{ id: 'p13', start: 1, end: 1000, type: 'gpos' }]
    }
  };

  it('with all band types', function () {
    return testTrackRenderStatic(undefined, { _testClass: Genoverse.Track.Chromosome, featureHeight: 20 }, [
      [ 5, 0, 95, 20 ], [ 'fillText', 'p13', 50, 10.5, '#FFFFFF' ],
      [ 'beginPath' ], [ 'moveTo', 5, 0.5  ], [ 'lineTo', 100, 0.5  ], [ 'stroke' ],
      [ 'beginPath' ], [ 'moveTo', 5, 20.5 ], [ 'lineTo', 100, 20.5 ], [ 'stroke' ],
      [ 'beginPath' ], [ 'moveTo', 5, 0.5  ], [ 'bezierCurveTo', -1, 0.5, -1, 20.5, 5, 20.5 ], [ 'fill' ], [ 'stroke' ],

      [ 'beginPath' ], [ 'moveTo', 100, 0.5  ], [ 'lineTo', 137.5, 5.5  ], [ 'lineTo', 212.5, 5.5  ], [ 'lineTo', 250, 0.5  ],
                       [ 'lineTo', 250, 20.5 ], [ 'lineTo', 212.5, 14.5 ], [ 'lineTo', 137.5, 14.5 ], [ 'lineTo', 100, 20.5 ], [ 'fill', '#708090' ],
      [ 'beginPath' ], [ 'moveTo', 100, 0.5  ], [ 'lineTo', 137.5, 5.5  ], [ 'lineTo', 212.5, 5.5  ], [ 'lineTo', 250, 0.5  ],
                       [ 'moveTo', 250, 20.5 ], [ 'lineTo', 212.5, 14.5 ], [ 'lineTo', 137.5, 14.5 ], [ 'lineTo', 100, 20.5 ], [ 'stroke' ],

      [ 250, 0, 50, 20, '#FFFFFF' ], [ 'fillText', 'p11.2',  275, 10.5, '#000000' ],
      [ 'beginPath' ], [ 'moveTo', 250, 0.5 ], [ 'lineTo', 300, 0.5 ], [ 'moveTo', 250, 20.5 ], [ 'lineTo', 300, 20.5 ], [ 'stroke' ],

      [ 'beginPath' ], [ 'moveTo', 300, 0.5 ], [ 'lineTo', 350, 10.25 ], [ 'lineTo', 300, 20.5 ], [ 'fill', '#708090' ], [ 'stroke' ],
      [ 'beginPath' ], [ 'moveTo', 450, 0.5 ], [ 'lineTo', 350, 10.25 ], [ 'lineTo', 450, 20.5 ], [ 'fill', '#708090' ], [ 'stroke' ],

      [ 450, 0, 50,  20, '#000000' ], [ 'fillText', 'q11.21', 475, 10.5, '#FFFFFF' ],
      [ 500, 0, 100, 20, '#D9D9D9' ], [ 'fillText', 'q11.22', 550, 10.5, '#000000' ],
      [ 600, 0, 100, 20, '#BFBFBF' ], [ 'fillText', 'q11.23', 650, 10.5, '#000000' ],
      [ 700, 0, 100, 20, '#999999' ], [ 'fillText', 'q12.1',  750, 10.5, '#FFFFFF' ],
      [ 800, 0, 100, 20, '#7F7F7F' ], [ 'fillText', 'q12.2',  850, 10.5, '#FFFFFF' ],
      [ 900, 0, 95,  20, '#E0E0E0' ], [ 'fillText', 'q12.3',  950, 10.5, '#000000' ],
      [ 'beginPath' ], [ 'moveTo', 450, 0.5  ], [ 'lineTo', 995, 0.5  ], [ 'stroke' ],
      [ 'beginPath' ], [ 'moveTo', 450, 20.5 ], [ 'lineTo', 995, 20.5 ], [ 'stroke' ],
      [ 'beginPath' ], [ 'moveTo', 995, 0.5  ], [ 'bezierCurveTo', 1001, 0.5, 1001, 20.5, 995, 20.5 ], [ 'fill', '#E0E0E0' ], [ 'stroke' ]
    ], { end: genome[1].size, genome: genome, chromosomeSize: genome[1].size, width: genome[1].size });
  });

  it('with only one band', function () {
    return testTrackRenderStatic(undefined, { _testClass: Genoverse.Track.Chromosome, featureHeight: 20 }, [
      [ 5, 0, 990, 20 ], [ 'fillText', 'p13', 500, 10.5, '#FFFFFF' ],
      [ 'beginPath' ], [ 'moveTo', 5,   0.5  ], [ 'lineTo', 995, 0.5  ],
      [ 'moveTo', 5, 20.5 ], [ 'lineTo', 995, 20.5 ],
      [ 'moveTo', 5, 0.5  ], [ 'bezierCurveTo', -1,   0.5, -1, 20.5, 5, 20.5 ], [ 'fill' ],
      [ 'clearRect', 995, 0, 5, 20.5 ],
      [ 'moveTo', 995, 0.5 ], [ 'bezierCurveTo', 1001, 0.5, 1001, 20.5, 995, 20.5 ], [ 'fill' ], [ 'stroke' ]
    ], { chr: 2, end: genome[2].size, genome: genome, chromosomeSize: genome[2].size, width: genome[2].size });
  });
});
