Genoverse.Track.on('afterSetMVC', function () {
  if (this.prop('resizable') !== true) {
    return;
  }
  
  var track      = this;
  var controller = this.controller;
  var resizer    = this.prop('resizer');
  
  if (!resizer) {
    resizer = this.prop('resizer', $('<div class="resizer static"><div class="handle"></div></div>').appendTo(track.prop('container')).draggable({
      axis  : 'y',
      start : function () { $('body').addClass('dragging'); },
      stop  : function (e, ui) {
        $('body').removeClass('dragging');
        controller.resize(track.prop('height') + ui.position.top - ui.originalPosition.top, true);
        $(this).css('top', 'auto'); // returns the resizer to the bottom of the container - needed when the track is resized to 0
      }
    }).on('click', function () {
      var height = track.prop('fullVisibleHeight');
      
      if (height) {
        controller.resize(height, true);
      }
    }));
  }
  
  resizer.css({ width: this.width, left: 0 })[this.prop('autoHeight') ? 'hide' : 'show']();
  
  if (!this.prop('autoHeight') && this.prop('height') - this.prop('margin') === this.prop('featureHeight')) {
    controller.resize(this.prop('height') + resizer.height());
    this.prop('initialHeight', this.prop('height'));
  }
});
