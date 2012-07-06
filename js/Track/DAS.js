Genoverse.Track.DAS = Genoverse.Track.Gene.extend({

  init: function () {
    this.base();
    this.getStylesheet();
  },


  getStylesheet: function () {
    $.ajax({
      url      : this.source + '/stylesheet',
      dataType : 'xml',
      context  : this,
      timeout  : 5000,
      error    : function (jqXHR, textStatus, errorThrown) {
        // Warn about the error?
      },
      success  : this.parseStylesheet,
    });
  },


  getQueryString: function (start, end) {
    return this.base(start - (end-start)*10, end + (end-start)*10);
  },

  parseStylesheet: function(XML) {
    var stylesheet = {};

    $(XML).find('TYPE').each(function (i, TYPE) {
      var glyphs = [];
      
      $(TYPE).find('GLYPH>*').each(function(i, GLYPH) {
        var glyph = { type: $(GLYPH).prop('tagName').toLowerCase() };

        $(GLYPH).children().each(function(i, PROPERTY){
          glyph[$(PROPERTY).prop('tagName').toLowerCase()] = $(PROPERTY).text();
        })

        glyphs.push(glyph);
      });

      stylesheet[TYPE.getAttribute('id')] = glyphs;
    });

    this.stylesheet = stylesheet;
  },


  parseFeatures: function (data, bounds) {
    var features = new Array();

    $(data).find('FEATURE').each(function (i, FEATURE) {
      var feature = {};

      feature.id    = FEATURE.getAttribute('id');
      feature.label = FEATURE.getAttribute('label') || feature.id;

      $(FEATURE).children().each(function (i, property) {
        feature[$(property).prop('tagName').toLowerCase()] = $(property).text();
      });

      feature.start = feature.start *1; // Converting to number with *1
      feature.end   = feature.end   *1; // Converting to number with *1
      feature.width = feature.end - feature.start;

      feature.links  = {};
      feature.notes  = [];

      $(FEATURE).find('LINK').each(function (i, LINK) {
        feature.links[LINK.getAttribute('href')] = $(LINK).text() || 'link';
      });

      $(FEATURE).find('NOTE').each(function (i, NOTE) { 
        feature.notes.push($(NOTE).text());
      });

      $(FEATURE).find('GROUP').each(function (i, GROUP) {
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

      $(FEATURE).find('PARENT').each(function (i, PARENT) {
        if (!feature.parents) feature.parents = [];
        feature.parents.push({ id: PARENT.getAttribute('id') });
      });

      features.push(feature)
    });

    return features;
  },


  defaultStylesheet: {
    "transcript:havana": {
      glyph:{
          line:{
              height:10,
              fgcolor:'dodgerblue4',
              style:'hat'
          }
      }
    },
    "exon:coding:havana": {
      glyph:{
          box:{
              height:10,
              fgcolor:'dodgerblue4',
              bgcolor:'dodgerblue4'
          }
      }
    },
    "exon:non_coding:ensembl": {
      glyph:{
          box:{
              height:6,
              bgcolor:'white',
              fgcolor:'rust'
          }
      }      
    },
    "exon:coding:ensembl_havana_transcript": {
      glyph:{
          box:{
              height:10,
              fgcolor:'goldenrod3',
              bgcolor:'goldenrod3'
          }
      }
    },
    "exon:5'UTR:ensembl_havana_transcript": {
      glyph:{
          box:{
              height:6,
              bgcolor:'white',
              fgcolor:'goldenrod3'
          }
      }      
    },
    "exon:coding:ensembl_havana_transcript": {
      glyph:{
          box:{
              height:10,
              fgcolor:'goldenrod3',
              bgcolor:'goldenrod3'
          }
      }
    },
    "exon:3'UTR:ensembl_havana_transcript": {
      glyph:{
          box:{
              height:6,
              bgcolor:'white',
              fgcolor:'goldenrod3'
          }
      }      
    }
  }


});
