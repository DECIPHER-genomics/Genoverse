// Toying with the worker

importScripts('FRegion.js');

// Global for the worker instance (really?)
var __features;
var trackHeight;

self.addEventListener('message', function(e) {

  if (e.data.file) {
    var reader  = new FileReaderSync();
    var string  = reader.readAsText(e.data.file);
    var json    = JSON.parse(string);
    trackHeight = e.data.height;
    __features  = parse(json);
  }

  self.postMessage({ taskId: e.data.taskId, features: __features.search(e.data.bounds) });

}, false);


function parse(json) {
  var features = new Array();

  var halfHeight = trackHeight/2;
  var quarterHeight = trackHeight/4;
  for (var i = 0; i < json.data.length; i++) {
    features.push({
      start: json.data[i][0],
      end:  json.data[i][0] + 10,
      y: halfHeight - json.data[i][1]*quarterHeight
    });
  }

  return new FRegion(features);
}