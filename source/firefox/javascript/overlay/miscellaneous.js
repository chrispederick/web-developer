var WebDeveloper = WebDeveloper || {};

WebDeveloper.Overlay               = WebDeveloper.Overlay || {};
WebDeveloper.Overlay.Miscellaneous = WebDeveloper.Overlay.Miscellaneous || {};

// Adds an href to the history
WebDeveloper.Overlay.Miscellaneous.addToHistory = function(link, uri)
{
  var browserHistory = Components.classes["@mozilla.org/browser/history;1"];

  // If browser history exists
  if(browserHistory)
  {
    browserHistory.getService(Components.interfaces.mozIAsyncHistory).isURIVisited(uri, function(uri, alreadyVisited)
    {
      // If the URI is not already in the history
      if(!alreadyVisited)
      {
        var asyncHistory = Components.classes["@mozilla.org/browser/history;1"].getService(Components.interfaces.mozIAsyncHistory);

        asyncHistory.updatePlaces({ "uri": uri, "visits": [{ "transitionType": Components.classes["@mozilla.org/browser/nav-history-service;1"].getService(Components.interfaces.nsINavHistoryService).TRANSITION_LINK, "visitDate": new Date().getTime() }] });
      }

      WebDeveloper.Overlay.Miscellaneous.recheckLink(link);
    });
  }
  else
  {
    var globalHistory = Components.classes["@mozilla.org/browser/global-history;2"].getService(Components.interfaces.nsIGlobalHistory2);

    // If the URI is not already in the history
    if(!globalHistory.isVisited(uri))
    {
      globalHistory.addURI(uri, false, false, null);
    }

    WebDeveloper.Overlay.Miscellaneous.recheckLink(link);
  }
};

// Clears all private data
WebDeveloper.Overlay.Miscellaneous.clearAllPrivateData = function()
{
  Components.classes["@mozilla.org/browser/browserglue;1"].getService(Components.interfaces.nsIBrowserGlue).sanitize(window || null);
};

// Clears the cache
WebDeveloper.Overlay.Miscellaneous.clearCache = function()
{
  // If the clearing is confirmed
  WebDeveloper.Overlay.displayConfirmation(WebDeveloper.Locales.getString("clearCache"), WebDeveloper.Locales.getString("clearCacheConfirmation"), WebDeveloper.Locales.getString("clear"), null, function()
  {
    var cacheInterface = Components.interfaces.nsICache;
    var cacheService   = Components.classes["@mozilla.org/network/cache-service;1"].getService(Components.interfaces.nsICacheService);

    try
    {
      cacheService.evictEntries(cacheInterface.STORE_ANYWHERE);

      WebDeveloper.Common.displayNotification("clearCacheResult");
    }
    catch(exception)
    {
      // Ignore
    }
  });
};

// Clears the history
WebDeveloper.Overlay.Miscellaneous.clearHistory = function()
{
  // If the clearing is confirmed
  WebDeveloper.Overlay.displayConfirmation(WebDeveloper.Locales.getString("clearHistory"), WebDeveloper.Locales.getString("clearHistoryConfirmation"), WebDeveloper.Locales.getString("clear"), null, function()
  {
    WebDeveloper.Overlay.Miscellaneous.removeAllFromHistory();

    WebDeveloper.Common.displayNotification("clearHistoryResult");
  });
};

// Clears the HTTP authentication
WebDeveloper.Overlay.Miscellaneous.clearHTTPAuthentication = function()
{
  // If the clearing is confirmed
  WebDeveloper.Overlay.displayConfirmation(WebDeveloper.Locales.getString("clearHTTPAuthentication"), WebDeveloper.Locales.getString("clearHTTPAuthenticationConfirmation"), WebDeveloper.Locales.getString("clear"), null, function()
  {
    var authenticationManager = Components.classes["@mozilla.org/network/http-auth-manager;1"].getService(Components.interfaces.nsIHttpAuthManager);

    authenticationManager.clearAll();

    WebDeveloper.Common.displayNotification("clearHTTPAuthenticationResult");
  });
};

// Displays all hidden elements
WebDeveloper.Overlay.Miscellaneous.displayHiddenElements = function()
{
  WebDeveloper.Miscellaneous.displayHiddenElements(WebDeveloper.Content.getDocuments(WebDeveloper.Common.getContentWindow()));
};

// Displays line guides
WebDeveloper.Overlay.Miscellaneous.displayLineGuides = function(element)
{
  // If the page has frames
  if(WebDeveloper.Common.pageHasFrames())
  {
    WebDeveloper.Common.displayError(WebDeveloper.Locales.getString("displayLineGuides"), WebDeveloper.Locales.getString("framesNotSupported"));
  }
  else
  {
    var featureId = WebDeveloper.Common.getFeatureId(element.getAttribute("id"));

    WebDeveloper.LineGuides.displayLineGuides(!WebDeveloper.Storage.isFeatureActive(featureId), WebDeveloper.Common.getContentDocument());
    WebDeveloper.Storage.toggleFeature(featureId);
  }
};

// Displays a page magnifier
WebDeveloper.Overlay.Miscellaneous.displayPageMagnifier = function(element)
{
  // If the page has frames
  if(WebDeveloper.Common.pageHasFrames())
  {
    WebDeveloper.Common.displayError(WebDeveloper.Locales.getString("displayPageMagnifier"), WebDeveloper.Locales.getString("framesNotSupported"));
  }
  else
  {
    var featureId = WebDeveloper.Common.getFeatureId(element.getAttribute("id"));

    WebDeveloper.PageMagnifier.displayPageMagnifier(!WebDeveloper.Storage.isFeatureActive(featureId));
    WebDeveloper.Storage.toggleFeature(featureId);
  }
};

// Displays a ruler
WebDeveloper.Overlay.Miscellaneous.displayRuler = function(element)
{
  // If the page has frames
  if(WebDeveloper.Common.pageHasFrames())
  {
    WebDeveloper.Common.displayError(WebDeveloper.Locales.getString("displayRuler"), WebDeveloper.Locales.getString("framesNotSupported"));
  }
  else
  {
    var featureId = WebDeveloper.Common.getFeatureId(element.getAttribute("id"));

    WebDeveloper.Ruler.displayRuler(!WebDeveloper.Storage.isFeatureActive(featureId), WebDeveloper.Common.getContentDocument());
    WebDeveloper.Storage.toggleFeature(featureId);
  }
};

// Edits the HTML of the page
WebDeveloper.Overlay.Miscellaneous.editHTML = function()
{
  var editHTML = WebDeveloper.Locales.getString("editHTML");

  // If edit HTML is open in the dashboard
  if(WebDeveloper.Dashboard.isOpenInDashboard(editHTML))
  {
    WebDeveloper.Dashboard.closeDashboardTab(editHTML);
  }
  else if(WebDeveloper.Common.pageHasFrames())
  {
    WebDeveloper.Common.displayError(editHTML, WebDeveloper.Locales.getString("framesNotSupported"));
  }
  else
  {
    WebDeveloper.Dashboard.openInDashboard(editHTML, WebDeveloper.Common.getChromeURL("dashboard/edit-html.xul"));
  }
};

// Linearizes the page
WebDeveloper.Overlay.Miscellaneous.linearizePage = function(element)
{
  WebDeveloper.Miscellaneous.linearizePage(WebDeveloper.Content.getDocuments(WebDeveloper.Common.getContentWindow()));
  WebDeveloper.Storage.toggleFeature(WebDeveloper.Common.getFeatureId(element.getAttribute("id")));
};

// Makes all frames resizable
WebDeveloper.Overlay.Miscellaneous.makeFramesResizable = function()
{
  WebDeveloper.Miscellaneous.makeFramesResizable(WebDeveloper.Content.getDocuments(WebDeveloper.Common.getContentWindow()));
};

// Forces the browser to recheck a link
WebDeveloper.Overlay.Miscellaneous.recheckLink = function(link)
{
  var href = link.href;

  // Force the browser to recheck the history by changing the href
  link.href = "";
  link.href = href;
};

// Removes an href from the history
WebDeveloper.Overlay.Miscellaneous.removeFromHistory = function(link, uri)
{
  var browserHistory = Components.classes["@mozilla.org/browser/history;1"];

  // If browser history exists
  if(browserHistory)
  {
    browserHistory.getService(Components.interfaces.mozIAsyncHistory).isURIVisited(uri, function(uri, inHistory)
    {
      // If the URI is in the history
      if(inHistory)
      {
        Components.classes["@mozilla.org/browser/nav-history-service;1"].getService(Components.interfaces.nsIBrowserHistory).removePage(uri);
      }

      WebDeveloper.Overlay.Miscellaneous.recheckLink(link);
    });
  }
  else
  {
    var globalHistory = Components.classes["@mozilla.org/browser/global-history;2"];

    // If the URI is in the history
    if(globalHistory.getService(Components.interfaces.nsIGlobalHistory2).isVisited(uri))
    {
      globalHistory.getService(Components.interfaces.nsIBrowserHistory).removePage(uri);
    }

    WebDeveloper.Overlay.Miscellaneous.recheckLink(link);
  }
};

// Clears the history
WebDeveloper.Overlay.Miscellaneous.removeAllFromHistory = function()
{
  var browserHistory = Components.classes["@mozilla.org/browser/nav-history-service;1"].getService(Components.interfaces.nsIBrowserHistory);

  // If browser history is set
  if(browserHistory)
  {
    browserHistory.removeAllPages();
  }
  else
  {
    Components.classes["@mozilla.org/browser/global-history;2"].getService(Components.interfaces.nsIBrowserHistory).removeAllPages();
  }
};

// Toggles all links on the page between visited and unvisited
WebDeveloper.Overlay.Miscellaneous.toggleVisitedLinks = function(visited)
{
  var documents = WebDeveloper.Content.getDocuments(WebDeveloper.Common.getContentWindow());
  var href      = null;
  var link      = null;
  var links     = null;
  var uri       = null;

  // Loop through the documents
  for(var i = 0, l = documents.length; i < l; i++)
  {
    links = documents[i].links;

    // Loop through all the links
    for(var j = 0, m = links.length; j < m; j++)
    {
      link = links[j];
      href = link.href;

      // If this link has an href
      if(href)
      {
        uri = Components.classes["@mozilla.org/network/io-service;1"].getService(Components.interfaces.nsIIOService).newURI(href, null, null);

        // If marking links as visited
        if(visited)
        {
          WebDeveloper.Overlay.Miscellaneous.addToHistory(link, uri);
        }
        else
        {
          WebDeveloper.Overlay.Miscellaneous.removeFromHistory(link, uri);
        }
      }
    }
  }
};

// Updates the miscellaneous menu
WebDeveloper.Overlay.Miscellaneous.updateMiscellaneousMenu = function(suffix)
{
  var command       = document.getElementById("web-developer-edit-html-command");
  var editHTMLOpen  = WebDeveloper.Dashboard.isOpenInDashboard(WebDeveloper.Locales.getString("editHTML"));
  var menu          = document.getElementById("web-developer-edit-html-" + suffix);
  var pageHasFrames = WebDeveloper.Common.pageHasFrames();

  WebDeveloper.Common.configureElement(command, "checked", editHTMLOpen);

  // If the menu exists
  if(menu)
  {
    // If edit HTML is not open and the page has frames
    if(!editHTMLOpen && pageHasFrames)
    {
      menu.setAttribute("class", "menuitem-iconic");
    }
    else if(menu.hasAttribute("class"))
    {
      menu.removeAttribute("class");
    }
  }

  menu = document.getElementById("web-developer-display-line-guides-" + suffix);

  // If the menu exists
  if(menu)
  {
    // If the page has frames
    if(pageHasFrames)
    {
      menu.setAttribute("class", "menuitem-iconic");
    }
    else if(menu.hasAttribute("class"))
    {
      menu.removeAttribute("class");
    }
  }

  menu = document.getElementById("web-developer-display-page-magnifier-" + suffix);

  // If the menu exists
  if(menu)
  {
    var canvas = document.getElementById("web-developer-page-magnifier");

    // If the canvas is not set or has no context
    if(!canvas || !canvas.getContext)
    {
      menu.setAttribute("class", "menuitem-iconic");
    }
    else if(menu.hasAttribute("class"))
    {
      menu.removeAttribute("class");
    }
  }

  menu = document.getElementById("web-developer-display-ruler-" + suffix);

  // If the menu exists
  if(menu)
  {
    // If the page has frames
    if(pageHasFrames)
    {
      menu.setAttribute("class", "menuitem-iconic");
    }
    else if(menu.hasAttribute("class"))
    {
      menu.removeAttribute("class");
    }
  }

  WebDeveloper.Common.configureElement(document.getElementById("web-developer-display-page-magnifier-command"), "checked", !document.getElementById("web-developer-page-magnifier-toolbar").hidden);
  WebDeveloper.Overlay.configureFeatureElement("web-developer-display-line-guides-command", "checked");
  WebDeveloper.Overlay.configureFeatureElement("web-developer-display-ruler-command", "checked");
  WebDeveloper.Overlay.configureFeatureElement("web-developer-linearize-page-command", "checked");
};
