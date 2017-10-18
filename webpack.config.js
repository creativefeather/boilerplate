const path = require('path');

let env = { prod: false };

module.exports = {
  entry: {
    reactApp: './src/client/app.js'
  },
  output: {
    path: path.resolve(__dirname, './src/public/bundle'),
    filename: 'bundle.js'
  },
  devtool: env.prod ? 'source-map' : 'eval',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: "babel-loader"
      },
      {
        test: /\.json$/,
        exclude: /(node_modules)/,
        loader: 'json-loader'
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]' 
      }
    ]
  }
};