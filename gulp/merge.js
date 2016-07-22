"use strict";

var del     = require("del");
var gulp    = require("gulp");
var plugins = require("gulp-load-plugins")();

gulp.task("clean-merge", function()
{
  return del("merge");
});

gulp.task("merge-bootstrap-javascript", function()
{
  return gulp.src(["merge/bootstrap/js/collapse.js", "merge/bootstrap/js/dropdown.js", "merge/bootstrap/js/modal.js", "merge/bootstrap/js/popover.js", "merge/bootstrap/js/tab.js", "merge/bootstrap/js/tooltip.js", "merge/bootstrap/js/transition.js"])
    .pipe(gulp.dest("source/common/javascript/common/bootstrap"));
});

gulp.task("merge-bootstrap-style-sheets", function()
{
  return gulp.src("merge/bootstrap/dist/css/bootstrap.css")
    .pipe(gulp.dest("source/common/style-sheets/common/bootstrap"));
});

gulp.task("merge-jquery", function()
{
  return gulp.src("merge/jquery*.js")
    .pipe(plugins.rename("jquery.js"))
    .pipe(gulp.dest("source/common/javascript/common/jquery"));
});

gulp.task("merge-bootstrap", ["merge-bootstrap-javascript", "merge-bootstrap-style-sheets"]);
