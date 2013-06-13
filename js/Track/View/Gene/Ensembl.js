Genoverse.Track.View.Gene.Ensembl = Genoverse.Track.View.Gene.extend({
  setFeatureColor: function (feature) {
    var color = '#000000';
    
    if (feature.logic_name.indexOf('ensembl_havana') === 0) {
      color = '#cd9b1d';
    } else if (feature.biotype.indexOf('RNA') > -1) {
      color = '#8b668b';
    } else switch (feature.biotype) {
      case 'protein_coding'       : color = '#A00000'; break;
      case 'processed_transcript' : color = '#0000FF'; break;
      case 'antisense'            : color = '#0000FF'; break;
      case 'sense_intronic'       : color = '#0000FF'; break;
      case 'pseudogene'           :
      case 'processed_pseudogene' : color = '#666666'; break;
      default                     : color = '#A00000'; break;
    }
    
    feature.color = feature.labelColor = color;
  }
});