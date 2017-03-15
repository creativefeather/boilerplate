const path = require('path');

var gulp = require('gulp'),
    stylus = require('gulp-stylus'),
    sourcemaps = require('gulp-sourcemaps'),
    plumber = require('gulp-plumber'),
    gulpWebpack = require('gulp-webpack'),
    webpack = require('webpack'),
    browserSync = require("browser-sync"),
    nodemon = require('gulp-nodemon'),
    reload = browserSync.reload;

// we'd need a slight delay to reload browsers
// connected to browser-sync after restarting nodemon
var BROWSER_SYNC_RELOAD_DELAY = 0;

const webpackConfig = require('./webpack.config');
const dest = path.join(__dirname, './out');

/**
 * HTML
 */
let htmlGlob = [
  '../*.@(pug|html|htm)',
  './views/*.@(pug|html|htm)'
];

/**
 * CSS
 */
gulp.task('stylus', function() {
  return gulp.src('../markdown-previewer.styl')
    .pipe(plumber())
    .pipe(sourcemaps.init())
      .pipe(stylus())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(path.join(dest, './css')))
    .pipe(reload({ stream: true }));
});


/**
 * React
 */
gulp.task('react:bundle', function() {
  gulp.src(webpackConfig.entry.mdPreviewer)
    .pipe(gulpWebpack(webpackConfig, webpack))
    .pipe(gulp.dest(webpackConfig.output.path))
    .on('end', function() {
      reload({ stream: false });
    });
});

/**
 * Nodemon
 */
gulp.task('nodemon', function (cb) {
  var called = false;
  return nodemon({

    // nodemon our expressjs server
    script: 'index.js',

    // watch core server file(s) that require server restart on change
    watch: ['index.js']
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
 * Browser-Sync
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


// Watch task
gulp.task('watch', function() {
  gulp.watch('../markdown-previewer.styl', ['stylus']);
  gulp.watch('../*.@(js|jsx)', ['react:bundle']);
  gulp.watch(htmlGlob, function() {
    reload({ stream: false });
  })
});


// Defalut task
gulp.task('default', [
  'stylus', 
  'react:bundle', 
  'browser-sync', 
  'watch'
]);