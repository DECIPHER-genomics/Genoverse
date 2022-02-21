const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin           = require('terser-webpack-plugin');
const { dependencies }       = require('./package.json');

const coreJsVersion = dependencies['core-js'].replace('^', '');

// Customise a build with (for example):
//   yarn webpack  --env exclude.fontawesome --env include.polyfills
module.exports = (env) => {
  const includes = {
    polyfills   : !env.modern,
    fontawesome : true,
    css         : true,
    ...Object.keys(env.exclude || {}).reduce((acc, exclude) => Object.assign(acc, { [exclude]: false }), {}),
    ...env.include,
  };

  if (env.all) {
    Object.keys(includes).forEach((key) => { includes[key] = true; });
  }

  return {
    mode   : 'production',
    name   : 'genoverse',
    target : env.modern ? 'web' : [ 'web', 'es5' ],
    entry  : [
      includes.polyfills   ? `${__dirname}/src/js/lib/polyfills`    : false,
      includes.fontawesome ? `${__dirname}/src/css/fontawesome.css` : false,
      includes.css         ? `${__dirname}/src/css/genoverse.css`   : false,
      `${__dirname}/src/js/Genoverse`,
    ].filter(Boolean),
    output: {
      filename   : 'genoverse.js',
      path       : `${__dirname}/dist`,
      publicPath : './dist/',
    },
    devtool : 'source-map',
    plugins : [
      new CleanWebpackPlugin(),
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
          test : /\.css$/i,
          use  : [
            {
              loader  : 'style-loader',
              options : {
                insert: 'body',
              },
            },
            {
              loader  : 'css-loader',
              options : {
                url: {
                  filter: url => !/assets/.test(url),
                },
              },
            },
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
