module.exports = {
  extends: ["stylelint-config-standard", "stylelint-prettier/recommended"],
  plugins: ["stylelint-prettier"],
  ignoreFiles: ["*.svg"],
  rules: {
    "prettier/prettier": true,
    "at-rule-no-unknown": [
      true,
      {
        ignoreAtRules: ["tailwind", "screen", "layer"],
      },
    ],
  },
};
