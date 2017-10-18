const path = require('path');
const config = require('@creativefeather/config');
const gulp = require('gulp'),
      browserSync = require('browser-sync'),
      gulpWebpack = require('gulp-webpack'),
      nodemon     = require('gulp-nodemon'),
      reload      = browserSync.reload,
      webpack     = require('webpack');  // Ensure we are using our version of webpack instead of the one that came with gulp-webpack.

const BROWSER_SYNC_RELOAD_DELAY = 0;
const webpackConfig = require('./webpack.config');

// const config = {
//   gulp: gulp,
//   outDir: path.join(__dirname, './src/public'),
//   sync: { reload: reload }
// }



// *** Nodemon ***
gulp.task('nodemon', function (cb) {
  var called = false;
  return nodemon({
    
    // nodemon our expressjs server
    script: './src/server/index.js',

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
    proxy: `http://${config.host}:${config.port}`,

    // informs browser-sync to use the following port for the proxied app
    // notice that the default port is 3000, which would clash with our expressjs
    port: 4000,

    // open the proxied app in chrome
    browser: ['chrome']
    
  });
});



// *** React ***
let reactFiles = [
  path.join(__dirname, './src/client/**/*.js'),
  path.join(__dirname, './src/client/**/*.css'),
  path.join(__dirname, './src/lib/**/*.js')
];
function bundle() {
  return gulp.src(webpackConfig.entry.reactApp)
    .pipe(gulpWebpack(webpackConfig, webpack))
    .pipe(gulp.dest('./src/public/bundle'))
    .on('end', function() {
      reload({ stream: false });
    });
}
gulp.task('dev:bundle', bundle);
gulp.task('dev:bundle:watch', function() {
  gulp.watch(reactFiles, function() {
    bundle();
  });
});



// *** Watch ***
gulp.task('dev:watch', [
  'dev:bundle:watch'
])



// *** Default ***
gulp.task('default', [
  'dev:bundle',
  'browser-sync',
  'dev:watch'
])