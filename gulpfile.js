"use strict";

var gulp = require("gulp");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var server = require("browser-sync").create();
var webp = require("gulp-webp");
var del = require("del");
var min_css = require("gulp-csso");
var sprite = require("gulp-svgstore");
var post_html = require("gulp-html-replace");
var rename = require("gulp-rename");
var imagemin = require("gulp-imagemin");
var javascriptObfuscate = require("gulp-javascript-obfuscator");
var sourcemaps = require("gulp-sourcemaps");

gulp.task("css", function () {
  return gulp.src("source/css/style.css")
    .pipe(plumber())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest("./build/css"))
    .pipe(server.stream());
});

gulp.task("server", function () {
  server.init({
    server: "source/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("source/css/**/*.css", gulp.series("css"));
  gulp.watch("source/*.html").on("change", server.reload);
});

gulp.task("webp", function () {
  return gulp.src("source/img/**/*.{jpeg,jpg,png,tiff}")
    .pipe(webp({quality: 90}))
    .pipe(gulp.dest("source/img"));
});

gulp.task('clean', function(){
  return del('./build', {force:true});
});

gulp.task("css_admin", function () {
  return gulp.src("./source/**/*.css")
    .pipe(min_css())
    .pipe(rename("style-min.css"))
    .pipe(gulp.dest('./build/css'));
});

gulp.task("html_admin", function () {
  return gulp.src("./source/**/*.html")
    .pipe(post_html({minify:
        '<link rel="stylesheet" href="./css/normalize-min.css">' +
        '<link rel="stylesheet" href="./css/style-min.css">'}))
    .pipe(gulp.dest("./build"));
});

gulp.task("photo", function () {
  return gulp.src("source/photos/**/*.jpg")
    .pipe(imagemin([
      imagemin.gifsicle({interlaced: true}),
      imagemin.mozjpeg({quality: 75, progressive: true}),
      imagemin.optipng({optimizationLevel: 5}),
      imagemin.svgo({
        plugins: [
          {removeViewBox: true},
          {cleanupIDs: false}
        ]
      })
    ]))
    .pipe(gulp.dest('./build/photos'));
});

gulp.task("img", function () {
  return gulp.src("source/img/**/*.*")
    .pipe(imagemin([
      imagemin.gifsicle({interlaced: true}),
      imagemin.mozjpeg({quality: 75, progressive: true}),
      imagemin.optipng({optimizationLevel: 5}),
      imagemin.svgo({
        plugins: [
          {removeViewBox: true},
          {cleanupIDs: false}
        ]
      })
    ]))
    .pipe(gulp.dest('./build/img'));
});

gulp.task("js", function () {
  return gulp.src('./source/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(javascriptObfuscate({
      compact: true
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./build'));
});

gulp.task("sprite", function () {
  return gulp.src(["./source/img/icon-*.svg","./source/img/bg*.svg"])
    .pipe(sprite({
      inlineSvg: true
    }))
    .pipe(rename(function (path) {
      path.basename = "sprite";
      path.extname = ".svg";
    }))
    .pipe(gulp.dest("./build/img/svg"))
    .pipe(gulp.dest("./source/img/svg"))
});

gulp.task("fonts", function () {
  return gulp.src("source/fonts/**/*.*")
    .pipe(gulp.dest('./build/fonts'));
});

gulp.task("admin_server", function () {
  server.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });
});

gulp.task("icon_move", function () {
  return gulp.src("./source/*.ico")
    .pipe(gulp.dest('./build'));
});

gulp.task("normalize_move", function () {
  return gulp.src("./source/css/normalize.css")
    .pipe(min_css())
    .pipe(rename("normalize-min.css"))
    .pipe(gulp.dest('./build/css'));
});

gulp.task("admin", gulp.series("clean","css","css_admin","normalize_move","html_admin","photo","img","webp","sprite","js","fonts","icon_move"));

gulp.task("start", gulp.series("css","webp", "server"));
