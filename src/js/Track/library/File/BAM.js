import Model from '../../Model/File/BAM';
import View  from '../../View/Sequence';
import Track from '../File';

export default Track.extend({
  name      : 'BAM',
  indexExt  : '.bai',
  threshold : 100000,
  largeFile : true,
  model     : Model,
  view      : View.extend({
    bump       : true,
    autoHeight : true,
  }),

  click: function (...args) {
    const menu = this.base(...args);

    if (menu) {
      menu.addClass('gv-wrap-values');
    }

    return menu;
  },

  populateMenu: function (feature) {
    const f = { title: feature.readName, ...feature };

    delete f.sequence;
    delete f.id;

    return this.base(f);
  },
});
