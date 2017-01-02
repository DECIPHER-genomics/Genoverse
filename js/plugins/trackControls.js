Genoverse.Plugins.trackControls = function () {
  var defaultControls = [
    $('<a title="More info">').html('?').on('click', function () {
      var track = $(this).data('track');
      var menu  = track.prop('menus').filter('.gv-track-info');

      if (!menu.length) {
        menu = { title : track.name };
        menu[track.prop('info') || ''] = '';

        menu = track.prop('menus', track.prop('menus').add(track.browser.makeMenu(menu).addClass('gv-track-info')));
      }

      menu.show().position({ of: track.prop('container'), at: 'center top', my: 'center top', collision: 'none' });
    }),
    
    $('<a class="gv-height-toggle">').html('&nbsp;').on({
      click: function () {
        var track = $(this).data('track');
        var height;

        if (track.prop('autoHeight', !track.prop('autoHeight'))) {
          track.prop('heightBeforeToggle', track.prop('height'));
          height = track.prop('fullVisibleHeight');
        } else {
          height = track.prop('heightBeforeToggle') || track.prop('initialHeight');
        }

        $(this).trigger('toggleState');

        track.controller.resize(height, true);
      },
      toggleState: function () { // custom event to set title and change the icon
        var track      = $(this).data('track');
        var autoHeight = track.prop('autoHeight');
        var resizer    = track.prop('resizer');

        this.title = autoHeight ? 'Set track to fixed height' : 'Set track to auto-adjust height';
        $(this)[autoHeight ? 'addClass' : 'removeClass']('gv-auto-height');

        if (resizer) {
          resizer[autoHeight ? 'hide' : 'show']();
        }
      }
    }),

    $('<a title="Remove track">').html('<i class="fa fa-trash"></i>').on('click', function () {
      $(this).data('track').remove();
    })
  ];

  var toggle = $('<a>').html('&laquo;').on('click', function () {
    var parent = $(this).parent();

    if (parent.hasClass('gv-maximized')) {
      parent.removeClass('gv-maximized').end()
        .siblings().css({ display: 'none' }).end()
        .html('&laquo;');
    } else {
      parent.addClass('gv-maximized').end()
        .siblings().css({ display: 'inline-block' }).end()
        .html('&raquo;');
    }
  });

  this.on({
    afterAddDomElements: function () {
      var controls = this.prop('controls');

      if (controls === 'off') {
        return;
      }

      var defaultConfig = this.prop('defaultConfig');
      var savedConfig   = this.browser.savedConfig ? this.browser.savedConfig[this.prop('id')] || {} : {};
      var prop, el, j;

      controls = (controls || []).concat(defaultControls);

      this.trackControls = $('<div class="gv-track-controls">').prependTo(this.container);

      for (var i = 0; i < controls.length; i++) {
        if ($.isPlainObject(controls[i]) && controls[i].type) {
          el = $('<' + controls[i].type + '>').data('control', controls[i].name);

          if (controls[i].options) {
            for (j = 0; j < controls[i].options.length; j++) {
              el.append('<option value="' + controls[i].options[j].value + '">' + controls[i].options[j].text + '</option>');
            }
          }
        } else if (typeof controls[i] === 'string') {
          el = $(controls[i]);
        } else if (typeof controls[i] === 'object' && controls[i].constructor && controls[i] instanceof $) {
          el = controls[i].clone(true);
        }

        el.hide().data('track', this.track).appendTo(this.trackControls);

        // TODO: other control types
        if (el.is('select')) {
          prop = el.data('control');

          el.find('option[value=' + (savedConfig[prop] || defaultConfig[prop] || 'all') + ']').attr('selected', true).end().change(function () {
            $(this).data('track').setConfig($(this).data('control'), this.value);
          });
        }
      }

      this.prop('heightToggler', this.trackControls.children('.gv-height-toggle').trigger('toggleState'));

      var toggler = toggle.clone(true).data('track', this.track).appendTo(this.trackControls);

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
      var heightToggler = this.prop('heightToggler');

      if (this.prop('resizable') === true && heightToggler) {
        heightToggler[this.prop('autoHeight') ? 'addClass' : 'removeClass']('gv-auto-height');
        heightToggler.trigger('toggleState');
      }
    },
    afterSetMVC: function () {
      var heightToggler = this.prop('heightToggler');

      if (heightToggler) {
        heightToggler.trigger('toggleState')[this.prop('resizable') === true ? 'removeClass' : 'addClass']('gv-hidden');
      }
    }
  }, 'tracks');
};