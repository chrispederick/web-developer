var WebDeveloper = WebDeveloper || {}; // eslint-disable-line no-use-before-define

WebDeveloper.Overlay         = WebDeveloper.Overlay || {};
WebDeveloper.Overlay.Outline = WebDeveloper.Overlay.Outline || {};

$(function()
{
  var showElementTagNamesMenu = $("#show-element-tag-names");

  $("#outline-absolute-positioned-elements").append(WebDeveloper.Locales.getString("outlineAbsolutePositionedElements")).on("click", WebDeveloper.Overlay.Outline.outlineAbsolutePositionedElements);
  $("#outline-block-level-elements").append(WebDeveloper.Locales.getString("outlineBlockLevelElements")).on("click", WebDeveloper.Overlay.Outline.outlineBlockLevelElements);
  $("#outline-deprecated-elements").append(WebDeveloper.Locales.getString("outlineDeprecatedElements")).on("click", WebDeveloper.Overlay.Outline.outlineDeprecatedElements);
  $("#outline-external-links").append(WebDeveloper.Locales.getString("outlineExternalLinks")).on("click", WebDeveloper.Overlay.Outline.outlineExternalLinks);
  $("#outline-fixed-positioned-elements").append(WebDeveloper.Locales.getString("outlineFixedPositionedElements")).on("click", WebDeveloper.Overlay.Outline.outlineFixedPositionedElements);
  $("#outline-floated-elements").append(WebDeveloper.Locales.getString("outlineFloatedElements")).on("click", WebDeveloper.Overlay.Outline.outlineFloatedElements);
  $("#outline-frames").append(WebDeveloper.Locales.getString("outlineFrames")).on("click", WebDeveloper.Overlay.Outline.outlineFrames);
  $("#outline-headings").append(WebDeveloper.Locales.getString("outlineHeadings")).on("click", WebDeveloper.Overlay.Outline.outlineHeadings);
  $("#outline-non-secure-elements").append(WebDeveloper.Locales.getString("outlineNonSecureElements")).on("click", WebDeveloper.Overlay.Outline.outlineNonSecureElements);
  $("#outline-relative-positioned-elements").append(WebDeveloper.Locales.getString("outlineRelativePositionedElements")).on("click", WebDeveloper.Overlay.Outline.outlineRelativePositionedElements);
  $("#outline-table-captions").append(WebDeveloper.Locales.getString("outlineTableCaptions")).on("click", WebDeveloper.Overlay.Outline.outlineTableCaptions);
  $("#outline-table-cells").append(WebDeveloper.Locales.getString("outlineTableCells")).on("click", WebDeveloper.Overlay.Outline.outlineTableCells);
  $("#outline-tables").append(WebDeveloper.Locales.getString("outlineTables")).on("click", WebDeveloper.Overlay.Outline.outlineTables);
  showElementTagNamesMenu.append(WebDeveloper.Locales.getString("showElementTagNames")).on("click", WebDeveloper.Overlay.Outline.toggleShowElementTagNames);

  // If the outline show element tag names preference is set to true
  if(chrome.extension.getBackgroundPage().WebDeveloper.Storage.getItem("outline.show.element.tag.names") == "true")
  {
    showElementTagNamesMenu.addClass("active");
  }
});

// Outlines all absolute positioned elements
WebDeveloper.Overlay.Outline.outlineAbsolutePositionedElements = function()
{
  var featureItem = $(this);

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      var feature = featureItem.attr("id");
      var outline = !chrome.extension.getBackgroundPage().WebDeveloper.Storage.isFeatureOnTab(feature, tab);

      WebDeveloper.Overlay.Outline.toggleFeatureOnTab(featureItem, tab, 'WebDeveloper.Outline.outlinePositionedElements("absolute", ' + outline + ", [document]);");
    }
  });
};

// Outlines all block level elements
WebDeveloper.Overlay.Outline.outlineBlockLevelElements = function()
{
  var featureItem = $(this);

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      var showElementTagNames = chrome.extension.getBackgroundPage().WebDeveloper.Storage.getItem("outline.show.element.tag.names") == "true";

      WebDeveloper.Overlay.Outline.toggleFeatureOnTab(featureItem, tab, "WebDeveloper.Outline.outlineBlockLevelElements([document], " + showElementTagNames + ");");
    }
  });
};

// Outlines all deprecated elements
WebDeveloper.Overlay.Outline.outlineDeprecatedElements = function()
{
  var featureItem = $(this);

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      var showElementTagNames = chrome.extension.getBackgroundPage().WebDeveloper.Storage.getItem("outline.show.element.tag.names") == "true";

      WebDeveloper.Overlay.Outline.toggleFeatureOnTab(featureItem, tab, "WebDeveloper.Outline.outlineDeprecatedElements([document], " + showElementTagNames + ");");
    }
  });
};

// Outlines all external links
WebDeveloper.Overlay.Outline.outlineExternalLinks = function()
{
  var featureItem = $(this);

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      var feature = featureItem.attr("id");
      var outline = !chrome.extension.getBackgroundPage().WebDeveloper.Storage.isFeatureOnTab(feature, tab);

      WebDeveloper.Overlay.Outline.toggleFeatureOnTab(featureItem, tab, "WebDeveloper.Outline.outlineExternalLinks(" + outline + ", [document]);");
    }
  });
};

// Outlines all fixed positioned elements
WebDeveloper.Overlay.Outline.outlineFixedPositionedElements = function()
{
  var featureItem = $(this);

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      var feature = featureItem.attr("id");
      var outline = !chrome.extension.getBackgroundPage().WebDeveloper.Storage.isFeatureOnTab(feature, tab);

      WebDeveloper.Overlay.Outline.toggleFeatureOnTab(featureItem, tab, 'WebDeveloper.Outline.outlinePositionedElements("fixed", ' + outline + ", [document]);");
    }
  });
};

// Outlines all floated elements
WebDeveloper.Overlay.Outline.outlineFloatedElements = function()
{
  var featureItem = $(this);

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      var feature = featureItem.attr("id");
      var outline = !chrome.extension.getBackgroundPage().WebDeveloper.Storage.isFeatureOnTab(feature, tab);

      WebDeveloper.Overlay.Outline.toggleFeatureOnTab(featureItem, tab, "WebDeveloper.Outline.outlineFloatedElements(" + outline + ", [document]);");
    }
  });
};

// Outlines all frames
WebDeveloper.Overlay.Outline.outlineFrames = function()
{
  var featureItem = $(this);

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      WebDeveloper.Overlay.Outline.toggleFeatureOnTab(featureItem, tab, "WebDeveloper.Outline.outlineFrames([document]);");
    }
  });
};

// Outlines all headings
WebDeveloper.Overlay.Outline.outlineHeadings = function()
{
  var featureItem = $(this);

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      var showElementTagNames = chrome.extension.getBackgroundPage().WebDeveloper.Storage.getItem("outline.show.element.tag.names") == "true";

      WebDeveloper.Overlay.Outline.toggleFeatureOnTab(featureItem, tab, "WebDeveloper.Outline.outlineHeadings([document], " + showElementTagNames + ");");
    }
  });
};

// Outlines all non-secure elements
WebDeveloper.Overlay.Outline.outlineNonSecureElements = function()
{
  var featureItem = $(this);

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      WebDeveloper.Overlay.Outline.toggleFeatureOnTab(featureItem, tab, "WebDeveloper.Outline.outlineNonSecureElements([document]);");
    }
  });
};

// Outlines all relative positioned elements
WebDeveloper.Overlay.Outline.outlineRelativePositionedElements = function()
{
  var featureItem = $(this);

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      var feature = featureItem.attr("id");
      var outline = !chrome.extension.getBackgroundPage().WebDeveloper.Storage.isFeatureOnTab(feature, tab);

      WebDeveloper.Overlay.Outline.toggleFeatureOnTab(featureItem, tab, 'WebDeveloper.Outline.outlinePositionedElements("relative", ' + outline + ", [document]);");
    }
  });
};

// Outlines all table captions
WebDeveloper.Overlay.Outline.outlineTableCaptions = function()
{
  var featureItem = $(this);

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      WebDeveloper.Overlay.Outline.toggleFeatureOnTab(featureItem, tab, "WebDeveloper.Outline.outlineTableCaptions([document]);");
    }
  });
};

// Outlines all table cells
WebDeveloper.Overlay.Outline.outlineTableCells = function()
{
  var featureItem = $(this);

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      var showElementTagNames = chrome.extension.getBackgroundPage().WebDeveloper.Storage.getItem("outline.show.element.tag.names") == "true";

      WebDeveloper.Overlay.Outline.toggleFeatureOnTab(featureItem, tab, "WebDeveloper.Outline.outlineTableCells([document], " + showElementTagNames + ");");
    }
  });
};

// Outlines all tables
WebDeveloper.Overlay.Outline.outlineTables = function()
{
  var featureItem = $(this);

  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      WebDeveloper.Overlay.Outline.toggleFeatureOnTab(featureItem, tab, "WebDeveloper.Outline.outlineTables([document]);");
    }
  });
};

// Toggles a feature on a tab
WebDeveloper.Overlay.Outline.toggleFeatureOnTab = function(featureItem, tab, scriptCode)
{
  WebDeveloper.Overlay.toggleFeatureOnTab(featureItem, tab, "features/javascript/outline.js", scriptCode);
};

// Toggles whether to show element tag names when outlining
WebDeveloper.Overlay.Outline.toggleShowElementTagNames = function()
{
  var featureItem = $(this);

  featureItem.toggleClass("active");
  chrome.extension.getBackgroundPage().WebDeveloper.Storage.setItem("outline.show.element.tag.names", featureItem.hasClass("active"));
};
