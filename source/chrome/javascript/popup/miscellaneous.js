WebDeveloper.Popup.Miscellaneous = {};

$(function() 
{ 
	$("#display-color-picker").click(WebDeveloper.Popup.Miscellaneous.displayColorPicker);
	$("#display-hidden-elements").click(WebDeveloper.Popup.Miscellaneous.displayHiddenElements);
	$("#display-ruler").click(WebDeveloper.Popup.Miscellaneous.displayRuler);
	$("#linearize-page").click(WebDeveloper.Popup.Miscellaneous.linearizePage);
	$("#make-frames-resizable").click(WebDeveloper.Popup.Miscellaneous.makeFramesResizable);
});

// Adds a feature on a tab
WebDeveloper.Popup.Miscellaneous.addFeatureOnTab = function(featureItem, tab, scriptCode)
{
	WebDeveloper.Popup.addFeatureOnTab(featureItem, tab, "features/javascript/miscellaneous.js", scriptCode);
};
	
// Displays a color picker
WebDeveloper.Popup.Miscellaneous.displayColorPicker = function()
{
	var featureItem = $(this);

	WebDeveloper.Popup.getSelectedTab(function(tab)
	{
		// If the tab is valid
		if(WebDeveloper.Popup.isValidTab(tab))
		{
			var feature = featureItem.attr("id");
	    var display = !chrome.extension.getBackgroundPage().WebDeveloper.Storage.isFeatureOnTab(feature, tab);
			
			WebDeveloper.Popup.toggleFeatureOnTab(featureItem, tab, "toolbar/javascript/color-picker.js", "WebDeveloper.ColorPicker.displayColorPicker(" + display + ", document);");
			WebDeveloper.Popup.close();
		}
	});
};
	
// Displays all hidden elements
WebDeveloper.Popup.Miscellaneous.displayHiddenElements = function()
{
	var featureItem = $(this);

	WebDeveloper.Popup.getSelectedTab(function(tab)
	{
		// If the tab is valid
		if(WebDeveloper.Popup.isValidTab(tab))
		{
			WebDeveloper.Popup.Miscellaneous.addFeatureOnTab(featureItem, tab, "WebDeveloper.Miscellaneous.displayHiddenElements(document);");
			WebDeveloper.Popup.close();
		}
	});
};
	
// Displays a ruler
WebDeveloper.Popup.Miscellaneous.displayRuler = function()
{
	var featureItem = $(this);

	WebDeveloper.Popup.getSelectedTab(function(tab)
	{
		// If the tab is valid
		if(WebDeveloper.Popup.isValidTab(tab))
		{
			var feature = featureItem.attr("id");
	    var display = !chrome.extension.getBackgroundPage().WebDeveloper.Storage.isFeatureOnTab(feature, tab);
			
			WebDeveloper.Popup.toggleFeatureOnTab(featureItem, tab, "toolbar/javascript/ruler.js", "WebDeveloper.Ruler.displayRuler(" + display + ", document);");
			WebDeveloper.Popup.close();
		}
	});
};
	
// Linearizes a page
WebDeveloper.Popup.Miscellaneous.linearizePage = function()
{
	var featureItem = $(this);

	WebDeveloper.Popup.getSelectedTab(function(tab)
	{
		// If the tab is valid
		if(WebDeveloper.Popup.isValidTab(tab))
		{
			WebDeveloper.Popup.Miscellaneous.toggleFeatureOnTab(featureItem, tab, "WebDeveloper.Miscellaneous.linearizePage(document);");
		}
	});
};
	
// Makes all frames resizable
WebDeveloper.Popup.Miscellaneous.makeFramesResizable = function()
{
	var featureItem = $(this);

	WebDeveloper.Popup.getSelectedTab(function(tab)
	{
		// If the tab is valid
		if(WebDeveloper.Popup.isValidTab(tab))
		{
			WebDeveloper.Popup.Miscellaneous.addFeatureOnTab(featureItem, tab, "WebDeveloper.Miscellaneous.makeFramesResizable(document);");
		}
	});
};

// Toggles a feature on a tab
WebDeveloper.Popup.Miscellaneous.toggleFeatureOnTab = function(featureItem, tab, scriptCode)
{
	WebDeveloper.Popup.toggleFeatureOnTab(featureItem, tab, "features/javascript/miscellaneous.js", scriptCode);
};
