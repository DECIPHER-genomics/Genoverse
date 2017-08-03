Genoverse.Track.Model.File.WIG = Genoverse.Track.Model.Graph.Bar.extend({
  dataType : 'text',
  getData : function(chr, start, end){
    if(!this.url){
      this.isLocal = true;
      this.dataFile = this.track.dataFile;
      Genoverse.Track.Model.File.prototype.getData.apply(this, arguments);
    }
    return this.base.apply(this, arguments);
  },
  parseData : function(text, chr, s, e){
    var lines = text.split('\n');
    var chrom, start, step, span;
    var features = [];

    for(var i = 0; i < lines.length; i++){
      var fields = lines[i].split(' ');

      if(fields[0].indexOf('#') != -1 || fields[0] == 'track') continue;

      if(fields[0] == 'fixedStep'){
        chrom = parseInt(fields[1].split("=")[1].replace("chr",""));
        start = parseInt(fields[2].split("=")[1]);
        step  = parseInt(fields[3].split("=")[1]);
        span  = fields[4] ? parseInt(fields[4].split("=")[1]) : 1;
        continue;
      }

      var feature    = {};
      feature.chr    = chrom;
      feature.start  = start;
      feature.end    = start+span;
      feature.height = parseFloat(fields[0]);
      features.push(feature);
      start += step;
    }

    return this.base.call(this, features, chr, s, e);
  }
});
