Genoverse.Track.DASSequence = Genoverse.Track.extend({

  config: {
    name          : "Sequence",
    height        : 45,
    featureHeight : 20,
    labelYOffset  : 15,
    complementary : true,
    chunkSize     : 1000,
    threshold     : 2000,
    chunks        : {},
    labelOverlay  : true, 
    allData       : false,
    font          : "bold 8pt Verdana",
    dataType      : 'xml',
    textColor     : 'white',
    colorMap : {
      a : "#FFAA00",
      t : "#FFDD73",
      g : "#0772A1",
      c : "#009999",
      n : "grey",
      default : "grey"
    },
    source       : 'http://www.ensembl.org/das/Homo_sapiens.GRCh37.reference'
  },


  complementaryMap: {
    a: 't',
    t: 'a',
    g: 'c',
    c: 'g',
    n: 'n',
    default : 'n'
  },


  init: function () {
    this.base();
    if (!this.url) this.url = this.source + '/sequence';

    this.context.font  = this.font;
    this.bpLabelWidths = {
      a : this.context.measureText('a').width,
      t : this.context.measureText('t').width,
      g : this.context.measureText('g').width,
      c : this.context.measureText('c').width,
      n : this.context.measureText('n').width
    };

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
      var feature     = this.chunks[features[i]];
      var scaledStart = feature.start * this.scale - image.scaledStart;
      var scaledWidth = (feature.end - feature.start) * this.scale;    
      var bpWidth     = scaledWidth / this.chunkSize;

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
        this.context.fillRect(scaledStart + j*bpWidth, 2, bpWidth, this.featureHeight);

        if (this.complementary) {
          this.context.fillStyle = this.colorMap[this.complementaryMap[bp]];
          this.context.fillRect(scaledStart + j*bpWidth, 2+this.featureHeight, bpWidth, this.featureHeight);
        }

        if (drawLabels) {
          this.context.fillStyle = this.textColor;
          this.context.fillText(bp, scaledStart + j*bpWidth + labelsOffset[bp], this.labelYOffset);
          if (this.complementary) {
            this.context.fillText(this.complementaryMap[bp], scaledStart + j*bpWidth + labelsOffset[this.complementaryMap[bp]], this.featureHeight + this.labelYOffset);
          }
        }
      }
    }
  },



});