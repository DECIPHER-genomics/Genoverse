var FileTrack = require('../File');
var BAMModel = require('../../Model/File/BAM');
var SequenceView = require('../../View/Sequence');

module.exports = FileTrack.extend({
  name      : 'BAM',
  indexExt  : '.bai',
  threshold : 100000,
  largeFile : true,
  model     : BAMModel,
  view      : SequenceView.extend({
    bump       : true,
    autoHeight : true
  }),

  click: function () {
    var menu = this.base.apply(this, arguments);

    if (menu) {
      menu.addClass('gv-wrap-values');
    }

    return menu;
  },

  populateMenu: function (feature) {
    var f = $.extend({ title: feature.readName }, feature);

    delete f.sequence;
    delete f.id;

    return this.base(f);
  }
});
