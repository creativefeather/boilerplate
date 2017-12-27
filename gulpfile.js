const path        = require('path'),

      browserSync = require("browser-sync"),
      gulp        = require("gulp"),
      babel       = require("gulp-babel"),
      concat      = require("gulp-concat"),
      postcss     = require("gulp-postcss"),
      sourcemaps  = require("gulp-sourcemaps");

const config = {
  src: "src",
  dest: "dist",
  postcssPlugins: [
    require('precss'),
    require('autoprefixer')
  ]
}

config.html = path.join(config.src, "/**/*.html");
config.css = path.join(config.src, "/**/*.css");
config.js = path.join(config.src, "/**/*.js");

/**
 * @task Browser-Sync task
 */
gulp.task('browser-sync', function() {
  // for more browser-sync config options: http://www.browsersync.io/docs/options/
  browserSync.init({
    server: {
      baseDir: config.dest
    },

    // informs browser-sync to proxy our expressjs app which would run at the following location
    //proxy: `http://${config.host}:${config.port}`,

    // informs browser-sync to use the following port for the proxied app
    // notice that the default port is 3000, which would clash with our expressjs
    //port: 4000,

    // open the proxied app in chrome
    browser: ['chrome']
    
  });
});

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
      .pipe(postcss(config.postcssPlugins))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest(config.dest))
      .pipe(browserSync.stream());
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
  gulp.watch(config.html, ["html-watch"])
  .on('change', logChange);

  // Watch CSS
  gulp.watch(config.css, ["postcss"])
  .on('change', logChange);

  // Watch JS
  gulp.watch(config.js, ["babel-watch"])
    .on('change', logChange);
});

// html-watch
gulp.task("html-watch", ["html"], function (done) {
  browserSync.reload();
  done();
});

// babel-watch
gulp.task("babel-watch", ["babel"], function (done) {
  browserSync.reload();
  done();
});

gulp.task("default", [
  "html",
  "postcss",
  "babel",
  "browser-sync",
  "watch"
]);