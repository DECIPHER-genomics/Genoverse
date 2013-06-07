Genoverse.Track.Controller.File = Genoverse.Track.Controller.extend({

  // Defaults 
  name      : 'File',  
  dataType  : 'text',
  allData   : true,
  url       : false,
  data      : '',
  threshold : 10000000,

  getData  : function () {
    console.log('called');
    return $.Deferred().done(function () {
      this.receiveData(this.data, 1, this.browser.chromosomeSize);
    }).resolveWith(this);
  }

});