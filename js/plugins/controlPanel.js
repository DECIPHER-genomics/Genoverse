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
      icon    : '&#x21bb;',
      name    : 'Reset tracks and configuration',
      'class' : 'gv-button-large',
      action  : function (browser) { browser.resetConfig(); }
    });
  }

  this.on({
    beforeInit: function () {
      var browser = this;

      if (!this.tracksLibrary) {
        this.tracksLibrary = $.grep(this.tracks, function (track) { return track.prototype.name; });
      }

      var panel = $(
        '<table cellspacing=0 cellpadding=0 class="gv">' +
        '  <tr>' +
        '    <td class="gv-canvas-container"></td>' +
        '    <td class="gv-panel gv-panel-right">' +
        '      <div class="gv-button-set" title="Scroll left and right by pressing and holding these buttons">' +
        '        <button class="gv-scroll-left">&#9668;</button><button class="gv-scroll-right">&#9658;</button>' +
        '      </div>' +
        '      <div class="gv-button-set gv-zoom" title="Zoom-in and zoom-out">' +
        '        <button class="gv-zoom-in">+</button><button class="gv-zoom-out">&#8722;</button>' +
        '      </div>' +
        '      <div class="gv-button-set toggleDrag" title="Toggle your mouse drag action between scroll left/right and select region">' +
        '        <button class="gv-drag-scroll">&#8596;</button><button class="gv-drag-select" title="Mouse wheel action to scroll the page up and down">&#9482;</button>' +
        '      </div>' +
        '      <div class="gv-button-set gv-toggle-wheel" title="Toggle your mouse wheel action between zoom in/out and default page scroll">' +
        '        <button class="gv-wheel-off" title="Mouse wheel to zoom in and out">&#8597;</button><button class="gv-wheel-zoom" title="Mouse wheel action to scroll the page up and down">&#177;</button>' +
        '      </div>' +
        '    </td>' +
        '  </tr>' +
        '</table>'
      ).appendTo(this.container).find('.gv-panel');

      this.superContainer = this.container;
      this.container      = $('.gv-canvas-container', this.container);
      this.width         -= panel.width();

      panel.find('button.gv-scroll-left, button.gv-scroll-right').on({
        mousedown : function () { browser.startDragScroll(); },
        mouseup   : function () { browser.stopDragScroll();  }
      });

      panel.find('button.gv-scroll-left').mousehold(50, function () {
        browser.move(browser.scrollDelta);
      });

      panel.find('button.gv-scroll-right').mousehold(50, function () {
        browser.move(-browser.scrollDelta);
      });

      panel.find('button.gv-zoom-in').on('click', function () {
        browser.zoomIn();
      });

      panel.find('button.gv-zoom-out').on('click', function () {
        browser.zoomOut();
      });

      if (browser.dragAction === 'select') {
        panel.find('button.gv-drag-select').addClass('gv-active');
        panel.find('button.gv-drag-scroll').removeClass('gv-active');
      } else {
        panel.find('button.gv-drag-select').removeClass('gv-active');
        panel.find('button.gv-drag-scroll').addClass('gv-active');
      }

      panel.find('button.gv-drag-select').on('click', function () {
        browser.setDragAction('select');
        panel.find('button.gv-drag-select').addClass('gv-active');
        panel.find('button.gv-drag-scroll').removeClass('gv-active');
      });

      panel.find('button.gv-drag-scroll').on('click', function () {
        browser.setDragAction('scroll');
        panel.find('button.gv-drag-select').removeClass('gv-active');
        panel.find('button.gv-drag-scroll').addClass('gv-active');
      });

      if (browser.wheelAction === 'zoom') {
        panel.find('button.gv-wheel-zoom').addClass('gv-active');
        panel.find('button.gv-wheel-off').removeClass('gv-active');
      } else {
        panel.find('button.gv-wheel-zoom').removeClass('gv-active');
        panel.find('button.gv-wheel-off').addClass('gv-active');
      }

      panel.find('button.gv-wheel-zoom').on('click', function () {
        browser.setWheelAction('zoom');
        $(this).addClass('gv-active');
        panel.find('button.gv-wheel-off').removeClass('gv-active');
      });

      panel.find('button.gv-wheel-off').on('click', function () {
        browser.setWheelAction('off');
        panel.find('button.gv-wheel-zoom').removeClass('gv-active');
        $(this).addClass('gv-active');
      });

      for (var i = 0; i < browser.controls.length; i++) {
        (function (control) {
          var button = $('<button>' + control.icon + '</button>').addClass(control['class']).attr('title', control.name).on('click', function () {
            control.action.call(this, browser);
          }).appendTo(
            $('<div class="gv-button-set">').attr('title', control.name).appendTo(browser.superContainer.find('.gv-panel-right'))
          );

          if (control.init) {
            control.init.call(button[0], browser);
          }
        })(browser.controls[i]);
      }

      // ESC key to toggle crosshair select to drag mode and close menus
      $(document).on('keydown', function (e) {
        if (e.keyCode === 27) {
          if (panel.find('button.gv-drag-select').hasClass('gv-active')) {
            panel.find('button.gv-drag-scroll').trigger('click');
          }

          $('.gv-menu .gv-close').trigger('click');
        }
      });
    },

    afterInit: function () {
      var browser      = this;
      var tracksButton = $('<button title="Tracks menu">&#9776; Tracks</button>').on('click', function () {
        var button = this;

        if ($(this).hasClass('gv-active')) {
          $('.gv-menu.gv-tracks-menu .gv-close').trigger('click');
          $(this).removeClass('gv-active');
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
              'Currently enabled tracks:'             : 'Available tracks:',
              '<div class="gv-current-tracks"></div>' : '<input placeholder="Search"><div class="gv-available-tracks"></div>'
            }).css(css).addClass('gv-tracks-menu');

            $('input[placeholder=Search]', menu).on('keyup', function () {
              var str = this.value.toLowerCase();

              $('.gv-tracks-library-item', menu).each(function () {
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

            $('.gv-close', menu).on('click', function () {
              $(button).removeClass('gv-active');
            });

            var availableTracks = $('.gv-available-tracks', menu);
            var currentTracks   = $('.gv-current-tracks',   menu).data({
              reload     : function () { $(this).empty().data('listTracks')(); },
              listTracks : function () {
                for (var i = 0; i < browser.tracks.length; i++) {
                  if (browser.tracks[i].name && !(browser.tracks[i] instanceof Genoverse.Track.Legend)) {
                    (function (track) {
                      $('<div>')
                        .append($('<div class="gv-remove-track gv-menu-button">x</div>').on('click', function () { track.remove(); }))
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
                  $('<div class="gv-tracks-library-item">').append(
                    $('<div class="gv-add-track gv-menu-button">+</div> ').on('click', function () {
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

          $(this).addClass('gv-active');
        }
      });

      this.labelContainer.prepend(
        $('<li class="gv-panel gv-unsortable">').append(
          $('<div class="gv-button-set" title="Tracks menu">').append(tracksButton)
        )
      );
    },

    afterAddDomElements: function () {
      this.wrapper.after('<div class="gv-powered-by">Powered by <a target="_blank" href="http://genoverse.org">Genoverse</a></div>');
    },

    'afterAddTracks afterRemoveTracks': function () {
      var currentTracks = this.superContainer.find('.gv-tracks-menu .gv-current-tracks');

      if (currentTracks.length) {
        currentTracks.data('reload').call(currentTracks);
      }
    }
  });
};