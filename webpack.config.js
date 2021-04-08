var TerserPlugin = require('terser-webpack-plugin');
var webpack      = require('webpack');

module.exports = {
  mode    : 'development',
  entry   : __dirname + '/index.js',
  target  : [ 'web', 'es5' ],
  output  : { filename: 'genoverse.min.js', path: __dirname + '/js' },
  devtool : 'source-map',
  module: {
    rules: [
      // Styling
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/i,
        loader: "url-loader",
        options: {
          limit: 8192,
        },
      },

      // genoverse main module
      {
        test: require.resolve('./js/Genoverse.js'),
        use:
          'exports-loader?type=commonjs&exports[]=single|Genoverse',
      },

      // libs
      // {
      //   test: require.resolve('./js/lib/Base.js'),
      //   use:
      //     'exports-loader?type=commonjs&exports[]=single|Base',
      // },
      {
        test: require.resolve('./js/lib/RTree.js'),
        use:
          'exports-loader?type=commonjs&exports[]=single|RTree',
      },
      {
        test: require.resolve('./js/lib/dalliance-lib.min.js'),
        use:
          'exports-loader?type=commonjs&exports[]=single|dallianceLib',
      },
      // {
      //   test: require.resolve('./js/lib/jDataView.js'),
      //   use:
      //     'exports-loader?type=commonjs&exports[]=single|jDataView',
      // },
      // {
      //   test: require.resolve('./js/lib/jParser.js'),
      //   use:
      //     'exports-loader?type=commonjs&exports[]=single|jParser',
      // },
      // {
      //   test: require.resolve('./js/lib/BWReader.js'),
      //   use:
      //     'exports-loader?type=commonjs&exports[]=single|BWReader',
      // },
      // {
      //   test: require.resolve('./js/lib/VCFReader.js'),
      //   use:
      //     'exports-loader?type=commonjs&exports[]=single|VCFReader',
      // },
    ],

  },
  plugins : [
    // new webpack.ProvidePlugin({
    //   $      : __dirname + '/js/lib/jquery.js',
    //   jQuery : __dirname + '/js/lib/jquery.js'
    // }),
    // new webpack.DefinePlugin({
    //   define: undefined // Stop jquery-ui.js trying to do define(["jquery"]), which doesn't work if jquery isn't in node_modules
    // }),
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
