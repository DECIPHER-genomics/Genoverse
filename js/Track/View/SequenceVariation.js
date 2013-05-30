Genoverse.Track.View.SequenceVariation = Genoverse.Track.View.extend({

  '1:1' : Genoverse.Track.View.Sequence.extend({
    bump           : true,
    labels         : false,
    bumpSpacing    : 0,
    featureSpacing : 0,
    autoHeight     : false,

    draw: function(features, featureContext, labelContext, scale) {
      this.base.apply(this, arguments);
      this.highlightRef(features, featureContext, scale);
    },

    highlightRef: function(features, context, scale) {
      context.strokeStyle = 'black';
      for (var i=0; i<features.length; i++) {
        if (features[i].allele == 'REF') {
          context.strokeRect(features[i].position[scale].X, features[i].position[scale].Y, features[i].position[scale].width, features[i].position[scale].height);
        }
      }
    }
  }),

  '1:1000000000' : Genoverse.Track.View.extend({
    bump       : false,
    labels     : false,
    autoHeight : false,
    draw: function (features, featureContext, labelContext, scale) {
      this.base.apply(this, arguments);
    }
  }),

});
