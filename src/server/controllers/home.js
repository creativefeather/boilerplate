var MongoClient = require('mongodb').MongoClient,
    assert      = require('assert');

module.exports = function(app) {
  app.get(/^\/$|^\/home$/, function (req, res, next) {
    res.render('home');
  }); // End action
} // End exports