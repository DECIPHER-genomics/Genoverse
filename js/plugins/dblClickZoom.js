Genoverse.on('afterInit', function () {
  var browser = this;
  this.container.on('dblclick', function(e){
    browser.zoomIn(e.pageX - browser.container.offset().left - browser.labelWidth);
  });
});
