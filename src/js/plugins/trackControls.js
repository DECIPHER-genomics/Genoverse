import '../../css/trackControls.css';

const plugin = function () {
  const jQuery          = this.jQuery;
  const defaultControls = [
    jQuery('<a title="More info" class="fas fa-question-circle">').on('click', function () {
      const track = jQuery(this).data('track');

      let menu = track.prop('menus').filter('.gv-track-info');

      if (!menu.length) {
        const info = track.prop('info');

        menu = track.prop(
          'menus',
          track.prop('menus').add(
            track.browser.makeMenu({
              title                                                        : track.name,
              [typeof info === 'function' ? info.call(track) : info || ''] : '',
            }).addClass('gv-track-info')
          )
        );
      }

      menu.show().position({ of: track.prop('container'), at: 'center top', my: 'center top', collision: 'none' });
    }),

    jQuery(`
      <a class="gv-height-toggle">
        <i class="fas fa-sort"></i>
        <i class="fas fa-sort-down"></i>
        <i class="fas fa-sort-up"></i>
      </a>
    `).on({
      click: function () {
        const track = jQuery(this).data('track');

        let height;

        if (track.prop('autoHeight', !track.prop('autoHeight'))) {
          track.prop('heightBeforeToggle', track.prop('height'));
          height = track.prop('fullVisibleHeight');
        } else {
          height = track.prop('heightBeforeToggle') || track.prop('initialHeight');
        }

        jQuery(this).trigger('toggleState');

        track.controller.resize(height, true);
      },
      toggleState: function () { // custom event to set title and change the icon
        const track      = jQuery(this).data('track');
        const autoHeight = track.prop('autoHeight');
        const resizer    = track.prop('resizer');

        this.title = autoHeight ? 'Set track to fixed height' : 'Set track to auto-adjust height';

        jQuery(this)[autoHeight ? 'addClass' : 'removeClass']('gv-auto-height');

        if (resizer) {
          resizer[autoHeight ? 'hide' : 'show']();
        }
      },
    }),
  ];

  const remove = jQuery('<a title="Remove track" class="far fa-trash-alt">').on('click', function () {
    jQuery(this).data('track').remove();
  });

  const toggle = jQuery(`
    <a class="gv-track-controls-toggle">
      <span><i class="fas fa-angle-double-left"></i><i class="fas fa-cog"></i></span>
      <span><i class="fas fa-angle-double-right"></i></span>
    </a>
  `).on('click', function () {
    jQuery(this).parent().toggleClass('gv-maximized');
  });

  this.on({
    afterAddDomElements: function () {
      let controls = this.prop('controls');

      if (controls === 'off') {
        return;
      }

      const defaultConfig = this.prop('defaultConfig');
      const savedConfig   = this.browser.savedConfig?.[this.prop('id')] || {};

      controls = (controls || []).concat(defaultControls, this.prop('removable') === false ? [] : remove);

      this.trackControls = jQuery('<div class="gv-track-controls">').prependTo(this.container);

      const controlsContainer = jQuery('<div class="gv-track-controls-container">').appendTo(this.trackControls);

      controls.forEach(
        (control) => {
          let el;

          if (jQuery.isPlainObject(control) && control.type) {
            el = jQuery(`<${control.type}>`).data('control', control.name);

            (control.options || []).forEach(
              option => el.append(`<option value="${option.value}">${option.text}</option>`)
            );
          } else if (typeof control === 'string') {
            el = jQuery(control);
          } else if (typeof control === 'object' && control.constructor && control instanceof jQuery) {
            el = control.clone(true);
          }

          el.data('track', this.track).appendTo(controlsContainer);

          // TODO: other control types
          if (el.is('select')) {
            const prop = el.data('control');

            el.find(`option[value=${savedConfig[prop] || defaultConfig[prop] || 'all'}]`).attr('selected', true).end().change(function () {
              jQuery(this).data('track').setConfig(jQuery(this).data('control'), this.value);
            });
          }
        }
      );

      this.prop('heightToggler', controlsContainer.children('.gv-height-toggle').trigger('toggleState'));

      const toggler = toggle.clone(true).data('track', this.track).appendTo(this.trackControls);

      toggler.trigger('click');

      this.minLabelHeight = Math.max(this.minLabelHeight, this.trackControls.outerHeight(true) + this.prop('margin'));

      toggler.trigger('click');
    },
    afterResize: function () {
      if (this.trackControls) {
        this.trackControls[this.prop('height') < this.trackControls.outerHeight(true) ? 'hide' : 'show']();
      }
    },
    afterResetHeight: function () {
      const heightToggler = this.prop('heightToggler');

      if (this.prop('resizable') === true && heightToggler) {
        heightToggler[this.prop('autoHeight') ? 'addClass' : 'removeClass']('gv-auto-height');
        heightToggler.trigger('toggleState');
      }
    },
    afterSetMVC: function () {
      const heightToggler = this.prop('heightToggler');

      if (heightToggler) {
        heightToggler.trigger('toggleState')[this.prop('resizable') === true ? 'removeClass' : 'addClass']('gv-hide');
      }
    },
  }, 'tracks');
};

export default { trackControls: plugin };
