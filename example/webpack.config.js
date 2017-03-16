const path = require('path'),
      bptcp = require('babel-plugin-transform-class-properties');

let outPath = './out/js';

module.exports = {
  entry: {
    mdPreviewer: path.join(__dirname, '../index.js')
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
        loader: 'babel-loader',
        query: {
          // http://stackoverflow.com/questions/34574403/how-to-set-resolve-for-babel-loader-presets
          presets: [
            'babel-preset-react', 
            'babel-preset-es2015'
          ].map(require.resolve),
          plugins: ['babel-plugin-transform-class-properties'].map(require.resolve)
        }
      }
    ]
  },

  resolve: {
    modules: [
      path.join(__dirname, 'node_modules')
    ]
  }
}