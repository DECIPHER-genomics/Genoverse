Genoverse.Track.Prepopulated = Genoverse.Track.extend({
  model: Genoverse.Track.Model.Prepopulated,

  setInterface: function () {
    this.base();
    this._interface.data = 'model';
  },

  updateData: function (data) {
    this.model.updateData(data);
  }
});
