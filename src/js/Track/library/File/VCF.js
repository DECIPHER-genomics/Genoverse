import Model        from '../../Model/File/VCF';
import View         from '../../View';
import SequenceView from '../../View/Sequence';
import Track        from '../File';

export default Track.extend({
  name       : 'VCF',
  indexExt   : '.tbi',
  model      : Model,
  autoHeight : false,
  maxQual    : undefined, // Set this to the maximum value of the QUAL field in the file in order to color features by QUAL. Only required for large (tabix indexed) files - small ones can calculate this value automatically

  afterSetMVC: function () {
    if (this.prop('gz')) {
      this.prop('threshold', 1e5);
    }
  },

  populateMenu: function (feature) {
    return {
      title  : '<a target="_blank" href="https://www.internationalgenome.org/wiki/Analysis/vcf4.0">VCF feature details</a>',
      CHROM  : feature.originalFeature[0],
      POS    : feature.originalFeature[1],
      ID     : feature.originalFeature[2],
      REF    : feature.originalFeature[3],
      ALT    : feature.originalFeature[4],
      QUAL   : feature.originalFeature[5],
      FILTER : feature.originalFeature[6],
      INFO   : feature.originalFeature[7].split(';').join('<br />'),
    };
  },

  1: {
    view: SequenceView.extend({
      bump          : true,
      labels        : false,
      featureMargin : { top: 0, right: 0, bottom: 0, left: 0 },

      draw: function (features, featureContext, labelContext, scale) {
        this.base(features, featureContext, labelContext, scale);
        this.highlightRef(features, featureContext, scale);
      },

      highlightRef: function (features, context, scale) {
        context.strokeStyle = 'black';

        features.forEach(
          (feature) => {
            if (feature.allele === 'REF') {
              context.strokeRect(feature.position[scale].X, feature.position[scale].Y, feature.position[scale].width, feature.position[scale].height);
            }
          }
        );
      },
    }),
  },

  1000: {
    view: View.extend({
      bump   : false,
      labels : false,

      drawFeature: function (feature, ...args) {
        const maxQual = this.prop('maxQual');

        if (maxQual && !feature.color) {
          const heat  = Math.min(255, Math.floor((255 * (feature.originalFeature[5] || 0)) / maxQual)) - 127;
          const red   = heat > 0 ? 255 : 127 + heat;
          const green = heat < 0 ? 255 : 127 - heat;

          feature.color = `rgb(${red},${green},0)`;
        }

        this.base(feature, ...args);
      },
    }),
  },
});
