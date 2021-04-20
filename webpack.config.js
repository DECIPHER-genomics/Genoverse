var TerserPlugin = require('terser-webpack-plugin');
var webpack      = require('webpack');

module.exports = {
  mode    : 'development',
  entry   : __dirname + '/index.js',
  target  : [ 'web', 'es5' ],
  output  : { filename: 'genoverse.min.js', path: __dirname + '/build',
  library: 'genoverse',
  libraryTarget: 'commonjs2'
},
  devtool : 'source-map',
  module: {
    rules: [
      // Styling
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        loader: "url-loader",
        options: {
          limit: 8192,
        },
      },
      {
        test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/'
            }
          }
        ]
      }
    ],

  },
  resolve: {
    alias: {
      Plugins : __dirname + '/js/plugins',
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
