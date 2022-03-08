const css                         = require('fs').readFileSync('src/css/genoverse.css', 'utf8');
const { $, Genoverse, afterTest } = require('./utils');

const html = `<style>${css}</style><div id="genoverse-test-1"></div><div id="genoverse-test-2"></div><div id="genoverse-test-3"></div>`;

const doTests = (cfg) => {
  const config          = { ...cfg };
  const containerExists = config.container ? !!$(config.container).length : false;
  const elCount         = $('*').length;
  const deferred        = $.Deferred();

  new Genoverse({ // eslint-disable-line no-new
    ...cfg,
    afterInit: function () {
      const container = this.container;

      expect(container.length).toBe(1);
      expect(container.hasClass('genoverse')).toBe(true);

      if (cfg) {
        if (config.container) {
          if (containerExists) {
            expect(container.attr('id')).toBe($(config.container)[0].id.replace('#', ''));
          } else {
            expect(container.attr('id')).toBeUndefined();
          }
        }

        if (config.width) {
          expect(container.width()).toBe(config.width);
          expect(this.width).toBe(config.width - this.labelWidth);
        }
      }

      this.destroy();

      expect(Object.keys(this).length).toBe(0);
      expect(container.parents('body').length).toBe(1);
      expect(container.children().length).toBe(0);
      expect($('*').length).toBe(elCount + (containerExists ? 0 : 1)); // + 1 because container is left behind when Genoverse is destroyed

      container.remove();

      deferred.resolve();
    },
  });

  return deferred;
};

describe('Genoverse', () => {
  beforeEach(() => { $('body').html(html); });
  afterEach(afterTest);

  describe('Creation and destruction', () => {
    it('when config is undefined',                 () => doTests(undefined));
    it('when config is empty hash',                () => doTests({}));
    it('when has container id and width',          () => doTests({ container: '#genoverse-test-1', width: 2000 }));
    it('when has container DOM element',           () => doTests({ container: document.getElementById('genoverse-test-2') }));
    it('when has container jQuery element',        () => doTests({ container: $('#genoverse-test-3') }));
    it("when has container id that doesn't exist", () => doTests({ container: '#genoverse-test-0' }));
  });
});
