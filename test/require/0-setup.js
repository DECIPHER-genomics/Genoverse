'use strict';

// Test-specific requirements
global.window    = (new (require('jsdom').JSDOM)('', { url: 'http://localhost/' })).window;
global.document  = window.window.document;
global.navigator = window.navigator;
global.expect   = require('chai').expect;

// Used for skipping some tests that fail on macOS due to very small differences in OS font rendering etc
global.isMacOS = process.platform === 'darwin';

// Genoverse library
require(process.cwd() + '/index.js');

Genoverse.ready.resolve();
