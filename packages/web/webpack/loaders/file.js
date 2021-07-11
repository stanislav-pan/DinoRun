const test = /\.(gif|png|jpe?g|svg)$/i;

module.exports.fileLoaders = {
  client: [
    {
      test,
      use: ["file-loader"],
    },
  ],

  server: [
    {
      test,
      use: ["null-loader"],
    },
  ],
};
