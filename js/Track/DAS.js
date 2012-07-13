Genoverse.Track.DAS = Genoverse.Track.Gene.extend({

  init: function () {
    this.base();
    if (!this.url) this.url = this.source + '/features';
    if (this.display) {
      for (var key in this.display) {
        if (this.display[key] instanceof Array) {
          for (var i=0; i<this.display[key].length; i++) {
            this.display[key][this.display[key][i]] = 1;
          }
        } else {
          var value = this.display[key];
          this.display[key] = {};
          this.display[key][value] = 1;
        }
      }
    }

    this.getStylesheet();
  },


  getQueryString: function (start, end) {
    var chr      = this.browser.chr;
    var start    = this.allData ? 1 : start;
    var end      = this.allData ? this.browser.chromosomeSize : end;

    // return 'segment=' + chr + ':' + start + ',' + end + '&' + 
    //        (this.types instanceof Array ? jQuery.map(this.types, function(type){ return "type=" + type }).join('&') : '');

    return $.extend({ 
      segment: chr + ':' + start + ',' + end, 
    }, this.filter);
  },


  getStylesheet: function () {
    this.stylesheetRequest = $.ajax({
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


  // getQueryString: function (start, end) {
  //   return this.base(start - (end-start)*10, end + (end-start)*10);
  // },

  parseStylesheet: function (XML) {
    var stylesheet = {};
    var track = this;

    $(XML).find('TYPE').each(function (i, TYPE) {
      var glyphs = [];
      
      $(TYPE).find('GLYPH>*').each(function(i, GLYPH) {
        var glyph = { type: $(GLYPH).prop('tagName').toLowerCase() };

        $(GLYPH).children().each(function(i, PROPERTY){
          glyph[$(PROPERTY).prop('tagName').toLowerCase()] = $(PROPERTY).text();
        })

        glyph.fgcolor = glyph.fgcolor ? track.mapColor(glyph.fgcolor) : track.stylesheet.default[0].fgcolor;
        glyph.bgcolor = glyph.bgcolor ? track.mapColor(glyph.bgcolor) : null;

        glyphs.push(glyph);
      });

      // Take first glyph as default
      for (var key in glyphs[0]) {
        glyphs[key] = glyphs[0][key];
      }

      stylesheet[TYPE.getAttribute('id')] = glyphs;
    });

    this.stylesheet = $.extend(stylesheet, this.stylesheet);

    // TODO: check for existing images? or if any drawing has started 
    //this.redraw = true;
  },


  drawFeature: function (feature, bounds) {
    var style = this.stylesheet[feature.type] || this.stylesheet.default;
    bounds.x = Math.floor(bounds.x) + 0.5;
    bounds.y = Math.floor(bounds.y) + 0.5;
    bounds.w = Math.round(bounds.w);

    switch (style.type) {

      case 'line' :
        this.context.strokeStyle = style.fgcolor;
        this.context.strokeRect(bounds.x, bounds.y + this.featureHeight/2, bounds.w, 0);
      break;

      case 'box':
        if (!style.bgcolor || style.bgcolor == this.mapColor('white')) {
          this.context.strokeStyle = style.fgcolor;
          this.context.strokeRect(bounds.x, bounds.y, bounds.w, bounds.h);
        } else {
          this.context.fillStyle = style.bgcolor;
          this.context.fillRect(bounds.x, bounds.y, bounds.w, bounds.h);
          if (style.fgcolor) {
            this.context.strokeStyle = style.fgcolor;
            this.context.strokeRect(bounds.x, bounds.y, bounds.w, bounds.h);
          }
        }
      break;

      default:
        this.context.strokeStyle = style.fgcolor;
        this.context.strokeRect(bounds.x, bounds.y, bounds.w, bounds.h);
      break;
    }
  },


  drawLabel: function (feature, bounds) {
    var style = this.stylesheet[feature.type] || this.stylesheet.default;
    this.context.fillStyle = style.fgcolor;
    this.context.fillText(feature.label, bounds.x, bounds.y);
  },


  mapColor: function (DASColor) {
    DASColor = DASColor.toLowerCase();

    if (DASColorMap[DASColor]) {
      return DASColorMap[DASColor];
    } 

    var match = /^gr[ea]y(\d+)$/i.exec(DASColor);
    if (match) {
      var c = Math.round(match[1]*2.55);
      return "rgb("+c+","+c+","+c+")";
    }

    // Can't workout color, return grey
    return 'grey';
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


  stylesheet: {
    default: {
      bgcolor: 'grey',
      fgcolor: 'grey',
      type: 'box'
    },
    group: {
      fgcolor: 'black',
      type: 'line'
    },
  },

});
