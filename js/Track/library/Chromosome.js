Genoverse.Track.Chromosome = Genoverse.Track.extend({
  id            : 'chromosome',
  margin        : 1,
  featureMargin : { top: 0, right: 0, bottom: 0, left: 0 },
  labels        : 'overlay',
  url           : false,
  allData       : true,
  colors        : {
    acen    : '#708090',
    gneg    : '#FFFFFF',
    gpos    : '#000000',
    gpos100 : '#000000',
    gpos25  : '#D9D9D9',
    gpos33  : '#BFBFBF',
    gpos50  : '#999999',
    gpos66  : '#7F7F7F',
    gpos75  : '#666666',
    gvar    : '#E0E0E0',
    stalk   : '#708090'
  },
  labelColors: {
    gneg   : '#000000',
    gvar   : '#000000',
    gpos25 : '#000000',
    gpos33 : '#000000'
  },

  getData: function (start, end) {
    this.receiveData($.extend(true, [], this.browser.genome[this.browser.chr].bands), start, end);
    return $.Deferred().resolveWith(this);
  },

  insertFeature: function (feature) {
    feature.label      = feature.type === 'acen' || feature.type === 'stalk' ? false : feature.id;
    feature.menuTitle  = feature.id ? this.browser.chr + feature.id : this.browser.chr + ':' + feature.start + '-' + feature.end;
    feature.color      = this.prop('colors')[feature.type]      || '#FFFFFF';
    feature.labelColor = this.prop('labelColors')[feature.type] || '#FFFFFF';

    this.base(feature);
  },

  drawFeature: function (feature, featureContext, labelContext, scale) {
    featureContext.fillStyle   = feature.color;
    featureContext.strokeStyle = '#000000';

    if (feature.type === 'acen') {
      featureContext.beginPath();

      if (this.drawnAcen) {
        featureContext.moveTo(feature.x + feature.width, 0);
        featureContext.lineTo(feature.x + feature.width, feature.height + 0.5);
        featureContext.lineTo(feature.x, feature.height / 2);
      } else {
        featureContext.moveTo(feature.x, 0);
        featureContext.lineTo(feature.x + feature.width, feature.height / 2);
        featureContext.lineTo(feature.x, feature.height + 0.5);
        this.drawnAcen = true;
      }

      featureContext.closePath();
      featureContext.fill();
      featureContext.stroke();
    } else if (feature.type === 'stalk') {
      for (var i = 0; i < 2; i++) {
        featureContext.beginPath();

        featureContext.moveTo(feature.x, 0);
        featureContext.lineTo(feature.x + feature.width * 0.25, feature.height * 0.25 + 0.5);
        featureContext.lineTo(feature.x + feature.width * 0.75, feature.height * 0.25 + 0.5);
        featureContext.lineTo(feature.x + feature.width, 0);

        featureContext[i ? 'moveTo' : 'lineTo'](feature.x + feature.width, feature.height);
        featureContext.lineTo(feature.x + feature.width * 0.75, feature.height * 0.75 - 0.5);
        featureContext.lineTo(feature.x + feature.width * 0.25, feature.height * 0.75 - 0.5);
        featureContext.lineTo(feature.x, feature.height);

        featureContext[i ? 'stroke' : 'fill']();
      }
    } else {
      this.base(feature, featureContext, labelContext, scale);

      featureContext.beginPath();

      if (feature.start === 1 && feature.end === this.browser.chromosomeSize) {
        featureContext.clearRect(0, 0, 5, this.prop('height'));
        featureContext.clearRect(feature.width - 5, 0, 10, this.prop('height'));

        featureContext.fillStyle = feature.color;
        featureContext.moveTo(5, 0.5);
        featureContext.lineTo(feature.width - 5, 0.5);
        featureContext.bezierCurveTo(this.width + 1, 0.5, this.width + 1, feature.height + 0.5, feature.width - 5, feature.height + 0.5);
        featureContext.lineTo(5, feature.height + 0.5);
        featureContext.bezierCurveTo(-1, feature.height + 0.5, -1, 0.5, 5, 0.5);
        featureContext.fill();
      } else if (feature.start === 1) {
        featureContext.clearRect(0, 0, 5, this.prop('height'));

        featureContext.fillStyle = feature.color;
        featureContext.moveTo(5, 0.5);
        featureContext.lineTo(feature.x + feature.width, 0.5);
        featureContext.moveTo(5, feature.height + 0.5);
        featureContext.lineTo(feature.x + feature.width, feature.height + 0.5);
        featureContext.moveTo(5, 0.5);
        featureContext.bezierCurveTo(-1, 0.5, -1, feature.height + 0.5, 5, feature.height + 0.5);
        featureContext.fill();
      } else if (feature.end === this.browser.chromosomeSize) {
        featureContext.clearRect(feature.x + feature.width - 5, 0, 10, this.prop('height'));

        featureContext.fillStyle = feature.color;
        featureContext.moveTo(feature.x, 0.5);
        featureContext.lineTo(feature.x + feature.width - 5, 0.5);
        featureContext.moveTo(feature.x, feature.height + 0.5);
        featureContext.lineTo(feature.x + feature.width - 5, feature.height + 0.5);
        featureContext.moveTo(feature.x + feature.width - 5, 0.5);
        featureContext.bezierCurveTo(this.width + 1, 0.5, this.width + 1, feature.height + 0.5, feature.x + feature.width - 5, feature.height + 0.5);
        featureContext.fill();
      } else {
        featureContext.moveTo(feature.x, 0.5);
        featureContext.lineTo(feature.x + feature.width, 0.5);
        featureContext.moveTo(feature.x, feature.height + 0.5);
        featureContext.lineTo(feature.x + feature.width, feature.height + 0.5);
      }

      featureContext.stroke();
    }
  },

  drawLabel: function (feature) {
    if ((feature.start === 1 || feature.end === this.browser.chromosomeSize) && feature.labelWidth >= Math.floor(feature.width - 5)) {
      return;
    }

    this.base.apply(this, arguments);
  },

  populateMenu: function (feature) {
    return {
      title    : feature.menuTitle,
      Position : this.browser.chr + ':' + feature.start + '-' + feature.end
    };
  }
});