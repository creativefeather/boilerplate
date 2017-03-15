'use strict'
const router = require('./src/router');
let timestamp = require('./src/timestamp');

timestamp.router = router;

module.exports = timestamp;