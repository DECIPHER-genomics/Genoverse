CBrowse.on('afterInit', function () {

  this.draggingEnabled = true;
  this.____mousedown   = this.mousedown; 

  this.toggleDragging = function (forceFlag) {
    this.draggingEnabled = forceFlag === undefined ? !this.draggingEnabled : forceFlag;
    if (this.draggingEnabled) {
      this.mousedown = this.____mousedown;
    } else {
      this.____mousedown   = this.mousedown; 
      this.mousedown       = $.noop;
    }

    return this;
  }

});