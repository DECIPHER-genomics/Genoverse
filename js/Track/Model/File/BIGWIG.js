Genoverse.Track.Model.File.BIGWIG = Genoverse.Track.Model.Graph.Bar.extend({

  getData : function(chr, start, end){
    var model = this;
    var deferred = $.Deferred();

    if(!this.bigwigFile){
      this.bigwigFile = this.bigwigFile || (this.url ? new dallianceLib.URLFetchable(this.url) : new dallianceLib.BlobFetchable(this.track.dataFile));
    }

    new BWReader(this.bigwigFile, function(bw){
      if(bw == null){
        model.receiveData([], chr, start, end);
        deferred.resolveWith(model);
        return deferred;
      }

      bw.getValues(chr, start, end, function(features, error){
        if(error) console.log("error: " + error);
        console.log(features);
        model.receiveData(features, chr, start, end);
        deferred.resolveWith(model);
      });
    });

    return deferred;
  }
});
