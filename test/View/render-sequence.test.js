const { afterTest, testTrackRenderStatic } = require('../utils');

describe('Correctly render sequence:', () => {
  afterEach(afterTest);

  const track = {
    model     : Genoverse.Track.Model.Sequence,
    view      : Genoverse.Track.View.Sequence,
    resizable : 'auto',
  };

  describe('ATCGN', () => {
    const sequence = 'ATCGN';

    it('without labels',         () => testTrackRenderStatic(sequence, track));
    it('with labels',            () => testTrackRenderStatic(sequence, track, { start: 1, end: 5 }));
    it('with lower case labels', () => testTrackRenderStatic(sequence.toLowerCase(), { lowerCase: true, ...track }, { start: 1, end: 5 }));
  });
});

describe('Correctly render sequence variation:', () => {
  afterEach(afterTest);

  const track = {
    model     : Genoverse.Track.Model.SequenceVariation.extend({ seqModel: Genoverse.Track.Model.Sequence.extend({ data: 'ATCGN' }) }),
    view      : Genoverse.Track.View.SequenceVariation,
    resizable : 'auto',
  };

  describe('T/C', () => {
    it('without labels', () => testTrackRenderStatic([{ start: 2, end: 2, ref_allele: 'T', alt_allele: 'C' }], track));
    it('with labels',    () => testTrackRenderStatic([{ start: 2, end: 2, ref_allele: 'T', alt_allele: 'C' }], track, { start: 1, end: 5 }));
  });

  describe('TC/-', () => {
    it('without labels', () => testTrackRenderStatic([{ start: 2, end: 3, ref_allele: 'TC', alt_allele: '-' }], track));
    it('with labels',    () => testTrackRenderStatic([{ start: 2, end: 3, ref_allele: 'TC', alt_allele: '-' }], track, { start: 1, end: 5 }));
  });

  describe('T/AGA', () => {
    it('without labels', () => testTrackRenderStatic([{ start: 2, end: 2, ref_allele: 'T', alt_allele: 'AGA' }], track));
    it('with labels',    () => testTrackRenderStatic([{ start: 2, end: 3, ref_allele: 'T', alt_allele: 'AGA' }], track, { start: 1, end: 5 }));
  });

  describe('bumped variants', () => {
    it('without labels', () => testTrackRenderStatic([{ start: 2, end: 3, ref_allele: 'TC', alt_allele: 'AGA' }, { start: 3, end: 4, ref_allele: 'CG', alt_allele: 'A' }], track));
    it('with labels',    () => testTrackRenderStatic([{ start: 2, end: 3, ref_allele: 'TC', alt_allele: 'AGA' }, { start: 3, end: 4, ref_allele: 'CG', alt_allele: 'A' }], track, { start: 1, end: 5 }));
  });
});
