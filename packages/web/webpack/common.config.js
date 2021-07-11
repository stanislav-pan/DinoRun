const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const webpack = require("webpack");

const { NODE_ENV, IS_SSR, DEV_MODE, USE_HMR, filename } = require("./consts");

module.exports = {
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        include: /src/,
        use: [
          {
            loader: "babel-loader",
          },
          {
            loader: "ts-loader",
            options: {
              configFile: DEV_MODE ? "tsconfig.json" : "tsconfig.prod.json",
            },
          },
        ],
      },
    ],
  },
  optimization: {
    minimize: !DEV_MODE,
    runtimeChunk: "single",
    minimizer: [`...`, new CssMinimizerPlugin()],
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all",
          filename: `${filename}.js`,
        },
      },
    },
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: `${filename}.css`,
    }),
    new webpack.DefinePlugin({
      USE_HMR,
      IS_SSR,
      NODE_ENV: JSON.stringify(NODE_ENV),
    }),
  ],
  resolve: {
    alias: {
      "@icons": path.resolve(__dirname, "../src/client/components/ui/icons"),
      "@hooks": path.resolve(__dirname, "../src/client/hooks"),
      "@api": path.resolve(__dirname, "../src/client/core/api"),
      "@redux": path.resolve(__dirname, "../src/client/redux"),
      "@core": path.resolve(__dirname, "../src/client/core"),
      "@components": path.resolve(__dirname, "../src/client/components"),
      "@pages": path.resolve(__dirname, "../src/client/pages"),
      "@utils": path.resolve(__dirname, "../src/client/utils"),
      "@client": path.resolve(__dirname, "../src/client"),
      "@webpack": path.resolve(__dirname),
      "react-dom": "@hot-loader/react-dom",
    },
    extensions: [".ts", ".tsx", ".js", ".css"],
    modules: ["node_modules"],
  },
  devtool: "source-map",
};
