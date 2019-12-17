"use strict";

var gulp    = require("gulp");
var merge   = require("merge-stream");
var plugins = require("gulp-load-plugins")();

global.buildAbout = function(browserName)
{
  return merge(
    gulp.src("source/common/html/about/about.html")
      .pipe(global.filterProperties(browserName)())
      .pipe(gulp.dest("build/" + browserName + "/about")),
    gulp.src("source/common/javascript/about/about.js")
      .pipe(global.filterProperties(browserName)())
      .pipe(gulp.dest("build/" + browserName + "/about/javascript")),
    gulp.src("source/common/style-sheets/about/about.css")
      .pipe(global.filterProperties(browserName)())
      .pipe(gulp.dest("build/" + browserName + "/about"))
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
    global.buildDashboard(browserName),
    global.buildFeatures(browserName),
    global.buildGenerated(browserName),
    global.buildLocales(browserName),
    global.buildOptions(browserName),
    global.buildOverlay(browserName),
    global.buildToolbars(browserName)
  );
};

global.buildBackground = function(browserName)
{
  return merge(
    gulp.src("source/common/html/background/background.html")
      .pipe(global.filterProperties(browserName)())
      .pipe(gulp.dest("build/" + browserName + "/background")),
    gulp.src("source/common/javascript/background/background.js")
      .pipe(global.filterProperties(browserName)())
      .pipe(gulp.dest("build/" + browserName + "/background/javascript"))
  );
};

global.buildCommon = function(browserName)
{
  return merge(
    gulp.src("source/common/javascript/common/bootstrap/*")
      .pipe(global.filterProperties(browserName)())
      .pipe(gulp.dest("build/" + browserName + "/common/javascript/bootstrap")),
    gulp.src("source/common/javascript/common/codemirror/*")
      .pipe(global.filterProperties(browserName)())
      .pipe(gulp.dest("build/" + browserName + "/common/javascript/codemirror")),
    gulp.src("source/common/javascript/common/jquery/*")
      .pipe(global.filterProperties(browserName)())
      .pipe(gulp.dest("build/" + browserName + "/common/javascript/jquery")),
    gulp.src("source/common/javascript/common/common.js")
      .pipe(global.filterProperties(browserName)())
      .pipe(gulp.dest("build/" + browserName + "/common/javascript")),
    gulp.src("source/common/javascript/common/css.js")
      .pipe(global.filterProperties(browserName)())
      .pipe(gulp.dest("build/" + browserName + "/common/javascript")),
    gulp.src("source/common/javascript/common/mustache.js")
      .pipe(global.filterProperties(browserName)())
      .pipe(gulp.dest("build/" + browserName + "/common/javascript")),
    gulp.src(["source/common/javascript/cookies/cookies.js", "source/" + browserName + "/javascript/cookies/cookies.js"])
      .pipe(plugins.concat("cookies.js"))
      .pipe(global.filterProperties(browserName)())
      .pipe(gulp.dest("build/" + browserName + "/cookies")),
    gulp.src("source/common/javascript/locales/locales.js")
      .pipe(global.filterProperties(browserName)())
      .pipe(gulp.dest("build/" + browserName + "/locales")),
    gulp.src("source/common/javascript/storage/storage.js")
      .pipe(global.filterProperties(browserName)())
      .pipe(gulp.dest("build/" + browserName + "/storage")),
    gulp.src("source/common/javascript/upgrade/upgrade.js")
      .pipe(global.filterProperties(browserName)())
      .pipe(gulp.dest("build/" + browserName + "/upgrade")),
    gulp.src(["source/common/style-sheets/common/bootstrap/bootstrap.css", "source/common/style-sheets/common/bootstrap/font-awesome.css"])
      .pipe(plugins.concat("bootstrap.css"))
      .pipe(plugins.replace("fonts/fontawesome-webfont", "../fonts/fontawesome-webfont"))
      .pipe(global.filterProperties(browserName)())
      .pipe(gulp.dest("build/" + browserName + "/common/style-sheets")),
    gulp.src("source/common/style-sheets/common/bootstrap/bootstrap.css.map")
      .pipe(global.filterProperties(browserName)())
      .pipe(gulp.dest("build/" + browserName + "/common/style-sheets")),
    gulp.src("source/common/style-sheets/generated/common.css")
      .pipe(plugins.rename("generated.css"))
      .pipe(global.filterProperties(browserName)())
      .pipe(gulp.dest("build/" + browserName + "/common/style-sheets")),
    gulp.src(["source/common/style-sheets/common/codemirror/codemirror.css", "source/common/style-sheets/common/codemirror/theme.css"])
      .pipe(plugins.concat("syntax-highlight.css"))
      .pipe(global.filterProperties(browserName)())
      .pipe(gulp.dest("build/" + browserName + "/common/style-sheets")),
    gulp.src("images/common/logos/**")
      .pipe(gulp.dest("build/" + browserName + "/common/images/logos")),
    gulp.src("source/common/fonts/*")
      .pipe(gulp.dest("build/" + browserName + "/common/fonts"))
  );
};

global.buildConfiguration = function(browserName)
{
  return gulp.src(["configuration/common/manifest-top.json", "configuration/" + browserName + "/manifest.json", "configuration/common/manifest-bottom.json"])
    .pipe(plugins.concat("manifest.json"))
    .pipe(plugins.replace('{"remove-top": "",', ""))
    .pipe(plugins.replace('"remove-bottom": ""}', ""))
    .pipe(plugins.replace(/^\s*[\r\n]/gm, ""))
    .pipe(global.filterProperties(browserName)())
    .pipe(gulp.dest("build/" + browserName));
};

global.buildContent = function(browserName)
{
  return gulp.src(["source/common/javascript/common/common.js", "source/common/javascript/common/css.js", "source/common/javascript/content/content.js"])
    .pipe(plugins.concat("content.js"))
    .pipe(global.filterProperties(browserName)())
    .pipe(gulp.dest("build/" + browserName + "/content"));
};

global.buildDashboard = function(browserName)
{
  return merge(
    gulp.src(["source/common/javascript/dashboard/common.js", "source/common/javascript/toolbar/html/element-ancestors.js"])
      .pipe(plugins.concat("dashboard.js"))
      .pipe(global.filterProperties(browserName)())
      .pipe(gulp.dest("build/" + browserName + "/dashboard/javascript/html")),
    gulp.src(["source/common/javascript/common/common.js", "source/common/javascript/dashboard/dashboard.js", "source/common/javascript/dashboard/edit-css.js", "source/common/javascript/dashboard/element-information.js", "source/common/javascript/toolbar/element-ancestors.js"])
      .pipe(plugins.concat("dashboard.js"))
      .pipe(global.filterProperties(browserName)())
      .pipe(plugins.footer("\nvoid(0);"))
      .pipe(gulp.dest("build/" + browserName + "/dashboard/javascript")),
    gulp.src("source/common/style-sheets/dashboard/dashboard.css")
      .pipe(global.filterProperties(browserName)())
      .pipe(gulp.dest("build/" + browserName + "/dashboard/style-sheets")),
    gulp.src(["source/common/style-sheets/common/bootstrap/bootstrap.css", "source/common/style-sheets/dashboard/common.css"])
      .pipe(plugins.concat("common.css"))
      .pipe(global.filterProperties(browserName)())
      .pipe(gulp.dest("build/" + browserName + "/dashboard/style-sheets")),
    gulp.src("images/common/logos/monochrome/16.png")
      .pipe(plugins.rename("logo.png"))
      .pipe(gulp.dest("build/" + browserName + "/dashboard/images"))
  );
};

global.buildFeatures = function(browserName)
{
  return merge(
    gulp.src(["source/common/javascript/common/common.js", "source/common/javascript/common/css.js", "source/common/javascript/features/common.js", "source/common/javascript/features/css.js"])
      .pipe(plugins.concat("css.js"))
      .pipe(global.filterProperties(browserName)())
      .pipe(plugins.footer("\nvoid(0);"))
      .pipe(gulp.dest("build/" + browserName + "/features/javascript")),
    gulp.src(["source/common/javascript/common/common.js", "source/common/javascript/features/common.js", "source/common/javascript/features/forms.js"])
      .pipe(plugins.concat("forms.js"))
      .pipe(global.filterProperties(browserName)())
      .pipe(plugins.footer("\nvoid(0);"))
      .pipe(gulp.dest("build/" + browserName + "/features/javascript")),
    gulp.src(["source/common/javascript/common/common.js", "source/common/javascript/features/common.js", "source/common/javascript/features/images.js"])
      .pipe(plugins.concat("images.js"))
      .pipe(global.filterProperties(browserName)())
      .pipe(plugins.footer("\nvoid(0);"))
      .pipe(gulp.dest("build/" + browserName + "/features/javascript")),
    gulp.src(["source/common/javascript/common/common.js", "source/common/javascript/features/common.js", "source/common/javascript/features/information.js"])
      .pipe(plugins.concat("information.js"))
      .pipe(global.filterProperties(browserName)())
      .pipe(plugins.footer("\nvoid(0);"))
      .pipe(gulp.dest("build/" + browserName + "/features/javascript")),
    gulp.src(["source/common/javascript/common/common.js", "source/common/javascript/features/common.js", "source/common/javascript/features/miscellaneous.js"])
      .pipe(plugins.concat("miscellaneous.js"))
      .pipe(global.filterProperties(browserName)())
      .pipe(plugins.footer("\nvoid(0);"))
      .pipe(gulp.dest("build/" + browserName + "/features/javascript")),
    gulp.src(["source/common/javascript/common/common.js", "source/common/javascript/features/common.js", "source/common/javascript/features/outline.js"])
      .pipe(plugins.concat("outline.js"))
      .pipe(global.filterProperties(browserName)())
      .pipe(plugins.footer("\nvoid(0);"))
      .pipe(gulp.dest("build/" + browserName + "/features/javascript")),
    gulp.src("source/common/style-sheets/features/**")
      .pipe(global.filterProperties(browserName)())
      .pipe(gulp.dest("build/" + browserName + "/features/style-sheets")),
    gulp.src("source/common/style-sheets/common/reset.css")
      .pipe(plugins.rename("disable-browser-default-styles.css"))
      .pipe(global.filterProperties(browserName)())
      .pipe(gulp.dest("build/" + browserName + "/features/style-sheets/css")),
    gulp.src("images/common/transparent.png")
      .pipe(gulp.dest("build/" + browserName + "/features/style-sheets/images")),
    gulp.src("source/common/html/validation/*")
      .pipe(global.filterProperties(browserName)())
      .pipe(gulp.dest("build/" + browserName + "/validation")),
    gulp.src("source/common/javascript/validation/*")
      .pipe(global.filterProperties(browserName)())
      .pipe(gulp.dest("build/" + browserName + "/validation/javascript"))
  );
};

global.buildGenerated = function(browserName)
{
  return merge(
    gulp.src(["source/common/html/generated/*", "source/common/style-sheets/generated/*", "!source/common/style-sheets/generated/common.css"])
      .pipe(global.filterProperties(browserName)())
      .pipe(gulp.dest("build/" + browserName + "/generated")),
    gulp.src("source/common/javascript/generated/**")
      .pipe(global.filterProperties(browserName)())
      .pipe(gulp.dest("build/" + browserName + "/generated/javascript"))
  );
};

global.buildLocales = function(browserName)
{
  return gulp.src("source/common/locales/**")
    .pipe(global.filterProperties(browserName)())
    .pipe(gulp.dest("build/" + browserName + "/_locales"));
};

global.buildOptions = function(browserName)
{
  return merge(
    gulp.src(["source/common/html/options/options.html", "source/common/html/options/syntax-highlight.html"])
      .pipe(global.filterProperties(browserName)())
      .pipe(gulp.dest("build/" + browserName + "/options")),
    gulp.src(["source/common/javascript/options/options.js", "source/common/javascript/options/syntax-highlight.js"])
      .pipe(global.filterProperties(browserName)())
      .pipe(gulp.dest("build/" + browserName + "/options/javascript")),
    gulp.src(["source/common/style-sheets/options/options.css", "source/common/style-sheets/options/syntax-highlight.css"])
      .pipe(global.filterProperties(browserName)())
      .pipe(gulp.dest("build/" + browserName + "/options")),
    gulp.src(["images/common/options.png", "images/common/options-2x.png"])
      .pipe(gulp.dest("build/" + browserName + "/options/images"))
  );
};

global.buildOverlay = function(browserName)
{
  return merge(
    gulp.src("source/common/html/overlay/overlay.html")
      .pipe(global.filterProperties(browserName)())
      .pipe(gulp.dest("build/" + browserName + "/overlay")),
    gulp.src(["source/common/javascript/overlay/*", "source/" + browserName + "/javascript/overlay/*"])
      .pipe(plugins.concat("overlay.js"))
      .pipe(global.filterProperties(browserName)())
      .pipe(gulp.dest("build/" + browserName + "/overlay/javascript")),
    gulp.src(["source/common/style-sheets/overlay/overlay.css", "source/" + browserName + "/style-sheets/overlay/overlay.css"])
      .pipe(plugins.concat("overlay.css"))
      .pipe(global.filterProperties(browserName)())
      .pipe(gulp.dest("build/" + browserName + "/overlay")),
    gulp.src(["images/common/feature.png", "images/common/feature-2x.png", "images/common/toolbar.png", "images/common/toolbar-2x.png"])
      .pipe(gulp.dest("build/" + browserName + "/overlay/images"))
  );
};

global.buildToolbars = function(browserName)
{
  return merge(
    gulp.src(["source/common/javascript/toolbar/color-picker.js", "source/common/javascript/toolbar/line-guides.js", "source/common/javascript/toolbar/ruler.js"])
      .pipe(global.filterProperties(browserName)())
      .pipe(plugins.footer("\nvoid(0);"))
      .pipe(gulp.dest("build/" + browserName + "/toolbar/javascript")),
    gulp.src(["source/common/style-sheets/toolbar/toolbar.css", "source/common/style-sheets/toolbar/color-picker.css"])
      .pipe(plugins.concat("color-picker.css"))
      .pipe(global.filterProperties(browserName)())
      .pipe(gulp.dest("build/" + browserName + "/toolbar")),
    gulp.src(["source/common/style-sheets/common/bootstrap/bootstrap.css", "source/common/style-sheets/common/common.css", "source/common/style-sheets/toolbar/common.css", "source/common/style-sheets/toolbar/color-picker-toolbar.css"])
      .pipe(plugins.concat("color-picker-toolbar.css"))
      .pipe(global.filterProperties(browserName)())
      .pipe(gulp.dest("build/" + browserName + "/toolbar")),
    gulp.src("source/common/style-sheets/toolbar/element-ancestors.css")
      .pipe(global.filterProperties(browserName)())
      .pipe(gulp.dest("build/" + browserName + "/toolbar")),
    gulp.src(["source/common/style-sheets/toolbar/toolbar.css", "source/common/style-sheets/toolbar/element-information.css"])
      .pipe(plugins.concat("element-information.css"))
      .pipe(global.filterProperties(browserName)())
      .pipe(gulp.dest("build/" + browserName + "/toolbar")),
    gulp.src(["source/common/style-sheets/toolbar/toolbar.css", "source/common/style-sheets/toolbar/line-guides.css"])
      .pipe(plugins.concat("line-guides.css"))
      .pipe(global.filterProperties(browserName)())
      .pipe(gulp.dest("build/" + browserName + "/toolbar")),
    gulp.src(["source/common/style-sheets/common/bootstrap/bootstrap.css", "source/common/style-sheets/common/common.css", "source/common/style-sheets/toolbar/common.css", "source/common/style-sheets/toolbar/line-guides.css"])
      .pipe(plugins.concat("line-guides-toolbar.css"))
      .pipe(global.filterProperties(browserName)())
      .pipe(gulp.dest("build/" + browserName + "/toolbar")),
    gulp.src(["source/common/style-sheets/toolbar/toolbar.css", "source/common/style-sheets/toolbar/ruler.css"])
      .pipe(plugins.concat("ruler.css"))
      .pipe(global.filterProperties(browserName)())
      .pipe(gulp.dest("build/" + browserName + "/toolbar")),
    gulp.src(["source/common/style-sheets/common/bootstrap/bootstrap.css", "source/common/style-sheets/common/common.css", "source/common/style-sheets/toolbar/common.css", "source/common/style-sheets/toolbar/ruler.css"])
      .pipe(plugins.concat("ruler-toolbar.css"))
      .pipe(global.filterProperties(browserName)())
      .pipe(gulp.dest("build/" + browserName + "/toolbar")),
    gulp.src("images/common/logos/monochrome/16.png")
      .pipe(plugins.rename("logo.png"))
      .pipe(gulp.dest("build/" + browserName + "/toolbar/images"))
  );
};
