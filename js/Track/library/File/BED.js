Genoverse.Track.File.BED = Genoverse.Track.File.extend({
  name          : 'BED',
  model         : Genoverse.Track.Model.File.BED,
  bump          : true,
  featureHeight : 6,
  subFeatureJoinStyle : "curve",
  populateMenu: function (feature) {
      return {
        title       : '<a target=_blank href="https://genome.ucsc.edu/FAQ/FAQformat.html#format1">BED feature details</a>',
        chrom       : feature.originalFeature[0],
        chromStart  : feature.originalFeature[1],
        chromEnd    : feature.originalFeature[2],
        name        : feature.originalFeature[3],
        score       : feature.originalFeature[4],
        strand      : feature.originalFeature[5],
        thickStart  : feature.originalFeature[6],
        thickEnd    : feature.originalFeature[7],
        itemRgb     : feature.originalFeature[8],
        blockCount  : feature.originalFeature[9],
        blockSizes  : feature.originalFeature[10],
        blockStarts : feature.originalFeature[11]
      };
  }
});
