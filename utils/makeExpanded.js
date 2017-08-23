'use strict';
var dir = process.cwd();
var fs  = require('fs');

var jsFiles = fs.readFileSync(dir + '/index.js', 'utf8')
  .split('\n')
  .filter(t => /require/.test(t))
  .map(t => `<script type="text/javascript" src="${t.replace(/.*require\((.+)\).*/, '$1').replace(/__dirname/, '').replace(/[\+\s\\']/g, '').replace(/^\//, '')}"></script>`);

var cssFiles = fs.readdirSync(dir + '/css')
  .sort((a, b) => (b.match(/^genoverse.css$/) || []).length - (a.match(/^genoverse.css$/) || []).length) // genoverse.css must go first, but order is not important for other files since all plugins are namespaced
  .map(file => `<link rel="stylesheet" type="text/css" href="css/${file}" />`);

var html = fs.readFileSync(dir + '/utils/expandedTemplate.html', 'utf8').replace(/__JS__/, jsFiles.join('\n    ')).replace(/__CSS__/, cssFiles.join('\n    '));

fs.writeFileSync(dir + '/expanded.html', html, 'utf8');
