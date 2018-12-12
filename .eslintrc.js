const pkg = require("./package.json");
const path = require("path");
const here = path.resolve(__dirname);

module.exports = {
  parser: "babel-eslint",
  extends: [
    "eslint:recommended",
    "plugin:import/recommended",
    "plugin:prettier/recommended",
    "plugin:jest/recommended"
  ],
  overrides: [
    {
      files: ["docs_src/**/*.js"],
      globals: {
        privacyConvertEn: true,
        privacyConvertJa: true
      }
    }
  ],
  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module",
    ecmaFeatures: {
      experimentalObjectRestSpread: true
    }
  },
  env: {
    browser: true,
    mocha: true,
    node: true,
    es6: true,
    "jest/globals": true
  },
  rules: {
    "no-console": "off",
    "no-unused-vars": "warn",
    "valid-jsdoc": "warn",
    "no-irregular-whitespace": ["error", { skipRegExps: true }]
  },
  plugins: ["import", "jest"]
};
