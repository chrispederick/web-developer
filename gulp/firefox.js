"use strict";

global.firefoxOverlayMenus    = ["cookies", "css", "disable", "forms", "images", "information", "miscellaneous", "options", "outline", "resize", "tools", "view-source"];
global.firefoxOverlaySuffixes = ["app-menu", "context", "menu", "seamonkey", "toolbar", "toolbar-button"];
global.firefoxPackageName     = "web-developer-firefox.xpi";

var del         = require("del");
var fs          = require("fs");
var gulp        = require("gulp");
var merge       = require("merge-stream");
var plugins     = require("gulp-load-plugins")();
var runSequence = require("run-sequence");

global.buildFirefoxMenu = function(menu, suffix)
{
  return gulp.src("source/firefox/xul/overlay/menus/" + menu + ".xul")
    .pipe(plugins.rename(menu + "-" + suffix + ".xul"))
    .pipe(plugins.replace("${suffix}", suffix))
    .pipe(gulp.dest("build/firefox/overlay"));
};

gulp.task("build-firefox-about", function()
{
  return merge(
    gulp.src("source/common/html/about/about.html")
      .pipe(global.filterPropertiesTask("firefox")())
      .pipe(gulp.dest("build/firefox/content/web-developer/about")),
    gulp.src(["source/common/javascript/generated/common.js", "source/common/javascript/about/about.js"])
      .pipe(plugins.concat("about.js"))
      .pipe(gulp.dest("build/firefox/content/web-developer/about/javascript")),
    gulp.src("source/common/style-sheets/about/about.css")
      .pipe(global.filterPropertiesTask("firefox")())
      .pipe(gulp.dest("build/firefox/content/web-developer/about"))
  );
});

gulp.task("build-firefox-all", function(callback)
{
  runSequence([
    "build-firefox-about",
    "build-firefox-common",
    "build-firefox-configuration",
    "build-firefox-content",
    "build-firefox-dashboard",
    "build-firefox-dialogs",
    "build-firefox-features",
    "build-firefox-generated",
    "build-firefox-locales",
    "build-firefox-options",
    "build-firefox-overlay",
    "build-firefox-skins",
    "build-firefox-toolbars"
  ], callback);
});

gulp.task("build-firefox-common", function()
{
  return merge(
    gulp.src("source/common/javascript/common/bootstrap/*")
      .pipe(gulp.dest("build/firefox/content/web-developer/common/javascript/bootstrap")),
    gulp.src("source/common/javascript/common/codemirror/*")
      .pipe(gulp.dest("build/firefox/content/web-developer/common/javascript/codemirror")),
    gulp.src("source/common/javascript/common/jquery/*")
      .pipe(gulp.dest("build/firefox/content/web-developer/common/javascript/jquery")),
    gulp.src(["source/common/javascript/common/common.js", "source/firefox/javascript/common/common.js"])
      .pipe(plugins.concat("common.js"))
      .pipe(gulp.dest("build/firefox/content/web-developer/common/javascript")),
    gulp.src(["source/common/javascript/cookies/cookies.js", "source/firefox/javascript/cookies/cookies.js"])
      .pipe(plugins.concat("cookies.js"))
      .pipe(gulp.dest("build/firefox/content/web-developer/cookies")),
    gulp.src(["source/common/javascript/locales/locales.js", "source/firefox/javascript/locales/locales.js"])
      .pipe(plugins.concat("locales.js"))
      .pipe(gulp.dest("build/firefox/content/web-developer/locales")),
    gulp.src("source/firefox/javascript/preferences/defaults.js")
      .pipe(gulp.dest("build/firefox/defaults/preferences")),
    gulp.src("source/firefox/javascript/preferences/preferences.js")
      .pipe(gulp.dest("build/firefox/content/web-developer/preferences")),
    gulp.src(["source/common/javascript/storage/storage.js", "source/firefox/javascript/storage/storage.js"])
      .pipe(plugins.concat("storage.js"))
      .pipe(gulp.dest("build/firefox/content/web-developer/storage")),
    gulp.src(["source/common/javascript/toolbar/element-ancestors.js", "source/firefox/javascript/toolbar/element-ancestors.js"])
      .pipe(plugins.concat("element-ancestors.js"))
      .pipe(gulp.dest("build/firefox/content/web-developer/toolbar/javascript")),
    gulp.src(["source/common/javascript/toolbar/element-ancestors.js", "source/firefox/javascript/toolbar/element-ancestors.js"])
      .pipe(plugins.concat("element-ancestors.js"))
      .pipe(gulp.dest("build/firefox/content/web-developer/toolbar/javascript")),
    gulp.src(["source/common/style-sheets/common/bootstrap/bootstrap.css", "source/common/style-sheets/common/bootstrap/font-awesome.css"])
      .pipe(plugins.concat("bootstrap.css"))
      .pipe(plugins.replace("fonts/fontawesome-webfont", "../fonts/fontawesome-webfont"))
      .pipe(gulp.dest("build/firefox/content/web-developer/common/style-sheets")),
    gulp.src("source/common/style-sheets/generated/common.css")
      .pipe(plugins.rename("generated.css"))
      .pipe(global.filterPropertiesTask("firefox")())
      .pipe(gulp.dest("build/firefox/content/web-developer/common/style-sheets")),
    gulp.src(["source/common/style-sheets/common/codemirror/codemirror.css", "source/common/style-sheets/common/codemirror/theme.css"])
      .pipe(plugins.concat("syntax-highlight.css"))
      .pipe(gulp.dest("build/firefox/content/web-developer/common/style-sheets")),
    gulp.src(["images/common/logos/favicon.ico", "images/common/logos/16.png", "images/common/logos/48.png", "images/common/logos/64.png", "images/common/logos/128.png"])
      .pipe(gulp.dest("build/firefox/content/web-developer/common/images/logos")),
    gulp.src("source/common/fonts/*")
      .pipe(gulp.dest("build/firefox/content/web-developer/common/fonts"))
  );
});

gulp.task("build-firefox-configuration", function()
{
  return gulp.src(["configuration/firefox/chrome.manifest", "configuration/firefox/install.rdf"])
    .pipe(global.filterPropertiesTask("firefox")())
    .pipe(gulp.dest("build/firefox"));
});

gulp.task("build-firefox-content", function()
{
  return gulp.src(["source/common/javascript/common/common.js", "source/firefox/javascript/common/common.js", "source/common/javascript/common/css.js", "source/common/javascript/content/content.js", "source/firefox/javascript/content/content.js"])
    .pipe(plugins.concat("content.js"))
    .pipe(gulp.dest("build/firefox/content/web-developer/content"));
});

gulp.task("build-firefox-dashboard", function()
{
  return merge(
    gulp.src("source/firefox/html/dashboard/*")
      .pipe(global.filterPropertiesTask("firefox")())
      .pipe(gulp.dest("build/firefox/content/web-developer/dashboard")),
    gulp.src("source/firefox/xul/dashboard/*")
      .pipe(gulp.dest("build/firefox/content/web-developer/dashboard")),
    gulp.src(["source/common/javascript/dashboard/dashboard.js", "source/firefox/javascript/dashboard/dashboard.js"])
      .pipe(plugins.concat("dashboard.js"))
      .pipe(gulp.dest("build/firefox/content/web-developer/dashboard/javascript")),
    gulp.src(["source/common/javascript/dashboard/element-information.js", "source/firefox/javascript/dashboard/element-information.js"])
      .pipe(plugins.concat("element-information.js"))
      .pipe(gulp.dest("build/firefox/content/web-developer/dashboard/javascript")),
    gulp.src(["source/firefox/javascript/dashboard/edit-html.js", "source/firefox/javascript/dashboard/style-information.js"])
      .pipe(gulp.dest("build/firefox/content/web-developer/dashboard/javascript")),
    gulp.src(["source/common/javascript/dashboard/edit-css.js", "source/firefox/javascript/dashboard/edit-css.js"])
      .pipe(plugins.concat("edit-css.js"))
      .pipe(gulp.dest("build/firefox/content/web-developer/dashboard/javascript")),
    gulp.src(["source/common/javascript/toolbar/html/element-ancestors.js", "source/firefox/javascript/dashboard/html/*", "!source/firefox/javascript/dashboard/html/common.js"])
      .pipe(gulp.dest("build/firefox/content/web-developer/dashboard/javascript/html")),
    gulp.src(["source/common/javascript/generated/common.js", "source/firefox/javascript/dashboard/html/common.js"])
      .pipe(plugins.concat("common.js"))
      .pipe(gulp.dest("build/firefox/content/web-developer/dashboard/javascript/html")),
    gulp.src(["source/common/style-sheets/dashboard/common.css", "source/firefox/style-sheets/dashboard/html/common.css"])
      .pipe(plugins.concat("common.css"))
      .pipe(gulp.dest("build/firefox/content/web-developer/dashboard")),
    gulp.src("source/firefox/style-sheets/dashboard/dashboard.css")
      .pipe(gulp.dest("build/firefox/content/web-developer/dashboard")),
    gulp.src(["source/common/style-sheets/dashboard/element-information.css", "source/firefox/style-sheets/dashboard/html/element-information.css"])
      .pipe(plugins.concat("element-information.css"))
      .pipe(gulp.dest("build/firefox/content/web-developer/dashboard")),
    gulp.src(["source/common/style-sheets/generated/common.css", "source/firefox/style-sheets/dashboard/html/style-information.css"])
      .pipe(plugins.concat("style-information.css"))
      .pipe(gulp.dest("build/firefox/content/web-developer/dashboard"))
  );
});

gulp.task("build-firefox-dialogs", function()
{
  return merge(
    gulp.src("source/firefox/xul/dialogs/*")
      .pipe(gulp.dest("build/firefox/content/web-developer/dialogs")),
    gulp.src("source/firefox/javascript/dialogs/*")
      .pipe(gulp.dest("build/firefox/content/web-developer/dialogs/javascript")),
    gulp.src("source/firefox/style-sheets/dialogs/*")
      .pipe(gulp.dest("build/firefox/content/web-developer/dialogs/style-sheets"))
  );
});

gulp.task("build-firefox-features", function()
{
  return merge(
    gulp.src(["source/common/style-sheets/features/**", "source/firefox/style-sheets/features/**"])
      .pipe(gulp.dest("build/firefox/content/web-developer/features/style-sheets")),
    gulp.src("source/common/style-sheets/common/reset.css")
      .pipe(plugins.rename("disable-browser-default-styles.css"))
      .pipe(gulp.dest("build/firefox/content/web-developer/features/style-sheets/css")),
    gulp.src("images/common/transparent.png")
      .pipe(gulp.dest("build/firefox/content/web-developer/features/style-sheets/images")),
    gulp.src("source/firefox/html/validation/*")
      .pipe(global.filterPropertiesTask("firefox")())
      .pipe(gulp.dest("build/firefox/content/web-developer/validation"))
  );
});

gulp.task("build-firefox-generated", function()
{
  return merge(
    gulp.src(["source/common/html/generated/*", "source/common/style-sheets/generated/*", "source/firefox/html/generated/*", "source/firefox/style-sheets/generated/*", "!source/common/style-sheets/generated/common.css"])
      .pipe(global.filterPropertiesTask("firefox")())
      .pipe(gulp.dest("build/firefox/content/web-developer/generated")),
    gulp.src("source/common/javascript/generated/beautify/beautify.js")
      .pipe(gulp.dest("build/firefox/content/web-developer/generated/javascript/beautify")),
    gulp.src(["source/common/javascript/generated/*", "source/firefox/javascript/generated/*", "!source/common/javascript/generated/view-cookie-information.js"])
      .pipe(gulp.dest("build/firefox/content/web-developer/generated/javascript")),
    gulp.src(["source/common/javascript/generated/view-cookie-information.js", "source/firefox/javascript/preferences/preferences.js"])
      .pipe(plugins.concat("view-cookie-information.js"))
      .pipe(gulp.dest("build/firefox/content/web-developer/generated/javascript"))
  );
});

gulp.task("build-firefox-locales", function()
{
  return gulp.src("source/firefox/locales/**")
    .pipe(global.filterPropertiesTask("firefox")())
    .pipe(gulp.dest("build/firefox/locale"));
});

gulp.task("build-firefox-options", function()
{
  return merge(
    gulp.src("source/firefox/xul/options/**")
      .pipe(gulp.dest("build/firefox/content/web-developer/options")),
    gulp.src("source/common/html/options/syntax-highlight.html")
      .pipe(global.filterPropertiesTask("firefox")())
      .pipe(gulp.dest("build/firefox/content/web-developer/options/html")),
    gulp.src("source/firefox/javascript/options/options.js")
      .pipe(gulp.dest("build/firefox/content/web-developer/options/javascript")),
    gulp.src("source/firefox/javascript/options/dialogs/*")
      .pipe(gulp.dest("build/firefox/content/web-developer/options/dialogs/javascript")),
    gulp.src("source/common/javascript/options/syntax-highlight.js")
      .pipe(gulp.dest("build/firefox/content/web-developer/options/html/javascript")),
    gulp.src("source/firefox/style-sheets/options/options.css")
      .pipe(gulp.dest("build/firefox/content/web-developer/options/style-sheets")),
    gulp.src("source/common/style-sheets/options/syntax-highlight.css")
      .pipe(gulp.dest("build/firefox/content/web-developer/options/html"))
  );
});

gulp.task("build-firefox-overlay", function()
{
  var overlay = gulp.src("source/firefox/xul/overlay/overlay.xul");

  overlay.setMaxListeners(0);

  // Loop through the suffixes
  for(var i = 0, l = global.firefoxOverlaySuffixes.length; i < l; i++)
  {
    // Loop through the menus
    for(var j = 0, m = global.firefoxOverlayMenus.length; j < m; j++)
    {
      overlay.pipe(plugins.replace("${" + global.firefoxOverlaySuffixes[i].replace("-", ".") + "." + global.firefoxOverlayMenus[j].replace("-", ".") + "}", fs.readFileSync("build/firefox/overlay/" + global.firefoxOverlayMenus[j] + "-" + global.firefoxOverlaySuffixes[i] + ".xul", "utf8")));
    }
  }

  return merge(
    overlay.pipe(gulp.dest("build/firefox/content/web-developer/overlay")),
    gulp.src(["source/common/javascript/features/*", "source/common/javascript/overlay/*", "source/common/javascript/toolbar/*", "source/firefox/javascript/application/*", "source/firefox/javascript/features/*", "source/firefox/javascript/overlay/*", "source/firefox/javascript/toolbar/*", "source/firefox/javascript/upgrade/*", "source/firefox/javascript/validation/*", "!source/common/javascript/toolbar/html/*"])
      .pipe(plugins.concat("overlay.js"))
      .pipe(global.filterPropertiesTask("firefox")())
      .pipe(gulp.dest("build/firefox/content/web-developer/overlay/javascript")),
    gulp.src("source/firefox/style-sheets/overlay/overlay.css")
      .pipe(gulp.dest("build/firefox/content/web-developer/overlay/style-sheets"))
  );
});

gulp.task("build-firefox-menus", function()
{
  var menus = [];

  // Loop through the suffixes
  for(var i = 0, l = global.firefoxOverlaySuffixes.length; i < l; i++)
  {
    // Loop through the menus
    for(var j = 0, m = global.firefoxOverlayMenus.length; j < m; j++)
    {
      menus.push(global.buildFirefoxMenu(global.firefoxOverlayMenus[j], global.firefoxOverlaySuffixes[i]));
    }
  }

  return merge(menus);
});

gulp.task("build-firefox-skins", function()
{
  return merge(
    gulp.src("source/firefox/style-sheets/skin/common.css")
      .pipe(plugins.rename("web-developer.css"))
      .pipe(gulp.dest("build/firefox/skin/default")),
    gulp.src(["source/firefox/style-sheets/skin/common.css", "source/firefox/style-sheets/skin/mac.css"])
      .pipe(plugins.concat("web-developer.css"))
      .pipe(gulp.dest("build/firefox/skin/mac")),
    gulp.src("images/firefox/skins/**")
      .pipe(gulp.dest("build/firefox/skin")),
    gulp.src("images/common/logos/16.png")
      .pipe(plugins.rename("button.png"))
      .pipe(gulp.dest("build/firefox/skin/default")),
    gulp.src("images/common/logos/16.png")
      .pipe(plugins.rename("menu.png"))
      .pipe(gulp.dest("build/firefox/skin/default")),
    gulp.src("images/common/logos/16.png")
      .pipe(plugins.rename("button.png"))
      .pipe(gulp.dest("build/firefox/skin/mac/color")),
    gulp.src("images/common/logos/16.png")
      .pipe(plugins.rename("menu.png"))
      .pipe(gulp.dest("build/firefox/skin/mac/color")),
    gulp.src("images/common/logos/32.png")
      .pipe(plugins.rename("button-2x.png"))
      .pipe(gulp.dest("build/firefox/skin/default")),
    gulp.src("images/common/logos/32.png")
      .pipe(plugins.rename("menu-2x.png"))
      .pipe(gulp.dest("build/firefox/skin/default")),
    gulp.src("images/common/logos/32.png")
      .pipe(plugins.rename("button-2x.png"))
      .pipe(gulp.dest("build/firefox/skin/mac/color")),
    gulp.src("images/common/logos/32.png")
      .pipe(plugins.rename("menu-2x.png"))
      .pipe(gulp.dest("build/firefox/skin/mac/color")),
    gulp.src(["images/common/toolbar.png", "images/common/toolbar-2x.png"])
      .pipe(gulp.dest("build/firefox/skin/default")),
    gulp.src("images/common/logos/monochrome/16.png")
      .pipe(plugins.rename("button.png"))
      .pipe(gulp.dest("build/firefox/skin/mac")),
    gulp.src("images/common/logos/monochrome/32.png")
      .pipe(plugins.rename("button-2x.png"))
      .pipe(gulp.dest("build/firefox/skin/mac")),
    gulp.src(["images/common/toolbar.png", "images/common/toolbar-2x.png"])
      .pipe(gulp.dest("build/firefox/skin/mac/color")),
    gulp.src(["images/firefox/skins/default/options.png", "images/firefox/skins/default/options-2x.png"])
      .pipe(gulp.dest("build/firefox/skin/mac")),
    gulp.src(["images/firefox/skins/default/*", "!images/firefox/skins/default/options.png", "!images/firefox/skins/default/options-2x.png"])
      .pipe(gulp.dest("build/firefox/skin/mac/color"))
  );
});

gulp.task("build-firefox-toolbars", function()
{
  return merge(
    gulp.src("source/firefox/html/toolbar/element-ancestors.html")
      .pipe(global.filterPropertiesTask("firefox")())
      .pipe(gulp.dest("build/firefox/content/web-developer/toolbar/html")),
    gulp.src(["source/common/javascript/generated/common.js", "source/common/javascript/toolbar/html/element-ancestors.js"])
      .pipe(plugins.concat("element-ancestors.js"))
      .pipe(gulp.dest("build/firefox/content/web-developer/toolbar/html/javascript")),
    gulp.src("source/common/style-sheets/toolbar/element-ancestors.css")
      .pipe(gulp.dest("build/firefox/content/web-developer/toolbar/html")),
    gulp.src("source/common/style-sheets/toolbar/**")
      .pipe(gulp.dest("build/firefox/content/web-developer/toolbar"))
  );
});

gulp.task("clean-firefox", function()
{
  return del(["build/firefox", "build/firefox.properties", "build/" + global.firefoxPackageName]);
});

gulp.task("clean-firefox-menus", function()
{
  return del("build/firefox/overlay");
});

gulp.task("initialize-firefox-build", function(callback)
{
  global.initializeBuild("firefox", callback);
});

gulp.task("package-firefox", function()
{
  return global.packageTask("firefox", global.firefoxPackageName);
});

gulp.task("build-firefox", function(callback) { runSequence("initialize-firefox-build", "build-firefox-menus", "build-firefox-all", "clean-firefox-menus", callback); });
gulp.task("firefox", function(callback) { runSequence("build-firefox", "package-firefox", callback); });
