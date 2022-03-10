# Genoverse [![Build Status](https://github.com/wtsi-web/Genoverse/actions/workflows/test.yml/badge.svg)](https://github.com/wtsi-web/Genoverse/actions)

Genoverse is a portable, customizable, back-end independent JavaScript and HTML5 based genome browser which allows the user to explore data in a dynamic and interactive manner.

Data is visualized in the browser, meaning Genoverse can be installed on any website and show data from a wide range of online or local sources.

Genoverse works with a variety of formats, such as JSON, BED, BAM, VCF, GFF, delimited text files, or XML, and can be customized to parse and display any data source as required.

Genoverse works using a system of [tracks](https://github.com/wtsi-web/Genoverse/wiki/Tracks) - essentially horizontal sections of the genome browser which display [features](https://github.com/wtsi-web/Genoverse/wiki/Features) - genes, variants, etc. with defined genomic start and end points. Each track has its own data set stored in a [model](https://github.com/wtsi-web/Genoverse/wiki/Genoverse.Track.Model-functions), a method for displaying that data, stored in a [view](https://github.com/wtsi-web/Genoverse/wiki/Genoverse.Track.View-functions), and a [controller](https://github.com/wtsi-web/Genoverse/wiki/Genoverse.Track.Controller-functions) to manage the creation of DOM elements, and user interactions with them.

Tracks can have multiple models and views, which allows for switching between displays at different zoom levels. An example of this would be a track where you show genes when looking at a large region of a chromosome, and then switch to showing transcripts as the user zooms in.

In addition to this, Genoverse has a set of [plugins](https://github.com/wtsi-web/Genoverse/wiki/Plugins), which allow additional functionality beyond the core genome browser. These include a control panel for adding and removing tracks, and interacting with the browser more easily, a way to add controls to each individual track, and a way to enable drag and drop of local data files onto the genome browser.

## Installation

Install from npm
```sh
yarn add genoverse
```

### Basic embedding

Embed Genoverse using
```html
<script src="/path/to/genoverse/dist/genoverse.js"></script>
```

Add a script tag or JavaScript file which initializes Genoverse, e.g.
```html
<script>
  const genoverse = new Genoverse({ ... configuration ... });
</script>
```

Once initalized, the instance of Genoverse is avaliable as a jQuery data attribute on the container DOM element, and can be accessed by
```javascript
const genoverse = Genoverse.jQuery(container).data('genoverse');
```

### Build options

By default, the Genoverse distribution in created with [Babel](https://babeljs.io/) and certain [polyfills](https://github.com/zloirock/core-js/blob/master/README.md), in order to support old web browsers like Internet Explorer 11.

If you want to create your own distribution bundle, see `devDependencies` in [package.json](https://github.com/wtsi-web/Genoverse/blob/master/package.json) for Webpack/Babel packages you need to install in order to be able to do so.

Once these dependencies are installed, distributions can be built with [webpack-cli](https://webpack.js.org/api/cli/).

Polyfills can be disabled, either with
```sh
yarn webpack --env no-polyfills
```
which still uses Babel to create ES5-compatible code, but doesn't include the polyfills (useful if the page already includes polyfills), or with
```
yarn webpack --env modern
```
which does not transpile to ES5-compatible code or include polyfills, and thus will not work in old browsers at all.

Additionally, you can set the [webpack `output.publicPath`](https://webpack.js.org/configuration/output/#outputpublicpath) with
```
yarn webpack --env public-path=/public/path/to/genoverse
```
This is necessary if `/path/to/genoverse/dist` is not your webserver's root directory for static files.

This option can be combined with `--env no-polyfills` or `--env modern`, e.g.
```
yarn webpack --env modern --env public-path=/public/path/to/genoverse
```

### Importing into other webpack-bundled code

You can use webpack's [`import`](https://webpack.js.org/guides/ecma-script-modules/#importing) keyword to import Genoverse's source code into another application, without needing to build a distribution (or installing any additional packages):

```js
// static import
import Genoverse from 'genoverse';

// dynamic import, useful if you need to avoid server-side importing Genoverse,
// which doesn't work because it depends on `window`
const Genoverse = await import('genoverse').then(module => module.default);
```

### Using `Genoverse.configure()`

The Genoverse class provides a `configure` function which allows you to change what code will be imported. This function is run automatically when an instance of Genoverse is constructed, but can also be called manually - only the first execution will have any affect.

The default arguments are as follows:
```js
Genoverse.configure({
  tracks      : {},    // see below
  plugins     : {},    // see below
  genomes     : {},    // see below
  css         : true,  // if true, Genoverse's css file will by dynamically imported
  fontawesome : true,  // if true, fontawesome 6 will be dynamically imported. Set to false if fontawesome is already in use on the page
  force       : false, // if true, configuration is updated according to the other arguments
});
```

```js
tracks: {
  // A list of tracks, controllers, models, or views which you don't want to appear in the Genoverse.Track namespace.
  // Note: this does not stop files containing excluded code from being present in the webpack bundle.
  exclude: [
    // The code in src/js/Track/Model/Transcript/Ensembl.js will not be present as Genoverse.Track.Model.Transcript.Ensembl
    'Model.Transcript.Ensembl',

    // The code in src/js/Track/View/Sequence/Variation.js will not be present as Genoverse.Track.View.Sequence.Variation
    'View/Sequence/Variation',

    // The code in src/js/Track/library/Gene.js will not be present as Genoverse.Track.Gene
    'Gene',

    // The code in src/js/Track/library/dbSNP.js will not be present as Genoverse.Track.dbSNP
    'library/dbSNP',

    ...
  ],

  // A webpack `require.context` for a folder containing custom track definitions.
  // This folder must be structured in the same way as src/js/Track, i.e. with some/or of the sub-folders Controller, Model, View, library
  include: require.context('/path/to/custom/tracks/folder', true, /\.js$/),
}
```

```js
plugins: {
  // A webpack `require.context` for a folder containing custom plugins.
  include: require.context('/path/to/custom/plugins/folder', true, /\.js$/),
}
```

```js
genomes: {
  // A webpack `require.context` for a folder containing custom genome definitions.
  // The human genomes GRCh37 and GRCh38 are included in the Genoverse repo, and imported dynamically if needed (see src/js/genomes).
  // Additional genomes can be loaded with the following option, or by using new Genoverse({ ... genome: aGenomeDefinitionObject ... })
  include: require.context('/path/to/custom/genomes/folder', true, /\.js$/),
}
```

Before `Genoverse.configure` is executed, `Genoverse.Track`, `Genoverse.Track.Controller`, `Genoverse.Track.Model`, and `Genoverse.Track.View` all exist, but none of their children (i.e. `Genoverse.Track.Foo`) will.

Because of this, if you want to use track classes as options in `new Genoverse()`, you need to call `Genoverse.configure()` first, i.e.

```js
Genoverse.configure({ ... });

new Genoverse({
  ...
  tracks: [
    Genoverse.Track.Foo,
    Genoverse.Track.Bar.extend({ foo: false, bar: true, ... }),
    Genoverse.Track.extend({
      controller : Genoverse.Track.Controller.Foo,
      model      : Genoverse.Track.Model.Foo.extend({ foo: true }),
      view       : Genoverse.Track.View.Foo.Bar,
    }),
  ]
});
```

Alternatively, you can do the following without having to call `Genoverse.configure()` first:

```js
new Genoverse({
  ...
  tracks: [
    'Foo',                                     // -> Genoverse.Track.Foo
    [ 'Foo' ],                                 // -> Genoverse.Track.Foo
    [ 'Bar', { foo: false, bar: true, ... } ], // -> Genoverse.Track.Bar.extend({ foo: false, bar: true, ... })
    {                                          // -> Genoverse.Track.extend({
      foo        : false,                      // ->   foo        : false,
      bar        : false,                      // ->   bar        : false,
      controller : [ 'Foo' ],                  // ->   controller : Genoverse.Track.Controller.Foo,
      model      : [ 'Foo', { foo: true }],    // ->   model      : Genoverse.Track.Model.Foo.extend({ foo: true }),
      view       : 'Foo.Bar',                  // ->   view       : Genoverse.Track.View.Foo.Bar,
    }                                          // -> })
  ]
});
```

See [index.html](https://github.com/wtsi-web/Genoverse/blob/master/index.html) for example configuration, or the [documentation](https://github.com/wtsi-web/Genoverse/wiki/Genoverse-configuration) for more details about configuration properties.
