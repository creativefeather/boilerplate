const express = require('express');

module.exports = function(app) {
  // With express we can serve static files such as images, css, and javascript
  // using the express.static built-in middleware function.
  app.use('/static', 
    express.static('public'),
    function (req, res, next) {
      console.log('Staic resource ' + req.url + ' requested');
      next()
  });
  app.use('/', require('./routes/root'));
}