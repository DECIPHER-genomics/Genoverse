Genoverse.Track.File.BAM = Genoverse.Track.File.extend({
  name      : 'BAM',
  indexExt  : '.bai',
  threshold : 100000,
  largeFile : true,
  model     : Genoverse.Track.Model.File.BAM,
  view      : Genoverse.Track.View.Sequence.extend({
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
