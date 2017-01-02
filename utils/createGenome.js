// nodejs example of how to create a genomes file from the Ensembl REST API
require('http').get({
  hostname : 'rest.ensembl.org',
  path     : '/info/assembly/homo_sapiens?bands=1',
  headers  : { 'Content-Type': 'application/json' }
}, function (response) {
  var str = ''

  response.on('data', function (chunk) { str += chunk; });

  response.on('end', function () {
    try {
      require('fs').writeFile('js/genomes/human.js', JSON.stringify(JSON.parse(str).top_level_region.filter(function (d) {
        return d.coord_system === 'chromosome';
      }).map(function (d) {
        return [
          d.name, {
            size: d.length,
            bands: (d.bands || [{ start: 1, end: d.length }]).map(function (b) {
              return { id: b.id, start: b.start, end: b.end, type: b.stain };
            })
          }
        ];
      }).reduce(function (hash, d) {
        hash[d[0]] = d[1]; return hash;
      }, {}), null, 2));
    } catch (e) {
      console.log(e.message);
    }
  });
}).on('error', function (e) {
  console.log(`Got error: ${e.message}`);
}).end();
