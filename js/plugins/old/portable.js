// portable assumes that all necessary js/css files were loaded before

$(function () {

  var config = $('script[src="js/plugins/portable.js"]').text();
  try {
    config = eval('('+ config +')');
  } catch (e) {
    console.log('ERROR while parsing the configuration:' + e);
  };

  if (config) {
    var portableContainer = $('<table cellspacing=0 cellpadding=0 class="genoverse">')
                            .append('<tr><td class="canvas_container"></td><td class="genoverse_panel genoverse_panel_right"></td></tr>')
                            .appendTo(config.container);

    config.container = $('td.canvas_container');

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

    window.genoverse = new Genoverse(config);
  }


  $(".genoverse_panel button.scrollLeft").mousehold(50, function () {
    $('.track_container .resizer').hide();
    genoverse.move(NaN, 100, 100);
  });

  $(".genoverse_panel button.scrollLeft,button.scrollRight").mouseup(function () {
    $('.track_container .resizer').show();
    genoverse.updateURL();
    genoverse.checkTrackSize();
  });

  $(".genoverse_panel button.scrollRight").mousehold(50, function () {
    $('.track_container .resizer').hide();
    genoverse.move(NaN, -100, 100);
  });

  $(".genoverse_panel button.zoomIn").click(function () {
    genoverse.zoomIn();
  });

  $(".genoverse_panel button.zoomOut").click(function () {
    genoverse.zoomOut();
  });


  if (genoverse.dragAction == 'select') {
    $(".genoverse_panel button.dragSelect").addClass('active');
    $(".genoverse_panel button.dragScroll").removeClass('active');
  } else {
    $(".genoverse_panel button.dragSelect").removeClass('active');
    $(".genoverse_panel button.dragScroll").addClass('active');
  }

  $(".genoverse_panel button.dragSelect").click(function(){
    genoverse.setDragAction('select');
    $(".genoverse_panel button.dragSelect").addClass('active');
    $(".genoverse_panel button.dragScroll").removeClass('active');        
  });

  $(".genoverse_panel button.dragScroll").click(function(){
    genoverse.setDragAction('scroll');
    $(".genoverse_panel button.dragSelect").removeClass('active');
    $(".genoverse_panel button.dragScroll").addClass('active');     
  });


  if (genoverse.wheelAction == 'zoom') {
    $(".genoverse_panel button.wheelZoom").addClass('active');
    $(".genoverse_panel button.wheelOff").removeClass('active');
  } else {
    $(".genoverse_panel button.wheelZoom").removeClass('active');
    $(".genoverse_panel button.wheelOff").addClass('active');
  }


  $(".genoverse_panel button.wheelZoom").click(function(){
    genoverse.setWheelAction('zoom');
    $(".genoverse_panel button.wheelZoom").addClass('active');
    $(".genoverse_panel button.wheelOff").removeClass('active');
  });

  $(".genoverse_panel button.wheelOff").click(function(){
    genoverse.setWheelAction('off');
    $(".genoverse_panel button.wheelZoom").removeClass('active');
    $(".genoverse_panel button.wheelOff").addClass('active');    
  });


});