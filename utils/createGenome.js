/* eslint-disable no-console */
const fs   = require('fs');
const http = require('http');

// nodejs example of how to create a genomes file from the Ensembl REST API
http.get(
  {
    hostname : 'rest.ensembl.org',
    path     : '/info/assembly/homo_sapiens?bands=1',
    headers  : { 'Content-Type': 'application/json' },
  },
  (response) => {
    let str = '';

    response.on('data', (chunk) => { str += chunk; });

    response.on('end', () => {
      try {
        fs.writeFile(
          'js/genomes/human.js',
          JSON.stringify(
            JSON.parse(str).top_level_region.filter(d => d.coord_system === 'chromosome').map(
              d => [
                d.name,
                {
                  size  : d.length,
                  bands : (d.bands || [{ start: 1, end: d.length }]).map(
                    b => ({
                      id    : b.id,
                      start : b.start,
                      end   : b.end,
                      type  : b.stain,
                    })
                  ),
                },
              ]
            ).reduce(
              (acc, d) => Object.assign(acc, { [d[0]]: d[1] }),
              {}
            ),
            null,
            2
          )
        );
      } catch (e) {
        console.log(e.message);
      }
    });
  }
).on('error', (e) => {
  console.log(`Got error: ${e.message}`);
}).end();
