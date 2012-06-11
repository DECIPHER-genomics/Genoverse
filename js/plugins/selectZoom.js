// Default css
// Reason it's here is so that developer only has to include this js file for entire plugin functionality
// Any additional custom css will overwrite it
document.styleSheets[0].insertRule("           \
  .selectZoom {                                \
    position: absolute;                        \
    width: 0;                                  \
    outline: 1px dashed red;                   \
    background-color: rgba(229,121,5,0.1);     \
    top:1px; left:-2px;                        \
    z-index: 50;                               \
  }", 
  0
);

CBrowse.on('afterInit', function () {
  var cBrowse = this;

  cBrowse.selectZoomEnabled = true;

  cBrowse.selectZoom = $('<div class="selectZoom">')
                       .css({ height: cBrowse.getHeight()-2 })
                       .appendTo(cBrowse.wrapper);

  cBrowse.toggleDragging(false);

  $('.track_container').on('mousedown', function (e) {
    cBrowse.selectZoomStart   = e.pageX - $(this).offset().left;
    cBrowse.selectZooming     = true;
    cBrowse.selectZoomVisible = false;
    cBrowse.selectZoom.css({ left: cBrowse.selectZoomStart-1 });
  });

  $(document).on('mousemove', function (e) {
    if (!cBrowse.selectZooming) return;
    if (!cBrowse.selectZoomVisible) {
      cBrowse.selectZoom.show();
      cBrowse.selectZoomVisible = true;
    }

    var x = e.pageX - $(cBrowse.wrapper).offset().left;
    if (x > cBrowse.selectZoomStart) {
      cBrowse.selectZoom.css({ left: cBrowse.selectZoomStart, width: Math.min(x-cBrowse.selectZoomStart-1, cBrowse.width-cBrowse.selectZoomStart-1) });
    } else {
      cBrowse.selectZoom.css({ left: Math.max(x, 1), width: Math.min(cBrowse.selectZoomStart-x, cBrowse.selectZoomStart-1) });
    }
  });

  $(document).on('mouseup', function (e) {
    if (!cBrowse.selectZooming) return;

    var start = (cBrowse.selectZoom.offset().left - $(cBrowse.wrapper).offset().left)/cBrowse.scale + cBrowse.start;
    var end   = (cBrowse.selectZoom.offset().left + cBrowse.selectZoom.outerWidth() - $(cBrowse.wrapper).offset().left)/cBrowse.scale + cBrowse.start;

    cBrowse.selectZooming = false;
    cBrowse.selectZoom.hide().css({ width: 0 });
    cBrowse.selectZoomVisible = false;
    cBrowse.setRange(start, end, true);
  });

});
