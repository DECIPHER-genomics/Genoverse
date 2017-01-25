Genoverse.Track.Controller.Stranded = Genoverse.Track.Controller.extend({
  constructor: function (properties) {
    this.base(properties);

    if (typeof this._makeImage === 'function') {
      return;
    }

    var strand        = this.prop('strand');
    var featureStrand = this.prop('featureStrand');

    if (strand === -1) {
      this._makeImage = this.track.makeReverseImage ? $.proxy(this.track.makeReverseImage, this) : this.makeImage;
      this.makeImage  = $.noop;
    } else {
      strand = this.prop('strand', 1);

      this._makeImage = this.makeImage;
      this.makeImage  = this.makeForwardImage;

      this.track.reverseTrack = this.browser.addTrack(this.track.constructor.extend({ strand: -1, url: false, forwardTrack: this.track }), this.browser.tracks.length);
    }

    if (!featureStrand) {
      this.prop('featureStrand', strand);
    }
  },

  makeForwardImage: function (params) {
    var rtn          = this._makeImage(params);
    var reverseTrack = this.prop('reverseTrack');

    if (!reverseTrack) {
      return;
    }

    if (rtn && typeof rtn.done === 'function') {
      rtn.done(function () {
        reverseTrack.controller._makeImage(params, rtn);
      });
    } else {
      reverseTrack.controller._makeImage(params, rtn);
    }
  },

  destroy: function () {
    if (this.removing) {
      return;
    }

    this.removing = true;

    this.browser.removeTrack(this.prop('forwardTrack') || this.prop('reverseTrack'));
    this.base();
  }
});