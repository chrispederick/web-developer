var WebDeveloper = WebDeveloper || {}; // eslint-disable-line no-use-before-define

WebDeveloper.Overlay     = WebDeveloper.Overlay || {};
WebDeveloper.Overlay.CSS = WebDeveloper.Overlay.CSS || {};

$(function()
{
  $("#disable-all-styles").append(WebDeveloper.Locales.getString("disableAllStyles")).on("click", WebDeveloper.Overlay.CSS.disableAllStyles);
  $("#disable-browser-default-styles").append(WebDeveloper.Locales.getString("disableBrowserDefaultStyles")).on("click", WebDeveloper.Overlay.CSS.disableBrowserDefaultStyles);
  $("#disable-embedded-styles").append(WebDeveloper.Locales.getString("disableEmbeddedStyles")).on("click", WebDeveloper.Overlay.CSS.disableEmbeddedStyles);
  $("#disable-inline-styles").append(WebDeveloper.Locales.getString("disableInlineStyles")).on("click", WebDeveloper.Overlay.CSS.disableInlineStyles);
  $("#disable-linked-style-sheets").append(WebDeveloper.Locales.getString("disableLinkedStyleSheets")).on("click", WebDeveloper.Overlay.CSS.disableLinkedStyleSheets);
  $("#disable-print-styles").append(WebDeveloper.Locales.getString("disablePrintStyles")).on("click", WebDeveloper.Overlay.CSS.disablePrintStyles);
  $("#display-handheld-styles").append(WebDeveloper.Locales.getString("displayHandheldStyles")).on("click", WebDeveloper.Overlay.CSS.displayHandheldStyles);
  $("#display-print-styles").append(WebDeveloper.Locales.getString("displayPrintStyles")).on("click", WebDeveloper.Overlay.CSS.displayPrintStyles);
  $("#edit-css").append(WebDeveloper.Locales.getString("editCSS")).on("click", WebDeveloper.Overlay.CSS.editCSS);
  $("#reload-linked-style-sheets").append(WebDeveloper.Locales.getString("reloadLinkedStyleSheets")).on("click", WebDeveloper.Overlay.CSS.reloadLinkedStyleSheets);
  $("#use-border-box-model").append(WebDeveloper.Locales.getString("useBorderBoxModel")).on("click", WebDeveloper.Overlay.CSS.useBorderBoxModel);
  $("#view-css").append(WebDeveloper.Locales.getString("viewCSS")).on("click", WebDeveloper.Overlay.CSS.viewCSS);
});

// Adds a feature on a tab
WebDeveloper.Overlay.CSS.addFeatureOnTab = function(featureItem, tab, scriptCode)
{
  WebDeveloper.Overlay.addFeatureOnTab(featureItem, tab, "/features/javascript/css.js", scriptCode);
};

// Disables all styles
WebDeveloper.Overlay.CSS.disableAllStyles = function()
{
  var featureItem = $(this);

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      chrome.extension.getBackgroundPage().WebDeveloper.Storage.isFeatureOnTab(featureItem.attr("id"), tab, function(enabled)
      {
        WebDeveloper.Overlay.CSS.toggleFeatureOnTab(featureItem, tab, "WebDeveloper.CSS.toggleAllStyles(" + !enabled + ", [document]);");
      });
    }
  });
};

// Disables the browser default styles
WebDeveloper.Overlay.CSS.disableBrowserDefaultStyles = function()
{
  var featureItem = $(this);

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      WebDeveloper.Overlay.CSS.toggleFeatureOnTab(featureItem, tab, "WebDeveloper.CSS.toggleBrowserDefaultStyles([document]);");
    }
  });
};

// Disables embedded styles
WebDeveloper.Overlay.CSS.disableEmbeddedStyles = function()
{
  var featureItem = $(this);

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      chrome.extension.getBackgroundPage().WebDeveloper.Storage.isFeatureOnTab(featureItem.attr("id"), tab, function(enabled)
      {
        WebDeveloper.Overlay.CSS.toggleFeatureOnTab(featureItem, tab, "WebDeveloper.CSS.toggleEmbeddedStyles(" + !enabled + ", [document]);");
      });
    }
  });
};

// Disables inline styles
WebDeveloper.Overlay.CSS.disableInlineStyles = function()
{
  var featureItem = $(this);

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      chrome.extension.getBackgroundPage().WebDeveloper.Storage.isFeatureOnTab(featureItem.attr("id"), tab, function(enabled)
      {
        WebDeveloper.Overlay.CSS.toggleFeatureOnTab(featureItem, tab, "WebDeveloper.CSS.toggleInlineStyles(" + !enabled + ", [document]);");
      });
    }
  });
};

// Disables linked style sheets
WebDeveloper.Overlay.CSS.disableLinkedStyleSheets = function()
{
  var featureItem = $(this);

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      chrome.extension.getBackgroundPage().WebDeveloper.Storage.isFeatureOnTab(featureItem.attr("id"), tab, function(enabled)
      {
        WebDeveloper.Overlay.CSS.toggleFeatureOnTab(featureItem, tab, "WebDeveloper.CSS.toggleLinkedStyleSheets(" + !enabled + ", [document]);");
      });
    }
  });
};

// Disables print styles
WebDeveloper.Overlay.CSS.disablePrintStyles = function()
{
  var featureItem = $(this);

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      chrome.extension.getBackgroundPage().WebDeveloper.Storage.isFeatureOnTab(featureItem.attr("id"), tab, function(enabled)
      {
        WebDeveloper.Overlay.CSS.toggleFeatureOnTab(featureItem, tab, "WebDeveloper.CSS.togglePrintStyles(" + !enabled + ", [document]);");
      });
    }
  });
};

// Displays handheld styles
WebDeveloper.Overlay.CSS.displayHandheldStyles = function()
{
  var featureItem = $(this);

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      var storage = chrome.extension.getBackgroundPage().WebDeveloper.Storage;

      storage.isFeatureOnTab(featureItem.attr("id"), tab, function(displayHandheldStylesEnabled)
      {
        storage.isFeatureOnTab("display-print-styles", tab, function(displayPrintStylesEnabled)
        {
          // If about to display handheld styles and print styles are being displayed
          if(!displayHandheldStylesEnabled && displayPrintStylesEnabled)
          {
            WebDeveloper.Overlay.CSS.toggleFeatureOnTab($("#display-print-styles"), tab, 'WebDeveloper.CSS.toggleMediaTypeStyles("print", false, [document]);');
          }

          WebDeveloper.Overlay.CSS.toggleFeatureOnTab(featureItem, tab, 'WebDeveloper.CSS.toggleMediaTypeStyles("handheld", ' + !displayHandheldStylesEnabled + ", [document]);");
        });
      });
    }
  });
};

// Displays print styles
WebDeveloper.Overlay.CSS.displayPrintStyles = function()
{
  var featureItem = $(this);

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      var storage = chrome.extension.getBackgroundPage().WebDeveloper.Storage;

      storage.isFeatureOnTab(featureItem.attr("id"), tab, function(displayPrintStylesEnabled)
      {
        storage.isFeatureOnTab("display-handheld-styles", tab, function(displayHandheldStylesEnabled)
        {
          // If about to display print styles and handheld styles are being displayed
          if(!displayPrintStylesEnabled && displayHandheldStylesEnabled)
          {
            WebDeveloper.Overlay.CSS.toggleFeatureOnTab($("#display-handheld-styles"), tab, 'WebDeveloper.CSS.toggleMediaTypeStyles("handheld", false, [document]);');
          }

          WebDeveloper.Overlay.CSS.toggleFeatureOnTab(featureItem, tab, 'WebDeveloper.CSS.toggleMediaTypeStyles("print", ' + !displayPrintStylesEnabled + ", [document]);");
        });
      });
    }
  });
};

// Edits the CSS of the page
WebDeveloper.Overlay.CSS.editCSS = function()
{
  var featureItem = $(this);

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      var locale  = "";

      locale += "'couldNotLoadCSS': '" + WebDeveloper.Locales.getString("couldNotLoadCSS") + "',";
      locale += "'dashboardTitle': '" + WebDeveloper.Locales.getString("extensionName") + " " + WebDeveloper.Locales.getString("dashboard") + "',";
      locale += "'editCSS': '" + WebDeveloper.Locales.getString("editCSS") + "',";
      locale += "'embeddedStyles': '" + WebDeveloper.Locales.getString("embeddedStyles") + "'";

      chrome.extension.getBackgroundPage().WebDeveloper.Storage.isFeatureOnTab(featureItem.attr("id"), tab, function(enabled)
      {
        WebDeveloper.Overlay.toggleFeatureOnTab(featureItem, tab, "/dashboard/javascript/dashboard.js", "WebDeveloper.EditCSS.editCSS(" + !enabled + ", document, {" + locale + "});", true);
      });
    }
  });
};

// Returns the locale for the view CSS feature
WebDeveloper.Overlay.CSS.getViewCSSLocale = function()
{
  var locale = WebDeveloper.Locales.setupGeneratedLocale();

  locale.couldNotLoadCSS    = WebDeveloper.Locales.getString("couldNotLoadCSS");
  locale.css                = WebDeveloper.Locales.getString("css");
  locale.dark               = WebDeveloper.Locales.getString("dark");
  locale.embeddedCSSFrom    = WebDeveloper.Locales.getString("embeddedCSSFrom");
  locale.light              = WebDeveloper.Locales.getString("light");
  locale.none               = WebDeveloper.Locales.getString("none");
  locale.syntaxHighlighting = WebDeveloper.Locales.getString("syntaxHighlighting");

  return locale;
};

// Reloads the linked style sheets of the page
WebDeveloper.Overlay.CSS.reloadLinkedStyleSheets = function()
{
  var featureItem = $(this);

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      WebDeveloper.Overlay.CSS.addFeatureOnTab(featureItem, tab, "WebDeveloper.CSS.reloadLinkedStyleSheets([document]);");
    }
  });
};

// Toggles a feature on a tab
WebDeveloper.Overlay.CSS.toggleFeatureOnTab = function(featureItem, tab, scriptCode)
{
  WebDeveloper.Overlay.toggleFeatureOnTab(featureItem, tab, "/features/javascript/css.js", scriptCode);
};

// Displays alt attributes for all images
WebDeveloper.Overlay.CSS.useBorderBoxModel = function()
{
  var featureItem = $(this);

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      WebDeveloper.Overlay.CSS.toggleFeatureOnTab(featureItem, tab, "WebDeveloper.CSS.useBorderBoxModel([document]);");
    }
  });
};

// Displays the CSS
WebDeveloper.Overlay.CSS.viewCSS = function()
{
  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      chrome.tabs.sendMessage(tab.id, { type: "get-css" }, function(data)
      {
        chrome.extension.getBackgroundPage().WebDeveloper.Storage.getItem("syntax_highlight_theme", function(item)
        {
          data.theme = item;

          chrome.extension.getBackgroundPage().WebDeveloper.Background.openGeneratedTab(chrome.extension.getURL("generated/view-css.html"), tab.index, data, WebDeveloper.Overlay.CSS.getViewCSSLocale());
          WebDeveloper.Overlay.close();
        });
      });
    }
  });
};
