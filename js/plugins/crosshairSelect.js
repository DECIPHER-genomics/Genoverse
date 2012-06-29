// Default css
// Reason it's here is so that developer only has to include this js file for entire plugin functionality
// Any additional custom css will overwrite it
document.styleSheets[0].insertRule("           \
  .crosshair_select {                           \
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

Genoverse.on('afterInit', function () {
  var browser = this;

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
  this.crosshairSelect    = $('<div class="crosshair_select">').css(this.positionCrosshair()).appendTo(this.wrapper);
  
  // It would possibly be better to unregister event handlers 
  // instead of checking for crosshairZoomEnabled all the time
  this.wrapper.on('mousedown', function (e) {
    if (!browser.crosshairZoomEnabled) {
      return;
    }
    
    browser.crosshairSelecting   = true;
    browser.crosshairSelectStart = e.pageX - $(this).offset().left;
  });

  $(document).on('mousemove', function (e) {
    if (!browser.crosshairZoomEnabled || !browser.crosshairSelecting) {
      return;
    }

    var x = e.pageX - browser.wrapper.offset().left;

    if (x > browser.crosshairSelectStart) {
      browser.crosshairSelect.css({ 
        left        : browser.crosshairSelectStart, 
        width       : Math.min(x - browser.crosshairSelectStart, browser.width - browser.crosshairSelectStart),
        borderWidth : 1
      });
    } else {
      browser.crosshairSelect.css({ 
        left        : Math.max(x, 0), 
        width       : Math.min(browser.crosshairSelectStart - x, browser.crosshairSelectStart),
        borderWidth : 1
      });
    }
  });
  
  this.wrapper.on('mousemove', function (e) {
    if (!browser.crosshairZoomEnabled || browser.crosshairSelecting) {
      return;
    }
    
    browser.crosshairSelect.css('left', e.pageX - $(this).offset().left);
  });

  $(document).on('mouseup', function (e) { browser.crosshairSelectEvent(e); });
});

Genoverse.Track.on('afterResize', function () {
  if (this.browser.crosshairSelect) {
    this.browser.crosshairSelect.css(this.browser.positionCrosshair());
  }
});