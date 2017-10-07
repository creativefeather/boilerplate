const path = require('path');

module.exports = {
  entry: {
    reactApp: './src/client/app.js'
  },
  output: {
    path: path.resolve(__dirname, './src/public/bundle'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
    ]
  }
};