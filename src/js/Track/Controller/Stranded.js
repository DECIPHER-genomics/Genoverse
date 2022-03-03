import Controller from '../Controller';

export default Controller.extend({
  constructor: function (properties) {
    this.base(properties);

    if (typeof this._makeImage === 'function') {
      return;
    }

    let strand = this.prop('strand');

    const featureStrand = this.prop('featureStrand');

    if (strand === -1) {
      this._makeImage = this.track.makeReverseImage ? this.track.makeReverseImage.bind(this) : this.makeImage;
      this.makeImage  = () => {};
    } else {
      strand = this.prop('strand', 1);

      this._makeImage = this.makeImage;
      this.makeImage  = this.makeForwardImage;

      const track = this.track;

      setTimeout(
        () => {
          track.reverseTrack = track.browser.addTrack(
            track.constructor.extend({
              id           : track.id ? `${track.id}Reverse` : undefined,
              strand       : -1,
              url          : false,
              order        : typeof track.orderReverse === 'number' ? track.orderReverse : track.order,
              forwardTrack : track,
            })
          );

          track.controller._deferredReverseTrackImages.forEach(args => track.controller._makeReverseTrackImage(...args));

          delete track.controller._deferredReverseTrackImages;
        },
        1
      );
    }

    if (!featureStrand) {
      this.prop('featureStrand', strand);
    }
  },

  makeForwardImage: function (params) {
    this._makeReverseTrackImage(params, this._makeImage(params));
  },

  _makeReverseTrackImage: function (params, deferred) {
    const reverseTrack = this.prop('reverseTrack');

    if (!reverseTrack) {
      this._deferredReverseTrackImages = (this._deferredReverseTrackImages || []).concat([[ params, deferred ]]);

      return;
    }

    if (deferred && typeof deferred.done === 'function') {
      deferred.done(() => {
        reverseTrack.controller._makeImage(params, deferred);
      });
    } else {
      reverseTrack.controller._makeImage(params, deferred);
    }
  },

  destroy: function () {
    if (this.destroying) {
      return;
    }

    this.destroying = true;

    this.browser.removeTrack(this.prop('forwardTrack') || this.prop('reverseTrack'));
    this.base();
  },
});
