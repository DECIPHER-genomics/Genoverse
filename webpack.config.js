var webpack = require('webpack');

module.exports = {
  mode    : 'production',
  entry   : __dirname + '/index.js',
  output  : { filename: 'genoverse.min.js', path: __dirname + '/js' },
  devtool : 'source-map',
  plugins : [
    new webpack.ProvidePlugin({
      $      : __dirname + '/js/lib/jquery.js',
      jQuery : __dirname + '/js/lib/jquery.js'
    }),
    new webpack.DefinePlugin({
      define: undefined // Stop jquery-ui.js trying to do define(["jquery"]), which doesn't work if jquery isn't in node_modules
    }),
  ],
  performance: {
    maxEntrypointSize : 400000,
    maxAssetSize      : 400000,
  },
};
