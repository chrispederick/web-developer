WebDeveloper.Popup.Outline = {};

$(function() 
{ 
	$("#outline-absolute-positioned-elements").click(WebDeveloper.Popup.Outline.outlineAbsolutePositionedElements);
	$("#outline-block-level-elements").click(WebDeveloper.Popup.Outline.outlineBlockLevelElements);
	$("#outline-deprecated-elements").click(WebDeveloper.Popup.Outline.outlineDeprecatedElements);
	$("#outline-external-links").click(WebDeveloper.Popup.Outline.outlineExternalLinks);
	$("#outline-fixed-positioned-elements").click(WebDeveloper.Popup.Outline.outlineFixedPositionedElements);
	$("#outline-floated-elements").click(WebDeveloper.Popup.Outline.outlineFloatedElements);
	$("#outline-frames").click(WebDeveloper.Popup.Outline.outlineFrames);
	$("#outline-headings").click(WebDeveloper.Popup.Outline.outlineHeadings);
	$("#outline-non-secure-elements").click(WebDeveloper.Popup.Outline.outlineNonSecureElements);
	$("#outline-relative-positioned-elements").click(WebDeveloper.Popup.Outline.outlineRelativePositionedElements);
	$("#outline-table-captions").click(WebDeveloper.Popup.Outline.outlineTableCaptions);
	$("#outline-table-cells").click(WebDeveloper.Popup.Outline.outlineTableCells);
	$("#outline-tables").click(WebDeveloper.Popup.Outline.outlineTables);
});
	
// Outlines all absolute positioned elements
WebDeveloper.Popup.Outline.outlineAbsolutePositionedElements = function()
{
	var featureItem = $(this);

	WebDeveloper.Popup.getSelectedTab(function(tab)
	{
		var feature = featureItem.attr("id");
    var outline = !chrome.extension.getBackgroundPage().WebDeveloper.Storage.isFeatureOnTab(feature, tab);

		WebDeveloper.Popup.Outline.toggleFeatureOnTab(featureItem, tab, 'WebDeveloper.Outline.outlinePositionedElements("absolute", ' + outline + ", document);");
	});
};
	
// Outlines all block level elements
WebDeveloper.Popup.Outline.outlineBlockLevelElements = function()
{
	var featureItem = $(this);

	WebDeveloper.Popup.getSelectedTab(function(tab)
	{
		WebDeveloper.Popup.Outline.toggleFeatureOnTab(featureItem, tab, "WebDeveloper.Outline.outlineBlockLevelElements(document);");
	});
};
	
// Outlines all deprecated elements
WebDeveloper.Popup.Outline.outlineDeprecatedElements = function()
{
	var featureItem = $(this);

	WebDeveloper.Popup.getSelectedTab(function(tab)
	{
		WebDeveloper.Popup.Outline.toggleFeatureOnTab(featureItem, tab, "WebDeveloper.Outline.outlineDeprecatedElements(document);");
	});
};
	
// Outlines all external links
WebDeveloper.Popup.Outline.outlineExternalLinks = function()
{
	var featureItem = $(this);

	WebDeveloper.Popup.getSelectedTab(function(tab)
	{
		var feature = featureItem.attr("id");
    var outline = !chrome.extension.getBackgroundPage().WebDeveloper.Storage.isFeatureOnTab(feature, tab);

		WebDeveloper.Popup.Outline.toggleFeatureOnTab(featureItem, tab, "WebDeveloper.Outline.outlineExternalLinks(" + outline + ", document);");
	});
};
	
// Outlines all fixed positioned elements
WebDeveloper.Popup.Outline.outlineFixedPositionedElements = function()
{
	var featureItem = $(this);

	WebDeveloper.Popup.getSelectedTab(function(tab)
	{
		var feature = featureItem.attr("id");
    var outline = !chrome.extension.getBackgroundPage().WebDeveloper.Storage.isFeatureOnTab(feature, tab);

		WebDeveloper.Popup.Outline.toggleFeatureOnTab(featureItem, tab, 'WebDeveloper.Outline.outlinePositionedElements("fixed", ' + outline + ", document);");
	});
};
	
// Outlines all floated elements
WebDeveloper.Popup.Outline.outlineFloatedElements = function()
{
	var featureItem = $(this);

	WebDeveloper.Popup.getSelectedTab(function(tab)
	{
		var feature = featureItem.attr("id");
    var outline = !chrome.extension.getBackgroundPage().WebDeveloper.Storage.isFeatureOnTab(feature, tab);

		WebDeveloper.Popup.Outline.toggleFeatureOnTab(featureItem, tab, "WebDeveloper.Outline.outlineFloatedElements(" + outline + ", document);");
	});
};
	
// Outlines all frames
WebDeveloper.Popup.Outline.outlineFrames = function()
{
	var featureItem = $(this);

	WebDeveloper.Popup.getSelectedTab(function(tab)
	{
		WebDeveloper.Popup.Outline.toggleFeatureOnTab(featureItem, tab, "WebDeveloper.Outline.outlineFrames(document);");
	});
};
	
// Outlines all headings
WebDeveloper.Popup.Outline.outlineHeadings = function()
{
	var featureItem = $(this);

	WebDeveloper.Popup.getSelectedTab(function(tab)
	{
		WebDeveloper.Popup.Outline.toggleFeatureOnTab(featureItem, tab, "WebDeveloper.Outline.outlineHeadings(document);");
	});
};
	
// Outlines all non-secure elements
WebDeveloper.Popup.Outline.outlineNonSecureElements = function()
{
	var featureItem = $(this);

	WebDeveloper.Popup.getSelectedTab(function(tab)
	{
		WebDeveloper.Popup.Outline.toggleFeatureOnTab(featureItem, tab, "WebDeveloper.Outline.outlineNonSecureElements(document);");
	});
};
	
// Outlines all relative positioned elements
WebDeveloper.Popup.Outline.outlineRelativePositionedElements = function()
{
	var featureItem = $(this);

	WebDeveloper.Popup.getSelectedTab(function(tab)
	{
		var feature = featureItem.attr("id");
    var outline = !chrome.extension.getBackgroundPage().WebDeveloper.Storage.isFeatureOnTab(feature, tab);

		WebDeveloper.Popup.Outline.toggleFeatureOnTab(featureItem, tab, 'WebDeveloper.Outline.outlinePositionedElements("relative", ' + outline + ", document);");
	});
};
	
// Outlines all table captions
WebDeveloper.Popup.Outline.outlineTableCaptions = function()
{
	var featureItem = $(this);

	WebDeveloper.Popup.getSelectedTab(function(tab)
	{
		WebDeveloper.Popup.Outline.toggleFeatureOnTab(featureItem, tab, "WebDeveloper.Outline.outlineTableCaptions(document);");
	});
};
	
// Outlines all table cells
WebDeveloper.Popup.Outline.outlineTableCells = function()
{
	var featureItem = $(this);

	WebDeveloper.Popup.getSelectedTab(function(tab)
	{
		WebDeveloper.Popup.Outline.toggleFeatureOnTab(featureItem, tab, "WebDeveloper.Outline.outlineTableCells(document);");
	});
};
	
// Outlines all tables
WebDeveloper.Popup.Outline.outlineTables = function()
{
	var featureItem = $(this);

	WebDeveloper.Popup.getSelectedTab(function(tab)
	{
		WebDeveloper.Popup.Outline.toggleFeatureOnTab(featureItem, tab, "WebDeveloper.Outline.outlineTables(document);");
	});
};

// Toggles a feature on a tab
WebDeveloper.Popup.Outline.toggleFeatureOnTab = function(featureItem, tab, scriptCode)
{
	WebDeveloper.Popup.toggleFeatureOnTab(featureItem, tab, "features/javascript/outline.js", scriptCode);
};
