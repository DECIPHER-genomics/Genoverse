var defaultControls = [

  $('<a />').html('?').click(function(){
    var track  = $(this).data('track');
    //debugger;
    var offset   = track.container.offset();
    offset.left += 50;
    offset.width = track.width - 100;

    if (!track.menus.filter('.track_info').length) {
      track.browser.makeMenu({
        title : track.name,
        ' '   : track.info
      }, false, track).css(offset).addClass('track_info');
    }
  }),

  $('<a />').html('x').click(function(){
    var track = $(this).data('track');
    track.remove();    
  }),

];

var toggle = $('<a />').html('&laquo;').click(function(){
  if ($(this).parent().hasClass('maximized')) {
    $(this)
      .parent().removeClass('maximized').end()
      .siblings().css({ display: 'none' }).end()
      .html('&laquo;');
  } else {
    $(this)
      .parent().addClass('maximized').end()
      .siblings().css({ display: 'inline' }).end()
      .html('&raquo;');
  }
});


Genoverse.Track.on('afterAddDomElements', function() {
  var track = this;
  if (track.controls === 'off') return;

  var controls = (track.controls || []).concat(defaultControls);
  var div = $('<div class="track_controls" />').prependTo(track.container);

  for (var i=0; i<controls.length; i++) {
    controls[i].clone(true).css({ display: 'none' }).data({track : track}).appendTo(div);
  }

  toggle.clone(true).data({track : track}).prependTo(div);
});