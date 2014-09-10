Genoverse.Plugins.controlPanel = function () {
  this.controls = [
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

  if (this.saveable) {
    this.controls.push({
      icon   : '&#x21bb;',
      name   : 'Reset tracks and configuration',
      action : function (browser) { browser.resetConfig(); }
    });
  }

  this.on({
    beforeInit: function () {
      var browser = this;
      
      if (!this.tracksLibrary) {
        this.tracksLibrary = $.grep(this.tracks, function (track) { return track.prototype.name; });
      }
      
      var panel = $(
        '<table cellspacing=0 cellpadding=0 class="genoverse">' +
        '  <tr>' +
        '    <td class="genoverse_canvas_container"></td>' +
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
      ).appendTo(this.container).find('.genoverse_panel');

      this.superContainer = this.container;
      this.container      = $('.genoverse_canvas_container', this.container);
      this.width         -= panel.width();
      
      panel.find('button.scrollLeft, button.scrollRight').on({
        mousedown : function () { browser.startDragScroll(); },
        mouseup   : function () { browser.stopDragScroll();  }
      });
      
      panel.find('button.scrollLeft').mousehold(50, function () {
        browser.move(browser.scrollDelta);
      });
      
      panel.find('button.scrollRight').mousehold(50, function () {
        browser.move(-browser.scrollDelta);
      });
      
      panel.find('button.zoomIn').on('click', function () {
        browser.zoomIn();
      });
      
      panel.find('button.zoomOut').on('click', function () {
        browser.zoomOut();
      });
      
      if (browser.dragAction === 'select') {
        panel.find('button.dragSelect').addClass('genoverse_active');
        panel.find('button.dragScroll').removeClass('genoverse_active');
      } else {
        panel.find('button.dragSelect').removeClass('genoverse_active');
        panel.find('button.dragScroll').addClass('genoverse_active');
      }
      
      panel.find('button.dragSelect').on('click', function () {
        browser.setDragAction('select');
        panel.find('button.dragSelect').addClass('genoverse_active');
        panel.find('button.dragScroll').removeClass('genoverse_active');
      });
      
      panel.find('button.dragScroll').on('click', function () {
        browser.setDragAction('scroll');
        panel.find('button.dragSelect').removeClass('genoverse_active');
        panel.find('button.dragScroll').addClass('genoverse_active');
      });
      
      if (browser.wheelAction === 'zoom') {
        panel.find('button.wheelZoom').addClass('genoverse_active');
        panel.find('button.wheelOff').removeClass('genoverse_active');
      } else {
        panel.find('button.wheelZoom').removeClass('genoverse_active');
        panel.find('button.wheelOff').addClass('genoverse_active');
      }
      
      panel.find('button.wheelZoom').on('click', function () {
        browser.setWheelAction('zoom');
        $(this).addClass('genoverse_active');
        panel.find('button.wheelOff').removeClass('genoverse_active');
      });
      
      panel.find('button.wheelOff').on('click', function () {
        browser.setWheelAction('off');
        panel.find('button.wheelZoom').removeClass('genoverse_active');
        $(this).addClass('genoverse_active');
      });

      for (var i = 0; i < browser.controls.length; i++) {
        (function (control) {
          var button = $('<button>' + control.icon + '</button>').addClass(control['class']).attr('title', control.name).on('click', function () {
            control.action.call(this, browser);
          }).appendTo(
            $('<div class="button_set">').attr('title', control.name).appendTo(browser.superContainer.find('.genoverse_panel_right'))
          );

          if (control.init) {
            control.init.call(button[0], browser);
          }
        })(browser.controls[i]);
      }
      
      // ESC key to toggle crosshair select to drag mode and close menus
      $(document).on('keydown', function (e) {
        if (e.keyCode === 27) {
          if (panel.find('button.dragSelect').hasClass('genoverse_active')) {
            panel.find('button.dragScroll').trigger('click');
          }
          
          $('.gv_menu .close').trigger('click');
        }
      });
    },
    
    afterInit: function () {
      var browser      = this;
      var tracksButton = $('<button title="Tracks menu">&#9776; Tracks</button>').on('click', function () {
        var button = this;
        
        if ($(this).hasClass('genoverse_active')) {
          $('.gv_menu.tracksMenu .close').trigger('click');
          $(this).removeClass('genoverse_active');
        } else {
          var menu = $(this).data('menu');
          var css  = browser.wrapper.offset();
          
          css.top   = Math.max(css.top, $(document).scrollTop()) + 20;
          css.left += 50;
          css.width = browser.wrapper.width() - 100;
          
          if (menu) {
            menu.show();
          } else {
            menu = browser.makeMenu({
              'Currently enabled tracks:'         : 'Available tracks:',
              '<div class="currentTracks"></div>' : '<input placeholder="Search"><div class="availableTracks"></div>'
            }).css(css).addClass('tracksMenu');
            
            $('input[placeholder=Search]', menu).on('keyup', function () {
              var str = this.value.toLowerCase();
              
              $('.tracksLibraryItem', menu).each(function () {
                var track = $(this).data('track');
                var match = false;
                
                if (track.name && track.name.toLowerCase().indexOf(str) >= 0) {
                  match = true;
                } else if (track.tags) {
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
            
            $('.genoverse_close', menu).on('click', function () {
              $(button).removeClass('genoverse_active');
            });
            
            var availableTracks = $('.availableTracks', menu);
            var currentTracks   = $('.currentTracks',   menu).data({
              reload     : function () { $(this).empty().data('listTracks')(); },
              listTracks : function () {
                for (var i = 0; i < browser.tracks.length; i++) {
                  if (browser.tracks[i].name && !(browser.tracks[i] instanceof Genoverse.Track.Legend)) {
                    (function (track) {
                      $('<div>')
                        .append($('<div class="genoverse_removeTrack">x</div>').on('click', function () { track.remove(); }))
                        .append('<span>' + track.name + '</span>')
                        .appendTo(currentTracks);
                    })(browser.tracks[i]);
                  }
                }
              }
            });
            
            currentTracks.data('listTracks')();
            
            if (browser.tracksLibrary && browser.tracksLibrary.length) {
              var tracksLibrary = $.map(browser.tracksLibrary, function (track) { return track.prototype.name ? [[ track.prototype.name.toLowerCase(), track ]] : undefined }).sort(function (a, b) { return b < a });
              
              for (var i = 0; i < tracksLibrary.length; i++) {
                (function (track) {
                  $('<div class="tracksLibraryItem">').append(
                    $('<div class="genoverse_addTrack">+</div> ').on('click', function () {
                      browser.trackIds = browser.trackIds || {};
                      browser.trackIds[track.prototype.id] = browser.trackIds[track.prototype.id] || 1;

                      browser.addTrack(
                        track.extend({ id: track.prototype.id + (browser.tracksById[track.prototype.id] ? browser.trackIds[track.prototype.id]++ : '') }),
                        Math.floor(browser.tracks.sort(function (a, b) { return b.order - a.order; })[0].order + 1)
                      );
                    })
                  ).append('<span>' + track.prototype.name + '</span>').appendTo(availableTracks).data('track', track.prototype);
                })(tracksLibrary[i][1]);
              }
            }
            
            $(this).data('menu', menu);
          }
          
          $(this).addClass('genoverse_active');
        }
      });
      
      this.labelContainer.prepend(
        $('<li class="genoverse_panel unsortable">').append(
          $('<div class="button_set" title="Tracks menu">').append(tracksButton)
        )
      );
    },
    
    afterAddDomElements: function () {
      this.wrapper.after('<div class="genoverse_powered_by">Powered by <a target="_blank" href="http://genoverse.org">Genoverse</a></div>');
    },
    
    'afterAddTracks afterRemoveTracks': function () {
      var currentTracks = this.superContainer.find('.tracksMenu .currentTracks');
      
      if (currentTracks.length) {
        currentTracks.data('reload').call(currentTracks);
      }
    }
  });
};
