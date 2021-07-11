const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const testModuleCss = /module\.css$/i;
const testCss = /\.css$/i;

module.exports.cssLoaders = {
  client: [
    {
      test: testModuleCss,
      include: /src/,
      use: [
        MiniCssExtractPlugin.loader,
        {
          loader: "css-loader",
          options: {
            modules: {
              localIdentName: "[name]__[local]--[hash:base64:5]",
              localIdentContext: path.resolve(__dirname, "src"),
            },
            sourceMap: true,
          },
        },
        { loader: "postcss-loader", options: { sourceMap: false } },
      ],
    },
    {
      test: testCss,
      include: /src/,
      exclude: /module\.css$/,
      use: [
        MiniCssExtractPlugin.loader,
        {
          loader: "css-loader",
          options: {
            sourceMap: true,
          },
        },
        { loader: "postcss-loader", options: { sourceMap: false } },
      ],
    },
  ],

  server: [
    {
      test: testModuleCss,
      include: /src/,
      use: [
        MiniCssExtractPlugin.loader,
        {
          loader: "css-loader",
          options: {
            modules: {
              localIdentName: "[name]__[local]--[hash:base64:5]",
              localIdentContext: path.resolve(__dirname, "src"),
            },
            sourceMap: false,
          },
        },
        { loader: "postcss-loader", options: { sourceMap: false } },
      ],
    },
  ],
};
