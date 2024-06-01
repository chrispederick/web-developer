"use strict";

var gulp    = require("gulp");
var merge   = require("merge-stream");
var plugins = require("gulp-load-plugins")();

global.buildAbout = function(browserName)
{
  return merge(
    gulp.src("common/html/about/about.html")
      .pipe(global.filterProperties(browserName)())
      .pipe(gulp.dest("build/" + browserName + "/about")),
    gulp.src("common/css/about/about.css")
      .pipe(global.filterProperties(browserName)())
      .pipe(gulp.dest("build/" + browserName + "/about/css")),
    gulp.src("common/js/about/about.js")
      .pipe(global.filterProperties(browserName)())
      .pipe(gulp.dest("build/" + browserName + "/about/js"))
  );
};

global.buildAll = function(browserName)
{
  return merge(
    global.buildAbout(browserName),
    global.buildBackground(browserName),
    global.buildCommon(browserName),
    global.buildConfiguration(browserName),
    global.buildContent(browserName),
    global.buildEmbedded(browserName),
    global.buildFeatures(browserName),
    global.buildGenerated(browserName),
    global.buildImages(browserName),
    global.buildLib(browserName),
    global.buildLocales(browserName),
    global.buildOptions(browserName),
    global.buildOverlay(browserName),
    global.buildSVG(browserName)
  );
};

global.buildBackground = function(browserName)
{
  return gulp.src(["common/js/background/background.js", "common/js/common/locales.js", "common/js/common/storage.js", "common/js/upgrade/upgrade.js"])
    .pipe(plugins.concat("background.js"))
    .pipe(global.filterProperties(browserName)())
    .pipe(gulp.dest("build/" + browserName + "/background"));
};

global.buildCommon = function(browserName)
{
  return merge(
    gulp.src("common/js/common/common.js")
      .pipe(global.filterProperties(browserName)())
      .pipe(gulp.dest("build/" + browserName + "/common")),
    gulp.src("common/js/common/css.js")
      .pipe(global.filterProperties(browserName)())
      .pipe(gulp.dest("build/" + browserName + "/common")),
    gulp.src("common/js/common/cookies.js")
      .pipe(global.filterProperties(browserName)())
      .pipe(gulp.dest("build/" + browserName + "/common")),
    gulp.src("common/js/common/locales.js")
      .pipe(global.filterProperties(browserName)())
      .pipe(gulp.dest("build/" + browserName + "/common")),
    gulp.src("common/js/common/storage.js")
      .pipe(global.filterProperties(browserName)())
      .pipe(gulp.dest("build/" + browserName + "/common"))
  );
};

global.buildConfiguration = function(browserName)
{
  return gulp.src(browserName + "/config/manifest.json")
    .pipe(global.filterProperties(browserName)())
    .pipe(gulp.dest("build/" + browserName));
};

global.buildContent = function(browserName)
{
  return gulp.src(["common/js/common/common.js", "common/js/common/css.js", "common/js/content/content.js"])
    .pipe(plugins.concat("content.js"))
    .pipe(global.filterProperties(browserName)())
    .pipe(gulp.dest("build/" + browserName + "/content"));
};

global.buildEmbedded = function(browserName)
{
  return merge(
    gulp.src(["common/css/embedded/**"])
      .pipe(global.filterProperties(browserName)())
      .pipe(gulp.dest("build/" + browserName + "/embedded/css")),
    gulp.src(["common/js/embedded/**"])
      .pipe(global.filterProperties(browserName)())
      .pipe(gulp.dest("build/" + browserName + "/embedded/js"))
  );
};

global.buildFeatures = function(browserName)
{
  return merge(
    gulp.src(["common/js/common/common.js", "common/js/common/css.js", "common/js/features/common.js", "common/js/features/css.js"])
      .pipe(plugins.concat("css.js"))
      .pipe(global.filterProperties(browserName)())
      .pipe(plugins.footer("\nvoid(0);"))
      .pipe(gulp.dest("build/" + browserName + "/features/js")),
    gulp.src(["common/js/common/common.js", "common/js/features/common.js", "common/js/features/forms.js"])
      .pipe(plugins.concat("forms.js"))
      .pipe(global.filterProperties(browserName)())
      .pipe(plugins.footer("\nvoid(0);"))
      .pipe(gulp.dest("build/" + browserName + "/features/js")),
    gulp.src(["common/js/common/common.js", "common/js/features/common.js", "common/js/features/images.js"])
      .pipe(plugins.concat("images.js"))
      .pipe(global.filterProperties(browserName)())
      .pipe(plugins.footer("\nvoid(0);"))
      .pipe(gulp.dest("build/" + browserName + "/features/js")),
    gulp.src(["common/js/common/common.js", "common/js/features/common.js", "common/js/features/information.js"])
      .pipe(plugins.concat("information.js"))
      .pipe(global.filterProperties(browserName)())
      .pipe(plugins.footer("\nvoid(0);"))
      .pipe(gulp.dest("build/" + browserName + "/features/js")),
    gulp.src(["common/js/common/common.js", "common/js/features/common.js", "common/js/features/miscellaneous.js"])
      .pipe(plugins.concat("miscellaneous.js"))
      .pipe(global.filterProperties(browserName)())
      .pipe(plugins.footer("\nvoid(0);"))
      .pipe(gulp.dest("build/" + browserName + "/features/js")),
    gulp.src(["common/js/common/common.js", "common/js/features/common.js", "common/js/features/outline.js"])
      .pipe(plugins.concat("outline.js"))
      .pipe(global.filterProperties(browserName)())
      .pipe(plugins.footer("\nvoid(0);"))
      .pipe(gulp.dest("build/" + browserName + "/features/js")),
    gulp.src("common/css/features/**")
      .pipe(global.filterProperties(browserName)())
      .pipe(gulp.dest("build/" + browserName + "/features/css"))
  );
};

global.buildGenerated = function(browserName)
{
  return merge(
    gulp.src(["common/html/generated/*"])
      .pipe(global.filterProperties(browserName)())
      .pipe(gulp.dest("build/" + browserName + "/generated")),
    gulp.src("common/css/generated/*")
      .pipe(global.filterProperties(browserName)())
      .pipe(gulp.dest("build/" + browserName + "/generated/css")),
    gulp.src("common/js/generated/*")
      .pipe(global.filterProperties(browserName)())
      .pipe(gulp.dest("build/" + browserName + "/generated/js"))
  );
};

global.buildImages = function(browserName)
{
  return gulp.src("common/img/**")
    .pipe(gulp.dest("build/" + browserName + "/img"));
};

global.buildLib = function(browserName)
{
  return gulp.src("common/lib/**")
    .pipe(gulp.dest("build/" + browserName + "/lib"));
};

global.buildLocales = function(browserName)
{
  return gulp.src("common/locales/**")
    .pipe(global.filterProperties(browserName)())
    .pipe(gulp.dest("build/" + browserName + "/_locales"));
};

global.buildOptions = function(browserName)
{
  return merge(
    gulp.src(["common/html/options/options.html", "common/html/options/syntax-highlight.html"])
      .pipe(global.filterProperties(browserName)())
      .pipe(gulp.dest("build/" + browserName + "/options")),
    gulp.src(["common/css/options/options.css", "common/css/options/syntax-highlight.css"])
      .pipe(global.filterProperties(browserName)())
      .pipe(gulp.dest("build/" + browserName + "/options/css")),
    gulp.src(["common/js/options/options.js", "common/js/options/syntax-highlight.js"])
      .pipe(global.filterProperties(browserName)())
      .pipe(gulp.dest("build/" + browserName + "/options/js"))
  );
};

global.buildOverlay = function(browserName)
{
  var overlaySrc = ["common/js/overlay/*"];

  // If this is Firefox or Opera do not include the disable overlay script
  if(browserName === "firefox" || browserName === "opera")
  {
    overlaySrc = ["common/js/overlay/*", "!common/js/overlay/disable.js"];
  }

  return merge(
    gulp.src("common/html/overlay/overlay.html")
      .pipe(global.filterProperties(browserName)())
      .pipe(gulp.dest("build/" + browserName + "/overlay")),
    gulp.src(["common/css/overlay/overlay.css", browserName + "/css/overlay/overlay.css"])
      .pipe(plugins.concat("overlay.css"))
      .pipe(global.filterProperties(browserName)())
      .pipe(gulp.dest("build/" + browserName + "/overlay/css")),
    gulp.src(overlaySrc)
      .pipe(plugins.concat("overlay.js"))
      .pipe(global.filterProperties(browserName)())
      .pipe(gulp.dest("build/" + browserName + "/overlay/js"))
  );
};

global.buildSVG = function(browserName)
{
  return gulp.src("common/svg/**")
    .pipe(gulp.dest("build/" + browserName + "/svg"));
};
