Genoverse.Plugins.karyotype = function () {
  function createKaryotype() {
    var chromosome = $('<div class="gv-chromosome">');
    var container  = $('<div class="gv-karyotype-container">').html(chromosome).insertBefore(this.wrapper);

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
        Genoverse.Track.Chromosome.extend({
          name          : 'Chr ' + this.chr,
          height        : 20,
          featureHeight : 20,
          border        : false,
          legend        : false,
          unsortable    : true,

          click: function (e) {
            var offset = this.container.parent().offset().left;
            var x      = e.pageX - offset;
            var f      = this.featurePositions.search({ x: x, y: 1, w: 1, h: 1 })[0];

            if (f) {
              if (e.type === 'mouseup') {
                if (!this.browser.parent.isStatic) {
                  this.browser.parent.moveTo(f.start, f.end, true);
                }
              } else if (this.hoverFeature !== f && !this.browser.hideTooltip) {
                this.container.tipsy('hide');

                if (f.label) {
                  var left = offset + f.position[this.scale].start + f.position[this.scale].width / 2;
                  this.container.attr('title', f.label[0]).tipsy({ trigger: 'manual', container: 'body' }).tipsy('show').data('tipsy').$tip.css('left', function () { return left - $(this).width() / 2; });
                }

                this.hoverFeature = f;
              }
            }
          },

          addUserEventHandlers: function () {
            var track = this;

            this.base();

            this.container.on({
              mousemove : function (e) { track.click(e); },
              mouseout  : function (e) {
                if (track.browser.viewPoint.is(e.relatedTarget) || track.browser.viewPoint.find(e.relatedTarget).length) {
                  return true;
                }

                track.container.tipsy('hide');
                track.hoverFeature = false;
              }
            }, '.gv-image-container');

            // Don't allow zooming in and out on the karyotype image
            this.container.on('mousewheel', '.gv-image-container, .gv-selector', function (e) {
              e.stopPropagation();
            });
          },

          afterSetName: function () {
            this.label.css('lineHeight', this.label.height() + 'px');
          }
        })
      ],

      afterInit: function () {
        this.track = this.tracks[0];

        this.updatePosition();
        this.viewPoint.fadeIn();
      },

      afterAddDomElements: function () {
        var karyotype = this;
        var parent    = this.parent;

        if (parent.karyotypeLabel === false) {
          this.labelContainer.remove();
          this.labelContainer = $();
          container.addClass('gv-no-label');
        }

        this.viewPoint = $('<div class="gv-karyotype-viewpoint-wrapper"><div class="gv-karyotype-viewpoint"></div></div>').appendTo(container).children().on({
          mousemove : function (e) { karyotype.track.controller.click(e); },
          mouseout  : function (e) {
            var el = $(e.relatedTarget);

            if (karyotype.viewPoint.is(el) || karyotype.viewPoint.find(el).length || (el.prop('nodeName') === 'IMG' && el.parent().is(karyotype.track.prop('imgContainers')[0]))) {
              return true;
            }

            karyotype.track.prop('container').tipsy('hide');
            karyotype.track.prop('hoverFeature', false);
          }
        });

        if (!parent.isStatic) {
          function hideTooltip() {
            karyotype.hideTooltip = true;
            karyotype.track.prop('container').tipsy('hide');
          }

          function updateLocation(e, ui) {
            karyotype.hideTooltip = false;

            if (e.type === 'resizestop') {
              var axis = $(this).data('ui-resizable').axis;

              if ((axis === 'e' && parent.end === karyotype.chromosomeSize) || (axis === 'w' && parent.start === 1)) {
                return; // Don't change location if the position didn't change (dragging off the right or left edges)
              }
            }

            var scale = karyotype.chromosomeSize / karyotype.width;
            var start = Math.max(Math.floor(ui.position.left * scale), 1);
            var end   = e.type === 'dragstop' ? start + parent.length - 1 : Math.floor(ui.helper.outerWidth(true) * scale) + start;

            parent.moveTo(start, end, true, e.type === 'dragstop');
          }

          this.viewPoint.draggable({
            axis        : 'x',
            containment : this.wrapper,
            start       : hideTooltip,
            stop        : updateLocation
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
            }
          });
        }
      },

      updatePosition: function () {
        var left  =  this.parent.start * this.scale;
        var width = (this.parent.end   * this.scale) - left;

        this.viewPoint.css({ left: left, width: width });
      }
    });

    if (!this.loadedPlugins.controlPanel) {
      $('<li class="gv-unsortable">').height(function (i, h) {
        return h + container.height();
      }).prependTo(this.labelContainer);
    }
  }

  this.on({
    afterInit: createKaryotype,

    afterSetRange: function () {
      if (this.karyotype) {
        this.karyotype.updatePosition();
      }
    },

    afterSetWidth: function () {
      var container = this.karyotype.container.parent();

      this.karyotype.destroy();
      container.remove();

      createKaryotype.call(this);
    }
  });
};
