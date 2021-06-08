const path = require("path");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

const { DefinePlugin } = require("webpack");
const { extendDefaultPlugins } = require("svgo");


const sharedPath = path.join(__dirname, "shared");
const appPath = path.join(__dirname, "app");
const stylesPath = path.join(__dirname, "styles");
const nodePath = "node_modules";
const IS_DEVELOPMENT = process.env.NODE_ENV === "dev";
module.exports = {
  entry: [path.join(appPath, "index.js"), path.join(stylesPath, "index.scss")],
  resolve: {
    modules: [appPath, sharedPath, stylesPath, nodePath],
  },
  plugins: [
    new DefinePlugin({
      IS_DEVELOPMENT,
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "./shared",
          to: "",
        },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css",
    }),
    // new ImageMinimizerPlugin({
    //   minimizerOptions: {
    //     // Lossless optimization with custom option
    //     // Feel free to experiment with options for better result for you
    //     plugins: [
    //       ["gifsicle", { interlaced: true }],
    //       ["jpegtran", { progressive: true }],
    //       ["optipng", { optimizationLevel: 5 }],
    //       [
    //         "svgo",
    //         {
    //           plugins: [
    //             {
    //               removeViewBox: false,
    //             },
    //           ],
    //         },
    //       ],
    //     ],
    //   },
    // }),
    new ImageMinimizerPlugin({
      minimizerOptions: {
        // Lossless optimization with custom option
        // Feel free to experiment with options for better result for you
        plugins: [
          ["gifsicle", { interlaced: true }],
          ["jpegtran", { progressive: true }],
          ["optipng", { optimizationLevel: 5 }],
          // Svgo configuration here https://github.com/svg/svgo#configuration
          [
            "svgo",
            {
              plugins: extendDefaultPlugins([
                {
                  name: "removeViewBox",
                  active: false,
                },
                {
                  name: "addAttributesToSVGElement",
                  params: {
                    attributes: [{ xmlns: "http://www.w3.org/2000/svg" }],
                  },
                },
              ]),
            },
          ],
        ],
      },
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: "",
            },
          },
          {
            // css module
            loader: "css-loader",
          },
          {
            // auto prefix css
            loader: "postcss-loader",
          },
          {
            loader: "sass-loader",
          },
        ],
      },
      {
        test: /\.(jpe?g|png|gif|svg|webp)$/,
        loader: "file-loader",
        options: {
          name: "[hash].[ext]",
          outputPath: "images",
        },
      },
      {
        test: /\.(woff2?|fnt)$/,
        loader: "file-loader",
        options: {
          name: "[name].[ext]",
          outputPath: "fonts",
        },
      },
      {
        test: /\.(jpe?g|png|gif|svg|webp)$/i,
        // use: [
        //   {
        //     loader: ImageMinimizerPlugin.loader,
        //     options: {
        //       severityError: "warning", // Ignore errors on corrupted images
        //       minimizerOptions: {
        //         plugins: ["gifsicle", "jpegtran", "optipng", "svgo"],
        //       },
        //     },
        //   },
        // ],
        type:"asset"
      },
      {
        test: /\.(glsl|frag|vert)$/,
        loader: "raw-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(glsl|frag|vert)$/,
        loader: "glslify-loader",
        exclude: /node_modules/,
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
  performance: {
    maxEntrypointSize: 400000,
    maxAssetSize: 100000,
 }
};
