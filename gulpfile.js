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

// Stylus Task
// -- Runs stylus on specified files
gulp.task('stylus', function() {
  gulp.src('./src/client/css/style.styl')
    .pipe(plumber())
    .pipe(stylus())
    .pipe(gulp.dest('./dist/client/css'));
});

//
// Add live-reload tasks
//
require('./gulp.live-reload')(gulp);


// Watch Task
gulp.task('watch', function() {
  gulp.watch('./src/client/css/**/*.styl', ['stylus']);
});

// Default Task
gulp.task('default', [
  'stylus',
  'browser-sync', 
  'watch'
]);