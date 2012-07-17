var WebDeveloper = WebDeveloper || {};

WebDeveloper.Overlay						 = WebDeveloper.Overlay || {};
WebDeveloper.Overlay.Information = WebDeveloper.Overlay.Information || {};

$(function()
{
	$("#display-abbreviations").append(WebDeveloper.Locales.getString("displayAbbreviations")).on("click", WebDeveloper.Overlay.Information.displayAbbreviations);
	$("#display-access-keys").append(WebDeveloper.Locales.getString("displayAccessKeys")).on("click", WebDeveloper.Overlay.Information.displayAccessKeys);
	$("#display-anchors").append(WebDeveloper.Locales.getString("displayAnchors")).on("click", WebDeveloper.Overlay.Information.displayAnchors);
	$("#display-aria-roles").append(WebDeveloper.Locales.getString("displayARIARoles")).on("click", WebDeveloper.Overlay.Information.displayARIARoles);
	$("#display-div-dimensions").append(WebDeveloper.Locales.getString("displayDivDimensions")).on("click", WebDeveloper.Overlay.Information.displayDivDimensions);
	$("#display-div-order").append(WebDeveloper.Locales.getString("displayDivOrder")).on("click", WebDeveloper.Overlay.Information.displayDivOrder);
	$("#display-element-information").append(WebDeveloper.Locales.getString("displayElementInformation")).on("click", WebDeveloper.Overlay.Information.displayElementInformation);
	$("#display-id-class-details").append(WebDeveloper.Locales.getString("displayIdClassDetails")).on("click", WebDeveloper.Overlay.Information.displayIdClassDetails);
	$("#display-link-details").append(WebDeveloper.Locales.getString("displayLinkDetails")).on("click", WebDeveloper.Overlay.Information.displayLinkDetails);
	$("#display-object-information").append(WebDeveloper.Locales.getString("displayObjectInformation")).on("click", WebDeveloper.Overlay.Information.displayObjectInformation);
	$("#display-stack-levels").append(WebDeveloper.Locales.getString("displayStackLevels")).on("click", WebDeveloper.Overlay.Information.displayStackLevels);
	$("#display-tab-index").append(WebDeveloper.Locales.getString("displayTabIndex")).on("click", WebDeveloper.Overlay.Information.displayTabIndex);
	$("#display-table-depth").append(WebDeveloper.Locales.getString("displayTableDepth")).on("click", WebDeveloper.Overlay.Information.displayTableDepth);
	$("#display-table-information").append(WebDeveloper.Locales.getString("displayTableInformation")).on("click", WebDeveloper.Overlay.Information.displayTableInformation);
	$("#display-title-attributes").append(WebDeveloper.Locales.getString("displayTitleAttributes")).on("click", WebDeveloper.Overlay.Information.displayTitleAttributes);
	$("#display-topographic-information").append(WebDeveloper.Locales.getString("displayTopographicInformation")).on("click", WebDeveloper.Overlay.Information.displayTopographicInformation);
	$("#find-duplicate-ids").append(WebDeveloper.Locales.getString("findDuplicateIds")).on("click", WebDeveloper.Overlay.Information.findDuplicateIds);
	$("#view-anchor-information").append(WebDeveloper.Locales.getString("viewAnchorInformation")).on("click", WebDeveloper.Overlay.Information.viewAnchorInformation);
	$("#view-color-information").append(WebDeveloper.Locales.getString("viewColorInformation")).on("click", WebDeveloper.Overlay.Information.viewColorInformation);
	$("#view-document-outline").append(WebDeveloper.Locales.getString("viewDocumentOutline")).on("click", WebDeveloper.Overlay.Information.viewDocumentOutline);
	$("#view-link-information").append(WebDeveloper.Locales.getString("viewLinkInformation")).on("click", WebDeveloper.Overlay.Information.viewLinkInformation);
	$("#view-meta-tag-information").append(WebDeveloper.Locales.getString("viewMetaTagInformation")).on("click", WebDeveloper.Overlay.Information.viewMetaTagInformation);
	$("#view-javascript").append(WebDeveloper.Locales.getString("viewJavaScript")).on("click", WebDeveloper.Overlay.Information.viewJavaScript);
	$("#view-response-headers").append(WebDeveloper.Locales.getString("viewResponseHeaders")).on("click", WebDeveloper.Overlay.Information.viewResponseHeaders);
});

// Displays the abbreviations on a page
WebDeveloper.Overlay.Information.displayAbbreviations = function()
{
	var featureItem = $(this);

	WebDeveloper.Overlay.getSelectedTab(function(tab)
	{
		// If the tab is valid
		if(WebDeveloper.Overlay.isValidTab(tab))
		{
			WebDeveloper.Overlay.Information.toggleFeatureOnTab(featureItem, tab, "WebDeveloper.Information.displayAbbreviations([document]);");
		}
	});
};

// Displays the access keys on a page
WebDeveloper.Overlay.Information.displayAccessKeys = function()
{
	var featureItem = $(this);

	WebDeveloper.Overlay.getSelectedTab(function(tab)
	{
		// If the tab is valid
		if(WebDeveloper.Overlay.isValidTab(tab))
		{
			var feature = featureItem.attr("id");
			var display = !chrome.extension.getBackgroundPage().WebDeveloper.Storage.isFeatureOnTab(feature, tab);

			WebDeveloper.Overlay.Information.toggleFeatureOnTab(featureItem, tab, "WebDeveloper.Information.displayAccessKeys(" + display + ", [document]);");
		}
	});
};

// Displays the anchors on a page
WebDeveloper.Overlay.Information.displayAnchors = function()
{
	var featureItem = $(this);

	WebDeveloper.Overlay.getSelectedTab(function(tab)
	{
		// If the tab is valid
		if(WebDeveloper.Overlay.isValidTab(tab))
		{
			var feature = featureItem.attr("id");
			var display = !chrome.extension.getBackgroundPage().WebDeveloper.Storage.isFeatureOnTab(feature, tab);

			WebDeveloper.Overlay.Information.toggleFeatureOnTab(featureItem, tab, "WebDeveloper.Information.displayAnchors(" + display + ", [document]);");
		}
	});
};

// Displays the ARIA roles on a page
WebDeveloper.Overlay.Information.displayARIARoles = function()
{
	var featureItem = $(this);

	WebDeveloper.Overlay.getSelectedTab(function(tab)
	{
		// If the tab is valid
		if(WebDeveloper.Overlay.isValidTab(tab))
		{
			WebDeveloper.Overlay.Information.toggleFeatureOnTab(featureItem, tab, "WebDeveloper.Information.displayARIARoles([document]);");
		}
	});
};

// Displays the dimensions for divs on a page
WebDeveloper.Overlay.Information.displayDivDimensions = function()
{
	var featureItem = $(this);

	WebDeveloper.Overlay.getSelectedTab(function(tab)
	{
		// If the tab is valid
		if(WebDeveloper.Overlay.isValidTab(tab))
		{
			var feature = featureItem.attr("id");
			var display = !chrome.extension.getBackgroundPage().WebDeveloper.Storage.isFeatureOnTab(feature, tab);
			var locale	= "";

			locale += "'height': '" + WebDeveloper.Locales.getString("height") + "',";
			locale += "'width': '" + WebDeveloper.Locales.getString("width") + "'";

			WebDeveloper.Overlay.Information.toggleFeatureOnTab(featureItem, tab, "WebDeveloper.Information.displayDivDimensions(" + display + ", [document], {" + locale + "});");
		}
	});
};

// Displays the order of the divs on a page
WebDeveloper.Overlay.Information.displayDivOrder = function()
{
	var featureItem = $(this);

	WebDeveloper.Overlay.getSelectedTab(function(tab)
	{
		// If the tab is valid
		if(WebDeveloper.Overlay.isValidTab(tab))
		{
			var feature = featureItem.attr("id");
			var display = !chrome.extension.getBackgroundPage().WebDeveloper.Storage.isFeatureOnTab(feature, tab);

			WebDeveloper.Overlay.Information.toggleFeatureOnTab(featureItem, tab, "WebDeveloper.Information.displayDivOrder(" + display + ", [document]);");
		}
	});
};

// Displays information about an element
WebDeveloper.Overlay.Information.displayElementInformation = function()
{
	var featureItem = $(this);

	WebDeveloper.Overlay.getSelectedTab(function(tab)
	{
		// If the tab is valid
		if(WebDeveloper.Overlay.isValidTab(tab))
		{
			var feature = featureItem.attr("id");
			var display = !chrome.extension.getBackgroundPage().WebDeveloper.Storage.isFeatureOnTab(feature, tab);
			var locale	= "";

			locale += "'ancestors': '" + WebDeveloper.Locales.getString("ancestors") + "',";
			locale += "'children': '" + WebDeveloper.Locales.getString("children") + "',";
			locale += "'dashboardTitle': '" + WebDeveloper.Locales.getString("extensionName") + " " + WebDeveloper.Locales.getString("dashboard") + "',";
			locale += "'dom': '" + WebDeveloper.Locales.getString("dom") + "',";
			locale += "'elementInformation': '" + WebDeveloper.Locales.getString("elementInformation") + "',";
			locale += "'layout': '" + WebDeveloper.Locales.getString("layout") + "',";
			locale += "'position': '" + WebDeveloper.Locales.getString("position") + "',";
			locale += "'selectAnElementDisplayInformation': '" + WebDeveloper.Locales.getString("selectAnElementDisplayInformation") + "',";
			locale += "'text': '" + WebDeveloper.Locales.getString("text") + "'";

			WebDeveloper.Overlay.toggleFeatureOnTab(featureItem, tab, "dashboard/javascript/dashboard.js", "WebDeveloper.ElementInformation.initialize(" + display + ", document, {" + locale + "});", true);
		}
	});
};

// Displays the id and class details for a page
WebDeveloper.Overlay.Information.displayIdClassDetails = function()
{
	var featureItem = $(this);

	WebDeveloper.Overlay.getSelectedTab(function(tab)
	{
		// If the tab is valid
		if(WebDeveloper.Overlay.isValidTab(tab))
		{
			var feature = featureItem.attr("id");
			var display = !chrome.extension.getBackgroundPage().WebDeveloper.Storage.isFeatureOnTab(feature, tab);

			WebDeveloper.Overlay.Information.toggleFeatureOnTab(featureItem, tab, "WebDeveloper.Information.displayIdClassDetails(" + display + ", [document]);");
		}
	});
};

// Displays the details for the links on a page
WebDeveloper.Overlay.Information.displayLinkDetails = function()
{
	var featureItem = $(this);

	WebDeveloper.Overlay.getSelectedTab(function(tab)
	{
		// If the tab is valid
		if(WebDeveloper.Overlay.isValidTab(tab))
		{
			WebDeveloper.Overlay.Information.toggleFeatureOnTab(featureItem, tab, "WebDeveloper.Information.displayLinkDetails([document]);");
		}
	});
};

// Displays the information for objects on a page
WebDeveloper.Overlay.Information.displayObjectInformation = function()
{
	var featureItem = $(this);

	WebDeveloper.Overlay.getSelectedTab(function(tab)
	{
		// If the tab is valid
		if(WebDeveloper.Overlay.isValidTab(tab))
		{
			var feature = featureItem.attr("id");
			var display = !chrome.extension.getBackgroundPage().WebDeveloper.Storage.isFeatureOnTab(feature, tab);

			WebDeveloper.Overlay.Information.toggleFeatureOnTab(featureItem, tab, "WebDeveloper.Information.displayObjectInformation(" + display + ", [document]);");
		}
	});
};

// Displays the stack levels on a page
WebDeveloper.Overlay.Information.displayStackLevels = function()
{
	var featureItem = $(this);

	WebDeveloper.Overlay.getSelectedTab(function(tab)
	{
		// If the tab is valid
		if(WebDeveloper.Overlay.isValidTab(tab))
		{
			var feature = featureItem.attr("id");
			var display = !chrome.extension.getBackgroundPage().WebDeveloper.Storage.isFeatureOnTab(feature, tab);

			WebDeveloper.Overlay.Information.toggleFeatureOnTab(featureItem, tab, "WebDeveloper.Information.displayStackLevels(" + display + ", [document]);");
		}
	});
};

// Displays the tab indices on a page
WebDeveloper.Overlay.Information.displayTabIndex = function()
{
	var featureItem = $(this);

	WebDeveloper.Overlay.getSelectedTab(function(tab)
	{
		// If the tab is valid
		if(WebDeveloper.Overlay.isValidTab(tab))
		{
			var feature = featureItem.attr("id");
			var display = !chrome.extension.getBackgroundPage().WebDeveloper.Storage.isFeatureOnTab(feature, tab);

			WebDeveloper.Overlay.Information.toggleFeatureOnTab(featureItem, tab, "WebDeveloper.Information.displayTabIndex(" + display + ", [document]);");
		}
	});
};

// Displays the depth of all tables on a page
WebDeveloper.Overlay.Information.displayTableDepth = function()
{
	var featureItem = $(this);

	WebDeveloper.Overlay.getSelectedTab(function(tab)
	{
		// If the tab is valid
		if(WebDeveloper.Overlay.isValidTab(tab))
		{
			var feature = featureItem.attr("id");
			var display = !chrome.extension.getBackgroundPage().WebDeveloper.Storage.isFeatureOnTab(feature, tab);

			WebDeveloper.Overlay.Information.toggleFeatureOnTab(featureItem, tab, "WebDeveloper.Information.displayTableDepth(" + display + ", [document], " + '"' + WebDeveloper.Locales.getString("depth") + '");');
		}
	});
};

// Displays the information for tables on a page
WebDeveloper.Overlay.Information.displayTableInformation = function()
{
	var featureItem = $(this);

	WebDeveloper.Overlay.getSelectedTab(function(tab)
	{
		// If the tab is valid
		if(WebDeveloper.Overlay.isValidTab(tab))
		{
			var feature = featureItem.attr("id");
			var display = !chrome.extension.getBackgroundPage().WebDeveloper.Storage.isFeatureOnTab(feature, tab);

			WebDeveloper.Overlay.Information.toggleFeatureOnTab(featureItem, tab, "WebDeveloper.Information.displayTableInformation(" + display + ", [document]);");
		}
	});
};

// Displays the title attributes on a page
WebDeveloper.Overlay.Information.displayTitleAttributes = function()
{
	var featureItem = $(this);

	WebDeveloper.Overlay.getSelectedTab(function(tab)
	{
		// If the tab is valid
		if(WebDeveloper.Overlay.isValidTab(tab))
		{
			var feature = featureItem.attr("id");
			var display = !chrome.extension.getBackgroundPage().WebDeveloper.Storage.isFeatureOnTab(feature, tab);

			WebDeveloper.Overlay.Information.toggleFeatureOnTab(featureItem, tab, "WebDeveloper.Information.displayTitleAttributes(" + display + ", [document]);");
		}
	});
};

// Displays the topographic information for a page
WebDeveloper.Overlay.Information.displayTopographicInformation = function()
{
	var featureItem = $(this);

	WebDeveloper.Overlay.getSelectedTab(function(tab)
	{
		// If the tab is valid
		if(WebDeveloper.Overlay.isValidTab(tab))
		{
			WebDeveloper.Overlay.Information.toggleFeatureOnTab(featureItem, tab, "WebDeveloper.Information.displayTopographicInformation([document]);");
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
			chrome.tabs.sendRequest(tab.id, {type: "get-duplicate-ids"}, function(data)
			{
				var locale = WebDeveloper.Locales.setupGeneratedLocale();

				locale.duplicateId	= WebDeveloper.Locales.getString("duplicateId");
				locale.duplicateIds	= WebDeveloper.Locales.getString("duplicateIds");

				chrome.extension.getBackgroundPage().WebDeveloper.Background.openGeneratedTab(chrome.extension.getURL("generated/find-duplicate-ids.html"), tab.index, data, locale);

				WebDeveloper.Overlay.close();
			});
		}
	});
};

// Toggles a feature on a tab
WebDeveloper.Overlay.Information.toggleFeatureOnTab = function(featureItem, tab, scriptCode)
{
	WebDeveloper.Overlay.toggleFeatureOnTab(featureItem, tab, "features/javascript/information.js", scriptCode);
};

// Displays the anchor information for a page
WebDeveloper.Overlay.Information.viewAnchorInformation = function()
{
	WebDeveloper.Overlay.getSelectedTab(function(tab)
	{
		// If the tab is valid
		if(WebDeveloper.Overlay.isValidTab(tab))
		{
			chrome.tabs.sendRequest(tab.id, {type: "get-anchors"}, function(data)
			{
				chrome.extension.getBackgroundPage().WebDeveloper.Background.openGeneratedTab(chrome.extension.getURL("generated/view-anchor-information.html"), tab.index, data, WebDeveloper.Overlay.Information.getViewAnchorInformationLocale());

				WebDeveloper.Overlay.close();
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
			chrome.tabs.sendRequest(tab.id, {type: "get-colors"}, function(data)
			{
				chrome.extension.getBackgroundPage().WebDeveloper.Background.openGeneratedTab(chrome.extension.getURL("generated/view-color-information.html"), tab.index, data, WebDeveloper.Overlay.Information.getViewColorInformationLocale());

				WebDeveloper.Overlay.close();
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
			chrome.tabs.sendRequest(tab.id, {type: "get-document-outline"}, function(data)
			{
				chrome.extension.getBackgroundPage().WebDeveloper.Background.openGeneratedTab(chrome.extension.getURL("generated/view-document-outline.html"), tab.index, data, WebDeveloper.Overlay.Information.getViewDocumentOutlineLocale());

				WebDeveloper.Overlay.close();
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
			chrome.tabs.sendRequest(tab.id, {type: "get-javascript"}, function(data)
			{
				data.theme = chrome.extension.getBackgroundPage().WebDeveloper.Storage.getItem("syntax_highlight_theme");

				chrome.extension.getBackgroundPage().WebDeveloper.Background.openGeneratedTab(chrome.extension.getURL("generated/view-javascript.html"), tab.index, data, WebDeveloper.Overlay.Information.getViewJavaScriptLocale());

				WebDeveloper.Overlay.close();
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
			chrome.tabs.sendRequest(tab.id, {type: "get-links"}, function(data)
			{
				chrome.extension.getBackgroundPage().WebDeveloper.Background.openGeneratedTab(chrome.extension.getURL("generated/view-link-information.html"), tab.index, data, WebDeveloper.Overlay.Information.getViewLinkInformationLocale());

				WebDeveloper.Overlay.close();
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
			chrome.tabs.sendRequest(tab.id, {type: "get-meta-tags"}, function(data)
			{
				chrome.extension.getBackgroundPage().WebDeveloper.Background.openGeneratedTab(chrome.extension.getURL("generated/view-meta-tag-information.html"), tab.index, data, WebDeveloper.Overlay.Information.getViewMetaTagInformationLocale());

				WebDeveloper.Overlay.close();
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
			chrome.tabs.sendRequest(tab.id, {type: "get-document-details"}, function(data)
			{
				chrome.extension.getBackgroundPage().WebDeveloper.Background.openGeneratedTab(chrome.extension.getURL("generated/view-response-headers.html"), tab.index, data, WebDeveloper.Overlay.Information.getViewResponseHeadersLocale());

				WebDeveloper.Overlay.close();
			});
		}
	});
};
