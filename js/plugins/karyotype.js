Genoverse.Plugins.karyotype = function (browser) {
  browser.updateKaryotypePosition = function () {
    if (this.karyotypeViewPoint && this.karyotypeWidth) {
      var left  =  this.karyotypeWidth * this.start / this.chromosomeSize;
      var width = (this.karyotypeWidth * this.end   / this.chromosomeSize) - left;
      
      this.karyotypeViewPoint.css({ left: left, width: width });  
    }
  };

  browser.on('afterInit', function () {
    var browser = this;
    
    function updateBrowserLocation(e, ui) {
      var scale = browser.chromosomeSize / browser.karyotypeWidth;
      var start = Math.floor(ui.position.left * scale);
      var end   = e.type === 'dragstop' ? start + browser.length - 1 : Math.floor(ui.helper.width() * scale) + start;
      browser.moveTo(start, end, true, e.type === 'dragstop');
    }
    
    if (!(this.karyotype && this.karyotype.data('chr') === this.chr)) {
      this.karyotype = $('<div class="gv_chromosome" data-chr="' + this.chr + '">');
      
      var chromosome = this.genome && this.genome[this.chr] ? this.genome[this.chr] : { size : this.chromosomeSize, bands : [] };
      
      for (var i = 0; i < chromosome.bands.length; i++) {
        var left  =  100 * chromosome.bands[i].start / chromosome.size;
        var width = (100 * chromosome.bands[i].end   / chromosome.size) - left;
        
        $('<div title="' + chromosome.bands[i].id + '">&nbsp;<wbr />' + chromosome.bands[i].id + '</div>')
          .addClass('gv_band ' + chromosome.bands[i].type)
          .css({ left: left + '%', width: width + '%' })
          .data({
            start : chromosome.bands[i].start,
            end   : chromosome.bands[i].end
          }).on('click', function () {
            var data = $(this).data();
            browser.moveTo(data.start, data.end, true);
          }).appendTo(this.karyotype);
      }
      
      this.karyotypeViewPoint = $('<div class="gv_karyotype_viewpoint" style="display:none">').draggable({
        axis        : 'x',
        containment : 'parent',
        stop        : updateBrowserLocation
      }).resizable({
        handles : 'e, w',
        stop    : updateBrowserLocation,
        resize  : function (e, ui) {
          ui.element.css('left', Math.max(0, ui.position.left));
          
          if (ui.position.left > 0) {
            ui.element.width(Math.min(ui.size.width, ui.element.parent().width() - ui.position.left));
          } else {
            ui.element.width(ui.size.width + ui.position.left);
          }
        }
      }).appendTo(this.karyotype);
      
      $('<div class="gv_karyotype_container">').html(this.karyotype).insertAfter(this.labelContainer);
      
      this.karyotypeWidth = this.karyotype.innerWidth();
      this.updateKaryotypePosition();
      this.karyotypeViewPoint.delay(1000).fadeIn('fast');
    }
  });

  browser.on('afterSetRange', function () {
    this.updateKaryotypePosition();
  });
};