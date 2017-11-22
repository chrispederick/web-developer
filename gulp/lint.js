"use strict";

var exec    = require("child_process");
var gulp    = require("gulp");
var plugins = require("gulp-load-plugins")();

gulp.task("lint-javascript", function()
{
  return gulp.src(["source/**/*.js", "!source/chrome/javascript/common/jquery/*.js", "!source/common/javascript/common/bootstrap/*.js", "!source/common/javascript/common/codemirror/*.js", "!source/common/javascript/common/jquery/*.js", "!source/common/javascript/generated/beautify/*.js"])
    .pipe(plugins.eslint())
    .pipe(plugins.eslint.format());
});

gulp.task("lint-style-sheets", function()
{
  return gulp.src(["source/**/*.css", "!source/common/style-sheets/common/bootstrap/*.css", "!source/common/style-sheets/common/codemirror/*.css"])
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

gulp.task("lint", ["lint-javascript", "lint-style-sheets", "lint-web-extension"]);
