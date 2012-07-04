Genoverse.Track.DASTranscript = Genoverse.Track.DAS.extend({

  config: {
    name     : "Transcript (DAS)", 
    dataType : 'xml',
    bump     : true,
    height   : 100,
    url      : 'http://www.ensembl.org/das/Homo_sapiens.GRCh37.transcript/features?segment=__CHR__:__START__,__END__',
    renderer : 'transcript_label'
  },


  // stylesheet : {
  //   "default" : { bgcolor: 'grey50', fgcolor: 'grey50' },
  //   "exon:coding:havana"      : { bgcolor: 'dodgerblue4', fgcolor: 'dodgerblue4' },
  //   "exon:non_coding:ensembl" : { bgcolor: 'white', fgcolor: 'rust' },
  //   "exon:coding:ensembl_havana_transcript" : { bgcolor: 'goldenrod3', fgcolor: 'goldenrod3' },
  //   "exon:5'UTR:ensembl_havana_transcript"  : { bgcolor: 'white',      fgcolor: 'goldenrod3' },
  //   "exon:coding:ensembl_havana_transcript" : { bgcolor: 'goldenrod3', fgcolor: 'goldenrod3' },
  //   "exon:3'UTR:ensembl_havana_transcript"  : { bgcolor: 'white',      fgcolor: 'goldenrod3' }
  // },

  stylesheet : {
    "default" : { bgcolor: 'grey50', fgcolor: 'grey50' },
    "exon:coding:havana"      : { bgcolor: 'dodgerblue4', fgcolor: 'dodgerblue4' },
    "exon:non_coding:ensembl" : { bgcolor: 'white', fgcolor: 'rust' },
    "exon:coding:ensembl_havana_transcript" : { bgcolor: 'goldenrod3', fgcolor: 'goldenrod3' },
    "exon:5'UTR:ensembl_havana_transcript"  : { bgcolor: 'white',      fgcolor: 'goldenrod3' },
    "exon:coding:ensembl_havana_transcript" : { bgcolor: 'goldenrod3', fgcolor: 'goldenrod3' },
    "exon:3'UTR:ensembl_havana_transcript"  : { bgcolor: 'white',      fgcolor: 'goldenrod3' }
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
    var groups = {};
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
          if (groups[feature.groups[j].id]) {
            if (feature.start < groups[feature.groups[j].id].start) groups[feature.groups[j].id].start = feature.start;
            if (feature.end > groups[feature.groups[j].id].end)     groups[feature.groups[j].id].end   = feature.end;
          } else {
            groups[feature.groups[j].id] = $.merge({
              color       : 'black',
              labelColor  : 'black',
              sort        : i,
              bounds      : {},
              visible     : {},
              bottom      : {},
              labelBottom : {},
              exons       : [],
              start       : feature.start,
              end         : feature.end
            }, feature.groups[j]);
          }

          groups[feature.groups[j].id].exons.push(feature);
        }
      }
    }

    for (id in groups) {
      var group = groups[id];
      this.features.insert({ x: group.start, w: group.end - group.start, y:0, h:1 }, group);
    }

    var result = this.features.search(bounds);

    console.log(result);
    return result;
  },

});