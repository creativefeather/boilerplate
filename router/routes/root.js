var express = require('express');
var router = express.Router();
const path = require('path');

router.get('/', function (req, res) {
  res.render ('home', { title: 'Express Starter', message: 'Running. . .'});
});

module.exports = router;