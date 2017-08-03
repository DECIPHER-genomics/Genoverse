'use strict';

// Test-specific requirements
global.window    = (new (require('jsdom').JSDOM)('', { url: 'http://localhost/' })).window;
global.document  = window.window.document;
global.navigator = window.navigator;
global.expect   = require('expect');

// Genoverse library
require(process.cwd() + '/index.js');

Genoverse.ready.resolve();
