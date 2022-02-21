import _set from 'lodash/set';

/*
  Add each track file to Genoverse.Track, such that, e.g.
  src/js/Track/library/Foo/Bar/Baz.js    => Genoverse.Track.Foo.Bar.Baz
  src/js/Track/Controller/Foo/Bar/Baz.js => Genoverse.Track.Controller.Foo.Bar.Baz
  src/js/Track/Model/Foo/Bar/Baz.js      => Genoverse.Track.Model.Foo.Bar.Baz
  src/js/Track/View/Foo/Bar/Baz.js       => Genoverse.Track.View.Foo.Bar.Baz

  A file in library/ which also exports { Controller, Model, View } will cause these to also be added to Genoverse.Track, e.g.
  src/js/Track/library/Legend.js => Genoverse.Track.Legend, Genoverse.Track.Controller.Legend, Genoverse.Track.Model.Legend, Genoverse.Track.View.Legend
*/
const setTrackNamespace = (Track, namespace, exportKey, fileExport) => {
  if (fileExport) {
    _set(
      exportKey === 'default' ? Track : Track[exportKey],
      namespace.replace('library/', '').split('/'),
      fileExport
    );
  }
};

export default (Track, requireContext, { exclude = [] } = {}) => {
  const trackImports = requireContext.keys().reduce(
    (acc, key, ...args) => {
      const k = key.replace('./', '').replace('.js', '');

      if (exclude && exclude.includes(k)) {
        return acc;
      }

      return Object.assign(acc, { [k]: requireContext(key, ...args) });
    },
    {}
  );

  Object.keys(trackImports).sort().forEach(
    namespace => Object.keys(trackImports[namespace]).sort().forEach(
      exportKey => setTrackNamespace(Track, namespace, exportKey, trackImports[namespace][exportKey])
    )
  );
};
