CBrowse.Track.Stranded = {
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
      this.reverseTrack = this.cBrowse.setTracks([ $.extend({}, this.config, config, { strand: -1, forwardTrack: this }) ], this.cBrowse.tracks.length)[0];
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
  
  positionFeatures: function (features, startOffset, imageWidth) {
    var strand = this.featureStrand;
    return this.base($.grep(features, function (feature) { return feature.strand === strand; }), startOffset, imageWidth);
  },
  
  makeForwardImage: function () {
    var args         = [].splice.call(arguments, 0);
    var deferred     = $.Deferred();
    var reverseTrack = this.reverseTrack;
    
    $.when(this._makeImage.apply(this, args)).done(function (dfd) {
      $.when(reverseTrack._makeImage.apply(reverseTrack, args.concat($.extend(true, {}, dfd.img)))).done(function (dfd2) {
        deferred.resolve({ target: $.map([ dfd.target, dfd2.target ], function (t) { return t; }), img: [ dfd.img, dfd2.img ] }); // map flattens arrays if targets have labels and features
      });
    });
    
    return deferred;
  },
  
  remove: function () {
    if (!this.removing) {
      var track = this.forwardTrack || this.reverseTrack;
      
      track.removing = true;
      this.cBrowse.removeTracks([ track ]);
    }
    
    this.base();
  }
};