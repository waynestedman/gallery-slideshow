const { src, dest, watch, series, parallel } = require("gulp");

const sourcemaps = require("gulp-sourcemaps");
const babel = require("gulp-babel");
const sass = require("gulp-sass");
const order = require("gulp-order");
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const livereload = require("gulp-livereload");

const files = {
  scssPath: "./src/sass/**/*.scss",
  jsPath: "./src/js/**/*.js",
  libraryPath: "./src/libraries/*.js",
  htmlPath: "./**/*.html",
  phpPath: "./**/*.php"
};

livereload({ start: true });

// SCSS task: compiles SASS files; autoprefixes and  minifies CSS to styles.css
function scssTask() {
  return src(files.scssPath)
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(sourcemaps.write("."))
    .pipe(dest("."))
    .pipe(livereload());
}

// JS task: concatenates and uglifies JS files to scripts.js
function jsTask() {
  return src([
    files.jsPath
    //,'!' + 'includes/js/jquery.min.js', // to exclude any specific files
  ])
    // .pipe(concat("scripts.js"))
    // .pipe(uglify())
    .pipe(babel())
    .pipe(sourcemaps.write("."))
    .pipe(dest("."))
    .pipe(livereload());
}

// Library JS task: concatenates and uglifies JS libraries in a specific order to library.js
function libraryTask() {
  return src([
    files.libraryPath
  ])
    .pipe(order([
      "jquery.min.js",
      "jquery-migrate.min.js",
      "bootstrap.bundle.min.js"
    ]))
    .pipe(concat("library.js"))
    .pipe(uglify())
    .pipe(dest("."))
    .pipe(livereload());
}

// HTML file livereload
function htmlTask() {
  return src(files.htmlPath)
    .pipe(livereload());
}

// PHP file livereload
function phpTask() {
  return src(files.phpPath)
    .pipe(livereload());
}

// Watch task: watch SCSS, JS, HTML, PHP files for changes
// If any change, run scss and js tasks simultaneously
function watchTask() {
  livereload.listen();
  watch(
    [files.scssPath, files.jsPath, files.htmlPath, files.phpPath],
    { interval: 1000, usePolling: true }, //Makes docker work
    // series(parallel(scssTask, jsTask), htmlTask, phpTask)
    series(parallel(scssTask, jsTask), htmlTask)
  );
}

// exports.default = series(libraryTask, parallel(scssTask, jsTask), htmlTask, phpTask, watchTask);
exports.default = series(parallel(scssTask, jsTask), htmlTask, phpTask, watchTask);