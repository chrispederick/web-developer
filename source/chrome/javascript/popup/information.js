var WebDeveloper = WebDeveloper || {};

WebDeveloper.Popup						 = WebDeveloper.Popup || {};
WebDeveloper.Popup.Information = WebDeveloper.Popup.Information || {};

$(function()
{
	$("#display-abbreviations").on("click", WebDeveloper.Popup.Information.displayAbbreviations);
	$("#display-access-keys").on("click", WebDeveloper.Popup.Information.displayAccessKeys);
	$("#display-anchors").on("click", WebDeveloper.Popup.Information.displayAnchors);
	$("#display-aria-roles").on("click", WebDeveloper.Popup.Information.displayARIARoles);
	$("#display-div-dimensions").on("click", WebDeveloper.Popup.Information.displayDivDimensions);
	$("#display-div-order").on("click", WebDeveloper.Popup.Information.displayDivOrder);
	$("#display-element-information").on("click", WebDeveloper.Popup.Information.displayElementInformation);
	$("#display-id-class-details").on("click", WebDeveloper.Popup.Information.displayIdClassDetails);
	$("#display-link-details").on("click", WebDeveloper.Popup.Information.displayLinkDetails);
	$("#display-object-information").on("click", WebDeveloper.Popup.Information.displayObjectInformation);
	$("#display-stack-levels").on("click", WebDeveloper.Popup.Information.displayStackLevels);
	$("#display-tab-index").on("click", WebDeveloper.Popup.Information.displayTabIndex);
	$("#display-table-depth").on("click", WebDeveloper.Popup.Information.displayTableDepth);
	$("#display-table-information").on("click", WebDeveloper.Popup.Information.displayTableInformation);
	$("#display-title-attributes").on("click", WebDeveloper.Popup.Information.displayTitleAttributes);
	$("#display-topographic-information").on("click", WebDeveloper.Popup.Information.displayTopographicInformation);
	$("#find-duplicate-ids").on("click", WebDeveloper.Popup.Information.findDuplicateIds);
	$("#view-anchor-information").on("click", WebDeveloper.Popup.Information.viewAnchorInformation);
	$("#view-color-information").on("click", WebDeveloper.Popup.Information.viewColorInformation);
	$("#view-document-outline").on("click", WebDeveloper.Popup.Information.viewDocumentOutline);
	$("#view-link-information").on("click", WebDeveloper.Popup.Information.viewLinkInformation);
	$("#view-meta-tag-information").on("click", WebDeveloper.Popup.Information.viewMetaTagInformation);
	$("#view-javascript").on("click", WebDeveloper.Popup.Information.viewJavaScript);
	$("#view-response-headers").on("click", WebDeveloper.Popup.Information.viewResponseHeaders);
});

// Displays the abbreviations on a page
WebDeveloper.Popup.Information.displayAbbreviations = function()
{
	var featureItem = $(this);

	WebDeveloper.Popup.getSelectedTab(function(tab)
	{
		// If the tab is valid
		if(WebDeveloper.Popup.isValidTab(tab))
		{
			WebDeveloper.Popup.Information.toggleFeatureOnTab(featureItem, tab, "WebDeveloper.Information.displayAbbreviations([document]);");
		}
	});
};

// Displays the access keys on a page
WebDeveloper.Popup.Information.displayAccessKeys = function()
{
	var featureItem = $(this);

	WebDeveloper.Popup.getSelectedTab(function(tab)
	{
		// If the tab is valid
		if(WebDeveloper.Popup.isValidTab(tab))
		{
			var feature = featureItem.attr("id");
			var display = !chrome.extension.getBackgroundPage().WebDeveloper.Storage.isFeatureOnTab(feature, tab);

			WebDeveloper.Popup.Information.toggleFeatureOnTab(featureItem, tab, "WebDeveloper.Information.displayAccessKeys(" + display + ", [document]);");
		}
	});
};

// Displays the anchors on a page
WebDeveloper.Popup.Information.displayAnchors = function()
{
	var featureItem = $(this);

	WebDeveloper.Popup.getSelectedTab(function(tab)
	{
		// If the tab is valid
		if(WebDeveloper.Popup.isValidTab(tab))
		{
			var feature = featureItem.attr("id");
			var display = !chrome.extension.getBackgroundPage().WebDeveloper.Storage.isFeatureOnTab(feature, tab);

			WebDeveloper.Popup.Information.toggleFeatureOnTab(featureItem, tab, "WebDeveloper.Information.displayAnchors(" + display + ", [document]);");
		}
	});
};

// Displays the ARIA roles on a page
WebDeveloper.Popup.Information.displayARIARoles = function()
{
	var featureItem = $(this);

	WebDeveloper.Popup.getSelectedTab(function(tab)
	{
		// If the tab is valid
		if(WebDeveloper.Popup.isValidTab(tab))
		{
			WebDeveloper.Popup.Information.toggleFeatureOnTab(featureItem, tab, "WebDeveloper.Information.displayARIARoles([document]);");
		}
	});
};

// Displays the dimensions for divs on a page
WebDeveloper.Popup.Information.displayDivDimensions = function()
{
	var featureItem = $(this);

	WebDeveloper.Popup.getSelectedTab(function(tab)
	{
		// If the tab is valid
		if(WebDeveloper.Popup.isValidTab(tab))
		{
			var feature = featureItem.attr("id");
			var display = !chrome.extension.getBackgroundPage().WebDeveloper.Storage.isFeatureOnTab(feature, tab);

			WebDeveloper.Popup.Information.toggleFeatureOnTab(featureItem, tab, "WebDeveloper.Information.displayDivDimensions(" + display + ", [document]);");
		}
	});
};

// Displays the order of the divs on a page
WebDeveloper.Popup.Information.displayDivOrder = function()
{
	var featureItem = $(this);

	WebDeveloper.Popup.getSelectedTab(function(tab)
	{
		// If the tab is valid
		if(WebDeveloper.Popup.isValidTab(tab))
		{
			var feature = featureItem.attr("id");
			var display = !chrome.extension.getBackgroundPage().WebDeveloper.Storage.isFeatureOnTab(feature, tab);

			WebDeveloper.Popup.Information.toggleFeatureOnTab(featureItem, tab, "WebDeveloper.Information.displayDivOrder(" + display + ", [document]);");
		}
	});
};

// Displays information about an element
WebDeveloper.Popup.Information.displayElementInformation = function()
{
	var featureItem = $(this);

	WebDeveloper.Popup.getSelectedTab(function(tab)
	{
		// If the tab is valid
		if(WebDeveloper.Popup.isValidTab(tab))
		{
			var feature = featureItem.attr("id");
			var display = !chrome.extension.getBackgroundPage().WebDeveloper.Storage.isFeatureOnTab(feature, tab);

			WebDeveloper.Popup.toggleFeatureOnTab(featureItem, tab, "toolbar/javascript/element-information.js", "WebDeveloper.ElementInformation.displayElementInformation(" + display + ", [document]);");
			WebDeveloper.Popup.close();
		}
	});
};

// Displays the id and class details for a page
WebDeveloper.Popup.Information.displayIdClassDetails = function()
{
	var featureItem = $(this);

	WebDeveloper.Popup.getSelectedTab(function(tab)
	{
		// If the tab is valid
		if(WebDeveloper.Popup.isValidTab(tab))
		{
			var feature = featureItem.attr("id");
			var display = !chrome.extension.getBackgroundPage().WebDeveloper.Storage.isFeatureOnTab(feature, tab);

			WebDeveloper.Popup.Information.toggleFeatureOnTab(featureItem, tab, "WebDeveloper.Information.displayIdClassDetails(" + display + ", [document]);");
		}
	});
};

// Displays the details for the links on a page
WebDeveloper.Popup.Information.displayLinkDetails = function()
{
	var featureItem = $(this);

	WebDeveloper.Popup.getSelectedTab(function(tab)
	{
		// If the tab is valid
		if(WebDeveloper.Popup.isValidTab(tab))
		{
			WebDeveloper.Popup.Information.toggleFeatureOnTab(featureItem, tab, "WebDeveloper.Information.displayLinkDetails([document]);");
		}
	});
};

// Displays the information for objects on a page
WebDeveloper.Popup.Information.displayObjectInformation = function()
{
	var featureItem = $(this);

	WebDeveloper.Popup.getSelectedTab(function(tab)
	{
		// If the tab is valid
		if(WebDeveloper.Popup.isValidTab(tab))
		{
			var feature = featureItem.attr("id");
			var display = !chrome.extension.getBackgroundPage().WebDeveloper.Storage.isFeatureOnTab(feature, tab);

			WebDeveloper.Popup.Information.toggleFeatureOnTab(featureItem, tab, "WebDeveloper.Information.displayObjectInformation(" + display + ", [document]);");
		}
	});
};

// Displays the stack levels on a page
WebDeveloper.Popup.Information.displayStackLevels = function()
{
	var featureItem = $(this);

	WebDeveloper.Popup.getSelectedTab(function(tab)
	{
		// If the tab is valid
		if(WebDeveloper.Popup.isValidTab(tab))
		{
			var feature = featureItem.attr("id");
			var display = !chrome.extension.getBackgroundPage().WebDeveloper.Storage.isFeatureOnTab(feature, tab);

			WebDeveloper.Popup.Information.toggleFeatureOnTab(featureItem, tab, "WebDeveloper.Information.displayStackLevels(" + display + ", [document]);");
		}
	});
};

// Displays the tab indices on a page
WebDeveloper.Popup.Information.displayTabIndex = function()
{
	var featureItem = $(this);

	WebDeveloper.Popup.getSelectedTab(function(tab)
	{
		// If the tab is valid
		if(WebDeveloper.Popup.isValidTab(tab))
		{
			var feature = featureItem.attr("id");
			var display = !chrome.extension.getBackgroundPage().WebDeveloper.Storage.isFeatureOnTab(feature, tab);

			WebDeveloper.Popup.Information.toggleFeatureOnTab(featureItem, tab, "WebDeveloper.Information.displayTabIndex(" + display + ", [document]);");
		}
	});
};

// Displays the depth of all tables on a page
WebDeveloper.Popup.Information.displayTableDepth = function()
{
	var featureItem = $(this);

	WebDeveloper.Popup.getSelectedTab(function(tab)
	{
		// If the tab is valid
		if(WebDeveloper.Popup.isValidTab(tab))
		{
			var feature = featureItem.attr("id");
			var display = !chrome.extension.getBackgroundPage().WebDeveloper.Storage.isFeatureOnTab(feature, tab);

			WebDeveloper.Popup.Information.toggleFeatureOnTab(featureItem, tab, "WebDeveloper.Information.displayTableDepth(" + display + ", [document]);");
		}
	});
};

// Displays the information for tables on a page
WebDeveloper.Popup.Information.displayTableInformation = function()
{
	var featureItem = $(this);

	WebDeveloper.Popup.getSelectedTab(function(tab)
	{
		// If the tab is valid
		if(WebDeveloper.Popup.isValidTab(tab))
		{
			var feature = featureItem.attr("id");
			var display = !chrome.extension.getBackgroundPage().WebDeveloper.Storage.isFeatureOnTab(feature, tab);

			WebDeveloper.Popup.Information.toggleFeatureOnTab(featureItem, tab, "WebDeveloper.Information.displayTableInformation(" + display + ", [document]);");
		}
	});
};

// Displays the title attributes on a page
WebDeveloper.Popup.Information.displayTitleAttributes = function()
{
	var featureItem = $(this);

	WebDeveloper.Popup.getSelectedTab(function(tab)
	{
		// If the tab is valid
		if(WebDeveloper.Popup.isValidTab(tab))
		{
			var feature = featureItem.attr("id");
			var display = !chrome.extension.getBackgroundPage().WebDeveloper.Storage.isFeatureOnTab(feature, tab);

			WebDeveloper.Popup.Information.toggleFeatureOnTab(featureItem, tab, "WebDeveloper.Information.displayTitleAttributes(" + display + ", [document]);");
		}
	});
};

// Displays the topographic information for a page
WebDeveloper.Popup.Information.displayTopographicInformation = function()
{
	var featureItem = $(this);

	WebDeveloper.Popup.getSelectedTab(function(tab)
	{
		// If the tab is valid
		if(WebDeveloper.Popup.isValidTab(tab))
		{
			WebDeveloper.Popup.Information.toggleFeatureOnTab(featureItem, tab, "WebDeveloper.Information.displayTopographicInformation([document]);");
		}
	});
};

// Finds all the duplicate ids on a page
WebDeveloper.Popup.Information.findDuplicateIds = function()
{
	WebDeveloper.Popup.getSelectedTab(function(tab)
	{
		// If the tab is valid
		if(WebDeveloper.Popup.isValidTab(tab))
		{
			chrome.tabs.sendRequest(tab.id, {type: "get-duplicate-ids"}, function(data)
			{
				var locale = WebDeveloper.Locales.setupGeneratedLocale();

				locale.duplicateId	= WebDeveloper.Locales.getString("duplicateId");
				locale.duplicateIds	= WebDeveloper.Locales.getString("duplicateIds");

				chrome.extension.getBackgroundPage().WebDeveloper.Background.openGeneratedTab(chrome.extension.getURL("generated/find-duplicate-ids.html"), tab.index, data, locale);

				WebDeveloper.Popup.close();
			});
		}
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
		// If the tab is valid
		if(WebDeveloper.Popup.isValidTab(tab))
		{
			chrome.tabs.sendRequest(tab.id, {type: "get-anchors"}, function(data)
			{
				var locale = WebDeveloper.Locales.setupGeneratedLocale();

				locale.anchor						 = WebDeveloper.Locales.getString("anchor");
				locale.anchorInformation = WebDeveloper.Locales.getString("anchorInformation");
				locale.anchors					 = WebDeveloper.Locales.getString("anchors");

				chrome.extension.getBackgroundPage().WebDeveloper.Background.openGeneratedTab(chrome.extension.getURL("generated/view-anchor-information.html"), tab.index, data, locale);

				WebDeveloper.Popup.close();
			});
		}
	});
};

// Displays the color information for a page
WebDeveloper.Popup.Information.viewColorInformation = function()
{
	WebDeveloper.Popup.getSelectedTab(function(tab)
	{
		// If the tab is valid
		if(WebDeveloper.Popup.isValidTab(tab))
		{
			chrome.tabs.sendRequest(tab.id, {type: "get-colors"}, function(data)
			{
				var locale = WebDeveloper.Locales.setupGeneratedLocale();

				locale.color						= WebDeveloper.Locales.getString("color");
				locale.colorInformation = WebDeveloper.Locales.getString("colorInformation");
				locale.colors						= WebDeveloper.Locales.getString("colors");

				chrome.extension.getBackgroundPage().WebDeveloper.Background.openGeneratedTab(chrome.extension.getURL("generated/view-color-information.html"), tab.index, data, locale);

				WebDeveloper.Popup.close();
			});
		}
	});
};

// Displays the document outline
WebDeveloper.Popup.Information.viewDocumentOutline = function()
{
	WebDeveloper.Popup.getSelectedTab(function(tab)
	{
		// If the tab is valid
		if(WebDeveloper.Popup.isValidTab(tab))
		{
			chrome.tabs.sendRequest(tab.id, {type: "get-document-outline"}, function(data)
			{
				var locale = WebDeveloper.Locales.setupGeneratedLocale();

				locale.documentOutline = WebDeveloper.Locales.getString("documentOutline");
				locale.heading				 = WebDeveloper.Locales.getString("heading");
				locale.headings				 = WebDeveloper.Locales.getString("headings");
				locale.missingHeading  = WebDeveloper.Locales.getString("missingHeading");

				chrome.extension.getBackgroundPage().WebDeveloper.Background.openGeneratedTab(chrome.extension.getURL("generated/view-document-outline.html"), tab.index, data, locale);

				WebDeveloper.Popup.close();
			});
		}
	});
};

// Displays the JavaScript
WebDeveloper.Popup.Information.viewJavaScript = function()
{
	WebDeveloper.Popup.getSelectedTab(function(tab)
	{
		// If the tab is valid
		if(WebDeveloper.Popup.isValidTab(tab))
		{
			chrome.tabs.sendRequest(tab.id, {type: "get-javascript"}, function(data)
			{
				var locale = WebDeveloper.Locales.setupGeneratedLocale();

				data.theme										= "light";
				locale.beautifyJavaScript			= WebDeveloper.Locales.getString("beautifyJavaScript");
				locale.couldNotLoadJavaScript = WebDeveloper.Locales.getString("couldNotLoadJavaScript");
				locale.embeddedJavaScriptFrom = WebDeveloper.Locales.getString("embeddedJavaScriptFrom");
				locale.javaScript							= WebDeveloper.Locales.getString("javaScript");
				locale.undoBeautifyJavaScript	= WebDeveloper.Locales.getString("undoBeautifyJavaScript");

				chrome.extension.getBackgroundPage().WebDeveloper.Background.openGeneratedTab(chrome.extension.getURL("generated/view-javascript.html"), tab.index, data, locale);

				WebDeveloper.Popup.close();
			});
		}
	});
};

// Displays the link information for a page
WebDeveloper.Popup.Information.viewLinkInformation = function()
{
	WebDeveloper.Popup.getSelectedTab(function(tab)
	{
		// If the tab is valid
		if(WebDeveloper.Popup.isValidTab(tab))
		{
			chrome.tabs.sendRequest(tab.id, {type: "get-links"}, function(data)
			{
				var locale = WebDeveloper.Locales.setupGeneratedLocale();

				locale.link						 = WebDeveloper.Locales.getString("link");
				locale.linkInformation = WebDeveloper.Locales.getString("linkInformation");
				locale.links					 = WebDeveloper.Locales.getString("links");

				chrome.extension.getBackgroundPage().WebDeveloper.Background.openGeneratedTab(chrome.extension.getURL("generated/view-link-information.html"), tab.index, data, locale);

				WebDeveloper.Popup.close();
			});
		}
	});
};

// Displays the meta tag information for a page
WebDeveloper.Popup.Information.viewMetaTagInformation = function()
{
	WebDeveloper.Popup.getSelectedTab(function(tab)
	{
		// If the tab is valid
		if(WebDeveloper.Popup.isValidTab(tab))
		{
			chrome.tabs.sendRequest(tab.id, {type: "get-meta-tags"}, function(data)
			{
				var locale = WebDeveloper.Locales.setupGeneratedLocale();

				locale.content	= WebDeveloper.Locales.getString("content");
				locale.metaTag	= WebDeveloper.Locales.getString("metaTag");
				locale.metaTags = WebDeveloper.Locales.getString("metaTags");
				locale.name			= WebDeveloper.Locales.getString("name");

				chrome.extension.getBackgroundPage().WebDeveloper.Background.openGeneratedTab(chrome.extension.getURL("generated/view-meta-tag-information.html"), tab.index, data, locale);

				WebDeveloper.Popup.close();
			});
		}
	});
};

// Displays the response headers
WebDeveloper.Popup.Information.viewResponseHeaders = function()
{
	WebDeveloper.Popup.getSelectedTab(function(tab)
	{
		// If the tab is valid
		if(WebDeveloper.Popup.isValidTab(tab))
		{
			chrome.tabs.sendRequest(tab.id, {type: "get-document-details"}, function(data)
			{
				var locale = WebDeveloper.Locales.setupGeneratedLocale();

				locale.couldNotLoadResponseHeaders = WebDeveloper.Locales.getString("couldNotLoadResponseHeaders");
				locale.responseHeaders						 = WebDeveloper.Locales.getString("responseHeaders");

				chrome.extension.getBackgroundPage().WebDeveloper.Background.openGeneratedTab(chrome.extension.getURL("generated/view-response-headers.html"), tab.index, data, locale);

				WebDeveloper.Popup.close();
			});
		}
	});
};
