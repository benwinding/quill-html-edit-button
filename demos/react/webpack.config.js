const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const isProd = process.argv.includes("production");

module.exports = {
  entry: {
    index: "./src/index.jsx",
  },
  output: {
    filename: "[name].min.js",
    libraryTarget: "umd",
    path: path.resolve(__dirname, "dist"),
  },
  devServer: {
    port: 8001,
    hot: true,
    devMiddleware: {
      writeToDisk: true,
    },
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: "public", to: "." },
      { from: "../header-text.js", to: "." },
    ]),
  ],
  devtool: isProd ? "source-map" : "inline-source-map",
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        extractComments: true,
        parallel: true,
      }),
    ],
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts"],
  },
  module: {
    rules: [
      { test: /\.ts$/, use: ["ts-loader"], exclude: /node_modules/ },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.jsx$/,
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
