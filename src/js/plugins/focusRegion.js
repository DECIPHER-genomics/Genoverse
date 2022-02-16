import './controlPanel';

const plugin = function () {
  this.controls.push({
    icon    : '<i class="fas fa-map-marker-alt"></i>',
    'class' : 'gv-button-large',
    name    : `Reset focus to ${this.focusRegion && this.focusRegion.name ? this.focusRegion.name : `${this.chr}:${this.start}-${this.end}`}`,
    action  : (browser) => { browser.moveTo(browser.focusRegion.chr, browser.focusRegion.start, browser.focusRegion.end, true); },
    init    : (browser) => { browser.focusRegion = browser.focusRegion || { chr: browser.chr, start: browser.start, end: browser.end }; },
  });
};

export default { focusRegion: plugin };
