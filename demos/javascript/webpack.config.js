const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const isProd = process.argv.includes("production");

/**
 * @type {import('webpack').Configuration}
 */
module.exports = {
  entry: {
    index: "./src/index.js",
  },
  output: {
    filename: "[name].min.js",
    libraryTarget: "umd",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/dist",
  },
  devServer: {
    port: 8001,
    static: {
      directory: path.resolve(__dirname, "dist"),
    },
    devMiddleware: {
      writeToDisk: true,
    },
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: "public", to: "." },
        { from: "../header-text.js", to: "." },
      ],
    }),
  ],
  devtool: isProd ? "source-map" : "inline-source-map",
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        extractComments: true,
        parallel: true,
        terserOptions: {
          compress: {
            drop_console: false,
          },
        },
      }),
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  module: {
    rules: [
      { test: /\.ts$/, use: ["ts-loader"], exclude: /node_modules/ },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: "html-loader",
            options: {
              minimize: true,
            },
          },
        ],
      },
    ],
  },
};
