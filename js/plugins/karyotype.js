
Genoverse.on('afterInit afterReset', function () {
  var browser = this;
  if (!(this.karyotype && this.karyotype.data('chr') == this.chr)) {

    this.karyotype = $('<div class="gv_chromosome" data-chr="'+ this.chr +'" />');
    var chromosome = this.genome && this.genome[this.chr] ? this.genome[this.chr] : { size : this.chromosomeSize, bands : [] };

    for (var i=0; i<chromosome.bands.length; i++) {
      var left  = 100 * chromosome.bands[i].start / chromosome.size;
      var width = (100 * chromosome.bands[i].end / chromosome.size) - left;
      var band  = $('<div title="'+ chromosome.bands[i].id +'" class="gv_band '+ chromosome.bands[i].type +'" style="left:'+ left +'%;width:'+ width +'%">&nbsp<wbr/>'+ chromosome.bands[i].id +'</div>')
      band.data({
        start : chromosome.bands[i].start,
        end   : chromosome.bands[i].end
      }).click(function() {
        browser.start = $(this).data('start');
        browser.end   = $(this).data('end');
        browser.reset();
        browser.updateURL();
      }).appendTo(this.karyotype);
    }

    // this.karyotypeContainer.on('mousedown', function(e) {

    // });

    this.karyotypeContainer.html(this.karyotype);

    var followViewpoint = function () {
      var left      = $(this).position().left;
      var start     = left * browser.chromosomeSize / browser.karyotypeWidth;
      var end       = (left + $(this).width()) * browser.chromosomeSize / browser.karyotypeWidth;
      browser.start = start;
      browser.end   = end;
      browser.reset();
      browser.updateURL();
    };

    this.karyotypeViewPoint = $('<div class="gv_karyotype_viewpoint" style="display:none;" />').draggable({
      axis: "x",
      containment: "parent",
      stop: function( event, ui ) {
        followViewpoint.apply(this);
      }
    }).resizable({
      handles: "e, w",
      //containment: "parent", - changes height as well :(
      resize: function(event, ui) {
        ui.element.css({ left: Math.max(0, ui.position.left) });
        if (ui.position.left > 0) {
          ui.element.width(Math.min(ui.size.width, ui.element.parent().width() - ui.position.left));
        } else {
          ui.element.width(ui.size.width + ui.position.left);
        }
      },
      stop: function( event, ui ) {
        followViewpoint.apply(this);
      }    
    });

    this.karyotype.append(this.karyotypeViewPoint);

    setTimeout(function () {
      browser.karyotypeWidth = browser.karyotype.innerWidth();
      var left  = browser.karyotypeWidth * browser.start / chromosome.size;
      var width = (browser.karyotypeWidth * browser.end / chromosome.size) - left;
      browser.karyotypeViewPoint.css({ left: left , width: width }).fadeIn('fast');    
    }, 1000);

  }
});

Genoverse.on('afterMove', function () {
  if (this.karyotypeViewPoint) {
    var left = browser.karyotypeWidth * this.start / this.chromosomeSize;
    this.karyotypeViewPoint.css({ left: left });  
  }
});

Genoverse.on('afterSetRange', function () {
  if (this.karyotypeViewPoint) {
    var left  = browser.karyotypeWidth * this.start / this.chromosomeSize;
    var width = (browser.karyotypeWidth * this.end / this.chromosomeSize) - left;
    this.karyotypeViewPoint.css({ left: left, width: width });  
  }
});

