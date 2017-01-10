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
  ts = require('gulp-typescript'),
  stylus = require('gulp-stylus');

// Typescript
// -- Create a typescript project so we can use config values from 
// -- tsconfig.json (or jsconfig.json) instead of modifying these 
// -- values in multiple places.
var tsServerProject = ts.createProject('./src/server/tsconfig.json');
var tsClientProject = ts.createProject('./src/client/tsconfig.json');

// Typescript Server Task
gulp.task('typescript-server', function() {
  // Load files based on server tsconfig.json
  var tsServerResult = tsServerProject.src()
    .pipe(plumber())
    .pipe(tsServerProject());

  return tsServerResult.js.pipe(gulp.dest('./dist/server'));
});

// Typescript Client Task
gulp.task('typescript-client', function() {
  // Load files based on client tsconfig.json
  var tsClientResult = tsClientProject.src()
    .pipe(plumber())
    .pipe(tsClientProject());
  
  return tsClientResult.js.pipe(gulp.dest('./dist/client'));
});

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
require('./gulp-live-reload')(gulp);


// Watch Task
gulp.task('watch', function() {
  gulp.watch('./src/client/css/**/*.styl', ['stylus']);
  gulp.watch('./src/server/**/*.ts', ['typescript-server']);
  gulp.watch('./src/client/**/*.ts', ['typescript-client']);
});

// Default Task
gulp.task('default', [
  'stylus', 
  'typescript-server', 
  'typescript-client',
  'browser-sync', 
  'watch'
]);