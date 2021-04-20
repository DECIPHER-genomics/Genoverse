var Bar = require('../Graph/Bar');
var WIGModel = require('../../Model/File/WIG');

module.exports = Bar.Track.extend({
  model  : WIGModel,
  name   : 'wig',
  height : 100
});
