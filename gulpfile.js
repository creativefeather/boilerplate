const path = require('path'),

      gulp = require("gulp"),
      babel = require("gulp-babel"),
      concat = require("gulp-concat"),
      postcss = require("gulp-postcss"),
      sourcemaps = require("gulp-sourcemaps");

const config = {
  src: "src",
  dest: "dist"
}

config.html = path.join(config.src, "/**/*.html");
config.css = path.join(config.src, "/**/*.css");
config.js = path.join(config.src, "/**/*.js");


// *** BABEL ***
gulp.task("babel", function () {
  return gulp.src(config.js)
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(concat("all.js"))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest(config.dest));
});


// *** POSTCSS ***
gulp.task("postcss", function () {
  return gulp.src(config.css)
      .pipe(sourcemaps.init())
      .pipe(postcss([
        require('precss'),
        require('autoprefixer')
      ]))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest(config.dest));
});


// *** HTML ***
gulp.task("html", function () {
  return gulp.src(config.html)
    .pipe(gulp.dest(config.dest));
});


// *** WATCH ***
gulp.task("watch", function () {
  let logChange = function(e) {
    console.log(`File ${e.path} was ${e.type}, running tasks....`);
  }

  // Watch HTML
  gulp.watch(config.html, ["html"])
  .on('change', logChange);

  // Watch CSS
  gulp.watch(config.css, ["postcss"])
  .on('change', logChange);

  // Watch JS
  gulp.watch(config.js, ["babel"])
    .on('change', logChange);
});

gulp.task("default", [
  "html",
  "postcss",
  "babel",
  "watch"
]);