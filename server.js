var express = require('express'),
    exphbs = require('express-handlebars');

var app = express();

// View Engine
var hbs = exphbs.create({ 
  extname: '.hbs',
  defaultLayout: 'main'
});
app.engine('.hbs', hbs.engine); // register hbs engine
app.set('view engine', '.hbs');
// Note: Setting the app's "view engine" setting will make that value the default file extension used for looking up views.


// Routes
var router = require('./router');
router(app);

// Listen
app.listen(3000, function () {
  console.log('listening on port 3000!');
});