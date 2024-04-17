var WebDeveloper = WebDeveloper || {}; // eslint-disable-line no-redeclare, no-use-before-define

WebDeveloper.Overlay             = WebDeveloper.Overlay || {};
WebDeveloper.Overlay.Information = WebDeveloper.Overlay.Information || {};

// Displays the abbreviations on a page
WebDeveloper.Overlay.Information.displayAbbreviations = function()
{
  var featureItem = this;

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      WebDeveloper.Overlay.Information.toggleFeatureOnTab(featureItem, tab, function() { WebDeveloper.Information.displayAbbreviations([document]); });
    }
  });
};

// Displays the access keys on a page
WebDeveloper.Overlay.Information.displayAccessKeys = function()
{
  var featureItem = this;

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      WebDeveloper.Storage.isFeatureOnTab(featureItem.getAttribute("id"), tab, function(enabled)
      {
        WebDeveloper.Overlay.Information.toggleFeatureOnTab(featureItem, tab, function(featureEnabled) { WebDeveloper.Information.displayAccessKeys(!featureEnabled, [document]); }, [enabled]);
      });
    }
  });
};

// Displays the anchors on a page
WebDeveloper.Overlay.Information.displayAnchors = function()
{
  var featureItem = this;

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      WebDeveloper.Storage.isFeatureOnTab(featureItem.getAttribute("id"), tab, function(enabled)
      {
        WebDeveloper.Overlay.Information.toggleFeatureOnTab(featureItem, tab, function(featureEnabled) { WebDeveloper.Information.displayAnchors(!featureEnabled, [document]); }, [enabled]);
      });
    }
  });
};

// Displays the ARIA roles on a page
WebDeveloper.Overlay.Information.displayARIARoles = function()
{
  var featureItem = this;

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      WebDeveloper.Overlay.Information.toggleFeatureOnTab(featureItem, tab, function() { WebDeveloper.Information.displayARIARoles([document]); });
    }
  });
};

// Displays the dimensions for divs on a page
WebDeveloper.Overlay.Information.displayDivDimensions = function()
{
  var featureItem = this;

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      var locale = {};

      locale.height = WebDeveloper.Locales.getString("height");
      locale.width  = WebDeveloper.Locales.getString("width");

      WebDeveloper.Storage.isFeatureOnTab(featureItem.getAttribute("id"), tab, function(enabled)
      {
        WebDeveloper.Overlay.Information.toggleFeatureOnTab(featureItem, tab, function(featureEnabled, featureLocale) { WebDeveloper.Information.displayDivDimensions(!featureEnabled, [document], featureLocale); }, [enabled, locale]);
      });
    }
  });
};

// Displays the order of the divs on a page
WebDeveloper.Overlay.Information.displayDivOrder = function()
{
  var featureItem = this;

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      WebDeveloper.Storage.isFeatureOnTab(featureItem.getAttribute("id"), tab, function(enabled)
      {
        WebDeveloper.Overlay.Information.toggleFeatureOnTab(featureItem, tab, function(featureEnabled) { WebDeveloper.Information.displayDivOrder(!featureEnabled, [document]); }, [enabled]);
      });
    }
  });
};

// Displays information about an element
WebDeveloper.Overlay.Information.displayElementInformation = function()
{
  var featureItem = this;

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      var locale = {};

      locale.ancestors                         = WebDeveloper.Locales.getString("ancestors");
      locale.children                          = WebDeveloper.Locales.getString("children");
      locale.dashboardTitle                    = WebDeveloper.Locales.getString("extensionName") + " " + WebDeveloper.Locales.getString("dashboard");
      locale.dom                               = WebDeveloper.Locales.getString("dom");
      locale.elementInformation                = WebDeveloper.Locales.getString("elementInformation");
      locale.layout                            = WebDeveloper.Locales.getString("layout");
      locale.position                          = WebDeveloper.Locales.getString("position");
      locale.selectAnElementDisplayInformation = WebDeveloper.Locales.getString("selectAnElementDisplayInformation");
      locale.text                              = WebDeveloper.Locales.getString("text");

      WebDeveloper.Storage.isFeatureOnTab(featureItem.getAttribute("id"), tab, function(enabled)
      {
        WebDeveloper.Overlay.toggleFeatureOnTab(featureItem, tab, "/dashboard/javascript/dashboard.js", function(featureEnabled, featureLocale) { WebDeveloper.ElementInformation.initialize(!featureEnabled, document, featureLocale); }, [enabled, locale]);
      });
    }
  });
};

// Displays the id and class details for a page
WebDeveloper.Overlay.Information.displayIdClassDetails = function()
{
  var featureItem = this;

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      WebDeveloper.Storage.isFeatureOnTab(featureItem.getAttribute("id"), tab, function(enabled)
      {
        WebDeveloper.Overlay.Information.toggleFeatureOnTab(featureItem, tab, function(featureEnabled) { WebDeveloper.Information.displayIdClassDetails(!featureEnabled, [document]); }, [enabled]);
      });
    }
  });
};

// Displays the details for the links on a page
WebDeveloper.Overlay.Information.displayLinkDetails = function()
{
  var featureItem = this;

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      WebDeveloper.Overlay.Information.toggleFeatureOnTab(featureItem, tab, function() { WebDeveloper.Information.displayLinkDetails([document]); });
    }
  });
};

// Displays the information for objects on a page
WebDeveloper.Overlay.Information.displayObjectInformation = function()
{
  var featureItem = this;

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      WebDeveloper.Storage.isFeatureOnTab(featureItem.getAttribute("id"), tab, function(enabled)
      {
        WebDeveloper.Overlay.Information.toggleFeatureOnTab(featureItem, tab, function(featureEnabled) { WebDeveloper.Information.displayObjectInformation(!featureEnabled, [document]); }, [enabled]);
      });
    }
  });
};

// Displays the stack levels on a page
WebDeveloper.Overlay.Information.displayStackLevels = function()
{
  var featureItem = this;

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      WebDeveloper.Storage.isFeatureOnTab(featureItem.getAttribute("id"), tab, function(enabled)
      {
        WebDeveloper.Overlay.Information.toggleFeatureOnTab(featureItem, tab, function(featureEnabled) { WebDeveloper.Information.displayStackLevels(!featureEnabled, [document]); }, [enabled]);
      });
    }
  });
};

// Displays the tab indices on a page
WebDeveloper.Overlay.Information.displayTabIndex = function()
{
  var featureItem = this;

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      WebDeveloper.Storage.isFeatureOnTab(featureItem.getAttribute("id"), tab, function(enabled)
      {
        WebDeveloper.Overlay.Information.toggleFeatureOnTab(featureItem, tab, function(featureEnabled) { WebDeveloper.Information.displayTabIndex(!featureEnabled, [document]); }, [enabled]);
      });
    }
  });
};

// Displays the depth of all tables on a page
WebDeveloper.Overlay.Information.displayTableDepth = function()
{
  var featureItem = this;

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      WebDeveloper.Storage.isFeatureOnTab(featureItem.getAttribute("id"), tab, function(enabled)
      {
        WebDeveloper.Overlay.Information.toggleFeatureOnTab(featureItem, tab, function(featureEnabled, depth) { WebDeveloper.Information.displayTableDepth(!featureEnabled, [document], depth); }, [enabled, WebDeveloper.Locales.getString("depth")]);
      });
    }
  });
};

// Displays the information for tables on a page
WebDeveloper.Overlay.Information.displayTableInformation = function()
{
  var featureItem = this;

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      WebDeveloper.Storage.isFeatureOnTab(featureItem.getAttribute("id"), tab, function(enabled)
      {
        WebDeveloper.Overlay.Information.toggleFeatureOnTab(featureItem, tab, function(featureEnabled) { WebDeveloper.Information.displayTableInformation(!featureEnabled, [document]); }, [enabled]);
      });
    }
  });
};

// Displays the title attributes on a page
WebDeveloper.Overlay.Information.displayTitleAttributes = function()
{
  var featureItem = this;

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      WebDeveloper.Storage.isFeatureOnTab(featureItem.getAttribute("id"), tab, function(enabled)
      {
        WebDeveloper.Overlay.Information.toggleFeatureOnTab(featureItem, tab, function(featureEnabled) { WebDeveloper.Information.displayTitleAttributes(!featureEnabled, [document]); }, [enabled]);
      });
    }
  });
};

// Displays the topographic information for a page
WebDeveloper.Overlay.Information.displayTopographicInformation = function()
{
  var featureItem = this;

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      WebDeveloper.Overlay.Information.toggleFeatureOnTab(featureItem, tab, function() { WebDeveloper.Information.displayTopographicInformation([document]); });
    }
  });
};

// Finds all the duplicate ids on a page
WebDeveloper.Overlay.Information.findDuplicateIds = function()
{
  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      chrome.tabs.sendMessage(tab.id, { type: "get-duplicate-ids" }, function(data)
      {
        var locale = WebDeveloper.Locales.setupGeneratedLocale();

        locale.duplicateId  = WebDeveloper.Locales.getString("duplicateId");
        locale.duplicateIds = WebDeveloper.Locales.getString("duplicateIds");

        WebDeveloper.Overlay.openGeneratedTab(chrome.runtime.getURL("/generated/find-duplicate-ids.html"), tab.index, data, locale);
      });
    }
  });
};

// Returns the locale for the view anchor information feature
WebDeveloper.Overlay.Information.getViewAnchorInformationLocale = function()
{
  var locale = WebDeveloper.Locales.setupGeneratedLocale();

  locale.anchor            = WebDeveloper.Locales.getString("anchor");
  locale.anchorInformation = WebDeveloper.Locales.getString("anchorInformation");
  locale.anchors           = WebDeveloper.Locales.getString("anchors");

  return locale;
};

// Returns the locale for the view color information feature
WebDeveloper.Overlay.Information.getViewColorInformationLocale = function()
{
  var locale = WebDeveloper.Locales.setupGeneratedLocale();

  locale.color            = WebDeveloper.Locales.getString("color");
  locale.colorInformation = WebDeveloper.Locales.getString("colorInformation");
  locale.colors           = WebDeveloper.Locales.getString("colors");

  return locale;
};

// Returns the locale for the view document outline feature
WebDeveloper.Overlay.Information.getViewDocumentOutlineLocale = function()
{
  var locale = WebDeveloper.Locales.setupGeneratedLocale();

  locale.documentOutline = WebDeveloper.Locales.getString("documentOutline");
  locale.heading         = WebDeveloper.Locales.getString("heading");
  locale.headings        = WebDeveloper.Locales.getString("headings");
  locale.missingHeading  = WebDeveloper.Locales.getString("missingHeading");
  locale.noHeadingText   = WebDeveloper.Locales.getString("noHeadingText");

  return locale;
};

// Returns the locale for the view JavaScript feature
WebDeveloper.Overlay.Information.getViewJavaScriptLocale = function()
{
  var locale = WebDeveloper.Locales.setupGeneratedLocale();

  locale.beautifyJavaScript     = WebDeveloper.Locales.getString("beautifyJavaScript");
  locale.couldNotLoadJavaScript = WebDeveloper.Locales.getString("couldNotLoadJavaScript");
  locale.dark                   = WebDeveloper.Locales.getString("dark");
  locale.embeddedJavaScriptFrom = WebDeveloper.Locales.getString("embeddedJavaScriptFrom");
  locale.javaScript             = WebDeveloper.Locales.getString("javaScript");
  locale.light                  = WebDeveloper.Locales.getString("light");
  locale.none                   = WebDeveloper.Locales.getString("none");
  locale.syntaxHighlighting     = WebDeveloper.Locales.getString("syntaxHighlighting");
  locale.undoBeautifyJavaScript = WebDeveloper.Locales.getString("undoBeautifyJavaScript");

  return locale;
};

// Returns the locale for the view link information feature
WebDeveloper.Overlay.Information.getViewLinkInformationLocale = function()
{
  var locale = WebDeveloper.Locales.setupGeneratedLocale();

  locale.link            = WebDeveloper.Locales.getString("link");
  locale.linkInformation = WebDeveloper.Locales.getString("linkInformation");
  locale.links           = WebDeveloper.Locales.getString("links");

  return locale;
};

// Returns the locale for the view meta tag information feature
WebDeveloper.Overlay.Information.getViewMetaTagInformationLocale = function()
{
  var locale = WebDeveloper.Locales.setupGeneratedLocale();

  locale.content  = WebDeveloper.Locales.getString("content");
  locale.metaTag  = WebDeveloper.Locales.getString("metaTag");
  locale.metaTags = WebDeveloper.Locales.getString("metaTags");
  locale.name     = WebDeveloper.Locales.getString("name");

  return locale;
};

// Returns the locale for the view response headers feature
WebDeveloper.Overlay.Information.getViewResponseHeadersLocale = function()
{
  var locale = WebDeveloper.Locales.setupGeneratedLocale();

  locale.couldNotLoadResponseHeaders = WebDeveloper.Locales.getString("couldNotLoadResponseHeaders");
  locale.responseHeaders             = WebDeveloper.Locales.getString("responseHeaders");

  return locale;
};

// Initializes the information overlay
WebDeveloper.Overlay.Information.initialize = function()
{
  var displayAbbreviationsMenu          = document.getElementById("display-abbreviations");
  var displayAccessKeysMenu             = document.getElementById("display-access-keys");
  var displayAnchorsMenu                = document.getElementById("display-anchors");
  var displayARIARolesMenu              = document.getElementById("display-aria-roles");
  var displayDivDimensionsMenu          = document.getElementById("display-div-dimensions");
  var displayDivOrderMenu               = document.getElementById("display-div-order");
  var displayElementInformationMenu     = document.getElementById("display-element-information");
  var displayIdClassDetailsMenu         = document.getElementById("display-id-class-details");
  var displayLinkDetailsMenu            = document.getElementById("display-link-details");
  var displayObjectInformationMenu      = document.getElementById("display-object-information");
  var displayStackLevelsMenu            = document.getElementById("display-stack-levels");
  var displayTabIndexMenu               = document.getElementById("display-tab-index");
  var displayTableDepthMenu             = document.getElementById("display-table-depth");
  var displayTableInformationMenu       = document.getElementById("display-table-information");
  var displayTitleAttributesMenu        = document.getElementById("display-title-attributes");
  var displayTopographicInformationMenu = document.getElementById("display-topographic-information");
  var findDuplicateIdsMenu              = document.getElementById("find-duplicate-ids");
  var viewAnchorInformationMenu         = document.getElementById("view-anchor-information");
  var viewColorInformationMenu          = document.getElementById("view-color-information");
  var viewDocumentOutlineMenu           = document.getElementById("view-document-outline");
  var viewJavaScriptMenu                = document.getElementById("view-javascript");
  var viewLinkInformationMenu           = document.getElementById("view-link-information");
  var viewMetaTagInformationMenu        = document.getElementById("view-meta-tag-information");
  var viewResponseHeadersMenu           = document.getElementById("view-response-headers");

  displayAbbreviationsMenu.append(WebDeveloper.Locales.getString("displayAbbreviations"));
  displayAccessKeysMenu.append(WebDeveloper.Locales.getString("displayAccessKeys"));
  displayAnchorsMenu.append(WebDeveloper.Locales.getString("displayAnchors"));
  displayARIARolesMenu.append(WebDeveloper.Locales.getString("displayARIARoles"));
  displayDivDimensionsMenu.append(WebDeveloper.Locales.getString("displayDivDimensions"));
  displayDivOrderMenu.append(WebDeveloper.Locales.getString("displayDivOrder"));
  displayElementInformationMenu.append(WebDeveloper.Locales.getString("displayElementInformation"));
  displayIdClassDetailsMenu.append(WebDeveloper.Locales.getString("displayIdClassDetails"));
  displayLinkDetailsMenu.append(WebDeveloper.Locales.getString("displayLinkDetails"));
  displayObjectInformationMenu.append(WebDeveloper.Locales.getString("displayObjectInformation"));
  displayStackLevelsMenu.append(WebDeveloper.Locales.getString("displayStackLevels"));
  displayTabIndexMenu.append(WebDeveloper.Locales.getString("displayTabIndex"));
  displayTableDepthMenu.append(WebDeveloper.Locales.getString("displayTableDepth"));
  displayTableInformationMenu.append(WebDeveloper.Locales.getString("displayTableInformation"));
  displayTitleAttributesMenu.append(WebDeveloper.Locales.getString("displayTitleAttributes"));
  displayTopographicInformationMenu.append(WebDeveloper.Locales.getString("displayTopographicInformation"));
  findDuplicateIdsMenu.append(WebDeveloper.Locales.getString("findDuplicateIds"));
  viewAnchorInformationMenu.append(WebDeveloper.Locales.getString("viewAnchorInformation"));
  viewColorInformationMenu.append(WebDeveloper.Locales.getString("viewColorInformation"));
  viewDocumentOutlineMenu.append(WebDeveloper.Locales.getString("viewDocumentOutline"));
  viewJavaScriptMenu.append(WebDeveloper.Locales.getString("viewJavaScript"));
  viewLinkInformationMenu.append(WebDeveloper.Locales.getString("viewLinkInformation"));
  viewMetaTagInformationMenu.append(WebDeveloper.Locales.getString("viewMetaTagInformation"));
  viewResponseHeadersMenu.append(WebDeveloper.Locales.getString("viewResponseHeaders"));

  displayAbbreviationsMenu.addEventListener("click", WebDeveloper.Overlay.Information.displayAbbreviations);
  displayAccessKeysMenu.addEventListener("click", WebDeveloper.Overlay.Information.displayAccessKeys);
  displayAnchorsMenu.addEventListener("click", WebDeveloper.Overlay.Information.displayAnchors);
  displayARIARolesMenu.addEventListener("click", WebDeveloper.Overlay.Information.displayARIARoles);
  displayDivDimensionsMenu.addEventListener("click", WebDeveloper.Overlay.Information.displayDivDimensions);
  displayDivOrderMenu.addEventListener("click", WebDeveloper.Overlay.Information.displayDivOrder);
  displayElementInformationMenu.addEventListener("click", WebDeveloper.Overlay.Information.displayElementInformation);
  displayIdClassDetailsMenu.addEventListener("click", WebDeveloper.Overlay.Information.displayIdClassDetails);
  displayLinkDetailsMenu.addEventListener("click", WebDeveloper.Overlay.Information.displayLinkDetails);
  displayObjectInformationMenu.addEventListener("click", WebDeveloper.Overlay.Information.displayObjectInformation);
  displayStackLevelsMenu.addEventListener("click", WebDeveloper.Overlay.Information.displayStackLevels);
  displayTabIndexMenu.addEventListener("click", WebDeveloper.Overlay.Information.displayTabIndex);
  displayTableDepthMenu.addEventListener("click", WebDeveloper.Overlay.Information.displayTableDepth);
  displayTableInformationMenu.addEventListener("click", WebDeveloper.Overlay.Information.displayTableInformation);
  displayTitleAttributesMenu.addEventListener("click", WebDeveloper.Overlay.Information.displayTitleAttributes);
  displayTopographicInformationMenu.addEventListener("click", WebDeveloper.Overlay.Information.displayTopographicInformation);
  findDuplicateIdsMenu.addEventListener("click", WebDeveloper.Overlay.Information.findDuplicateIds);
  viewAnchorInformationMenu.addEventListener("click", WebDeveloper.Overlay.Information.viewAnchorInformation);
  viewColorInformationMenu.addEventListener("click", WebDeveloper.Overlay.Information.viewColorInformation);
  viewDocumentOutlineMenu.addEventListener("click", WebDeveloper.Overlay.Information.viewDocumentOutline);
  viewJavaScriptMenu.addEventListener("click", WebDeveloper.Overlay.Information.viewJavaScript);
  viewLinkInformationMenu.addEventListener("click", WebDeveloper.Overlay.Information.viewLinkInformation);
  viewMetaTagInformationMenu.addEventListener("click", WebDeveloper.Overlay.Information.viewMetaTagInformation);
  viewResponseHeadersMenu.addEventListener("click", WebDeveloper.Overlay.Information.viewResponseHeaders);
};

// Toggles a feature on a tab
WebDeveloper.Overlay.Information.toggleFeatureOnTab = function(featureItem, tab, scriptCode, args)
{
  WebDeveloper.Overlay.toggleFeatureOnTab(featureItem, tab, "/features/javascript/information.js", scriptCode, args);
};

// Displays the anchor information for a page
WebDeveloper.Overlay.Information.viewAnchorInformation = function()
{
  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      chrome.tabs.sendMessage(tab.id, { type: "get-anchors" }, function(data)
      {
        WebDeveloper.Overlay.openGeneratedTab(chrome.runtime.getURL("/generated/view-anchor-information.html"), tab.index, data, WebDeveloper.Overlay.Information.getViewAnchorInformationLocale());
      });
    }
  });
};

// Displays the color information for a page
WebDeveloper.Overlay.Information.viewColorInformation = function()
{
  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      chrome.tabs.sendMessage(tab.id, { type: "get-colors" }, function(data)
      {
        WebDeveloper.Overlay.openGeneratedTab(chrome.runtime.getURL("/generated/view-color-information.html"), tab.index, data, WebDeveloper.Overlay.Information.getViewColorInformationLocale());
      });
    }
  });
};

// Displays the document outline
WebDeveloper.Overlay.Information.viewDocumentOutline = function()
{
  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      chrome.tabs.sendMessage(tab.id, { type: "get-document-outline" }, function(data)
      {
        WebDeveloper.Overlay.openGeneratedTab(chrome.runtime.getURL("/generated/view-document-outline.html"), tab.index, data, WebDeveloper.Overlay.Information.getViewDocumentOutlineLocale());
      });
    }
  });
};

// Displays the JavaScript
WebDeveloper.Overlay.Information.viewJavaScript = function()
{
  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      chrome.tabs.sendMessage(tab.id, { type: "get-javascript" }, function(data)
      {
        WebDeveloper.Storage.getItem("syntax_highlight_theme", function(item)
        {
          data.theme = item;

          WebDeveloper.Overlay.openGeneratedTab(chrome.runtime.getURL("/generated/view-javascript.html"), tab.index, data, WebDeveloper.Overlay.Information.getViewJavaScriptLocale());
        });
      });
    }
  });
};

// Displays the link information for a page
WebDeveloper.Overlay.Information.viewLinkInformation = function()
{
  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      chrome.tabs.sendMessage(tab.id, { type: "get-links" }, function(data)
      {
        WebDeveloper.Overlay.openGeneratedTab(chrome.runtime.getURL("/generated/view-link-information.html"), tab.index, data, WebDeveloper.Overlay.Information.getViewLinkInformationLocale());
      });
    }
  });
};

// Displays the meta tag information for a page
WebDeveloper.Overlay.Information.viewMetaTagInformation = function()
{
  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      chrome.tabs.sendMessage(tab.id, { type: "get-meta-tags" }, function(data)
      {
        WebDeveloper.Overlay.openGeneratedTab(chrome.runtime.getURL("/generated/view-meta-tag-information.html"), tab.index, data, WebDeveloper.Overlay.Information.getViewMetaTagInformationLocale());
      });
    }
  });
};

// Displays the response headers
WebDeveloper.Overlay.Information.viewResponseHeaders = function()
{
  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      chrome.tabs.sendMessage(tab.id, { type: "get-document-details" }, function(data)
      {
        WebDeveloper.Overlay.openGeneratedTab(chrome.runtime.getURL("/generated/view-response-headers.html"), tab.index, data, WebDeveloper.Overlay.Information.getViewResponseHeadersLocale());
      });
    }
  });
};

// If the document is still loading
if(document.readyState === "loading")
{
  document.addEventListener("DOMContentLoaded", WebDeveloper.Overlay.Information.initialize);
}
else
{
  WebDeveloper.Overlay.Information.initialize();
}
