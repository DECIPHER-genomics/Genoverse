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

      var track = this.track;

      setTimeout(function () {
        track.reverseTrack = track.browser.addTrack(track.constructor.extend({
          id           : track.id ? track.id + 'Reverse' : undefined,
          strand       : -1,
          url          : false,
          order        : typeof track.orderReverse === 'number' ? track.orderReverse : track.order,
          forwardTrack : track
        }));

        $.each(track.controller._deferredReverseTrackImages, function (i, args) { track.controller._makeReverseTrackImage.apply(track.controller, args); });
        delete track.controller._deferredReverseTrackImages;
      }, 1);
    }

    if (!featureStrand) {
      this.prop('featureStrand', strand);
    }
  },

  makeForwardImage: function (params) {
    this._makeReverseTrackImage(params, this._makeImage(params));
  },

  _makeReverseTrackImage: function (params, deferred) {
    var reverseTrack = this.prop('reverseTrack');

    if (!reverseTrack) {
      this._deferredReverseTrackImages = (this._deferredReverseTrackImages || []).concat([[ params, deferred ]]);
      return;
    }

    if (deferred && typeof deferred.done === 'function') {
      deferred.done(function () {
        reverseTrack.controller._makeImage(params, deferred);
      });
    } else {
      reverseTrack.controller._makeImage(params, deferred);
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