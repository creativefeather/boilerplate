import path from 'path';

import express from 'express';

let app = express();

app.use(app.static(path.join(__dirname, '/.public'), {
  cacheControl: false
}))

module.exports = app;