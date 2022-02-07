import 'css/fullscreen.css';
import controlPanel from 'js/plugins/controlPanel';

var plugin = function () {
  var genoverse   = this;
  var supported   = true;
  var eventName   = 'fullscreenchange';  // All the browsers have different names
  var elemName    = 'fullscreenElement'; // ... even the capitalisation varies!
  var requestName = 'requestFullscreen';
  var cancelName  = 'exitFullscreen';

  if (document.onmsfullscreenchange || document.onmsfullscreenchange === null) {
    // We need the IE11 version of this to work; IE9-10 have the actions but not the events.
    // The key must be present, i.e. value may be null but it must not return undefined
    eventName   = 'MSFullscreenChange';
    elemName    = 'msFullscreenElement';
    cancelName  = 'msExitFullscreen';
    requestName = 'msRequestFullscreen';
  } else if (document.body.mozRequestFullScreen) {
    eventName   = 'mozfullscreenchange';
    elemName    = 'mozFullScreenElement';
    cancelName  = 'mozCancelFullScreen';
    requestName = 'mozRequestFullScreen';
  } else if (document.body.webkitRequestFullscreen) {
    eventName   = 'webkitfullscreenchange';
    elemName    = 'webkitFullscreenElement';
    cancelName  = 'webkitCancelFullScreen';
    requestName = 'webkitRequestFullscreen';
  } else if (!document.onfullscreenchange) {
    supported = false;
  }

  genoverse.fullscreenVars = {
    eventName   : eventName,
    elemName    : elemName,
    cancelName  : cancelName,
    requestName : requestName,

    enterEvent: function (browser) {
      browser.preFullscreenWidth = browser.superContainer.width();
      browser.superContainer.addClass('gv-fullscreen');
      browser.setWidth(window.innerWidth);
      browser.controlPanel.find('.gv-fullscreen-button .fas').removeClass('fa-expand-arrows-alt').addClass('fa-compress-arrows-alt');
    },

    exitEvent: function (browser) {
      if (browser.superContainer.hasClass('gv-fullscreen')) {
        browser.superContainer.removeClass('gv-fullscreen');
        browser.setWidth(browser.preFullscreenWidth);
        browser.controlPanel.find('.gv-fullscreen-button .fas').removeClass('fa-compress-arrows-alt').addClass('fa-expand-arrows-alt');
      }
    },

    eventListener: function () {
      if (!genoverse.superContainer.is(document[genoverse.fullscreenVars.elemName])) {
        genoverse.fullscreenVars.exitEvent(genoverse);
        document.removeEventListener(genoverse.fullscreenVars.eventName, genoverse.fullscreenVars.eventListener);
      }
    }
  };

  if (supported) {
    genoverse.controls.push({
      icon   : '<i class="fas fa-expand-arrows-alt"></i>',
      class  : 'gv-fullscreen-button',
      name   : 'Toggle fullscreen view',
      action : function (browser) {
        if (browser.superContainer.hasClass('gv-fullscreen')) {
          document[browser.fullscreenVars.cancelName]();
        } else {
          document.addEventListener(browser.fullscreenVars.eventName, browser.fullscreenVars.eventListener);
          browser.superContainer[0][browser.fullscreenVars.requestName]();
          browser.fullscreenVars.enterEvent(browser);
        }
      }
    });
  }
};

export default { fullscreen: plugin, requires: controlPanel };
