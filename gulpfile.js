const path        = require('path'),

      browserSync = require("browser-sync"),
      gulp        = require("gulp"),
      babel       = require("gulp-babel"),
      concat      = require("gulp-concat"),
      nunjucks    = require("gulp-nunjucks"),
      postcss     = require("gulp-postcss"),
      sourcemaps  = require("gulp-sourcemaps");

const config = {
  src: "src",
  dest: "dist",
  postcssPlugins: require("./postcss.config")
}

config.html = {
  src: path.join(config.src, "/client/**/*.html"),
  watch: [
    path.join(config.src, "/client/**/*.html"),
    path.join(config.src, "/client/**/*.njk")
  ]
};

config.css = {
  src: path.join(config.src, "/client/**/*.css"),
  watch: [
    path.join(config.src, "/client/**/*.css"),
    path.join(config.src, "/client/**/*.styl")
  ]
};

config.js = {
  src: path.join(config.src, "/**/*.js"),
  watch: path.join(config.src, "/**/*.js")
};

/**
 * @task Browser-Sync task
 */
gulp.task('browser-sync', function() {
  // for more browser-sync config options: http://www.browsersync.io/docs/options/
  browserSync.init({
    server: {
      baseDir: config.dest
    },

    // Proxy app at the following location
    //proxy: `http://${config.host}:${config.port}`,

    // Use this port for the proxied app.
    //port: 4000,

    // open in chrome
    browser: ['chrome']
    
  });
});


// *** HTML ***
gulp.task("html", function () {
  return gulp.src(config.html.src)
    .pipe(nunjucks.compile())
    .pipe(gulp.dest(config.dest));
});


// *** POSTCSS ***
gulp.task("postcss", function () {
  return gulp.src(config.css.src)
      .pipe(sourcemaps.init())
      .pipe(postcss(config.postcssPlugins))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest(config.dest))
      .pipe(browserSync.stream());
});


// *** BABEL ***
gulp.task("babel", function () {
  return gulp.src(config.js.src)
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(concat("all.js"))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest(config.dest));
});


// *** WATCH ***
gulp.task("watch", function () {
  let logChange = function(e) {
    console.log(`File ${e.path} was ${e.type}, running tasks....`);
  }

  // Watch HTML
  gulp.watch(config.html.watch, ["html-watch"])
  .on('change', logChange);

  // Watch CSS
  gulp.watch(config.css.watch, ["postcss"])
  .on('change', logChange);

  // Watch JS
  gulp.watch(config.js.watch, ["babel-watch"])
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


// *** DEFAULT TASK ***
gulp.task("default", [
  "html",
  "postcss",
  "babel",
  "browser-sync",
  "watch"
]);