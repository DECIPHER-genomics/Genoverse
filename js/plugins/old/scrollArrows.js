// Default css
// Reason it's here is so that developer only has to include this js file for entire plugin functionality
// Any additional custom css will overwrite it
document.styleSheets[0].insertRule(".arrow { \
  user-select: none;                         \
  background-color:black;                    \
  opacity: 0.5;                              \
  border-radius:30px;                        \
  height:100px;                              \
  width: 100px;                              \
  position: absolute;                        \
  left: -50px;                               \
  top: 30%;                                  \
  cursor: pointer;                           \
  z-index: 100;                              \
}", 0);

document.styleSheets[0].insertRule(".arrow div { color: white; font-size: 57px; font-weight: bold; margin: auto; opacity: 0.8; padding:0; text-align: right;  margin: 10px; }", 0);
document.styleSheets[0].insertRule(".arrow.right div { text-align: left; }", 0);


Genoverse.on('afterInit', function () {
  var browser = this;
  var delta   = browser.width/2;
  var arrowWidth  = 100;
  var arrowOffset = arrowWidth/10;
  var lArrowLeft  = -arrowWidth+arrowOffset;
  var rArrowLeft  = this.width-arrowOffset;
  var halfArrowWidth = arrowWidth/2;

  this.lArrow = $('<div class="arrow left"><div>&#9668;</div></div>').css({ left: lArrowLeft }).appendTo(this.wrapper);
  this.rArrow = $('<div class="arrow right"><div>&#9658;</div></div>').css({ left: rArrowLeft }).appendTo(this.wrapper);

  $('.arrow').on('mouseenter', function() {
    $('div', $(this)).css({ opacity: 1 });
  }).on('mouseleave', function() {
    $('div', $(this)).css({ opacity: 0.8 });
  });

  $('.arrow.left').on('click', function() {
    browser.move(NaN, delta, 'fast');
    return false;
  })

  $('.arrow.right').on('click', function() {
    browser.move(NaN, -delta, 'fast');
    return false;
  })

  $('.arrow').on('dblclick', function() {
    return false;
  })

  this.wrapper.on('mousemove', function (e) {
    if (browser.dragging || browser.crosshairSelecting) return;
    var x = e.pageX - $(this).offset().left;

    if (x < arrowWidth) {
      browser.lArrow.stop().css({ left: Math.max(Math.min(-x, -halfArrowWidth), lArrowLeft) });
    } else {
      browser.lArrow.stop().css({ left: lArrowLeft });
    }

    if (x > browser.width-arrowWidth) {
      browser.rArrow.stop().css({ left: Math.max(Math.min(rArrowLeft, 2*browser.width - x - arrowWidth), browser.width-halfArrowWidth ) });
    } else {
      browser.rArrow.stop().css({ left: rArrowLeft });
    }

  }).on('mouseleave', function (e) {
     browser.lArrow.animate({ left: lArrowLeft }, 'slow');
     browser.rArrow.animate({ left: rArrowLeft }, 'slow');
  });
});