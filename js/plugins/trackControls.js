Genoverse.Plugins.trackControls = function () {
  var defaultControls = [
    $('<a title="More info">').html('?').on('click', function () {
      var track = $(this).data('track');
      var menu  = track.prop('menus').filter('.track_info');
      
      if (!menu.length) {
        menu = track.prop('menus', track.prop('menus').add(
          track.browser.makeMenu({
            title : track.name,
            ' '   : track.prop('info')
          }).addClass('track_info')
        ));
      }
      
      menu.show().position({ of: track.prop('container'), at: 'center top', my: 'center top', collision: 'none' });
    }),
    
    $('<a class="height_toggle">').html('&nbsp;').on({
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
        $(this)[autoHeight ? 'addClass' : 'removeClass']('auto_height');
        
        if (resizer) {
          resizer[autoHeight ? 'hide' : 'show']();
        }
      }
    }),
    
    $('<a title="Close track">').html('x').on('click', function () {
      $(this).data('track').remove();
    })
  ];

  var toggle = $('<a>').html('&laquo;').on('click', function () {
    var parent = $(this).parent();
    
    if (parent.hasClass('maximized')) {
      parent.removeClass('maximized').end()
        .siblings().css({ display: 'none' }).end()
        .html('&laquo;');
    } else {
      parent.addClass('maximized').end()
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
      
      controls = (controls || []).concat(defaultControls);
      
      this.trackControls = $('<div class="track_controls">').prependTo(this.container);

      for (var i = 0; i < controls.length; i++) {
        controls[i].clone(true).hide().data('track', this.track).appendTo(this.trackControls);
      }
      
      this.prop('heightToggler', this.trackControls.children('.height_toggle').trigger('toggleState'));
      
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
        heightToggler[this.prop('autoHeight') ? 'addClass' : 'removeClass']('auto_height');
        heightToggler.trigger('toggleState');
      }
    },
    afterSetMVC: function () {
      var heightToggler = this.prop('heightToggler');
      
      if (heightToggler) {
        heightToggler.trigger('toggleState')[this.prop('resizable') === true ? 'removeClass' : 'addClass']('hidden');
      }
    }
  }, 'tracks');
};