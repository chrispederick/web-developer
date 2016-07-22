var WebDeveloper = WebDeveloper || {}; // eslint-disable-line no-use-before-define

WebDeveloper.ResponsiveLayout = WebDeveloper.ResponsiveLayout || {};

// Handles the responsive layout dialog being accepted
WebDeveloper.ResponsiveLayout.accept = function()
{
  // If adding the responsive option
  if(window.arguments[0][0] == "add")
  {
    WebDeveloper.Preferences.setExtensionIntegerPreference("responsive.layout.count", window.arguments[0][1] + 1);
  }

  // If the extension is not running on a Mac
  if(!WebDeveloper.Common.isMac())
  {
    document.getElementById("web-developer-responsive-layout-dialog-pane").writePreferences();
  }
};

// Initializes the responsive layout dialog
WebDeveloper.ResponsiveLayout.initialize = function()
{
  var position    = window.arguments[0][1] + 1;
  var preferences = document.getElementById("web-developer-responsive-layout-preferences");

  WebDeveloper.Dialog.addPreference("webdeveloper.responsive.layout.description", "extensions.webdeveloper.responsive.layout." + position + ".description", "wstring", preferences);
  WebDeveloper.Dialog.addPreference("webdeveloper.responsive.layout.height", "extensions.webdeveloper.responsive.layout." + position + ".height", "int", preferences);
  WebDeveloper.Dialog.addPreference("webdeveloper.responsive.layout.width", "extensions.webdeveloper.responsive.layout." + position + ".width", "int", preferences);
};
