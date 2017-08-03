var webpack = require("webpack");

module.exports = {
  entry   : __dirname + "/index.js",
  output  : { filename: "js/genoverse.min.js" },
  plugins : [
    new webpack.ProvidePlugin({
      $      : "jquery",
      jQuery : "jquery"
    }),
    new webpack.optimize.UglifyJsPlugin({
      comments: false
    })
  ]
};
