Genoverse.Track.File.VCF = Genoverse.Track.File.extend({
  name       : 'VCF',
  indexExt   : '.tbi',
  model      : Genoverse.Track.Model.File.VCF,
  autoHeight : false,
  maxQual    : undefined, // Set this to the maximum value of the QUAL field in the file in order to color features by QUAL. Only required for large (tabix indexed) files - small ones can calculate this value automatically

  afterSetMVC: function () {
    if (this.prop('gz')) {
      this.prop('threshold', 1e5);
    }
  },

  populateMenu: function (feature) {
    return {
      title  : '<a target="_blank" href="http://www.1000genomes.org/node/101">VCF feature details</a>',
      CHROM  : feature.originalFeature[0],
      POS    : feature.originalFeature[1],
      ID     : feature.originalFeature[2],
      REF    : feature.originalFeature[3],
      ALT    : feature.originalFeature[4],
      QUAL   : feature.originalFeature[5],
      FILTER : feature.originalFeature[6],
      INFO   : feature.originalFeature[7].split(';').join('<br />')
    };
  },

  1: {
    view: Genoverse.Track.View.Sequence.extend({
      bump          : true,
      labels        : false,
      featureMargin : { top: 0, right: 0, bottom: 0, left: 0 },

      draw: function (features, featureContext, labelContext, scale) {
        this.base.apply(this, arguments);
        this.highlightRef(features, featureContext, scale);
      },

      highlightRef: function (features, context, scale) {
        context.strokeStyle = 'black';

        for (var i = 0; i < features.length; i++) {
          if (features[i].allele === 'REF') {
            context.strokeRect(features[i].position[scale].X, features[i].position[scale].Y, features[i].position[scale].width, features[i].position[scale].height);
          }
        }
      }
    })
  },

  1000: {
    view: Genoverse.Track.View.extend({
      bump   : false,
      labels : false,

      drawFeature: function (feature) {
        var maxQual = this.prop('maxQual');

        if (maxQual && !feature.color) {
          var heat  = Math.min(255, Math.floor(255 * (feature.originalFeature[5] || 0) / maxQual)) - 127;
          var red   = heat > 0 ? 255 : 127 + heat;
          var green = heat < 0 ? 255 : 127 - heat;

          feature.color = 'rgb(' + red + ',' + green + ',0)';
        }

        this.base.apply(this, arguments);
      }
    })
  }
});
