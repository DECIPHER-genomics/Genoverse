Genoverse.Track.DAS.Transcript = Genoverse.Track.DAS.extend({

  name           : "Transcript (DAS)", 
  dataType       : 'xml',
  bump           : true,
  height         : 200,
  dataBuffer     : 30000,
  source         : 'http://www.ensembl.org/das/Homo_sapiens.GRCh37.transcript',
  featureHeight  : 10,
  featureSpacing : 3,
  labels         : true,
  intronStyle    : { 
    type: 'bezierCurve',
    fgcolor: 'black',
  },


  parseData: function (data) {
    var track = this;
    var exons = track.base(data);
    this.groupExons(exons);
  },


  groupExons: function (exons) {
    //if (!this.groups) this.groups = {};
    
    for (var i=0; i<exons.length; i++) {

      var exon = exons[i];
      if (!exon.start || !exon.end) continue;

      //this.setFeatureStyle(exon);

      if (exon.groups) {

        for (var j=0; j<exon.groups.length; j++) {
          if (this.display && this.display.group && !this.display.group[exon.groups[j].type]) continue;

          if (this.featuresById[exon.groups[j].id]) {
            var transcript  = this.featuresById[exon.groups[j].id];

            //if (!transcript.new) {
              this.features.remove({ x: transcript.start, w: transcript.width, y:0, h:1 }, transcript);
              this.redraw    = true;
              transcript.new = true;
            //}

            transcript.start = Math.min(transcript.start, exon.start);
            transcript.end   = Math.max(transcript.end,   exon.end);
            transcript.width = transcript.end - transcript.start + 1;
          } else {
            this.featuresById[exon.groups[j].id] = $.extend({
              exons       : [],
              start       : exon.start,
              end         : exon.end,
              new         : true
            }, exon.groups[j]);
          }

          this.featuresById[exon.groups[j].id].exons.push(exon);
        }

      }
    }

    for (id in this.featuresById) {
      var transcript = this.featuresById[id];
      if (transcript.new) {
        transcript.new = false;
        if (!transcript.label) transcript.label = transcript.id;
        transcript.exons.sort(function (a, b) { var s = a.start - b.start; return s ? s : a.width - b.width });
        for (var i=0; i<transcript.exons.length; i++) {
          transcript.exons[i].localStart = transcript.exons[i].start - transcript.start;
          transcript.exons[i].localEnd   = transcript.exons[i].end - transcript.start;
        }
        //transcript.type = 'group';

        delete this.featuresById[transcript.id];
        this.insertFeature(transcript);
      }
    }
  },


  render: function (features, img) {
    if (this.redraw) {
      this.redraw = false;
      return this.reDraw();
    }

    var track = this;
    var base  = this.base;

    $.when(track.stylesheetRequest).always(function(){
      base.apply(track, [features, img]);
    });
  },


  drawFeature: function(transcript, context, scale) {
    if (!transcript.exons || !transcript.exons.length) return;

    for (var i=0; i<transcript.exons.length; i++) {
      var exon = transcript.exons[i];
      this.base(
        $.extend({}, exon, {
          x: transcript.x + (exon.localStart * scale), 
          y: transcript.y,
          width: exon.width * scale,
          height: transcript.height
        }),
        context, 
        scale
      );

      // Introns (connections between exons)
      if (transcript.exons[i+1] && exon.end < transcript.exons[i+1].start) {
        this.base(
          {
            x: transcript.x + (exon.localStart + exon.width)*scale,
            y: transcript.y,
            width: (transcript.exons[i+1].start - exon.end)*scale,
            orientation: exon.orientation,
            style: this.intronStyle
          },
          context, 
          scale
        );
      }
    }

    context.fillStyle = 'black';
    context.fillText(transcript.label, transcript.x, transcript.y + transcript.height + 2);
  },

});