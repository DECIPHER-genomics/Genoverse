Genoverse.on('afterInit', function() {
  var fileDropDiv = $('<div class="gv_file_drop" />').appendTo(this.wrapper);
  var container = this.container[0];

  container.addEventListener("dragenter", function (e) { 
    fileDropDiv.addClass('hover'); 
    return false; 
  }, true);

  document.addEventListener("dragover", function( event ) {
      // prevent default to allow drop
      event.preventDefault();
  }, false);

  document.addEventListener("dragenter", function (e) { 
    if (!$.contains(container, e.target)) 
      fileDropDiv.removeClass('hover'); 
    return false; 
  }, false);

  document.addEventListener("dragleave", function (e) {
      // reset background of potential drop target when the draggable element leaves it
      console.log(e);
      //fileDropDiv.removeClass('hover'); 
 
  }, false);

  container.ondrop      = function (e) {
    fileDropDiv.removeClass('hover');
    e.preventDefault();

    console.log(e.dataTransfer.files);

    var file = e.dataTransfer.files[0], reader = new FileReader();

    reader.onload = function (event) {
      console.log(event.target);
      holder.style.background = 'url(' + event.target.result + ') no-repeat center';
    };

    //reader.readAsDataURL(file);

    return false;
  };

});