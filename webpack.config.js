const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const isProd = process.argv.includes('production');

module.exports = [{
  entry: {
    "quill.htmlEditButton": "./src/quill.htmlEditButton.js",
    demo: "./src/demo.js",
  },
  output: {
    filename: "[name].min.js",
    path: path.resolve(__dirname, "dist"),
    libraryTarget: "umd",
    publicPath: "/dist/"
  },
  devServer: {
    contentBase: './src'
  },
  externals: {
    quill: "Quill",
  },
  devtool: isProd ? 'source-map' : "inline-source-map",
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
  module: {
    rules: [{
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        use: [{
          loader: "css-loader",
        }, ],
      }),
    },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
  plugins: [new ExtractTextPlugin("quill.htmlEditButton.min.css")],
}, ];
