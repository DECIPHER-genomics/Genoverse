Genoverse.Plugins.controlPanel = function () {
  var genoverse = this;

  this.controls = [
    // Scroll left/right
    {
      name    : 'Scroll left and right by pressing and holding these buttons',
      buttons : [{
        name    : 'Scroll left',
        icon    : '<i class="fa fa-chevron-left"></i>',
        'class' : 'gv-scroll-left'
      }, {
        name    : 'Scroll right',
        icon    : '<i class="fa fa-chevron-right"></i>',
        'class' : 'gv-scroll-right'
      }],
      init: function (browser) {
        var el = $(this);

        el.find('.gv-scroll-left, .gv-scroll-right').on({
          mousedown : function () { browser.startDragScroll(); },
          mouseup   : function () { browser.stopDragScroll();  }
        });

        el.find('.gv-scroll-left').mousehold(50, function () {
          browser.move(browser.scrollDelta);
        });

        el.find('.gv-scroll-right').mousehold(50, function () {
          browser.move(-browser.scrollDelta);
        });
      }
    },

    // Zoom in/out
    {
      name    : 'Zoom-in and zoom-out',
      buttons : [{
        name    : 'Zoom in',
        icon    : '<i class="fa fa-search-plus"></i>',
        'class' : 'gv-zoom-in',
        action  : function (browser) { browser.zoomIn(); }
      }, {
        name    : 'Zoom out',
        icon    : '<i class="fa fa-search-minus"></i>',
        'class' : 'gv-zoom-out',
        action  : function (browser) { browser.zoomOut(); }
      }]
    },

    // Toogle drag action
    {
      name    : 'Toggle your mouse drag action between scroll left/right and select region',
      buttons : [{
        name    : 'Mouse drag action to scroll the browser left or right',
        icon    : '<i class="fa fa-arrows-h"></i>',
        'class' : 'gv-drag-scroll',
        action  : function (browser) {
          browser.setDragAction('scroll');
          $(this).addClass('gv-active').siblings().removeClass('gv-active');
        }
      }, {
        name    : 'Mouse drag action to select a region',
        icon    : '<i></i>',
        'class' : 'gv-drag-select',
        action  : function (browser) {
          browser.setDragAction('select');
          $(this).addClass('gv-active').siblings().removeClass('gv-active');
        }
      }],
      init: function (browser) {
        $(this).find('.gv-drag-' + browser.dragAction).addClass('gv-active').siblings().removeClass('gv-active');
      }
    },

    // Toogle wheel action
    {
      name    : 'Toggle your mouse wheel action between zoom in/out and default page scroll',
      buttons : [{
        name    : 'Mouse wheel action to scroll the page up and down',
        icon    : '<i class="fa fa-arrows-v"></i>',
        'class' : 'gv-wheel-off',
        action  : function (browser) {
          browser.setWheelAction('off');
          $(this).addClass('gv-active').siblings().removeClass('gv-active');
        }
      }, {
        name    : 'Mouse wheel to zoom in and out',
        icon    : '&#177;',
        'class' : 'gv-wheel-zoom',
        action  : function (browser) {
          browser.setWheelAction('zoom');
          $(this).addClass('gv-active').siblings().removeClass('gv-active');
        }
      }],
      init: function (browser) {
        $(this).find('.gv-wheel-' + browser.wheelAction).addClass('gv-active').siblings().removeClass('gv-active');
      }
    }
  ];

  if (this.saveable) {
    this.controls.push({
      icon   : '<i class="fa fa-undo"></i>',
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
        '<table cellspacing=0 cellpadding=0 class="gv">' +
        '  <tr>' +
        '    <td class="gv-panel gv-panel-left"></td>' +
        '    <td class="gv-canvas-container"></td>' +
        '    <td class="gv-panel gv-panel-right"></td>' +
        '  </tr>' +
        '</table>'
      ).appendTo(this.container).find('.gv-panel-right');

      this.controlPanel   = panel;
      this.superContainer = this.container;
      this.container      = $('.gv-canvas-container', this.container);

      for (var i = 0; i < browser.controls.length; i++) {
        (function (control) {
          var buttonSet = $('<div class="gv-button-set">').attr('title', control.name).appendTo(browser.superContainer.find('.gv-panel-right'));
          var buttons   = control.buttons || [ control ];
          var el;

          $.each(buttons, function (i, button) {
            var el = $('<button>' + button.icon + '</button>').addClass(button['class']).attr('title', button.name).appendTo(buttonSet);

            if (button.action) {
              el.on('click', function () {
                button.action.call(this, browser);
              });
            }

            if (button.init && button !== control) {
              button.init.call(el[0], browser);
            }
          });

          if (control.init) {
            control.init.call(buttonSet, browser);
          }
        })(browser.controls[i]);
      }

      this.superContainer.width(this.width);

      this.width -= panel.width();

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
      var tracksButton = $('<button title="Tracks menu"><i class="fa fa-navicon"></i> Tracks</button>').on('click', function () {
        var button = this;

        function getTrackTags(track, tags) {
          if (track.constructor && track.constructor.ancestor && track.constructor.ancestor.prototype) {
            tags = getTrackTags(track.constructor.ancestor.prototype, tags.concat(track.constructor.ancestor.prototype.tags || []));
          }

          return tags;
        }

        if ($(this).hasClass('gv-active')) {
          $('.gv-menu.gv-tracks-menu .gv-close').trigger('click');
          $(this).removeClass('gv-active');
        } else {
          var menu = $(this).data('menu');

          if (menu) {
            menu.show();
          } else {
            menu = browser.makeMenu({
              'Currently enabled tracks:'             : 'Available tracks:',
              '<div class="gv-current-tracks"></div>' : '<input placeholder="Search"><div class="gv-available-tracks"></div>'
            }).addClass('gv-tracks-menu');

            menu.css({ marginLeft: menu.width() / -2 });

            $('input[placeholder=Search]', menu).on('keyup', function () {
              var str = this.value.toLowerCase();

              $('.gv-tracks-library-item', menu).each(function () {
                var track = $(this).data('track');
                var match = false;

                if (track.name && track.name.toLowerCase().indexOf(str) >= 0) {
                  match = true;
                } else {
                  var tags = getTrackTags(track, []).concat(track.tags || []);

                  for (var i = 0; i < tags.length; i++) {
                    if (tags[i].toLowerCase().indexOf(str) >= 0) {
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
                  if (browser.tracks[i].name && browser.tracks[i].removable !== false && !browser.tracks[i].parentTrack) {
                    (function (track) {
                      $('<div>')
                        .append($('<i class="gv-remove-track gv-menu-button fa fa-times-circle">').on('click', function () { track.remove(); }))
                        .append('<span>' + track.name + '</span>')
                        .appendTo(currentTracks)
                        .data('track', track)
                        .addClass(track.unsortable ? 'gv-unsortable' : '');
                    })(browser.tracks[i]);
                  }
                }
              }
            }).sortable({
              items  : 'div:not(.gv-unsortable)',
              cursor : 'move',
              axis   : 'y',
              handle : 'span',
              update : $.proxy(browser.updateTrackOrder, browser)
            });

            currentTracks.data('listTracks')();

            if (browser.tracksLibrary && browser.tracksLibrary.length) {
              var tracksLibrary = $.map(browser.tracksLibrary, function (track) {
                return track.prototype.name && track.prototype.removable !== false ? [[ track.prototype.name.toLowerCase(), track ]] : undefined;
              }).sort(function (a, b) { return a[0] > b[0] ? 1 : -1; });

              for (var i = 0; i < tracksLibrary.length; i++) {
                (function (track) {
                  $('<div class="gv-tracks-library-item">').append(
                    $('<i class="gv-add-track gv-menu-button fa fa-plus-circle"> ').on('click', function () {
                      var sortableTracks = browser.tracks.filter(function (t) { return !(t.fixedOrder || t.unsortable); });

                      browser.trackIds = browser.trackIds || {};
                      browser.trackIds[track.prototype.id] = browser.trackIds[track.prototype.id] || 1;

                      browser.addTrack(track.extend({ id: track.prototype.id + (browser.tracksById[track.prototype.id] ? browser.trackIds[track.prototype.id]++ : '') }));
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
        $('<li class="gv-unsortable">').append(
          $('<div class="gv-button-set" title="Tracks menu">').append(tracksButton)
        )
      );
    },

    afterAddDomElements: function () {
      this.wrapper.after('<div class="gv-powered-by">Powered by <a target="_blank" href="http://genoverse.org">Genoverse</a></div>');
      this.superContainer.find('.gv-panel-left').append(this.labelContainer);
    },

    'afterAddTracks afterRemoveTracks': function () {
      var currentTracks = this.superContainer.find('.gv-tracks-menu .gv-current-tracks');

      if (currentTracks.length) {
        currentTracks.data('reload').call(currentTracks);
      }
    }
  });
};

Genoverse.Plugins.controlPanel.requires = 'karyotype';
