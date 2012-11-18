Genoverse.Track.DAS = Genoverse.Track.extend({

  // Defualts 
  dataType : 'xml',

  init: function () {
    this.base();

    if (!this.url) this.url = this.source + '/features?segment=__CHR__:__START__,__END__';

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


  getStylesheet: function () {
    this.stylesheetRequest = $.ajax({
      url      : (this.browser.proxy ? this.browser.proxy + '?url=' : '') + this.source + '/stylesheet',
      dataType : 'xml',
      context  : this,
      timeout  : 5000,
      error    : function (jqXHR, textStatus, errorThrown) {
        // Warn about the error?
      },
      success  : this.parseStylesheet,
    });
  },


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

        glyph.fgcolor = glyph.fgcolor ? track.mapColor(glyph.fgcolor) : track._stylesheet.default.fgcolor;
        glyph.bgcolor = glyph.bgcolor ? track.mapColor(glyph.bgcolor) : null;

        glyphs.push(glyph);
      });

      // Take first glyph as default
      for (var key in glyphs[0]) {
        glyphs[key] = glyphs[0][key];
      }

      stylesheet[TYPE.getAttribute('id')] = glyphs;
    });

    this.stylesheet = $.extend(this._stylesheet, stylesheet, this.stylesheet);

    // TODO: check for existing images? or if any drawing has started 
    //this.redraw = true;
  },


  drawFeature: function (feature, context, scale) {
    var style = feature.style || this.stylesheet[feature.type] || this.stylesheet.default;

    feature.x = Math.floor(feature.x) + 0.5;
    feature.y = Math.floor(feature.y) + 0.5;
    feature.width = Math.floor(feature.width);

    // controlY and middleY for line, hat and bezierCurve
    feature.controlY = (feature.orientation == '-') ? feature.y + this.featureHeight : feature.y;
    feature.middleY  = feature.y + this.featureHeight/2;


    context.lineWidth = 1;

    switch (style.type) {

      // case 'line' :
      //   this.context.strokeStyle = style.fgcolor;
      //   this.context.strokeRect(bounds.x, bounds.middleY, bounds.w, 0);
      // break;

      case 'hat' :
        context.strokeStyle = style.fgcolor;
        context.lineWidth = 0.5;
        context.beginPath();
        context.moveTo(feature.x, feature.middleY);
        context.lineTo(feature.x + feature.width/2, feature.controlY);
        context.lineTo(feature.x + feature.width, feature.middleY);
        context.stroke();
        context.closePath();
      break;

      case 'bezierCurve' :
        context.strokeStyle = style.fgcolor;
        context.lineWidth   = 0.4;
        context.beginPath();
        context.moveTo(feature.x, feature.middleY);
        context.bezierCurveTo(feature.x, feature.controlY, feature.x + feature.width, feature.controlY, feature.x + feature.width, feature.middleY);
        context.stroke();
        context.closePath();
      break;

      case 'triangle' :
        context.strokeStyle = style.fgcolor;
        context.beginPath();
        context.moveTo(feature.x, feature.y);
        context.lineTo(feature.x, feature.y + this.featureHeight);
        context.lineTo(feature.x + feature.width, feature.middleY);
        context.lineTo(feature.x, feature.y);
        context.stroke();
        context.closePath();
      break;

      case 'box':
        if (!style.bgcolor || style.bgcolor == this.mapColor('white')) {
          context.strokeStyle = style.fgcolor;
          context.strokeRect(feature.x, feature.y, feature.width, feature.height);
        } else {
          context.fillStyle = style.bgcolor;
          context.fillRect(feature.x, feature.y, feature.width, feature.height);
          if (style.fgcolor) {
            context.strokeStyle = style.fgcolor;
            context.strokeRect(feature.x, feature.y, feature.width, feature.height);
          }
        }
      break;

      default:
        context.strokeStyle = style.fgcolor;
        context.strokeRect(feature.x, feature.y, feature.width, feature.height);
      break;
    }
  },


  drawLabel: function (feature, bounds) {
    var style = this.stylesheet[feature.type] || this.stylesheet.default;
    this.context.fillStyle = style.fgcolor;
    this.context.fillText(feature.label, bounds.x, bounds.y);
  },


  mapColor: function (DASColor) {
    if (DASColor.indexOf('#')==0) 
      return DASColor;
    
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


  parseData: function (data) {
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
      feature.width = feature.end - feature.start + 1;

      feature.links  = {};
      feature.notes  = [];

      $(FEATURE).find('LINK').each(function (i, LINK) {
        feature.links[LINK.getAttribute('href')] = $(LINK).text() || 'link';
      });

      $(FEATURE).find('NOTE').each(function (i, NOTE) { 
        feature.notes.push($(NOTE).text());
      });

      $(FEATURE).find('GROUP,PARENT').each(function (i, GROUP) {
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

      // $(FEATURE).find('PARENT').each(function (i, PARENT) {
      //   if (!feature.parents) feature.parents = [];
      //   feature.parents.push({ id: PARENT.getAttribute('id') });
      // });

      features.push(feature)
    });

    return features;
  },

  _stylesheet: {
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