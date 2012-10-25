Genoverse.Track.on('afterResize afterInit', function () {
  parent.postMessage($('body').outerHeight(true), 'https://decipher.sandbox.sanger.ac.uk');
});