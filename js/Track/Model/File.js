Genoverse.Track.Model.File = Genoverse.Track.Model.extend({
  dataType: 'text',

  init: function () {
    if (this.isLocal) {
      this.url = false;
    }

    if (!this.largeFile) {
      this.allData = true;
    }

    this.base.apply(this, arguments);
  },

  getData: function () {
    var model = this;

    if (this.isLocal && this.dataFile) {
      var reader   = new FileReader();
      var deferred = $.Deferred();

      reader.onload = function (e) {
        deferred.done(function () {
          this.receiveData(e.target.result, 1, this.browser.chromosomeSize);
        }).resolveWith(model);
      };

      reader.readAsText(this.dataFile);

      return deferred;
    } else {
      return this.base.apply(this, arguments);
    }
  }
});
