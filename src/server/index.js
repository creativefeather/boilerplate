const http = require('http'),
path = require('path'),

config = require('@creativefeather/config');

let app = require('./app');
let server = http.createServer(app);

server.listen(config.port, function() {
console.log(`listening on ${server.address().address}:${server.address().port}`);
});