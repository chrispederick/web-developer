"use strict";

var gulp    = require("gulp");
var merge   = require("merge-stream");
var plugins = require("gulp-load-plugins")();

global.chromiumAboutTask = function(browserName)
{
  return merge(
    gulp.src("source/common/html/about/about.html")
      .pipe(global.filterPropertiesTask(browserName)())
      .pipe(gulp.dest("build/" + browserName + "/about")),
    gulp.src("source/common/javascript/about/about.js")
      .pipe(gulp.dest("build/" + browserName + "/about/javascript")),
    gulp.src("source/common/style-sheets/about/about.css")
      .pipe(global.filterPropertiesTask(browserName)())
      .pipe(gulp.dest("build/" + browserName + "/about"))
  );
};

global.chromiumAllTask = function(browserName)
{
  return merge(
    global.chromiumAboutTask(browserName),
    global.chromiumBackgroundTask(browserName),
    global.chromiumCommonTask(browserName),
    global.chromiumConfigurationTask(browserName),
    global.chromiumContentTask(browserName),
    global.chromiumDashboardTask(browserName),
    global.chromiumFeaturesTask(browserName),
    global.chromiumGeneratedTask(browserName),
    global.chromiumLocalesTask(browserName),
    global.chromiumOptionsTask(browserName),
    global.chromiumOverlayTask(browserName),
    global.chromiumToolbarsTask(browserName)
  );
};

global.chromiumBackgroundTask = function(browserName)
{
  return merge(
    gulp.src("source/chrome/html/background/background.html")
      .pipe(global.filterPropertiesTask(browserName)())
      .pipe(gulp.dest("build/" + browserName + "/background")),
    gulp.src("source/chrome/javascript/background/background.js")
      .pipe(gulp.dest("build/" + browserName + "/background/javascript"))
  );
};

global.chromiumCommonTask = function(browserName)
{
  return merge(
    gulp.src("source/common/javascript/common/bootstrap/*")
      .pipe(gulp.dest("build/" + browserName + "/common/javascript/bootstrap")),
    gulp.src("source/common/javascript/common/codemirror/*")
      .pipe(gulp.dest("build/" + browserName + "/common/javascript/codemirror")),
    gulp.src(["source/common/javascript/common/jquery/*", "source/chrome/javascript/common/jquery/*"])
      .pipe(gulp.dest("build/" + browserName + "/common/javascript/jquery")),
    gulp.src(["source/common/javascript/common/common.js", "source/chrome/javascript/common/common.js"])
      .pipe(plugins.concat("common.js"))
      .pipe(gulp.dest("build/" + browserName + "/common/javascript")),
    gulp.src("source/common/javascript/common/css.js")
      .pipe(gulp.dest("build/" + browserName + "/common/javascript")),
    gulp.src(["source/common/javascript/cookies/cookies.js", "source/chrome/javascript/cookies/cookies.js"])
      .pipe(plugins.concat("cookies.js"))
      .pipe(gulp.dest("build/" + browserName + "/cookies")),
    gulp.src(["source/common/javascript/locales/locales.js", "source/chrome/javascript/locales/locales.js"])
      .pipe(plugins.concat("locales.js"))
      .pipe(gulp.dest("build/" + browserName + "/locales")),
    gulp.src(["source/common/javascript/storage/storage.js", "source/chrome/javascript/storage/storage.js"])
      .pipe(plugins.concat("storage.js"))
      .pipe(global.filterPropertiesTask(browserName)())
      .pipe(gulp.dest("build/" + browserName + "/storage")),
    gulp.src("source/chrome/javascript/upgrade/upgrade.js")
      .pipe(global.filterPropertiesTask(browserName)())
      .pipe(gulp.dest("build/" + browserName + "/upgrade")),
    gulp.src(["source/common/style-sheets/common/bootstrap/bootstrap.css", "source/common/style-sheets/common/bootstrap/font-awesome.css"])
      .pipe(plugins.concat("bootstrap.css"))
      .pipe(plugins.replace("fonts/fontawesome-webfont", "../fonts/fontawesome-webfont"))
      .pipe(gulp.dest("build/" + browserName + "/common/style-sheets")),
    gulp.src("source/common/style-sheets/generated/common.css")
      .pipe(plugins.rename("generated.css"))
      .pipe(global.filterPropertiesTask(browserName)())
      .pipe(gulp.dest("build/" + browserName + "/common/style-sheets")),
    gulp.src(["source/common/style-sheets/common/codemirror/codemirror.css", "source/common/style-sheets/common/codemirror/theme.css"])
      .pipe(plugins.concat("syntax-highlight.css"))
      .pipe(gulp.dest("build/" + browserName + "/common/style-sheets")),
    gulp.src(["images/common/logos/favicon.ico", "images/common/logos/16.png", "images/common/logos/32.png", "images/common/logos/48.png", "images/common/logos/64.png", "images/common/logos/128.png"])
      .pipe(gulp.dest("build/" + browserName + "/common/images/logos")),
    gulp.src("source/common/fonts/*")
      .pipe(gulp.dest("build/" + browserName + "/common/fonts"))
  );
};

global.chromiumConfigurationTask = function(browserName)
{
  return gulp.src("configuration/" + browserName + "/manifest.json")
    .pipe(global.filterPropertiesTask(browserName)())
    .pipe(gulp.dest("build/" + browserName));
};

global.chromiumContentTask = function(browserName)
{
  return gulp.src(["source/common/javascript/common/common.js", "source/chrome/javascript/common/common.js", "source/common/javascript/common/css.js", "source/common/javascript/content/content.js", "source/chrome/javascript/content/content.js"])
    .pipe(plugins.concat("content.js"))
    .pipe(gulp.dest("build/" + browserName + "/content"));
};

global.chromiumDashboardTask = function(browserName)
{
  return merge(
    gulp.src(["source/common/javascript/toolbar/html/element-ancestors.js", "source/chrome/javascript/dashboard/common.js"])
      .pipe(plugins.concat("dashboard.js"))
      .pipe(gulp.dest("build/" + browserName + "/dashboard/javascript/html")),
    gulp.src(["source/common/javascript/common/common.js", "source/chrome/javascript/common/common.js", "source/common/javascript/dashboard/dashboard.js", "source/chrome/javascript/dashboard/dashboard.js", "source/common/javascript/dashboard/element-information.js", "source/chrome/javascript/dashboard/element-information.js", "source/common/javascript/dashboard/edit-css.js", "source/chrome/javascript/dashboard/edit-css.js", "source/common/javascript/toolbar/element-ancestors.js", "source/chrome/javascript/toolbar/element-ancestors.js"])
      .pipe(plugins.concat("dashboard.js"))
      .pipe(global.filterPropertiesTask(browserName)())
      .pipe(gulp.dest("build/" + browserName + "/dashboard/javascript")),
    gulp.src("source/chrome/style-sheets/dashboard/dashboard.css")
      .pipe(gulp.dest("build/" + browserName + "/dashboard/style-sheets")),
    gulp.src(["source/common/style-sheets/common/bootstrap/bootstrap.css", "source/common/style-sheets/dashboard/common.css", "source/common/style-sheets/dashboard/element-information.css", "source/chrome/style-sheets/dashboard/common.css"])
      .pipe(plugins.concat("common.css"))
      .pipe(global.filterPropertiesTask(browserName)())
      .pipe(gulp.dest("build/" + browserName + "/dashboard/style-sheets")),
    gulp.src("images/common/logos/monochrome/16.png")
      .pipe(plugins.rename("logo.png"))
      .pipe(gulp.dest("build/" + browserName + "/dashboard/images"))
  );
};

global.chromiumFeaturesTask = function(browserName)
{
  return merge(
    gulp.src(["source/common/javascript/common/common.js", "source/chrome/javascript/features/common.js", "source/common/javascript/common/css.js", "source/common/javascript/features/css.js"])
      .pipe(plugins.concat("css.js"))
      .pipe(gulp.dest("build/" + browserName + "/features/javascript")),
    gulp.src(["source/common/javascript/common/common.js", "source/chrome/javascript/features/common.js", "source/common/javascript/features/forms.js"])
      .pipe(plugins.concat("forms.js"))
      .pipe(global.filterPropertiesTask(browserName)())
      .pipe(gulp.dest("build/" + browserName + "/features/javascript")),
    gulp.src(["source/common/javascript/common/common.js", "source/chrome/javascript/features/common.js", "source/common/javascript/features/images.js"])
      .pipe(plugins.concat("images.js"))
      .pipe(gulp.dest("build/" + browserName + "/features/javascript")),
    gulp.src(["source/common/javascript/common/common.js", "source/chrome/javascript/features/common.js", "source/common/javascript/features/information.js"])
      .pipe(plugins.concat("information.js"))
      .pipe(gulp.dest("build/" + browserName + "/features/javascript")),
    gulp.src(["source/common/javascript/common/common.js", "source/chrome/javascript/features/common.js", "source/common/javascript/features/miscellaneous.js"])
      .pipe(plugins.concat("miscellaneous.js"))
      .pipe(gulp.dest("build/" + browserName + "/features/javascript")),
    gulp.src(["source/common/javascript/common/common.js", "source/chrome/javascript/features/common.js", "source/common/javascript/features/outline.js"])
      .pipe(plugins.concat("outline.js"))
      .pipe(gulp.dest("build/" + browserName + "/features/javascript")),
    gulp.src("source/common/style-sheets/features/**")
      .pipe(gulp.dest("build/" + browserName + "/features/style-sheets")),
    gulp.src("source/common/style-sheets/common/reset.css")
      .pipe(plugins.rename("disable-browser-default-styles.css"))
      .pipe(gulp.dest("build/" + browserName + "/features/style-sheets/css")),
    gulp.src("images/common/transparent.png")
      .pipe(gulp.dest("build/" + browserName + "/features/style-sheets/images")),
    gulp.src("source/chrome/html/validation/*")
      .pipe(global.filterPropertiesTask(browserName)())
      .pipe(gulp.dest("build/" + browserName + "/validation")),
    gulp.src("source/chrome/javascript/validation/*")
      .pipe(gulp.dest("build/" + browserName + "/validation/javascript"))
  );
};

global.chromiumGeneratedTask = function(browserName)
{
  return merge(
    gulp.src(["source/common/html/generated/*", "source/common/style-sheets/generated/*", "!source/common/style-sheets/generated/common.css"])
      .pipe(global.filterPropertiesTask(browserName)())
      .pipe(gulp.dest("build/" + browserName + "/generated")),
    gulp.src("source/common/javascript/generated/**")
      .pipe(gulp.dest("build/" + browserName + "/generated/javascript"))
  );
};

global.chromiumLocalesTask = function(browserName)
{
  return gulp.src("source/chrome/locales/**")
    .pipe(global.filterPropertiesTask(browserName)())
    .pipe(gulp.dest("build/" + browserName + "/_locales"));
};

global.chromiumOptionsTask = function(browserName)
{
  return merge(
    gulp.src(["source/common/html/options/syntax-highlight.html", "source/chrome/html/options/options.html"])
      .pipe(global.filterPropertiesTask(browserName)())
      .pipe(gulp.dest("build/" + browserName + "/options")),
    gulp.src(["source/chrome/javascript/options/options.js", "source/common/javascript/options/syntax-highlight.js"])
      .pipe(gulp.dest("build/" + browserName + "/options/javascript")),
    gulp.src(["source/chrome/style-sheets/options/options.css", "source/common/style-sheets/options/syntax-highlight.css"])
      .pipe(global.filterPropertiesTask(browserName)())
      .pipe(gulp.dest("build/" + browserName + "/options")),
    gulp.src(["images/chrome/options.png", "images/chrome/options-2x.png"])
      .pipe(gulp.dest("build/" + browserName + "/options/images"))
  );
};

global.chromiumOverlayTask = function(browserName)
{
  return merge(
    gulp.src("source/chrome/html/overlay/overlay.html")
      .pipe(global.filterPropertiesTask(browserName)())
      .pipe(gulp.dest("build/" + browserName + "/overlay")),
    gulp.src(["source/common/javascript/overlay/*", "source/chrome/javascript/overlay/overlay.js", "source/chrome/javascript/overlay/*"])
      .pipe(plugins.concat("overlay.js"))
      .pipe(gulp.dest("build/" + browserName + "/overlay/javascript")),
    gulp.src("source/chrome/style-sheets/overlay/overlay.css")
      .pipe(gulp.dest("build/" + browserName + "/overlay")),
    gulp.src(["images/common/toolbar.png", "images/common/toolbar-2x.png", "images/chrome/feature.png", "images/chrome/feature-2x.png", "images/chrome/icon.png", "images/chrome/icon-2x.png", "images/chrome/icon-color.png", "images/chrome/icon-color-2x.png"])
      .pipe(gulp.dest("build/" + browserName + "/overlay/images"))
  );
};

global.chromiumToolbarsTask = function(browserName)
{
  return merge(
    gulp.src("source/chrome/javascript/toolbar/color-picker.js")
      .pipe(global.filterPropertiesTask(browserName)())
      .pipe(gulp.dest("build/" + browserName + "/toolbar/javascript")),
    gulp.src(["source/common/javascript/toolbar/line-guides.js", "source/chrome/javascript/toolbar/line-guides.js"])
      .pipe(plugins.concat("line-guides.js"))
      .pipe(gulp.dest("build/" + browserName + "/toolbar/javascript")),
    gulp.src(["source/common/javascript/toolbar/ruler.js", "source/chrome/javascript/toolbar/ruler.js"])
      .pipe(plugins.concat("ruler.js"))
      .pipe(gulp.dest("build/" + browserName + "/toolbar/javascript")),
    gulp.src(["source/chrome/style-sheets/toolbar/toolbar.css", "source/chrome/style-sheets/toolbar/color-picker.css"])
      .pipe(plugins.concat("color-picker.css"))
      .pipe(gulp.dest("build/" + browserName + "/toolbar")),
    gulp.src(["source/common/style-sheets/common/bootstrap/bootstrap.css", "source/common/style-sheets/common/common.css", "source/chrome/style-sheets/toolbar/common.css", "source/chrome/style-sheets/toolbar/color-picker-toolbar.css"])
      .pipe(plugins.concat("color-picker-toolbar.css"))
      .pipe(gulp.dest("build/" + browserName + "/toolbar")),
    gulp.src("source/common/style-sheets/toolbar/element-ancestors.css")
      .pipe(gulp.dest("build/" + browserName + "/toolbar")),
    gulp.src(["source/chrome/style-sheets/toolbar/toolbar.css", "source/common/style-sheets/toolbar/element-information.css", "source/chrome/style-sheets/toolbar/element-information.css"])
      .pipe(plugins.concat("element-information.css"))
      .pipe(gulp.dest("build/" + browserName + "/toolbar")),
    gulp.src(["source/chrome/style-sheets/toolbar/toolbar.css", "source/common/style-sheets/toolbar/line-guides.css"])
      .pipe(plugins.concat("line-guides.css"))
      .pipe(gulp.dest("build/" + browserName + "/toolbar")),
    gulp.src(["source/common/style-sheets/common/bootstrap/bootstrap.css", "source/common/style-sheets/common/common.css", "source/chrome/style-sheets/toolbar/common.css", "source/chrome/style-sheets/toolbar/line-guides.css"])
      .pipe(plugins.concat("line-guides-toolbar.css"))
      .pipe(gulp.dest("build/" + browserName + "/toolbar")),
    gulp.src(["source/chrome/style-sheets/toolbar/toolbar.css", "source/common/style-sheets/toolbar/ruler.css"])
      .pipe(plugins.concat("ruler.css"))
      .pipe(gulp.dest("build/" + browserName + "/toolbar")),
    gulp.src(["source/common/style-sheets/common/bootstrap/bootstrap.css", "source/common/style-sheets/common/common.css", "source/chrome/style-sheets/toolbar/common.css", "source/chrome/style-sheets/toolbar/ruler.css"])
      .pipe(plugins.concat("ruler-toolbar.css"))
      .pipe(gulp.dest("build/" + browserName + "/toolbar")),
    gulp.src("images/common/logos/monochrome/16.png")
      .pipe(plugins.rename("logo.png"))
      .pipe(gulp.dest("build/" + browserName + "/toolbar/images"))
  );
};
