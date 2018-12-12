module.exports = {
  presets: ["@babel/env"],
  plugins: [
    [
      "@babel/plugin-transform-destructuring",
      {
        loose: true
      }
    ]
  ]
};
