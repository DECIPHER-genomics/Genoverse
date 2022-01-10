import Model from 'js/Track/Model/File/BED';
import Track from 'js/Track/library/File';

export default Track.extend({
  name                : 'BED',
  model               : Model,
  bump                : true,
  featureHeight       : 10,
  thickHeight         : 10,
  thinHeight          : 7,
  subFeatureJoinStyle : 'curve',

  populateMenu: function (feature) {
    const fields = [ false, false, false, 'name', 'score', 'strand', 'thickStart', 'thickEnd', 'itemRgb', 'blockCount', 'blockSizes', 'blockStarts' ]; // First three fields are chr, start, end which are covered by Location

    return feature.originalFeature.reduce((menu, val, i) => {
      if (fields[i]) {
        menu[fields[i]] = val;
      }

      return menu;
    }, {
      title    : '<a target="_blank" href="https://genome.ucsc.edu/FAQ/FAQformat.html#format1">BED feature details</a>',
      Location : `${feature.chr}:${feature.start}-${feature.end}`,
    });
  },
});
