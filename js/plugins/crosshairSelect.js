// Default css
// Reason it's here is so that developer only has to include this js file for entire plugin functionality
// Any additional custom css will overwrite it
document.styleSheets[0].insertRule("           \
  .crosshairSelect {                           \
    position: absolute;                        \
    display: none;                             \
    border: 1px dashed red;                    \
    border-width: 0 0 0 1px;                   \
    background-color: rgba(229, 121, 5, 0.1);  \
    top: 0;                                    \
    margin-left: -1px;                         \
    z-index: 9;                                \
  }", 
  0
);

CBrowse.on('afterInit', function () {
  var cBrowse = this;

  this.toggleCrosshairSelect = function (forceFlag) {
    this.crosshairZoomEnabled = forceFlag === undefined ? !this.crosshairZoomEnabled : forceFlag;
    
    if (this.crosshairZoomEnabled) {
      this.toggleDragging(false);  // Make sure dragging is off
      this.crosshairSelect.show();
    } else {
      this.crosshairSelect.hide();
    }

    return this;
  };
  
  this.positionCrosshair = function () { 
    var top    = $('.track_container:first', this.container).position().top;
    var last   = $('.track_container:last',  this.container);
    var height = last.position().top + last.height() - top;
    
    return { top: top, height: height };
  };
  
  this.crosshairSelectEvent = function (e) {
    if (!this.crosshairZoomEnabled || !this.crosshairSelecting) {
      return;
    }
    
    this.crosshairSelecting = false;
    this.crosshairSelect.css({ left: e.pageX - this.wrapper.offset().left, width: 1, borderWidth: '0 0 0 1px' });
  };
  
  this.functionWrap('toggleCrosshairSelect');
  this.functionWrap('positionCrosshair');
  this.functionWrap('crosshairSelectEvent');
  
  this.crosshairSelecting = false;
  this.crosshairSelect    = $('<div class="crosshairSelect">').css(this.positionCrosshair()).appendTo(this.wrapper);
  
  // It would possibly be better to unregister event handlers 
  // instead of checking for crosshairZoomEnabled all the time
  this.wrapper.on('mousedown', function (e) {
    if (!cBrowse.crosshairZoomEnabled) {
      return;
    }
    
    cBrowse.crosshairSelecting   = true;
    cBrowse.crosshairSelectStart = e.pageX - $(this).offset().left;
  });

  $(document).on('mousemove', function (e) {
    if (!cBrowse.crosshairZoomEnabled || !cBrowse.crosshairSelecting) {
      return;
    }

    var x = e.pageX - cBrowse.wrapper.offset().left;

    if (x > cBrowse.crosshairSelectStart) {
      cBrowse.crosshairSelect.css({ 
        left        : cBrowse.crosshairSelectStart, 
        width       : Math.min(x - cBrowse.crosshairSelectStart, cBrowse.width - cBrowse.crosshairSelectStart),
        borderWidth : 1
      });
    } else {
      cBrowse.crosshairSelect.css({ 
        left        : Math.max(x, 0), 
        width       : Math.min(cBrowse.crosshairSelectStart - x, cBrowse.crosshairSelectStart),
        borderWidth : 1
      });
    }
  });
  
  this.wrapper.on('mousemove', function (e) {
    if (!cBrowse.crosshairZoomEnabled || cBrowse.crosshairSelecting) {
      return;
    }
    
    cBrowse.crosshairSelect.css('left', e.pageX - $(this).offset().left);
  });

  $(document).on('mouseup', function (e) { cBrowse.crosshairSelectEvent(e); });
});

CBrowse.Track.on('afterResize', function () {
  if (this.cBrowse.crosshairSelect) {
    this.cBrowse.crosshairSelect.css(this.cBrowse.positionCrosshair());
  }
});