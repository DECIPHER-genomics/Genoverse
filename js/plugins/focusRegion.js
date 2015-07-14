Genoverse.Plugins.focusRegion = function () {
  this.controls.push({
    icon    : '<i class="fa fa-map-marker"></i>',
    'class' : 'gv-button-large',
    name    : 'Reset focus to ' + (this.focusRegion && this.focusRegion.name ? this.focusRegion.name : this.chr + ':' + this.start + '-' + this.end),
    action  : function (browser) { browser.moveTo(browser.focusRegion.start, browser.focusRegion.end, true); },
    init    : function () { this.focusRegion = this.focusRegion || { start: this.start, end: this.end }; }
  });
};

Genoverse.Plugins.focusRegion.requires = 'controlPanel';
Genoverse.Plugins.focusRegion.noCSS    = true;
