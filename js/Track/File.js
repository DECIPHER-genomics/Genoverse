Genoverse.Track.File = Genoverse.Track.extend({

  // Defaults 
  name     : 'File',  
  dataType : 'text',
  allData  : true,
  url      : false,
  data     : '',


  getData  : function () {
    return $.Deferred().resolve(this.data);
  }

});