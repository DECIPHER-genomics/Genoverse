var defaultControls = [
  {
    icon   : 'x',
    name   : 'close',
    action : function () {
      this.hide();
    }
  },
  {
    icon   : '?',
    name   : 'Information',
    action : function () {
      this.browser.makeMenu({
        title : this.name,
        ' ' : this.info
      }).addClass('track_info');
    }    
  }
];

Genoverse.Track.on('afterAddDomElements', function() {
  var track = this;
  var controls = (track.controls || []).concat(defaultControls);

  //debugger;
  var $div = $('<div class="controls" />');

  for (var i=0; i<controls.length; i++) {
    (function(control){
      var $control = $('<a />')
        .html(control.icon)
        .attr({title: control.name})
        .on('click', function () {
          control.action.apply(track);
        });

      $div.append($control);
    })(controls[i])
  }

  this.label.children('span.name').append($div);
});