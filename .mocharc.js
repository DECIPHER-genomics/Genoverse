module.exports = {
  noTimeouts: true,
  recursive: true,
  require: [
    'ignore-styles',
    'test/require/0-setup.js',
    'test/require/rendering.js'
  ]
};
