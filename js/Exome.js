CBrowse.Track.Exome = CBrowse.Track.extend({
  plotData: function (probe, x1, x2) {
    var a = probe[0] * this.cBrowse.scale + this.width - this.cBrowse.offsetX;
    var b = probe[1] * this.cBrowse.scale + this.width - this.cBrowse.offsetX;
    
    if (!(a < x2 && b > x1)) {
      return false;
    }

    this.vline((a + b) / 2, this.offsetY + this.height / 2, -probe[3] * this.height / 5);  
    this.hline(a, this.offsetY + this.height / 2 - probe[2] * this.height / 5, b - a);
  }
});