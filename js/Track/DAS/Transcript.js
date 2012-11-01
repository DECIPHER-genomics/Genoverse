Genoverse.Track.DAS.Transcript = Genoverse.Track.DAS.extend({

  name           : "Transcript (DAS)", 
  dataType       : 'xml',
  bump           : true,
  height         : 200,
  source         : 'http://www.ensembl.org/das/Homo_sapiens.GRCh37.transcript',
  renderer       : 'transcript_label',
  featureHeight  : 10,
  decorations    : {},
  separateLabels : true,
  groups         : {},

  
  parseData: function (data, bounds) {
    var track = this;
    var features = track.base(data, bounds);
    this.groupFeatures(features);

    return this.features.search(bounds);
  },


  groupFeatures: function (features) {
    //if (!this.groups) this.groups = {};
    
    for (var i=0; i<features.length; i++) {

      var feature = features[i];
      if (!feature.start || !feature.end) continue;

      //this.setFeatureStyle(feature);

      if (feature.groups) {

        for (var j=0; j<feature.groups.length; j++) {
          if (this.display && this.display.group && !this.display.group[feature.groups[j].type]) continue;

          if (this.groups[feature.groups[j].id]) {

            var group  = this.groups[feature.groups[j].id];

            if (feature.start < group.start) group.start = feature.start;
            if (feature.end > group.end) group.end = feature.end;

            if (!group.new) {
              this.redraw       = true;
              group.bounds      = {};
              group.bottom      = {};
              group.labelBottom = {};
              group.new         = true;
            }

          } else {
            this.groups[feature.groups[j].id] = $.extend({
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
        }
      }
    }

    for (id in this.groups) {
      var group = this.groups[id];
      if (group.new) {
        if (!group.label) group.label = group.id;
        group.exons.sort(function (a, b) { var s = a.start - b.start; return s ? s : a.width - b.width });
        group.type = 'group';
        this.features.insert({ x: group.start, w: group.end - group.start, y:0, h:1 }, group.id);
      }
    }
  },


  reDraw: function () {
    var browser = this.browser;
    //this.reset();
    //this.dataRegion    = { start: 9e99, end: -9e99 };
    this.scaleSettings = {};    
    this.setScale();
    
    var start   = browser.dataRegion.start;
    var end     = browser.dataRegion.end;
    var width   = Math.round((end - start + 1) * this.scale);
    //var overlay = browser.makeOverlays(width, [ this ]);
    
    $.when(this.makeImage(start, end, width, -browser.left, browser.scrollStart)).done(function (a) {
      $(a.target).show()
      a.img.drawBackground();
      browser.checkTrackSize();
    });
  },


  draw: function (image, features) {

    if (this.redraw) {
      this.canvas.attr({ width: image.width, height: this.fullHeight });
      this.context.textBaseline = 'top';
      this.beforeDraw(image);
      this.redraw = false; 
      this.afterDraw(image);
      image.container.append(image.images.attr('src', this.canvas[0].toDataURL()));
      return this.reDraw(); 
    } 

    var track = this;

    $.when(track.stylesheetRequest).always(function(){
      features.every(function(element, index, array){
          array[index] = track.groups[element];
          array[index].bounds = {};
          return true;
      });

      track.positionFeatures(track.scaleFeatures(features), image.scaledStart, image.width);

      track.canvas.attr({ width: image.width, height: track.fullHeight });
      track.context.textBaseline = 'top';
      track.beforeDraw(image);

      track.drawFeatures(image, features);


      track.afterDraw(image);
      image.container.append(image.images.attr('src', track.canvas[0].toDataURL()));    
    });

  },


  drawFeatures: function (image, features) {
    var seen = {};
    
    //this.context.globalAlpha = 0.5;

    for (var i=0; i<features.length; i++) {
      var feature = features[i];
      feature.new = false;
      var bounds  = feature.bounds[this.scale];
      if (!bounds || seen[feature.id]) continue;
      seen[feature.id] = 1;

      // this.drawFeature(
      //   feature, 
      //   {
      //     x: feature.scaledStart - image.scaledStart, 
      //     y: bounds[0].y, 
      //     w: feature.scaledEnd - feature.scaledStart, 
      //     h: this.featureHeight 
      //   }
      // );

      var j = feature.exons.length;
      for (var j=0; j<feature.exons.length; j++) {
        var exon = feature.exons[j];
        this.drawFeature(
          exon, 
          {
            x: exon.scaledStart - image.scaledStart, 
            y: bounds[0].y, 
            w: exon.scaledEnd - exon.scaledStart, 
            h: this.featureHeight
          }
        );

        // Introns (connections between exons)
        if (feature.exons[j+1] && exon.scaledEnd < feature.exons[j+1].scaledStart) {
          this.drawFeature(
            {
              orientation: exon.orientation,
              style: $.extend(
                {},
                this.stylesheet[feature.type] || { fgcolog: 'black' },
                { type: 'bezierCurve' }
              )
            },
            {
              x: exon.scaledEnd - image.scaledStart, 
              y: bounds[0].y,
              w: feature.exons[j+1].scaledStart - exon.scaledEnd
            }
          );
        }

      }

      if (feature.label && bounds[1]) {
        this.drawLabel(feature, { x: bounds[1].x - image.scaledStart, y: bounds[1].y });
      }

    }
  }

});