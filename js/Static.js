CBrowse.Track.Static = {
  init: function () {
    this['static']   = true;
    this.unsortable  = true;
    this.fixedHeight = true;
    this.url         = false;
    
    this.base();
    
    this.image = new CBrowse.TrackImage({
      track       : this,
      container   : this.imgContainer.width(this.width),
      width       : this.width,
      background  : this.cBrowse.colors.background,
      start       : 0, 
      scaledStart : 0
    });
    
    this.container.toggleClass('track_container track_container_static').html(this.imgContainer);
  },
  
  setScale: function () {
    this.base();
    this.imgContainer.show();
  },
  
  makeImage: function (force) {
    var features = this.getFeatures();
    
    if (force || this.stringified !== features.toString()) {
      this.image.makeImage().done(function (a) { $(a.target).prev().remove(); });
      this.draw(this.image, features);
      this.imgContainer.children(':last').show();
      this.resize(this.featuresHeight);
    }
    
    this.stringified = features.toString();
    
    return true;
  },
  
  getFeatures: function () {
    return this.base.apply(this, arguments) || []; // drops through to plugin
  },
  
  scaleFeatures: function (features) {
    return features;
  }
};
