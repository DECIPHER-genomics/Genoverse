Genoverse.Track.on('afterAddDomElements', function() {
  this.label.children('span.name').append(
    '<div class="controls">' + 
    '<a class="close" data-track_index="'+ this.index +'">x</a>' +
    '</div>'
  );

  $('.controls a.close').on('click', function() {
    genoverse.tracks[$(this).data('track_index')].hide();
  });
});