const path = require("path");

const config = require("./webpack.config");

const { merge } = require("webpack-merge");

module.exports = merge(config, {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    writeToDisk: true,
  },
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "[name].bundle.js",
  },
});
