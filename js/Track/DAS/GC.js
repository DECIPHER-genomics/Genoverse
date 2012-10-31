Genoverse.Track.DAS.Sequence.GC = Genoverse.Track.DAS.Sequence.extend({

  // Defaults
  name         : "GC content",
  height       : 50,
  chunkSize    : 1000,
  threshold    : 10000,
  chunks       : {},
  labelOverlay : true, 
  allData      : false,
  dataType     : 'xml',
  source       : 'http://www.ensembl.org/das/Homo_sapiens.GRCh37.reference',


  init: function () {
    this.base();
    if (!this.url) this.url = this.source + '/sequence';
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
    var pieceSize = this.scale < 1 ? Math.floor(5/this.scale) : 5;//Math.floor(10/this.scale);
    var seen = {};

    features.sort(function(a,b) { return a-b });

    this.context.beginPath();
    //debugger;
    for (var i=0; i<features.length; i++) {
      var feature = this.chunks[features[i]];

      if (seen[feature.id])
        continue;
      seen[feature.id] = 1;

      var scaledStart = feature.start * this.scale - image.scaledStart;
      var scaledWidth = (feature.end - feature.start) * this.scale;    
      var bpWidth     = scaledWidth / this.chunkSize;
      var pieceWidth  = bpWidth * pieceSize;

      if (i == 0) {
        this.context.moveTo(scaledStart, this.height/2);
      }


      for (var j = 0; j<feature.sequence.length; j += pieceSize) {
        var piece = feature.sequence.substr(j, pieceSize);
        var score = 0;

        for (var k = 0; k<piece.length; k++) {
          var bp = piece.substr(k, 1);
          if (bp == 'g' || bp == 'c') {
            score++;
          }
        }

        this.context.lineTo(scaledStart + j*bpWidth + pieceWidth, this.height - this.height*score/pieceSize);
      }
    }

    this.context.lineWidth = 1;
    this.context.strokeStyle = "blue";
    this.context.stroke();
    this.context.closePath();
  },



});