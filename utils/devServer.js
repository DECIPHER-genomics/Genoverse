/* eslint-disable no-console */

// A server to use for development purposes. NOT RECOMMENDED FOR PRODUCTION.

const fs   = require('fs');
const http = require('http');
const path = require('path');

const dir          = path.resolve(__dirname, '..');
const port         = process.env.PORT || 3000;
const contentTypes = {
  css  : 'text/css',
  js   : 'text/javascript',
  html : 'text/html',
};

http.createServer((req, res) => {
  const file            = req.url.split('?')[0].replace(/^\//, '') || 'index.html';
  const [ , extension ] = file.match(/\.(\w+)$/) || [];

  fs.readFile(path.resolve(dir, file), (err, data) => {
    try {
      if (err) {
        res.writeHead(404);
        res.end(JSON.stringify(err));

        return;
      }

      res.writeHead(200, { 'Content-Type': contentTypes[extension] || 'text/plain' });
      res.end(data);
    } catch (e) {
      console.error(e);
    }
  });
}).listen(port);
