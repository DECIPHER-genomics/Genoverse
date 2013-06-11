var defaultControls = [

  $('<a title="More info" />').html('?').click(function(){
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

  $('<a title="Close track" />').html('x').click(function(){
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
  if (this.controls === 'off') return;

  var controls = (this.controls || []).concat(defaultControls);
  this.trackControls = $('<div class="track_controls" />').prependTo(this.container);

  for (var i=0; i<controls.length; i++) {
    controls[i].clone(true).css({ display: 'none' }).data({track : this}).appendTo(this.trackControls);
  }

  toggle.clone(true).data({track : this}).appendTo(this.trackControls);
});

Genoverse.Track.on('afterResize', function() {
  if (!this.trackControls) {
    return;
  }
  
  if (this.height < this.trackControls.outerHeight(true)) {
    this.trackControls.hide();
  } else {
    this.trackControls.show();    
  }
});