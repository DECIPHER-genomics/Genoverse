// tipsy, facebook style tooltips for jquery
// version 1.0.0a
// (c) 2008-2010 jason frame [jason@onehackoranother.com]
// released under the MIT license

Genoverse.Plugins.tooltips = function () {
  if (!this.controls) {
    return;
  }
  
  this.controls.push({
    icon    : '?',
    name    : 'Tooltips',
    'class' : 'genoverse-tooltip',
    init    : $.noop,
    action  : function (browser) {
      var func = $(this).toggleClass('genoverse_active').hasClass('genoverse_active') ? 'show' : 'hide';
      browser.superContainer.find('.genoverse-tooltip').each(function () { $(this).tipsy(func); });
    }
  });
  
  this.on('afterInit', function () {
    this.superContainer.find('.genoverse_panel .button_set[title]').tipsy({ gravity: 'w', fade: true, trigger: 'manual' }).addClass('genoverse-tooltip');
    this.container.find('.resizer:last').tipsy({ gravity: 'n', fade: true, trigger: 'manual', fallback: 'Resize track by dragging this handle' }).addClass('genoverse-tooltip');
    this.wrapper.tipsy({ gravity: 's', fade: true, trigger: 'manual', fallback: 'Scroll left and right by dragging with your mouse, click on any feature in any track for more info' }).addClass('genoverse-tooltip');
    this.labelContainer.tipsy({ gravity: 'e', fade: true, trigger: 'manual', fallback: 'Reorder tracks by dragging this handle' }).addClass('genoverse-tooltip');
  });
  
  this.on('afterResize', 'tracks', function () {
    this.container.find('.resizer:last').tipsy('hide');
  });
};