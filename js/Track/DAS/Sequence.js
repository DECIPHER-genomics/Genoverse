Genoverse.Track.DAS.Sequence = Genoverse.Track.extend({

  // Defaults 
  name          : "Sequence",
  height        : 45,
  featureHeight : 20,
  yOffset       : 2,
  complementary : true,
  chunkSize     : 1000,
  threshold     : 2000,
  labelOverlay  : true, 
  allData       : false,
  fontSize      : 10,
  fontFamily    : 'Verdana',
  fontWeight    : 'bold',
  dataType      : 'xml',
  textColor     : 'white',
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

    if (!this.url) this.url = this.source + '/sequence';

    this.context.font  = this.font;
    this.bpLabelWidths = {
      a : this.context.measureText('a').width,
      t : this.context.measureText('t').width,
      g : this.context.measureText('g').width,
      c : this.context.measureText('c').width,
      n : this.context.measureText('n').width
    };

    this.labelYOffset = this.featureHeight/2 + this.fontHeight/4;

  },


  getQueryString: function (start, end) {
    var start = start - start % this.chunkSize + 1;
    var end = end + this.chunkSize - end % this.chunkSize;
    return 'segment=' + this.browser.chr + ':' + start + ',' + end;
  },


  parseFeatures: function (data, bounds) {
    var track = this;
    var features = new Array();
    //debugger;
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
          id    : start+i,
          start : start+i,
          end   : start + i + track.chunkSize,
          sequence : sequence.substr(i, track.chunkSize),
        }
        track.chunks[feature.start] = feature;

        track.features.insert({ x: feature.start, w: track.chunkSize, y:0, h:1 }, feature.id);
      }

    });

    return this.features.search(bounds);
  },


  draw: function (image, features) {

    if (this.redraw) {
      this.canvas.attr({ width: image.width, height: this.height });
      this.context.textBaseline = 'top';
      this.beforeDraw(image);
      this.redraw = false; 
      this.afterDraw(image);
      image.container.append(image.images.attr('src', this.canvas[0].toDataURL()));
      return this.reDraw(); 
    } 

    var track = this;

    track.canvas.attr({ width: image.width, height: track.height });
    track.beforeDraw(image);

    track.drawFeatures(image, features);

    track.afterDraw(image);
    image.container.append(image.images.attr('src', track.canvas[0].toDataURL()));    
  },


  drawFeatures: function (image, features) {
    for (var i=0; i<features.length; i++) {
      this.drawSequence(image, this.chunks[features[i]]);
    }
  },

  drawSequence: function (image, feature, yOffset, xOffset, complementary) {
    var complementary = complementary !== undefined ? complementary : this.complementary;
    var yOffset       = yOffset !== undefined ? yOffset : this.yOffset;
    var scaledStart   = feature.start * this.scale - image.scaledStart + (xOffset || 0);
    var scaledWidth   = (feature.end - feature.start) * this.scale;    
    var bpWidth       = this.scale;

    var drawLabels = this.bpLabelWidths.a < bpWidth;
    var labelsOffset = {
      a: (bpWidth - this.bpLabelWidths.a) / 2,
      t: (bpWidth - this.bpLabelWidths.t) / 2,
      g: (bpWidth - this.bpLabelWidths.g) / 2,
      c: (bpWidth - this.bpLabelWidths.c) / 2,
      n: (bpWidth - this.bpLabelWidths.n) / 2
    };

    this.context.font  = this.font;

    for (var j = 0; j<feature.sequence.length; j++) {
      var bp = feature.sequence.substr(j,1);
      this.context.fillStyle = this.colorMap[bp];
      this.context.fillRect(scaledStart + j*bpWidth, yOffset, bpWidth, this.featureHeight);

      if (complementary) {
        this.context.fillStyle = this.colorMap[this.complementaryMap[bp]];
        this.context.fillRect(scaledStart + j*bpWidth, yOffset + this.featureHeight, bpWidth, this.featureHeight);
      }

      if (drawLabels) {
        this.context.fillStyle = this.textColor;
        this.context.fillText(bp, scaledStart + j*bpWidth + labelsOffset[bp], yOffset + this.labelYOffset);
        if (complementary) {
          this.context.fillText(this.complementaryMap[bp], scaledStart + j*bpWidth + labelsOffset[this.complementaryMap[bp]], this.featureHeight + yOffset + this.labelYOffset);
        }
      }
    }
  },


});