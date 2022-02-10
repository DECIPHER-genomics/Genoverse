import Genoverse from 'js/Genoverse';

global.Genoverse = Genoverse;

const getImports = r => r.keys().reduce(
  (acc, key, ...args) => {
    acc[key.replace('./', '').replace('.js', '')] = r(key, ...args);

    return acc;
  },
  {}
);

/*
  Add each track file to Genoverse.Track, such that, e.g.
  src/js/Track/library/Foo/Bar/Baz.js    => Genoverse.Track.Foo.Bar.Baz
  src/js/Track/Controller/Foo/Bar/Baz.js => Genoverse.Track.Controller.Foo.Bar.Baz
  src/js/Track/Model/Foo/Bar/Baz.js      => Genoverse.Track.Model.Foo.Bar.Baz
  src/js/Track/View/Foo/Bar/Baz.js       => Genoverse.Track.View.Foo.Bar.Baz

  A file in library/ which also exports { Controller, Model, View } will cause these to also be added to Genoverse.Track, e.g.
  src/js/Track/library/Legend.js => Genoverse.Track.Legend, Genoverse.Track.Controller.Legend, Genoverse.Track.Model.Legend, Genoverse.Track.View.Legend
*/
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
};

const trackImports = getImports(require.context('js/Track', true, /\.js$/));

Object.keys(trackImports).sort().forEach(
  namespace => Object.keys(trackImports[namespace]).sort().forEach(
    exportKey => setTrackNamespace(namespace, exportKey, trackImports[namespace][exportKey])
  )
);
