var browserSync = require('browser-sync'),
    nodemon     = require('gulp-nodemon'),
    reload      = browserSync.reload;

var BROWSER_SYNC_RELOAD_DELAY = 3300;

module.exports = function(gulp) {

// Nodemon task
gulp.task('nodemon', function (cb) {
  var called = false;
  return nodemon({
    
    // nodemon our expressjs server
    script: './src/server/app.js',

    // watch core server file(s) that require server restart on change
    watch: [
      'src/server/**/*.js'
    ]
  })
    .on('start', function onStart() {
      // ensure start only got called once
      if (!called) { cb(); }
      called = true;
    })
    .on('restart', function onRestart() {
      // reload connected browsers after a slight delay
      setTimeout(function reload() {
        browserSync.reload({
          stream: false
        });
      }, BROWSER_SYNC_RELOAD_DELAY);
    });
});

/**
 * @task Browser-Sync task
 * @todo Remove hard-coded proxy port.  Can Process.ENV be used in Gulp?
 */
gulp.task('browser-sync', ['nodemon'], function() {
  // for more browser-sync config options: http://www.browsersync.io/docs/options/
  browserSync({
    // server: { baseDir: "./app" }
   
    // informs browser-sync to proxy our expressjs app which would run at the following location
    proxy: 'http://localhost:3000',

    // informs browser-sync to use the following port for the proxied app
    // notice that the default port is 3000, which would clash with our expressjs
    port: 4000,

    // open the proxied app in chrome
    browser: ['chrome']
    
  });
});

} // End module.exports

module.exports.reload = reload;