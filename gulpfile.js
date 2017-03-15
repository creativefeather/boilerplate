var gulp = require('gulp'),
    stylus = require('gulp-stylus'),
    plumber = require('gulp-plumber'),
    browserSync = require("browser-sync"),
    nodemon = require('gulp-nodemon'),
    reload = browserSync.reload;

// we'd need a slight delay to reload browsers
// connected to browser-sync after restarting nodemon
var BROWSER_SYNC_RELOAD_DELAY = 0;

// HTML task
gulp.task('html', function() {
  gulp.src('./views/**/*.html')
  .pipe(reload({ stream: true }));
});

// Stylus task
gulp.task('stylus', function() {
  return gulp.src('./public/css/style.styl')
    .pipe(plumber())
    .pipe(stylus())
    .pipe(gulp.dest('./public/css'))
    .pipe(reload({ stream: true }));
});


// Client javascript task
gulp.task('script', function() {
  gulp.src('./public/js/**/*.js')
    .pipe(reload({ stream: true }));
});

// Nodemon task
gulp.task('nodemon', function (cb) {
  var called = false;
  return nodemon({

    // nodemon our expressjs server
    script: 'server.js',

    // watch core server file(s) that require server restart on change
    watch: ['server.js', 'router']
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


// Browser-Sync task
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


// Watch task
gulp.task('watch', function() {
  gulp.watch('./views/**/*.html', ['html']);
  gulp.watch('./views/**/*.hbs', ['hbs']);
  gulp.watch('./public/css/**/*.styl', ['stylus']);
  gulp.watch('./public/js/**/*.js', ['script']);
});


// Defalut task
gulp.task('default', ['stylus', 'script', 'browser-sync', 'watch']);