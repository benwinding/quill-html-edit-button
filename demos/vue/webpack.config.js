const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const WriteFilePlugin = require('write-file-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');

const isProd = process.argv.includes("production");

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
  },
  plugins: [
    new WriteFilePlugin(),
    new CopyWebpackPlugin([
      { from: 'public', to: '.' },
    ]),
    new VueLoaderPlugin(),
  ],
  devtool: isProd ? "source-map" : "inline-source-map",
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        extractComments: true,
        cache: true,
        parallel: true,
        sourceMap: true, // Must be set to true if using source-maps in production
        terserOptions: {
          // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
          extractComments: "all",
          compress: {
            drop_console: false,
          },
        },
      }),
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
    alias: {
      vue: "vue/dist/vue.esm-bundler.js",
    },
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
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
    ],
  },
};