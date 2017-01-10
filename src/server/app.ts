var express = require('express'),
    app = express();

app.all(function(req, res, next) {
  res.end('You successfully requested page.');
});

app.listen(3000, function() {
  console.log('Example app listening on port 3000!');
});