Genoverse.Plugins.hoverLabels = function () {
  Genoverse.Track.on('afterAddDomElements', function () {
    var track = this;
    this.container
    .mouseenter(function () {
      track.label.css({ overflow: 'visible'});
    })
    .mouseleave(function () {
      track.label.css({ overflow: 'hidden'});
    });

    this.label
    .mouseenter(function () {
      $(this).css({ overflow: 'visible'});
    })
    .mouseleave(function () {
      $(this).css({ overflow: 'hidden'});
    });
  });
};