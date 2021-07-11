module.exports.ejsLoaders = {
  client: [
    {
      test: /\.ejs$/,
      loader: "ejs-loader",
      options: {
        esModule: false,
      },
    },
  ],
};
