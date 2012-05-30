// Default css for overlap bar
// Reason it's here is so that developer only has to include this js file for entire plugin functionality
// Any additional custom css for .overlap will overwrite it
document.styleSheets[0].insertRule(".overlap{ background: none repeat scroll 0 0 #000000; display: none; opacity: 0.08; position: absolute; top: 0; z-index: 30; }", 0);

CBrowse.Track.on('afterMakeMenu', function (feature, e) {
  if (!this.overlap) return;

  var overlapLeft = (feature.start - this.cBrowse.start)*this.scale;
  var overlapWidth = (feature.end - feature.start)*this.scale;

    $('<div class="overlap">')
    .appendTo(this.cBrowse.wrapper)
    .css({ left: overlapLeft, width: overlapWidth, height: this.cBrowse.getHeight() })
    .show();
});

CBrowse.on('beforeMove', function () {
  $('div.overlap').remove();
});

CBrowse.on('beforeZoomIn', function () {
  $('div.overlap').remove();
});

CBrowse.on('beforeZoomOut', function () {
  $('div.overlap').remove();
});