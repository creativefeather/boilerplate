const path = require('path');

let outPath = '../../out/public/js';

module.exports = {
  entry: {
    blog: path.join(__dirname, './components/blog.jsx')
  },

  output: {
    path: path.join(__dirname, outPath),
    filename: '[name].bundle.js'
  },

  module: {
    rules: [
      { 
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: 'babel-loader' 
      }
    ]
  }
}