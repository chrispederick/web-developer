var WebDeveloper = WebDeveloper || {}; // eslint-disable-line no-use-before-define

WebDeveloper.Overlay         = WebDeveloper.Overlay || {};
WebDeveloper.Overlay.Options = WebDeveloper.Overlay.Options || {};

$(function()
{
  $("#about").append(WebDeveloper.Locales.getString("aboutMenu")).on("click", WebDeveloper.Overlay.Options.about);
  $("#help").append(WebDeveloper.Locales.getString("help")).on("click", WebDeveloper.Overlay.openURL);
  $("#options").append(WebDeveloper.Locales.getString("optionsMenu")).on("click", WebDeveloper.Overlay.Options.options);
  $("#reset-page").append(WebDeveloper.Locales.getString("resetPage")).on("click", WebDeveloper.Overlay.Options.resetPage);
});

// Opens the about page
WebDeveloper.Overlay.Options.about = function()
{
  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    chrome.extension.getBackgroundPage().WebDeveloper.Background.openGeneratedTab(chrome.extension.getURL("/about/about.html"), tab.index, null, WebDeveloper.Overlay.Options.getAboutLocale());
    WebDeveloper.Overlay.close();
  });
};

// Returns the locale for the about feature
WebDeveloper.Overlay.Options.getAboutLocale = function()
{
  var locale = {};

  locale.about                = WebDeveloper.Locales.getString("about");
  locale.author               = WebDeveloper.Locales.getString("author");
  locale.buildDate            = WebDeveloper.Locales.getString("buildDate");
  locale.extensionDescription = WebDeveloper.Locales.getString("extensionDescription");
  locale.extensionName        = WebDeveloper.Locales.getString("extensionName");
  locale.followOnTwitter      = WebDeveloper.Locales.getString("followOnTwitter");
  locale.version              = WebDeveloper.Locales.getString("version");

  return locale;
};

// Opens the options
WebDeveloper.Overlay.Options.options = function()
{
  chrome.runtime.openOptionsPage();
  WebDeveloper.Overlay.close();
};

// Resets the page
WebDeveloper.Overlay.Options.resetPage = function()
{
  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    WebDeveloper.Overlay.addScriptToTab(tab, { code: "window.location.reload();" }, function()
    {
      WebDeveloper.Overlay.close();
    });
  });
};
