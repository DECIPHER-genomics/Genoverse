'use strict';

// Test-specific requirements
global.window    = (new (require('jsdom').JSDOM)('', { url: 'http://localhost/' })).window;
global.document  = window.window.document;
global.navigator = window.navigator;
global.expect   = require('chai').expect;

// Used for skipping some tests that fail on macOS due to very small differences in OS font rendering etc
global.isMacOS = process.platform === 'darwin';

global.jQuery = global.$ = require('jquery');

global.Base = require('../../js/lib/Base.js');
global.dallianceLib = require('../../js/lib/dalliance-lib.min.js');
global.BWReader = require('../../js/lib/BWReader.js');
global.VCFReader = require('../../js/lib/VCFReader.js');
global.RTree = require('../../js/lib/rtree.js');
global.jDataView = require('../../js/lib/jDataView.js');
global.jParser = require('../../js/lib/jParser.js');
global.Genoverse = require('../../index.js');

Genoverse.ready.resolve();
