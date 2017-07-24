Genoverse.Plugins.fileDrop = function () {
  this.on('afterInit', function () {
    var browser = this;
    var wrapper = this.wrapper;

    $(window).on('dragenter', function (e) {
      var dataTransfer = e.originalEvent.dataTransfer;

      if (dataTransfer && dataTransfer.types && (dataTransfer.types[0] === 'Files' || dataTransfer.types[1] === 'Files' || dataTransfer.types[2] === 'Files') && !$('.gv-file-drop-total-overlay').length) {
        var fileDropDiv      = $('<div class="gv-file-drop">').appendTo(wrapper);
        var totalDropOverlay = $('<div class="gv-file-drop-total-overlay">').prependTo('body');

        var dragleave = function () {
          fileDropDiv.remove();
          totalDropOverlay.remove();
        };

        totalDropOverlay.on('dragenter', function (e) { e.preventDefault(); e.stopPropagation(); });
        totalDropOverlay.on('dragover',  function (e) { e.preventDefault(); e.stopPropagation(); });
        totalDropOverlay.on('dragleave', dragleave);
        totalDropOverlay.on('drop', function (e) {
          dragleave();
          e.preventDefault();
          e.stopPropagation();

          // Sort in order to ensure that .bam files are before their .bam.bai files
          var files = $.map(e.originalEvent.dataTransfer.files, function (f) { return f; }).sort(function (a, b) { return a.name < b.name ? -1 : 1 });

          for (var i = 0; i < files.length; i++) {
            var file  = files[i];
            var parts = file.name.split('.').reverse();
            var gz    = parts[0] === 'gz';
            var ext   = parts[gz ? 1 : 0];
            var track = Genoverse.Track.File[ext.toUpperCase()];
            var indexFile;

            if (typeof track === 'undefined') {
              return;
            }

            if (track.prototype.indexExt && (files[i + 1] || {}).name === file.name + track.prototype.indexExt) {
              indexFile = files[++i];
            }

            track = track.extend({
              name      : file.name,
              info      : 'Local file `' + file.name + '`, size: ' + file.size + ' bytes',
              isLocal   : true,
              dataFile  : file,
              indexFile : indexFile,
              gz        : gz
            });

            browser.addTrack(track, browser.tracks.length - 1);
          }

          return false;
        });
      }
    });
  });
};
