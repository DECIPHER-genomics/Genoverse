Genoverse.Track.SV = Genoverse.Track.Sequence.DAS.extend({

  // defaults
  complementary : false,
  height        : 100,
  distance      : 0.2,
  yOffset       : 35,
  featureHeight : 15,
  shadow        : {
    offsetX : 0,
    offsetY : 0,
    blur    : 5,
    color   : "black"
  },


  // I guess getData vould be different to get both sequence and variation

  render: function (features, img) {
    var scale = img.data('scale');
    // tmp fix
    for (var i = 0; i < this.variations.length; i++) {
      var variation = this.variations[i];
      variation.sequence = variation.alternate_allele;
      variation.width = variation.end - variation.start + 1;
    }

    img.data({ height: this.yOffset + this.featureHeight + this.shadow.blur });

    this.scaleFeatures(this.variations, scale);
    this.positionFeatures(this.variations, img);
    this.base(features, img);
  },


  draw: function (features, context, scale) {
    this.base(features, context, scale);

    // TODO: overlapping variations only
    this.drawVariations(this.variations, context, scale);
  },


  drawVariations: function (variations, context, scale) {
    for (var i = 0; i < variations.length; i++) {
      var variation = variations[i];
      var position  = variation.position[scale];

      var referenceScaledWidth = scale * variation.reference_allele.length;
      var alternateScaledWidth = scale * variation.alternate_allele.length;
      var halfDelta = (referenceScaledWidth - alternateScaledWidth)/2;

      position.X += halfDelta;
      position.Y = this.yOffset - (1 + this.distance)*this.featureHeight;

      var referenceScaledWidth = variation.reference_allele.length * this.scale; 
      var alternateScaledWidth = variation.alternate_allele.length * this.scale; 

      context.strokeStyle = this.variationColor(variation);
      this.applyShadow(context);

      context.beginPath();
      context.moveTo(position.X, position.Y);
      context.lineTo(position.X + position.width, position.Y);
      context.lineTo(position.X + position.width, position.Y + this.featureHeight);

      context.lineTo(position.X + position.width + halfDelta, this.yOffset);
      context.lineTo(position.X + position.width + halfDelta, this.yOffset + this.featureHeight);
      context.lineTo(position.X - halfDelta, this.yOffset + this.featureHeight);
      context.lineTo(position.X - halfDelta, this.yOffset);

      context.lineTo(position.X, position.Y + this.featureHeight);
      context.lineTo(position.X, position.Y);
      context.closePath();

      context.stroke();
      this.repealShadow(context);

      context.fillStyle   = this.variationColor(variation);
      context.globalAlpha = 0.5;
      context.fill();
      context.globalAlpha = 1;

      this.drawSequence(
        variation,
        context,
        scale
      );

    }    
  },



  variationColor: function (variation) {
    return '#1DD300';
  },


  click: function (e) {
    var x = (e.pageX - this.container.parent().offset().left)/this.scale + this.browser.start;
    var y = e.pageY - $(e.target).offset().top;    

    for (var i = 0; i < this.variations.length; i++) {
      var variation = this.variations[i];
      if (x > variation.start && x < variation.start + Math.max(variation.reference_allele.length, variation.alternate_allele.length)) {
        this.browser.makeMenu(variation, { left: e.pageX, top: e.pageY }, this);
      }
    }
  },


  populateMenu: function (variation) {
    return {
      title : variation.type,
      Start : variation.start,
      End   : variation.end
    };
  },


  applyShadow: function (context) {
    if (this.shadow) {
      context.shadowOffsetX = this.shadow.offsetX;
      context.shadowOffsetY = this.shadow.offsetY;
      context.shadowBlur    = this.shadow.blur;
      context.shadowColor   = this.shadow.color;
    }
  },


  repealShadow: function (context) {
    context.shadowBlur = 0;
  },

});