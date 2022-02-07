require('core-js/es/promise');
require('core-js/stable/url');

global.jQuery = global.$ = require('jquery');

// Bits of jquery-ui which we care about
require('jquery-ui/ui/position');
require('jquery-ui/ui/widgets/draggable');
require('jquery-ui/ui/widgets/resizable');
require('jquery-ui/ui/widgets/sortable');

require('js/lib/jquery.mousewheel');
require('js/lib/jquery.mousehold');
require('js/lib/jquery.tipsy');

global.Genoverse = require('js/Genoverse').default;

const getTrackImports = importFiles => importFiles.keys().reduce(
  (acc, key, ...args) => {
    acc[key.replace('./', '').replace('.js', '')] = importFiles(key, ...args)

    return acc;
  },
  {}
);

const setTrackNamespace = (namespace, exportKey, fileExport) => {
  if (!fileExport) {
    return;
  }

  const path     = namespace.replace('library/', '').split('/');
  const [ name ] = path.slice(-1);
  const parent   = path.slice(0, -1).reduce(
    (acc, part) => (acc ? acc[part] : acc),
    exportKey === 'default' ? Genoverse.Track : Genoverse.Track[exportKey]
  );

  if (!parent[name]) {
    parent[name] = fileExport;
  }
}

const trackImports = getTrackImports(require.context('js/Track', true, /\.js$/));

Object.keys(trackImports).sort().forEach(
  (namespace) => Object.keys(trackImports[namespace]).sort().forEach(
    (exportKey) => setTrackNamespace(namespace, exportKey, trackImports[namespace][exportKey])
  )
);

require.context('js/plugins', true, /\.js$/);
