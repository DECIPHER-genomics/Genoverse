import '../../css/controlPanel.css';
import karyotype from './karyotype';

const plugin = function (pluginConf) {
  this.controls = [
    // Scroll left/right
    {
      name    : 'Scroll left and right by pressing and holding these buttons',
      buttons : [{
        name  : 'Scroll left',
        icon  : '<i class="fas fa-chevron-left"></i>',
        class : 'gv-scroll-left',
      }, {
        name  : 'Scroll right',
        icon  : '<i class="fas fa-chevron-right"></i>',
        class : 'gv-scroll-right',
      }],
      init: function (browser) {
        const el = $(this);

        el.find('.gv-scroll-left, .gv-scroll-right').on({
          mousedown : () => { browser.startDragScroll(); },
          mouseup   : () => { browser.stopDragScroll();  },
        });

        el.find('.gv-scroll-left').mousehold(50,  () => { browser.move(browser.scrollDelta);  });
        el.find('.gv-scroll-right').mousehold(50, () => { browser.move(-browser.scrollDelta); });
      },
    },

    // Zoom in/out
    {
      name    : 'Zoom-in and zoom-out',
      buttons : [{
        name   : 'Zoom in',
        icon   : '<i class="fas fa-search-plus"></i>',
        class  : 'gv-zoom-in',
        action : (browser) => { browser.zoomIn(); },
      }, {
        name   : 'Zoom out',
        icon   : '<i class="fas fa-search-minus"></i>',
        class  : 'gv-zoom-out',
        action : (browser) => { browser.zoomOut(); },
      }],
    },

    // Toogle drag action
    {
      name    : 'Toggle your mouse drag action between scroll left/right and select region',
      buttons : [{
        name   : 'Mouse drag action to scroll the browser left or right',
        icon   : '<i class="fas fa-arrows-alt-h"></i>',
        class  : 'gv-drag-scroll',
        action : function (browser) {
          browser.setDragAction('scroll');
          $(this).addClass('gv-active').siblings().removeClass('gv-active');
        },
      }, {
        name   : 'Mouse drag action to select a region',
        icon   : '<i></i>',
        class  : 'gv-drag-select',
        action : function (browser) {
          browser.setDragAction('select');
          $(this).addClass('gv-active').siblings().removeClass('gv-active');
        },
      }],
      init: function (browser) {
        $(this).find(`.gv-drag-${browser.dragAction}`).addClass('gv-active').siblings().removeClass('gv-active');
      },
    },

    // Toogle wheel action
    {
      name    : 'Toggle your mouse wheel action between zoom in/out and default page scroll',
      buttons : [{
        name   : 'Mouse wheel action to scroll the page up and down',
        icon   : '<i class="fas fa-arrows-alt-v"></i>',
        class  : 'gv-wheel-off',
        action : function (browser) {
          browser.setWheelAction('off');
          $(this).addClass('gv-active').siblings().removeClass('gv-active');
        },
      }, {
        name   : 'Mouse wheel to zoom in and out',
        icon   : '&#177;',
        class  : 'gv-wheel-zoom',
        action : function (browser) {
          browser.setWheelAction('zoom');
          $(this).addClass('gv-active').siblings().removeClass('gv-active');
        },
      }],
      init: function (browser) {
        $(this).find(`.gv-wheel-${browser.wheelAction}`).addClass('gv-active').siblings().removeClass('gv-active');
      },
    },
  ];

  if (this.saveable) {
    this.controls.push({
      icon   : '<i class="fas fa-undo"></i>',
      name   : 'Reset tracks and configuration',
      action : (browser) => { browser.resetConfig(); },
    });
  }

  this.on({
    beforeInit: function () {
      const browser = this;

      this.tracksLibrary = (this.tracksLibrary || this.tracks).map(
        track => this.normaliseTrackDefinition(track)
      ).filter(
        track => track.prototype.name
      );

      const panel = $(`
        <table cellspacing=0 cellpadding=0 class="gv">
          <tr>
            <td class="gv-panel gv-panel-left"></td>
            <td class="gv-canvas-container"></td>
            <td class="gv-panel gv-panel-right"></td>
          </tr>
        </table>
      `).appendTo(this.container).find('.gv-panel-right');

      this.controlPanel   = panel;
      this.superContainer = this.container;
      this.container      = $('.gv-canvas-container', this.container);

      browser.controls.forEach(
        (control) => {
          const buttonSet = $('<div class="gv-button-set">').attr('title', control.name).appendTo(browser.superContainer.find('.gv-panel-right'));
          const buttons   = control.buttons || [ control ];

          buttons.forEach(
            (button) => {
              const el = $(`<button>${button.icon}</button>`).addClass(button.class).attr('title', button.name).appendTo(buttonSet);

              if (button.action) {
                el.on('click', () => {
                  button.action.call(el[0], browser);
                });
              }

              if (button.init && button !== control) {
                button.init.call(el[0], browser);
              }
            }
          );

          if (control.init) {
            control.init.call(buttonSet, browser);
          }
        }
      );

      this.superContainer.width(this.width);

      // ESC key to toggle crosshair select to drag mode and close menus
      $(document).on('keydown', (e) => {
        if (e.keyCode === 27) {
          if (panel.find('button.gv-drag-select').hasClass('gv-active')) {
            panel.find('button.gv-drag-scroll').trigger('click');
          }

          $('.gv-menu .gv-close').trigger('click');
        }
      });
    },

    afterInit: function () {
      const browser      = this;
      const tracksButton = $('<button class="gv-tracks-library-button" title="Tracks menu"><i class="fas fa-bars"></i> Tracks</button>').on('click', function () {
        const button = this;

        const getTrackTags = (track, tags) => (
          track.constructor?.ancestor?.prototype
            ? getTrackTags(track.constructor.ancestor.prototype, tags.concat(track.constructor.ancestor.prototype.tags || []))
            : tags
        );

        if ($(this).hasClass('gv-active')) {
          $('.gv-menu.gv-tracks-menu .gv-close').trigger('click');
          $(this).removeClass('gv-active');
        } else {
          let menu = $(this).data('menu');

          if (menu) {
            menu.show();
          } else {
            menu = browser.makeMenu({
              'Currently enabled tracks:'             : 'Available tracks:',
              '<div class="gv-current-tracks"></div>' : '<input placeholder="Search"><div class="gv-available-tracks"></div>',
            }).addClass('gv-tracks-menu');

            $('input[placeholder=Search]', menu).on('keyup', function () {
              const str = this.value.toLowerCase();

              $('.gv-tracks-library-item', menu).each(function () {
                const track = $(this).data('track');

                let match = false;

                if (track.name && track.name.toLowerCase().indexOf(str) >= 0) {
                  match = true;
                } else {
                  const tags = getTrackTags(track, []).concat(track.tags || []);

                  if (tags.some(tag => tag.toLowerCase().indexOf(str) >= 0)) {
                    match = true;
                  }
                }

                $(this)[match ? 'removeClass' : 'addClass']('gv-hide');
              });

              $('.gv-tracks-library-category', menu).each(function () {
                const visibleTracks = $(this).children('.gv-tracks-library-item:not(.gv-hide)');

                $(this)[visibleTracks.length ? 'removeClass' : 'addClass']('gv-hide');
              });
            });

            $('.gv-close', menu).on('click', () => {
              $(button).removeClass('gv-active');
            });

            const availableTracks = $('.gv-available-tracks', menu);
            const currentTracks   = $('.gv-current-tracks',   menu).before('<div class="gv-current-tracks-instructions">Drag and drop to reorder</div>').data({
              reload     : function () { $(this).empty().data('listTracks')(); },
              listTracks : function () {
                browser.tracks.filter(
                  track => track.name && !(track.removable === false && track.unsortable) && !track.parentTrack && !track.lockToTrack
                ).forEach(
                  (track) => {
                    const el = $('<div class="gv-tracks-menu-track">')
                      .append(`<span class="gv-tracks-menu-track-name" title="${track.name}">${track.defaultName}</span>`)
                      .appendTo(currentTracks)
                      .data('track', track)
                      .addClass(track.unsortable ? 'gv-unsortable' : '');

                    if (track.removable === false) {
                      el.prepend('<i class="gv-remove-track gv-menu-button fas fa-circle">');
                    } else {
                      el.prepend($('<i class="gv-remove-track gv-menu-button fas fa-times-circle">').on('click', () => { track.remove(); }));
                    }

                    const trackNameEl = el.find('.gv-tracks-menu-track-name').tipsy({ gravity: 'w', trigger: 'manual' }).on('mouseenter', function () {
                      const tip = $(this).tipsy('show').data('tipsy').$tip;

                      if (tip) {
                        tip.css('zIndex', 1002);
                      }
                    }).on('mouseleave', function () {
                      $(this).tipsy('hide');
                    });

                    if (track.name === track.defaultName) {
                      trackNameEl.tipsy('disable');
                    }
                  }
                );
              },
            }).sortable({
              items  : 'div:not(.gv-unsortable)',
              cursor : 'move',
              axis   : 'y',
              handle : 'span',
              update : browser.updateTrackOrder.bind(browser),
              start  : function () {
                currentTracks.find('.gv-tracks-menu-track-name').each(function () { $(this).tipsy('hide').tipsy('disable'); });
              },
              stop: function () {
                currentTracks.find('.gv-tracks-menu-track-name').each(function () { $(this).tipsy('enable'); });
              },
            });

            currentTracks.data('listTracks')();

            if (browser.saveable) {
              $('<div class="gv-tracks-menu-reset gv-menu-button"><i class="fas fa-undo"></i> Reset tracks and configuration</div>').insertAfter(currentTracks).on('click', (e) => {
                e.preventDefault();
                browser.resetConfig();
              });
            }

            if (browser.tracksLibrary?.length) {
              const tracksLibraryCategories = browser.tracksLibrary.filter(track => track.prototype.name && track.prototype.removable !== false).reduce(
                (acc, track) => {
                  const categoryName = track.prototype.category || '';

                  acc[categoryName] = acc[categoryName] || [];
                  acc[categoryName].push([ track.prototype.name.toLowerCase(), track ]);

                  return acc;
                },
                {}
              );

              const tracksLibraryCategoryOrder = (pluginConf?.tracksLibraryCategoryOrder || []).reduce(
                (acc, categoryName, i) => Object.assign(acc, { [categoryName]: i + 1 }),
                {}
              );

              Object.keys(tracksLibraryCategories).sort((a, b) => (Boolean(b) - Boolean(a)) || (tracksLibraryCategoryOrder[a] - tracksLibraryCategoryOrder[b]) || a.localeCompare(b)).forEach(
                (categoryName, i, allCategoryNames) => {
                  const parentEl = (
                    allCategoryNames.length > 1
                      ? $('<div class="gv-tracks-library-category">').append(
                        $('<div class="gv-tracks-library-category-header">').html(categoryName || 'Other')
                      ).appendTo(availableTracks)
                      : availableTracks
                  );

                  tracksLibraryCategories[categoryName].sort((a, b) => a[0].localeCompare(b[0])).forEach(
                    (row) => {
                      const track = row[1];

                      $('<div class="gv-tracks-library-item">').append(
                        $('<i class="gv-add-track gv-menu-button fas fa-plus-circle">').on('click', () => {
                          browser.trackIds                     = browser.trackIds || {};
                          browser.trackIds[track.prototype.id] = browser.trackIds[track.prototype.id] || 1;

                          browser.addTrack(track.extend({ id: `${track.prototype.id}${browser.tracksById[track.prototype.id] ? browser.trackIds[track.prototype.id]++ : ''}` }));
                        })
                      ).append(`<span>${track.prototype.name}</span>`).appendTo(parentEl).data('track', track.prototype);
                    }
                  );
                }
              );
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
      this.wrapper.after('<div class="gv-powered-by">Powered by <a target="_blank" href="https://wtsi-web.github.io/Genoverse/">Genoverse</a></div>');
      this.superContainer.find('.gv-panel-left').append(this.labelContainer);
    },

    'afterAddTracks afterRemoveTracks': function () {
      const currentTracks = this.superContainer.find('.gv-tracks-menu .gv-current-tracks');

      if (currentTracks.length) {
        currentTracks.data('reload').call(currentTracks);
      }
    },
  });

  this.on({
    afterSetName: function (name) {
      const track = this.track;

      if (track?.browser) {
        const menu = track.browser.superContainer.find('.gv-tracks-library-button').data('menu');

        if (menu) {
          menu.find('.gv-tracks-menu-track').filter(function () {
            return $(this).data('track') === track;
          }).children('.gv-tracks-menu-track-name').attr('title', name).each(function () {
            if (name === track.defaultName) {
              $(this).tipsy('hide').tipsy('disable');
            } else {
              $(this).tipsy('enable');
            }
          });
        }
      }
    },
  }, 'tracks');
};

export default { controlPanel: plugin, requires: karyotype };
