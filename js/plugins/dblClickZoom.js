CBrowse.on('afterInit', function () {
  var cBrowse = this;
  this.container.on('dblclick', function(e){
    cBrowse.zoomIn(e.pageX - cBrowse.container.offset().left - cBrowse.labelWidth);
  });
});
