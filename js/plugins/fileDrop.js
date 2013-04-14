Genoverse.on('afterInit', function() {
  var fileDropDiv = $('<div class="gv_file_drop" />').appendTo(this.wrapper);
  var container = this.container[0];

  container.addEventListener("dragenter", function (e) { fileDropDiv.addClass('hover'); return false; }, true);
  window.addEventListener("dragenter", function (e) { if (!$.contains(container, e.target)) fileDropDiv.removeClass('hover'); return false; }, false);

  container.ondrop      = function (e) {
    fileDropDiv.removeClass('hover');
    e.preventDefault();

    var file = e.dataTransfer.files[0], reader = new FileReader();

    reader.onload = function (event) {
      console.log(event.target);
      holder.style.background = 'url(' + event.target.result + ') no-repeat center';
    };

    console.log(file);
    //reader.readAsDataURL(file);

    return false;
  };

});