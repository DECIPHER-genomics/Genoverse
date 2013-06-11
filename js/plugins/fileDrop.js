Genoverse.on('afterInit', function() {
  var browser = this;
  var wrapper = this.wrapper;

  $(window).on("dragenter", function (e) {
    if (e.originalEvent.dataTransfer && e.originalEvent.dataTransfer.types && (e.originalEvent.dataTransfer.types[0] == 'Files' || e.originalEvent.dataTransfer.types[1] == 'Files' || e.originalEvent.dataTransfer.types[2] == 'Files') && !$('.gv_file_drop_total_overlay').length) {

      var fileDropDiv  = $('<div class="gv_file_drop" />').appendTo(wrapper);
      var totalDropOverlay = $('<div class="gv_file_drop_total_overlay" />').prependTo($('body'));

      var dragleave = function (e) {
        fileDropDiv.remove();
        totalDropOverlay.remove();
      }

      totalDropOverlay.on("dragenter", function (e) { e.preventDefault(); e.stopPropagation(); });
      totalDropOverlay.on("dragover", function (e) { e.preventDefault(); e.stopPropagation(); });

      totalDropOverlay.on("dragleave", dragleave);
      totalDropOverlay.on("drop", function (e) {
        dragleave();
        e.preventDefault();
        e.stopPropagation();
        var files = e.originalEvent.dataTransfer.files;
        for (var i=0; i<files.length; i++) {
          var file = files[i], reader = new FileReader();
          reader.onload = function (event) {
            var track = Genoverse.Track.File[((file.name.match(/\.(\w+)$/))[1]).toUpperCase()].extend({
              controller : Genoverse.Track.Controller.File,
              name       : file.name,
              data       : event.target.result,
              threshold  : false,
            });

            browser.addTrack(track);
          };

          reader.readAsText(file);
        }
        return false;
      });

    }
  });


  // $(window).on("dragleave", function (e) { 
  //   console.log(e);
  // });


  // container.ondrop      = function (e) {
  //   fileDropDiv.removeClass('hover');
  //   e.preventDefault();

  //   console.log(e.dataTransfer.files);

  //   var file = e.dataTransfer.files[0], reader = new FileReader();

  //   reader.onload = function (event) {
  //     console.log(event.target);
  //     holder.style.background = 'url(' + event.target.result + ') no-repeat center';
  //   };

  //   //reader.readAsDataURL(file);

  //   return false;
  // };

});