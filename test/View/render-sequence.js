'use strict';

describe('Correctly render sequence:', function () {
  afterEach(afterTest);

  var track = {
    model     : Genoverse.Track.Model.Sequence,
    view      : Genoverse.Track.View.Sequence,
    resizable : 'auto'
  };

  describe('ATCGN', function () {
    var sequence = 'ATCGN';

    it('without labels', function () {
      return testTrackRenderStatic(sequence, track, [
        [ 0, 0, 5, 12, '#00986A' ], [ 5, 0, 5, 12, '#D92929' ], [ 10, 0, 5, 12, '#0772A1' ], [ 15, 0, 5, 12, '#FFDD73' ], [ 20, 0, 5, 12, '#CCCCCC' ]
      ]);
    });

    it('with labels', function () {
      return testTrackRenderStatic(sequence, track, [
        [ 0, 0, 20, 12, '#00986A' ], [ 20, 0, 20, 12, '#D92929' ], [ 40, 0, 20, 12, '#0772A1' ], [ 60, 0, 20, 12, '#FFDD73' ], [ 80, 0, 20, 12, '#CCCCCC' ],
        [ 'fillText', 'A', 10, 6.5, '#FFFFFF' ],
        [ 'fillText', 'T', 30, 6.5, '#FFFFFF' ],
        [ 'fillText', 'C', 50, 6.5, '#FFFFFF' ],
        [ 'fillText', 'G', 70, 6.5, '#000000' ],
        [ 'fillText', 'N', 90, 6.5, '#000000' ],
      ], { start: 1, end: 5 });
    });

    it('with lower case labels', function () {
      return testTrackRenderStatic(sequence.toLowerCase(), $.extend({ lowerCase: true }, track), [
        [ 0, 0, 20, 12, '#00986A' ], [ 20, 0, 20, 12, '#D92929' ], [ 40, 0, 20, 12, '#0772A1' ], [ 60, 0, 20, 12, '#FFDD73' ], [ 80, 0, 20, 12, '#CCCCCC' ],
        [ 'fillText', 'a', 10, 6.5, '#FFFFFF' ],
        [ 'fillText', 't', 30, 6.5, '#FFFFFF' ],
        [ 'fillText', 'c', 50, 6.5, '#FFFFFF' ],
        [ 'fillText', 'g', 70, 6.5, '#000000' ],
        [ 'fillText', 'n', 90, 6.5, '#000000' ],
      ], { start: 1, end: 5 });
    });
  });
});

describe('Correctly render sequence variation:', function () {
  afterEach(afterTest);

  var track = {
    model     : Genoverse.Track.Model.SequenceVariation.extend({ seqModel: Genoverse.Track.Model.Sequence.extend({ data: 'ATCGN' }) }),
    view      : Genoverse.Track.View.SequenceVariation,
    resizable : 'auto'
  };

  describe('T/C', function () {
    it('without labels', function () {
      return testTrackRenderStatic([{ start: 2, end: 2, ref_allele: 'T', alt_allele: 'C' }], track, [
        [ 0, 0, 5, 15, '#00986A' ], [ 5, 0, 5, 15, '#D92929' ], [ 10, 0, 5, 15, '#0772A1' ], [ 15, 0, 5, 15, '#FFDD73' ], [ 20, 0, 5, 15, '#CCCCCC' ],
        function (context) {
          context.strokeStyle = context.fillStyle = '#1DD300';
          context.lineWidth   = 2;

          context.beginPath();
          context.moveTo(5,  0);
          context.lineTo(10, 0);
          context.lineTo(10, 34);
          context.lineTo(5,  34);
          context.closePath();
          context.stroke();

          context.lineWidth   = 1;
          context.globalAlpha = 0.5;
          context.fill();
          context.globalAlpha = 1;
        },
        [ 5, 19, 5, 15, '#0772A1' ],
        function (context) {
          context.strokeStyle = '#1DD300';
          context.lineWidth   = 2;

          context.beginPath();
          context.moveTo(10, 19);
          context.lineTo(10, 34);
          context.lineTo(5,  34);
          context.lineTo(5,  19);
          context.stroke();

          context.lineWidth = 1;
        }
      ]);
    });

    it('with labels', function () {
      return testTrackRenderStatic([{ start: 2, end: 2, ref_allele: 'T', alt_allele: 'C' }], track, [
        [ 0, 0, 20, 15, '#00986A' ], [ 20, 0, 20, 15, '#D92929' ], [ 40, 0, 20, 15, '#0772A1' ], [ 60, 0, 20, 15, '#FFDD73' ], [ 80, 0, 20, 15, '#CCCCCC' ],
        [ 'fillText', 'A', 10, 8, '#FFFFFF' ],
        [ 'fillText', 'T', 30, 8, '#FFFFFF' ],
        [ 'fillText', 'C', 50, 8, '#FFFFFF' ],
        [ 'fillText', 'G', 70, 8, '#000000' ],
        [ 'fillText', 'N', 90, 8, '#000000' ],
        function (context) {
          context.strokeStyle = context.fillStyle = '#1DD300';
          context.lineWidth   = 2;

          context.beginPath();
          context.moveTo(20, 0);
          context.lineTo(40, 0);
          context.lineTo(40, 34);
          context.lineTo(20, 34);
          context.closePath();
          context.stroke();

          context.lineWidth   = 1;
          context.globalAlpha = 0.5;
          context.fill();
          context.globalAlpha = 1;
        },
        [ 20, 19, 20, 15, '#0772A1' ], [ 'fillText', 'C', 30, 27, '#FFFFFF' ],
        function (context) {
          context.strokeStyle = '#1DD300';
          context.lineWidth   = 2;

          context.beginPath();
          context.moveTo(40, 19);
          context.lineTo(40, 34);
          context.lineTo(20, 34);
          context.lineTo(20, 19);
          context.stroke();

          context.lineWidth = 1;
        }
      ], { start: 1, end: 5 });
    });
  });

  describe('TC/-', function () {
    it('without labels', function () {
      return testTrackRenderStatic([{ start: 2, end: 3, ref_allele: 'TC', alt_allele: '-' }], track, [
        [ 0, 0, 5, 15, '#00986A' ], [ 5, 0, 5, 15, '#D92929' ], [ 10, 0, 5, 15, '#0772A1' ], [ 15, 0, 5, 15, '#FFDD73' ], [ 20, 0, 5, 15, '#CCCCCC' ],
        function (context) {
          context.strokeStyle = context.fillStyle = '#D31D00';
          context.lineWidth   = 2;

          context.beginPath();
          context.moveTo(5,  0);
          context.lineTo(15, 0);
          context.lineTo(15, 17);
          context.lineTo(10, 19);
          context.lineTo(10, 34);
          context.lineTo(5,  34);
          context.closePath();
          context.stroke();

          context.lineWidth   = 1;
          context.globalAlpha = 0.5;
          context.fill();
          context.globalAlpha = 1;
        },
        [ 5, 19, 5, 15, '#CCCCCC' ],
        function (context) {
          context.strokeStyle = '#D31D00';
          context.lineWidth   = 2;

          context.beginPath();
          context.moveTo(10, 19);
          context.lineTo(10, 34);
          context.lineTo(5,  34);
          context.lineTo(5,  19);
          context.stroke();

          context.lineWidth = 1;
        }
      ]);
    });

    it('with labels', function () {
      return testTrackRenderStatic([{ start: 2, end: 3, ref_allele: 'TC', alt_allele: '-' }], track, [
        [ 0, 0, 20, 15, '#00986A' ], [ 20, 0, 20, 15, '#D92929' ], [ 40, 0, 20, 15, '#0772A1' ], [ 60, 0, 20, 15, '#FFDD73' ], [ 80, 0, 20, 15, '#CCCCCC' ],
        [ 'fillText', 'A', 10, 8, '#FFFFFF' ],
        [ 'fillText', 'T', 30, 8, '#FFFFFF' ],
        [ 'fillText', 'C', 50, 8, '#FFFFFF' ],
        [ 'fillText', 'G', 70, 8, '#000000' ],
        [ 'fillText', 'N', 90, 8, '#000000' ],
        function (context) {
          context.strokeStyle = context.fillStyle = '#D31D00';
          context.lineWidth   = 2;

          context.beginPath();
          context.moveTo(20, 0);
          context.lineTo(60, 0);
          context.lineTo(60, 17);
          context.lineTo(40, 19);
          context.lineTo(40, 34);
          context.lineTo(20, 34);
          context.closePath();
          context.stroke();

          context.lineWidth   = 1;
          context.globalAlpha = 0.5;
          context.fill();
          context.globalAlpha = 1;
        },
        [ 20, 19, 20, 15, '#CCCCCC' ], [ 'fillText', '-', 30, 27 ],
        function (context) {
          context.strokeStyle = '#D31D00';
          context.lineWidth   = 2;

          context.beginPath();
          context.moveTo(40, 19);
          context.lineTo(40, 34);
          context.lineTo(20, 34);
          context.lineTo(20, 19);
          context.stroke();

          context.lineWidth = 1;
        }
      ], { start: 1, end: 5 });
    });
  });

  describe('T/AGA', function () {
    it('without labels', function () {
      return testTrackRenderStatic([{ start: 2, end: 2, ref_allele: 'T', alt_allele: 'AGA' }], track, [
        [ 0, 0, 5, 15, '#00986A' ], [ 5, 0, 5, 15, '#D92929' ], [ 10, 0, 5, 15, '#0772A1' ], [ 15, 0, 5, 15, '#FFDD73' ], [ 20, 0, 5, 15, '#CCCCCC' ],
        function (context) {
          context.strokeStyle = context.fillStyle = '#1DD300';
          context.lineWidth   = 2;

          context.beginPath();
          context.moveTo(5,  0);
          context.lineTo(10, 0);
          context.lineTo(10, 17);
          context.lineTo(20, 19);
          context.lineTo(20, 34);
          context.lineTo(5,  34);
          context.closePath();
          context.stroke();

          context.lineWidth   = 1;
          context.globalAlpha = 0.5;
          context.fill();
          context.globalAlpha = 1;
        },
        [ 5, 19, 5, 15, '#00986A' ], [ 10, 19, 5, 15, '#FFDD73' ], [ 15, 19, 5, 15, '#00986A' ],
        function (context) {
          context.strokeStyle = '#1DD300';
          context.lineWidth   = 2;

          context.beginPath();
          context.moveTo(20, 19);
          context.lineTo(20, 34);
          context.lineTo(5,  34);
          context.lineTo(5,  19);
          context.stroke();

          context.lineWidth = 1;
        }
      ]);
    });

    it('with labels', function () {
      return testTrackRenderStatic([{ start: 2, end: 3, ref_allele: 'T', alt_allele: 'AGA' }], track, [
        [ 0, 0, 20, 15, '#00986A' ], [ 20, 0, 20, 15, '#D92929' ], [ 40, 0, 20, 15, '#0772A1' ], [ 60, 0, 20, 15, '#FFDD73' ], [ 80, 0, 20, 15, '#CCCCCC' ],
        [ 'fillText', 'A', 10, 8, '#FFFFFF' ],
        [ 'fillText', 'T', 30, 8, '#FFFFFF' ],
        [ 'fillText', 'C', 50, 8, '#FFFFFF' ],
        [ 'fillText', 'G', 70, 8, '#000000' ],
        [ 'fillText', 'N', 90, 8, '#000000' ],
        function (context) {
          context.strokeStyle = context.fillStyle = '#1DD300';
          context.lineWidth   = 2;

          context.beginPath();
          context.moveTo(20, 0);
          context.lineTo(40, 0);
          context.lineTo(40, 17);
          context.lineTo(80, 19);
          context.lineTo(80, 34);
          context.lineTo(20, 34);
          context.closePath();
          context.stroke();

          context.lineWidth   = 1;
          context.globalAlpha = 0.5;
          context.fill();
          context.globalAlpha = 1;
        },
        [ 20, 19, 20, 15, '#00986A' ], [ 40, 19, 20, 15, '#FFDD73' ], [ 60, 19, 20, 15, '#00986A' ],
        [ 'fillText', 'A', 30, 27, '#FFFFFF' ], [ 'fillText', 'G', 50, 27 ], [ 'fillText', 'A', 70, 27, '#FFFFFF' ],
        function (context) {
          context.strokeStyle = '#1DD300';
          context.lineWidth   = 2;

          context.beginPath();
          context.moveTo(80, 19);
          context.lineTo(80, 34);
          context.lineTo(20, 34);
          context.lineTo(20, 19);
          context.stroke();

          context.lineWidth = 1;
        }
      ], { start: 1, end: 5 });
    });
  });

  describe('bumped variants', function () {
    it('without labels', function () {
      return testTrackRenderStatic([{ start: 2, end: 3, ref_allele: 'TC', alt_allele: 'AGA' }, { start: 3, end: 4, ref_allele: 'CG', alt_allele: 'A' }], track, [
        [ 0, 0, 5, 15, '#00986A' ], [ 5, 0, 5, 15, '#D92929' ], [ 10, 0, 5, 15, '#0772A1' ], [ 15, 0, 5, 15, '#FFDD73' ], [ 20, 0, 5, 15, '#CCCCCC' ],
        function (context) {
          context.strokeStyle = context.fillStyle = '#1DD300';
          context.lineWidth   = 2;

          context.beginPath();
          context.moveTo(5,  0);
          context.lineTo(15, 0);
          context.lineTo(15, 17);
          context.lineTo(20, 19);
          context.lineTo(20, 34);
          context.lineTo(5,  34);
          context.closePath();
          context.stroke();

          context.lineWidth   = 1;
          context.globalAlpha = 0.5;
          context.fill();
          context.globalAlpha = 1;

          context.strokeStyle = context.fillStyle = '#D31D00';
          context.lineWidth   = 2;

          context.beginPath();
          context.moveTo(10, 0);
          context.lineTo(20, 0);
          context.lineTo(20, 36);
          context.lineTo(15, 38);
          context.lineTo(15, 53);
          context.lineTo(10, 53);
          context.closePath();
          context.stroke();

          context.lineWidth   = 1;
          context.globalAlpha = 0.5;
          context.fill();
          context.globalAlpha = 1;
        },
        [ 5,  19, 5, 15, '#00986A' ], [ 10, 19, 5, 15, '#FFDD73' ], [ 15, 19, 5, 15, '#00986A' ],
        [ 10, 38, 5, 15, '#00986A' ],
        function (context) {
          context.strokeStyle = '#1DD300';
          context.lineWidth   = 2;

          context.beginPath();
          context.moveTo(20, 19);
          context.lineTo(20, 34);
          context.lineTo(5,  34);
          context.lineTo(5,  19);
          context.stroke();

          context.strokeStyle = '#D31D00';

          context.beginPath();
          context.moveTo(15, 38);
          context.lineTo(15, 53);
          context.lineTo(10, 53);
          context.lineTo(10, 38);
          context.stroke();

          context.lineWidth = 1;
        }
      ]);
    });

    it('with labels', function () {
      return testTrackRenderStatic([{ start: 2, end: 3, ref_allele: 'TC', alt_allele: 'AGA' }, { start: 3, end: 4, ref_allele: 'CG', alt_allele: 'A' }], track, [
        [ 0, 0, 20, 15, '#00986A' ], [ 20, 0, 20, 15, '#D92929' ], [ 40, 0, 20, 15, '#0772A1' ], [ 60, 0, 20, 15, '#FFDD73' ], [ 80, 0, 20, 15, '#CCCCCC' ],
        [ 'fillText', 'A', 10, 8, '#FFFFFF' ],
        [ 'fillText', 'T', 30, 8, '#FFFFFF' ],
        [ 'fillText', 'C', 50, 8, '#FFFFFF' ],
        [ 'fillText', 'G', 70, 8, '#000000' ],
        [ 'fillText', 'N', 90, 8, '#000000' ],
        function (context) {
          context.strokeStyle = context.fillStyle = '#1DD300';
          context.lineWidth   = 2;

          context.beginPath();
          context.moveTo(20, 0);
          context.lineTo(60, 0);
          context.lineTo(60, 17);
          context.lineTo(80, 19);
          context.lineTo(80, 34);
          context.lineTo(20, 34);
          context.closePath();
          context.stroke();

          context.lineWidth   = 1;
          context.globalAlpha = 0.5;
          context.fill();
          context.globalAlpha = 1;

          context.strokeStyle = context.fillStyle = '#D31D00';
          context.lineWidth   = 2;

          context.beginPath();
          context.moveTo(40, 0);
          context.lineTo(80, 0);
          context.lineTo(80, 36);
          context.lineTo(60, 38);
          context.lineTo(60, 53);
          context.lineTo(40, 53);
          context.closePath();
          context.stroke();

          context.lineWidth   = 1;
          context.globalAlpha = 0.5;
          context.fill();
          context.globalAlpha = 1;
        },
        [ 20, 19, 20, 15, '#00986A' ], [ 40, 19, 20, 15, '#FFDD73' ], [ 60, 19, 20, 15, '#00986A' ],
        [ 'fillText', 'A', 30, 27, '#FFFFFF' ], [ 'fillText', 'G', 50, 27 ], [ 'fillText', 'A', 70, 27, '#FFFFFF' ],
        [ 40, 38, 20, 15, '#00986A' ],
        [ 'fillText', 'A', 50, 46, '#FFFFFF' ],
        function (context) {
          context.strokeStyle = '#1DD300';
          context.lineWidth   = 2;

          context.beginPath();
          context.moveTo(80, 19);
          context.lineTo(80, 34);
          context.lineTo(20, 34);
          context.lineTo(20, 19);
          context.stroke();

          context.strokeStyle = '#D31D00';

          context.beginPath();
          context.moveTo(60, 38);
          context.lineTo(60, 53);
          context.lineTo(40, 53);
          context.lineTo(40, 38);
          context.stroke();

          context.lineWidth = 1;
        }
      ], { start: 1, end: 5 });
    });
  });
});
