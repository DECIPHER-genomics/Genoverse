Genoverse.Track.MicroArray = Genoverse.Track.extend({
  config: {
    height        : 150,
    fixedHeight   : true,
    featureHeight : 1,
    color         : '#000000',
    bump          : false,
    autoHeight    : false,
    scope         : [-2, 2],
    allData       : true
  },

  constructor: function (config) {
    this.base(config);

    this.yRuler = $('<table class="yRuler">');
    this.yRulerCount = Math.floor(this.scope[1] - this.scope[0]); 
    for (var i=0; i < this.yRulerCount; i++) {
      this.yRuler.append('<tr><td>'+ (this.scope[1]-i-1) +' </td></tr>');
    }

    this.label.prepend(this.yRuler);
  },

  beforeDraw: function (image) {
    this.context.fillStyle = '#CCCCCC';
    this.context.fillRect(0, this.height/2, image.width, 1);
    this.context.fillRect(0, this.height/4, image.width, 1);
    this.context.fillRect(0, 3*this.height/4, image.width, 1);
  },

  draw: function (image, features) {
    this.canvas.attr({ width: image.width, height: this.height });

    this.context.textBaseline = 'top';
    this.beforeDraw(image);


    var i = features.length;
    this.context.fillStyle = '#000000';

    var halfHeight = this.height/2;
    var colorScale = 500/halfHeight;

    // console.log(i);
    // debugger;
    while (i--) {
      var feature = features[i];
      var start   = feature.start * this.scale - image.scaledStart;
      var end     = feature.end   * this.scale - image.scaledStart;
      
      // var color   = colorScale * (feature.y - halfHeight);
      // this.context.fillStyle = color < 0 ? 'rgb(0, '+ Math.ceil(-color) +',0)' : 'rgb('+ Math.ceil(color) +',0,0)';
      this.context.fillRect(start, feature.y, 1, 1);
    }

    this.decorateFeatures(image);
    this.afterDraw(image);

    image.container.append(image.images.attr('src', this.canvas[0].toDataURL()));
  },

  afterDraw: function (image) {

    this.context.globalAlpha = 1;
    //this.context.globalAlpha = 0.5;
    this.context.fillStyle = '#7F7F7F';
    this.context.fillRect(0, 0, image.width, 1);
  },

  decorateFeatures: function (image) {
    var bounds = { x: image.bufferedStart, w: image.end - image.bufferedStart };
    var calls  = this.calls.search(bounds);
    var i = calls.length;

    while (i--) {
      start      = calls[i].start * this.scale - image.scaledStart;
      end        = calls[i].end * this.scale   - image.scaledStart;

      // var lingrad = this.context.createLinearGradient(0,0,0,150);
      // lingrad.addColorStop(0, calls[i].color);
      // lingrad.addColorStop(0.5, '#fff');

      this.context.fillStyle = calls[i].color;
      this.context.globalAlpha = 0.2;
      this.context.fillRect(start, calls[i].y, end-start, this.height/2-calls[i].y);
      this.context.globalAlpha = 0.8;
      this.context.fillRect(start, calls[i].y-2, end-start, 4);
    }
  },

  addUserEventHandlers: function () {
    var track = this;

    // MouseUp event when not scrolling (dragging)
    this.container.on('mouseup', '.image_container', function (e) {
      if ((e.which && e.which !== 1) || (track.browser.prev.left !== track.browser.left)) {
        return; // Only show menus on left click when not dragging
      }
      var x = (e.pageX - track.container.parent().offset().left)/track.scale + track.browser.start;
      var y = e.pageY - $(e.target).offset().top;
      var calls = track.calls.search({ x: x, y: 0, w: 1, h: 1 });
      if (calls.length) {
        yRatio = 2 - 4*y/track.height;
        if ((calls[0].ratio > 0 && yRatio > 0 && yRatio < calls[0].ratio) || (calls[0].ratio < 0 && yRatio < 0 && yRatio > calls[0].ratio))
          track.makeMenu(calls[0], e);
      }
    });

    this.container.on('mousemove', '.image_container', function (e) {
      var x = (e.pageX - track.container.parent().offset().left)/track.scale + track.browser.start;
      var y = e.pageY - $(e.target).offset().top;

      var calls = track.calls.search({ x: x, y: 0, w: 1, h: 1 });
      if (calls.length) {
        yRatio = 2 - 4*y/track.height;
        if ((calls[0].ratio > 0 && yRatio > 0 && yRatio < calls[0].ratio) || (calls[0].ratio < 0 && yRatio < 0 && yRatio > calls[0].ratio)) {
          $(this).css({ cursor: 'pointer'});
        } else {
          $(this).css({ cursor: 'auto'});
        }
      } else {
        $(this).css({ cursor: 'auto'});
      }
    });
  },

  parseData: function (json, bounds) {
    var features = new Array();

    var halfHeight = this.height/2;
    var quarterHeight = this.height/4;
    for (var i = 0; i < json.data.length; i++) {
      features.push({
        start: json.data[i][0],
        end:  json.data[i][0] + 10,
        y: halfHeight - json.data[i][1]*quarterHeight
        // sort: i,
        // color: "#000000",
        // id: "p" + i,
        // bounds: {},
        // visible: {},
        // bottom: {}
      });
    }

    this.features = new FRegion(features);

    var calls = new Array();
    for (var i = 0; i < json.calls.length; i++) {
      var call = json.calls[i];
      calls.push($.extend(call, {
        start: call.start,
        end:  call.stop,
        color: call.ratio > 0 ? "#13BF04" : "#FF2F00",
        y: halfHeight - call.ratio*quarterHeight,
      }));
    }
    this.calls = new FRegion(calls);

    if (this.allData) {
      this.url = false;
    }

    return this.features.search(bounds);
  },

  makeMenu: function (call, e) {
    var id = 'featureMenu' + call.start;
    if ($('#'+ id).length) return;

    var $menu = $('div.featureMenuContainer').clone();
    $('.eval', $menu).each(function(){
      $(this).html(eval( $(this).html() ));
    });

    $('body').append($menu.css({ left: e.pageX, top: e.pageY}).attr('id', id));
    $menu.fadeIn(100);
  }

});

// Default css
// Reason it's here is so that developer only has to include this js file for entire plugin functionality
// Any additional custom css will overwrite it
document.styleSheets[0].insertRule("table.yRuler { float: right; height: 100%; border-spacing: 0; margin: 0.6em 3px 0 0; }", 0);
document.styleSheets[0].insertRule("table.yRuler td { vertical-align: bottom; text-align: right; padding: 0; }", 0);
document.styleSheets[0].insertRule("table.yRuler tr:last-of-type td { visibility: hidden; }", 0);
