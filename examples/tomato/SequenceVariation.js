Genoverse.Track.SequenceVariation = Genoverse.Track.extend({
  model: Genoverse.Track.Model.SequenceVariation.VCF,
  
  populateMenu: function (feature) {
    return {
      'title'         : 'This is the title',
      'Location'      : feature.originalFeature[0] + ':' + feature.start + '-' + feature.end,
      'Ref allele'    : feature.originalFeature[3],
      'Alt allele(s)' : feature.originalFeature[4],
      'Qual'          : feature.originalFeature[5]
    };
  },
  
  1: { 
    view: Genoverse.Track.View.Sequence.extend({
      bump           : true,
      labels         : false,
      bumpSpacing    : 0,
      featureSpacing : 0,
      autoHeight     : false,
      
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
      bump       : false,
      labels     : false,
      autoHeight : false,
      
      setFeatureColor: function (feature) {
        var QUAL = feature.originalFeature[5];
        
        if (QUAL > 0) {
          var heat  = Math.min(255, Math.floor(255 * QUAL / this.maxQUAL)) - 127;
          var red   = heat > 0 ? 255 : 127 + heat;
          var green = heat < 0 ? 255 : 127 - heat;

          feature.color = 'rgb(' + red + ',' + green + ',0)';
        } else {
          feature.color = 'rgb(0,0,0)';
        }
      }
    })
  },
  
  100000: false
});