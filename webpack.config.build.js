const path = require("path");

const { merge } = require("webpack-merge");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

const config = require("./webpack.config");

module.exports = merge(config, {
  mode: "production",
  output: {
    path: path.join(__dirname, "public"),
    filename: '[name].[contenthash].bundle.js'
  },
  optimization: {	
    minimize:true,
		minimizer: [new TerserPlugin({}), new CssMinimizerPlugin({})] ,
	},
  plugins: [new CleanWebpackPlugin()],
});
