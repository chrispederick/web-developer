var WebDeveloper = WebDeveloper || {}; // eslint-disable-line no-redeclare, no-use-before-define

WebDeveloper.Overlay         = WebDeveloper.Overlay || {};
WebDeveloper.Overlay.Options = WebDeveloper.Overlay.Options || {};

// Opens the about page
WebDeveloper.Overlay.Options.about = function()
{
  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    chrome.tabs.create({ index: tab.index + 1, url: chrome.runtime.getURL("/about/about.html") });
    WebDeveloper.Overlay.close();
  });
};

// Initializes the options overlay
WebDeveloper.Overlay.Options.initialize = function()
{
  var aboutMenu     = document.getElementById("about");
  var helpMenu      = document.getElementById("help");
  var optionsMenu   = document.getElementById("options");
  var resetPageMenu = document.getElementById("reset-page");

  aboutMenu.append(WebDeveloper.Locales.getString("aboutMenu"));
  helpMenu.append(WebDeveloper.Locales.getString("help"));
  optionsMenu.append(WebDeveloper.Locales.getString("optionsMenu"));
  resetPageMenu.append(WebDeveloper.Locales.getString("resetPage"));

  aboutMenu.addEventListener("click", WebDeveloper.Overlay.Options.about);
  optionsMenu.addEventListener("click", WebDeveloper.Overlay.Options.options);
  resetPageMenu.addEventListener("click", WebDeveloper.Overlay.Options.resetPage);
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
    WebDeveloper.Overlay.addScriptToTab(tab, function() { window.location.reload(); }, function()
    {
      WebDeveloper.Overlay.close();
    });
  });
};

// If the document is still loading
if(document.readyState === "loading")
{
  document.addEventListener("DOMContentLoaded", WebDeveloper.Overlay.Options.initialize);
}
else
{
  WebDeveloper.Overlay.Options.initialize();
}
