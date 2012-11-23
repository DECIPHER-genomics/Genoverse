Genoverse.Track.on('afterInit', function () {
  if (!this.resizable) {
    return;
  }

  var track = this;
  //debugger;
  this.resizer = (this.resizer || $('<div class="resizer static"><div class="handle"></div></div>').appendTo(this.container).draggable({ 
    axis   : 'y',
    start  : function () { $('body').addClass('dragging'); },
    stop   : function (e, ui) {
      $('body').removeClass('dragging');
      track.resize(track.height + ui.position.top - ui.originalPosition.top, true);
      $(this).css({ top: 'auto' }); // returns the resizer to the bottom of the container - needed when the track is resized to 0
    }
  }).on('click', function () {
    if (track.fullVisibleHeight) {
      track.resize(track.fullVisibleHeight, true);
    }
  })).css({ width: this.width, left: -this.browser.left, position: 'absolute' }).show();
  
  if (this.height - this.spacing === this.featureHeight) {
    this.resize(this.height + this.resizer.height());
    this.initialHeight = this.height;
  }
});

Genoverse.Track.on('afterToggleExpander', function () {
  if (this.resizer && this.expander) {
    this.resizer[this.expander.filter(':visible').hide().length ? 'addClass' : 'removeClass']('shadow');
  }
});