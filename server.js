var express = require('express');
var app = express();

// View Engine
app.set('view engine', 'pug');

// Routes
var router = require('./router');
router(app);

// Listen
app.listen(3000, function () {
  console.log('listening on port 3000!');
});