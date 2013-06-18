var defaultControls = [
  $('<a title="More info">').html('?').on('click', function () {
    var track  = $(this).data('track');
    var offset = track.container.offset();
    
    offset.left += 50;
    offset.width = track.width - 100;
    
    if (!track.menus.filter('.track_info').length) {
      track.browser.makeMenu({
        title : track.name,
        ' '   : track.info
      }, false, track).css(offset).addClass('track_info');
    }
  }),
  
  $('<a class="height_toggle">').html('&nbsp;').on({
    click: function () {
      var track = $(this).data('track');
      var height;
      
      if ((track.autoHeight = !track.autoHeight)) {
        track.heightBeforeToggle = track.height;
        height = track.fullVisibleHeight;
      } else {
        height = track.heightBeforeToggle || track.initialHeight;
      }
      
      $(this).trigger('toggleState');
      
      track.resize(height, true);
    },
    toggleState: function () { // custom event to set title and change the icon
      var autoHeight = $(this).data('track').autoHeight;
      this.title = autoHeight ? 'Set track to fixed height' : 'Set track to auto-adjust height';
      $(this)[autoHeight ? 'addClass' : 'removeClass']('auto_height');
    }
  }),
  
  $('<a title="Close track">').html('x').on('click', function () {
    var track = $(this).data('track');
    track.remove();
  })
];

var toggle = $('<a>').html('&laquo;').on('click', function () {
  if ($(this).parent().hasClass('maximized')) {
    $(this)
      .parent().removeClass('maximized').end()
      .siblings().css({ display: 'none' }).end()
      .html('&laquo;');
  } else {
    $(this)
      .parent().addClass('maximized').end()
      .siblings().css({ display: 'inline-block' }).end()
      .html('&raquo;');
  }
});

Genoverse.Track.on('afterAddDomElements', function() {
  if (this.controls === 'off') {
    return;
  }
  
  var controls = (this.controls || []).concat(defaultControls);
  
  this.trackControls = $('<div class="track_controls">').prependTo(this.container);

  for (var i = 0; i < controls.length; i++) {
    controls[i].clone(true).css({ display: 'none' }).data('track', this).appendTo(this.trackControls);
  }
  
  this.heightToggler = this.trackControls.children('.height_toggle').trigger('toggleState');
  
  toggle.clone(true).data('track', this).appendTo(this.trackControls);
});

Genoverse.Track.on('afterResize', function() {
  if (this.trackControls) {
    this.trackControls[this.height < this.trackControls.outerHeight(true) ? 'hide' : 'show']();
  }
});

Genoverse.Track.on('afterResetHeight', function () {
  if (this.resizable && this.heightToggler) {
    this.heightToggler[this.autoHeight ? 'addClass' : 'removeClass']('auto_height');
    this.heightToggler.trigger('toggleState');
  }
});

Genoverse.Track.on('afterSetModelView', function () {
  if (this.heightToggler) {
    this.heightToggler.trigger('toggleState')[!this.fixedHeight && this.resizable !== false ? 'removeClass' : 'addClass']('hidden');
  }
});