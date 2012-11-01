CBrowse.Track.DAS = CBrowse.Track.Gene.extend({

  config: {
    height        : 150,
    dataType      : 'xml',
    fixedHeight   : true,
    featureHeight : 5,
    color         : '#000000',
    bump          : false,
    autoHeight    : false,
    renderer      : 'transcript_label',
    url           : 'http://www.derkholm.net:8080/das/mmu_58_37k/features?segment=__CHR__:__START__,__END__;type=transcript;type=translation;maxbins=473'
  },

  constructor: function (config) {
    this.base(config);
    this.urlParams.type = [ 'transcript', 'translation' ];
  },

  parseData: function (data, bounds) {
    var track = this;
    var features = new Array();
    var groups = {};
    var i = 0;

    $(data).find('FEATURE').each(function (index, element) {
      var start = parseInt( $(element).find('START').text() );
      var end   = parseInt( $(element).find('END').text() );

      var feature = {
        id          : $(element).attr('id'),
        label       : $(element).attr('label') + ' ' + $(element).attr('id'),

        start       : $(element).find('START').text(),
        end         : $(element).find('END').text(),

        type        : $(element).find('TYPE').text(),
        method      : $(element).find('METHOD').text(),
        phase       : $(element).find('PHASE').text(),
        orientation : $(element).find('ORIENTATION').text(),
        note        : $(element).find('NOTE').text()
      };

      if (feature.type == 'transcript') feature.style = 'strokeRect';

      debugger;

      $(element).find('GROUP[type=transcript]').each(function (n, group) {
        if (!groups[$(group).attr('id')]) {
          groups[$(group).attr('id')] = {
            color       : '#000000',
            labelColor  : '#000000',
            sort        : i++,
            bounds      : {},
            visible     : {},
            bottom      : {},
            labelBottom : {},

            start        : start,
            end          : end,
            type         : $(group).attr('type'),
            label        : $(group).attr('label') + ' ' + $(group).attr('id'),
            id           : $(group).attr('id'),
            exons        : [],
            translations : []
          };
        }

        if (feature.type == 'transcript') {
          groups[$(group).attr('id')].exons.push(feature);
          if (!groups[$(group).attr('id')].start || groups[$(group).attr('id')].start > start)
             groups[$(group).attr('id')].start = start;
          if (!groups[$(group).attr('id')].end || groups[$(group).attr('id')].end < end) 
             groups[$(group).attr('id')].end = end;
        } else if (feature.type == 'translation') {
          groups[$(group).attr('id')].translations.push(feature);
        }

      });

    });

    for (id in groups) {
      var group = groups[id];
      if (group.start && group.end) {
        this.features.insert({ x: group.start, w: group.end - group.start, y:0, h:1 }, group);
      }
    }
    
    return this.features.search(bounds);
  },

  decorateFeatures: function (image) {
    this.base(image);

    this.featurePositions
        .search({x:image.scaledStart, y:0, w:image.width/this.scale, h:this.featuresHeight })
        .each(function (index, feature) {
          console.log(feature.label);
          return true;
        });

  }

});
