CBrowse.Track = Base.extend({
  defaults: {
    height: 10
  },
  
  constructor: function (config) {
    var track = this;
    
    $.extend(this, this.defaults, config);
    
    this.spacing       = typeof this.spacing === 'undefined' ? this.cBrowse.trackSpacing : this.spacing;
    this.featureHeight = this.featureHeight || this.height;
    this.fixedHeight   = typeof this.fixedHeight === 'undefined' ? this.featureHeight === this.height : this.fixedHeight;
    this.height       += this.spacing;
    this.canvas        = $('<canvas>').appendTo(this.canvasContainer);
    this.container     = $('<div class="track_container">').height(this.height).appendTo(this.canvasContainer),
    this.imgContainer  = $('<div class="image_container">');
    this.context       = this.canvas[0].getContext('2d');
    this.fontHeight    = parseInt(this.context.font, 10);
    this.fontWidth     = this.context.measureText('W').width;
    this.fullHeight    = this.height;
    this.maxHeight     = this.height;
    this.initialHeight = this.height;
    this.scaleSettings = {};
    this.features      = new RTree();
    
    this.setScale();
    
    if (this.name) {
      this.label = $('<div>', {
        html    : this.name,
        'class' : 'label',
        css     : {
          marginTop : this.index && !this.cBrowse.tracks[this.index - 1].label ? this.cBrowse.tracks[this.index - 1].height : 0, 
          height    : this.height
        }
      }).appendTo(this.cBrowse.labelContainer);
    }
    
    if (!this.fixedHeight) {
      this.sizeHandle = $('<div class="size_handle"><div class="expand" title="Show all">+</div><div class="collapse" title="Collapse">-</div></div>').appendTo(this.label).children().on('click', function (e) {
        var height;
        
        switch (e.target.className) {
          case 'expand'   : height = $(this).data('height'); track.autoHeight = true; break;
          case 'collapse' : height = track.initialHeight;    track.autoHeight = false; break;
          default         : return;
        }
        
        track.resize(height);
      });
    }
    
    this.container.on('mouseup', '.image_container', function (e) {
      if ((e.which && e.which !== 1) || (e.pageX - track.cBrowse.dragOffset !== 0)) {
        return; // Only show menus on left click when not dragging
      }
      
      var x        = e.pageX - track.container.parent().offset().left + track.cBrowse.scaledStart;
      var y        = e.pageY - track.container.offset().top;
      var features = track.rtree.search({ x: x, y: y, w: 1, h: 1 });
      var i        = features.length;
      var seen     = {};
      
      while (i--) {
        if (seen[features[i].id]) {
          continue;
        }
        
        seen[features[i].id] = 1;
        
        track.cBrowse.makeMenu(features[i], { left: e.pageX, top: e.pageY }, track.name);
      }
    });
  },
  
  reset: function () {
    this.scaleSettings = {};
    this.features      = new RTree();
    
    this.container.empty();
  },
  
  resize: function (height) {
    this.height = height;
    
    this.container.height(height);
    this.label.height(height);
  },
  
  makeImage: function (start, end, width, moved) {
    var func = moved < 0 ? 'unshift' : 'push';
    var dir  = moved < 0 ? 'right'   : 'left';
    var div  = this.imgContainer.clone().width(width);
    
    var img = new CBrowse.TrackImage({
      track      : this,
      container  : div,
      start      : start, 
      end        : end,
      width      : width,
      edges      : { start: start * this.scale, end: end * this.scale },
      func       : func,
      labelScale : Math.ceil(this.fontWidth / this.scale),
      background : this.cBrowse.colors.background
    });
    
    this.imgContainers[func](div[0]);
    this.container.append(this.imgContainers);
    
    div.css(dir, this.offsets[dir]);
    
    this.offsets[dir] += width;
    
    return img.getData();
  },
  
  addOverlaps: function (data) {
    data = this.overlaps.concat(data);
    this.overlaps = [];
    return data;
  },
  
  setScale: function () {
    var track = this;
    
    this.scale = this.cBrowse.scale;
    
    if (this.scaleSettings[this.scale] && !this.cBrowse.history[this.cBrowse.start + ':' + this.cBrowse.end]) {
      this.container.children('.scale_' + this.scale.toString().replace('.', '_')).remove();
      delete this.scaleSettings[this.scale];
    }
    
    if (!this.scaleSettings[this.scale]) {
      this.scaleSettings[this.scale] = {
        offsets       : { right: this.width, left: -this.width },
        rtree         : new RTree(),
        imgContainers : [],
        overlaps      : []
      };
    }
    
    var scaleSettings = this.scaleSettings[this.scale];
    
    $.each([ 'offsets', 'rtree', 'imgContainers', 'overlaps' ], function () {
      track[this] = scaleSettings[this];
    });
    
    this.container.css('left', 0).children().hide();
  },
  
  setFeatures: function (data) {
    var i = data.features.length;
    
    while (i--) {
      this.features.insert({ x: data.features[i].start, y: 0, w: data.features[i].end - data.features[i].start, h: 1 }, data.features[i]);
    }
  },
  
  beforeDraw: function (image) {
    var colors      = { major: [ '#cccccc', this.cBrowse.majorUnit ], minor: [ '#e5e5e5', this.cBrowse.minorUnit ] };
    var scaledStart = Math.round(image.start * this.scale) + 1;
    var x, c;
    
    for (c in colors) {
      this.context.fillStyle = colors[c][0];
      
      for (x = Math.max(image.start - (image.start % colors[c][1]), 0); x < image.end + this.cBrowse.minorUnit; x += colors[c][1]) {
        this.context.fillRect((this.cBrowse.guideLines[c][x] || 0) - scaledStart, 0, 1, this.fullHeight);
      }
    }
    
    if (this.borderColor) {
      this.context.fillStyle = this.borderColor;
      
      this.context.fillRect(0, 0,                      image.width, 1);
      this.context.fillRect(0, this.featureHeight - 1, image.width, 1);
    }
  },
  
  positionData : $.noop, // implement in children
  afterDraw    : $.noop  // implement in children
});
