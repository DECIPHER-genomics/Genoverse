// Default css
// Reason it's here is so that developer only has to include this js file for entire plugin functionality
// Any additional custom css will overwrite it
document.styleSheets[0].insertRule("           \
  .selectZoom {                                \
    position: absolute;                        \
    width: 0;                                  \
    outline: 1px dashed red;                   \
    background-color: rgba(8,0,165,0.2);       \
    top:1px; left:-2px;                        \
    z-index: 100;                              \
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

  cBrowse.wrapper.on('mousedown', function (e) {
    cBrowse.selectZoomStart = e.pageX - $(this).offset().left;
    cBrowse.selectZooming   = true;
    cBrowse.selectZoom.css({ left: cBrowse.selectZoomStart }).show();
  });

  $(document).on('mousemove', function (e) {
    if (!cBrowse.selectZooming) return;
    var x = e.pageX - $(cBrowse.wrapper).offset().left;
    if (x > cBrowse.selectZoomStart) {
      cBrowse.selectZoom.css({ left: cBrowse.selectZoomStart, width: x-cBrowse.selectZoomStart-2 });
    } else {
      cBrowse.selectZoom.css({ left: x, width: cBrowse.selectZoomStart-x });      
    }
  });

  cBrowse.wrapper.on('mouseup', function (e) {
    cBrowse.selectZooming = false;
    cBrowse.selectZoom.hide().css({ width: 0 });
  });

});
