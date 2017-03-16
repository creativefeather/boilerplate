'use strict'
const path = require('path'),
      express = require('express');

let app = express();

app.set('port', process.env.PORT || 3000);

/**
 * View Engine
 */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

/**
 * Routes
 */
app.use(express.static(path.join(__dirname, './out')));

app.get('/', function(req, res, next) {
  res.render(path.join(__dirname, './views/layout'));
});

/**
 * Listen
 */
app.listen(app.get('port'), function() {
  console.log('listening on port ' + app.get('port'));
});