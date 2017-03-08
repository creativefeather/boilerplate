'use strict'
const path = require('path');

const gulp = require('gulp'),
      changed = require('gulp-changed'),
      plumber = require('gulp-plumber'),
      babel = require('gulp-babel'),
      electron = require('electron-connect').server.create();

const dest = 'dist';

// HTML
let htmlGlob = 'src/renderers/**/*.html';
function html() {
  return gulp.src(htmlGlob)
    .pipe(changed(dest))
    .pipe(gulp.dest(dest));
}
gulp.task('html', html);

// CSS
let cssGlob = 'src/renderers/**/*.css';
function css () {
  return gulp.src(cssGlob)
    .pipe(changed(dest))
    .pipe(gulp.dest(dest));
}
gulp.task('css', css);

// JS
let mainProc = 'src/main.js';
let jsGlob = ['src/renderers/**/*.js', 'src/renderers/**/*.jsx', mainProc];
function js () {
  return gulp.src(jsGlob)
    .pipe(changed(dest))
    .pipe(plumber())
    .pipe(babel())
    .pipe(gulp.dest(dest));
}
gulp.task('js', js);

/**
 *  Watch Task
 */
gulp.task('watch', function() {
  // HTML
  gulp.watch(htmlGlob, function(event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    if (event.type === 'changed') {
      html();
      
      electron.reload();
    }
  });

  // CSS
  gulp.watch(cssGlob, function(event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    if (event.type === 'changed') {
      css();
      
      electron.reload();
    }
  });

  // JS
  gulp.watch(jsGlob, function(event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    if (event.type === 'changed') {
      js();
      
      if (event.path === path.join(__dirname, mainProc)) {
        electron.restart();
      }
      else {
        electron.reload();
      }
    }
  });
});

// electron-connect
gulp.task('serve', function() {
  // Start browser process
  electron.start();

});

gulp.task('build', ['html', 'css', 'js']);
gulp.task('default', ['build', 'serve', 'watch']);