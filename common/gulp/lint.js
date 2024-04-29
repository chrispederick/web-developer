"use strict";

var exec    = require("child_process");
var gulp    = require("gulp");
var plugins = require("gulp-load-plugins")();

gulp.task("lint-js", function()
{
  return gulp.src(["common/**/*.js", "!common/lib/**/*.js", "chrome/**/*.js"])
    .pipe(plugins.eslint())
    .pipe(plugins.eslint.format());
});

gulp.task("lint-css", function()
{
  return gulp.src(["common/**/*.css", "!common/lib/**/*.css", "firefox/**/*.css", "opera/**/*.css"])
    .pipe(plugins.plumber({ errorHandler: function(error) { global.errorHandler(error, true, this); } }))
    .pipe(plugins.csslint(".csslintrc.json"))
    .pipe(plugins.csslint.formatter("compact"));
});

gulp.task("lint-web-extension", function(callback)
{
  process.chdir("build/firefox");
  exec.exec("../../node_modules/web-ext/bin/web-ext lint -w", function(error, output, errors)
  {
    console.log(output); // eslint-disable-line no-console
    console.log(errors); // eslint-disable-line no-console
    callback(error);
  });
  process.chdir("../..");
});

gulp.task("lint", ["lint-js", "lint-css"]);
