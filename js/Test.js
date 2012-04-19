CBrowse.Track.Test = CBrowse.Track.extend({
  config: {
    height        : 200,
    fixedHeight   : true,
    featureHeight : 1,
    color         : '#000000',
    bump          : false,
    autoHeight    : false
  },

  makeImage: function () {
    this.setFeatures.apply(this, arguments);
    return this.base.apply(this, arguments);
  },

  getData: function (image, deferred) {
    var features = !this.url || (image.start >= this.dataRegion.start && image.end <= this.dataRegion.end) ? this.features.search({ x: image.bufferedStart, y: 0, w: image.end - image.bufferedStart, h: 1 }) : false;
    
    if (features) {
      this.draw(image, features.sort(function (a, b) { return a.sort - b.sort; }));
    } else {
      this.ajax = $.ajax({
        url      : this.url,
        data     : $.extend({ chr: this.cBrowse.chromosome, start: image.bufferedStart, end: image.end }, this.urlParams, this.allData ? { start: 1, end: this.cBrowse.chromosomeSize } : {}),
        dataType : 'json',
        context  : this,
        error    : function () { deferred.reject(); },
        success  : function (json) {
          delete this.ajax;
          
          this.dataRegion.start = Math.min(image.start, this.dataRegion.start);
          this.dataRegion.end   = Math.max(image.end,   this.dataRegion.end);
          
          this.setFeatures(json);
          
          this.draw(image, json.features);
        }
      });
    }
  },

  setFeatures: function (start, end) {
    var features = [];
    for (var i = 0; i < 50000; i++) {
      features[i] = {
        start: i,
        y: Math.random() * this.height,
        end: i+5,
        color: '#000000',
        id: 'f'+i        
      };
    }

    this.base({ features: features });
  },

  positionFeatures: function (features, startOffset) {
    //console.log(features);
    return this.base(features, startOffset);
  },


  afterDraw: function (image) {
    this.context.fillStyle = 'red';
    this.context.fillRect(0, 0, image.width, 1);
  }

});