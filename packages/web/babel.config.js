module.exports = (api) => {
  api.cache(false);

  const presets = [
    "@babel/preset-typescript",
    "@babel/preset-react",
    ["@babel/preset-env", { targets: { node: "current" } }],
  ];

  const plugins = [
    "react-hot-loader/babel",
    "@babel/plugin-proposal-class-properties",
    "@loadable/babel-plugin",
  ];

  return { presets, plugins };
};
