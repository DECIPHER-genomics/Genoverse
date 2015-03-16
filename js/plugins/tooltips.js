// tipsy, facebook style tooltips for jquery
// version 1.0.0a
// (c) 2008-2010 jason frame [jason@onehackoranother.com]
// released under the MIT license

Genoverse.Plugins.tooltips = function () {
  this.controls.push({
    icon    : '?',
    'class' : 'gv-tooltip',
    name    : 'Tooltips',
    action  : function (browser) {
      var func = $(this).toggleClass('gv-active').hasClass('gv-active') ? 'show' : 'hide';
      browser.superContainer.find('.gv-tooltip').not(this).each(function () { $(this).tipsy(func); });
    }
  });

  this.on('afterInit', function () {
    this.superContainer.find('.gv-panel .gv-button-set[title]').tipsy({ gravity: 'w', fade: true, trigger: 'manual' }).addClass('gv-tooltip');
    this.container.find('.resizer:last').tipsy({ gravity: 'n', fade: true, trigger: 'manual', fallback: 'Resize track by dragging this handle' }).addClass('gv-tooltip');
    this.wrapper.tipsy({ gravity: 's', fade: true, trigger: 'manual', fallback: 'Scroll left and right by dragging with your mouse, click on any feature in any track for more info' }).addClass('genoverse-tooltip');
    this.labelContainer.tipsy({ gravity: 'e', fade: true, trigger: 'manual', fallback: 'Reorder tracks by dragging this handle' }).addClass('gv-tooltip');
  });

  this.on('afterResize', 'tracks', function () {
    this.container.find('.gv-resizer:last').tipsy('hide');
  });
};

Genoverse.Plugins.tooltips.requires = 'controlPanel';
