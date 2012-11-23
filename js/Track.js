Genoverse.Track = Base.extend({

  // Defaults
  height         : 12,
  dataType       : 'json',
  color          : '#000000',
  fontSize       : 10,
  fontFamily     : 'sans-serif',
  fontWeight     : 'normal',
  fontColor      : '#000000',
  bump           : false,
  bumpSpacing    : 2,
  featureSpacing : 1,
  minScaledWidth : 0.5,
  inherit        : [],
  xhrFields      : {},
  featuresById   : {},

  constructor: function (config) {
    // Deep clone all [..] and {..} objects in this to prevent sharing between instances
    var deepCopy = {};
    for (var key in this) {
      if (typeof this[key] === 'object') deepCopy[key] = this[key];
    }
    this.extend($.extend(true, {}, deepCopy));

    // Use Base.extend to make any funciton in config have this.base
    this.extend(config);
    var track = this;
    
    for (var i = 0; i < this.inherit.length; i++) {
      if (Genoverse.Track[this.inherit[i]]) {
        this.extend(Genoverse.Track[this.inherit[i]]);
      }
    }
    
    if (typeof this.inheritedConstructor === 'function') {
      this.inheritedConstructor(config);
    }
    
    for (var key in this) {
      if (typeof this[key] === 'function' && !key.match(/^(base|extend|constructor|functionWrap|debugWrap)$/)) {
        this.browser.functionWrap(key, this);
      }
    }
    
    this.addDomElements(config);
    this.addUserEventHandlers();
    this.init();
    this.setScale();
  },


  addDomElements: function (config) {
    var track = this;

    this.order          = typeof this.order          !== 'undefined' ? this.order          : this.index;
    this.separateLabels = typeof this.separateLabels !== 'undefined' ? this.separateLabels : !!this.depth;
    this.spacing        = typeof this.spacing        !== 'undefined' ? this.spacing        : this.browser.trackSpacing;
    this.featureHeight  = typeof this.featureHeight  !== 'undefined' ? this.featureHeight  : this.height;
    this.fixedHeight    = typeof this.fixedHeight    !== 'undefined' ? this.fixedHeight    : this.featureHeight === this.height && !(this.bump || this.bumpLabels);
    this.autoHeight     = typeof this.autoHeight     !== 'undefined' ? this.autoHeight     : !this.fixedHeight && !config.height ? this.browser.autoHeight : false;
    this.resizable      = typeof this.resizable      !== 'undefined' ? this.resizable      : !this.fixedHeight;
    this.height        += this.spacing;
    this.initialHeight  = this.height;
    this.minLabelHeight = 0;
    this.canvas         = $('<canvas>').appendTo(this.browser.wrapper);
    this.container      = $('<div class="track_container">').appendTo(this.browser.wrapper);
    this.imgContainer   = $('<div class="image_container">');
    this.messageContainer = $('<div class="track_message static" />').appendTo(this.container);

    this.label          = $('<li>').appendTo(this.browser.labelContainer).height(this.height).data('index', this.index);
    this.menus          = $();
    this.context        = this.canvas[0].getContext('2d');
    this.font           = this.fontWeight + ' ' + this.fontSize + 'px ' + this.fontFamily;
    this.context.font   = this.font;
    this.fontHeight     = this.fontSize;
    this.labelUnits     = [ 'bp', 'Kb', 'Mb', 'Gb', 'Tb' ];

    if (this.hidden) {
      this.height  = 0;
    }
    
    if (this.autoHeight === 'force') {
      this.autoHeight  = true;
      this.fixedHeight = false;
      this.resizable   = false;
    }
    
   
    if (this.name) {
      if (this.unsortable) {
        this.label.addClass('unsortable');
      } else {
        $('<div class="handle"></div>').appendTo(this.label);
      }
      
      this.minLabelHeight = $('<span class="name" title="' + this.name + '">' + this.name + '</span>').appendTo(this.label).outerHeight(true);
      this.label.height(this.hidden ? 0 : Math.max(this.height, this.minLabelHeight));
    } else {
      this.label.addClass('unsortable');
    }
    
    this.container.height(this.hidden ? 0 : Math.max(this.height, this.minLabelHeight));
    
    if (!this.fixedHeight && this.resizable !== false) {
      this.heightToggler = $('<div class="height_toggler"><div class="auto">Set track to auto-adjust height</div><div class="fixed">Set track to fixed height</div></div>').on({
        mouseover : function () { $(this).children(track.autoHeight ? '.fixed' : '.auto').show(); },
        mouseout  : function () { $(this).children().hide(); },
        click     : function () {
          var height;
          
          if (track.autoHeight = !track.autoHeight) {
            track.heightBeforeToggle = track.height;
            height = track.fullVisibleHeight;
          } else {
            height = track.heightBeforeToggle || track.initialHeight;
          }
          
          $(this).toggleClass('auto_height').children(':visible').hide().siblings().show();
          
          track.resize(height, true);
        }
      }).addClass(this.autoHeight ? 'auto_height' : '').appendTo(this.label);
    }
  },


  init: function () {
    this.features = new RTree();
    
    this.dataRegion    = { start: 9e99, end: -9e99 };
    this.scaleSettings = {};
  },


  reset: function () {
    this.container.children('.image_container').remove();
    
    if (this.url !== false) {
      this.init();
    }
  },


  addUserEventHandlers: function () {
    var track   = this;
    var browser = this.browser;
    
    this.container.on('mouseup', '.image_container', function (e) {
      if ((e.which && e.which !== 1) || (browser.prev.left !== browser.left) || (browser.dragAction === 'select' && browser.selector.outerWidth(true) > 2)) {
        return; // Only show menus on left click when not dragging and not selecting
      }

      track.click(e);
    });
  },


  click: function (e) {
    var x = e.pageX - this.container.parent().offset().left + this.browser.scaledStart;
    var y = e.pageY - $(e.target).offset().top;
    var feature = this.featurePositions.search({ x: x, y: (this.bump ? y : 0), w: 1, h: 1 })[0];
    
    if (feature) {
      this.browser.makeMenu(feature, { left: e.pageX, top: e.pageY }, this);
    }
  },


  checkHeight: function () {
    this.fullVisibleHeight = Math.max.apply(
      Math, 
      $('img:visible', this.container).map(function(){
        return $(this).outerHeight(true);
      })
    );

    this.toggleExpander();
  },


  resize: function (height) {
    if (arguments[1] !== true && height < this.featureHeight) {
      height = 0;
    } else {
      height = this.hidden ? 0 : Math.max(height, this.minLabelHeight);
    }
    
    this.height = height;
    
    if (typeof arguments[1] === 'number') {
      $(this.imgContainers).children('.labels').css('top', arguments[1]);
    }
    
    this.container.height(height);
    this.label.height(height);//[height ? 'show' : 'hide']();
    this.toggleExpander();
  },


  toggleExpander: function () {
    if (!this.resizable) {
      return;
    }
    var track = this;
    
    // Note: this.fullVisibleHeight - this.bumpSpacing is not actually the correct value to test against, but it's the easiest best guess to obtain.
    // this.fullVisibleHeight is the maximum bottom position of the track's features in the region, which includes spacing at the bottom of each feature and label
    // Therefore this.fullVisibleHeight includes this spacing for the bottom-most feature.
    // The correct value (for a track using the default positionFeatures code) is:
    // this.fullVisibleHeight - ([there are labels in this region] ? (this.separateLabels ? 0 : this.bumpSpacing + 1) + 2 : this.bumpSpacing)
    //                                                                ^ padding on label y-position                     ^ margin on label height
    if (this.fullVisibleHeight > this.container.height()) {
      this.expander = (this.expander || $('<div class="expander static">').width(this.width).appendTo(this.container).on('click', function () {
        track.resize(track.fullVisibleHeight);
      })).css('left', -this.browser.left)[this.height === 0 ? 'hide' : 'show']();
    } else if (this.expander) {
      this.expander.hide();
    }    
  },


  remove: function () {
    this.container.add(this.label).add(this.menus).remove();
    this.browser.tracks.splice(this.index, 1);
  },


  setScale: function () {
    var track = this;
    var featurePositions, labelPositions;
    
    this.scale = this.browser.scale;

    this.messageContainer.empty();
    
    // Reset scaleSettings if the user has zoomed back to a previously existent zoom level, but has scrolled to a new region.
    // This is needed to get the newly created images in the right place.
    // Sadly we have to throw away all other images generated at this zoom level for it to work, 
    // since the new image probably won't fit exactly with the positioning of the old images,
    // and there would probably be a gap between this image and the old ones.
    if (this.scaleSettings[this.scale] && !this.browser.history[this.browser.start + '-' + this.browser.end]) {
      featurePositions = this.scaleSettings[this.scale].featurePositions;
      labelPositions   = this.scaleSettings[this.scale].labelPositions;
      
      this.container.children('.' + this.browser.scrollStart).remove();
      
      delete this.scaleSettings[this.scale];
    }
    
    if (!this.scaleSettings[this.scale]) {
      featurePositions = featurePositions || new RTree();
      
      this.scaleSettings[this.scale] = {
        imgContainers    : [],
        heights          : { max: this.height, maxFeatures: 0 },
        featurePositions : featurePositions,
        labelPositions   : this.separateLabels ? labelPositions || new RTree() : featurePositions
      };
    }
    
    var scaleSettings = this.scaleSettings[this.scale];
    
    $.each([ 'featurePositions', 'labelPositions', 'imgContainers', 'heights' ], function () {
      track[this] = scaleSettings[this];
    });
    
    this.container.css('left', this.browser.left).children('.image_container').hide();
  },


  /**
  * parseData(data) - parse raw data from the data source (e.g. online web service)
  * extract features and insert it into the internal features storage (RTree)
  *
  * >> data - raw data from the data source (e.g. ajax response)
  * << nothing
  *
  * every feature extracted this routine must construct a hash with at least 3 values:
  *  {
  *    id    : [unique feature id, string],
  *    start : [chromosomal start position, integer],
  *    end   : [chromosomal end position, integer],
  *    [other optional key/value pairs]
  *  }
  *
  * and call this.insertFeature(feature)
  */
  parseData: function (data) {
    // Example of parseData function when data is an array of hashes like {start:..., end...}
    for (var i=0; i<data.length; i++) {
      var feature = data[i];

      feature.width = feature.end - feature.start + 1;
      if (feature.width > 0) {
        this.insertFeature(feature);
      }
    }
  },


  insertFeature: function (feature) {
    // Make sure we have a unique ID, this method is not efficient, 
    // so better suppy your own id
    if (!feature.id) {
      feature.id = JSON.stringify(feature).hashCode();
    }
    if (!feature.width) {
      feature.width = feature.end - feature.start + 1;
    }

    if (!this.featuresById[feature.id] && feature.width > 0) {
      if (!feature.width) feature.width = feature.end - feature.start + 1;

      // RTree stuff
      this.features.insert({ x: feature.start, y: 0, w: feature.width, h: 1 }, feature);
      this.featuresById[feature.id] = feature;
    }
  },


  resetFeaturePositions: function () {
    this.scaleSettings = {};
    this.featurePositions = new RTree();
    for (id in this.featuresById) {
      var feature = this.featuresById[id];
      delete feature.position;
    }
  },


  reDraw: function () {
    this.resetFeaturePositions();

    for (var i=0; i<this.imgContainers.length; i++) {
      var image = $('img.data', this.imgContainers[i]);
      var data  = $(image).data();

      var features = this.features.search({ x: data.start, y: 0, w: data.end - data.start, h:1 });
      this.render(features, image);
    }
  },


  makeImage: function (start, end, width, moved, cls) {
    if (this.disabled) return;

    var div  = this.imgContainer.clone().width(width).addClass(cls);
    var prev = $(this.imgContainers).filter('.' + this.browser.scrollStart + ':' + (moved < 0 ? 'first' : 'last'));

    var data = { 
      start : start, 
      end   : end, 
      width : width, 
      height: this.height || 0, 
      scale : this.scale,
      scaledStart : start * this.scale
    };

    var bgImage = $('<img class="bg" />').css({ opacity: 0.8 }).width(width).data(data).prependTo(div);

    var image = $('<img class="data" />')
      .width(width)
      .data(data)
      .load(function(){ bgImage.css({ opacity: 1 }) })
      .appendTo(div);

    div.css('left', prev.length ? prev.position().left + (moved < 0 ? -this.width : prev.width()) : -this.browser.offsets.right);
    this.imgContainers[moved < 0 ? 'unshift' : 'push'](div[0]);
    this.container.append(this.imgContainers);


    var bufferedStart = Math.max(start - (this.labelOverlay ? 0 : this.browser.labelBuffer), 1);
    var bounds = { x: bufferedStart, y: 0, w: end - bufferedStart, h: 1 };

    this.renderBackground(bgImage);

    if (this.threshold && this.threshold < this.browser.length) {
      this.render([], image);
      this.messageContainer.text('Threshold reached');
    } else if (start >= this.dataRegion.start && end <= this.dataRegion.end) {
      var features = this.features.search(bounds);
      this.render(features, image);
    } else {
      var track = this;

      $.when(this.getData(bufferedStart, end))
       .done(function (data) {
         track.dataRegion.start = this.allData ? 0    : Math.min(start, track.dataRegion.start);
         track.dataRegion.end   = this.allData ? 9e99 : Math.max(end,   track.dataRegion.end);

         try {
           track.parseData(data, bufferedStart, end);
           track.render(track.features.search(bounds), image);
         } catch (e) {
           track.showError(e);
         }
        
         if (track.allData) {
           track.url = false;
         }
       })
       .fail(function (jqXHR, textStatus, errorThrown) {
         track.showError(jqXHR, textStatus, errorThrown);
       });
    }

    // TMP hack
    if (this.type == 'Scalebar') this.renderBackground(bgImage);

    div = prev = null;
  },
  

  getData: function (start, end) {
    return $.ajax({
      url      : this.parseUrl(start, end),
      dataType : this.dataType,
      context  : this,
      xhrFields: this.xhrFields,
    });
  },

  
  scaleFeatures: function (features, scale) {
    for (var i=0; i<features.length; i++) {
      var feature = features[i];
      if (!feature.position) feature.position = {};

      if (!feature.position[scale]) {
        feature.position[scale] = {};
        feature.position[scale].start  = feature.start * scale;
        feature.position[scale].width  = feature.width * scale;
        feature.position[scale].height = this.featureHeight;

        if (feature.position[scale].width < this.minScaledWidth) feature.position[scale].width = this.minScaledWidth;
      }


    }
  },

  
  positionFeatures: function (features, img) {
    var imgScaledStart = img.data('scaledStart');
    var scale  = img.data('scale');
    var height = 0;

    for (var i=0; i<features.length; i++) {
      this.positionFeature(features[i], scale, -imgScaledStart);
      height = Math.max(height, features[i].position[scale].Y + features[i].position[scale].H);
    }

    img.data({height : Math.max(height, img.data('height'))});
    return height;
  },


  positionFeature: function (feature, scale, xOffset) {
    feature.position[scale].H = feature.position[scale].H || feature.position[scale].height + this.featureSpacing;
    feature.position[scale].W = feature.position[scale].W || feature.position[scale].width + this.featureSpacing;
    feature.position[scale].Y = feature.position[scale].Y || feature.y || this.featureSpacing;
    feature.position[scale].X = feature.position[scale].start + xOffset;

    if (this.labels && this.labels !== 'overlay' && feature.label) {
      feature.position[scale].H += this.fontHeight + this.featureSpacing;
      var labelWidth = feature.label ? Math.ceil(this.context.measureText(feature.label).width) + 1 : 0;
      if (labelWidth > feature.position[scale].W) feature.position[scale].W = labelWidth;
    }

    if (this.bump && !feature.position[scale].bumped) {
      this.bumpFeature(feature, scale);
    } else if (!this.bump) {
      this.featurePositions.insert({x: feature.position[scale].start, y:0, w: feature.position[scale].W, h:1}, feature);
    }
  },


  bumpFeature: function (feature, scale) {
    var bounds = { 
      x: feature.position[scale].start,
      w: feature.position[scale].W, 
      y: feature.position[scale].Y, 
      h: feature.position[scale].H
    };
    
    var bump;

    do {
      bump = false;

      if (this.featurePositions.search(bounds).length) {
        bounds.y += bounds.h;
        bump = true;
      }
    } while (bump);

    this.featurePositions.insert(bounds, feature);
    feature.position[scale].Y = bounds.y;
    feature.position[scale].bumped = true;
  },


  render: function (features, img) {
    var scale = img.data('scale');
    this.scaleFeatures(features, scale);
    this.positionFeatures(features, img);

    var canvas  = $('<canvas />').attr({ width: img.data('width'), height: img.data('height') || 1 })[0];
    var context = canvas.getContext('2d');
    context.font = this.font;
    context.textBaseline = 'top';

    this.draw(features, context, scale);

    img.attr('src', canvas.toDataURL());
    $(canvas).remove();
  },


  draw: function(features, context, scale) {
    for (var i=0; i<features.length; i++) {
      var feature = features[i];
      this.drawFeature(
        $.extend({}, feature, {
          x      : feature.position[scale].X,
          y      : feature.position[scale].Y,
          width  : feature.position[scale].width,
          height : feature.position[scale].height
        }), 
        context,
        scale
      );
    }
  },


  drawFeature: function(feature, context, scale) {
    context.fillStyle = feature.color || this.color;
    context.fillRect(feature.x, feature.y, feature.width, feature.height);

    if (this.labels) {
      context.fillStyle = feature.labelColor || feature.color || this.color;
      if (this.labels === 'overlay') {
        if (context.measureText(feature.label).width < feature.width)
          context.fillText(feature.label, feature.x, feature.y);
      } else {
        context.fillText(feature.label, feature.x, feature.y + feature.height);
      }
    }
  },


  showError: function () {
    console.log(arguments);
    // if (!this.errorMessage) {
    //   this.errorMessage = this.browser.setTracks([{ type: 'Error', track: this }], this.browser.tracks.length)[0];
    // }
    
    // this.errorMessage.draw(this.imgContainers[0], error);
    // deferred.resolve({ target: image.images, img: image }); 
  },
  

  parseUrl: function (start, end) {
    var chr = this.browser.chr;
    var url = this.url;

    return url.replace(/__CHR__/, chr).replace(/__START__/, start).replace(/__END__/, end);
  },


  renderBackground: function (img) {
    var canvas  = $('<canvas />').attr({ width: img.data('width'), height: 1 })[0];
    this.drawBackground(img.data(), canvas.getContext('2d'));
    img.attr('src', canvas.toDataURL());
    $(canvas).remove();
  },


  drawBackground: function (data, context) {
    // Draw background color
    context.fillStyle = this.background || this.browser.colors.background;
    context.fillRect(0, 0, context.canvas.width, 1);

    // Draw guidelines
    var guideLines  = { major: [ this.browser.colors.majorGuideLine, this.browser.majorUnit ], minor: [ this.browser.colors.minorGuideLine, this.browser.minorUnit ] };
    var scaledStart = Math.round(data.scaledStart);
    var x;
    
    for (var c in guideLines) {
      context.fillStyle = guideLines[c][0];
      
      for (x = Math.max(data.start - (data.start % guideLines[c][1]), 0); x < data.end + this.browser.minorUnit; x += guideLines[c][1]) {
        context.fillRect((this.browser.guideLines[c][x] || 0) - scaledStart, 0, 1, context.canvas.height);
      }
    }
  },


  formatLabel: function (label) {
    var str = label.toString();
    
    if (this.minorUnit < 1000) {
      return str.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
    } else {
      var power = Math.floor((str.length - 1) / 3);
      var unit  = this.labelUnits[power];
      
      label /= Math.pow(10, power * 3);
      
      return Math.floor(label) + (unit === 'bp' ? '' : '.' + (label.toString().split('.')[1] || '').concat('00').substring(0, 2)) + ' ' + unit;
    }
  },


  populateMenu: function (feature) {
    return feature;
  },


  show: function () {
    this.hidden = false; 
    this.resize(this.initialHeight);
  },


  hide: function () {
    this.hidden = true; 
    this.resize(0);
  },


  disable: function () {
    this.hide();
    $(this.imgContainers).remove();
    this.reset();    
    this.disabled = true;
  },


  enable: function () {
    this.show(); 
    this.disabled = false;

    this.makeImage(this.browser.start, this.browser.end, this.width, -this.browser.left);
  },



  message: function (text) {
    this.messageContainer.append(text);
  },

  decorateFeatures    : $.noop, // decoration for the features
  systemEventHandlers : {}

}, {
  on: function (events, handler) {
    $.each(events.split(' '), function () {
      if (typeof Genoverse.Track.prototype.systemEventHandlers[this] === 'undefined') {
        Genoverse.Track.prototype.systemEventHandlers[this] = [];
      }
      
      Genoverse.Track.prototype.systemEventHandlers[this].push(handler);
    });
  }
});


Genoverse.Track.on('afterRender', function () {
  this.checkHeight();
});


String.prototype.hashCode = function(){
    var hash = 0, i, char;
    if (this.length == 0) return hash;
    for (i = 0; i < this.length; i++) {
        char = this.charCodeAt(i);
        hash = ((hash<<5)-hash)+char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return ""+hash;
};