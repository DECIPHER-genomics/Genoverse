const TerserPlugin = require('terser-webpack-plugin');
const webpack      = require('webpack');

module.exports = {
  mode    : 'production',
  entry   : `${__dirname  }/index.js`,
  target  : [ 'web', 'es5' ],
  output  : { filename: 'genoverse.min.js', path: `${__dirname  }/js` },
  devtool : 'source-map',
  plugins : [
    new webpack.ProvidePlugin({
      $      : `${__dirname  }/js/lib/jquery.js`,
      jQuery : `${__dirname  }/js/lib/jquery.js`,
    }),
    new webpack.DefinePlugin({
      define: undefined, // Stop jquery-ui.js trying to do define(["jquery"]), which doesn't work if jquery isn't in node_modules
    }),
  ],
  optimization: {
    minimizer: [
      new TerserPlugin({
        extractComments : false,
        parallel        : true,
        terserOptions   : {
          compress: {
            keep_infinity: true,
          },
          output: {
            comments: false,
          },
        },
      }),
    ],
  },
  performance: {
    maxEntrypointSize : 400000,
    maxAssetSize      : 400000,
  },
};
