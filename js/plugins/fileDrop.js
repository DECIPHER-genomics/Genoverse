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
      cBrowse.addTracks([{
        type    : 'MicroArray',
        name    : 'MicroArray',
        file    : files[i],
        getData : function (image, deferred) {
          debugger;
          var bounds   = { x: image.bufferedStart, y: 0, w: image.end - image.bufferedStart, h: 1 };

          var features = !this.url || (image.start >= this.dataRegion.start && image.end <= this.dataRegion.end) ? this.features.search(bounds) : false;
          if (features && features.length) {
            this.draw(image, features.sort(function (a, b) { return a.sort - b.sort; }));
          } else {
            var track = this;
            var reader = new FileReader();
            reader.onload = function(e) {
              // get file content
              console.log(e);
              //track.draw(image, track.parseFeatures(e.target.result, bounds));
            }
          }
        }

      }]);
    }
  });


});
