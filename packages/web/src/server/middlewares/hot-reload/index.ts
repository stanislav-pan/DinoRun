import { RequestHandler } from "express";
import webpack from "webpack";
import devMiddleware from "webpack-dev-middleware";
import hotMiddleware from "webpack-hot-middleware";
import merge from "webpack-merge";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import clientWebpackConfig from "@webpack/client.config";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import commonWebpackConfig from "@webpack/common.config";

const webpackConfig = merge(clientWebpackConfig, commonWebpackConfig);

const compiler = webpack({ ...webpackConfig, mode: "development" });

export const getHotReloadMiddleware = (): RequestHandler[] => {
  return [
    devMiddleware(compiler, {
      writeToDisk: true,
    }),
    hotMiddleware(compiler, {
      path: "/__webpack_hmr",
      log: false,
    }),
  ];
};
