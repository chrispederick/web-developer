"use strict";

var dateFormat       = require("dateformat");
var filterProperties = require("gulp-filter-java-properties");
var fs               = require("fs");
var gulp             = require("gulp");
var gutil            = require("gulp-util");
var lazypipe         = require("lazypipe");
var plugins          = require("gulp-load-plugins")();
var runSequence      = require("run-sequence");

global.errorHandler = function(error, emitEnd, task)
{
  gutil.log(gutil.colors.red(error.plugin + " error: " + error.message));

  // If should emit end
  if(emitEnd)
  {
    task.emit("end");
  }
  else
  {
    process.exit(1);
  }
};

global.filterPropertiesTask = function(browserName)
{
  return lazypipe()
    .pipe(filterProperties, { propertiesPath: "build/" + browserName + ".properties" })
    .pipe(filterProperties, { propertiesPath: "configuration/common/configuration.properties" })
    .pipe(filterProperties, { propertiesPath: "configuration/" + browserName + "/configuration.properties" });
};

global.initializeBuild = function(browserName, callback)
{
  fs.writeFileSync("build/" + browserName + ".properties", "browser=" + browserName + "\nbuild.date=" + dateFormat(new Date(), "mmmm d, yyyy"));
  callback();
};

gulp.task("lint-gulp", function()
{
  return gulp.src(["gulp/*.js", "gulpfile.js"])
    .pipe(plugins.eslint())
    .pipe(plugins.eslint.format());
});

// Common tasks
gulp.task("all", function(callback) { runSequence("clean", "build", "package", "lint", callback); });
gulp.task("build", ["build-chrome", "build-firefox", "build-opera"]);
gulp.task("clean", ["clean-chrome", "clean-firefox", "clean-merge", "clean-opera"]);
gulp.task("default", ["all"]);
gulp.task("package", ["package-chrome", "package-firefox", "package-opera"]);
