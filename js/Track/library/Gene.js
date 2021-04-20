var { Track } = require('../../Track')
var GeneEnsemblView = require('../View/Gene/Ensembl')
var GeneEnsemblModel = require('../Model/Gene/Ensembl')
var GeneTranscriptView = require('../View/Transcript/Ensembl')
var GeneTranscriptModel = require('../Model/Transcript/Ensembl')

module.exports = Track.extend({
  id     : 'genes',
  name   : 'Genes',
  height : 200,
  legend : true,

  populateMenu: function (feature) {
    var url  = 'https://www.ensembl.org/Homo_sapiens/' + (feature.feature_type === 'transcript' ? 'Transcript' : 'Gene') + '/Summary?' + (feature.feature_type === 'transcript' ? 't' : 'g') + '=' + feature.id;
    var menu = {
      title    : '<a target="_blank" href="' + url + '">' + (feature.external_name ? feature.external_name + ' (' + feature.id + ')' : feature.id) + '</a>',
      Location : feature.chr + ':' + feature.start + '-' + feature.end,
      Source   : feature.source,
      Biotype  : feature.biotype
    };

    if (feature.feature_type === 'transcript') {
      menu.Gene = '<a target="_blank" href="https://www.ensembl.org/Homo_sapiens/Gene/Summary?g=' + feature.Parent + '">' + feature.Parent + '</a>';
    }

    return menu;
  },

  // Different settings for different zoom level
  2000000: { // This one applies when > 2M base-pairs per screen
    labels : false
  },
  100000: { // more than 100K but less then 2M
    labels : true,
    model  : GeneEnsemblModel,
    view   : GeneEnsemblView
  },
  1: { // > 1 base-pair, but less then 100K
    labels : true,
    model  : GeneTranscriptModel,
    view   : GeneTranscriptView
  }
});
