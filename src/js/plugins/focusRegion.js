import 'js/plugins/controlPanel';

var plugin = function () {
  this.controls.push({
    icon    : '<i class="fas fa-map-marker-alt"></i>',
    'class' : 'gv-button-large',
    name    : 'Reset focus to ' + (this.focusRegion && this.focusRegion.name ? this.focusRegion.name : this.chr + ':' + this.start + '-' + this.end),
    action  : function (browser) { browser.moveTo(browser.focusRegion.chr, browser.focusRegion.start, browser.focusRegion.end, true); },
    init    : function (browser) { browser.focusRegion = browser.focusRegion || { chr: browser.chr, start: browser.start, end: browser.end }; }
  });
};

export default { focusRegion: plugin };
