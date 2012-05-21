// Default css
// Reason it's here is so that developer only has to include this js file for entire plugin functionality
// Any additional custom css will overwrite it
document.styleSheets[0].insertRule(".resizer { position: absolute; display: block; opacity: 0.8; background-color: #F0F0F0; height: 5px; left: 0; cursor: n-resize; z-index: 20; }", 0);
document.styleSheets[0].insertRule(".resizer .handle { background-color: white; border-bottom: 1px solid #5A5A5A; border-top: 1px solid #5A5A5A; display: inline-block; height: 1px; margin: 1px 48%; position: inherit; width: 4%; }", 0);
document.styleSheets[0].insertRule(".resizer:hover { background-color: #7D98B8; opacity: 0.3 }", 0);


CBrowse.Track.on('afterDraw', function () {
  if (!this.resizable) return;
  if (this.resizer) return;

  var track = this;
  var Y;
  this.resizer = $('<div class="resizer"><div class="handle"></div></div>')
    .css({ top: this.container.position().top + this.height, width: this.width })
    .appendTo(this.cBrowse.wrapper)
    .show()
    .draggable({ 
      axis: "y", 
      containment: [0, this.container.offset().top, 0, this.container.offset().top + this.fullVizibleHeight],
      start: function(e) {
        //track.resize(track.container.offset().top + e.clientY);
        Y = e.clientY;
      },
      stop: function(e) {
        if (track.expander) {
          track.expander.remove();
          delete track.expander;
        }
        track.resize(track.height + e.clientY - Y);
      },
      snap: true
    });
});

CBrowse.Track.on('afterResize', function () {
  if (!this.resizable) return;
  if (!this.resizer) return;

  this.resizer.css({ top: this.container.position().top + this.height });
});