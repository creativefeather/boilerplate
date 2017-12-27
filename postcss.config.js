const path = require('path');

module.exports = {
  plugins: [
    require('postcss-easy-import')({
      path: path.join(__dirname, './src/client/css'),
      prefix: '_',
      extensions: ['.css', '.styl']
    }),
    require('postcss-cssnext')(),
    require('postcss-browser-reporter')(),
    require('postcss-reporter')()
  ]
}