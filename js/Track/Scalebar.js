Genoverse.Track.Scalebar = Genoverse.Track.extend({

  height        : 20,
  featureHeight : 6,
  spacing       : 0,
  color         : '#000000',
  autoHeight    : false,
  unsortable    : true,
  showLabels    : true,
  bump          : false,
  fixedHeight   : true,
  order         : 0,
  orderReverse  : 1e5,
  featureStrand : 1,
  //inherit       : [ 'Stranded' ],


  reset: function () {
    this.container.children('.image_container').remove();
    this.init();
  },


  setScale: function () {
    this.base();
    
    this.minorUnit  = this.browser.minorUnit;
    this.majorUnit  = this.browser.majorUnit;
    this.seen       = {};
    this.features   = new RTree();
    this.featureIds = {};
  },


  setFeatures: function (start, end) {
    var start = Math.max(start - (start % this.minorUnit) - this.majorUnit, 0);
    
    var flip     = (start / this.minorUnit) % 2 ? 1 : -1;
    var features = [];
    var feature, major, label;
    for (var x = start; x < end + this.minorUnit; x += this.minorUnit) {
      flip *= -1;
      
      if (this.seen[x]) {
        continue;
      }
      
      this.seen[x] = 1;
      
      feature = { id: x, start: x, strand: 1 };
      major   = x && !(x % this.majorUnit);
      
      if (flip === 1) {
        feature.end = x + this.minorUnit - 1;
      } else {
        feature.end = x;
      }
      
      if (major) {
        feature.major = true;
        feature.label = this.formatLabel(x);
      }

      this.insertFeature(feature);
      this.browser.guideLines[major ? 'major' : 'minor'][x] = Math.round(x * this.scale);
    }
  },


  getData: function (start, end) {
    this.setFeatures(start, end);
  },


  parseData: function () {},


  draw: function (features, context, scale) {
    var i = features.length;
    context.textBaseline = 'top';

    while (i--) {
      var feature = features[i];
      context.fillRect(Math.round(feature.position[scale].x), 0, Math.ceil(feature.position[scale].w), this.featureHeight/2);
      if (feature.major) {
        context.fillRect(Math.round(feature.position[scale].x), 0, 1, this.featureHeight);
        context.fillText(feature.label, feature.position[scale].x, this.featureHeight);
      }
    }
    
    context.fillRect(0, 0, context.canvas.width, 1);
    context.fillRect(0, this.featureHeight/2, context.canvas.width, 1);
  },


});