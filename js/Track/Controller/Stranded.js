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
      
      this._makeImage   = this.makeImage;
      this.makeImage    = this.makeForwardImage;
      this.reverseTrack = this.browser.addTrack(this.track.constructor.extend({ strand: -1, url: false, forwardTrack: this }), this.browser.tracks.length).controller;
    }
    
    if (!featureStrand) {
      this.prop('featureStrand', strand);
    }
    
    if (!(this.model instanceof Genoverse.Track.Model.Stranded)) {
      this.track.lengthMap.push([ -9e99, { model: Genoverse.Track.Model.Stranded }]);
    }
  },
  
  makeForwardImage: function (params) {
    var reverseTrack = this.prop('reverseTrack');
    var rtn          = this._makeImage(params);
    
    if (rtn && typeof rtn.done === 'function') {
      rtn.done(function () {
        reverseTrack._makeImage(params, rtn);
      });
    } else {
      reverseTrack._makeImage(params, rtn);
    }
  },
  
  destroy: function () {
    if (this.removing) {
      return;
    }
    
    this.removing = true;
    
    this.browser.removeTrack((this.prop('forwardTrack') || this.prop('reverseTrack')).track);
    this.base();
  }
});