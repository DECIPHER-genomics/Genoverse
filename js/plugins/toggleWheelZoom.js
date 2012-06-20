CBrowse.on('afterInit', function () {
  this.wheelZoomEnabled   = true;
  this.____mousewheelZoom = this.mousewheelZoom; 

  this.toggleWheelZoom = function (forceFlag) {
    if (this.wheelZoomEnabled === forceFlag) {
      return this;
    }
    
    this.wheelZoomEnabled = typeof forceFlag === 'undefined' ? !this.wheelZoomEnabled : forceFlag;
    
    if (this.wheelZoomEnabled) {
      this.mousewheelZoom = this.____mousewheelZoom;
    } else {
      this.____mousewheelZoom = this.mousewheelZoom; 
      this.mousewheelZoom     = $.noop;
    }

    return this;
  }
});
