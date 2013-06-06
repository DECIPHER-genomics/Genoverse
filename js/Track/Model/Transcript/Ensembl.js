// Ensembl REST API Transcript model
Genoverse.Track.Model.Transcript.Ensembl = Genoverse.Track.Model.Transcript.extend({

  name : 'e! Transcripts',
  url  : 'http://beta.rest.ensembl.org/feature/region/human/__CHR__:__START__-__END__?feature=transcript;content-type=application/json',
  dataRequestLimit : 5000000, // As per e! REST API restrictions

  // The url above responds in json format, data is an array
  // See http://beta.rest.ensembl.org/documentation/info/feature_region for more details
  parseData: function (data) {
    for (var i = 0; i < data.length; i++) {
      var feature = data[i];
      if (feature.feature_type == 'transcript' && !this.featuresById[feature.ID]) {
        feature.id    = feature.ID,
        feature.label = feature.id;
        feature.color = feature.labelColor = this.ensemblTranscriptColor(feature);
        feature.exons = [];
        feature.cds   = [];
        this.insertFeature(feature);
      } else if (feature.feature_type == 'exon' && this.featuresById[feature.Parent]) {
        feature.id = feature.ID;
        if (!this.featuresById[feature.Parent].exons[feature.id]) {
          this.featuresById[feature.Parent].exons.push(feature);
          this.featuresById[feature.Parent].exons[feature.id] = feature;
        }
      } else if (feature.feature_type == 'cds' && this.featuresById[feature.Parent]) {
        feature.id = feature.start + '-' + feature.end;
        if (!this.featuresById[feature.Parent].cds[feature.id]) {
          this.featuresById[feature.Parent].cds.push(feature);
          this.featuresById[feature.Parent].cds[feature.id] = feature;
        }
      }
    }
  },

  ensemblTranscriptColor: function (feature) {
    var color = '#000000';
    if (feature.logic_name.indexOf('ensembl_havana') === 0) {
      color = '#cd9b1d';
    } else if (feature.biotype.indexOf('RNA') > -1) {
      color = '#8b668b';
    } else switch (feature.biotype) {
      case 'protein_coding':
        color = '#A00000';
      break;
      case 'retained_intron':
        color = '#0000FF';
      break;
      case 'processed_transcript':
        color = '#0000FF';
      case 'antisense':
        color = '#0000FF';
      break;
      case 'sense_intronic':
        color = '#0000FF';
      break;
      case 'pseudogene':
      case 'processed_pseudogene':
        color = '#666666';
      break;
      default :
        color = '#A00000';
      break;
    }

    return color;
  },

  getData: function (start, end, url, deferred) {
    start = Math.max(0, start);
    end   = Math.min(this.browser.chromosomeSize, end);

    var track    = this;
    var deferred = deferred || $.Deferred();
    var bins     = [];
    var length   = end - start + 1;
   
    if (!this.url && !url) {
      return deferred.resolveWith(this);
    }

    if (this.dataRequestLimit && length > this.dataRequestLimit) {
      var i = Math.ceil(length / this.dataRequestLimit);
     
      while (i--) {
        bins.push([ start, i ? start += this.dataRequestLimit - 1 : end ]);
        start++;
      }
    } else {
      bins.push([ start, end ]);
    }
   
    $.when.apply($, $.map(bins, function (bin) {
      return $.ajax({
        url       : track.parseURL(bin[0], bin[1], url || this.url),
        dataType  : track.dataType,
        context   : track,
        xhrFields : track.xhrFields,
        success   : function (data) {
          if (!url) { // Non modified (transcript) url, loop through the trasncripts and see if any extend beyond start and end
            for (var i=0; i<data.length; i++) {
              if (data[i].start < start) start = data[i].start;
              if (data[i].end > end) end = data[i].end;
            }
            this.receiveData(data, bin[0], bin[1]); 
          } else {
            this.parseData(data); 
          }
        },
        error     : function (xhr, statusText) { this.showError(statusText + ' while getting the data, see console for more details', arguments) }
      });
    })).done(function () {
      if (!url) { // Now get me the exons and cds for start-end
        url = this.url.replace('feature=transcript', 'feature=exon;feature=cds');
        this.getData(start, end, url, deferred);
      } else {
        deferred.resolveWith(track); 
      }
    });
     
    return deferred;
  },

});
