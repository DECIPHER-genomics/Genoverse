import 'css/fileDrop.css';

const plugin = function () {
  this.on('afterInit', function () {
    const browser = this;
    const wrapper = this.wrapper;

    $(window).on('dragenter', (e) => {
      const dataTransfer = e.originalEvent.dataTransfer;

      if (dataTransfer?.types && (dataTransfer.types[0] === 'Files' || dataTransfer.types[1] === 'Files' || dataTransfer.types[2] === 'Files') && !$('.gv-file-drop-total-overlay').length) {
        const fileDropDiv      = $('<div class="gv-file-drop">').appendTo(wrapper);
        const totalDropOverlay = $('<div class="gv-file-drop-total-overlay">').prependTo('body');

        const dragleave = () => {
          fileDropDiv.remove();
          totalDropOverlay.remove();
        };

        totalDropOverlay.on('dragenter', (ev) => { ev.preventDefault(); ev.stopPropagation(); });
        totalDropOverlay.on('dragover',  (ev) => { ev.preventDefault(); ev.stopPropagation(); });
        totalDropOverlay.on('dragleave', dragleave);
        totalDropOverlay.on('drop', (ev) => {
          dragleave();
          ev.preventDefault();
          ev.stopPropagation();

          // Sort in order to ensure that .bam files are before their .bam.bai files
          const files          = Object.values(ev.originalEvent.dataTransfer.files).sort((a, b) => a.name.localeCompare(b.name));
          const trackImporters = [];

          for (let i = 0; i < files.length; i++) {
            const file  = files[i];
            const parts = file.name.split('.').reverse();
            const gz    = parts[0] === 'gz';
            const ext   = parts[gz ? 1 : 0];

            let indexFile;

            if (files[i + 1] && new RegExp(`^${file.name}\\.\\w+$`).test(files[i + 1].name)) {
              indexFile = files[++i];
            }

            trackImporters.push({
              file      : file,
              indexFile : indexFile,
              gz        : gz,
              trackType : ext.toUpperCase(),
            });
          }

          trackImporters.forEach(
            (importer) => {
              import(`js/Track/library/File/${importer.trackType}`).then(
                (imported) => {
                  const track = imported.default.extend({
                    name      : importer.file.name,
                    info      : `Local file "${importer.file.name}", size: ${importer.file.size} bytes`,
                    isLocal   : true,
                    dataFile  : importer.file,
                    indexFile : importer.indexFile,
                    gz        : importer.gz,
                  });

                  browser.addTrack(track, browser.tracks.length - 1);
                },
                () => {}
              );
            }
          );
        });
      }
    });
  });
};

export default { fileDrop: plugin };
