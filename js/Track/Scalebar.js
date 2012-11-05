Genoverse.Track.Scalebar = Genoverse.Track.extend({

  height        : 20,
  featureHeight : 6,
  spacing       : 0,
  color         : '#000000',
  autoHeight    : false,
  unsortable    : true,
  forceLabels   : true,
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
      //flip *= -1;
      
      if (this.seen[x]) {
        continue;
      }
      
      this.seen[x] = 1;
      
      feature = { id: x, strand: 1 };
      major   = x && !(x % this.majorUnit);
      
      //if (flip === 1) {
        feature.start = x;
        feature.end   = x + this.minorUnit - 1;
        feature.color = this.color;
      //}
      
      if (major) {
        feature.major = true;
        feature.label = this.formatLabel(x);
      }

      this.insertFeature(feature, feature.start, feature.end);
      
      if (this.strand === 1) {
        this.browser.guideLines[major ? 'major' : 'minor'][x] = Math.round(x * this.scale);
      }
    }
  },


  makeReverseImage: function (start, end, width, moved, cls, img) {
    var div      = this.imgContainer.clone().width(width).addClass(cls).css('left', img.container.position().left).data('img', img);
    var deferred = $.Deferred();
    
    this.imgContainers[moved < 0 ? 'unshift' : 'push'](div[0]);
    this.container.append(this.imgContainers);
    
    img.track     = this;
    img.container = div;
    
    img.images.clone().appendTo(div).load(function (e) { deferred.resolve({ target: e.target, img: img }); }).data('deferred', deferred);
    
    div = null;
    
    return deferred;
  },
  

  getData: function (start, end) {
    this.setFeatures(start, end);
  },


  parseData: function () {},


  draw: function (features, context) {
    var i = features.length;

    context.textBaseline = 'top';

    while (i--) {
      var feature = features[i];
      if (feature.major) {
        context.fillRect(Math.round(feature.scaledStart), 0, 1, this.featureHeight);
        context.fillText(feature.label, feature.scaledStart, this.featureHeight);
      } else {
        context.fillRect(Math.round(feature.scaledStart), 0, 1, this.featureHeight/2);
      }
    }
    
    context.fillRect(0, 0, context.canvas.width, 1);
    //context.fillRect(0, this.featureHeight, context.canvas.width, 1);
  },
  

});