var MiniCssExtractPlugin = require('mini-css-extract-plugin');
var CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
var TerserPlugin = require('terser-webpack-plugin');
var webpack      = require('webpack');

module.exports = {
  mode    : 'production',
  entry   : {
    genoverse: __dirname + '/index.js'
  },
  target  : [ 'web', 'es5' ],
  output  : {
    filename: '[name].min.js',
    path: __dirname + '/build',
    library: {
      name: 'Genoverse',
      type: 'umd'
    }
  },
  devtool : 'source-map',
  module: {
    rules: [
      // Styling
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/[name][ext][query]'
        }
      },
    ],

  },
  resolve: {
    alias: {
      Base : __dirname + '/js/lib/Base.js',
      dallianceLib : __dirname + '/js/lib/dalliance-lib.min.js',
      BWReader : __dirname + '/js/lib/BWReader.js',
      VCFReader : __dirname + '/js/lib/VCFReader.js',
      RTree : __dirname + '/js/lib/rtree.js',
      jDataView : __dirname + '/js/lib/jDataView.js',
      jParser: __dirname + '/js/lib/jParser.js',
      Track: __dirname + '/js/Track.js',
    }
  },
  plugins : [
    new MiniCssExtractPlugin(),
    new webpack.ProvidePlugin({
      $ : 'jquery',
      jQuery : 'jquery',
      Base: 'Base',
      TrackClass: 'Track',
      dallianceLib: 'dallianceLib',
      BWReader: 'BWReader',
      VCFReader: 'VCFReader',
      RTree: 'RTree',
      jDataView: 'jDataView',
      jParser: 'jParser'
    }),
    new webpack.DefinePlugin({
      define: undefined, // Stop jquery-ui.js trying to do define(["jquery"]), which doesn't work if jquery isn't in node_modules
      VERSION: JSON.stringify(process.env.npm_package_version),
    }),
  ],
  optimization: {
    minimize: true,
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
      new CssMinimizerPlugin(),
    ],
  },
  performance: {
    maxEntrypointSize : 400000,
    maxAssetSize      : 400000,
  },
};
