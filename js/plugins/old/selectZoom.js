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

Genoverse.on('afterInit', function () {
  var browser = this;

  browser.selectZoomEnabled = true;

  browser.selectZoom = $('<div class="selectZoom">')
                       .css({ height: browser.getHeight()-2 })
                       .appendTo(browser.wrapper);

  browser.toggleDragging(false);

  $('.track_container').on('mousedown', function (e) {
    browser.selectZoomStart   = e.pageX - $(this).offset().left;
    browser.selectZooming     = true;
    browser.selectZoomVisible = false;
    browser.selectZoom.css({ left: browser.selectZoomStart-1 });
  });

  $(document).on('mousemove', function (e) {
    if (!browser.selectZooming) return;
    if (!browser.selectZoomVisible) {
      browser.selectZoom.show();
      browser.selectZoomVisible = true;
    }

    var x = e.pageX - $(browser.wrapper).offset().left;
    if (x > browser.selectZoomStart) {
      browser.selectZoom.css({ left: browser.selectZoomStart, width: Math.min(x-browser.selectZoomStart-1, browser.width-browser.selectZoomStart-1) });
    } else {
      browser.selectZoom.css({ left: Math.max(x, 1), width: Math.min(browser.selectZoomStart-x, browser.selectZoomStart-1) });
    }
  });

  $(document).on('mouseup', function (e) {
    if (!browser.selectZooming) return;

    var start = (browser.selectZoom.offset().left - $(browser.wrapper).offset().left)/browser.scale + browser.start;
    var end   = (browser.selectZoom.offset().left + browser.selectZoom.outerWidth() - $(browser.wrapper).offset().left)/browser.scale + browser.start;

    browser.selectZooming = false;
    browser.selectZoom.hide().css({ width: 0 });
    browser.selectZoomVisible = false;
    browser.setRange(start, end, true);
  });
});
