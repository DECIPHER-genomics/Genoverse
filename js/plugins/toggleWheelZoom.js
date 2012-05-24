CBrowse.on('afterInit', function () {

  this.wheelZoomEnabled   = true;
  this.____mousewheelZoom = this.mousewheelZoom; 

  this.toggleWheelZoom = function (forceFlag) {
    this.wheelZoomEnabled = forceFlag === undefined ? !this.wheelZoomEnabled : forceFlag;
    if (this.wheelZoomEnabled) {
      this.mousewheelZoom = this.____mousewheelZoom;
    } else {
      this.mousewheelZoom     = $.noop;
    }
  }

  this.toggleWheelZoom();
});
