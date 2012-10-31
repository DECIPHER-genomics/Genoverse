// http://weblog.bocoup.com/using-datatransfer-with-jquery-events/
jQuery.event.props.push('dataTransfer');

Genoverse.on('afterInit', function () {
  var browser = this;

  $(".wrapper")
  .on("dragenter dragover", false)
  .on("drop", function (e) {
    e.stopPropagation();
    e.preventDefault();

    var dt = e.originalEvent.dataTransfer;
    var files = dt.files;

    for (var i = 0; i < files.length; i++) {

      var __worker = new Worker('js/worker.js');
      var __track;
      var __images = [];
      var count = 0;

      __worker.addEventListener('message', function(e) {
        // Make sure file is deleted, data is kept in the worker now
        delete __track['file'];
        __track.draw(__images[e.data.taskId], e.data.features);
        __images[e.data.taskId] = null;
      });
      
      __worker.postMessage({ bounds: bounds, file: this.file, height: this.height, taskId: taskId, trackType: this.type });
      console.log(files[i]);

      browser.addTracks([{
        type    : 'MicroArray',
        name    : files[i].name,
        file    : files[i],
        calls   : new FRegion(),

        getData : function (image, deferred) {
          //debugger;
          var bounds = { x: image.bufferedStart, y: 0, w: image.end - image.bufferedStart, h: 1 };
          __track = this;
          var taskId = count++;
          __images[taskId] = image;

          if (this.file) {
            this.dataRegion.start = Math.min(image.start, this.dataRegion.start);
            this.dataRegion.end   = Math.max(image.end,   this.dataRegion.end);            
            __worker.postMessage({ bounds: bounds, file: this.file, height: this.height, taskId: taskId, trackType: this.type });
          } else {
            __worker.postMessage({ bounds: bounds, taskId: taskId });
          }
        }
      }]);

      browser.sortTracks();
    }
  });
});
