// Toying with the worker

self.addEventListener('message', function(e) {

  debugger;
  var file = e.data.file;
  var reader = new FileReaderSync();

  var string = reader.readAsText(file);
  var json   = JSON.parse(string);
  self.postMessage(json);

}, false);