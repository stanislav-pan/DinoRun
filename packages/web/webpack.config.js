const { merge } = require("webpack-merge");

const commonConfig = require("./webpack/common.config.js");
const clientConfig = require("./webpack/client.config.js");
const serverConfig = require("./webpack/ssr.config.js");

module.exports = () => {
  switch (process.env.TARGET) {
    case "ssr":
      return [
        merge(commonConfig, clientConfig),
        merge(commonConfig, serverConfig),
      ];
    default:
      return merge(commonConfig, serverConfig);
  }
};
