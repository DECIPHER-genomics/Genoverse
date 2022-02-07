import Track from 'js/Track/library/File';
import Model from 'js/Track/Model/File/BAM';
import View  from 'js/Track/View/Sequence';

export default Track.extend({
  name      : 'BAM',
  indexExt  : '.bai',
  threshold : 100000,
  largeFile : true,
  model     : Model,
  view      : View.extend({
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
