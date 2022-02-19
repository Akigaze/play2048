const path = require("path");

const config = {
  entry: path.resolve(__dirname, "src", "index.ts"),
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  resolve: {
    extensions: [".ts", ".js", ".json"],
  },
  module: {
    rules: [
      { test: /\.(ts|js)$/, loader: "babel-loader", exclude: /(node_modules)/ },
    ],
  },
};

module.exports = config;
