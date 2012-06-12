// Default css
// Reason it's here is so that developer only has to include this js file for entire plugin functionality
// Any additional custom css will overwrite it
document.styleSheets[0].insertRule(".crosshair { position: absolute; display: block; width: 0; border-left: 1px dashed red; top:0; left:-2px; z-index: 20; }", 0);
document.styleSheets[0].insertRule("           \
  .crosshairSelect {                           \
    position: absolute;                        \
    width: 0;                                  \
    border-left: 1px dashed red;               \
    background-color: rgba(229,121,5,0.1);     \
    top:1px; left:-2px;                        \
    z-index: 50;                               \
  }", 
  0
);


//
// This select is very slow!!! 
// We need to disable all onmousemoves when user selecting stuff!!!
CBrowse.on('afterInit', function () {
  var cBrowse = this;

  cBrowse.toggleCrosshairSelect = function (forceFlag) {
    this.crosshairZoomEnabled = forceFlag === undefined ? !this.crosshairZoomEnabled : forceFlag;
    if (this.crosshairZoomEnabled) {
      this.toggleDragging(false);  // Make sure dragging is off
      this.crosshairSelect.show();
    } else {
      this.crosshairSelect.hide();
    }

    return this;
  }

  cBrowse.crosshairSelecting = false;
  var margin = 3;

  cBrowse.crosshairSelect = $('<div class="crosshairSelect">')
                            .css({ height: cBrowse.getHeight()-3 })
                            .appendTo(cBrowse.wrapper);

  // It would possibly be better to unreguster event handlers 
  // instead of checking for crosshairZoomEnabled all the time
  $('.wrapper').on('mousedown', function (e) {
    if (!cBrowse.crosshairZoomEnabled) return;

    cBrowse.crosshairSelecting = true;
    cBrowse.crosshairSelectStart = e.pageX - $(this).offset().left;
  });

  $(document).on('mousemove', function (e) {
    if (!cBrowse.crosshairZoomEnabled || !cBrowse.crosshairSelecting) return;

    var x = e.pageX - $(cBrowse.wrapper).offset().left;

    if (x > cBrowse.crosshairSelectStart) {
      cBrowse.crosshairSelect.css({ 
        left: cBrowse.crosshairSelectStart-margin, 
        width: Math.min(x-cBrowse.crosshairSelectStart, cBrowse.width-cBrowse.crosshairSelectStart),
        border: "1px dashed red" 
      });
    } else {
      cBrowse.crosshairSelect.css({ 
        left: Math.max(x-1, 0), 
        width: Math.min(cBrowse.crosshairSelectStart-x-margin, cBrowse.crosshairSelectStart-margin-1),
        border: "1px dashed red" 
      });
    }

  });

  cBrowse.wrapper.on('mousemove', function (e) {
    if (!cBrowse.crosshairZoomEnabled || cBrowse.crosshairSelecting) return;

    var x = e.pageX - $(this).offset().left;
    cBrowse.crosshairSelect.css({ left: x-margin });
  });

  $(document).on('mouseup', function (e) {
    if (!cBrowse.crosshairZoomEnabled) return;

    cBrowse.crosshairSelecting = false;
    var x = e.pageX - $(cBrowse.wrapper).offset().left;
    cBrowse.crosshairSelect.css({ left: x-margin, width: 1, border: "none", "border-left": "1px dashed red" });
  });

});

CBrowse.on('afterCheck', function () {
  cBrowse.crosshairSelect.css({ height: cBrowse.getHeight()-3 });
});