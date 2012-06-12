// http://weblog.bocoup.com/using-datatransfer-with-jquery-events/
jQuery.event.props.push('dataTransfer');

CBrowse.on('afterInit', function () {
  var cBrowse = this;

  $(".wrapper")
  .on("dragenter dragover", false)
  .on("drop", function (e) {
    e.stopPropagation();
    e.preventDefault();

    var dt = e.originalEvent.dataTransfer;
    var files = dt.files;

    for (var i = 0; i < files.length; i++) {
      console.log(files[i]);

      cBrowse.addTracks([{
        type    : 'MicroArray',
        name    : 'MicroArray',
        file    : files[i],
        debug   : {
          parseFeatures: 1,
          positionFeatures: 1,
          draw: 1
        },
        worker  : new Worker('js/worker.js'),

        getData : function (image, deferred) {
          //debugger;
          var bounds = { x: image.bufferedStart, y: 0, w: image.end - image.bufferedStart, h: 1 };
          var track  = this;
          this.worker.addEventListener('message', function(e) {

            track.draw(image, track.parseFeatures(e.data, bounds));

          }, false);

          this.worker.postMessage({ bounds: bounds, file: this.file });
        }

      }]);
    }
  });


});
