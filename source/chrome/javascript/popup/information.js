WebDeveloper.Popup.Information = {};

$(function() 
{ 
	$("#display-abbreviations").click(WebDeveloper.Popup.Information.displayAbbreviations);
	$("#display-access-keys").click(WebDeveloper.Popup.Information.displayAccessKeys);
	$("#display-anchors").click(WebDeveloper.Popup.Information.displayAnchors);
	$("#display-id-class-details").click(WebDeveloper.Popup.Information.displayIdClassDetails);
	$("#display-link-details").click(WebDeveloper.Popup.Information.displayLinkDetails);
	$("#display-object-information").click(WebDeveloper.Popup.Information.displayObjectInformation);
	$("#display-stack-levels").click(WebDeveloper.Popup.Information.displayStackLevels);
	$("#display-tab-index").click(WebDeveloper.Popup.Information.displayTabIndex);
	$("#display-title-attributes").click(WebDeveloper.Popup.Information.displayTitleAttributes);
	$("#display-topographic-information").click(WebDeveloper.Popup.Information.displayTopographicInformation);
	$("#view-anchor-information").click(WebDeveloper.Popup.Information.viewAnchorInformation);
	$("#view-link-information").click(WebDeveloper.Popup.Information.viewLinkInformation);
	$("#view-meta-tag-information").click(WebDeveloper.Popup.Information.viewMetaTagInformation);
	$("#view-javascript").click(WebDeveloper.Popup.Information.viewJavaScript);
	$("#view-response-headers").click(WebDeveloper.Popup.Information.viewResponseHeaders);
});
		
// Displays the abbreviations on a page
WebDeveloper.Popup.Information.displayAbbreviations = function()
{
	var featureItem = $(this);

	WebDeveloper.Popup.getSelectedTab(function(tab)
	{
		WebDeveloper.Popup.Information.toggleFeatureOnTab(featureItem, tab, "WebDeveloper.Information.displayAbbreviations(document);");
	});
};
	
// Displays the access keys on a page
WebDeveloper.Popup.Information.displayAccessKeys = function()
{
	var featureItem = $(this);

	WebDeveloper.Popup.getSelectedTab(function(tab)
	{
		var feature = featureItem.attr("id");
    var display = !chrome.extension.getBackgroundPage().WebDeveloper.Storage.isFeatureOnTab(feature, tab);

		WebDeveloper.Popup.Information.toggleFeatureOnTab(featureItem, tab, "WebDeveloper.Information.displayAccessKeys(" + display + ", document);");
	});
};
	
// Displays the anchors on a page
WebDeveloper.Popup.Information.displayAnchors = function()
{
	var featureItem = $(this);

	WebDeveloper.Popup.getSelectedTab(function(tab)
	{
		var feature = featureItem.attr("id");
    var display = !chrome.extension.getBackgroundPage().WebDeveloper.Storage.isFeatureOnTab(feature, tab);

		WebDeveloper.Popup.Information.toggleFeatureOnTab(featureItem, tab, "WebDeveloper.Information.displayAnchors(" + display + ", document);");
	});
};
	
// Displays the id and class details for a page
WebDeveloper.Popup.Information.displayIdClassDetails = function()
{
	var featureItem = $(this);

	WebDeveloper.Popup.getSelectedTab(function(tab)
	{
		var feature = featureItem.attr("id");
    var display = !chrome.extension.getBackgroundPage().WebDeveloper.Storage.isFeatureOnTab(feature, tab);

		WebDeveloper.Popup.Information.toggleFeatureOnTab(featureItem, tab, "WebDeveloper.Information.displayIdClassDetails(" + display + ", document);");
	});
};

// Displays the details for the links on a page
WebDeveloper.Popup.Information.displayLinkDetails = function()
{
	var featureItem = $(this);

	WebDeveloper.Popup.getSelectedTab(function(tab)
	{
		WebDeveloper.Popup.Information.toggleFeatureOnTab(featureItem, tab, "WebDeveloper.Information.displayLinkDetails(document);");
	});
};
	
// Displays the information for objects on a page
WebDeveloper.Popup.Information.displayObjectInformation = function()
{
	var featureItem = $(this);

	WebDeveloper.Popup.getSelectedTab(function(tab)
	{
		var feature = featureItem.attr("id");
    var display = !chrome.extension.getBackgroundPage().WebDeveloper.Storage.isFeatureOnTab(feature, tab);

		WebDeveloper.Popup.Information.toggleFeatureOnTab(featureItem, tab, "WebDeveloper.Information.displayObjectInformation(" + display + ", document);");
	});
};
	
// Displays the stack levels on a page
WebDeveloper.Popup.Information.displayStackLevels = function()
{
	var featureItem = $(this);

	WebDeveloper.Popup.getSelectedTab(function(tab)
	{
		var feature = featureItem.attr("id");
    var display = !chrome.extension.getBackgroundPage().WebDeveloper.Storage.isFeatureOnTab(feature, tab);

		WebDeveloper.Popup.Information.toggleFeatureOnTab(featureItem, tab, "WebDeveloper.Information.displayStackLevels(" + display + ", document);");
	});
};
	
// Displays the tab indices on a page
WebDeveloper.Popup.Information.displayTabIndex = function()
{
	var featureItem = $(this);

	WebDeveloper.Popup.getSelectedTab(function(tab)
	{
		var feature = featureItem.attr("id");
    var display = !chrome.extension.getBackgroundPage().WebDeveloper.Storage.isFeatureOnTab(feature, tab);

		WebDeveloper.Popup.Information.toggleFeatureOnTab(featureItem, tab, "WebDeveloper.Information.displayTabIndex(" + display + ", document);");
	});
};
	
// Displays the title attributes on a page
WebDeveloper.Popup.Information.displayTitleAttributes = function()
{
	var featureItem = $(this);

	WebDeveloper.Popup.getSelectedTab(function(tab)
	{
		var feature = featureItem.attr("id");
    var display = !chrome.extension.getBackgroundPage().WebDeveloper.Storage.isFeatureOnTab(feature, tab);

		WebDeveloper.Popup.Information.toggleFeatureOnTab(featureItem, tab, "WebDeveloper.Information.displayTitleAttributes(" + display + ", document);");
	});
};

// Displays the topographic information for a page
WebDeveloper.Popup.Information.displayTopographicInformation = function()
{
	var featureItem = $(this);

	WebDeveloper.Popup.getSelectedTab(function(tab)
	{
		WebDeveloper.Popup.Information.toggleFeatureOnTab(featureItem, tab, "WebDeveloper.Information.displayTopographicInformation(document);");
	});
};

// Toggles a feature on a tab
WebDeveloper.Popup.Information.toggleFeatureOnTab = function(featureItem, tab, scriptCode)
{
	WebDeveloper.Popup.toggleFeatureOnTab(featureItem, tab, "features/javascript/information.js", scriptCode);
};

// Displays the anchor information for a page
WebDeveloper.Popup.Information.viewAnchorInformation = function()
{
	WebDeveloper.Popup.getSelectedTab(function(tab)
	{
	  chrome.tabs.sendRequest(tab.id, {type: "get-anchors"}, function(response) 
	  {
			WebDeveloper.Popup.openGeneratedTab(chrome.extension.getURL("generated/view-anchor-information.html"), tab, response);
	  });
	});
};

// Displays the JavaScript
WebDeveloper.Popup.Information.viewJavaScript = function()
{
	WebDeveloper.Popup.getSelectedTab(function(tab)
	{
	  chrome.tabs.sendRequest(tab.id, {type: "get-document-javascript"}, function(response) 
	  {
			WebDeveloper.Popup.openGeneratedTab(chrome.extension.getURL("generated/view-javascript.html"), tab, response);
	  });
	});
};

// Displays the link information for a page
WebDeveloper.Popup.Information.viewLinkInformation = function()
{
	WebDeveloper.Popup.getSelectedTab(function(tab)
	{
	  chrome.tabs.sendRequest(tab.id, {type: "get-links"}, function(response) 
	  {
			WebDeveloper.Popup.openGeneratedTab(chrome.extension.getURL("generated/view-link-information.html"), tab, response);
	  });
	});
};

// Displays the meta tag information for a page
WebDeveloper.Popup.Information.viewMetaTagInformation = function()
{
	WebDeveloper.Popup.getSelectedTab(function(tab)
	{
	  chrome.tabs.sendRequest(tab.id, {type: "get-meta-tags"}, function(response) 
	  {
			WebDeveloper.Popup.openGeneratedTab(chrome.extension.getURL("generated/view-meta-tag-information.html"), tab, response);
	  });
	});
};

// Displays the response headers
WebDeveloper.Popup.Information.viewResponseHeaders = function()
{
	WebDeveloper.Popup.getSelectedTab(function(tab)
	{
	  chrome.tabs.sendRequest(tab.id, {type: "get-document-details"}, function(response) 
	  {
			WebDeveloper.Popup.openGeneratedTab(chrome.extension.getURL("generated/view-response-headers.html"), tab, response);
	  });
	});
};
