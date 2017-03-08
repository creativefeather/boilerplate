const gulp = require('gulp'),
      plumber = require('gulp-plumber'),
      babel = require('gulp-babel');

const dest = 'dist';

// HTML
let htmlGlob = 'src/renderers/**/*.html';
gulp.task('html', function() {
  return gulp.src(htmlGlob)
    .pipe(gulp.dest(dest));
})

// CSS
let cssGlob = 'src/renderers/**/*.css';
gulp.task('css', function() {
  return gulp.src(cssGlob)
    .pipe(gulp.dest(dest));
})

// JS
let jsGlob = ['src/renderers/**/*.js', 'src/renderers/**/*.jsx', 'src/main.js'];
//let jsGlob = 'src/main.js';
gulp.task('js', function() {
  return gulp.src(jsGlob)
    .pipe(plumber())
    .pipe(babel())
    .pipe(gulp.dest(dest));
});

/**
 *  Watch Task
 */
gulp.task('watch', function() {
  // HTML
  gulp.watch(htmlGlob, function(event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    if (event.type === 'changed') {
      gulp.src(event.path)
        .pipe(gulp.dest(dest));
    }
  });

  // CSS
  gulp.watch(cssGlob, function(event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    if (event.type === 'changed') {
      gulp.src(event.path)
        .pipe(gulp.dest(dest));
    }
  });

  // JS
  gulp.watch(jsGlob, function(event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    if (event.type === 'changed') {
      gulp.src(event.path)
        .pipe(plumber())
        .pipe(babel())
        .pipe(gulp.dest(dest));
    }
  });
});

gulp.task('build', ['html', 'css', 'js']);
gulp.task('default', ['build', 'watch']);