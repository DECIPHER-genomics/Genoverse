Genoverse.Track.DAS = Genoverse.Track.Gene.extend({

  parseFeatures: function (data, bounds) {
    var features = new Array();

    $(data).find('FEATURE').each(function (i, element) {
      var feature = {};

      feature.id    = element.getAttribute('id');
      feature.label = element.getAttribute('label') || feature.id;

      $(element).children().each(function (i, property) {
        feature[$(property).prop('tagName').toLowerCase()] = $(property).text();
      });

      feature.start = feature.start *1; // Converting to number with *1
      feature.end   = feature.end   *1; // Converting to number with *1

      feature.links  = {};
      feature.notes  = [];

      $(element).find('LINK').each(function (i, LINK) {
        feature.links[LINK.getAttribute('href')] = $(LINK).text() || 'link';
      });

      $(element).find('NOTE').each(function (i, NOTE) {
        feature.notes.push($(NOTE).text());
      });

      $(element).find('GROUP').each(function (i, GROUP) {
        var group   = {};
        group.id    = GROUP.getAttribute('id');
        group.type  = GROUP.getAttribute('type');
        group.links = {};
        group.notes = [];

        $(GROUP).find('LINK').each(function (i, LINK) {
          group.links[LINK.getAttribute('href')] = $(LINK).text() || 'link';
        });

        $(GROUP).find('NOTE').each(function (i, NOTE) {
          group.notes.push($(NOTE).text());
        });

        if (!feature.groups) feature.groups = [];
        feature.groups.push(group);
      });

      $(element).find('PARENT').each(function (i, PARENT) {
        if (!feature.parents) feature.parents = [];
        feature.parents.push({ id: PARENT.getAttribute('id') });
      });

      features.push(feature)
    });

    return features;
  }

});
