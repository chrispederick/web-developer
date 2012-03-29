var WebDeveloper = WebDeveloper || {};

WebDeveloper.Popup				 = WebDeveloper.Popup || {};
WebDeveloper.Popup.Options = WebDeveloper.Popup.Options || {};

$(function()
{
	$("#about").on("click", WebDeveloper.Popup.Options.about);
	$("#help").on("click", WebDeveloper.Popup.openURL);
	$("#options").on("click", WebDeveloper.Popup.Options.options);
	$("#reset-page").on("click", WebDeveloper.Popup.Options.resetPage);
});

// Opens the about page
WebDeveloper.Popup.Options.about = function()
{
	WebDeveloper.Popup.getSelectedTab(function(tab)
	{
		var locale = {};

		locale.about								= WebDeveloper.Locales.getString("about");
		locale.author								= WebDeveloper.Locales.getString("author");
		locale.buildDate						= WebDeveloper.Locales.getString("buildDate");
		locale.extensionDescription = WebDeveloper.Locales.getString("extensionDescription");
		locale.extensionName				= WebDeveloper.Locales.getString("extensionName");
		locale.version							= WebDeveloper.Locales.getString("version");

		chrome.extension.getBackgroundPage().WebDeveloper.Background.openGeneratedTab(chrome.extension.getURL("about/about.html"), tab.index, null, locale);

		WebDeveloper.Popup.close();
	});
};

// Opens the options
WebDeveloper.Popup.Options.options = function()
{
	WebDeveloper.Popup.openTab(chrome.extension.getURL("options/options.html"));
};

// Resets the page
WebDeveloper.Popup.Options.resetPage = function()
{
	var featureItem = $(this);

	WebDeveloper.Popup.getSelectedTab(function(tab)
	{
		WebDeveloper.Popup.addScriptToTab(tab, { "code": "window.location.reload();" }, function()
		{
			WebDeveloper.Popup.close();
		});
	});
};
