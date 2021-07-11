const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const WorkboxPlugin = require("workbox-webpack-plugin");
const LoadablePlugin = require("@loadable/webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");

const { fileLoaders } = require("./loaders/file");
const { cssLoaders } = require("./loaders/css");
const { ejsLoaders } = require("./loaders/ejs");

const { USE_HMR, filename } = require("./consts");

module.exports = {
  entry: [
    ...(USE_HMR
      ? ["react-hot-loader/patch", "webpack-hot-middleware/client"]
      : []),
    "./src/client/client.tsx",
  ],
  output: {
    path: path.resolve(__dirname, "../dist/client"),
    filename: `${filename}.js`,
    publicPath: "/client/",
  },
  module: {
    rules: [...fileLoaders.client, ...cssLoaders.client, ...ejsLoaders.client],
  },
  plugins: [
    new webpack.ProvidePlugin({
      _: "underscore",
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "src/common/views/index.ejs",
      templateParameters: {
        isClientTempate: true,
        reactApp: "",
      },
    }),
    new CopyPlugin({
      patterns: [{ from: "static", to: "" }],
    }),
    new WorkboxPlugin.InjectManifest({
      swSrc: path.resolve(__dirname, "../src/client/sw.ts"),
      swDest: "service-worker.js",
    }),
    new LoadablePlugin(),
    ...(USE_HMR ? [new webpack.HotModuleReplacementPlugin()] : []),
  ],
};
