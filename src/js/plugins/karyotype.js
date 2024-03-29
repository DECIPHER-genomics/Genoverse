import '../../css/karyotype.css';
import Chromosome from '../Track/library/Chromosome';

const plugin = function (pluginConf) {
  const jQuery = this.jQuery;

  function createKaryotype() {
    const chromosome   = jQuery('<div class="gv-chromosome">');
    const container    = jQuery('<div class="gv-karyotype-container">').html(chromosome).insertBefore(this.wrapper);
    const assemblyName = this.assembly || this.genomeName;
    const name         = `${pluginConf.showAssembly && assemblyName ? `${assemblyName}: ` : ''}Chr ${this.chr}`;

    if (pluginConf.showAssembly && assemblyName) {
      container.addClass('gv-show-assembly');
    }

    const measureWidth = jQuery(`<div class="gv-chromosome"><ul class="gv-label-container"><li><span class="gv-name">${name}</span></li></ul></div>`).appendTo(container);
    const labelWidth   = pluginConf.karyotypeLabel === false ? 0 : measureWidth.find('.gv-name').outerWidth(true) + 10;

    measureWidth.remove();

    this.karyotype = new Genoverse({
      parent    : this,
      container : chromosome,
      width     : chromosome.width(),
      genome    : this.genome,
      chr       : this.chr,
      start     : 1,
      end       : this.chromosomeSize,
      isStatic  : true,
      tracks    : [
        Chromosome.extend({
          name          : name,
          height        : 20,
          featureHeight : 20,
          border        : false,
          legend        : false,
          unsortable    : true,

          click: function (e) {
            const offset = this.container.parent().offset().left;
            const x      = e.pageX - offset;
            const f      = this.featurePositions.search({ x: x, y: 1, w: 1, h: 1 })[0];

            if (f) {
              if (e.type === 'mouseup') {
                if (!this.browser.parent.isStatic) {
                  this.browser.parent.moveTo(f.chr, f.start, f.end, true);
                }
              } else if (this.hoverFeature !== f && !this.browser.hideTooltip) {
                this.container.tipsy('hide');

                if (f.label) {
                  const left = offset + f.position[this.scale].start + f.position[this.scale].width / 2;

                  this.container.attr('title', f.label[0]).tipsy({ trigger: 'manual', container: 'body' }).tipsy('show').data('tipsy').$tip.css('left', function () { return left - jQuery(this).width() / 2; });
                }

                this.hoverFeature = f;
              }
            }
          },

          addUserEventHandlers: function () {
            const track = this;

            this.base();

            this.container.on({
              mousemove : (e) => { track.click(e); },
              mouseout  : (e) => {
                if (track.browser.viewPoint.is(e.relatedTarget) || track.browser.viewPoint.find(e.relatedTarget).length) {
                  return true;
                }

                track.container.tipsy('hide');
                track.hoverFeature = false;
              },
            }, '.gv-image-container');

            // Don't allow zooming in and out on the karyotype image
            this.container.on('mousewheel', '.gv-image-container, .gv-selector', (e) => {
              e.stopPropagation();
            });
          },

          afterSetName: function () {
            this.label.css('lineHeight', `${this.label.height()}px`);
          },
        }),
      ],

      addUserEventHandlers: () => {},

      afterInit: function () {
        this.updatePosition();
        this.viewPoint.fadeIn();
      },

      afterAddTracks: function () {
        this.track = this.tracks[0];
      },

      afterAddDomElements: function () {
        const karyotype = this;
        const parent    = this.parent;

        function hideTooltip() {
          karyotype.hideTooltip = true;
          karyotype.track.prop('container').tipsy('hide');
        }

        function updateLocation(e, ui) {
          karyotype.hideTooltip = false;

          const scale = karyotype.chromosomeSize / karyotype.width;
          const axis  = e.type === 'resizestop' ? jQuery(this).data('ui-resizable').axis : undefined;
          const start = axis === 'e' ? parent.start : Math.max(Math.floor(ui.position.left * scale), 1);
          const end   = axis === 'w' ? parent.end   : e.type === 'dragstop' ? start + parent.length - 1 : Math.floor(ui.helper.outerWidth(true) * scale) + start;

          if (start !== parent.start || end !== parent.end) {
            parent.moveTo(karyotype.chr, start, end, true, e.type === 'dragstop');
          }
        }

        if (pluginConf.karyotypeLabel === false) {
          this.labelContainer.remove();
          this.labelContainer = jQuery();
          container.addClass('gv-no-label');
        } else {
          this.labelContainer.width(labelWidth);
        }

        this.viewPoint = jQuery('<div class="gv-karyotype-viewpoint-wrapper"><div class="gv-karyotype-viewpoint"></div></div>').appendTo(container).css({
          left  : labelWidth,
          width : this.width - labelWidth,
        }).children().on({
          mousemove : (e) => { karyotype.track.controller.click(e); },
          mouseout  : (e) => {
            const el = jQuery(e.relatedTarget);

            if (karyotype.viewPoint.is(el) || karyotype.viewPoint.find(el).length || (el.prop('nodeName') === 'IMG' && el.parent().is(karyotype.track.prop('imgContainers')[0]))) {
              return true;
            }

            karyotype.track.prop('container').tipsy('hide');
            karyotype.track.prop('hoverFeature', false);
          },
        });

        if (!parent.isStatic) {
          this.viewPoint.draggable({
            axis        : 'x',
            containment : this.wrapper,
            start       : hideTooltip,
            stop        : updateLocation,
          }).resizable({
            handles     : 'e, w',
            containment : 'parent',
            start       : hideTooltip,
            stop        : updateLocation,
            resize      : function (e, ui) {
              ui.element.css('left', Math.max(0, ui.position.left));

              if (ui.position.left > 0) {
                ui.element.width(Math.min(ui.size.width, ui.element.parent().width() - ui.position.left));
              } else {
                ui.element.width(ui.size.width + ui.position.left);
              }
            },
          });
        }
      },

      updatePosition: function () {
        const left  =  this.parent.start * this.scale;
        const width = (this.parent.end   * this.scale) - left;

        this.viewPoint.css({ left: left, width: width });
      },
    });

    if (this.loadedPlugins.controlPanel !== true) {
      jQuery('<li class="gv-unsortable">').height((i, h) => h + container.height()).prependTo(this.labelContainer);
    }
  }

  function recreateKaryotype() {
    const container = this.karyotype.container.parent();

    this.karyotype.destroy();
    container.remove();

    createKaryotype.call(this);
  }

  this.on({
    afterInit: createKaryotype,

    afterSetRange: function () {
      if (this.karyotype) {
        this.karyotype.updatePosition();
      }
    },

    afterSetWidth: recreateKaryotype,

    afterMoveTo: function (chr) {
      if (this.karyotype && this.karyotype.chr !== chr) {
        recreateKaryotype.call(this);
      }
    },
  });
};

export default { karyotype: plugin };
