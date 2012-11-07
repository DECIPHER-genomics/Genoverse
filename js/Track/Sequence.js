Genoverse.Track.Sequence = Genoverse.Track.extend({

  // Defaults 
  name          : "Sequence",
  height        : 45,
  featureHeight : 20,
  featureSpacing: 0,
  yOffset       : 5,
  complementary : true,
  chunkSize     : 1000,
  //threshold     : 2000,
  labelOverlay  : true, 
  allData       : false,
  fontSize      : 10,
  fontFamily    : 'Verdana',
  fontWeight    : 'bold',
  dataType      : 'xml',
  fontColor     : '#FFFFFF',
  source        : 'http://www.ensembl.org/das/Homo_sapiens.GRCh37.reference',
  colorMap      : {
    a : "#FFAA00",
    t : "#FFDD73",
    g : "#0772A1",
    c : "#009999",
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


  parseData: function (data, start, end) {
    var sequence = data;

    // Check if the sequence is multi-line or not
    if (this.multiLine === undefined) {
      if (sequence.indexOf("\n") !== -1) {
        this.multiLine = true;
      } else {
        this.multiLine = false;
      }
    }

    if (this.multiLine) {
      sequence = sequence.replace(/\n/g, "");
    }

    for (var i=0; i<sequence.length; i+=this.chunkSize) {
      if (this.chunks[start+i]) continue;
      var feature = {
        id    : start + i,
        start : start + i,
        end   : start + i + this.chunkSize,
        y     : this.yOffset,
        sequence : sequence.substr(i, this.chunkSize),
      }
      this.chunks[feature.start] = feature;
      this.features.insert({ x: feature.start, w: this.chunkSize, y:0, h:1 }, feature);
    }
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
        context.fillText(bp, feature.position[scale].X + i*bpWidth + labelsOffset[bp], feature.position[scale].Y + this.labelYOffset);
        // if (complementary) {
        //   this.context.fillText(this.complementaryMap[bp], scaledStart + i*bpWidth + labelsOffset[this.complementaryMap[bp]], this.featureHeight + yOffset + this.labelYOffset);
        // }
      }
    }
  },


});