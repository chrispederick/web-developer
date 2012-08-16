var WebDeveloper = WebDeveloper || {};

WebDeveloper.Overlay		 = WebDeveloper.Overlay || {};
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
	WebDeveloper.Overlay.addFeatureOnTab(featureItem, tab, "features/javascript/css.js", scriptCode);
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
			var feature = featureItem.attr("id");
			var disable = !chrome.extension.getBackgroundPage().WebDeveloper.Storage.isFeatureOnTab(feature, tab);

			WebDeveloper.Overlay.CSS.toggleFeatureOnTab(featureItem, tab, "WebDeveloper.CSS.toggleAllStyles(" + disable + ", [document]);");
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
			var feature = featureItem.attr("id");
			var disable = !chrome.extension.getBackgroundPage().WebDeveloper.Storage.isFeatureOnTab(feature, tab);

			WebDeveloper.Overlay.CSS.toggleFeatureOnTab(featureItem, tab, "WebDeveloper.CSS.toggleEmbeddedStyles(" + disable + ", [document]);");
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
			var feature = featureItem.attr("id");
			var disable = !chrome.extension.getBackgroundPage().WebDeveloper.Storage.isFeatureOnTab(feature, tab);

			WebDeveloper.Overlay.CSS.toggleFeatureOnTab(featureItem, tab, "WebDeveloper.CSS.toggleInlineStyles(" + disable + ", [document]);");
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
			var feature = featureItem.attr("id");
			var disable = !chrome.extension.getBackgroundPage().WebDeveloper.Storage.isFeatureOnTab(feature, tab);

			WebDeveloper.Overlay.CSS.toggleFeatureOnTab(featureItem, tab, "WebDeveloper.CSS.toggleLinkedStyleSheets(" + disable + ", [document]);");
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
			var feature = featureItem.attr("id");
			var disable = !chrome.extension.getBackgroundPage().WebDeveloper.Storage.isFeatureOnTab(feature, tab);

			WebDeveloper.Overlay.CSS.toggleFeatureOnTab(featureItem, tab, "WebDeveloper.CSS.togglePrintStyles(" + disable + ", [document]);");
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
			var feature = featureItem.attr("id");
			var storage = chrome.extension.getBackgroundPage().WebDeveloper.Storage;
			var display = !storage.isFeatureOnTab(feature, tab);

			// If displaying handheld styles and print styles are being displayed
			if(display && storage.isFeatureOnTab("display-print-styles", tab))
			{
				var displayPrintStylesItem = $("#display-print-styles");

				WebDeveloper.Overlay.CSS.toggleFeatureOnTab(displayPrintStylesItem, tab, 'WebDeveloper.CSS.toggleMediaTypeStyles("print", false, [document]);');
			}

			WebDeveloper.Overlay.CSS.toggleFeatureOnTab(featureItem, tab, 'WebDeveloper.CSS.toggleMediaTypeStyles("handheld", ' + display + ', [document]);');
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
			var feature = featureItem.attr("id");
			var storage = chrome.extension.getBackgroundPage().WebDeveloper.Storage;
			var display = !storage.isFeatureOnTab(feature, tab);

			// If displaying print styles and handheld styles are being displayed
			if(display && storage.isFeatureOnTab("display-handheld-styles", tab))
			{
				var displayHandheldStylesItem = $("#display-handheld-styles");

				WebDeveloper.Overlay.CSS.toggleFeatureOnTab(displayHandheldStylesItem, tab, 'WebDeveloper.CSS.toggleMediaTypeStyles("handheld", false, [document]);');
			}

			WebDeveloper.Overlay.CSS.toggleFeatureOnTab(featureItem, tab, 'WebDeveloper.CSS.toggleMediaTypeStyles("print", ' + display + ', [document]);');
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
			var feature = featureItem.attr("id");
			var edit		= !chrome.extension.getBackgroundPage().WebDeveloper.Storage.isFeatureOnTab(feature, tab);
			var locale	= "";

			locale += "'couldNotLoadCSS': '" + WebDeveloper.Locales.getString("couldNotLoadCSS") + "',";
			locale += "'dashboardTitle': '" + WebDeveloper.Locales.getString("extensionName") + " " + WebDeveloper.Locales.getString("dashboard") + "',";
			locale += "'editCSS': '" + WebDeveloper.Locales.getString("editCSS") + "',";
			locale += "'embeddedStyles': '" + WebDeveloper.Locales.getString("embeddedStyles") + "'";

			WebDeveloper.Overlay.toggleFeatureOnTab(featureItem, tab, "dashboard/javascript/dashboard.js", "WebDeveloper.EditCSS.editCSS(" + edit + ", document, {" + locale + "});", true);
		}
	});
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
	WebDeveloper.Overlay.toggleFeatureOnTab(featureItem, tab, "features/javascript/css.js", scriptCode);
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
			chrome.tabs.sendRequest(tab.id, {type: "get-css"}, function(data)
			{
				data.theme = chrome.extension.getBackgroundPage().WebDeveloper.Storage.getItem("syntax_highlight_theme");

				chrome.extension.getBackgroundPage().WebDeveloper.Background.openGeneratedTab(chrome.extension.getURL("generated/view-css.html"), tab.index, data, WebDeveloper.Overlay.CSS.getViewCSSLocale());

				WebDeveloper.Overlay.close();
			});
		}
	});
};
