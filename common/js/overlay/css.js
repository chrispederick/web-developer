var WebDeveloper = WebDeveloper || {}; // eslint-disable-line no-redeclare, no-use-before-define

WebDeveloper.Overlay     = WebDeveloper.Overlay || {};
WebDeveloper.Overlay.CSS = WebDeveloper.Overlay.CSS || {};

// Adds a feature on a tab
WebDeveloper.Overlay.CSS.addFeatureOnTab = function(featureItem, tab, scriptCode)
{
  WebDeveloper.Overlay.addFeatureOnTab(featureItem, tab, "/features/js/css.js", scriptCode);
};

// Disables all styles
WebDeveloper.Overlay.CSS.disableAllStyles = function()
{
  var featureItem = this;

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      WebDeveloper.Storage.isFeatureOnTab(featureItem.getAttribute("id"), tab, function(enabled)
      {
        WebDeveloper.Overlay.CSS.toggleFeatureOnTab(featureItem, tab, function(featureEnabled) { WebDeveloper.CSS.toggleAllStyles(!featureEnabled, [document]); }, [enabled]);
      });
    }
  });
};

// Disables the browser default styles
WebDeveloper.Overlay.CSS.disableBrowserDefaultStyles = function()
{
  var featureItem = this;

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      WebDeveloper.Overlay.CSS.toggleFeatureOnTab(featureItem, tab, function() { WebDeveloper.CSS.toggleBrowserDefaultStyles([document]); });
    }
  });
};

// Disables embedded styles
WebDeveloper.Overlay.CSS.disableEmbeddedStyles = function()
{
  var featureItem = this;

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      WebDeveloper.Storage.isFeatureOnTab(featureItem.getAttribute("id"), tab, function(enabled)
      {
        WebDeveloper.Overlay.CSS.toggleFeatureOnTab(featureItem, tab, function(featureEnabled) { WebDeveloper.CSS.toggleEmbeddedStyles(!featureEnabled, [document]); }, [enabled]);
      });
    }
  });
};

// Disables inline styles
WebDeveloper.Overlay.CSS.disableInlineStyles = function()
{
  var featureItem = this;

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      WebDeveloper.Storage.isFeatureOnTab(featureItem.getAttribute("id"), tab, function(enabled)
      {
        WebDeveloper.Overlay.CSS.toggleFeatureOnTab(featureItem, tab, function(featureEnabled) { WebDeveloper.CSS.toggleInlineStyles(!featureEnabled, [document]); }, [enabled]);
      });
    }
  });
};

// Disables linked style sheets
WebDeveloper.Overlay.CSS.disableLinkedStyleSheets = function()
{
  var featureItem = this;

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      WebDeveloper.Storage.isFeatureOnTab(featureItem.getAttribute("id"), tab, function(enabled)
      {
        WebDeveloper.Overlay.CSS.toggleFeatureOnTab(featureItem, tab, function(featureEnabled) { WebDeveloper.CSS.toggleLinkedStyleSheets(!featureEnabled, [document]); }, [enabled]);
      });
    }
  });
};

// Disables print styles
WebDeveloper.Overlay.CSS.disablePrintStyles = function()
{
  var featureItem = this;

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      WebDeveloper.Storage.isFeatureOnTab(featureItem.getAttribute("id"), tab, function(enabled)
      {
        WebDeveloper.Overlay.CSS.toggleFeatureOnTab(featureItem, tab, function(featureEnabled) { WebDeveloper.CSS.togglePrintStyles(!featureEnabled, [document]); }, [enabled]);
      });
    }
  });
};

// Displays handheld styles
WebDeveloper.Overlay.CSS.displayHandheldStyles = function()
{
  var featureItem = this;

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      WebDeveloper.Storage.isFeatureOnTab(featureItem.getAttribute("id"), tab, function(displayHandheldStylesEnabled)
      {
        WebDeveloper.Storage.isFeatureOnTab("display-print-styles", tab, function(displayPrintStylesEnabled)
        {
          // If about to display handheld styles and print styles are being displayed
          if(!displayHandheldStylesEnabled && displayPrintStylesEnabled)
          {
            WebDeveloper.Overlay.CSS.toggleFeatureOnTab(document.getElementById("display-print-styles"), tab, function() { WebDeveloper.CSS.toggleMediaTypeStyles("print", false, [document]); });
          }

          WebDeveloper.Overlay.CSS.toggleFeatureOnTab(featureItem, tab, function(featureEnabled) { WebDeveloper.CSS.toggleMediaTypeStyles("handheld", !featureEnabled, [document]); }, [displayHandheldStylesEnabled]);
        });
      });
    }
  });
};

// Displays print styles
WebDeveloper.Overlay.CSS.displayPrintStyles = function()
{
  var featureItem = this;

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      var storage = WebDeveloper.Storage;

      storage.isFeatureOnTab(featureItem.getAttribute("id"), tab, function(displayPrintStylesEnabled)
      {
        storage.isFeatureOnTab("display-handheld-styles", tab, function(displayHandheldStylesEnabled)
        {
          // If about to display print styles and handheld styles are being displayed
          if(!displayPrintStylesEnabled && displayHandheldStylesEnabled)
          {
            WebDeveloper.Overlay.CSS.toggleFeatureOnTab(document.getElementById("display-handheld-styles"), tab, function() { WebDeveloper.CSS.toggleMediaTypeStyles("handheld", false, [document]); });
          }

          WebDeveloper.Overlay.CSS.toggleFeatureOnTab(featureItem, tab, function(featureEnabled) { WebDeveloper.CSS.toggleMediaTypeStyles("print", !featureEnabled, [document]); }, [displayPrintStylesEnabled]);
        });
      });
    }
  });
};

// Edits the CSS of the page
WebDeveloper.Overlay.CSS.editCSS = function()
{
  var featureItem = this;

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      var locale = {};

      locale.couldNotLoadCSS = WebDeveloper.Locales.getString("couldNotLoadCSS");
      locale.dashboardTitle  = WebDeveloper.Locales.getString("extensionName") + " " + WebDeveloper.Locales.getString("dashboard");
      locale.editCSS         = WebDeveloper.Locales.getString("editCSS");
      locale.embeddedStyles  = WebDeveloper.Locales.getString("embeddedStyles");

      WebDeveloper.Storage.isFeatureOnTab(featureItem.getAttribute("id"), tab, function(enabled)
      {
        WebDeveloper.Overlay.toggleFeatureOnTab(featureItem, tab, ["/embedded/js/dashboard/dashboard.js", "/embedded/js/dashboard/edit-css.js"], function(featureEnabled, cssLocale) { WebDeveloper.EditCSS.editCSS(!featureEnabled, document, cssLocale); }, [enabled, locale], true);
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
  locale.styleSheet         = WebDeveloper.Locales.getString("styleSheet");
  locale.styleSheets        = WebDeveloper.Locales.getString("styleSheets");
  locale.syntaxHighlighting = WebDeveloper.Locales.getString("syntaxHighlighting");

  return locale;
};

// Initializes the CSS overlay
WebDeveloper.Overlay.CSS.initialize = function()
{
  var disableAllStylesMenu            = document.getElementById("disable-all-styles");
  var disableBrowserDefaultStylesMenu = document.getElementById("disable-browser-default-styles");
  var disableEmbeddedStylesMenu       = document.getElementById("disable-embedded-styles");
  var disableInlineStylesMenu         = document.getElementById("disable-inline-styles");
  var disableLinkedStyleSheetsMenu    = document.getElementById("disable-linked-style-sheets");
  var disablePrintStylesMenu          = document.getElementById("disable-print-styles");
  var displayHandheldStylesMenu       = document.getElementById("display-handheld-styles");
  var displayPrintStylesMenu          = document.getElementById("display-print-styles");
  var editCSSMenu                     = document.getElementById("edit-css");
  var reloadLinkedStyleSheetsMenu     = document.getElementById("reload-linked-style-sheets");
  var useBorderBoxModelMenu           = document.getElementById("use-border-box-model");
  var viewCSSMenu                     = document.getElementById("view-css");

  disableAllStylesMenu.append(WebDeveloper.Locales.getString("disableAllStyles"));
  disableBrowserDefaultStylesMenu.append(WebDeveloper.Locales.getString("disableBrowserDefaultStyles"));
  disableEmbeddedStylesMenu.append(WebDeveloper.Locales.getString("disableEmbeddedStyles"));
  disableInlineStylesMenu.append(WebDeveloper.Locales.getString("disableInlineStyles"));
  disableLinkedStyleSheetsMenu.append(WebDeveloper.Locales.getString("disableLinkedStyleSheets"));
  disablePrintStylesMenu.append(WebDeveloper.Locales.getString("disablePrintStyles"));
  displayHandheldStylesMenu.append(WebDeveloper.Locales.getString("displayHandheldStyles"));
  displayPrintStylesMenu.append(WebDeveloper.Locales.getString("displayPrintStyles"));
  editCSSMenu.append(WebDeveloper.Locales.getString("editCSS"));
  reloadLinkedStyleSheetsMenu.append(WebDeveloper.Locales.getString("reloadLinkedStyleSheets"));
  useBorderBoxModelMenu.append(WebDeveloper.Locales.getString("useBorderBoxModel"));
  viewCSSMenu.append(WebDeveloper.Locales.getString("viewCSS"));

  disableAllStylesMenu.addEventListener("click", WebDeveloper.Overlay.CSS.disableAllStyles);
  disableBrowserDefaultStylesMenu.addEventListener("click", WebDeveloper.Overlay.CSS.disableBrowserDefaultStyles);
  disableEmbeddedStylesMenu.addEventListener("click", WebDeveloper.Overlay.CSS.disableEmbeddedStyles);
  disableInlineStylesMenu.addEventListener("click", WebDeveloper.Overlay.CSS.disableInlineStyles);
  disableLinkedStyleSheetsMenu.addEventListener("click", WebDeveloper.Overlay.CSS.disableLinkedStyleSheets);
  disablePrintStylesMenu.addEventListener("click", WebDeveloper.Overlay.CSS.disablePrintStyles);
  displayHandheldStylesMenu.addEventListener("click", WebDeveloper.Overlay.CSS.displayHandheldStyles);
  displayPrintStylesMenu.addEventListener("click", WebDeveloper.Overlay.CSS.displayPrintStyles);
  editCSSMenu.addEventListener("click", WebDeveloper.Overlay.CSS.editCSS);
  reloadLinkedStyleSheetsMenu.addEventListener("click", WebDeveloper.Overlay.CSS.reloadLinkedStyleSheets);
  useBorderBoxModelMenu.addEventListener("click", WebDeveloper.Overlay.CSS.useBorderBoxModel);
  viewCSSMenu.addEventListener("click", WebDeveloper.Overlay.CSS.viewCSS);
};

// Reloads the linked style sheets of the page
WebDeveloper.Overlay.CSS.reloadLinkedStyleSheets = function()
{
  var featureItem = this;

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      WebDeveloper.Overlay.CSS.addFeatureOnTab(featureItem, tab, function() { WebDeveloper.CSS.reloadLinkedStyleSheets([document]); });
    }
  });
};

// Toggles a feature on a tab
WebDeveloper.Overlay.CSS.toggleFeatureOnTab = function(featureItem, tab, scriptCode, args)
{
  WebDeveloper.Overlay.toggleFeatureOnTab(featureItem, tab, "/features/js/css.js", scriptCode, args);
};

// Displays alt attributes for all images
WebDeveloper.Overlay.CSS.useBorderBoxModel = function()
{
  var featureItem = this;

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      WebDeveloper.Overlay.CSS.toggleFeatureOnTab(featureItem, tab, function() { WebDeveloper.CSS.useBorderBoxModel([document]); });
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
        WebDeveloper.Storage.getItem("syntax_highlight_theme", function(item)
        {
          data.theme = item;

          WebDeveloper.Overlay.openGeneratedTab(chrome.runtime.getURL("/generated/view-css.html"), tab.index, data, WebDeveloper.Overlay.CSS.getViewCSSLocale());
        });
      });
    }
  });
};

// If the document is still loading
if(document.readyState === "loading")
{
  document.addEventListener("DOMContentLoaded", WebDeveloper.Overlay.CSS.initialize);
}
else
{
  WebDeveloper.Overlay.CSS.initialize();
}
