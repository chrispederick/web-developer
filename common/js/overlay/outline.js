var WebDeveloper = WebDeveloper || {}; // eslint-disable-line no-redeclare, no-use-before-define

WebDeveloper.Overlay         = WebDeveloper.Overlay || {};
WebDeveloper.Overlay.Outline = WebDeveloper.Overlay.Outline || {};

// Initializes the outline overlay
WebDeveloper.Overlay.Outline.initialize = function()
{
  var outlineAbsolutePositionedElementsMenu = document.getElementById("outline-absolute-positioned-elements");
  var outlineBlockLevelElementsMenu         = document.getElementById("outline-block-level-elements");
  var outlineDeprecatedElementsMenu         = document.getElementById("outline-deprecated-elements");
  var outlineExternalLinksMenu              = document.getElementById("outline-external-links");
  var outlineFixedPositionedElementsMenu    = document.getElementById("outline-fixed-positioned-elements");
  var outlineFloatedElementsMenu            = document.getElementById("outline-floated-elements");
  var outlineFramesMenu                     = document.getElementById("outline-frames");
  var outlineHeadingsMenu                   = document.getElementById("outline-headings");
  var outlineNonSecureElementsMenu          = document.getElementById("outline-non-secure-elements");
  var outlineRelativePositionedElementsMenu = document.getElementById("outline-relative-positioned-elements");
  var outlineTableCaptionsMenu              = document.getElementById("outline-table-captions");
  var outlineTableCellsMenu                 = document.getElementById("outline-table-cells");
  var outlineTablesMenu                     = document.getElementById("outline-tables");
  var showElementTagNamesMenu               = document.getElementById("show-element-tag-names");

  outlineAbsolutePositionedElementsMenu.append(WebDeveloper.Locales.getString("outlineAbsolutePositionedElements"));
  outlineBlockLevelElementsMenu.append(WebDeveloper.Locales.getString("outlineBlockLevelElements"));
  outlineDeprecatedElementsMenu.append(WebDeveloper.Locales.getString("outlineDeprecatedElements"));
  outlineExternalLinksMenu.append(WebDeveloper.Locales.getString("outlineExternalLinks"));
  outlineFixedPositionedElementsMenu.append(WebDeveloper.Locales.getString("outlineFixedPositionedElements"));
  outlineFloatedElementsMenu.append(WebDeveloper.Locales.getString("outlineFloatedElements"));
  outlineFramesMenu.append(WebDeveloper.Locales.getString("outlineFrames"));
  outlineHeadingsMenu.append(WebDeveloper.Locales.getString("outlineHeadings"));
  outlineNonSecureElementsMenu.append(WebDeveloper.Locales.getString("outlineNonSecureElements"));
  outlineRelativePositionedElementsMenu.append(WebDeveloper.Locales.getString("outlineRelativePositionedElements"));
  outlineTableCaptionsMenu.append(WebDeveloper.Locales.getString("outlineTableCaptions"));
  outlineTableCellsMenu.append(WebDeveloper.Locales.getString("outlineTableCells"));
  outlineTablesMenu.append(WebDeveloper.Locales.getString("outlineTables"));
  showElementTagNamesMenu.append(WebDeveloper.Locales.getString("showElementTagNames"));

  outlineAbsolutePositionedElementsMenu.addEventListener("click", WebDeveloper.Overlay.Outline.outlineAbsolutePositionedElements);
  outlineBlockLevelElementsMenu.addEventListener("click", WebDeveloper.Overlay.Outline.outlineBlockLevelElements);
  outlineDeprecatedElementsMenu.addEventListener("click", WebDeveloper.Overlay.Outline.outlineDeprecatedElements);
  outlineExternalLinksMenu.addEventListener("click", WebDeveloper.Overlay.Outline.outlineExternalLinks);
  outlineFixedPositionedElementsMenu.addEventListener("click", WebDeveloper.Overlay.Outline.outlineFixedPositionedElements);
  outlineFloatedElementsMenu.addEventListener("click", WebDeveloper.Overlay.Outline.outlineFloatedElements);
  outlineFramesMenu.addEventListener("click", WebDeveloper.Overlay.Outline.outlineFrames);
  outlineHeadingsMenu.addEventListener("click", WebDeveloper.Overlay.Outline.outlineHeadings);
  outlineNonSecureElementsMenu.addEventListener("click", WebDeveloper.Overlay.Outline.outlineNonSecureElements);
  outlineRelativePositionedElementsMenu.addEventListener("click", WebDeveloper.Overlay.Outline.outlineRelativePositionedElements);
  outlineTableCaptionsMenu.addEventListener("click", WebDeveloper.Overlay.Outline.outlineTableCaptions);
  outlineTableCellsMenu.addEventListener("click", WebDeveloper.Overlay.Outline.outlineTableCells);
  outlineTablesMenu.addEventListener("click", WebDeveloper.Overlay.Outline.outlineTables);
  showElementTagNamesMenu.addEventListener("click", WebDeveloper.Overlay.Outline.toggleShowElementTagNames);

  WebDeveloper.Storage.getItem("outline.show.element.tag.names", function(showElementTagNames)
  {
    // If the outline show element tag names preference is set to true
    if(showElementTagNames)
    {
      showElementTagNamesMenu.classList.add("active");
    }
  });
};

// Outlines all absolute positioned elements
WebDeveloper.Overlay.Outline.outlineAbsolutePositionedElements = function()
{
  var featureItem = this;

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      WebDeveloper.Storage.isFeatureOnTab(featureItem.getAttribute("id"), tab, function(enabled)
      {
        WebDeveloper.Overlay.Outline.toggleFeatureOnTab(featureItem, tab, function(featureEnabled) { WebDeveloper.Outline.outlinePositionedElements("absolute", !featureEnabled, [document]); }, [enabled]);
      });
    }
  });
};

// Outlines all block level elements
WebDeveloper.Overlay.Outline.outlineBlockLevelElements = function()
{
  var featureItem = this;

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      WebDeveloper.Storage.getItem("outline.show.element.tag.names", function(showElementTagNamesStorage)
      {
        WebDeveloper.Overlay.Outline.toggleFeatureOnTab(featureItem, tab, function(showElementTagNames) { WebDeveloper.Outline.outlineBlockLevelElements([document], showElementTagNames); }, [showElementTagNamesStorage]);
      });
    }
  });
};

// Outlines all deprecated elements
WebDeveloper.Overlay.Outline.outlineDeprecatedElements = function()
{
  var featureItem = this;

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      WebDeveloper.Storage.getItem("outline.show.element.tag.names", function(showElementTagNamesStorage)
      {
        WebDeveloper.Overlay.Outline.toggleFeatureOnTab(featureItem, tab, function(showElementTagNames) { WebDeveloper.Outline.outlineDeprecatedElements([document], showElementTagNames); }, [showElementTagNamesStorage]);
      });
    }
  });
};

// Outlines all external links
WebDeveloper.Overlay.Outline.outlineExternalLinks = function()
{
  var featureItem = this;

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      WebDeveloper.Storage.isFeatureOnTab(featureItem.getAttribute("id"), tab, function(enabled)
      {
        WebDeveloper.Overlay.Outline.toggleFeatureOnTab(featureItem, tab, function(featureEnabled) { WebDeveloper.Outline.outlineExternalLinks(!featureEnabled, [document]); }, [enabled]);
      });
    }
  });
};

// Outlines all fixed positioned elements
WebDeveloper.Overlay.Outline.outlineFixedPositionedElements = function()
{
  var featureItem = this;

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      WebDeveloper.Storage.isFeatureOnTab(featureItem.getAttribute("id"), tab, function(enabled)
      {
        WebDeveloper.Overlay.Outline.toggleFeatureOnTab(featureItem, tab, function(featureEnabled) { WebDeveloper.Outline.outlinePositionedElements("fixed", !featureEnabled, [document]); }, [enabled]);
      });
    }
  });
};

// Outlines all floated elements
WebDeveloper.Overlay.Outline.outlineFloatedElements = function()
{
  var featureItem = this;

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      WebDeveloper.Storage.isFeatureOnTab(featureItem.getAttribute("id"), tab, function(enabled)
      {
        WebDeveloper.Overlay.Outline.toggleFeatureOnTab(featureItem, tab, function(featureEnabled) { WebDeveloper.Outline.outlineFloatedElements(!featureEnabled, [document]); }, [enabled]);
      });
    }
  });
};

// Outlines all frames
WebDeveloper.Overlay.Outline.outlineFrames = function()
{
  var featureItem = this;

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      WebDeveloper.Overlay.Outline.toggleFeatureOnTab(featureItem, tab, function() { WebDeveloper.Outline.outlineFrames([document]); });
    }
  });
};

// Outlines all headings
WebDeveloper.Overlay.Outline.outlineHeadings = function()
{
  var featureItem = this;

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      WebDeveloper.Storage.getItem("outline.show.element.tag.names", function(showElementTagNamesStorage)
      {
        WebDeveloper.Overlay.Outline.toggleFeatureOnTab(featureItem, tab, function(showElementTagNames) { WebDeveloper.Outline.outlineHeadings([document], showElementTagNames); }, [showElementTagNamesStorage]);
      });
    }
  });
};

// Outlines all non-secure elements
WebDeveloper.Overlay.Outline.outlineNonSecureElements = function()
{
  var featureItem = this;

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      WebDeveloper.Overlay.Outline.toggleFeatureOnTab(featureItem, tab, function() { WebDeveloper.Outline.outlineNonSecureElements([document]); });
    }
  });
};

// Outlines all relative positioned elements
WebDeveloper.Overlay.Outline.outlineRelativePositionedElements = function()
{
  var featureItem = this;

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      WebDeveloper.Storage.isFeatureOnTab(featureItem.getAttribute("id"), tab, function(enabled)
      {
        WebDeveloper.Overlay.Outline.toggleFeatureOnTab(featureItem, tab, function(featureEnabled) { WebDeveloper.Outline.outlinePositionedElements("relative", !featureEnabled, [document]); }, [enabled]);
      });
    }
  });
};

// Outlines all table captions
WebDeveloper.Overlay.Outline.outlineTableCaptions = function()
{
  var featureItem = this;

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      WebDeveloper.Overlay.Outline.toggleFeatureOnTab(featureItem, tab, function() { WebDeveloper.Outline.outlineTableCaptions([document]); });
    }
  });
};

// Outlines all table cells
WebDeveloper.Overlay.Outline.outlineTableCells = function()
{
  var featureItem = this;

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      WebDeveloper.Storage.getItem("outline.show.element.tag.names", function(showElementTagNamesStorage)
      {
        WebDeveloper.Overlay.Outline.toggleFeatureOnTab(featureItem, tab, function(showElementTagNames) { WebDeveloper.Outline.outlineTableCells([document], showElementTagNames); }, [showElementTagNamesStorage]);
      });
    }
  });
};

// Outlines all tables
WebDeveloper.Overlay.Outline.outlineTables = function()
{
  var featureItem = this;

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      WebDeveloper.Overlay.Outline.toggleFeatureOnTab(featureItem, tab, function() { WebDeveloper.Outline.outlineTables([document]); });
    }
  });
};

// Toggles a feature on a tab
WebDeveloper.Overlay.Outline.toggleFeatureOnTab = function(featureItem, tab, scriptCode, args)
{
  WebDeveloper.Overlay.toggleFeatureOnTab(featureItem, tab, "/features/js/outline.js", scriptCode, args);
};

// Toggles whether to show element tag names when outlining
WebDeveloper.Overlay.Outline.toggleShowElementTagNames = function()
{
  var featureItem = this;

  featureItem.classList.toggle("active");
  WebDeveloper.Storage.setItem("outline.show.element.tag.names", featureItem.classList.contains("active"));
};

// If the document is still loading
if(document.readyState === "loading")
{
  document.addEventListener("DOMContentLoaded", WebDeveloper.Overlay.Outline.initialize);
}
else
{
  WebDeveloper.Overlay.Outline.initialize();
}
