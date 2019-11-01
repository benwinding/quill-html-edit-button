const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = [
  {
    entry: {
      "quill.htmlEditButton": "./src/quill.htmlEditButton.js",
      demo: "./src/demo.js"
    },
    output: {
      filename: "[name].min.js",
      path: path.resolve(__dirname, "dist"),
      publicPath: "/dist/",
    },
    devServer: {
      contentBase: './src',
    },
    externals: {
      quill: "Quill"
    },
    devtool: 'eval',
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ExtractTextPlugin.extract({
            use: [
              {
                loader: "css-loader",
                options: {
                  minimize: true
                }
              }
            ]
          })
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        }
      ]
    }
  }
];
