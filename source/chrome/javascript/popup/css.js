var WebDeveloper = WebDeveloper || {};

WebDeveloper.Popup		 = WebDeveloper.Popup || {};
WebDeveloper.Popup.CSS = WebDeveloper.Popup.CSS || {};

$(function()
{
	$("#disable-all-styles").on("click", WebDeveloper.Popup.CSS.disableAllStyles);
	$("#disable-browser-default-styles").on("click", WebDeveloper.Popup.CSS.disableBrowserDefaultStyles);
	$("#disable-embedded-styles").on("click", WebDeveloper.Popup.CSS.disableEmbeddedStyles);
	$("#disable-inline-styles").on("click", WebDeveloper.Popup.CSS.disableInlineStyles);
	$("#disable-linked-style-sheets").on("click", WebDeveloper.Popup.CSS.disableLinkedStyleSheets);
	$("#disable-print-styles").on("click", WebDeveloper.Popup.CSS.disablePrintStyles);
	$("#display-handheld-styles").on("click", WebDeveloper.Popup.CSS.displayHandheldStyles);
	$("#display-print-styles").on("click", WebDeveloper.Popup.CSS.displayPrintStyles);
	$("#edit-css").on("click", WebDeveloper.Popup.CSS.editCSS);
	$("#reload-linked-style-sheets").on("click", WebDeveloper.Popup.CSS.reloadLinkedStyleSheets);
	$("#use-border-box-model").on("click", WebDeveloper.Popup.CSS.useBorderBoxModel);
	$("#view-css").on("click", WebDeveloper.Popup.CSS.viewCSS);
});

// Adds a feature on a tab
WebDeveloper.Popup.CSS.addFeatureOnTab = function(featureItem, tab, scriptCode)
{
	WebDeveloper.Popup.addFeatureOnTab(featureItem, tab, "features/javascript/css.js", scriptCode);
};

// Disables all styles
WebDeveloper.Popup.CSS.disableAllStyles = function()
{
	var featureItem = $(this);

	WebDeveloper.Popup.getSelectedTab(function(tab)
	{
		// If the tab is valid
		if(WebDeveloper.Popup.isValidTab(tab))
		{
			var feature = featureItem.attr("id");
			var disable = !chrome.extension.getBackgroundPage().WebDeveloper.Storage.isFeatureOnTab(feature, tab);

			WebDeveloper.Popup.CSS.toggleFeatureOnTab(featureItem, tab, "WebDeveloper.CSS.toggleAllStyles(" + disable + ", [document]);");
		}
	});
};

// Disables the browser default styles
WebDeveloper.Popup.CSS.disableBrowserDefaultStyles = function()
{
	var featureItem = $(this);

	WebDeveloper.Popup.getSelectedTab(function(tab)
	{
		// If the tab is valid
		if(WebDeveloper.Popup.isValidTab(tab))
		{
			WebDeveloper.Popup.CSS.toggleFeatureOnTab(featureItem, tab, "WebDeveloper.CSS.toggleBrowserDefaultStyles([document]);");
		}
	});
};

// Disables embedded styles
WebDeveloper.Popup.CSS.disableEmbeddedStyles = function()
{
	var featureItem = $(this);

	WebDeveloper.Popup.getSelectedTab(function(tab)
	{
		// If the tab is valid
		if(WebDeveloper.Popup.isValidTab(tab))
		{
			var feature = featureItem.attr("id");
			var disable = !chrome.extension.getBackgroundPage().WebDeveloper.Storage.isFeatureOnTab(feature, tab);

			WebDeveloper.Popup.CSS.toggleFeatureOnTab(featureItem, tab, "WebDeveloper.CSS.toggleEmbeddedStyles(" + disable + ", [document]);");
		}
	});
};

// Disables inline styles
WebDeveloper.Popup.CSS.disableInlineStyles = function()
{
	var featureItem = $(this);

	WebDeveloper.Popup.getSelectedTab(function(tab)
	{
		// If the tab is valid
		if(WebDeveloper.Popup.isValidTab(tab))
		{
			var feature = featureItem.attr("id");
			var disable = !chrome.extension.getBackgroundPage().WebDeveloper.Storage.isFeatureOnTab(feature, tab);

			WebDeveloper.Popup.CSS.toggleFeatureOnTab(featureItem, tab, "WebDeveloper.CSS.toggleInlineStyles(" + disable + ", [document]);");
		}
	});
};

// Disables linked style sheets
WebDeveloper.Popup.CSS.disableLinkedStyleSheets = function()
{
	var featureItem = $(this);

	WebDeveloper.Popup.getSelectedTab(function(tab)
	{
		// If the tab is valid
		if(WebDeveloper.Popup.isValidTab(tab))
		{
			var feature = featureItem.attr("id");
			var disable = !chrome.extension.getBackgroundPage().WebDeveloper.Storage.isFeatureOnTab(feature, tab);

			WebDeveloper.Popup.CSS.toggleFeatureOnTab(featureItem, tab, "WebDeveloper.CSS.toggleLinkedStyleSheets(" + disable + ", [document]);");
		}
	});
};

// Disables print styles
WebDeveloper.Popup.CSS.disablePrintStyles = function()
{
	var featureItem = $(this);

	WebDeveloper.Popup.getSelectedTab(function(tab)
	{
		// If the tab is valid
		if(WebDeveloper.Popup.isValidTab(tab))
		{
			var feature = featureItem.attr("id");
			var disable = !chrome.extension.getBackgroundPage().WebDeveloper.Storage.isFeatureOnTab(feature, tab);

			WebDeveloper.Popup.CSS.toggleFeatureOnTab(featureItem, tab, "WebDeveloper.CSS.togglePrintStyles(" + disable + ", [document]);");
		}
	});
};

// Displays handheld styles
WebDeveloper.Popup.CSS.displayHandheldStyles = function()
{
	var featureItem = $(this);

	WebDeveloper.Popup.getSelectedTab(function(tab)
	{
		// If the tab is valid
		if(WebDeveloper.Popup.isValidTab(tab))
		{
			var feature = featureItem.attr("id");
			var storage = chrome.extension.getBackgroundPage().WebDeveloper.Storage;
			var display = !storage.isFeatureOnTab(feature, tab);

			// If displaying handheld styles and print styles are being displayed
			if(display && storage.isFeatureOnTab("display-print-styles", tab))
			{
				var displayPrintStylesItem = $("#display-print-styles");

				WebDeveloper.Popup.CSS.toggleFeatureOnTab(displayPrintStylesItem, tab, 'WebDeveloper.CSS.toggleMediaTypeStyles("print", false, [document]);');
			}

			WebDeveloper.Popup.CSS.toggleFeatureOnTab(featureItem, tab, 'WebDeveloper.CSS.toggleMediaTypeStyles("handheld", ' + display + ', [document]);');
		}
	});
};

// Displays print styles
WebDeveloper.Popup.CSS.displayPrintStyles = function()
{
	var featureItem = $(this);

	WebDeveloper.Popup.getSelectedTab(function(tab)
	{
		// If the tab is valid
		if(WebDeveloper.Popup.isValidTab(tab))
		{
			var feature = featureItem.attr("id");
			var storage = chrome.extension.getBackgroundPage().WebDeveloper.Storage;
			var display = !storage.isFeatureOnTab(feature, tab);

			// If displaying print styles and handheld styles are being displayed
			if(display && storage.isFeatureOnTab("display-handheld-styles", tab))
			{
				var displayHandheldStylesItem = $("#display-handheld-styles");

				WebDeveloper.Popup.CSS.toggleFeatureOnTab(displayHandheldStylesItem, tab, 'WebDeveloper.CSS.toggleMediaTypeStyles("handheld", false, [document]);');
			}

			WebDeveloper.Popup.CSS.toggleFeatureOnTab(featureItem, tab, 'WebDeveloper.CSS.toggleMediaTypeStyles("print", ' + display + ', [document]);');
		}
	});
};

// Edits the CSS of the page
WebDeveloper.Popup.CSS.editCSS = function()
{
	var featureItem = $(this);

	WebDeveloper.Popup.getSelectedTab(function(tab)
	{
		// If the tab is valid
		if(WebDeveloper.Popup.isValidTab(tab))
		{
			var feature = featureItem.attr("id");
			var edit		= !chrome.extension.getBackgroundPage().WebDeveloper.Storage.isFeatureOnTab(feature, tab);

			WebDeveloper.Popup.toggleFeatureOnTab(featureItem, tab, "dashboard/javascript/dashboard.js", "WebDeveloper.Dashboard.editCSS(" + edit + ", document);");
		}
	});
};

// Reloads the linked style sheets of the page
WebDeveloper.Popup.CSS.reloadLinkedStyleSheets = function()
{
	var featureItem = $(this);

	WebDeveloper.Popup.getSelectedTab(function(tab)
	{
		// If the tab is valid
		if(WebDeveloper.Popup.isValidTab(tab))
		{
			WebDeveloper.Popup.CSS.addFeatureOnTab(featureItem, tab, "WebDeveloper.CSS.reloadLinkedStyleSheets([document]);");
		}
	});
};

// Toggles a feature on a tab
WebDeveloper.Popup.CSS.toggleFeatureOnTab = function(featureItem, tab, scriptCode)
{
	WebDeveloper.Popup.toggleFeatureOnTab(featureItem, tab, "features/javascript/css.js", scriptCode);
};

// Displays alt attributes for all images
WebDeveloper.Popup.CSS.useBorderBoxModel = function()
{
	var featureItem = $(this);

	WebDeveloper.Popup.getSelectedTab(function(tab)
	{
		// If the tab is valid
		if(WebDeveloper.Popup.isValidTab(tab))
		{
			WebDeveloper.Popup.CSS.toggleFeatureOnTab(featureItem, tab, "WebDeveloper.CSS.useBorderBoxModel([document]);");
		}
	});
};

// Displays the CSS
WebDeveloper.Popup.CSS.viewCSS = function()
{
	WebDeveloper.Popup.getSelectedTab(function(tab)
	{
		// If the tab is valid
		if(WebDeveloper.Popup.isValidTab(tab))
		{
			chrome.tabs.sendRequest(tab.id, {type: "get-css"}, function(data)
			{
				var locale = WebDeveloper.Locales.setupGeneratedLocale();

				data.theme						 = "light";
				locale.couldNotLoadCSS = WebDeveloper.Locales.getString("couldNotLoadCSS");
				locale.css						 = WebDeveloper.Locales.getString("css");
				locale.embeddedCSSFrom = WebDeveloper.Locales.getString("embeddedCSSFrom");

				chrome.extension.getBackgroundPage().WebDeveloper.Background.openGeneratedTab(chrome.extension.getURL("generated/view-css.html"), tab.index, data, locale);

				WebDeveloper.Popup.close();
			});
		}
	});
};
