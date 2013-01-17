var WebDeveloper = WebDeveloper || {};

WebDeveloper.Overlay               = WebDeveloper.Overlay || {};
WebDeveloper.Overlay.Miscellaneous = WebDeveloper.Overlay.Miscellaneous || {};

$(function()
{
  $("#clear-cache").append(WebDeveloper.Locales.getString("clearCache")).on("click", WebDeveloper.Overlay.Miscellaneous.clearCache);
  $("#clear-history").append(WebDeveloper.Locales.getString("clearHistory")).on("click", WebDeveloper.Overlay.Miscellaneous.confirmClearHistory);
  $("#display-color-picker").append(WebDeveloper.Locales.getString("displayColorPicker")).on("click", WebDeveloper.Overlay.Miscellaneous.displayColorPicker);
  $("#display-hidden-elements").append(WebDeveloper.Locales.getString("displayHiddenElements")).on("click", WebDeveloper.Overlay.Miscellaneous.displayHiddenElements);
  $("#display-line-guides").append(WebDeveloper.Locales.getString("displayLineGuides")).on("click", WebDeveloper.Overlay.Miscellaneous.displayLineGuides);
  $("#display-ruler").append(WebDeveloper.Locales.getString("displayRuler")).on("click", WebDeveloper.Overlay.Miscellaneous.displayRuler);
  $("#linearize-page").append(WebDeveloper.Locales.getString("linearizePage")).on("click", WebDeveloper.Overlay.Miscellaneous.linearizePage);
  $("#make-frames-resizable").append(WebDeveloper.Locales.getString("makeFramesResizable")).on("click", WebDeveloper.Overlay.Miscellaneous.makeFramesResizable);
  $("#mark-all-links-unvisited").append(WebDeveloper.Locales.getString("markAllLinksUnvisited")).on("click", function() { WebDeveloper.Overlay.Miscellaneous.toggleVisitedLinks(false); });
  $("#mark-all-links-visited").append(WebDeveloper.Locales.getString("markAllLinksVisited")).on("click", function() { WebDeveloper.Overlay.Miscellaneous.toggleVisitedLinks(true); });
});

// Adds a feature on a tab
WebDeveloper.Overlay.Miscellaneous.addFeatureOnTab = function(featureItem, tab, scriptCode)
{
  WebDeveloper.Overlay.addFeatureOnTab(featureItem, tab, "features/javascript/miscellaneous.js", scriptCode);
};

// Adds an href to the history
WebDeveloper.Overlay.Miscellaneous.addToHistory = function(href)
{
  chrome.history.addUrl({url: href});
};

// Clears the cache
WebDeveloper.Overlay.Miscellaneous.clearCache = function()
{
  WebDeveloper.Overlay.openTab("chrome://settings/clearBrowserData");
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

// Asks to confirm to clear the history
WebDeveloper.Overlay.Miscellaneous.confirmClearHistory = function()
{
  WebDeveloper.Overlay.displayConfirmation(null, WebDeveloper.Locales.getString("clearHistoryConfirmation"), WebDeveloper.Locales.getString("clear"), "trash", WebDeveloper.Overlay.Miscellaneous.clearHistory);
};

// Displays a color picker
WebDeveloper.Overlay.Miscellaneous.displayColorPicker = function()
{
  var featureItem = $(this);

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      var feature = featureItem.attr("id");
      var display = !chrome.extension.getBackgroundPage().WebDeveloper.Storage.isFeatureOnTab(feature, tab);
      var locale  = {};

      locale.hoverColor    = WebDeveloper.Locales.getString("hoverColor");
      locale.selectedColor = WebDeveloper.Locales.getString("selectedColor");
      locale.title         = WebDeveloper.Locales.getString("extensionName") + " " + WebDeveloper.Locales.getString("colorPicker");

      WebDeveloper.Overlay.toggleFeatureOnTab(featureItem, tab, "toolbar/javascript/color-picker.js", "WebDeveloper.ColorPicker.displayColorPicker(" + display + ", document, '" + ich.colorPickerToolbar(locale, true) + "');", true);
    }
  });
};

// Displays all hidden elements
WebDeveloper.Overlay.Miscellaneous.displayHiddenElements = function()
{
  var featureItem = $(this);

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      WebDeveloper.Overlay.Miscellaneous.addFeatureOnTab(featureItem, tab, "WebDeveloper.Miscellaneous.displayHiddenElements([document]);");
    }
  });
};

// Displays line guides
WebDeveloper.Overlay.Miscellaneous.displayLineGuides = function()
{
  var featureItem = $(this);

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      var feature = featureItem.attr("id");
      var display = !chrome.extension.getBackgroundPage().WebDeveloper.Storage.isFeatureOnTab(feature, tab);
      var locale  = {};

      locale.addHorizontalLineGuide = WebDeveloper.Locales.getString("addHorizontalLineGuide");
      locale.addVerticalLineGuide   = WebDeveloper.Locales.getString("addVerticalLineGuide");
      locale.nextPosition           = WebDeveloper.Locales.getString("nextPosition");
      locale.positionLabel          = WebDeveloper.Locales.getString("positionLabel");
      locale.previousPosition       = WebDeveloper.Locales.getString("previousPosition");
      locale.title                  = WebDeveloper.Locales.getString("extensionName") + " " + WebDeveloper.Locales.getString("lineGuides");

      WebDeveloper.Overlay.toggleFeatureOnTab(featureItem, tab, "toolbar/javascript/line-guides.js", "WebDeveloper.LineGuides.displayLineGuides(" + display + ", document, '" + ich.lineGuidesToolbar(locale, true) + "');", true);
    }
  });
};

// Displays a ruler
WebDeveloper.Overlay.Miscellaneous.displayRuler = function()
{
  var featureItem = $(this);

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      var feature = featureItem.attr("id");
      var display = !chrome.extension.getBackgroundPage().WebDeveloper.Storage.isFeatureOnTab(feature, tab);
      var locale  = {};

      locale.endPositionX   = WebDeveloper.Locales.getString("endPositionX");
      locale.height         = WebDeveloper.Locales.getString("height");
      locale.startPositionX = WebDeveloper.Locales.getString("startPositionX");
      locale.title          = WebDeveloper.Locales.getString("extensionName") + " " + WebDeveloper.Locales.getString("ruler");
      locale.width          = WebDeveloper.Locales.getString("width");
      locale.yLabel         = WebDeveloper.Locales.getString("yLabel");

      WebDeveloper.Overlay.toggleFeatureOnTab(featureItem, tab, "toolbar/javascript/ruler.js", "WebDeveloper.Ruler.displayRuler(" + display + ", document, '" + ich.rulerToolbar(locale, true) + "');", true);
    }
  });
};

// Linearizes a page
WebDeveloper.Overlay.Miscellaneous.linearizePage = function()
{
  var featureItem = $(this);

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      WebDeveloper.Overlay.Miscellaneous.toggleFeatureOnTab(featureItem, tab, "WebDeveloper.Miscellaneous.linearizePage([document]);");
    }
  });
};

// Makes all frames resizable
WebDeveloper.Overlay.Miscellaneous.makeFramesResizable = function()
{
  var featureItem = $(this);

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      WebDeveloper.Overlay.Miscellaneous.addFeatureOnTab(featureItem, tab, "WebDeveloper.Miscellaneous.makeFramesResizable([document]);");
    }
  });
};

// Removes an href from the history
WebDeveloper.Overlay.Miscellaneous.removeFromHistory = function(href)
{
  chrome.history.deleteUrl({url: href});
};

// Toggles a feature on a tab
WebDeveloper.Overlay.Miscellaneous.toggleFeatureOnTab = function(featureItem, tab, scriptCode)
{
  WebDeveloper.Overlay.toggleFeatureOnTab(featureItem, tab, "features/javascript/miscellaneous.js", scriptCode);
};

// Toggles all links on the page between visited and unvisited
WebDeveloper.Overlay.Miscellaneous.toggleVisitedLinks = function(visited)
{
  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      chrome.tabs.sendMessage(tab.id, {type: "get-links"}, function(data)
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
      });
    }
  });
};
