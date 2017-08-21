import path from 'path';

import gulp from 'gulp';

import $browserSync from 'browser-sync';
import sass from 'gulp-sass';

let browserSync = $browserSync.create();

const paths = {
  styles: {
    src: 'src/frontend/css/style.sass',
    dest: 'src/frontend/css'
  },

  scripts: {
    src: 'src/frontend/js/**/*.js',
    dest: 'src/frontend/js'
  },

  html: {
    src: 'src/frontend/**/*.html'
  }
}

// *** Tasks ***
export function styles() {
  return gulp.src(paths.styles.src)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(browserSync.stream());
}

gulp.task('watch', function (done) {
  gulp.watch(paths.styles.src, styles);
  gulp.watch(paths.html.src).on('change', browserSync.reload);

  done();
});

gulp.task('browser sync', function (done) {
  browserSync.init({
    server: './src/frontend'
  });

  done();
});

const development = gulp.series(
  gulp.parallel(styles),
  'browser sync',
  'watch'
);

export default development;