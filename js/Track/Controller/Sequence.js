Genoverse.Track.Controller.Sequence = Genoverse.Track.Controller.extend({
  click: function (e) {
    var x = e.pageX - this.container.parent().offset().left + this.browser.scaledStart;
    var y = e.pageY - $(e.target).offset().top;
    var f = this[e.target.className === 'labels' ? 'labelPositions' : 'featurePositions'].search({ x: x, y: y, w: 1, h: 1 }).sort(function (a, b) { return a.sort - b.sort; })[0];
    
    if (f) {
      x = Math.floor(x / this.scale);
      
      this.browser.makeMenu(f.alt_allele ? f : {
        title    : f.sequence.charAt(x - f.start),
        Location : this.browser.chr + ':' + x
      }, e, this.track);
    }
  }
});