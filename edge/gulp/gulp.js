"use strict";

global.chromePackageName = "web-developer-edge.zip";

var del         = require("del");
var gulp        = require("gulp");
var runSequence = require("run-sequence");

gulp.task("build-edge-all", function()
{
  return global.buildAll("edge");
});

gulp.task("clean-edge", function()
{
  return del(["build/edge", "build/edge.properties", "build/" + global.chromePackageName]);
});

gulp.task("initialize-edge-build", function(callback)
{
  global.initializeBuild("edge", callback);
});

gulp.task("package-edge", function()
{
  return global.packageTask("edge", global.chromePackageName);
});

gulp.task("build-edge", function(callback) { runSequence("initialize-edge-build", "build-edge-all", callback); });
gulp.task("edge", function(callback) { runSequence("build-edge", "package-edge", callback); });
