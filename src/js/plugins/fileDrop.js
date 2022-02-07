import 'css/fileDrop.css';

var plugin = function () {
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

        totalDropOverlay.on('dragenter', function (ev) { ev.preventDefault(); ev.stopPropagation(); });
        totalDropOverlay.on('dragover',  function (ev) { ev.preventDefault(); ev.stopPropagation(); });
        totalDropOverlay.on('dragleave', dragleave);
        totalDropOverlay.on('drop', function (ev) {
          dragleave();
          ev.preventDefault();
          ev.stopPropagation();

          // Sort in order to ensure that .bam files are before their .bam.bai files
          var files          = $.map(ev.originalEvent.dataTransfer.files, function (f) { return f; }).sort(function (a, b) { return a.name.localeCompare(b.name); });
          var trackImporters = [];

          for (var i = 0; i < files.length; i++) {
            var file  = files[i];
            var parts = file.name.split('.').reverse();
            var gz    = parts[0] === 'gz';
            var ext   = parts[gz ? 1 : 0];
            var indexFile;

            if (files[i + 1] && new RegExp('^' + file.name + '\\.\\w+$').test(files[i + 1].name)) {
              indexFile = files[++i];
            }

            trackImporters.push({
              file      : file,
              indexFile : indexFile,
              gz        : gz,
              trackType : ext.toUpperCase()
            });
          }

          trackImporters.forEach(
            function (importer) {
              import('js/Track/library/File/' + importer.trackType).then(
                function (imported) {
                  var track = imported.default.extend({
                    name      : importer.file.name,
                    info      : 'Local file `' + importer.file.name + '`, size: ' + importer.file.size + ' bytes',
                    isLocal   : true,
                    dataFile  : importer.file,
                    indexFile : importer.indexFile,
                    gz        : importer.gz
                  });

                  browser.addTrack(track, browser.tracks.length - 1);
                },
                function () {}
              );
            }
          );
        });
      }
    });
  });
};

export default { fileDrop: plugin };
