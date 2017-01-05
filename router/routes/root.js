var express = require('express');
var router = express.Router();
const path = require('path');

router.get('/', function (req, res) {
  res.render ('index', { title: 'Code Dreaming Ninja', message: 'Hello code dreaming ninja!'});
});

module.exports = router;