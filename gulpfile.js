/**
 * @file gulpfile.js
 * @author creativefeather
 * 
 * Documentation:
 * Gulp API @link https://github.com/gulpjs/gulp/blob/master/docs/API.md
 * gulp-plumber @link https://www.npmjs.com/package/gulp-plumber
 * gulp-typescript @link https://www.npmjs.com/package/gulp-typescript
 * gulp-stylus @link https://www.npmjs.com/package/gulp-stylus
 */
var gulp = require('gulp'),
  plumber = require('gulp-plumber'),
  stylus = require('gulp-stylus');

/**
 * Stylus @task stylus
 * Process style.styl then reload browser
 */
gulp.task('stylus', function() {
  gulp.src('./src/client/css/style.styl')
    .pipe(plumber())
    .pipe(stylus())
    .pipe(gulp.dest('./src/client/css'))
    .pipe(liveReload.reload({ stream: true }));
});

/**
 * Handlebars @task hbs
 * Restart server and reload browser
 */

//
// Add live-reload tasks
//
const liveReload = require('./gulp.live-reload');
liveReload(gulp);


// Watch Task
gulp.task('watch', function() {
  gulp.watch('./src/client/css/**/*.styl', ['stylus']);
  gulp.watch('./src/server/views/**/*.hbs', function() {
    liveReload.reload({ stream: false });
  });
});

// Default Task
gulp.task('default', [
  'stylus',
  'browser-sync', 
  'watch'
]);