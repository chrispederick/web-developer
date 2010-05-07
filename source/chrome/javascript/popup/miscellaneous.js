WebDeveloper.Popup.Miscellaneous = {};

$(function() 
{ 
	$("#linearize-page").click(WebDeveloper.Popup.Miscellaneous.linearizePage);
	$("#make-frames-resizable").click(WebDeveloper.Popup.Miscellaneous.makeFramesResizable);
	$("#show-hidden-elements").click(WebDeveloper.Popup.Miscellaneous.showHiddenElements);
});

// Adds a feature on a tab
WebDeveloper.Popup.Miscellaneous.addFeatureOnTab = function(featureItem, tab, scriptCode)
{
	WebDeveloper.Popup.addFeatureOnTab(featureItem, tab, "features/javascript/miscellaneous.js", scriptCode);
};
	
// Linearizes a page
WebDeveloper.Popup.Miscellaneous.linearizePage = function()
{
	var featureItem = $(this);

	WebDeveloper.Popup.getSelectedTab(function(tab)
	{
		WebDeveloper.Popup.Miscellaneous.toggleFeatureOnTab(featureItem, tab, "WebDeveloper.Miscellaneous.linearizePage(document);");
	});
};
	
// Makes all frames resizable
WebDeveloper.Popup.Miscellaneous.makeFramesResizable = function()
{
	var featureItem = $(this);

	WebDeveloper.Popup.getSelectedTab(function(tab)
	{
		WebDeveloper.Popup.Miscellaneous.addFeatureOnTab(featureItem, tab, "WebDeveloper.Miscellaneous.makeFramesResizable(document);");
	});
};
	
// Shows all hidden elements
WebDeveloper.Popup.Miscellaneous.showHiddenElements = function()
{
	var featureItem = $(this);

	WebDeveloper.Popup.getSelectedTab(function(tab)
	{
		WebDeveloper.Popup.Miscellaneous.addFeatureOnTab(featureItem, tab, "WebDeveloper.Miscellaneous.showHiddenElements(document);");
		WebDeveloper.Popup.close();
	});
};

// Toggles a feature on a tab
WebDeveloper.Popup.Miscellaneous.toggleFeatureOnTab = function(featureItem, tab, scriptCode)
{
	WebDeveloper.Popup.toggleFeatureOnTab(featureItem, tab, "features/javascript/miscellaneous.js", scriptCode);
};
