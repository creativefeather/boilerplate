/**
 * @file app.js
 * @author creativefeather
 * 
 * @fileOverview app.js creates the app and setsup the view engine
 * and routes. 
 */

var fs      = require('fs'),
    express = require('express'),
    exphbs  = require('express-handlebars');

var app = express();

//
// *** Views ***
//
// Handlebars
// -- View Engine
// -- @link https://github.com/ericf/express-handlebars
var hbs = exphbs.create({
  compilerOptions: {}, 
  defaultLayout: '_layout',
  extname: '.hbs',
  helpers: {},
  layoutsDir: './src/server/views/layouts',
  partialsDir: './src/server/views/partials'
});
app.engine('.hbs', hbs.engine); // register hbs engine
app.set('views', './src/server/views');
app.set('view engine', '.hbs');
// Note: Setting the app's "view engine" setting will make that value
// the default file extension used for looking up views.

//
// *** Routes ***
//
// @link http://expressjs.com/en/4x/api.html#router
// @link http://expressjs.com/en/guide/routing.html

// Serve static resources from ./src/client
app.use('/static', express.static('src/client'));

// Add controllers
var controllers = fs.readdirSync('./src/server/controllers');
controllers.forEach(function(name) {
    require('./controllers/' + name)(app);
});

// 404 Response
app.all('*', function(req, res, next) {
  res.sendStatus(404);
});

//
// *** Start Server ***
//
app.listen(3000, function() {
  console.log('Example app listening on port 3000!');
});