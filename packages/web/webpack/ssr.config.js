const path = require("path");
const nodeExternals = require("webpack-node-externals");
const WebpackShellPluginNext = require("webpack-shell-plugin-next");
const webpack = require("webpack");
const CopyPlugin = require("copy-webpack-plugin");

const { fileLoaders } = require("./loaders/file");
const { cssLoaders } = require("./loaders/css");

const { IS_SSR } = require("./consts");

module.exports = {
  entry: ["./src/server/server.ts"],
  target: "node",
  externals: [nodeExternals()],
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: `server.js`,
    publicPath: "/client/",
    libraryTarget: "commonjs2",
    globalObject: "this",
  },
  module: {
    rules: [...fileLoaders.server, ...cssLoaders.server],
  },
  plugins: [
    ...(process.env.STAGE !== "build"
      ? [
          new WebpackShellPluginNext({
            onBuildEnd: {
              scripts: [
                IS_SSR
                  ? "nodemon --delay 2.5 dist/server.js"
                  : "node dist/server.js",
              ],
              blocking: false,
              parallel: true,
            },
          }),
        ]
      : []),
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1,
    }),
    new CopyPlugin({
      patterns: [
        { from: "src/common/views", to: "views" },
        {
          from: "src/common/views/favicon.ico",
          to: "",
        },
      ],
    }),
  ],
  optimization: {
    runtimeChunk: false,
    splitChunks: false,
  },
};
