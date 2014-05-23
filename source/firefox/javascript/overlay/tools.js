var WebDeveloper = WebDeveloper || {};

WebDeveloper.Overlay       = WebDeveloper.Overlay || {};
WebDeveloper.Overlay.Tools = WebDeveloper.Overlay.Tools || {};

// Displays a page validation toolbar
WebDeveloper.Overlay.Tools.displayPageValidation = function(element)
{
  var featureId = WebDeveloper.Common.getFeatureId(element.getAttribute("id"));

  WebDeveloper.PageValidation.displayPageValidation(!WebDeveloper.Storage.isFeatureActive(featureId));
  WebDeveloper.Storage.toggleFeature(featureId);
};

// Returns true if the DOM Inspector chrome is available
WebDeveloper.Overlay.Tools.isDOMInspectorChromeAvailable = function()
{
  // If the inspectDOMDocument method is available
  if(typeof inspectDOMDocument == "function")
  {
    return true;
  }

  return false;
};

// Loads the given application with the given URL
WebDeveloper.Overlay.Tools.loadApplicationWithURL = function(application, url)
{
  // If the application and URL are set
  if(application && url)
  {
    application = new WebDeveloperApplication(application);

    application.launchWithURL(url);
  }
};

// Opens the DOM Inspector
WebDeveloper.Overlay.Tools.openDOMInspector = function()
{
  // If the DOM Inspector and chrome is available
  if(WebDeveloper.Overlay.isDOMInspectorAvailable() && WebDeveloper.Overlay.Tools.isDOMInspectorChromeAvailable())
  {
    inspectDOMDocument(WebDeveloper.Common.getContentDocument());
  }
  else
  {
    WebDeveloper.Common.displayURLMessage(WebDeveloper.Locales.getString("domInspectorRequired"), "@url@/faq/#dom-inspector");
  }
};

// Updates the tools menu
WebDeveloper.Overlay.Tools.updateToolsMenu = function(menu, suffix)
{
  var description    = null;
  var key            = null;
  var menuItem       = null;
  var modifiers      = null;
  var path           = null;
  var toolsSeparator = menu.getElementsByAttribute("id", "web-developer-tools-separator1-" + suffix)[0];
  var url            = null;

  WebDeveloper.Overlay.removeGeneratedMenuItems(menu);

  // Loop through the possible tools
  for(var i = 1, l = WebDeveloper.Preferences.getExtensionIntegerPreference("tool.count"); i <= l; i++)
  {
    // If this is a separator
    if(WebDeveloper.Preferences.getExtensionBooleanPreference("tool." + i + ".separator"))
    {
      menuItem = document.createElement("menuseparator");

      menuItem.setAttribute("class", "web-developer-generated-menu");
      menu.insertBefore(menuItem, toolsSeparator);
    }
    else
    {
      description = WebDeveloper.Preferences.getLocalizedPreference("tool." + i + ".description");
      path        = WebDeveloper.Preferences.getExtensionStringPreference("tool." + i + ".path");
      url         = WebDeveloper.Preferences.getExtensionStringPreference("tool." + i + ".url");

      // If the description and either a path or url are set
      if((description && (path || url)))
      {
        key       = WebDeveloper.Preferences.getExtensionStringPreference("tool." + i + ".key");
        menuItem  = document.createElement("menuitem");
        modifiers = WebDeveloper.Preferences.getExtensionStringPreference("tool." + i + ".modifiers");

        menuItem.setAttribute("class", "web-developer-generated-menu");
        menuItem.setAttribute("label", description);

        // If the path is set
        if(path)
        {
          menuItem.setAttribute("oncommand", "WebDeveloper.Overlay.Tools.loadApplicationWithURL('" + path.replace(/\\/gi, "\\\\") + "', WebDeveloper.Common.getTabBrowser().currentURI.spec)");
        }
        else
        {
          menuItem.setAttribute("oncommand", "WebDeveloper.Common.openURL('" + url + "' + encodeURIComponent(WebDeveloper.Common.getTabBrowser().currentURI.spec))");
        }

        // If a key and modifiers are set
        if(key && modifiers)
        {
          menuItem.setAttribute("key", "web-developer-tools-" + i + "-key");
        }

        menu.insertBefore(menuItem, toolsSeparator);
      }
    }
  }

  menuItem = document.getElementById("web-developer-dom-inspector-" + suffix);

  // If the menu exists
  if(menuItem)
  {
    // If the DOM Inspector or chrome is not available
    if(!WebDeveloper.Overlay.isDOMInspectorAvailable() || !WebDeveloper.Overlay.Tools.isDOMInspectorChromeAvailable())
    {
      menuItem.setAttribute("class", "menuitem-iconic");
    }
    else if(menuItem.hasAttribute("class"))
    {
      menuItem.removeAttribute("class");
    }
  }

  WebDeveloper.Common.configureElement(document.getElementById("web-developer-display-page-validation-command"), "checked", !document.getElementById("web-developer-page-validation-toolbar").hidden);
};

// Validates local CSS
WebDeveloper.Overlay.Tools.validateLocalCSS = function()
{
  new WebDeveloperValidateCSS().validateCSS(WebDeveloper.Common.getTabBrowser().currentURI, WebDeveloper.Content.getCSS());
};

// Validates a local HTML file
WebDeveloper.Overlay.Tools.validateLocalHTML = function()
{
  new WebDeveloperValidateHTML().validateHTML(WebDeveloper.Common.getTabBrowser().currentURI, WebDeveloper.Common.getContentWindow());
};
