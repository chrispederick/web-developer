WebDeveloper.Popup.Options = {};

$(function() 
{ 
	$("#about").click(WebDeveloper.Popup.Options.about);
	$("#help").click(WebDeveloper.Popup.Options.help);
	$("#options").click(WebDeveloper.Popup.Options.options);
	$("#reset-page").click(WebDeveloper.Popup.Options.resetPage);
});
	
// Opens the about page
WebDeveloper.Popup.Options.about = function()
{
	WebDeveloper.Popup.openTab(chrome.extension.getURL("about/about.html"), $(this));
};
	
// Opens the help
WebDeveloper.Popup.Options.help = function()
{
	WebDeveloper.Popup.openTab("@url@help/", $(this));
};
	
// Opens the options
WebDeveloper.Popup.Options.options = function()
{
	WebDeveloper.Popup.openTab(chrome.extension.getURL("options/options.html"), $(this));
};
	
// Resets the page
WebDeveloper.Popup.Options.resetPage = function()
{
	var featureItem = $(this);

	WebDeveloper.Popup.getSelectedTab(function(tab)
	{
		WebDeveloper.Popup.addScriptToTab(tab, { code: "window.location.reload();" }, function() 
		{ 
			WebDeveloper.Analytics.trackFeature(featureItem);
			WebDeveloper.Popup.close();
		});
	});	
};
