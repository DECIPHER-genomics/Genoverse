Genoverse.Track.DASTranscript = Genoverse.Track.DAS.extend({

  config: {
    name           : "Transcript (DAS)", 
    dataType       : 'xml',
    bump           : true,
    height         : 400,
    source         : 'http://www.ensembl.org/das/Homo_sapiens.GRCh37.transcript',
    url            : 'http://www.ensembl.org/das/Homo_sapiens.GRCh37.transcript/features?segment=__CHR__:__START__,__END__',
    renderer       : 'transcript_label',
    featureHeight  : 10,
    decorations    : {},
    separateLabels : true,
    groups         : {}
  },


  setFeatureColor: function (feature) {
    feature.labelColor = '#FFFFFF';

    feature.colors = this.stylesheet[feature.type] || this.stylesheet.default;
    if (feature.colors.bgcolor && feature.colors.fgcolor && feature.colors.bgcolor != feature.colors.fgcolor) {
      feature.style = 'strokeRect';
    }

    feature.color = feature.colors.fgcolor;

    var match = /^grey(\d+)$/i.exec(feature.color);
    if (match) {
      var c = Math.round(match[1]*2.55);
      feature.color = "rgb("+c+","+c+","+c+")";
    }

    feature.labelColor = feature.color;
  },

  
  parseFeatures: function (data, bounds) {
    var features = this.base(data, bounds);
    var i = features.length;
    
    while (i--) {
      var feature = features[i];
      if (!feature.start || !feature.end) continue;

      //this.setFeatureColor(feature);

      if (feature.type.indexOf('exon:coding') === 0) continue;
      feature.style = 'strokeRect';

      if (feature.groups) {
        
        for (var j=0; j<feature.groups.length; j++) {

          if (this.groups[feature.groups[j].id]) {

            var group = this.groups[feature.groups[j].id];
            if (feature.start < group.start) group.start = feature.start;
            if (feature.end > group.end)     group.end   = feature.end;

            if (group.exons[feature.id] && group.exons[feature.id].width < feature.width) {
              group.exons[feature.id] = feature;
            }

            if (!group.new) {
              this.refresh = true;
              group.bounds      = {};
              group.bottom      = {};
              group.labelBottom = {};
              group.new         = true;
            }

          } else {
            this.groups[feature.groups[j].id] = $.extend({
              color       : 'black',
              labelColor  : 'black',
              label       : feature.groups[j].id,
              sort        : i,
              bounds      : {},
              visible     : {},
              bottom      : {},
              labelBottom : {},
              exons       : [],
              start       : feature.start,
              end         : feature.end,
              new         : 1
            }, feature.groups[j]);
          }

          this.groups[feature.groups[j].id].exons.push(feature);
          this.groups[feature.groups[j].id].exons[feature.id] = feature;
        }

      }
    }

    for (id in this.groups) {
      var group = this.groups[id];
      if (group.new) {
        group.label = group.id + ' ' + group.start + '-' + group.end;
        group.exons.sort(function (a, b) { return a.start - b.start });
        this.features.insert({ x: group.start, w: group.end - group.start, y:0, h:1 }, group);
      }
    }

    var result = this.features.search(bounds);

    console.log(result);
    return result;
  },


  refresh: function () {
    var browser = this.browser;
    //this.reset();
    this.dataRegion    = { start: 9e99, end: -9e99 };
    this.scaleSettings = {};    
    this.setScale();
    
    var start   = browser.dataRegion.start;
    var end     = browser.dataRegion.end;
    var width   = Math.round((end - start + 1) * this.scale);
    var overlay = browser.makeOverlays(width, [ this ]);
    
    $.when(this.makeImage(start, end, width, -browser.left, browser.scrollStart)).done(function (a) {
      $(a.target).show()
      a.img.drawBackground();
      
      browser.checkTrackSize();
      
      overlay.remove();
      overlay = null;
    });
  },


  draw: function (image, features) {
    var seen = {};

    this.positionFeatures(this.scaleFeatures(features), image.scaledStart, image.width);

    this.canvas.attr({ width: image.width, height: this.height });
    this.context.textBaseline = 'top';
    this.beforeDraw(image);

    var i = features.length;
    while (i--) {
      var feature = features[i];
      var bounds  = features[i].bounds[this.scale];
      if (!bounds || seen[feature.id]) continue;
      //seen[feature.id] = true;

      this.context.fillStyle = features[i].color;
      var j = feature.exons.length;
      while(j--) {
        this.context.strokeRect(
                       Math.floor(feature.exons[j].scaledStart - image.scaledStart)+0.5, 
                       Math.floor(bounds[0].y)+0.5, 
                       Math.floor(feature.exons[j].scaledEnd - feature.exons[j].scaledStart), 
                       this.featureHeight
        );

        if (j) 
          this.context.fillRect(
                             Math.floor(feature.exons[j-1].scaledEnd - image.scaledStart)+0.5, 
                             Math.round(bounds[0].y + this.featureHeight/2), 
                             Math.floor(feature.exons[j].scaledStart - feature.exons[j-1].scaledEnd)+0.5, 
                             1
          );
      }

      this.context.fillText(feature.label, bounds[1].x - image.scaledStart, bounds[1].y);
    }

    this.afterDraw(image);

    image.container.append(image.images.attr('src', this.canvas[0].toDataURL()));
  }


});