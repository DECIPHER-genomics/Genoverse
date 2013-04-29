var karyotype = { };
var i = 22;
var autosomes = [];
while (i > 0) autosomes.unshift((i--) + '');
var chromosomes = autosomes.concat(["X", "Y"]);


var http    = require('http');
var parser  = require('xml2json');
var options = {
  host: 'www.ensembl.org',
  path: '/das/Homo_sapiens.GRCh37.karyotype/features?segment=1'
};

callback = function(response, chr) {
  var str = '';

  //another chunk of data has been recieved, so append it to `str`
  response.on('data', function (chunk) {
    str += chunk;
  });

  //the whole response has been recieved, so we just print it out here
  response.on('end', function () {
    var json = parser.toJson(str, {object : true});

    var chromosome = {};
    chromosome.size  = json.DASGFF.GFF.SEGMENT.stop;
    chromosome.bands = [];
    for (var i=0; i<json.DASGFF.GFF.SEGMENT.FEATURE.length; i++) {
      var feature = json.DASGFF.GFF.SEGMENT.FEATURE[i];
      var band = {
        id    : feature.id,
        start : feature.START,
        end   : feature.END,
        type  : feature.TYPE.id
      };
      chromosome.bands.push(band);
    }

    karyotype[chr] = chromosome;
    if (Object.keys(karyotype).length == chromosomes.length) {
      console.log('var karyotype = ' + JSON.stringify(karyotype, null, 2) + ';');
    }
  });
}



for (var i=0; i<chromosomes.length; i++) {

  (function(chr){

    options.path   = options.path.replace(/\w+$/, chr);
    http.request(options, function (response) { 
      callback(response, chr);
    }).end();

  })(chromosomes[i]);
}

//console.log(karyotype);

