var WebDeveloper = WebDeveloper || {};

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
    chrome.extension.getBackgroundPage().WebDeveloper.Background.openGeneratedTab(chrome.extension.getURL("about/about.html"), tab.index, null, WebDeveloper.Overlay.Options.getAboutLocale());
  });
};

// Opens the options
WebDeveloper.Overlay.Options.options = function()
{
  WebDeveloper.Overlay.openTab(chrome.extension.getURL("options/options.html"));
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
