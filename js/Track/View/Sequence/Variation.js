Genoverse.Track.View.SequenceVariation = Genoverse.Track.View.Sequence.extend({
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
});