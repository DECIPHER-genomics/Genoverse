module.exports = function () {
  this.requires = 'karyotype',
  this.controls = [
    // Scroll left/right
    {
      name    : 'Scroll left and right by pressing and holding these buttons',
      buttons : [{
        name    : 'Scroll left',
        icon    : '<i class="fas fa-chevron-left"></i>',
        'class' : 'gv-scroll-left'
      }, {
        name    : 'Scroll right',
        icon    : '<i class="fas fa-chevron-right"></i>',
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
        icon    : '<i class="fas fa-search-plus"></i>',
        'class' : 'gv-zoom-in',
        action  : function (browser) { browser.zoomIn(); }
      }, {
        name    : 'Zoom out',
        icon    : '<i class="fas fa-search-minus"></i>',
        'class' : 'gv-zoom-out',
        action  : function (browser) { browser.zoomOut(); }
      }]
    },

    // Toogle drag action
    {
      name    : 'Toggle your mouse drag action between scroll left/right and select region',
      buttons : [{
        name    : 'Mouse drag action to scroll the browser left or right',
        icon    : '<i class="fas fa-arrows-alt-h"></i>',
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
        icon    : '<i class="fas fa-arrows-alt-v"></i>',
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
      icon   : '<i class="fas fa-undo"></i>',
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

          $.each(buttons, function (j, button) {
            var el = $('<button />')
              .addClass(button.class)
              .attr('title', button.name)
              .append(button.icon)
              .appendTo(buttonSet);

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
        }(browser.controls[i]));
      }

      this.superContainer.width(this.width);

      // ESC key to toggle crosshair select to drag mode and close menus
      $(document).on('keydown', function (e) {
        if (e.keyCode === 27) {
          if (panel.find('button.gv-drag-select').hasClass('gv-active')) {
            panel.find('button.gv-drag-scroll').trigger('click');
          }

          $('.gvm-menu .gv-close').trigger('click');
        }
      });
    },

    afterInit: function () {
      var browser      = this;
      var tracksButton = $('<button class="gv-tracks-library-button" title="Tracks menu"><i class="fas fa-bars"></i> Tracks</button>').on('click', function () {
        var button = this;

        function getTrackTags(track, tags) {
          if (track.constructor && track.constructor.ancestor && track.constructor.ancestor.prototype) {
            tags = getTrackTags(track.constructor.ancestor.prototype, tags.concat(track.constructor.ancestor.prototype.tags || []));
          }

          return tags;
        }

        if ($(this).hasClass('gv-active')) {
          $('.gvm-menu.gv-tracks-menu .gv-close').trigger('click');
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

            $('input[placeholder=Search]', menu).on('keyup', function () {
              var str = this.value.toLowerCase();

              $('.gv-tracks-library-item:not(.gv-track-group,.gv-track-group-items)', menu).each(function () {
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

                $(this).toggleClass("gv-hidden", !match);
              });
            });

               // Once all the track show/hides have been run, we also need to show/hide the groups
               $('.gv-track-group-items', menu).each(function() {
                const allChildTracksFiltered = $(this).find('.gv-tracks-library-item:not(.gv-hidden)').length > 0;
                $(this).parent().toggle(allChildTracksFiltered);
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
                      var el = $('<div class="gv-track-menu-track">')
                        .append($('<i class="gv-remove-track gv-menu-button fas fa-times-circle">').on('click', function () { track.remove(); }))
                        .append('<span class="gv-track-menu-track-name" title="' + track.name + '">' + track.defaultName + '</span>')
                        .appendTo(currentTracks)
                        .data('track', track)
                        .addClass(track.unsortable ? 'gv-unsortable' : '');

                      var trackNameEl = el.find('.gv-track-menu-track-name').tipsy({ gravity: 'w', trigger: 'manual' }).on('mouseenter', function () {
                        var tip = $(this).tipsy('show').data('tipsy').$tip;

                        if (tip) {
                          tip.css('zIndex', 1002);
                        }
                      }).on('mouseleave', function () {
                        $(this).tipsy('hide');
                      });

                      if (track.name === track.defaultName) {
                        trackNameEl.tipsy('disable');
                      }
                    }(browser.tracks[i]));
                  }
                }
              }
            }).sortable({
              items  : 'div:not(.gv-unsortable)',
              cursor : 'move',
              axis   : 'y',
              handle : 'span',
              update : $.proxy(browser.updateTrackOrder, browser),
              start: function () {
                currentTracks.find('.gv-track-menu-track-name').each(function () { $(this).tipsy('hide').tipsy('disable'); });
              },
              stop: function () {
                currentTracks.find('.gv-track-menu-track-name').each(function () { $(this).tipsy('enable'); });
              }
            });

            currentTracks.data('listTracks')();

            if (browser.tracksLibrary && browser.tracksLibrary.length) {
              var tracksLibrary = $.map(browser.tracksLibrary, function (track) {
                const trackIsObject = typeof(track) === 'object'
                var name = trackIsObject ? track.name : track.prototype.name;
                var removable = trackIsObject ? true : track.prototype.removable;
                return name && removable !== false ? [[ name.toLowerCase(), track ]] : undefined;
              }).sort(function (a, b) {
                return a[0].localeCompare(b[0]);
              });

              var addTrack = function(track, $ele) {
                if (typeof track === 'object') {
                  // Don't both nesting if there's only one subtrack (and noCollapse !== true)
                  if (track.tracks.length === 1 && !track.noCollapse) {
                    addTrack(track.tracks[0], $ele);
                    return;
                  }
                  var $trackHeader = $('<div class="gv-tracks-library-item gv-track-group closed">').appendTo($ele);

                  $('<span />')
                    .text(track.name)
                    .on("click", function(){
                      $(this).parent().toggleClass('closed');
                    })
                    .appendTo($trackHeader);

                  var $trackGroup = $('<div class="gv-tracks-library-item gv-track-group-items">').appendTo($trackHeader);

                  // Now add all the subtracks to the group
                  track.tracks
                    .sort((a, b) => a.prototype.name.localeCompare(b.prototype.name)) // Sorts grouped tracks alphabetically like main tracks
                    .forEach(function(subtrack){
                      addTrack(subtrack, $trackGroup);
                    });
                } else {
                  $('<div class="gv-tracks-library-item">').append(
                    $('<i class="gv-add-track gv-menu-button fas fa-plus-circle"> ').on('click', function () {
                      browser.trackIds = browser.trackIds || {};
                      browser.trackIds[track.prototype.id] = browser.trackIds[track.prototype.id] || 1;
                      var id = track.prototype.id + (browser.tracksById[track.prototype.id] ? browser.trackIds[track.prototype.id]++ : '');
                      var defaultId = track.prototype.defaultId ? track.prototype.defaultId : track.prototype.id;
                      browser.addTrack(track.extend({ 
                        id,
                        defaultId
                      }));
                    })
                    )
                    .data('track', track.prototype)
                    .append($('<span />').text(track.prototype.name))
                    .appendTo($ele);
                  }
                };

                tracksLibrary.forEach(([_, track]) => {
                  addTrack(track, availableTracks);
                });
            }

            menu.css({ left: '50%', marginLeft: menu.width() / -2 });

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
      this.wrapper.after(`<div class="gv-powered-by">Powered by <a target="_blank" href="https://genoverse.org">Genoverse</a> v${VERSION}</div>`);
      this.superContainer.find('.gv-panel-left').append(this.labelContainer);
    },

    'afterAddTracks afterRemoveTracks': function () {
      var currentTracks = this.superContainer.find('.gv-tracks-menu .gv-current-tracks');

      if (currentTracks.length) {
        currentTracks.data('reload').call(currentTracks);
      }
    }
  });

  this.on({
    afterSetName: function (name) {
      var track = this.track;

      if (track && track.browser) {
        var menu = track.browser.superContainer.find('.gv-tracks-library-button').data('menu');

        if (menu) {
          menu.find('.gv-track-menu-track').filter(function () {
            return $(this).data('track') === track;
          }).children('.gv-track-menu-track-name').attr('title', name).each(function () {
            if (name === track.defaultName) {
              $(this).tipsy('hide').tipsy('disable');
            } else {
              $(this).tipsy('enable');
            }
          });
        }
      }
    }
  }, 'tracks');
};
