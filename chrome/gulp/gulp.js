"use strict";

global.chromePackageName = "web-developer-chrome.zip";

var del         = require("del");
var gulp        = require("gulp");
var runSequence = require("run-sequence");

gulp.task("build-chrome-all", function()
{
  return global.buildAll("chrome");
});

gulp.task("clean-chrome", function()
{
  return del(["build/chrome", "build/chrome.properties", "build/" + global.chromePackageName]);
});

gulp.task("initialize-chrome-build", function(callback)
{
  global.initializeBuild("chrome", callback);
});

gulp.task("package-chrome", function()
{
  return global.packageTask("chrome", global.chromePackageName);
});

gulp.task("build-chrome", function(callback) { runSequence("initialize-chrome-build", "build-chrome-all", callback); });
gulp.task("chrome", function(callback) { runSequence("build-chrome", "package-chrome", callback); });
