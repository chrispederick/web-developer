var WebDeveloper = WebDeveloper || {}; // eslint-disable-line no-use-before-define

WebDeveloper.Overlay                                                   = WebDeveloper.Overlay || {};
WebDeveloper.Overlay.ViewSource                                        = WebDeveloper.Overlay.ViewSource || {};
WebDeveloper.Overlay.ViewSource.clearViewGeneratedSourceSelectionDelay = 1500;

// Clears the view generated source selection
WebDeveloper.Overlay.ViewSource.clearViewGeneratedSourceSelection = function(selection, generatedSourceWindow)
{
  selection.removeAllRanges();

  // If the generated source window is set
  if(generatedSourceWindow)
  {
    generatedSourceWindow.gBrowser.contentWindow.getSelection().removeAllRanges();
  }
};

// Updates the view frame source menu
WebDeveloper.Overlay.ViewSource.updateViewFrameSourceMenu = function(menu)
{
  var contentDocument = null;
  var documents       = WebDeveloper.Content.getDocuments(WebDeveloper.Common.getContentWindow());
  var menuItem        = null;

  WebDeveloper.Overlay.removeGeneratedMenuItems(menu);

  // Loop through the documents
  for(var i = 1, l = documents.length; i < l; i++)
  {
    menuItem                 = document.createElement("menuitem");
    contentDocument          = documents[i];
    menuItem.contentDocument = contentDocument;

    menuItem.setAttribute("class", "web-developer-generated-menu");
    menuItem.setAttribute("label", contentDocument.documentURI);
    menuItem.setAttribute("oncommand", "WebDeveloper.Overlay.ViewSource.viewSource(this.contentDocument)");
    menu.appendChild(menuItem);
  }
};

// Loads the given application with the source of the current page
WebDeveloper.Overlay.ViewSource.loadApplicationWithSource = function(application)
{
  // If the application is set
  if(application)
  {
    application = new WebDeveloperApplication(application);

    application.launchWithSource(WebDeveloper.Common.getTabBrowser().currentURI, WebDeveloper.Common.getContentWindow());
  }
};

// Updates the view source menu
WebDeveloper.Overlay.ViewSource.updateViewSourceMenu = function(menu, suffix)
{
  var description             = null;
  var frameCount              = WebDeveloper.Content.getDocuments(WebDeveloper.Common.getContentWindow()).length;
  var key                     = null;
  var menuItem                = document.createElement("menuitem");
  var modifiers               = null;
  var path                    = null;
  var viewSourceWithCount     = WebDeveloper.Preferences.getExtensionIntegerPreference("view.source.with.count");
  var viewSourceWithSeparator = document.getElementById("web-developer-view-source-separator3-" + suffix);

  WebDeveloper.Overlay.removeGeneratedMenuItems(menu);

  // If there are no view source with applications
  if(viewSourceWithCount === 0)
  {
    viewSourceWithSeparator.setAttribute("hidden", true);
  }
  else
  {
    viewSourceWithSeparator.setAttribute("hidden", false);

    // Loop through the view source with options
    for(var i = 1; i <= viewSourceWithCount; i++)
    {
      description = WebDeveloper.Preferences.getExtensionStringPreference("view.source.with." + i + ".description");
      path        = WebDeveloper.Preferences.getExtensionStringPreference("view.source.with." + i + ".path");

      // If the description and path are set
      if(description && path)
      {
        key       = WebDeveloper.Preferences.getExtensionStringPreference("view.source.with." + i + ".key");
        menuItem  = document.createElement("menuitem");
        modifiers = WebDeveloper.Preferences.getExtensionStringPreference("view.source.with." + i + ".modifiers");

        menuItem.setAttribute("class", "web-developer-generated-menu");
        menuItem.setAttribute("label", description);
        menuItem.setAttribute("oncommand", "WebDeveloper.Overlay.ViewSource.loadApplicationWithSource('" + path.replace(/\\/gi, "\\\\") + "')");

        // If a key and modifiers are set
        if(key && modifiers)
        {
          menuItem.setAttribute("key", "web-developer-view-source-with-" + i + "-key");
        }

        menu.insertBefore(menuItem, viewSourceWithSeparator);
      }
    }
  }

  WebDeveloper.Common.configureElement(document.getElementById("web-developer-view-frame-source-" + suffix), "disabled", frameCount === 1);
};

// View the generated source
WebDeveloper.Overlay.ViewSource.viewGeneratedSource = function()
{
  var currentDocument       = WebDeveloper.Common.getContentDocument();
  var currentWindow         = WebDeveloper.Common.getContentWindow();
  var generatedSourceWindow = null;
  var mainWindow            = WebDeveloper.Common.getMainWindow();
  var selection             = currentWindow.getSelection();

  selection.selectAllChildren(currentDocument.documentElement);

  // If the view partial source in browser function exists
  if(mainWindow.gViewSourceUtils && mainWindow.gViewSourceUtils.viewPartialSourceInBrowser)
  {
    mainWindow.gViewSourceUtils.viewPartialSourceInBrowser(WebDeveloper.Common.getSelectedBrowser(), null, null);
  }
  else
  {
    generatedSourceWindow = window.openDialog("chrome://global/content/viewPartialSource.xul", "_blank", "chrome,dialog=no,resizable,scrollbars", WebDeveloper.Common.getTabBrowser().currentURI.spec, "charset=" + currentDocument.characterSet, currentWindow.getSelection(), "selection");
  }

  window.setTimeout(WebDeveloper.Overlay.ViewSource.clearViewGeneratedSourceSelection, WebDeveloper.Overlay.ViewSource.clearViewGeneratedSourceSelectionDelay, selection, generatedSourceWindow);
};

// View source
WebDeveloper.Overlay.ViewSource.viewSource = function(frameDocument)
{
  // If the view source in tab preference is set to true
  if(WebDeveloper.Preferences.getExtensionBooleanPreference("view.source.tab"))
  {
    var tabBrowser = WebDeveloper.Common.getTabBrowser();
    var newTab     = tabBrowser.addTab("view-source:" + frameDocument.documentURI);

    tabBrowser.selectedTab = newTab;
  }
  else
  {
    BrowserViewSourceOfDocument(frameDocument);
  }
};
