import http from 'http';
//import 'babel-register';  // Use the require hook to compile js on the fly
import app from './app';

let server = http.createServer(app);

server.listen(3000, 'localhost', function() {
  console.log(`Express [${app.get('env')}] listening on ${server.address().address}:${server.address().port}`);
})

server.on('error', function(err) {
  console.error(err);
});