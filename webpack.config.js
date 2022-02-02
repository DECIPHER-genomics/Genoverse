const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin           = require('terser-webpack-plugin');
const webpack                = require('webpack');

const cssRule = {
  test : /\.css$/i,
  use  : [
    {
      loader  : 'style-loader',
      options : {
        insert: 'body',
      },
    },
    'css-loader',
  ],
};

const config = {
  mode   : 'production',
  name   : 'genoverse',
  entry  : `${__dirname}/index.js`,
  target : 'web',
  output : {
    filename   : 'genoverse.min.js',
    path       : `${__dirname}/dist`,
    publicPath : '/dist/',
  },
  devtool : 'source-map',
  plugins : [
    new webpack.ProvidePlugin({
      $      : 'jquery',
      jQuery : 'jquery',
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
    maxEntrypointSize : 500000,
    maxAssetSize      : 500000,
  },
  resolve: {
    alias: {
      'js'  : `${__dirname}/js`,
      'css' : `${__dirname}/css`,
    },
  },
  module: {
    rules: [ cssRule ],
  },
};

module.exports = [
  {
    ...config,
    devServer: {
      static: {
        directory: __dirname,
      },
      client: {
        overlay: {
          errors   : true,
          warnings : false,
        },
      },
    },
  },
  {
    ...config,
    name   : 'genoverse.es5',
    target : [ 'web', 'es5' ],
    output : {
      filename   : 'genoverse.min.js',
      path       : `${__dirname}/dist/es5`,
      publicPath : '/dist/es5/',
    },
    module: {
      rules: [
        cssRule,
        {
          test    : /\.js$/,
          exclude : [ /node_modules/, /\/js\/lib/ ],
          use     : {
            loader  : 'babel-loader',
            options : {
              presets: [
                [
                  '@babel/preset-env',
                  {
                    useBuiltIns : 'entry',
                    corejs      : 3,
                  },
                ],
              ],
            },
          },
        },
      ],
    },
  },
].map(
  (conf, i) => ({
    ...conf,
    plugins: conf.plugins.concat(i ? [] : new CleanWebpackPlugin()),
  })
);
