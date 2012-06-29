// Default css
// Reason it's here is so that developer only has to include this js file for entire plugin functionality
// Any additional custom css will overwrite it
document.styleSheets[0].insertRule(".crosshair { position: absolute; display: block; width: 0; border-left: 1px dashed red; top:0; left:-2px; z-index: 20; }", 0);

Genoverse.on('afterInit', function () {
  var browser = this;

  browser.crosshairEnabled = true;

  browser.crosshair = $('<div class="crosshair">')
                      .css({ height: browser.getHeight() })
                      .appendTo(browser.wrapper);

  browser.wrapper.on('mousemove', function (e) {
    var x = e.pageX - $(this).offset().left;
    browser.crosshair.css({ left: x-2 });
  });

  browser.toggleCrosshair = function (forceFlag) {
    this.crosshairEnabled = forceFlag === undefined ? !this.crosshairEnabled : forceFlag;
    if (this.crosshairEnabled) {
      this.crosshair.show();
    } else {
      this.crosshair.hide();
    }

    return this;
  };

});
