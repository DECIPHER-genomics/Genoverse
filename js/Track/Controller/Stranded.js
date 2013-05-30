Genoverse.Track.Stranded = {
  inheritedConstructor: function (config) {
    if (typeof this._makeImage === 'function') {
      return;
    }
    
    this.base(config);
    
    if (this.strand === -1) {
      this.url        = false;
      this._makeImage = this.makeReverseImage || this.makeImage;
      this.makeImage  = $.noop;
    } else {
      this.strand       = 1;
      this._makeImage   = this.makeImage;
      this.makeImage    = this.makeForwardImage;
      this.reverseTrack = this.browser.setTracks([ $.extend({}, config, { strand: -1, forwardTrack: this }) ], this.browser.tracks.length)[0];
    }
    
    if (!this.featureStrand) {
      this.featureStrand = this.strand;
    }
    
    this.urlParams.strand = this.featureStrand;
  },
  
  init: function () {
    this.base();
    
    if (this.strand === 1) {
      this.reverseTrack.features = this.features;
    } else {
      this.features = this.forwardTrack.features;
    }
  },
  
  findFeatures: function () {
    var track  = this;
    var strand = this.featureStrand;
    return $.grep(this.base.apply(this, arguments), function (feature) { return feature.strand === strand; });
  },
  
  makeForwardImage: function (params) {
    var rtn = this._makeImage(params);
    
    if (rtn && typeof rtn.done === 'function') {
      rtn.done(function () {
        this.reverseTrack._makeImage(params, rtn);
      });
    } else {
      this.reverseTrack._makeImage(params, rtn);
    }
  },
  
  remove: function () {
    if (!this.removing) {
      var track = this.forwardTrack || this.reverseTrack;
      
      track.removing = true;
      this.browser.removeTrack(track);
    }
    
    this.base();
  }
};