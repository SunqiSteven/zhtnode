var webpack = require("webpack");
module.exports = {
  entry:  __dirname + "/app/main.js",
  output: {
    path: __dirname + "/public",
    filename: "bundle.js"
  },
   plugins: [
    new webpack.optimize.UglifyJsPlugin()//在这个数组中new一个就可以了
  ],
};