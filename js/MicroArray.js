CBrowse.Track.MicroArray = CBrowse.Track.extend({
  config: {
    height        : 150,
    fixedHeight   : true,
    featureHeight : 1,
    color         : '#000000',
    bump          : false,
    autoHeight    : false,
    allData       : true
  },

  beforeDraw: function (image) {
    this.context.fillStyle = '#CCCCCC';
    this.context.fillRect(0, this.height/2, image.width, 1);

    this.context.fillStyle = '#CCCCCC';
    this.context.fillRect(0, this.height/4, image.width, 1);
    this.context.fillRect(0, 3*this.height/4, image.width, 1);
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

  afterDraw: function (image) {

    this.context.globalAlpha = 1;
    //this.context.globalAlpha = 0.5;
    this.context.fillStyle = '#7F7F7F';
    this.context.fillRect(0, 0, image.width, 1);
  },

  addUserEventHandlers: function () {
    var track = this;

    // MouseUp event when not scrolling (dragging)
    this.container.on('mouseup', '.image_container', function (e) {
      if ((e.which && e.which !== 1) || (track.cBrowse.prev.left !== track.cBrowse.left)) {
        return; // Only show menus on left click when not dragging
      }
      var x = (e.pageX - track.container.parent().offset().left)/track.scale + track.cBrowse.start;
      var y = e.pageY - $(e.target).offset().top;
      var calls = track.calls.search({ x: x, y: 0, w: 1, h: 1 });
      if (calls.length) {
        yRatio = 2 - 4*y/track.height;
        if ((calls[0].ratio > 0 && yRatio > 0 && yRatio < calls[0].ratio) || (calls[0].ratio < 0 && yRatio < 0 && yRatio > calls[0].ratio))
          track.makeMenu(calls[0], e);
      }
    });

    this.container.on('mousemove', '.image_container', function (e) {
      var x = (e.pageX - track.container.parent().offset().left)/track.scale + track.cBrowse.start;
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

  parseFeatures: function (json, bounds) {
    var features = new Array();

    var halfHeight = this.height/2;
    var quarterHeight = this.height/4;

    for (var i = 0; i < json.data.length; i++) {
      features.push({
        sort: i,
        start: json.data[i][0],
        end:  json.data[i][0] + 10,
        id: "p" + i,
        color: "#000000",
        y: halfHeight - json.data[i][1]*quarterHeight,
        bounds: {},
        visible: {},
        bottom: {}
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