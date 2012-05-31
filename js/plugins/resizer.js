// Default css
// Reason it's here is so that developer only has to include this js file for entire plugin functionality
// Any additional custom css will overwrite it
document.styleSheets[0].insertRule('.resizer         { position: absolute; bottom: 0; opacity: 0.8; background-color: #F0F0F0; height: 5px; cursor: n-resize; z-index: 2; }', 0);
document.styleSheets[0].insertRule('.resizer:hover   { background-color: #7D98B8; opacity: 0.3 }', 0);
document.styleSheets[0].insertRule('.resizer .handle { background-color: white; border: 1px solid #5A5A5A; border-width: 1px 0; display: inline-block; height: 1px; margin: 1px 48%; width: 4%; }', 0);

CBrowse.Track.on('afterInit', function () {
  if (!this.resizable) {
    return;
  }

  var track = this;
  
  this.resizer = (this.resizer || $('<div class="resizer"><div class="handle"></div></div>').appendTo(this.container).draggable({ 
    axis : 'y', 
    stop : function (e, ui) {
      track.resize(track.height + ui.position.top - ui.originalPosition.top, true);
      $(this).css({ top: 'auto' });
    }
  })).css({ width: this.width, left: -this.cBrowse.left }).show();
});

CBrowse.on('afterMove', function () {
  $('.resizer', this.wrapper).css('left', -this.left);
});
