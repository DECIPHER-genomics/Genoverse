// Ensembl REST API Transcript model
Genoverse.Track.Model.Transcript.Ensembl = Genoverse.Track.Model.Transcript.extend({
  url              : 'http://beta.rest.ensembl.org/feature/region/human/__CHR__:__START__-__END__?content-type=application/json',
  urlParams        : { feature: 'transcript' },
  dataRequestLimit : 5000000, // As per e! REST API restrictions
  
  // The url above responds in json format, data is an array
  // See http://beta.rest.ensembl.org/documentation/info/feature_region for more details
  parseData: function (data) {
    for (var i = 0; i < data.length; i++) {
      var feature = data[i];
      
      if (feature.feature_type === 'transcript' && !this.featuresById[feature.ID]) {
        feature.id    = feature.ID;
        feature.label = feature.id;
        feature.exons = [];
        feature.cds   = [];
        
        this.insertFeature(feature);
      } else if (feature.feature_type === 'exon' && this.featuresById[feature.Parent]) {
        feature.id = feature.ID;
        
        if (!this.featuresById[feature.Parent].exons[feature.id]) {
          this.featuresById[feature.Parent].exons.push(feature);
          this.featuresById[feature.Parent].exons[feature.id] = feature;
        }
      } else if (feature.feature_type === 'cds' && this.featuresById[feature.Parent]) {
        feature.id = feature.start + '-' + feature.end;
        
        if (!this.featuresById[feature.Parent].cds[feature.id]) {
          this.featuresById[feature.Parent].cds.push(feature);
          this.featuresById[feature.Parent].cds[feature.id] = feature;
        }
      }
    }
  },
  
  getData: function (start, end, dfd) {
    start = Math.max(1, start);
    end   = Math.min(this.browser.chromosomeSize, end);
    
    var deferred = dfd || $.Deferred();
    
    this.base(start, end, function (data, state, request) {
      if (dfd) {
        this.parseData(data, request.coords[0], request.coords[1]);
      } else { // Non modified (transcript) url, loop through the transcripts and see if any extend beyond start and end
        for (var i = 0; i < data.length; i++) {
          start = Math.min(start, data[i].start);
          end   = Math.max(end,   data[i].end);
        }
        
        this.receiveData(data, request.coords[0], request.coords[1]); 
      }
    }).done(function () {
      if (dfd) { // Now get me the exons and cds for start-end
        dfd.resolveWith(this);
      } else {
        this.setURL({ feature: [ 'exon', 'cds' ]}, true);
        this.getData(start, end, deferred);
        this.setURL(this.urlParams, true);
      }
    });
    
    return deferred;
  }
});