Genoverse.Plugins.fileDrop = function () {
  this.on('afterInit', function () {
    var browser = this;
    var wrapper = this.wrapper;

    $(window).on('dragenter', function (e) {
      var dataTransfer = e.originalEvent.dataTransfer;
      
      if (dataTransfer && dataTransfer.types && (dataTransfer.types[0] === 'Files' || dataTransfer.types[1] === 'Files' || dataTransfer.types[2] === 'Files') && !$('.genoverse_file_drop_total_overlay').length) {
        var fileDropDiv      = $('<div class="genoverse_file_drop">').appendTo(wrapper);
        var totalDropOverlay = $('<div class="genoverse_file_drop_total_overlay">').prependTo('body');
        
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
          
          var files = e.originalEvent.dataTransfer.files;
          
          for (var i = 0; i < files.length; i++) {
            var file   = files[i];
            var reader = new FileReader();
            
            reader.onload = function (event) {
              var track = Genoverse.Track.File[((file.name.match(/\.(\w+)$/))[1]).toUpperCase()].extend({
                name    : file.name,
                info    : 'Local file `' + file.name + '`, size: ' + file.size + ' bytes',
                allData : true,
                url     : false,
                data    : event.target.result,
                getData : function () {
                  return $.Deferred().done(function () {
                    this.receiveData(this.data, 1, this.browser.chromosomeSize);
                  }).resolveWith(this);
                }
              });
              
              browser.addTrack(track, browser.tracks.length - 1);
            };
            
            reader.readAsText(file);
          }
          
          return false;
        });
      }
    });
  });
};