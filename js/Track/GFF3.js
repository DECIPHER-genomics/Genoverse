Genoverse.Track.GFF3 = Genoverse.Track.extend({

  // Defaults 
  name           : "GFF3",
  height         : 100,
  featureHeight  : 8,
  featureSpacing : 2,
  bump           : true,
  dataType       : 'text',
  labels         : true,
  color          : '#000000',


  parseData: function (text) {
    //debugger;
    var lines = text.split("\n");
    for (var i=0; i<lines.length; i++) {
      if (!lines[i].length || lines[i].indexOf('#') === 0) continue;

      var fields  = lines[i].split("\t");

      if (fields.length < 5) continue;

      if (fields[0] == this.browser.chr || fields[0] == 'chr' + this.browser.chr || fields[0].match('[^1-9]'+ this.browser.chr +'$')) {
        var feature = {};

        if (fields[8]) {
          var frame = fields[8].split(';');
          for (var j=0; j<frame.length; j++) {
            var keyValue = frame[j].split('=');
            if (keyValue.length == 2) feature[keyValue[0].toLowerCase()] = keyValue[1];
          }
        }

        feature.start  = fields[3]*1;
        feature.end    = fields[4]*1;
        feature.id     = feature.id || fields.slice(0,5).join("|");

        feature.source = fields[1];
        feature.type   = fields[2];
        feature.score  = fields[5];
        feature.strand = fields[6];

        // Assuming here that parent always goes first in the GFF file, 
        // which seems to be the case for most examples
        if (feature.parent) {
          this.featuresById[feature.parent].parts.push(feature);
        } else {
          feature.label  = feature.name || feature.id || '';
          feature.parts = [];
          this.insertFeature(feature);
        }

      }
    }
  },


  drawFeature: function(feature, context, scale) {
    if (!feature.parts || !feature.parts.length) return this.base(feature, context, scale);

    context.fillRect(Math.floor(feature.x), Math.floor(feature.y + feature.height/2), Math.max(1, Math.floor(feature.width)), 0.5);

    for (var i=0; i<feature.parts.length; i++) {
      var part = feature.parts[i];
      this.base(
        $.extend({}, part, {
          x: feature.x + (part.start - feature.start) * scale, 
          y: feature.y,
          width: (part.end - part.start) * scale,
          height: feature.height
        }),
        context, 
        scale
      );
    }

    context.fillStyle = 'black';
    context.fillText(feature.label, feature.x, feature.y + feature.height + 2);
  },


});