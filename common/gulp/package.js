"use strict";

var gulp    = require("gulp");
var plugins = require("gulp-load-plugins")();

global.packageTask = function(browserName, packageName)
{
  return gulp.src(["build/" + browserName + "/**", "license.txt"])
    .pipe(plugins.zip(packageName))
    .pipe(gulp.dest("build"));
};
