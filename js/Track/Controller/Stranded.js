Genoverse.Track.Controller.Stranded = Genoverse.Track.Controller.extend({
  constructor: function (config) {
    if (typeof this._makeImage === 'function') {
      return;
    }
    
    if (this.strand === -1) {
      this.url        = false;
      this._makeImage = this.makeReverseImage || this.makeImage;
      this.makeImage  = $.noop;
    } else {
      var reverseTrack = $.extend(true, {}, Object.getPrototypeOf(this), config, { controller: this.controller, model: this.model, view: this.view, strand: -1, forwardTrack: this });
      
      this.strand       = 1;
      this._makeImage   = this.makeImage;
      this.makeImage    = this.makeForwardImage;
      this.reverseTrack = this.browser.addTrack(reverseTrack, this.browser.tracks.length);
    }
    
    if (!this.featureStrand) {
      this.featureStrand = this.strand;
    }
    
    this.base(config);
  },
  
  setURL: function (urlParams, update) {
    $.extend(urlParams || this.urlParams, { strand: this.featureStrand });
    this.base(urlParams, update);
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
});