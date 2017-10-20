const path = require('path');

module.exports = {
  plugins: {
    "postcss-easy-import": {
      path: path.join(__dirname, '../src/client/css'),
      prefix: "_",
      extensions: ".css"
    },
    "postcss-cssnext": {}
  }
}