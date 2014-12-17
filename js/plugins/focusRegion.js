Genoverse.Plugins.focusRegion = function () {
  this.controls.push({
    icon    : '&#8617;',
    name    : 'Reset focus to ' + (this.focusRegion && this.focusRegion.name ? this.focusRegion.name : this.chr + ':' + this.start + '-' + this.end),
    'class' : 'gv-button-large',
    action  : function (browser) { browser.moveTo(browser.focusRegion.start, browser.focusRegion.end, true); },
    init    : function () { this.focusRegion = this.focusRegion || { start: this.start, end: this.end }; }
  });
};