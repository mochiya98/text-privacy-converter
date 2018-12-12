module.exports = {
  testMatch: ["**/__tests__/**/*.?(m)js?(x)", "**/?(*.)(spec|test).?(m)js?(x)"],
  transform: {
    "^.+\\.mjs$": "babel-jest"
  },
  moduleFileExtensions: ["js", "json", "mjs", "node"]
};
