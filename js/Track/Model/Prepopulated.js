Genoverse.Track.Model.Prepopulated = Genoverse.Track.Model.extend({
  init: function () {
    this.base(); // Don't pass reset argument in
  },

  setDefaults: function () {
    this.data = this.prop('data') || [];
    return this.base.apply(this, arguments);
  },

  getData: function (start, end) {
    this.receiveData(this.data.sort(function (a, b) { return a.start - b.start; }), start, end);
    return $.Deferred().resolveWith(this);
  },

  updateData: function (data) {
    this.data = data;
    this.track.reset();
  }
});
