Genoverse.Plugins.karyotype = function () {
  this.on({
    afterInit: function () {
      var chromosome = $('<div class="gv-chromosome">');
      var container  = $('<div class="gv-karyotype-container">').html(chromosome).insertAfter(this.labelContainer);

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
            name          : 'chr ' + this.chr,
            height        : 20,
            featureHeight : 20,
            featureMargin : { top: 0, right: 0, bottom: 0, left: 0 },
            border        : false,
            legend        : false,
            url           : false,
            allData       : true,
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
                } else {
                  if (this.hoverFeature !== f) {
                    this.container.tipsy('hide');

                    if (f.label) {
                      var left = offset + f.position[this.scale].start + f.position[this.scale].width / 2;

                      this.container.attr('title', f.label[0]).tipsy({ trigger: 'manual', container: 'body' }).tipsy('show').data('tipsy').$tip.css('left', function () { return left - $(this).width() / 2; });
                    }

                    this.hoverFeature = f;
                  }
                }
              }
            },

            addUserEventHandlers: function () {
              var track = this;

              this.base();

              this.container.on({
                mousemove  : function (e) { track.click(e); },
                mouseout   : function (e) {
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

          this.viewPoint = $('<div class="gv-karyotype-viewpoint">').appendTo(this.container).on({
            mousemove: function (e) {
              karyotype.track.controller.click(e);
            },
            mouseout: function (e) {
              var el = $(e.relatedTarget);

              if (karyotype.viewPoint.is(el) || karyotype.viewPoint.find(el).length || (el[0].nodeName === 'IMG' && el.parent().is(karyotype.track.prop('imgContainers')[0]))) {
                return true;
              }

              karyotype.track.prop('container').tipsy('hide');
              karyotype.track.prop('hoverFeature', false);
            }
          });

          if (!parent.isStatic) {
            function updateLocation(e, ui) {
              var scale = karyotype.chromosomeSize / karyotype.width;
              var start = Math.floor(ui.position.left * scale);
              var end   = e.type === 'dragstop' ? start + parent.length - 1 : Math.floor(ui.helper.width() * scale) + start;

              parent.moveTo(start, end, true, e.type === 'dragstop');
            }

            this.viewPoint.draggable({
              axis        : 'x',
              containment : this.wrapper,
              stop        : updateLocation
            }).resizable({
              handles : 'e, w',
              stop    : updateLocation,
              resize  : function (e, ui) {
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
          var left  =  this.width * this.parent.start / this.chromosomeSize;
          var width = (this.width * this.parent.end   / this.chromosomeSize) - left;

          this.viewPoint.css({ left: left + this.labelWidth, width: width });
        }
      });

      if (!$.grep(this.plugins, function (plugin) { return plugin === 'controlPanel' }).length) {
        $('<li class="gv-unsortable">').height(function (i, h) {
          return h + container.height();
        }).prependTo(this.labelContainer);
      }
    },

    afterSetRange: function () {
      if (this.karyotype) {
        this.karyotype.updatePosition();
      }
    }
  });
};