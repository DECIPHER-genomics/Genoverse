// tipsy, facebook style tooltips for jquery
// version 1.0.0a
// (c) 2008-2010 jason frame [jason@onehackoranother.com]
// released under the MIT license

import '../../css/tooltips.css';
import controlPanel from './controlPanel';

const plugin = function () {
  const genoverse = this;

  function toggleTooltips(browser, tooltips, action) {
    const offset = browser.superContainer.offset();

    tooltips = tooltips || browser.superContainer.find('.gv-tooltip');
    action   = action   || $(this).toggleClass('gv-active').hasClass('gv-active') ? 'show' : 'hide';

    tooltips.each(function () {
      const el = $(this);

      if (el.is(':visible')) {
        el.tipsy(action).data('tipsy').$tip.data({ parent: el }).appendTo(browser.superContainer).css({
          marginTop  : -offset.top,
          marginLeft : -offset.left,
        });
      } else if (el.data('tipsy').$tip) {
        el.tipsy('hide');
      }
    });
  }

  function updateTooltips() {
    let tooltips = $();

    [
      [ genoverse.labelContainer.find('.gv-handle'), { gravity: 'w', fade: true, trigger: 'manual', fallback: 'Reorder tracks by dragging this handle' }],
      [ genoverse.container.find('.gv-resizer'),     { gravity: 'n', fade: true, trigger: 'manual', fallback: 'Resize track by dragging this handle'   }],
    ].forEach(
      ([ selector, options ]) => {
        const el = selector.filter(':visible').first();

        if (!el.hasClass('gv-tooltip')) {
          selector.filter('.gv-tooltip').removeClass('gv-tooltip').tipsy('hide').removeData('tipsy');
          el.tipsy(options).addClass('gv-tooltip');
        }

        tooltips = tooltips.add(el);
      }
    );

    // Remove any tooltips orphaned by the removal of a track
    genoverse.superContainer.find('.tipsy').not(function () {
      const parent = $(this).data('parent');

      return parent && genoverse.superContainer.find(parent).length;
    }).remove();

    if (genoverse.controlPanel.find('.gv-tooltips').hasClass('gv-active')) {
      toggleTooltips(genoverse, tooltips, 'show');
    }

    return tooltips;
  }

  this.controls.push({
    icon   : '<i class="fas fa-question-circle"></i>',
    class  : 'gv-tooltips',
    name   : 'Tooltips',
    action : toggleTooltips,
  });

  this.on('afterInit', function () {
    this.superContainer.find('.gv-panel-left  .gv-button-set[title]').tipsy({ gravity: 'w', fade: true, trigger: 'manual' }).addClass('gv-tooltip');
    this.superContainer.find('.gv-panel-right .gv-button-set[title]').tipsy({ gravity: 'e', fade: true, trigger: 'manual' }).addClass('gv-tooltip');

    // In order to force placement of this tooltip to be inside the superContainer boundaries, and just below the karyotype, create a hidden element, positioned where we want the tooltip to appear
    $('<i class="gv-wrapper-tooltip">').prependTo(this.wrapper).tipsy({
      gravity  : 's',
      fade     : true,
      trigger  : 'manual',
      fallback : 'Scroll left and right by dragging with your mouse, click on any feature in any track for more info',
    }).addClass('gv-tooltip');

    updateTooltips();
  });

  this.on('beforeSetWidth', function () {
    this.controlPanel.find('.gv-tooltips.gv-active').trigger('click');
  });

  this.on('afterSortTracks',       () => { updateTooltips(); });
  this.on('afterResize', 'tracks', () => { updateTooltips(); });
};

export default { tooltips: plugin, requires: controlPanel };
