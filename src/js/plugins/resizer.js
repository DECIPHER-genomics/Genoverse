import 'css/resizer.css';

const plugin = function () {
  this.on('afterSetMVC', 'tracks', function () {
    if (this.prop('resizable') !== true) {
      return;
    }

    const track      = this;
    const controller = this.controller;
    const height     = this.prop('height');

    let resizer = this.prop('resizer');

    if (!resizer) {
      resizer = this.prop('resizer', $('<div class="gv-resizer gv-static"><div class="gv-handle"></div></div>').appendTo(track.prop('container')).draggable({
        axis  : 'y',
        start : () => { $('body').addClass('gv-dragging'); },
        stop  : function (e, ui) {
          $('body').removeClass('gv-dragging');
          controller.resize(track.prop('height') + ui.position.top - ui.originalPosition.top, true);
          $(this).css({ top: 'auto', bottom: 0 }); // returns the resizer to the bottom of the container - needed when the track is resized to 0
        },
      }).on('click', () => {
        const h = track.prop('fullVisibleHeight');

        if (h) {
          controller.resize(h, true);
        }
      }));
    }

    resizer.css({ width: this.width, left: 0 })[this.prop('autoHeight') ? 'hide' : 'show']();

    if (!this.prop('autoHeight') && height - this.prop('margin') === this.prop('featureHeight')) {
      controller.resize(height + resizer.height());
      this.prop('initialHeight', this.prop('height'));
    }
  });

  this.on('afterToggleExpander', 'tracks', function () {
    const resizer = this.prop('resizer');

    if (resizer) {
      resizer[this.expander?.is(':visible') ? 'addClass' : 'removeClass']('gv-resizer-expander');
    }
  });
};

export default { resizer: plugin };
