Genoverse.Plugins.focusRegion = function () {
  this.controls.push({
    icon    : '<i class="fa fa-map-marker"></i>',
    'class' : 'gv-button-large',
    name    : 'Reset focus to ' + (this.focusRegion && this.focusRegion.name ? this.focusRegion.name : this.chr + ':' + this.start + '-' + this.end),
    action  : function (browser) { browser.moveTo(browser.focusRegion.chr, browser.focusRegion.start, browser.focusRegion.end, true); },
    init    : function (browser) { browser.focusRegion = browser.focusRegion || { chr: browser.chr, start: browser.start, end: browser.end }; }
  });
};

Genoverse.Plugins.focusRegion.requires = 'controlPanel';
Genoverse.Plugins.focusRegion.noCSS    = true;
