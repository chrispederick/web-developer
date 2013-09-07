var WebDeveloper = WebDeveloper || {};

WebDeveloper.Overlay                  = WebDeveloper.Overlay || {};
WebDeveloper.Overlay.featureSuffixes  = ["app-menu", "context", "menu", "toolbar", "toolbar-button"];
WebDeveloper.Overlay.preferenceBranch = null;

// Closes the confirmation
WebDeveloper.Overlay.closeConfirmation = function()
{
  // Ignore
};

// Configures an element for a feature
WebDeveloper.Overlay.configureFeatureElement = function(id, attribute)
{
  WebDeveloper.Common.configureElement(document.getElementById(id), attribute, WebDeveloper.Storage.isFeatureActive(WebDeveloper.Common.getFeatureId(id)));
};

// Displays a confirmation dialog
WebDeveloper.Overlay.displayConfirmation = function(title, message, buttonText, buttonIcon, callback)
{
  // If the hide confirmation dialogs preference is set
  if(WebDeveloper.Preferences.getExtensionBooleanPreference("confirmation.dialogs.hide"))
  {
    callback();
  }
  else
  {
    var checkBox      = {value: false};
    var promptService = Components.interfaces.nsIPromptService;
    var result        = Components.classes["@mozilla.org/embedcomp/prompt-service;1"].getService(promptService).confirmEx(null, title, message, promptService.BUTTON_TITLE_IS_STRING * promptService.BUTTON_POS_0 + promptService.BUTTON_TITLE_CANCEL * promptService.BUTTON_POS_1, buttonText, null, null, WebDeveloper.Locales.getString("stopConfirmation"), checkBox);

    // If the check box was checked
    if(checkBox.value)
    {
      WebDeveloper.Preferences.setExtensionBooleanPreference("confirmation.dialogs.hide", true);
    }

    // If the question was confirmed
    if(result === 0)
    {
      callback();
    }
  }
};

// Initializes the extension
WebDeveloper.Overlay.initialize = function()
{
  // Try to get the tab browser
  try
  {
    var tabBrowser = WebDeveloper.Common.getTabBrowser();

    // If the tab browser is set
    if(tabBrowser)
    {
      var consoleService = Components.classes["@mozilla.org/consoleservice;1"].getService().QueryInterface(Components.interfaces.nsIConsoleService);
      var tabContainer   = tabBrowser.tabContainer;

      WebDeveloper.Overlay.preferenceBranch = WebDeveloper.Preferences.getExtensionBranch().QueryInterface(Components.interfaces.nsIPrefBranch2);

      WebDeveloper.Upgrade.upgrade();
      WebDeveloper.Overlay.setupKeyboardShortcuts();
      WebDeveloper.Overlay.updateChrome();

      tabBrowser.addEventListener("load", WebDeveloper.Overlay.pageLoad, true);
      tabBrowser.addEventListener("unload", WebDeveloper.Overlay.pageUnload, true);

      // If the tab container is set
      if(tabContainer)
      {
        tabContainer.addEventListener("TabSelect", WebDeveloper.Overlay.tabSelect, false);
      }

      // If the console service is set
      if(consoleService)
      {
        consoleService.registerListener(WebDeveloper.Overlay.ErrorConsoleListener);
      }

      // If the preference branch is set
      if(WebDeveloper.Overlay.preferenceBranch)
      {
        WebDeveloper.Overlay.preferenceBranch.addObserver("", WebDeveloper.Overlay.PreferenceObserver, false);
      }

      window.removeEventListener("load", WebDeveloper.Overlay.initialize, false);
    }
  }
  catch(exception)
  {
    // Ignore
  }
};

// Returns true if the DOM Inspector is available
WebDeveloper.Overlay.isDOMInspectorAvailable = function()
{
  // Try to load the DOM Inspector
  try
  {
    Components.classes["@mozilla.org/inspector/dom-utils;1"].getService(Components.interfaces.inIDOMUtils);

    return true;
  }
  catch(exception)
  {
    // Ignore
  }

  return false;
};

// Opens the error console
WebDeveloper.Overlay.openErrorConsole = function()
{
  toJavaScriptConsole();
};

// Opens a generated tab
WebDeveloper.Overlay.openGeneratedTab = function(url, data, locale)
{
  var tab  = WebDeveloper.Common.getTabBrowser().getBrowserForTab(WebDeveloper.Common.openURL(url));
  var load = (function(dataContent, localeContent)
  {
    var handler = function()
    {
      var contentDocument = tab.contentDocument;
      var dispatchEvent   = contentDocument.createEvent("Events");
      var headElement     = WebDeveloper.Common.getDocumentHeadElement(contentDocument);

      dispatchEvent.initEvent("web-developer-generated-event", true, false);
      headElement.setAttribute("data-web-developer", JSON.stringify(dataContent));
      headElement.setAttribute("data-web-developer-locale", JSON.stringify(localeContent));
      headElement.dispatchEvent(dispatchEvent);

      tab.removeEventListener("load", handler, true);
    };

    return handler;
  })(data, locale);

  tab.addEventListener("load", load, true);
};

// Opens a toolbar button automatically if another toolbar button is open on the toolbar
WebDeveloper.Overlay.openToolbarButton = function(currentToolbarButton)
{
  // If the toolbar button is set and is not open
  if(currentToolbarButton && !currentToolbarButton.open)
  {
    var toolbarButton  = null;
    var toolbarButtons = currentToolbarButton.parentNode.getElementsByTagName("toolbarbutton");

    // Loop through the toolbar buttons
    for(var i = 0, l = toolbarButtons.length; i < l; i++)
    {
      toolbarButton = toolbarButtons.item(i);

      // If the toolbar button is set, is not the same toolbar button and is open
      if(toolbarButton && toolbarButton != currentToolbarButton && toolbarButton.open)
      {
        toolbarButton.open        = false;
        currentToolbarButton.open = true;

        break;
      }
    }
  }
};

// Handles the page being loaded
WebDeveloper.Overlay.pageLoad = function(event)
{
  var originalTarget = event.originalTarget;

  // If the event came from an HTML document and it is not a frame
  if(originalTarget instanceof HTMLDocument && !originalTarget.defaultView.frameElement)
  {
    var loadBrowser = WebDeveloper.Common.getTabBrowser().getBrowserForDocument(originalTarget);
    var tab         = WebDeveloper.Common.getTabForDocument(originalTarget);

    WebDeveloper.Overlay.updateMetaRedirects(loadBrowser);

    // If pinning features
    if(WebDeveloper.Preferences.getExtensionBooleanPreference("pin.features"))
    {
      WebDeveloper.Overlay.toggleFeatures(tab, false);
    }
    else
    {
      WebDeveloper.Storage.deleteFeatures(tab);
      WebDeveloper.ElementAncestors.removeToolbar();
    }

    // If the selected browser is the one that loaded
    if(WebDeveloper.Common.getSelectedBrowser() == loadBrowser)
    {
      WebDeveloper.Overlay.updateRenderMode();
    }
  }
};

// Handles the page being unloaded
WebDeveloper.Overlay.pageUnload = function(event)
{
  var originalTarget = event.originalTarget;

  // If the event came from an HTML document and it is not a frame
  if(originalTarget instanceof HTMLDocument && !originalTarget.defaultView.frameElement)
  {
    WebDeveloper.Common.clearNotification();
    WebDeveloper.Overlay.updateCSSStatus();
    WebDeveloper.Overlay.updateJavaScriptStatus();
  }
};

// Removes all the generated menu items from the menu
WebDeveloper.Overlay.removeGeneratedMenuItems = function(menu)
{
  var generatedMenuItems = [];
  var menuItem           = null;
  var menuItems          = menu.childNodes;

  // Loop through the menu items
  for(var i = 0, l = menuItems.length; i < l; i++)
  {
    menuItem = menuItems.item(i);

    // If this is a generated menu item
    if(menuItem && menuItem.hasAttribute("class") && menuItem.getAttribute("class") == "web-developer-generated-menu")
    {
      generatedMenuItems.push(menuItem);
    }
  }

  // Loop through the generated menu items
  for(i = 0, l = generatedMenuItems.length; i < l; i++)
  {
    menu.removeChild(generatedMenuItems[i]);
  }
};

// Removes all the keyboard shortcuts for the extension
WebDeveloper.Overlay.removeKeyboardShortcuts = function(keySet)
{
  var extensionKeys = keySet.getElementsByClassName("web-developer-key");

  // While there are extension keys remaining
  while(extensionKeys.length)
  {
    keySet.removeChild(extensionKeys[0]);
  }
};

// Resets the CSS status button
WebDeveloper.Overlay.resetCSSStatus = function()
{
  var cssButton = document.getElementById("web-developer-css-statusbar");

  WebDeveloper.Overlay.javaScriptCurrentTime  = null;
  WebDeveloper.Overlay.javaScriptPreviousTime = null;

  // If the CSS button exists
  if(cssButton)
  {
    // If the CSS button has a class attribute
    if(cssButton.hasAttribute("class"))
    {
      cssButton.removeAttribute("class");
    }

    // If the CSS button has a tooltip text attribute
    if(cssButton.hasAttribute("tooltiptext"))
    {
      cssButton.removeAttribute("tooltiptext");
    }

    // If the toolbar preference is set to text and the CSS button has a label attribute
    if(WebDeveloper.Preferences.getExtensionStringPreference("toolbar.icons") == "text" && cssButton.hasAttribute("label"))
    {
      cssButton.removeAttribute("label");
    }
  }
};

// Resets the JavaScript status button
WebDeveloper.Overlay.resetJavaScriptStatus = function()
{
  var javaScriptButton = document.getElementById("web-developer-javascript-statusbar");

  WebDeveloper.Overlay.javaScriptCurrentTime  = null;
  WebDeveloper.Overlay.javaScriptPreviousTime = null;

  // If the JavaScript button exists
  if(javaScriptButton)
  {
    // If JavaScript is enabled
    if(WebDeveloper.Preferences.getBooleanPreference("javascript.enabled"))
    {
      // If the JavaScript button has a class attribute
      if(javaScriptButton.hasAttribute("class"))
      {
        javaScriptButton.removeAttribute("class");
      }

      // If the JavaScript button has a tooltip text attribute
      if(javaScriptButton.hasAttribute("tooltiptext"))
      {
        javaScriptButton.removeAttribute("tooltiptext");
      }

      // If the toolbar preference is set to text and the JavaScript button has a label attribute
      if(WebDeveloper.Preferences.getExtensionStringPreference("toolbar.icons") == "text" && javaScriptButton.hasAttribute("label"))
      {
        javaScriptButton.removeAttribute("label");
      }
    }
    else
    {
      // If the JavaScript button does not have a class attribute or it is not set to disabled
      if(!javaScriptButton.hasAttribute("class") || javaScriptButton.getAttribute("class") != "disabled")
      {
        javaScriptButton.setAttribute("class", "disabled");
        javaScriptButton.setAttribute("tooltiptext", WebDeveloper.Locales.getString("javaScriptDisabledTooltip"));

        // If the toolbar preference is set to text
        if(WebDeveloper.Preferences.getExtensionStringPreference("toolbar.icons") == "text")
        {
          javaScriptButton.setAttribute("label", WebDeveloper.Locales.getString("javaScriptDisabledLabel"));
        }
      }
    }
  }
};

// Sets up the feature keyboard shortcuts
WebDeveloper.Overlay.setupFeatureKeyboardShortcuts = function(keySet)
{
  var feature        = null;
  var featureElement = null;
  var key            = null;
  var keyElement     = null;
  var keyId          = null;
  var modifiers      = null;

  // Loop through the tools
  for(var i = 1, l = WebDeveloper.Preferences.getExtensionIntegerPreference("keyboard.count"); i <= l; i++)
  {
    feature   = WebDeveloper.Preferences.getExtensionStringPreference("keyboard." + i + ".feature");
    key       = WebDeveloper.Preferences.getLocalizedPreference("keyboard." + i + ".key");
    modifiers = WebDeveloper.Preferences.getExtensionStringPreference("keyboard." + i + ".modifiers");

    // If the feature, key and modifiers are set
    if(feature && key && modifiers)
    {
      keyElement = document.createElement("key");
      keyId      = "web-developer-" + feature + "-key";

      keyElement.setAttribute("class", "web-developer-key");
      keyElement.setAttribute("command", "web-developer-" + feature + "-command");
      keyElement.setAttribute("id", keyId);
      keyElement.setAttribute("key", key);
      keyElement.setAttribute("modifiers", modifiers);

      keySet.appendChild(keyElement);

      // Loop through the feature suffixes
      for(var j = 0, m = WebDeveloper.Overlay.featureSuffixes.length; j < m; j++)
      {
        featureElement = document.getElementById("web-developer-" + feature + "-" + WebDeveloper.Overlay.featureSuffixes[j]);

        // If the feature element is set
        if(featureElement)
        {
          featureElement.setAttribute("key", keyId);
        }
      }
    }
  }
};

// Sets up the keyboard shortcuts
WebDeveloper.Overlay.setupKeyboardShortcuts = function()
{
  var keySet = document.getElementById("mainKeyset");

  WebDeveloper.Overlay.removeKeyboardShortcuts(keySet);
  WebDeveloper.Overlay.setupFeatureKeyboardShortcuts(keySet);
  WebDeveloper.Overlay.setupResizeKeyboardShortcuts(keySet);
  WebDeveloper.Overlay.setupToolsKeyboardShortcuts(keySet);
  WebDeveloper.Overlay.setupViewSourceWithKeyboardShortcuts(keySet);
};

// Sets up the resize keyboard shortcuts
WebDeveloper.Overlay.setupResizeKeyboardShortcuts = function(keySet)
{
  var description = null;
  var height      = null;
  var key         = null;
  var keyElement  = null;
  var modifiers   = null;
  var viewport    = null;
  var width       = null;

  // Loop through the possible resize options
  for(var i = 1, l = WebDeveloper.Preferences.getExtensionIntegerPreference("resize.count"); i <= l; i++)
  {
    description = WebDeveloper.Preferences.getLocalizedPreference("resize." + i + ".description");
    height      = WebDeveloper.Preferences.getExtensionIntegerPreference("resize." + i + ".height");
    width       = WebDeveloper.Preferences.getExtensionIntegerPreference("resize." + i + ".width");

    // If the description, height and width are set
    if(description && height > 0 && width > 0)
    {
      key       = WebDeveloper.Preferences.getExtensionStringPreference("resize." + i + ".key");
      modifiers = WebDeveloper.Preferences.getExtensionStringPreference("resize." + i + ".modifiers");
      viewport  = WebDeveloper.Preferences.getExtensionBooleanPreference("resize." + i + ".viewport");

      // If a key and modifiers are set
      if(key && modifiers)
      {
        keyElement = document.createElement("key");

        keyElement.setAttribute("class", "web-developer-key");
        keyElement.setAttribute("id", "web-developer-resize-" + i + "-key");
        keyElement.setAttribute("key", key);
        keyElement.setAttribute("modifiers", modifiers);
        keyElement.setAttribute("oncommand", "WebDeveloper.Overlay.Resize.resizeWindow(" + width + ", " + height + ", " + viewport + ")");

        keySet.appendChild(keyElement);
      }
    }
  }
};

// Sets up the tools keyboard shortcuts
WebDeveloper.Overlay.setupToolsKeyboardShortcuts = function(keySet)
{
  var description = null;
  var key         = null;
  var keyElement  = null;
  var modifiers   = null;
  var path        = null;
  var url         = null;

  // Loop through the tools
  for(var i = 1, l = WebDeveloper.Preferences.getExtensionIntegerPreference("tool.count"); i <= l; i++)
  {
    // If this is not a separator
    if(!WebDeveloper.Preferences.getExtensionBooleanPreference("tool." + i + ".separator"))
    {
      description = WebDeveloper.Preferences.getLocalizedPreference("tool." + i + ".description");
      path        = WebDeveloper.Preferences.getExtensionStringPreference("tool." + i + ".path");
      url         = WebDeveloper.Preferences.getExtensionStringPreference("tool." + i + ".url");

      // If the description and either a path or url are set
      if((description && (path || url)))
      {
        key       = WebDeveloper.Preferences.getLocalizedPreference("tool." + i + ".key");
        modifiers = WebDeveloper.Preferences.getExtensionStringPreference("tool." + i + ".modifiers");

        // If a key and modifiers are set
        if(key && modifiers)
        {
          keyElement = document.createElement("key");

          keyElement.setAttribute("class", "web-developer-key");
          keyElement.setAttribute("id", "web-developer-tools-" + i + "-key");
          keyElement.setAttribute("key", key);
          keyElement.setAttribute("modifiers", modifiers);

          // If the path is set
          if(path)
          {
            keyElement.setAttribute("oncommand", "WebDeveloper.Overlay.Tools.loadApplicationWithURL('" + path.replace(/\\/gi, "\\\\") + "', WebDeveloper.Common.getTabBrowser().currentURI.spec)");
          }
          else
          {
            keyElement.setAttribute("oncommand", "WebDeveloper.Common.openURL('" + url + "' + encodeURIComponent(WebDeveloper.Common.getTabBrowser().currentURI.spec))");
          }

          keySet.appendChild(keyElement);
        }
      }
    }
  }
};

// Sets up the view source with keyboard shortcuts
WebDeveloper.Overlay.setupViewSourceWithKeyboardShortcuts = function(keySet)
{
  var description = null;
  var key         = null;
  var keyElement  = null;
  var modifiers   = null;
  var path        = null;

  // Loop through the view source with options
  for(var i = 1; i <= WebDeveloper.Preferences.getExtensionIntegerPreference("view.source.with.count"); i++)
  {
    description = WebDeveloper.Preferences.getExtensionStringPreference("view.source.with." + i + ".description");
    path        = WebDeveloper.Preferences.getExtensionStringPreference("view.source.with." + i + ".path");

    // If the description and path are set
    if(description && path)
    {
      key     = WebDeveloper.Preferences.getExtensionStringPreference("view.source.with." + i + ".key");
      modifiers = WebDeveloper.Preferences.getExtensionStringPreference("view.source.with." + i + ".modifiers");

      // If a key and modifiers are set
      if(key && modifiers)
      {
        keyElement = document.createElement("key");

        keyElement.setAttribute("class", "web-developer-key");
        keyElement.setAttribute("id", "web-developer-view-source-with-" + i + "-key");
        keyElement.setAttribute("key", key);
        keyElement.setAttribute("modifiers", modifiers);
        keyElement.setAttribute("oncommand", "WebDeveloper.Overlay.ViewSource.loadApplicationWithSource('" + path.replace(/\\/gi, "\\\\") + "')");

        keySet.appendChild(keyElement);
      }
    }
  }
};

// Handles a tab being selected
WebDeveloper.Overlay.tabSelect = function()
{
  // If a feature that uses the element information toolbar is active
  if(WebDeveloper.Dashboard.isOpenInDashboard(WebDeveloper.Locales.getString("elementInformation")) || WebDeveloper.Dashboard.isOpenInDashboard(WebDeveloper.Locales.getString("styleInformation")))
  {
    document.getElementById("web-developer-element-information-toolbar").hidden = false;
  }
  else
  {
    document.getElementById("web-developer-element-information-toolbar").hidden = true;
  }

  WebDeveloper.Overlay.resetCSSStatus();
  WebDeveloper.Overlay.resetJavaScriptStatus();
  WebDeveloper.Overlay.updateRenderMode();
};

// Toggles the features
WebDeveloper.Overlay.toggleFeatures = function(tab, reset)
{
  var feature  = null;
  var features = WebDeveloper.Storage.getFeatures(tab);

  // If the features are set
  if(features)
  {
    // Loop through the features
    for(var i = 0, l = features.length; i < l; i++)
    {
      feature = features[i];

      // If not resetting features
      if(!reset)
      {
        WebDeveloper.Storage.toggleFeature(feature, tab);
      }

      document.getElementById(WebDeveloper.Common.getCommandId(feature)).doCommand();
    }
  }
};

// Toggles the toolbar
WebDeveloper.Overlay.toggleToolbar = function(event)
{
  // If there is no event or it came from the button
  if(!event || event.target.getAttribute("id") == "web-developer-button")
  {
    var toolbar = document.getElementById("web-developer-toolbar");

    toolbar.collapsed = !toolbar.collapsed;

    document.persist("web-developer-toolbar", "collapsed");
  }
};

// Uninitializes the extension
WebDeveloper.Overlay.uninitialize = function()
{
  // Try to get the tab browser
  try
  {
    var tabBrowser = WebDeveloper.Common.getTabBrowser();

    // If the tab browser is set
    if(tabBrowser)
    {
      var consoleService = Components.classes["@mozilla.org/consoleservice;1"].getService().QueryInterface(Components.interfaces.nsIConsoleService);
      var tabContainer   = tabBrowser.tabContainer;

      tabBrowser.removeEventListener("load", WebDeveloper.Overlay.pageLoad, true);
      tabBrowser.removeEventListener("unload", WebDeveloper.Overlay.pageUnload, true);

      // If the tab container is set
      if(tabContainer)
      {
        tabContainer.removeEventListener("TabSelect", WebDeveloper.Overlay.tabSelect, false);
      }

      // If the console service is set
      if(consoleService)
      {
        consoleService.unregisterListener(WebDeveloper.Overlay.ErrorConsoleListener);
      }

      // If the preference branch is set
      if(WebDeveloper.Overlay.preferenceBranch)
      {
        WebDeveloper.Overlay.preferenceBranch.removeObserver("", WebDeveloper.Overlay.PreferenceObserver);
      }

      window.removeEventListener("unload", WebDeveloper.Overlay.uninitialize, false);
    }
  }
  catch(exception)
  {
    // Ignore
  }
};

// Updates the chrome
WebDeveloper.Overlay.updateChrome = function()
{
  var hideContextMenuPreference = WebDeveloper.Preferences.getExtensionBooleanPreference("context.hide");
  var hideMenuPreference        = WebDeveloper.Preferences.getExtensionBooleanPreference("menu.hide");
  var toolbar                   = document.getElementById("web-developer-toolbar");

  // If the toolbar exists
  if(toolbar)
  {
    var toolbarButtons       = toolbar.getElementsByTagName("toolbarbutton");
    var toolbarButtonsLength = toolbarButtons.length;
    var toolbarPreference    = WebDeveloper.Preferences.getExtensionStringPreference("toolbar.icons");

    toolbar.setAttribute("mode", toolbarPreference);

    // If the toolbar preference is set to icons
    if(toolbarPreference == "icons")
    {
      toolbarPreference = "pictures";
    }

    toolbar.setAttribute("buttonstyle", toolbarPreference);

    // Loop through the toolbar buttons
    for(var i = 0; i < toolbarButtonsLength; i++)
    {
      toolbarButtons[i].setAttribute("buttonstyle", toolbarPreference);
    }

    // If the toolbar preference is not set to text
    if(toolbarPreference != "text")
    {
      WebDeveloper.Common.removeElementAttribute(document.getElementById("web-developer-css-statusbar"), "label");
      WebDeveloper.Common.removeElementAttribute(document.getElementById("web-developer-javascript-statusbar"), "label");
      WebDeveloper.Common.removeElementAttribute(document.getElementById("web-developer-render-mode-statusbar"), "label");
    }
  }

  WebDeveloper.Common.configureElement(document.getElementById("web-developer-app-menu"), "hidden", hideMenuPreference);
  WebDeveloper.Common.configureElement(document.getElementById("web-developer-context"), "hidden", hideContextMenuPreference);
  WebDeveloper.Common.configureElement(document.getElementById("web-developer-context-separator1"), "hidden", hideContextMenuPreference);
  WebDeveloper.Common.configureElement(document.getElementById("web-developer-menu"), "hidden", hideMenuPreference);
  WebDeveloper.Common.configureElement(document.getElementById("web-developer-seamonkey"), "hidden", hideMenuPreference);

  // If the extension is running on a Mac
  if(WebDeveloper.Common.isMac())
  {
    var color    = WebDeveloper.Preferences.getExtensionBooleanPreference("toolbar.color");
    var toolbars = document.querySelectorAll(".web-developer-toolbar");

    WebDeveloper.Common.toggleClass(document.getElementById("web-developer-app-menu"), "color", color);
    WebDeveloper.Common.toggleClass(document.getElementById("web-developer-button"), "color", color);
    WebDeveloper.Common.toggleClass(document.getElementById("web-developer-context"), "color", color);
    WebDeveloper.Common.toggleClass(document.getElementById("web-developer-menu"), "color", color);
    WebDeveloper.Common.toggleClass(document.getElementById("web-developer-seamonkey"), "color", color);
    WebDeveloper.Common.toggleClass(document.getElementById("web-developer-toolbar"), "color", color);

    WebDeveloper.Common.toggleClass(document.getElementById("web-developer-cookies-toolbar"), "color", color);
    WebDeveloper.Common.toggleClass(document.getElementById("web-developer-css-toolbar"), "color", color);
    WebDeveloper.Common.toggleClass(document.getElementById("web-developer-disable-toolbar"), "color", color);
    WebDeveloper.Common.toggleClass(document.getElementById("web-developer-forms-toolbar"), "color", color);
    WebDeveloper.Common.toggleClass(document.getElementById("web-developer-images-toolbar"), "color", color);
    WebDeveloper.Common.toggleClass(document.getElementById("web-developer-information-toolbar"), "color", color);
    WebDeveloper.Common.toggleClass(document.getElementById("web-developer-miscellaneous-toolbar"), "color", color);
    WebDeveloper.Common.toggleClass(document.getElementById("web-developer-options-toolbar"), "color", color);
    WebDeveloper.Common.toggleClass(document.getElementById("web-developer-outline-toolbar"), "color", color);
    WebDeveloper.Common.toggleClass(document.getElementById("web-developer-resize-toolbar"), "color", color);
    WebDeveloper.Common.toggleClass(document.getElementById("web-developer-tools-toolbar"), "color", color);
    WebDeveloper.Common.toggleClass(document.getElementById("web-developer-view-source-toolbar"), "color", color);

    WebDeveloper.Common.configureElement(document.getElementById("web-developer-css-statusbar"), "web-developer-color", color);
    WebDeveloper.Common.configureElement(document.getElementById("web-developer-javascript-statusbar"), "web-developer-color", color);
    WebDeveloper.Common.configureElement(document.getElementById("web-developer-render-mode-statusbar"), "web-developer-color", color);

    // Loop through the toolbars
    for(var j = 0, m = toolbars.length; j < m; j++)
    {
      WebDeveloper.Common.toggleClass(toolbars[j], "color", color);
    }

    WebDeveloper.Common.toggleClass(document.getElementById("web-developer-dashboard"), "color", color);
  }
};

// Updates the CSS status button
WebDeveloper.Overlay.updateCSSStatus = function(error)
{
  var cssButton = document.getElementById("web-developer-css-statusbar");

  // If the CSS button is set
  if(cssButton)
  {
    // If the error is set
    if(error)
    {
      var errorMessage = error.errorMessage;

      cssButton.setAttribute("tooltiptext", WebDeveloper.Locales.getFormattedString("cssErrorTooltip", [errorMessage]));

      // If the CSS button does not have a class attribute or it is not set to error
      if(!cssButton.hasAttribute("class") || cssButton.getAttribute("class") != "error")
      {
        cssButton.setAttribute("class", "error");

        // If the toolbar preference is set to text
        if(WebDeveloper.Preferences.getExtensionStringPreference("toolbar.icons") == "text")
        {
          cssButton.setAttribute("label", WebDeveloper.Locales.getString("cssErrorLabel"));
        }
      }
    }
    else if(!cssButton.hasAttribute("class") || cssButton.getAttribute("class") != "valid")
    {
      cssButton.setAttribute("class", "valid");
      cssButton.setAttribute("tooltiptext", WebDeveloper.Locales.getString("cssNoErrorsTooltip"));

      // If the toolbar preference is set to text
      if(WebDeveloper.Preferences.getExtensionStringPreference("toolbar.icons") == "text")
      {
        cssButton.setAttribute("label", WebDeveloper.Locales.getString("cssNoErrorsLabel"));
      }
    }
  }
};

// Updates the JavaScript status button
WebDeveloper.Overlay.updateJavaScriptStatus = function(error)
{
  var javaScriptButton = document.getElementById("web-developer-javascript-statusbar");

  // If the JavaScript button is set
  if(javaScriptButton)
  {
    // If the error is set
    if(error)
    {
      var errorMessage = error.errorMessage;
      var warning      = error.flags & error.warningFlag !== 0;

      // If this is a warning
      if(warning)
      {
        javaScriptButton.setAttribute("tooltiptext", WebDeveloper.Locales.getFormattedString("javaScriptWarningTooltip", [errorMessage]));

        // If the JavaScript button does not have a class attribute or it is not set to warning
        if(!javaScriptButton.hasAttribute("class") || javaScriptButton.getAttribute("class") != "warning")
        {
          javaScriptButton.setAttribute("class", "warning");

          // If the toolbar preference is set to text
          if(WebDeveloper.Preferences.getExtensionStringPreference("toolbar.icons") == "text")
          {
            javaScriptButton.setAttribute("label", WebDeveloper.Locales.getString("javaScriptWarningLabel"));
          }
        }
      }
      else
      {
        javaScriptButton.setAttribute("tooltiptext", WebDeveloper.Locales.getFormattedString("javaScriptErrorTooltip", [errorMessage]));

        // If the JavaScript button does not have a class attribute or it is not set to error
        if(!javaScriptButton.hasAttribute("class") || javaScriptButton.getAttribute("class") != "error")
        {
          javaScriptButton.setAttribute("class", "error");

          // If the toolbar preference is set to text
          if(WebDeveloper.Preferences.getExtensionStringPreference("toolbar.icons") == "text")
          {
            javaScriptButton.setAttribute("label", WebDeveloper.Locales.getString("javaScriptErrorLabel"));
          }
        }
      }
    }
    else if(!javaScriptButton.hasAttribute("class") || (javaScriptButton.getAttribute("class") != "disabled" && javaScriptButton.getAttribute("class") != "valid"))
    {
      javaScriptButton.setAttribute("class", "valid");
      javaScriptButton.setAttribute("tooltiptext", WebDeveloper.Locales.getString("javaScriptNoErrorsTooltip"));

      // If the toolbar preference is set to text
      if(WebDeveloper.Preferences.getExtensionStringPreference("toolbar.icons") == "text")
      {
        javaScriptButton.setAttribute("label", WebDeveloper.Locales.getString("javaScriptNoErrorsLabel"));
      }
    }
  }
};

// Updates meta redirects
WebDeveloper.Overlay.updateMetaRedirects = function(browserElement)
{
  browserElement.docShell.allowMetaRedirects = !WebDeveloper.Preferences.getExtensionBooleanPreference("meta.redirects.disable");
};

// Updates the render mode status button
WebDeveloper.Overlay.updateRenderMode = function()
{
  var renderModeButton = document.getElementById("web-developer-render-mode-statusbar");

  // If the render mode button exists
  if(renderModeButton)
  {
    var renderMode = WebDeveloper.Common.getContentDocument().compatMode;

    // If the render mode is quirks mode
    if(renderMode == "BackCompat")
    {
      renderModeButton.setAttribute("class", "quirks");
      renderModeButton.setAttribute("tooltiptext", WebDeveloper.Locales.getString("quirksModeTooltip"));

      // If the toolbar is in text mode
      if(WebDeveloper.Preferences.getExtensionStringPreference("toolbar.icons") == "text")
      {
          renderModeButton.setAttribute("label", WebDeveloper.Locales.getString("quirksModeLabel"));
      }
    }
    else
    {
      // If the render mode button has a class attribute
      if(renderModeButton.hasAttribute("class"))
      {
        renderModeButton.removeAttribute("class");
      }

      renderModeButton.setAttribute("tooltiptext", WebDeveloper.Locales.getString("standardsComplianceModeTooltip"));

      // If the toolbar is in text mode
      if(WebDeveloper.Preferences.getExtensionStringPreference("toolbar.icons") == "text")
      {
        renderModeButton.setAttribute("label", WebDeveloper.Locales.getString("standardsComplianceModeLabel"));
      }
    }
  }
};

// Error console listener
WebDeveloper.Overlay.ErrorConsoleListener =
{
  // Observes changes in the console
  observe: function(error)
  {
    // If the error is set
    if(error)
    {
      // Try to convert the error to a script error
      try
      {
        var errorCategory = null;

        error         = error.QueryInterface(Components.interfaces.nsIScriptError);
        errorCategory = error.category;

        // If the error category is set and is content javascript
        if(errorCategory && errorCategory == "content javascript")
        {
          WebDeveloper.Overlay.updateJavaScriptStatus(error);
        }
        else if(errorCategory && errorCategory == "CSS Parser")
        {
          WebDeveloper.Overlay.updateCSSStatus(error);
        }
      }
      catch(exception)
      {
        // Ignore
      }
    }

    return false;
  }
};

// Preference observer
WebDeveloper.Overlay.PreferenceObserver =
{
  // Observes changes in the console
  observe: function(subject, topic, data)
  {
    // If a preference was changed
    if(topic == "nsPref:changed")
    {
      // If the context hide, menu hide, toolbar color or toolbar icons preference was changed
      if(data == "context.hide" || data == "menu.hide" || data == "toolbar.color" || data == "toolbar.icons")
      {
        WebDeveloper.Overlay.updateChrome();
      }
    }
  }
};

window.addEventListener("load", WebDeveloper.Overlay.initialize, false);
window.addEventListener("unload", WebDeveloper.Overlay.uninitialize, false);
