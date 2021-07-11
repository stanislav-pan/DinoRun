const { NODE_ENV, TARGET } = process.env;

const DEV_MODE = NODE_ENV === "development";
const IS_SSR = TARGET === "ssr";
const USE_HMR = DEV_MODE && !IS_SSR;

const filename = DEV_MODE ? "[name]" : "[name].[contenthash]";

module.exports = {
  DEV_MODE,
  USE_HMR,
  TARGET,
  IS_SSR,
  NODE_ENV,
  filename,
};
