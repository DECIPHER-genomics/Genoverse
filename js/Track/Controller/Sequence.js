Genoverse.Track.Controller.Sequence = Genoverse.Track.Controller.extend({
  click: function (e) {
    var x        = e.pageX - this.container.parent().offset().left + this.browser.scaledStart;
    var y        = e.pageY - $(e.target).offset().top;
    var features = this[e.target.className === 'gv-labels' ? 'labelPositions' : 'featurePositions'].search({ x: x, y: y, w: 1, h: 1 }).sort(function (a, b) { return a.sort - b.sort; });
    var seq;
    
    if (features.length) {
      x = Math.floor(x / this.scale);
      
      for (var i = 0; i < features.length; i++) {
        if (features[i].alt_allele) {
          return this.browser.makeMenu(features[i], e, this.track);
        }
        
        seq = features[i].sequence.charAt(x - features[i].start);
        
        if (seq) {
          return this.browser.makeMenu({
            title    : seq,
            Location : this.browser.chr + ':' + x
          }, e, this.track);
        }
      }
    }
  }
});
