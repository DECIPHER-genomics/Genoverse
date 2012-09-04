Genoverse.Track.Sequence = Genoverse.Track.extend({
  config: {
    labelOverlay   : true,
    separateLabels : false,
    autoHeight     : 'force',
    spacing        : 0,
    strand         : 1,
    chunkSize      : 1000,
    buffer         : 0,
    inherit        : [ 'Stranded' ]
  },
  
  constructor: function (config) {
    this.base(config);
    
    this.featuresHeight = this.featureHeight + this.bumpSpacing + this.spacing;
    this.labelWidth     = {};
    this.widestLabel    = this.lowerCase ? 'g' : 'G';
    
    if (!this.colors) {
      this.colors      = {};
      this.labelColors = {};
      
      this.urlParams.colors = 1;
    }
  },
  
  complement: function (sequence) {
    if (this.lowerCase) {
      return sequence.replace(/g/g, 'C').replace(/c/g, 'G').replace(/t/g, 'A').replace(/a/g, 'T').toLowerCase();
    } else {
      return sequence.replace(/G/g, 'c').replace(/C/g, 'g').replace(/T/g, 'a').replace(/A/g, 't').toUpperCase();
    }
  },
  
  parseFeatures: function (data, bounds) {
    var i       = data.features.length;
    var strands = [ 1, -1 ];
    var sequence, start, complement, strand, seq, feature, id, j, k;
    
    if (data.colors) {
      this.colors      = data.colors;
      this.labelColors = data.labelColors;
      
      if (this.reverseTrack) {
        this.reverseTrack.colors      = this.colors;
        this.reverseTrack.labelColors = this.labelColors;
      }
      
      delete this.urlParams.colors;
    }
    
    while (i--) {
      sequence   = data.features[i].sequence[this.lowerCase ? 'toLowerCase' : 'toUpperCase']();
      start      = data.features[i].start;
      complement = this.complement(sequence);
      
      for (j in strands) {
        strand = strands[j];
        seq    = strand === (data.features[i].strand || this.strand) ? sequence : complement;
        
        for (k = 0; k < seq.length; k += this.chunkSize) {
          id = (start + k) + ':' + strand;
          
          if (this.featureIds[id]) {
            continue;
          }
          
          feature = {
            id       : id,
            start    : start + k,
            end      : start + k + this.chunkSize + this.buffer,
            strand   : strand,
            sequence : seq.substr(k, this.chunkSize + this.buffer)
          };
          
          if (feature.sequence.length > this.buffer) {
            this.features.insert({ x: feature.start, w: this.chunkSize + this.buffer, y: 0, h: 1 }, feature);
            this.featureIds[id] = 1;
          }
        }
      }
    }
    
    return this.features.search(bounds);
  },
  
  draw: function (image, features) {
    if (!features.length) {
      return image.images.each(function () { $(this).data('deferred').resolve({ target: this, img: image }); });
    }
    
    if (!this.labelWidth[this.widestLabel]) {
      this.labelWidth[this.widestLabel] = Math.ceil(this.context.measureText(this.widestLabel).width) + 1;
    }
    
    this.canvas.attr({ width: image.width, height: this.featuresHeight });
    this.beforeDraw(image);
    this.drawFeatures(image, features);
    this.afterDraw(image);
    
    image.container.append(image.images.attr('src', this.canvas[0].toDataURL()));
  },
  
  drawFeatures: function (image, features) {
    this.context.textBaseline = 'middle';
    
    for (var i = 0; i < features.length; i++) {
      if (this.strand === features[i].strand) {
        this.drawSequence(image, features[i]);
      }
    }
  },
  
  drawSequence: function (image, feature) {
    var scaledStart = this.scale * feature.start - image.scaledStart;
    var width       = this.scale;
    var drawLabels  = this.labelWidth[this.widestLabel] < width - 1;
    var labelY      = (this.featureHeight + (this.lowerCase ? 0 : 1)) / 2;
    var start, bp;
    
    for (var i = 0; i < feature.sequence.length; i++) {
      start = scaledStart + i * width;
      
      if (start < -width || start > image.width) {
        continue;
      }
      
      bp = feature.sequence.charAt(i);
      
      this.context.fillStyle = this.colors[bp] || this.colors['default'];
      this.context.fillRect(start, 0, width, this.featureHeight);
      
      if (!this.labelWidth[bp]) {
        this.labelWidth[bp] = Math.ceil(this.context.measureText(bp).width) + 1;
      }
      
      if (drawLabels) {
        this.context.fillStyle = this.labelColors[bp] || this.labelColors['default'];
        this.context.fillText(bp, start + (width - this.labelWidth[bp]) / 2, labelY);
      }
    }
  },
  
  getQueryString: function (start, end) {
    return this.base(start - start % this.chunkSize + 1, end + this.chunkSize + this.buffer - end % this.chunkSize);
  },
  
  checkSize: function () {
    this.fullVisibleHeight = this.threshold && this.browser.length > this.threshold ? 0 : this.featuresHeight;
  },
  
  click: function (e) {
    var x       = Math.floor((e.pageX - this.container.parent().offset().left + this.browser.scaledStart) / this.scale);
    var strand  = this.strand;
    var feature = $.grep(this.features.search({ x: x, w: 1, y: 0, h: 1 }), function (f) { return f.strand === strand; })[0];
    
    if (feature) {
      this.browser.makeMenu(this, this.menuFeature(feature, x), { left: e.pageX, top: e.pageY });
    }
  },
  
  menuFeature: function (feature, position) {
    return {
      id    : feature.id + ':' + position,
      title : feature.sequence.charAt(position - feature.start) + '; Position: ' + this.browser.chr + ':' + position
    };
  }
});