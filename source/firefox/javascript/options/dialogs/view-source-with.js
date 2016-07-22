var WebDeveloper = WebDeveloper || {}; // eslint-disable-line no-use-before-define

WebDeveloper.ViewSourceWith = WebDeveloper.ViewSourceWith || {};

// Handles the view source with dialog being accepted
WebDeveloper.ViewSourceWith.accept = function()
{
  // If adding the tool
  if(window.arguments[0][0] == "add")
  {
    WebDeveloper.Preferences.setExtensionIntegerPreference("view.source.with.count", window.arguments[0][1] + 1);
  }

  // If the extension is not running on a Mac
  if(!WebDeveloper.Common.isMac())
  {
    document.getElementById("web-developer-view-source-with-dialog-pane").writePreferences();
  }
};

// Open a dialog to choose an application
WebDeveloper.ViewSourceWith.chooseApplication = function()
{
  var filePicker = Components.classes["@mozilla.org/filepicker;1"].createInstance(Components.interfaces.nsIFilePicker);

  filePicker.init(window, WebDeveloper.Locales.getString("chooseApplication"), filePicker.modeOpen);
  filePicker.appendFilters(filePicker.filterApps);

  // If the user selected an application
  if(filePicker.show() == filePicker.returnOK)
  {
    var applicationPath = filePicker.file.path;
    var executable      = Components.classes["@mozilla.org/file/local;1"].createInstance(Components.interfaces.nsILocalFile);

    executable.initWithPath(applicationPath);

    // If the executable exists and is executable
    if(executable.exists() && executable.isExecutable())
    {
      var viewSourceWithPath = document.getElementById("web-developer-view-source-with-path");

      viewSourceWithPath.value = applicationPath;

      document.getElementById("web-developer-view-source-with-dialog-pane").userChangedValue(viewSourceWithPath);
    }
    else
    {
      WebDeveloper.Common.displayError(WebDeveloper.Locales.getString("chooseApplication"), WebDeveloper.Locales.getFormattedString("invalidApplication", [applicationPath]));
    }
  }
};

// Initializes the view source with dialog
WebDeveloper.ViewSourceWith.initialize = function()
{
  var position    = window.arguments[0][1] + 1;
  var preferences = document.getElementById("web-developer-view-source-with-preferences");

  WebDeveloper.Dialog.addPreference("webdeveloper.view.source.with.description", "extensions.webdeveloper.view.source.with." + position + ".description", "unichar", preferences);
  WebDeveloper.Dialog.addPreference("webdeveloper.view.source.with.key", "extensions.webdeveloper.view.source.with." + position + ".key", "unichar", preferences);
  WebDeveloper.Dialog.addPreference("webdeveloper.view.source.with.modifiers", "extensions.webdeveloper.view.source.with." + position + ".modifiers", "unichar", preferences);
  WebDeveloper.Dialog.addPreference("webdeveloper.view.source.with.path", "extensions.webdeveloper.view.source.with." + position + ".path", "unichar", preferences);

  document.getElementById("web-developer-view-source-with-alt-shift").setAttribute("label", WebDeveloper.Locales.getString("VK_ALT", "web-developer-platform-keys") + WebDeveloper.Locales.getString("MODIFIER_SEPARATOR", "web-developer-platform-keys") + WebDeveloper.Locales.getString("VK_SHIFT", "web-developer-platform-keys"));
  document.getElementById("web-developer-view-source-with-control-shift").setAttribute("label", WebDeveloper.Locales.getString("VK_CONTROL", "web-developer-platform-keys") + WebDeveloper.Locales.getString("MODIFIER_SEPARATOR", "web-developer-platform-keys") + WebDeveloper.Locales.getString("VK_SHIFT", "web-developer-platform-keys"));
  document.getElementById("web-developer-view-source-with-meta-shift").setAttribute("label", WebDeveloper.Locales.getString("VK_META", "web-developer-platform-keys") + WebDeveloper.Locales.getString("MODIFIER_SEPARATOR", "web-developer-platform-keys") + WebDeveloper.Locales.getString("VK_SHIFT", "web-developer-platform-keys"));
};
