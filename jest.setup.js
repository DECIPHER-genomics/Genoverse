// webpack's require.context is not supported by Jest, but is used in index.js.
// This plugin adds the function global.__requireContext, which can be used instead,
// and its presence in babel.config's `plugins` replaces require.context with global.__requireContext
//
// However, this plugin does not account for Jest's `moduleNameMapper` configuration, which is fixed below
require('babel-plugin-require-context-hook/register')();

const { moduleNameMapper } = require('./jest.config');

const context = global.__requireContext;

global.__requireContext = (basedir, directory, useSubdirectories, regExp) => {
  const mappdedDirectory = Object.entries(moduleNameMapper || {}).map(
    ([ regexp, mapping ]) => directory.replace(new RegExp(regexp), mapping.replace('<rootDir>', __dirname))
  ).find(
    replaced => replaced !== directory
  );

  return context(basedir, mappdedDirectory || directory, useSubdirectories, regExp);
};

// A hack to make jquery-ui's use of requirejs-style imports work with Jest.
// babel-plugin-transform-amd-to-commonjs is used to transform calls to define() into require(),
// but jquery-ui wraps these calls in:
//   if ( typeof define === "function" && define.amd ) { ... }
// so just using the transformation by itself is not enough - that code to be run as well.
// Creating a fake define function solves this problem.
global.define     = () => {};
global.define.amd = {};
