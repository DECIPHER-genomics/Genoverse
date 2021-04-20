var FileTrack = require('../File')
var GFFModel = require('../../Model/File/GFF');

module.exports = FileTrack.extend({
  name          : 'GFF',
  model         : GFFModel,
  bump          : true,
  height        : 100,
  featureHeight : 5
});