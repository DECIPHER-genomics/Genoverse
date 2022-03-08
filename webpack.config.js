const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin   = require('mini-css-extract-plugin');
const TerserPlugin           = require('terser-webpack-plugin');
const { dependencies }       = require('./package.json');

const coreJsVersion = dependencies['core-js'].replace('^', '');

// Customise a build with (for example):
//   yarn webpack  --env no-polyfills
//   yarn webpack  --env modern
//   yarn webpack  --env public-path=/public/path/to/genoverse
module.exports = (env) => {
  const noPolyfills = env.modern || env['no-polyfills'];

  return {
    mode   : 'production',
    name   : 'genoverse',
    target : env.modern ? 'web' : [ 'web', 'es5' ],
    entry  : [
      noPolyfills ? false : `${__dirname}/src/js/lib/polyfills`,
      `${__dirname}/src/js/Genoverse`,
    ].filter(Boolean),
    output: {
      filename : 'genoverse.js',
      path     : `${__dirname}/dist`,
      ...(env['public-path'] ? { publicPath: env['public-path'] } : {}),
    },
    devtool : 'source-map',
    plugins : [
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin(),
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
    module: {
      rules: [
        {
          test : /\.png/,
          type : 'asset/resource',
        },
        {
          test : /\.css$/i,
          use  : [
            MiniCssExtractPlugin.loader,
            'css-loader',
          ],
        },
        env.modern
          ? false
          : {
            test    : /\.js$/,
            exclude : [ /node_modules/, /jquery-plugins/ ],
            use     : {
              loader  : 'babel-loader',
              options : {
                presets: [
                  [
                    '@babel/preset-env',
                    {
                      useBuiltIns        : 'entry',
                      corejs             : coreJsVersion,
                      forceAllTransforms : true,
                      targets            : { ie: 11 },
                      exclude            : [
                        // The existence of following polyfills result a big performance hit in IE11, so are excluded.
                        'es.array.splice',
                        'es.array.concat',
                        'es.array.filter',
                      ],
                    },
                  ],
                ],
              },
            },
          },
      ].filter(Boolean),
    },
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
  };
};
