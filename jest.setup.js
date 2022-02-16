// webpack's require.context is not supported by Jest, but is used in index.js.
// This plugin adds the function global.__requireContext, which can be used instead,
// and its presence in babel.config's `plugins` replaces require.context with global.__requireContext
require('babel-plugin-require-context-hook/register')();

// A hack to make jquery-ui's use of requirejs-style imports work with Jest.
// babel-plugin-transform-amd-to-commonjs is used to transform calls to define() into require(),
// but jquery-ui wraps these calls in:
//   if ( typeof define === "function" && define.amd ) { ... }
// so just using the transformation by itself is not enough - that code to be run as well.
// Creating a fake define function solves this problem.
global.define     = () => {};
global.define.amd = {};
