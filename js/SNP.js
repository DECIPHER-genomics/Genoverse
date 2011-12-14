/*!
 * Copyright (c) 2011 Genome Research Ltd.
 * Authors: Evgeny Bragin, Simon Brent
 * Released under the Modified-BSD license, see LICENSE.TXT
 */

CBrowse.Track.SNP = CBrowse.Track.extend({
  plotData: function (probe, x1, x2) {
    var x = probe[0] * this.cBrowse.scale + this.width - this.cBrowse.offsetX;
    
    if (x < x1 || x > x2) {
      return false;
    }

    this.point(x, this.offsetY + this.height / 20 + probe[1] * this.height * 0.9);
    this.vline(x, this.offsetY + this.height / 2, -probe[2] * this.height / 5);
  }
});
