CBrowse.Track.on('afterMakeMenu', function (feature, e) {
  if (!this.overlap) return;

  var overlapLeft = (feature.start - this.cBrowse.start)*this.scale;
  var overlapWidth = (feature.end - feature.start)*this.scale;

    $('<div class="overlap">')
    .appendTo(this.cBrowse.wrapper)
    .css({ left: overlapLeft, width: overlapWidth })
    .show();
});