Genoverse.Track.DAS = Genoverse.Track.Gene.extend({

  parseFeatures: function (data, bounds) {
    var features = new Array();

    $(data).find('FEATURE').each(function (i, element) {
      var feature = {};

      $(element).children().each(function (i, property) {
        feature[$(property).prop('tagName')] = $(property).text();
      });
      
      if (feature.START && feature.END) {
        for (var key in feature) {
          feature[key.toLowerCase()] = feature[key];
        }

        feature.id    = $(element).attr('id');
        feature.label = $(element).attr('label') || feature.id;

        feature.start = parseInt(feature.START);
        feature.end   = parseInt(feature.END);
      } else {
        return false;
      }

      features.push(feature)
    });

    return features;
  }

});
