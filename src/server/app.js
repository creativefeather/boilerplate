const assert = require('assert'),
      path = require('path'),

      bodyParser = require('body-parser'),
      config = require('@creativefeather/config'),
      engines = require('consolidate'),
      express = require('express');

let app = module.exports = express();

// *** Initialize Db ***
MongoClient = require('mongodb').MongoClient;

let uri = `mongodb://${config.db.host}:${config.db.port}/${config.db.database}`;

// Initialize connection once
MongoClient.connect(uri, function(err, database) {
  assert.equal(null, err);

  console.log("Successfully connected to server");

  app.locals.db = database;
});

// *** View Engine Setup ***
app.engine('html', engines.nunjucks);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, './views'));

// *** Middleware ***
app.use(bodyParser.urlencoded({
  extended: false
}));

// *** Routes ***
app.use('/static', express.static(path.join(__dirname, '../public')));
app.use('/api', require('./api'));

app.get('/', function(req, res, next) {
  res.render('index');
});

// *** Not Found ***
app.use(function(req, res) {
  res.sendStatus(404);
});