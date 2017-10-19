const path = require('path');

let env = { prod: false };

module.exports = {
  entry: {
    reactApp: path.resolve(__dirname, '../src/client/app.js')
  },

  output: {
    path: path.resolve(__dirname, '../src/public/bundle'),
    filename: 'bundle.js'
  },

  devtool: env.prod ? 'source-map' : 'eval',

  module: {
    rules: [
      { // JS
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            "presets": [
              "react",
              "env"
            ],
            "plugins": [
              ["transform-class-properties", { "spec": true }]
            ]
          }
        }
      },

      { // JSON
        test: /\.json$/,
        exclude: /(node_modules)/,
        loader: 'json-loader'
      },

      { // CSS
        test: /\.css$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader",
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: "[name]__[local]___[hash:base64:5]"
            }
          },
          {
            loader: "postcss-loader",
            options: {
              config: { path: path.join(__dirname, './postcss.config.js')}
            }
          }
        ]
      }
    ]
  }
};