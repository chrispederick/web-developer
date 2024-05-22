"use strict";

var dateFormat       = require("dateformat");
var filterProperties = require("gulp-filter-java-properties");
var fs               = require("fs");
var gulp             = require("gulp");
var lazypipe         = require("lazypipe");
var log              = require("fancy-log");
var plugins          = require("gulp-load-plugins")();
var runSequence      = require("run-sequence");

global.errorHandler = function(error, emitEnd, task)
{
  log.error(error.plugin + " error: " + error.message);
  log.error(error);

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

global.filterProperties = function(browserName)
{
  return lazypipe()
    .pipe(filterProperties, { propertiesPath: "build/" + browserName + ".properties" })
    .pipe(filterProperties, { propertiesPath: "common/config/config.properties" })
    .pipe(filterProperties, { propertiesPath: browserName + "/config/config.properties" });
};

global.initializeBuild = function(browserName, callback)
{
  fs.writeFileSync("build/" + browserName + ".properties", "browser=" + browserName + "\nbuild.date=" + dateFormat(new Date(), "mmmm d, yyyy"));
  callback();
};

gulp.task("lint-gulp", function()
{
  return gulp.src(["gulpfile.js", "common/gulp/*.js", "chrome/gulp/*.js", "edge/gulp/*.js", "firefox/gulp/*.js", "opera/gulp/*.js"])
    .pipe(plugins.eslint())
    .pipe(plugins.eslint.format());
});

gulp.task("all", function(callback) { runSequence("clean", "build", "package", "lint", callback); });
gulp.task("build", ["build-chrome", "build-edge", "build-firefox", "build-opera"]);
gulp.task("clean", ["clean-chrome", "clean-edge", "clean-firefox", "clean-opera"]);
gulp.task("default", ["all"]);
gulp.task("package", ["package-chrome", "package-edge", "package-firefox", "package-opera"]);
