'use strict'
const path = require('path');
const exec = require('child_process').execSync;

const gulp = require('gulp'),
      changed = require('gulp-changed'),
      plumber = require('gulp-plumber'),
      babel = require('gulp-babel'),
      electron = require('electron-connect').server.create(),
      rebuild = require('electron-rebuild').default;

const dest = 'dist';
const ELECTRON_VERSION = '1.6.1';

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

// Native
let nativeModules = [
  'myaddon'
];
let nativeModPath = path.join(__dirname, 'src/native');
let nativeDest = path.join(__dirname, 'node_modules/@native');
function rebuildMod(mod) {
  let modulePath = path.join(nativeModPath, mod);

  let stdout = exec('HOME=~/.electron-gyp node-gyp rebuild' + 
                    ' --target=' + ELECTRON_VERSION +
                    ' --arch=x64' +
                    ' --dist-url=https://atom.io/download/electron' +
                    ' --directory="' + modulePath + '"');
  
  let glob = [
    path.join(nativeModPath, mod + '/index.js'),
    path.join(nativeModPath, mod + '/build/Release/' + mod + '.node')
  ];
  gulp.src(glob)
    .pipe(gulp.dest(path.join(nativeDest, mod)));
}

function native() {
  for (let i = 0; i < nativeModules.length; i++) {
    rebuildMod(nativeModules[i]);
  }
}
gulp.task('native', native());

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

  // Native
  for(let i = 0; i < nativeModules.length; i++) {
    let mod = nativeModules[i];
    let modulePath = path.join(nativeModPath, mod);
    let glob = [
      path.join(modulePath, '/**/*.js'),
      path.join(modulePath, '/**/*.cc'),
      path.join(modulePath, 'binding.gyp')
    ];
    gulp.watch(glob, (event) => {
      rebuildMod(mod);

      electron.restart();
    });
  }

});

// electron-connect
gulp.task('serve', function() {
  // Start browser process
  electron.start();

});

gulp.task('build', ['html', 'css', 'js', 'native']);
gulp.task('default', ['build', 'serve', 'watch']);