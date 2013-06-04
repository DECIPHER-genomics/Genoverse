// Ensembl REST API Gene model
Genoverse.Track.Model.Gene.Ensembl = Genoverse.Track.Model.Gene.extend({

  name : 'e! Genes',
  url  : 'http://beta.rest.ensembl.org/feature/region/human/__CHR__:__START__-__END__?feature=gene;content-type=application/json',
  dataRequestLimit : 5000000, // As per e! REST API restrictions

  // The url above responds in json format, data is an array
  // We assume that parents always preceed children in data array, gene -> transcript -> exon
  // See http://beta.rest.ensembl.org/documentation/info/feature_region for more details
  parseData: function (data) {
    for (var i = 0; i < data.length; i++) {
      var feature = data[i];
      if (feature.feature_type == 'gene' && !this.featuresById[feature.ID]) {
        feature.id = feature.ID;
        feature.label = feature.external_name || feature.id;
        feature.color = feature.labelColor = this.ensemblGeneColor(feature);
        feature.transcripts = [];
        this.insertFeature(feature);
      }
    }
  },

  ensemblGeneColor: function (feature) {
    var color = '#000000';
    if (feature.logic_name.indexOf('ensembl_havana') === 0) {
      color = '#cd9b1d';
    } else if (feature.biotype.indexOf('RNA') > -1) {
      color = '#8b668b';
    } else switch (feature.biotype) {
      case 'protein_coding':
        color = '#A00000';
      break;
      case 'processed_transcript':
        color = '#0000FF';
      break;
      case 'antisense':
        color = '#0000FF';
      break;
      case 'sense_intronic':
        color = '#0000FF';
      break;
      case 'pseudogene':
        color = '#666666';
      break;
      default :
        color = '#A00000';
      break;
    }

    return color;
  },

  getData: function (start, end) {
    //debugger;
    var track    = this;
    var deferred = $.Deferred();
    var bins     = [];
    var length   = end - start + 1;
   
    if (!this.url) {
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
        url       : track.parseURL(bin[0], bin[1]),
        dataType  : track.dataType,
        context   : track,
        xhrFields : track.xhrFields,
        success   : function (data) { this.receiveData(data, bin[0], bin[1]); },
        error     : function (xhr, statusText) { this.showError(statusText + ' while getting the data, see console for more details', arguments) }
      });
    })).done(function () { deferred.resolveWith(track); });
     
    return deferred;
  },

});
