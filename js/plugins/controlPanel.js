Genoverse.prototype.controls = [
  // // Uncomment this to see this example working
  // {
  //   icon   : '...',
  //   name   : 'Bla',
  //   init   : function (browser) {
  //   },
  //   action : function (browser) {
  //     alert('bla');
  //   }
  // }
];

// FIXME: this doesn't do anything
$('.tracksMenu input[placeholder=Search]').on('keyup', function () {
  var str = this.value.toLowerCase();
  
  $('.tracksMenu .tracksLibraryItem').each(function () {
    var track = $(this).data('track');
    var match = false;
    
    if (track.name.toLowerCase().indexOf(str) >= 0) {
      match = true;
    } else if (track.tags.length) {
      for (var i = 0; i < track.tags.length; i++) {
        if (track.tags[i].toLowerCase().indexOf(str) >= 0) {
          match = true;
          break;
        }
      }
    }
    
    $(this)[match ? 'show' : 'hide']();
  });
});

Genoverse.on('afterAddDomElements', function () {
  this.wrapper.after('<div class="gv_powered_by">Powered by <a target="_blank" href="http://genoverse.org">Genoverse</a></div>');
});

Genoverse.on('beforeInit', function () {
  var browser = this;
  
  if (!this.tracksLibrary) {
    this.tracksLibrary = $.extend(true, [], this.tracks.slice(1, this.tracks.length));
  }
  
  $(
    '<table cellspacing=0 cellpadding=0 class="genoverse">' +
    '  <tr>' +
    '    <td class="canvas_container"></td>' +
    '    <td class="genoverse_panel genoverse_panel_right">' +
    '      <div class="button_set" title="Scroll left and right by pressing and holding these buttons">' +
    '        <button class="scrollLeft">&#9668;</button><button class="scrollRight">&#9658;</button>' +
    '      </div>' +
    '      <div class="button_set zoom" title="Zoom-in and zoom-out">' +
    '        <button class="zoomIn">+</button><button class="zoomOut">&#8722;</button>' +
    '      </div>' +
    '      <div class="button_set toggleDrag" title="Toggle your mouse drag action between scroll left/right and select region">' +
    '        <button class="dragScroll">&#8596;</button><button class="dragSelect" title="Mouse wheel action to scroll the page up and down">&#9482;</button>' +
    '      </div>' +
    '      <div class="button_set toggleWheel" title="Toggle your mouse wheel action between zoom in/out and default page scroll">' +
    '        <button class="wheelOff" title="Mouse wheel to zoom in and out">&#8597;</button><button class="wheelZoom" title="Mouse wheel action to scroll the page up and down">&#177;</button>' +
    '      </div>' +
    '    </td>' +
    '  </tr>' +
    '</table>'
  ).appendTo(this.container);
  
  if (this.enableSharing) {
    $('.genoverse_panel_right').append(
      '<div class="button_set">' +
        '<button class="share" style="width: 100%">share</button>' +
      '</div>'
    );
  }

  this.container = $('.canvas_container', this.container);

  $('.genoverse_panel button.scrollLeft').mousehold(10, function () {
    browser.move(10);
  });
  
  $('.genoverse_panel button.scrollLeft,button.scrollRight').mouseup(function () {
    browser.updateURL();
    browser.checkTrackHeights();
  });
  
  $('.genoverse_panel button.scrollRight').mousehold(10, function () {
    browser.move(-10);
  });
  
  $('.genoverse_panel button.zoomIn').on('click', function () {
    browser.zoomIn();
  });
  
  $('.genoverse_panel button.zoomOut').on('click', function () {
    browser.zoomOut();
  });
  
  if (browser.dragAction === 'select') {
    $('.genoverse_panel button.dragSelect').addClass('active');
    $('.genoverse_panel button.dragScroll').removeClass('active');
  } else {
    $('.genoverse_panel button.dragSelect').removeClass('active');
    $('.genoverse_panel button.dragScroll').addClass('active');
  }
  
  $('.genoverse_panel button.dragSelect').on('click', function () {
    browser.setDragAction('select');
    $('.genoverse_panel button.dragSelect').addClass('active');
    $('.genoverse_panel button.dragScroll').removeClass('active');        
  });
  
  $('.genoverse_panel button.dragScroll').on('click', function () {
    browser.setDragAction('scroll');
    $('.genoverse_panel button.dragSelect').removeClass('active');
    $('.genoverse_panel button.dragScroll').addClass('active');     
  });
  
  if (browser.wheelAction === 'zoom') {
    $('.genoverse_panel button.wheelZoom').addClass('active');
    $('.genoverse_panel button.wheelOff').removeClass('active');
  } else {
    $('.genoverse_panel button.wheelZoom').removeClass('active');
    $('.genoverse_panel button.wheelOff').addClass('active');
  }
  
  $('.genoverse_panel button.wheelZoom').on('click', function () {
    browser.setWheelAction('zoom');
    $('.genoverse_panel button.wheelZoom').addClass('active');
    $('.genoverse_panel button.wheelOff').removeClass('active');
  });
  
  $('.genoverse_panel button.wheelOff').on('click', function () {
    browser.setWheelAction('off');
    $('.genoverse_panel button.wheelZoom').removeClass('active');
    $('.genoverse_panel button.wheelOff').addClass('active');    
  });
  
  for (var i = 0; i < browser.controls.length; i++) {
    (function (control) {
      $('<button>' + control.icon + '</button>')
        .attr('title', control.name)
        .addClass(control.class)
        .on('click', function () {
          control.action.call(this, browser);
        })
        .appendTo($('<div class="button_set">').appendTo('.genoverse_panel_right'));
      
      if (control.init) {
        control.init.call(this, browser);
      }
    })(browser.controls[i]);
  }
  
  // ESC key to toggle crosshair select to drag mode and close menues
  $(document).on('keydown', function (e) {
    if (e.keyCode === 27) {
      if ($('.genoverse_panel button.dragSelect').hasClass('active')) {
        $('.genoverse_panel button.dragScroll').trigger('click');
      }
      
      $('.gv_menu .close').trigger('click');
    }
  });
});

Genoverse.on('afterInit', function () {
  var browser      = this;
  var tracksButton = $('<button title="Tracks menu">&#9776; Tracks</button>').on('click', function () {
    var button = this;
    
    if ($(this).hasClass('active')) {
      $('.gv_menu.tracksMenu .close').trigger('click');
      $(this).removeClass('active');
    } else {
      var css = browser.wrapper.offset();
      
      css.top   = Math.max(css.top, $(document).scrollTop()) + 20;
      css.left += 50;
      css.width = browser.wrapper.width() - 100;
      
      var menu = browser.makeMenu({
        'Currently enabled tracks:'         : 'Available tracks:', 
        '<div class="currentTracks"></div>' : '<input placeholder="Search"><div class="availableTracks"></div>'
      }).css(css).addClass('tracksMenu');
      
      $('.close', menu).on('click', function () {
        $(button).removeClass('active');          
      });
      
      var currentTracks   = $('.currentTracks',   menu);
      var availableTracks = $('.availableTracks', menu);
      
      currentTracks.reload = function () {
        this.html('');
        this.listTracks();
      };
      
      currentTracks.listTracks = function () {
        for (var i = 1; i < browser.tracks.length; i++) {
          (function (track) {
            $('<div>').append(
              $('<div class="removeTrack">x</div> ').on('click', function () {
                $(this).parent().remove();
                track.remove();
                // FIXME: if the track is stranded, both strands get removed, but one removeTrack element is left behind until the tracks list is closed
              })
            ).append('<span>' + track.name + '</span>').appendTo(currentTracks);
          })(browser.tracks[i]);
        }
      };
      
      currentTracks.listTracks();
      
      if (browser.tracksLibrary && browser.tracksLibrary.length) {
        for (var i = 0; i < browser.tracksLibrary.length; i++) {
          (function (track) {
            $('<div class="tracksLibraryItem">').append(
              $('<div class="addTrack">+</div> ').on('click', function () {
                browser.addTrack(typeof track === 'function' ? track : $.extend(true, {}, track), browser.tracks.length);
                currentTracks.reload();
              })
            ).append('<span>' + track.name + '</span>').appendTo(availableTracks).data('track', track);
          })(browser.tracksLibrary[i]);
        }
      }
      
      $(this).addClass('active');
    }
  });
  
  this.labelContainer.prepend(
    $('<li class="genoverse_panel unsortable">').append(
      $('<div class="button_set" title="Tracks menu">').append(tracksButton)
    )
  );
});