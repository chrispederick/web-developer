var WebDeveloper = WebDeveloper || {};

WebDeveloper.EditHTML                 = WebDeveloper.EditHTML || {};
WebDeveloper.EditHTML.contentDocument = null;
WebDeveloper.EditHTML.interval        = null;
WebDeveloper.EditHTML.oldHTML         = null;
WebDeveloper.EditHTML.updateFrequency = 500;

// Applies the HTML
WebDeveloper.EditHTML.apply = function()
{
  var contentBody = WebDeveloper.Common.getDocumentBodyElement(WebDeveloper.EditHTML.contentDocument);
  var newHTML     = document.getElementById("web-developer-edit-html-browser").contentDocument.defaultView.WebDeveloper.Dashboard.getContent();

  // If the content body is set and the new HTML is not the same as the old HTML
  if(contentBody && newHTML != WebDeveloper.EditHTML.oldHTML)
  {
    contentBody.innerHTML         = newHTML;
    WebDeveloper.EditHTML.oldHTML = newHTML;
  }
};

// Changes the syntax highlight theme
WebDeveloper.EditHTML.changeSyntaxHighlightTheme = function(type, color)
{
  document.getElementById("web-developer-edit-html-browser").contentDocument.defaultView.WebDeveloper.Dashboard.changeSyntaxHighlightTheme(type, color);

  // If the color is not set
  if(color == "none")
  {
    WebDeveloper.EditHTML.toggleSearch(false);
  }
  else
  {
    WebDeveloper.EditHTML.toggleSearch(true);
  }
};

// Clear the HTML
WebDeveloper.EditHTML.clear = function()
{
  document.getElementById("web-developer-edit-html-browser").contentDocument.defaultView.WebDeveloper.Dashboard.setContent("");
};

// Initializes the edit HTML dashboard
WebDeveloper.EditHTML.initialize = function()
{
  // Try to get the tab browser
  try
  {
    var tabBrowser = WebDeveloper.Common.getTabBrowser();

    // If the tab browser is set
    if(tabBrowser)
    {
      var tabContainer = tabBrowser.tabContainer;
      var theme        = WebDeveloper.Preferences.getExtensionStringPreference("syntax.highlight.theme");

      WebDeveloper.EditHTML.contentDocument = WebDeveloper.Common.getContentDocument();

      WebDeveloper.EditHTML.retrieveHTML(theme);
      WebDeveloper.EditHTML.update();

      // If the tab container is set
      if(tabContainer)
      {
        tabContainer.addEventListener("TabSelect", WebDeveloper.EditHTML.tabSelect, false);
      }

      // If the theme is not set
      if(theme == "none")
      {
        WebDeveloper.EditHTML.toggleSearch(false);
      }

      document.getElementById("web-developer-search-dashboard-text").addEventListener("keypress", WebDeveloper.EditHTML.search, false);

      WebDeveloper.Common.configureElement(document.getElementById("web-developer-syntax-highlight-" + theme), "checked", true);

      // If the extension is running on a Mac
      if(WebDeveloper.Common.isMac())
      {
        WebDeveloper.Common.toggleClass(document.getElementById("web-developer-dashboard-toolbar"), "color", WebDeveloper.Preferences.getExtensionBooleanPreference("toolbar.color"));
      }

      tabBrowser.addEventListener("load", WebDeveloper.EditHTML.pageLoad, true);
    }
  }
  catch(exception)
  {
    // Ignore
  }
};

// Reinitializes the dashboard when the page changes
WebDeveloper.EditHTML.pageLoad = function(event)
{
  var originalTarget = event.originalTarget;

  // If the event came from an HTML document and it is not a frame
  if(originalTarget instanceof HTMLDocument && !originalTarget.defaultView.frameElement)
  {
    WebDeveloper.EditHTML.contentDocument = WebDeveloper.Common.getContentDocument();

    WebDeveloper.EditHTML.stopUpdate();

    // If the page is generated
    if(originalTarget.documentURI == "about:blank")
    {
      window.setTimeout(function()
      {
        WebDeveloper.EditHTML.retrieveHTML(WebDeveloper.Preferences.getExtensionStringPreference("syntax.highlight.theme"));
        WebDeveloper.EditHTML.update();
      }, 1000);
    }
    else
    {
      WebDeveloper.EditHTML.retrieveHTML(WebDeveloper.Preferences.getExtensionStringPreference("syntax.highlight.theme"));
      WebDeveloper.EditHTML.update();
    }
  }
};

// Resets the edited HTML
WebDeveloper.EditHTML.reset = function()
{
  WebDeveloper.Common.getTabBrowser().reload();
};

// Retrieves the HTML
WebDeveloper.EditHTML.retrieveHTML = function(theme)
{
  var contentBody = WebDeveloper.Common.getDocumentBodyElement(WebDeveloper.EditHTML.contentDocument);

  // If the content body is set
  if(contentBody)
  {
    var editor = document.getElementById("web-developer-edit-html-browser").contentDocument.defaultView.WebDeveloper.Dashboard;

    editor.initializeEditor("htmlmixed", theme);
    editor.setContent(contentBody.innerHTML);
  }

  WebDeveloper.EditHTML.apply();
};

// Saves the HTML
WebDeveloper.EditHTML.save = function()
{
  var filePicker      = Components.classes["@mozilla.org/filepicker;1"].createInstance(Components.interfaces.nsIFilePicker);
  var result          = null;
  var url             = Components.classes["@mozilla.org/network/standard-url;1"].createInstance(Components.interfaces.nsIURL);

  url.spec                    = WebDeveloper.EditHTML.contentDocument.documentURI;
  filePicker.defaultExtension = url.fileExtension;
  filePicker.defaultString    = url.fileName;

  filePicker.init(window, WebDeveloper.Locales.getString("saveHTML"), filePicker.modeSave);

  result = filePicker.show();

  // If the user selected a file
  if(result == filePicker.returnOK || result == filePicker.returnReplace)
  {
    var file                       = filePicker.file;
    var webBrowserPersistInterface = Components.interfaces.nsIWebBrowserPersist;
    var webBrowserPersist          = Components.classes["@mozilla.org/embedding/browser/nsWebBrowserPersist;1"].createInstance(webBrowserPersistInterface);

    webBrowserPersist.persistFlags = webBrowserPersistInterface.PERSIST_FLAGS_AUTODETECT_APPLY_CONVERSION | webBrowserPersistInterface.PERSIST_FLAGS_FROM_CACHE | webBrowserPersistInterface.PERSIST_FLAGS_REPLACE_EXISTING_FILES;

    // If the file does not exist
    if(!file.exists())
    {
      file.create(Components.interfaces.nsIFile.NORMAL_FILE_TYPE, parseInt(644, 8));
    }

    webBrowserPersist.saveDocument(WebDeveloper.EditHTML.contentDocument, file, null, WebDeveloper.EditHTML.contentDocument.contentType, webBrowserPersistInterface.ENCODE_FLAGS_ENCODE_BASIC_ENTITIES, 0);
  }
};

// Searches the HTML
WebDeveloper.EditHTML.search = function(event)
{
  // If the event is not set or the event key code is set and is 13
  if(!event || (event.keyCode && event.keyCode == 13))
  {
    var query = document.getElementById("web-developer-search-dashboard-text").value;

    // If the query is set
    if(query)
    {
      document.getElementById("web-developer-edit-html-browser").contentDocument.defaultView.WebDeveloper.Dashboard.search(query);
    }
  }
};

// Stops the HTML updating
WebDeveloper.EditHTML.stopUpdate = function()
{
  // If the interval id is set
  if(WebDeveloper.EditHTML.interval)
  {
    window.clearInterval(WebDeveloper.EditHTML.interval);

    WebDeveloper.EditHTML.interval = null;
  }
};

// Handles a browser tab being selected
WebDeveloper.EditHTML.tabSelect = function()
{
  var contentDocument = WebDeveloper.Common.getContentDocument();

  // If the content document is different
  if(contentDocument != WebDeveloper.EditHTML.contentDocument)
  {
    WebDeveloper.EditHTML.contentDocument.location.reload(false);

    WebDeveloper.EditHTML.contentDocument = contentDocument;

    WebDeveloper.EditHTML.retrieveHTML(WebDeveloper.Preferences.getExtensionStringPreference("syntax.highlight.theme"));
  }
};

// Toggles the search
WebDeveloper.EditHTML.toggleSearch = function(enable)
{
  document.getElementById("web-developer-search-dashboard").disabled      = !enable;
  document.getElementById("web-developer-search-dashboard-text").disabled = !enable;
};

// Uninitializes edit HTML
WebDeveloper.EditHTML.uninitialize = function()
{
  // Try to get the tab browser
  try
  {
    var tabBrowser = WebDeveloper.Common.getTabBrowser();

    WebDeveloper.EditHTML.contentDocument = null;

    WebDeveloper.EditHTML.stopUpdate();

    // If the tab browser is set
    if(tabBrowser)
    {
      var tabContainer = tabBrowser.tabContainer;

      document.getElementById("web-developer-search-dashboard-text").removeEventListener("keypress", WebDeveloper.EditHTML.search, false);
      tabBrowser.removeEventListener("load", WebDeveloper.EditHTML.pageLoad, true);

      // If the tab container is set
      if(tabContainer)
      {
        tabContainer.removeEventListener("TabSelect", WebDeveloper.EditHTML.tabSelect, false);
      }
    }
  }
  catch(exception)
  {
    // Ignore
  }
};

// Updates the HTML
WebDeveloper.EditHTML.update = function()
{
  // If the update frequency is greater than 0
  if(WebDeveloper.EditHTML.updateFrequency > 0)
  {
    WebDeveloper.EditHTML.interval = window.setInterval(WebDeveloper.EditHTML.apply, WebDeveloper.EditHTML.updateFrequency);
  }
};
