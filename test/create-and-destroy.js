'use strict';

var css  = require('fs').readFileSync('css/genoverse.css', 'utf8');
var html = '<style>' + css + '</style><div id="genoverse-test-1"></div><div id="genoverse-test-2"></div><div id="genoverse-test-3"></div>';

describe('Genoverse', function () {
  beforeEach(function () { $('body').html(html); });
  afterEach(afterTest);

  describe('Creation and destruction', function () {
    it("when config is undefined",                 function () { return doTests(undefined); });
    it("when config is empty hash",                function () { return doTests({}       ); });
    it("when has container id and width",          function () { return doTests({ container: '#genoverse-test-1', width: 2000 }); });
    it("when has container DOM element",           function () { return doTests({ container: document.getElementById('genoverse-test-2') }); });
    it("when has container jQuery element",        function () { return doTests({ container: $('#genoverse-test-3') }); });
    it("when has container id that doesn't exist", function () { return doTests({ container: '#genoverse-test-0' }); });
  });
});

function doTests(cfg) {
  var config          = $.extend({}, cfg || {});
  var containerExists = config.container ? !!$(config.container).length : false;
  var elCount         = $('*').length;
  var deferred        = $.Deferred();

  new Genoverse($.extend(cfg, {
    afterInit: function () {
      var container = this.container;

      expect(container.length).toEqual(1, 'Incorrect container length');
      expect(container.hasClass('genoverse')).toBe(true, 'Incorrect container class');

      if (cfg) {
        if (config.container) {
          if (containerExists) {
            expect(container.attr('id')).toEqual($(config.container)[0].id.replace('#', ''), 'Incorrect container id');
          } else {
            expect(container.attr('id')).toNotExist('Container should not exist');
          }
        }

        if (config.width) {
          expect(container.width()).toEqual(config.width, 'Incorrect container width');
          expect(this.width).toEqual(config.width - this.labelWidth, 'Incorrect Genoverse width');
        }
      }

      this.destroy();

      expect(Object.keys(this).length).toEqual(0, 'Genoverse has not been emptied');
      expect(container.parents('body').length).toEqual(1, 'container is not in body');
      expect(container.children().length).toEqual(0, 'container is not empty');
      expect($('*').length).toEqual(elCount + (containerExists ? 0 : 1), 'Destructor left too many elements behind'); // + 1 because container is left behind when Genoverse is destroyed

      container.remove();

      deferred.resolve();
    }
  }));

  return deferred;
}
