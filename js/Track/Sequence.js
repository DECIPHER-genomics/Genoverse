Genoverse.Track.Sequence = Genoverse.Track.extend({

  // Defaults 
  name          : "Sequence",
  height        : 45,
  featureHeight : 20,
  featureSpacing: 0,
  yOffset       : 5,
  //complementary : true,
  chunkSize   : 1000,
  threshold   : 1e5,
  labelOverlay: true, 
  allData     : false,
  fontSize    : 10,
  fontFamily  : 'Verdana',
  fontWeight  : 'bold',
  dataType    : 'xml',
  fontColor   : '#FFFFFF',
  url         : 'http://www.ensembl.org/das/Homo_sapiens.GRCh37.reference/sequence?segment=__CHR__:__START__,__END__',

  colorMap      : {
    a : "#00986A",
    t : "#0772A1",
    g : "#FF8E00",
    c : "#FFDD73",
    n : "grey",
    default : "grey"
  },


  complementaryMap: {
    a: 't',
    t: 'a',
    g: 'c',
    c: 'g',
    n: 'n',
    default : 'n'
  },


  complement: function (sequence) {
    var track = this;
    return $.map(
      sequence.toLowerCase().split(''), 
      function(bp){ 
        return track.complementaryMap[bp] 
      }
    ).join('');    
  },


  init: function () {
    this.base();
    this.chunks = {};

    this.context.font  = this.font;
    this.bpLabelWidths = {
      a : this.context.measureText('a').width,
      t : this.context.measureText('t').width,
      g : this.context.measureText('g').width,
      c : this.context.measureText('c').width,
      n : this.context.measureText('n').width
    };

    if (this.featureSpacing > 0) this.yOffset = this.featureSpacing;
    this.labelYOffset = this.featureHeight/2 - this.fontHeight/2;
  },


  parseUrl: function (start, end) {
    var start = start - start % this.chunkSize + 1;
    var end = end + this.chunkSize - end % this.chunkSize;
    return this.base(start, end);
  },


  parseData: function (data) {
    var track = this;

    $(data).find('SEQUENCE').each(function (index, SEQUENCE) {

      var sequence = $(SEQUENCE).text();
      var start = parseInt(SEQUENCE.getAttribute('start'));

      // Check if the sequence is multi-line or not
      if (track.multiLine === undefined) {
        if (sequence.indexOf("\n") !== -1) {
          track.multiLine = true;
        } else {
          track.multiLine = false;
        }
      }

      if (track.multiLine) {
        sequence = sequence.replace(/\n/g, "");
      }

      for (var i=0; i<sequence.length; i+=track.chunkSize) {
        if (track.chunks[start+i]) continue;
        var feature = {
          id    : start + i,
          start : start + i,
          end   : start + i + track.chunkSize,
          y     : track.yOffset,
          sequence : sequence.substr(i, track.chunkSize),
        }
        track.chunks[feature.start] = feature;
        track.features.insert({ x: feature.start, w: track.chunkSize, y:0, h:1 }, feature);
      }

    });

  },


  draw: function (features, context, scale) {
    for (var i=0; i<features.length; i++) {
      this.drawSequence(features[i], context, scale);
    } 
  },


  drawSequence: function (feature, context, scale) {
    var bpWidth = scale;
    var drawLabels = this.bpLabelWidths.a < bpWidth;
    var labelsOffset = {
      a: (bpWidth - this.bpLabelWidths.a) / 2,
      t: (bpWidth - this.bpLabelWidths.t) / 2,
      g: (bpWidth - this.bpLabelWidths.g) / 2,
      c: (bpWidth - this.bpLabelWidths.c) / 2,
      n: (bpWidth - this.bpLabelWidths.n) / 2
    };

    for (var i = 0; i<feature.sequence.length; i++) {
      var bp = feature.sequence.substr(i,1);
      context.fillStyle = this.colorMap[bp];
      context.fillRect(feature.position[scale].X + i*bpWidth, feature.position[scale].Y, bpWidth, this.featureHeight);

      // if (complementary) {
      //   this.context.fillStyle = this.colorMap[this.complementaryMap[bp]];
      //   this.context.fillRect(scaledStart + i*bpWidth, yOffset + this.featureHeight, bpWidth, this.featureHeight);
      // }

      if (drawLabels) {
        context.fillStyle = this.fontColor;
        context.fillText(bp, feature.position[scale].X + i*bpWidth + (labelsOffset[bp] || labelsOffset.n), feature.position[scale].Y + this.labelYOffset);
        // if (complementary) {
        //   this.context.fillText(this.complementaryMap[bp], scaledStart + i*bpWidth + labelsOffset[this.complementaryMap[bp]], this.featureHeight + yOffset + this.labelYOffset);
        // }
      }
    }
  },


});