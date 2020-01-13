"use strict";

global.firefoxPackageName = "web-developer-firefox.zip";

var del         = require("del");
var exec        = require("child_process");
var gulp        = require("gulp");
var runSequence = require("run-sequence");

gulp.task("build-firefox-all", function()
{
  return global.buildAll("firefox");
});

gulp.task("clean-firefox", function()
{
  return del(["build/firefox", "build/firefox.properties", "build/" + global.firefoxPackageName]);
});

gulp.task("initialize-firefox-build", function(callback)
{
  global.initializeBuild("firefox", callback);
});

gulp.task("temporary-install-firefox", function(callback)
{
  process.chdir("build/firefox");
  exec.exec("../../node_modules/web-ext/bin/web-ext run --bc -f=firefox --start-url chrispederick.com", function(error, output, errors)
  {
    console.log(output); // eslint-disable-line no-console
    console.log(errors); // eslint-disable-line no-console
    callback(error);
  });
});

gulp.task("temporary-install-firefox-beta", function(callback)
{
  process.chdir("build/firefox");
  exec.exec("../../node_modules/web-ext/bin/web-ext run --bc -f=beta --start-url chrispederick.com", function(error, output, errors)
  {
    console.log(output); // eslint-disable-line no-console
    console.log(errors); // eslint-disable-line no-console
    callback(error);
  });
});

gulp.task("temporary-install-firefox-developer", function(callback)
{
  process.chdir("build/firefox");
  exec.exec("../../node_modules/web-ext/bin/web-ext run --bc -f=firefoxdeveloperedition --start-url chrispederick.com -v", function(error, output, errors)
  {
    console.log(output); // eslint-disable-line no-console
    console.log(errors); // eslint-disable-line no-console
    callback(error);
  });
});

gulp.task("package-firefox", function()
{
  return global.packageTask("firefox", global.firefoxPackageName);
});

gulp.task("build-firefox", function(callback) { runSequence("initialize-firefox-build", "build-firefox-all", callback); });
gulp.task("firefox", function(callback) { runSequence("build-firefox", "package-firefox", callback); });
gulp.task("install-firefox", function(callback) { runSequence("build-firefox", "temporary-install-firefox", callback); });
