var WebDeveloper = WebDeveloper || {}; // eslint-disable-line no-use-before-define

WebDeveloper.Overlay         = WebDeveloper.Overlay || {};
WebDeveloper.Overlay.Options = WebDeveloper.Overlay.Options || {};

// Displays the about page
WebDeveloper.Overlay.Options.about = function()
{
  WebDeveloper.Overlay.openGeneratedTab(WebDeveloper.Common.getChromeURL("about/about.html"), null, WebDeveloper.Overlay.Options.getAboutLocale());
};

WebDeveloper.Overlay.Options.generateCommandMenu = function(commandId)
{
  var command  = document.getElementById(commandId);
  var menuItem = null;

  // If the command is set
  if(command)
  {
    menuItem = document.createElement("menuitem");

    menuItem.setAttribute("class", "web-developer-generated-menu");
    menuItem.setAttribute("label", command.getAttribute("label"));
    menuItem.setAttribute("command", commandId);
    menuItem.setAttribute("type", "checkbox");
  }

  return menuItem;
};

// Opens the help
WebDeveloper.Overlay.Options.help = function()
{
  WebDeveloper.Common.openURL("@url@/@browser@/help/");
};

// Displays the options dialog
WebDeveloper.Overlay.Options.options = function(openPane)
{
  // If an open pane is set
  if(openPane)
  {
    window.openDialog("chrome://web-developer/content/options/options.xul", "web-developer-options-dialog", "centerscreen,chrome,dialog=yes,titlebar,toolbar", openPane);
  }
  else
  {
    window.openDialog("chrome://web-developer/content/options/options.xul", "web-developer-options-dialog", "centerscreen,chrome,dialog=yes,titlebar,toolbar");
  }
};

// Resets the page
WebDeveloper.Overlay.Options.resetPage = function()
{
  var tabFeature = WebDeveloper.Locales.getString("elementInformation");

  WebDeveloper.Overlay.toggleFeatures(WebDeveloper.Common.getTabBrowser().selectedTab, true);

  // If the display element information feature is active
  if(WebDeveloper.Dashboard.isOpenInDashboard(tabFeature))
  {
    WebDeveloper.Dashboard.closeDashboardTab(tabFeature);
  }

  tabFeature = WebDeveloper.Locales.getString("styleInformation");

  // If the display style information feature is active
  if(WebDeveloper.Dashboard.isOpenInDashboard(tabFeature))
  {
    WebDeveloper.Dashboard.closeDashboardTab(tabFeature);
  }

  tabFeature = WebDeveloper.Locales.getString("editCSS");

  // If the edit CSS feature is active
  if(WebDeveloper.Dashboard.isOpenInDashboard(tabFeature))
  {
    WebDeveloper.Dashboard.closeDashboardTab(tabFeature);
  }

  tabFeature = WebDeveloper.Locales.getString("editHTML");

  // If the edit HTML feature is active
  if(WebDeveloper.Dashboard.isOpenInDashboard(tabFeature))
  {
    WebDeveloper.Dashboard.closeDashboardTab(tabFeature);
  }
};

// Updates the active features menu
WebDeveloper.Overlay.Options.updateActiveFeaturesMenu = function(menu)
{
  var activeFeatures = WebDeveloper.Storage.getFeatures(WebDeveloper.Common.getTabBrowser().selectedTab);
  var menuItem       = null;
  var separator      = menu.getElementsByTagName("menuseparator")[0];

  WebDeveloper.Overlay.removeGeneratedMenuItems(menu);

  // If the separator exists
  if(separator)
  {
    // If there are active features
    if(activeFeatures)
    {
      activeFeatures.sort();

      // Loop through the active features
      for(var i = 0, l = activeFeatures.length; i < l; i++)
      {
        menuItem = WebDeveloper.Overlay.Options.generateCommandMenu(WebDeveloper.Common.getCommandId(activeFeatures[i]));

        // If the menu item is set
        if(menuItem)
        {
          menu.insertBefore(menuItem, separator);
        }
      }
    }

    // If the edit CSS feature is active
    if(WebDeveloper.Dashboard.isOpenInDashboard(WebDeveloper.Locales.getString("editCSS")))
    {
      menuItem = WebDeveloper.Overlay.Options.generateCommandMenu("web-developer-edit-css-command");

      // If the menu item is set
      if(menuItem)
      {
        menu.insertBefore(menuItem, separator);
      }
    }

    // If the edit HTML feature is active
    if(WebDeveloper.Dashboard.isOpenInDashboard(WebDeveloper.Locales.getString("editHTML")))
    {
      menuItem = WebDeveloper.Overlay.Options.generateCommandMenu("web-developer-edit-html-command");

      // If the menu item is set
      if(menuItem)
      {
        menu.insertBefore(menuItem, separator);
      }
    }

    // If the element information feature is active
    if(WebDeveloper.Dashboard.isOpenInDashboard(WebDeveloper.Locales.getString("elementInformation")))
    {
      menuItem = WebDeveloper.Overlay.Options.generateCommandMenu("web-developer-display-element-information-command");

      // If the menu item is set
      if(menuItem)
      {
        menu.insertBefore(menuItem, separator);
      }
    }

    // If the style information feature is active
    if(WebDeveloper.Dashboard.isOpenInDashboard(WebDeveloper.Locales.getString("styleInformation")))
    {
      menuItem = WebDeveloper.Overlay.Options.generateCommandMenu("web-developer-display-style-information-command");

      // If the menu item is set
      if(menuItem)
      {
        menu.insertBefore(menuItem, separator);
      }
    }
  }
};

// Updates the options menu
WebDeveloper.Overlay.Options.updateOptionsMenu = function(suffix)
{
  var activeFeatures = WebDeveloper.Storage.hasFeatures();

  // If there are no active features
  if(!activeFeatures)
  {
    activeFeatures = WebDeveloper.Dashboard.isOpenInDashboard(WebDeveloper.Locales.getString("editCSS"));
  }

  // If there are no active features
  if(!activeFeatures)
  {
    activeFeatures = WebDeveloper.Dashboard.isOpenInDashboard(WebDeveloper.Locales.getString("editHTML"));
  }

  // If there are no active features
  if(!activeFeatures)
  {
    activeFeatures = WebDeveloper.Dashboard.isOpenInDashboard(WebDeveloper.Locales.getString("elementInformation"));
  }

  // If there are no active features
  if(!activeFeatures)
  {
    activeFeatures = WebDeveloper.Dashboard.isOpenInDashboard(WebDeveloper.Locales.getString("styleInformation"));
  }

  WebDeveloper.Common.configureElement(document.getElementById("web-developer-active-features-" + suffix), "disabled", !activeFeatures);
  WebDeveloper.Common.configureElement(document.getElementById("web-developer-pin-features-command"), "checked", WebDeveloper.Preferences.getExtensionBooleanPreference("pin.features"));
};
