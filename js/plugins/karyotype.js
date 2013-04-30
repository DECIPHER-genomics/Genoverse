Genoverse.on('afterInit', function () {
  this.karyotype = $('<div class="gv_chromosome" />');
  var chromosome = this.genome[this.chr];

  for (var i=0; i<chromosome.bands.length; i++) {
    var left  = 100 * chromosome.bands[i].start / chromosome.size;
    var width = (100 * chromosome.bands[i].end / chromosome.size) - left;
    this.karyotype.append('<div title="'+ chromosome.bands[i].id +'" class="gv_band '+ chromosome.bands[i].type +'" style="left:'+ left +'%;width:'+ width +'%" />');
  }

  this.karyotypeContainer.html(this.karyotype);

  var browser = this;
  var changePercentToPixels = function () {
    var left  = browser.karyotypeWidth * this.start / browser.chromosomeSize;
    var width = (browser.karyotypeWidth * this.end / browser.chromosomeSize) - left;
    browser.karyotypeViewPoint.css({ left: left , width: width });
  };
  this.karyotypeViewPoint = $('<div class="gv_karyotype_viewpoint" />').draggable({
    axis: "x",
    containment: "parent",
    start: function( event, ui ) {
      if (!browser.karyotypeWidth) {
        browser.karyotypeWidth = browser.karyotype.innerWidth();
        changePercentToPixels();
      }
    },
    stop: function( event, ui ) {
      var left  = $(this).position().left;
      var start = left * browser.chromosomeSize / browser.karyotypeWidth;
      var end   = (left + $(this).width())  * browser.chromosomeSize / browser.karyotypeWidth;
      browser.start = start;
      browser.end   = end;
      browser.reset();
    }
  }).resizable({
    handles: "e, w",
    //containment: "parent", - changes height as well :(
    start: function( event, ui ) {
      if (!browser.karyotypeWidth) {
        browser.karyotypeWidth = browser.karyotype.innerWidth();
        changePercentToPixels();
      }
    },
    resize: function(event, ui) {
      ui.element.css({ left: Math.max(0, ui.position.left) });
      if (ui.position.left > 0) {
        ui.element.width(Math.min(ui.size.width, ui.element.parent().width() - ui.position.left));
      } else {
        ui.element.width(ui.size.width + ui.position.left);
      }
    },
    stop: function( event, ui ) {
      var left  = $(this).position().left;
      var start = left * browser.chromosomeSize / browser.karyotypeWidth;
      var end   = (left + $(this).width())  * browser.chromosomeSize / browser.karyotypeWidth;
      browser.start = start;
      browser.end   = end;
      browser.reset();
    }    
  });

  this.karyotype.append(this.karyotypeViewPoint);
  var left  = 100 * this.start / chromosome.size;
  var width = (100 * this.end / chromosome.size) - left;
  this.karyotypeViewPoint.css({ left: left +'%' , width: width +'%' });
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