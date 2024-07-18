const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");

const isProd = process.argv.includes("production");

/**
 * @type {import('webpack').Configuration}
 */
module.exports = [
  {
    entry: {
      "quill.htmlEditButton": "./src/quill.htmlEditButton.ts",
    },
    output: {
      filename: "[name].min.js",
      path: path.resolve(__dirname, "dist"),
      libraryTarget: "umd",
      publicPath: "/dist/",
    },
    devServer: {
      port: 8001,
      hot: true,
      static: {
        directory: path.join(__dirname, 'src'),
        serveIndex: true,
      },
      devMiddleware: {
        writeToDisk: true,
      },
    },
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
