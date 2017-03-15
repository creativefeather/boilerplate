'use strict'
const express = require('express');
let app = express();
let router = require('../index').router;

app.set('port', process.env.PORT || 3000);

app.use('/', router);

app.listen(app.get('port'), function() {
  console.log('listening on port ' + app.get('port'));
});