$(document).ready(function() {
var $container = $('#container');
var $c, c, cxt, text, data;
var zoom = 1, start = 1;

initCanvas();

function initCanvas(){
  $container.children().detach();
  $container.html('<canvas id="myCanvas" height="'+ $container.outerHeight(false) +'" width="'+ $container.outerWidth(false) +'"></canvas>');
  $c = $('#myCanvas');
  c = $c[0];

  cxt = c.getContext("2d");
  cxt.fillStyle="#FFF";  
}

$(window).resize(function() {
  initCanvas();
  plot();
});

$c.bind('mousewheel', function(event, delta) {
  var x = event.clientX;
  console.log(delta);
  zoom = zoom - delta/10;
  if (zoom < 1) zoom = 1;
  console.log(zoom);

  start = Math.floor( (x-x/zoom)*data.length/$c.outerWidth(false) );
  console.log(start);
  
  plot();
});


function noop(evt) {
  evt.stopPropagation();
  evt.preventDefault();
}

function drop(evt) {
  evt.stopPropagation();
  evt.preventDefault();

  var files = evt.dataTransfer.files;
  var count = files.length;

  // Only call the handler if 1 or more files was dropped.
  if (count > 0)
      handleFiles(files);
}

function handleFiles(files) {
  var file = files[0];
  var reader = new FileReader();
  reader.onload = function(e) {
    // get file content
    text = e.target.result;
    data = text.split("\n");
    plot();
  }
  reader.readAsText(file);
}

function plot(){
  var h = $c.outerHeight(false);
  var w = $c.outerWidth(false);
  cxt.clearRect (0, 0, w, h);

  points = data.slice( start, start + Math.floor(data.length/zoom) );
  
  for (var i=0; i < points.length; i++) {
    var values = points[i].split("\t");
    var baf = values[1];
    var lrr = values[2];

    try {
      cxt.fillRect(20 + i * (w - w*0.025)/points.length, h*0.3 - h*0.25*lrr, 2, 2);          
      cxt.fillRect(20 + i * (w - w*0.025)/points.length, (h - h*0.1) - h*0.25*baf, 2, 2);          
    } catch(err) {
      console.log(values);
    }
    
  }  
}


$container[0].addEventListener("dragenter", noop, false);
$container[0].addEventListener("dragexit", noop, false);
$container[0].addEventListener("dragover", noop, false);
$container[0].addEventListener("drop", drop, false);
    
});