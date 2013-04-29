Genoverse.on('afterInit', function () {
  this.karyotype = $('<div class="gv_chromosome" />');
  var chromosome = this.genome[this.chr];

  for (var i=0; i<chromosome.bands.length; i++) {
    var left  = 100 * chromosome.bands[i].start / chromosome.size;
    var width = (100 * chromosome.bands[i].end / chromosome.size) - left;
    this.karyotype.append('<div title="'+ chromosome.bands[i].id +'" class="gv_band '+ chromosome.bands[i].type +'" style="left:'+ left +'%;width:'+ width +'%" />');
  }

  var browser = this;
  this.karyotypeViewPoint = $('<div class="gv_karyotype_viewpoint" />').draggable({
    axis: "x",
    containment: "parent",
    stop: function( event, ui ) {
      var left  = $(this).position().left;
      var start = left * browser.chromosomeSize / browser.karyotypeWidth;
      var end   = (left + $(this).width())  * browser.chromosomeSize / browser.karyotypeWidth;
      browser.setRange(start, end, true, true);
    }
  });

  this.karyotype.append(this.karyotypeViewPoint);
  this.karyotypeContainer.html(this.karyotype);

  this.karyotypeWidth = this.karyotype.width();
  var left  = this.karyotypeWidth * this.start / chromosome.size;
  var width = (this.karyotypeWidth * this.end / chromosome.size) - left;
  this.karyotypeViewPoint.css({ left: left , width: width });
});

Genoverse.on('afterMove', function () {
  if (this.karyotypeViewPoint) {
    var left  = this.karyotypeWidth * this.start / this.chromosomeSize;
    this.karyotypeViewPoint.css({ left: left });  
  }
});

Genoverse.on('afterSetRange', function () {
  if (this.karyotypeViewPoint) {
    var left  = this.karyotypeWidth * this.start / this.chromosomeSize;
    var width = (this.karyotypeWidth * this.end / this.chromosomeSize) - left;
    this.karyotypeViewPoint.css({ left: left, width: width });  
  }
});