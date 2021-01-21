const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");

const isProd = process.argv.includes("production");

module.exports = [
  {
    entry: {
      "quill.htmlEditButton": "./src/quill.htmlEditButton.ts",
      demo_js: "./src/demos/javascript/demo.js",
      demo_ts: "./src/demos/typescript/demo.ts",
    },
    output: {
      filename: "[name].min.js",
      path: path.resolve(__dirname, "dist"),
      libraryTarget: "umd",
      publicPath: "/dist/",
    },
    devServer: {
      contentBase: "./src",
    },
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
  },
];
