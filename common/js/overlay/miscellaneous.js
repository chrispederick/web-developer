var WebDeveloper = WebDeveloper || {}; // eslint-disable-line no-redeclare, no-use-before-define

WebDeveloper.Overlay               = WebDeveloper.Overlay || {};
WebDeveloper.Overlay.Miscellaneous = WebDeveloper.Overlay.Miscellaneous || {};

// Adds a feature on a tab
WebDeveloper.Overlay.Miscellaneous.addFeatureOnTab = function(featureItem, tab, scriptCode, args)
{
  WebDeveloper.Overlay.addFeatureOnTab(featureItem, tab, "/features/js/miscellaneous.js", scriptCode, args);
};

// Adds an href to the history
WebDeveloper.Overlay.Miscellaneous.addToHistory = function(href)
{
  chrome.history.addUrl({ url: href });
};

// Clears the cache
WebDeveloper.Overlay.Miscellaneous.clearCache = function()
{
  WebDeveloper.Overlay.closeConfirmation();

  chrome.browsingData.removeCache({ since: 0 }, function()
  {
    WebDeveloper.Overlay.displayNotification(WebDeveloper.Locales.getString("clearCacheResult"));
  });
};

// Clears the history
WebDeveloper.Overlay.Miscellaneous.clearHistory = function()
{
  WebDeveloper.Overlay.closeConfirmation();

  chrome.history.deleteAll(function()
  {
    WebDeveloper.Overlay.displayNotification(WebDeveloper.Locales.getString("clearHistoryResult"));
  });
};

// Asks to confirm to clear the cache
WebDeveloper.Overlay.Miscellaneous.confirmClearCache = function()
{
  WebDeveloper.Overlay.displayConfirmation(null, WebDeveloper.Locales.getString("clearCacheConfirmation"), WebDeveloper.Locales.getString("clear"), "trash", WebDeveloper.Overlay.Miscellaneous.clearCache);
};

// Asks to confirm to clear the history
WebDeveloper.Overlay.Miscellaneous.confirmClearHistory = function()
{
  WebDeveloper.Overlay.displayConfirmation(null, WebDeveloper.Locales.getString("clearHistoryConfirmation"), WebDeveloper.Locales.getString("clear"), "trash", WebDeveloper.Overlay.Miscellaneous.clearHistory);
};

// Displays a color picker
WebDeveloper.Overlay.Miscellaneous.displayColorPicker = function()
{
  var featureItem = this;

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      var locale = {};

      locale.hoverColor    = WebDeveloper.Locales.getString("hoverColor");
      locale.selectedColor = WebDeveloper.Locales.getString("selectedColor");
      locale.title         = WebDeveloper.Locales.getString("extensionName") + " " + WebDeveloper.Locales.getString("colorPicker");

      WebDeveloper.Storage.isFeatureOnTab(featureItem.getAttribute("id"), tab, function(enabled)
      {
        WebDeveloper.Overlay.toggleFeatureOnTab(featureItem, tab, "/embedded/js/toolbar/color-picker.js", function(featureEnabled, featureLocale) { WebDeveloper.ColorPicker.displayColorPicker(!featureEnabled, document, featureLocale); }, [enabled, locale], true);
      });
    }
  });
};

// Displays all hidden elements
WebDeveloper.Overlay.Miscellaneous.displayHiddenElements = function()
{
  var featureItem = this;

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      WebDeveloper.Overlay.Miscellaneous.addFeatureOnTab(featureItem, tab, function() { WebDeveloper.Miscellaneous.displayHiddenElements([document]); });
    }
  });
};

// Displays line guides
WebDeveloper.Overlay.Miscellaneous.displayLineGuides = function()
{
  var featureItem = this;

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      var locale = {};

      locale.addHorizontalLineGuide = WebDeveloper.Locales.getString("addHorizontalLineGuide");
      locale.addVerticalLineGuide   = WebDeveloper.Locales.getString("addVerticalLineGuide");
      locale.nextPosition           = WebDeveloper.Locales.getString("nextPosition");
      locale.positionLabel          = WebDeveloper.Locales.getString("positionLabel");
      locale.previousPosition       = WebDeveloper.Locales.getString("previousPosition");
      locale.title                  = WebDeveloper.Locales.getString("extensionName") + " " + WebDeveloper.Locales.getString("lineGuides");

      WebDeveloper.Storage.isFeatureOnTab(featureItem.getAttribute("id"), tab, function(enabled)
      {
        WebDeveloper.Overlay.toggleFeatureOnTab(featureItem, tab, "/embedded/js/toolbar/line-guides.js", function(featureEnabled, featureLocale) { WebDeveloper.LineGuides.displayLineGuides(!featureEnabled, document, featureLocale); }, [enabled, locale], true);
      });
    }
  });
};

// Displays a ruler
WebDeveloper.Overlay.Miscellaneous.displayRuler = function()
{
  var featureItem = this;

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      var locale = {};

      locale.endPositionX   = WebDeveloper.Locales.getString("endPositionX");
      locale.height         = WebDeveloper.Locales.getString("height");
      locale.startPositionX = WebDeveloper.Locales.getString("startPositionX");
      locale.title          = WebDeveloper.Locales.getString("extensionName") + " " + WebDeveloper.Locales.getString("ruler");
      locale.width          = WebDeveloper.Locales.getString("width");
      locale.yLabel         = WebDeveloper.Locales.getString("yLabel");

      WebDeveloper.Storage.isFeatureOnTab(featureItem.getAttribute("id"), tab, function(enabled)
      {
        WebDeveloper.Overlay.toggleFeatureOnTab(featureItem, tab, "/embedded/js/toolbar/ruler.js", function(featureEnabled, featureLocale) { WebDeveloper.Ruler.displayRuler(!featureEnabled, document, featureLocale); }, [enabled, locale], true);
      });
    }
  });
};

// Initializes the miscellaneous overlay
WebDeveloper.Overlay.Miscellaneous.initialize = function()
{
  var clearCacheMenu            = document.getElementById("clear-cache");
  var clearHistoryMenu          = document.getElementById("clear-history");
  var displayColorPickerMenu    = document.getElementById("display-color-picker");
  var displayHiddenElementsMenu = document.getElementById("display-hidden-elements");
  var displayLineGuidesMenu     = document.getElementById("display-line-guides");
  var displayRulerMenu          = document.getElementById("display-ruler");
  var linearizePageMenu         = document.getElementById("linearize-page");
  var makeFramesResizableMenu   = document.getElementById("make-frames-resizable");
  var markAllLinksUnvisitedMenu = document.getElementById("mark-all-links-unvisited");
  var markAllLinksVisitedMenu   = document.getElementById("mark-all-links-visited");

  clearHistoryMenu.append(WebDeveloper.Locales.getString("clearHistory"));
  displayColorPickerMenu.append(WebDeveloper.Locales.getString("displayColorPicker"));
  displayHiddenElementsMenu.append(WebDeveloper.Locales.getString("displayHiddenElements"));
  displayLineGuidesMenu.append(WebDeveloper.Locales.getString("displayLineGuides"));
  displayRulerMenu.append(WebDeveloper.Locales.getString("displayRuler"));
  linearizePageMenu.append(WebDeveloper.Locales.getString("linearizePage"));
  makeFramesResizableMenu.append(WebDeveloper.Locales.getString("makeFramesResizable"));
  markAllLinksUnvisitedMenu.append(WebDeveloper.Locales.getString("markAllLinksUnvisited"));
  markAllLinksVisitedMenu.append(WebDeveloper.Locales.getString("markAllLinksVisited"));

  clearHistoryMenu.addEventListener("click", WebDeveloper.Overlay.Miscellaneous.confirmClearHistory);
  displayColorPickerMenu.addEventListener("click", WebDeveloper.Overlay.Miscellaneous.displayColorPicker);
  displayHiddenElementsMenu.addEventListener("click", WebDeveloper.Overlay.Miscellaneous.displayHiddenElements);
  displayLineGuidesMenu.addEventListener("click", WebDeveloper.Overlay.Miscellaneous.displayLineGuides);
  displayRulerMenu.addEventListener("click", WebDeveloper.Overlay.Miscellaneous.displayRuler);
  linearizePageMenu.addEventListener("click", WebDeveloper.Overlay.Miscellaneous.linearizePage);
  makeFramesResizableMenu.addEventListener("click", WebDeveloper.Overlay.Miscellaneous.makeFramesResizable);
  markAllLinksUnvisitedMenu.addEventListener("click", function() { WebDeveloper.Overlay.Miscellaneous.toggleVisitedLinks(false); });
  markAllLinksVisitedMenu.addEventListener("click", function() { WebDeveloper.Overlay.Miscellaneous.toggleVisitedLinks(true); });

  // If the browsing data API is set
  if(chrome.browsingData)
  {
    clearCacheMenu.append(WebDeveloper.Locales.getString("clearCache"));
    clearCacheMenu.addEventListener("click", WebDeveloper.Overlay.Miscellaneous.confirmClearCache);
  }
  else
  {
    clearCacheMenu.classList.add("hide");
  }
};

// Linearizes a page
WebDeveloper.Overlay.Miscellaneous.linearizePage = function()
{
  var featureItem = this;

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      WebDeveloper.Overlay.Miscellaneous.toggleFeatureOnTab(featureItem, tab, function() { WebDeveloper.Miscellaneous.linearizePage([document]); });
    }
  });
};

// Makes all frames resizable
WebDeveloper.Overlay.Miscellaneous.makeFramesResizable = function()
{
  var featureItem = this;

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      WebDeveloper.Overlay.Miscellaneous.addFeatureOnTab(featureItem, tab, function() { WebDeveloper.Miscellaneous.makeFramesResizable([document]); });
    }
  });
};

// Removes an href from the history
WebDeveloper.Overlay.Miscellaneous.removeFromHistory = function(href)
{
  chrome.history.deleteUrl({ url: href });
};

// Toggles a feature on a tab
WebDeveloper.Overlay.Miscellaneous.toggleFeatureOnTab = function(featureItem, tab, scriptCode, args)
{
  WebDeveloper.Overlay.toggleFeatureOnTab(featureItem, tab, "/features/js/miscellaneous.js", scriptCode, args);
};

// Toggles all links on the page between visited and unvisited
WebDeveloper.Overlay.Miscellaneous.toggleVisitedLinks = function(visited)
{
  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      chrome.tabs.sendMessage(tab.id, { type: "get-links" }, function(data)
      {
        var documents = data.documents;
        var links     = null;

        // Loop through the documents
        for(var i = 0, l = documents.length; i < l; i++)
        {
          links = documents[i].links;

          // Loop through all the links
          for(var j = 0, m = links.length; j < m; j++)
          {
            // If marking links as visited
            if(visited)
            {
              WebDeveloper.Overlay.Miscellaneous.addToHistory(links[j]);
            }
            else
            {
              WebDeveloper.Overlay.Miscellaneous.removeFromHistory(links[j]);
            }
          }
        }

        // If marking links as visited
        if(visited)
        {
          WebDeveloper.Common.displayNotification("markAllLinksVisitedResult");
        }
        else
        {
          WebDeveloper.Common.displayNotification("markAllLinksUnvisitedResult");
        }
      });
    }
  });
};

// If the document is still loading
if(document.readyState === "loading")
{
  document.addEventListener("DOMContentLoaded", WebDeveloper.Overlay.Miscellaneous.initialize);
}
else
{
  WebDeveloper.Overlay.Miscellaneous.initialize();
}
