Genoverse.prototype.controls = [
  {
    icon   : '...',
    name   : 'Tracks Selection',
    init   : function () {
      var browser = this;
      $("input.trackSelection").live('change', function () {
        if ($(this).is(':checked')) {
          browser.tracks[$(this).val()].show();
        } else {
          browser.tracks[$(this).val()].hide();
        }
      });
    },
    action : function () {
      var tracksMenu = { title  : 'Tracks selection:' };

      for (var i=0; i<this.tracks.length; i++) {
        var track = this.tracks[i];
        if (track.type == 'Scalebar') continue;
        tracksMenu['<input class="trackSelection" type="checkbox" '+ (!track.hidden ? 'checked' : '') +' value="'+ i +'"> '] = track.name.replace('<br />', ' ');
      }

      var menu = this.makeMenu(tracksMenu);
      menu.addClass('trackSelection');
    }
  }
];

Genoverse.on('beforeInit', function () {
  var browser = this;

  $('<table cellspacing=0 cellpadding=0 class="genoverse">')
  .append('<tr><td class="canvas_container"></td><td class="genoverse_panel genoverse_panel_right"></td></tr>')
  .appendTo(browser.container);

  $('td.genoverse_panel_right').append('\
    <div class="button_set">\
    <button class="scrollLeft" title="Scroll left">&#9668;</button><button class="scrollRight" title="Scroll right">&#9658;</button>\
    </div>\
    <div class="button_set">\
    <button class="zoomIn" title="Zoom in">+</button><button class="zoomOut" title="Zoom out">&#8722;</button>\
    </div>\
    <div class="button_set">\
    <button class="dragScroll">&#8596;</button><button class="dragSelect">&#9482;</button>\
    </div>\
    <div class="button_set">\
    <button class="wheelOff">&#8597;</button><button class="wheelZoom">&#177;</button>\
    </div>\
  ');

  if (browser.enableSharing) {
      $('td.genoverse_panel_right').append('\
        <div class="button_set">\
        <button class="share" style="width: 100%">share</button>\
        </div>\
      ');
  }

  browser.container = $('td.canvas_container');

  $(".genoverse_panel button.scrollLeft").mousehold(50, function () {
    $('.track_container .resizer').hide();
    browser.move(NaN, 100, 100);
  });

  $(".genoverse_panel button.scrollLeft,button.scrollRight").mouseup(function () {
    $('.track_container .resizer').show();
    browser.updateURL();
    browser.checkTrackSize();
  });

  $(".genoverse_panel button.scrollRight").mousehold(50, function () {
    $('.track_container .resizer').hide();
    browser.move(NaN, -100, 100);
  });

  $(".genoverse_panel button.zoomIn").click(function () {
    browser.zoomIn();
  });

  $(".genoverse_panel button.zoomOut").click(function () {
    browser.zoomOut();
  });


  if (browser.dragAction == 'select') {
    $(".genoverse_panel button.dragSelect").addClass('active');
    $(".genoverse_panel button.dragScroll").removeClass('active');
  } else {
    $(".genoverse_panel button.dragSelect").removeClass('active');
    $(".genoverse_panel button.dragScroll").addClass('active');
  }

  $(".genoverse_panel button.dragSelect").click(function(){
    browser.setDragAction('select');
    $(".genoverse_panel button.dragSelect").addClass('active');
    $(".genoverse_panel button.dragScroll").removeClass('active');        
  });

  $(".genoverse_panel button.dragScroll").click(function(){
    browser.setDragAction('scroll');
    $(".genoverse_panel button.dragSelect").removeClass('active');
    $(".genoverse_panel button.dragScroll").addClass('active');     
  });


  if (browser.wheelAction == 'zoom') {
    $(".genoverse_panel button.wheelZoom").addClass('active');
    $(".genoverse_panel button.wheelOff").removeClass('active');
  } else {
    $(".genoverse_panel button.wheelZoom").removeClass('active');
    $(".genoverse_panel button.wheelOff").addClass('active');
  }


  $(".genoverse_panel button.wheelZoom").click(function(){
    browser.setWheelAction('zoom');
    $(".genoverse_panel button.wheelZoom").addClass('active');
    $(".genoverse_panel button.wheelOff").removeClass('active');
  });

  $(".genoverse_panel button.wheelOff").click(function(){
    browser.setWheelAction('off');
    $(".genoverse_panel button.wheelZoom").removeClass('active');
    $(".genoverse_panel button.wheelOff").addClass('active');    
  });

  for (var i=0; i<browser.controls.length; i++) {
    (function(control){
      var $control = $('<div class="button_set" />')
        .html('<button>'+ control.icon +'</button>')
        .attr({title: control.name})
        .on('click', function () {
          control.action.apply(browser);
        });
      $('td.genoverse_panel_right').append($control);
      if (control.init) control.init.apply(browser);
    })(browser.controls[i])
  }

});