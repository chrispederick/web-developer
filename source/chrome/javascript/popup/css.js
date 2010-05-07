WebDeveloper.Popup.CSS = {};

$(function() 
{ 
	$("#disable-all-styles").click(WebDeveloper.Popup.CSS.disableAllStyles);
	$("#disable-browser-default-styles").click(WebDeveloper.Popup.CSS.disableBrowserDefaultStyles);
	$("#disable-embedded-styles").click(WebDeveloper.Popup.CSS.disableEmbeddedStyles);
	$("#disable-inline-styles").click(WebDeveloper.Popup.CSS.disableInlineStyles);
	$("#disable-linked-style-sheets").click(WebDeveloper.Popup.CSS.disableLinkedStyleSheets);
	$("#disable-print-styles").click(WebDeveloper.Popup.CSS.disablePrintStyles);
	$("#display-handheld-styles").click(WebDeveloper.Popup.CSS.displayHandheldStyles);
	$("#display-print-styles").click(WebDeveloper.Popup.CSS.displayPrintStyles);
	$("#edit-css").click(WebDeveloper.Popup.CSS.editCSS);
	$("#view-css").click(WebDeveloper.Popup.CSS.viewCSS);
});
	
// Disables all styles
WebDeveloper.Popup.CSS.disableAllStyles = function()
{
	var featureItem = $(this);

	WebDeveloper.Popup.getSelectedTab(function(tab)
	{
		var feature = featureItem.attr("id");
    var disable = !chrome.extension.getBackgroundPage().WebDeveloper.Storage.isFeatureOnTab(feature, tab);

		WebDeveloper.Popup.CSS.toggleFeatureOnTab(featureItem, tab, "WebDeveloper.CSS.toggleAllStyles(" + disable + ", document);");
	});
};
	
// Disables the browser default styles
WebDeveloper.Popup.CSS.disableBrowserDefaultStyles = function()
{
	var featureItem = $(this);

	WebDeveloper.Popup.getSelectedTab(function(tab)
	{
		WebDeveloper.Popup.CSS.toggleFeatureOnTab(featureItem, tab, "WebDeveloper.CSS.toggleBrowserDefaultStyles(document);");
	});
};
	
// Disables embedded styles
WebDeveloper.Popup.CSS.disableEmbeddedStyles = function()
{
	var featureItem = $(this);

	WebDeveloper.Popup.getSelectedTab(function(tab)
	{
		var feature = featureItem.attr("id");
    var disable = !chrome.extension.getBackgroundPage().WebDeveloper.Storage.isFeatureOnTab(feature, tab);

		WebDeveloper.Popup.CSS.toggleFeatureOnTab(featureItem, tab, "WebDeveloper.CSS.toggleEmbeddedStyles(" + disable + ", document);");
	});
};
	
// Disables inline styles
WebDeveloper.Popup.CSS.disableInlineStyles = function()
{
	var featureItem = $(this);

	WebDeveloper.Popup.getSelectedTab(function(tab)
	{
		var feature = featureItem.attr("id");
    var disable = !chrome.extension.getBackgroundPage().WebDeveloper.Storage.isFeatureOnTab(feature, tab);

		WebDeveloper.Popup.CSS.toggleFeatureOnTab(featureItem, tab, "WebDeveloper.CSS.toggleInlineStyles(" + disable + ", document);");
	});
};
	
// Disables linked style sheets
WebDeveloper.Popup.CSS.disableLinkedStyleSheets = function()
{
	var featureItem = $(this);

	WebDeveloper.Popup.getSelectedTab(function(tab)
	{
		var feature = featureItem.attr("id");
    var disable = !chrome.extension.getBackgroundPage().WebDeveloper.Storage.isFeatureOnTab(feature, tab);

		WebDeveloper.Popup.CSS.toggleFeatureOnTab(featureItem, tab, "WebDeveloper.CSS.toggleLinkedStyleSheets(" + disable + ", document);");
	});
};
	
// Disables print styles
WebDeveloper.Popup.CSS.disablePrintStyles = function()
{
	var featureItem = $(this);

	WebDeveloper.Popup.getSelectedTab(function(tab)
	{
		var feature = featureItem.attr("id");
    var disable = !chrome.extension.getBackgroundPage().WebDeveloper.Storage.isFeatureOnTab(feature, tab);

		WebDeveloper.Popup.CSS.toggleFeatureOnTab(featureItem, tab, "WebDeveloper.CSS.togglePrintStyles(" + disable + ", document);");
	});
};
	
// Displays handheld styles
WebDeveloper.Popup.CSS.displayHandheldStyles = function()
{
	var featureItem = $(this);

	WebDeveloper.Popup.getSelectedTab(function(tab)
	{
		var feature = featureItem.attr("id");
		var storage = chrome.extension.getBackgroundPage().WebDeveloper.Storage;
    var display = !storage.isFeatureOnTab(feature, tab);

		// If displaying handheld styles and print styles are being displayed
		if(display && storage.isFeatureOnTab("display-print-styles", tab))
		{
			var displayPrintStylesItem = $("#display-print-styles");
		
			WebDeveloper.Popup.CSS.toggleFeatureOnTab(displayPrintStylesItem, tab, 'WebDeveloper.CSS.toggleMediaTypeStyles("print", false, document);');
		}

		WebDeveloper.Popup.CSS.toggleFeatureOnTab(featureItem, tab, 'WebDeveloper.CSS.toggleMediaTypeStyles("handheld", ' + display + ', document);');
	});
};
	
// Displays print styles
WebDeveloper.Popup.CSS.displayPrintStyles = function()
{
	var featureItem = $(this);

	WebDeveloper.Popup.getSelectedTab(function(tab)
	{
		var feature = featureItem.attr("id");
		var storage = chrome.extension.getBackgroundPage().WebDeveloper.Storage;
    var display = !storage.isFeatureOnTab(feature, tab);

		// If displaying print styles and handheld styles are being displayed
		if(display && storage.isFeatureOnTab("display-handheld-styles", tab))
		{
			var displayHandheldStylesItem = $("#display-handheld-styles");
		
			WebDeveloper.Popup.CSS.toggleFeatureOnTab(displayHandheldStylesItem, tab, 'WebDeveloper.CSS.toggleMediaTypeStyles("handheld", false, document);');
		}

		WebDeveloper.Popup.CSS.toggleFeatureOnTab(featureItem, tab, 'WebDeveloper.CSS.toggleMediaTypeStyles("print", ' + display + ', document);');
	});
};
	
// Edits the CSS of the page
WebDeveloper.Popup.CSS.editCSS = function()
{
	var featureItem = $(this);

	WebDeveloper.Popup.getSelectedTab(function(tab)
	{
		var feature = featureItem.attr("id");
    var edit    = !chrome.extension.getBackgroundPage().WebDeveloper.Storage.isFeatureOnTab(feature, tab);
		
		WebDeveloper.Popup.toggleFeatureOnTab(featureItem, tab, "dashboard/javascript/dashboard.js", "WebDeveloper.Dashboard.editCSS(" + edit + ", document);");
		WebDeveloper.Popup.close();
	});
};

// Toggles a feature on a tab
WebDeveloper.Popup.CSS.toggleFeatureOnTab = function(featureItem, tab, scriptCode)
{
	WebDeveloper.Popup.toggleFeatureOnTab(featureItem, tab, "features/javascript/css.js", scriptCode);
};
	
// Displays the CSS
WebDeveloper.Popup.CSS.viewCSS = function()
{
	var featureItem = $(this);

	WebDeveloper.Popup.getSelectedTab(function(tab)
	{
	  chrome.tabs.sendRequest(tab.id, {type: "get-css"}, function(response) 
	  {
			chrome.extension.getBackgroundPage().WebDeveloper.Background.openGeneratedTab(chrome.extension.getURL("generated/view-css.html"), tab.index, response, featureItem);

			WebDeveloper.Popup.close();
	  });
	});
};
