CBrowse.on('afterInit', function () {
  this.draggingEnabled = true;
  this.____mousedown   = this.mousedown; 

  this.toggleDragging = function (forceFlag) {
    if (this.draggingEnabled === forceFlag) {
      return this;
    }
    
    this.draggingEnabled = typeof forceFlag === 'undefined' ? !this.draggingEnabled : forceFlag;
    
    if (this.draggingEnabled) {
      this.mousedown = this.____mousedown;
    } else {
      this.____mousedown = this.mousedown; 
      this.mousedown     = $.noop;
    }

    return this;
  }
});