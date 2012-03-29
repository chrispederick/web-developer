var WebDeveloper = WebDeveloper || {};

WebDeveloper.Popup			 = WebDeveloper.Popup || {};
WebDeveloper.Popup.Tools = WebDeveloper.Popup.Tools || {};

$(function()
{
	$("#validate-local-css").on("click", WebDeveloper.Popup.Tools.validateLocalCSS);
	$("#validate-local-html").on("click", WebDeveloper.Popup.Tools.validateLocalHTML);
	$("#view-source").on("click", WebDeveloper.Popup.Tools.viewSource);

	WebDeveloper.Popup.Tools.setupCustomTools();
});

// Opens a custom tool
WebDeveloper.Popup.Tools.customTool = function()
{
	var featureItem = $(this);

	WebDeveloper.Popup.getSelectedTab(function(tab)
	{
		WebDeveloper.Popup.openTab(featureItem.data("url") + tab.url);

		WebDeveloper.Popup.close();
	});
};

// Sets up the custom tools
WebDeveloper.Popup.Tools.setupCustomTools = function()
{
	var customTools	= $("#custom-tools").empty();
	var description	= null;
	var storage			= chrome.extension.getBackgroundPage().WebDeveloper.Storage;
	var tool				= null;
	var url					= 0;

	// Loop through the tools
	for(var i = 1, l = storage.getItem("tool_count"); i <= l; i++)
	{
		description = storage.getItem("tool_" + i + "_description");
		url					= storage.getItem("tool_" + i + "_url");

		// If the description and url are set
		if(description && url)
		{
			tool = {};

			tool.description = description;
			tool.url				 = url;

			customTools.append(ich.custom_tool(tool));
		}
	}

	$(".custom-tool").on("click", WebDeveloper.Popup.Tools.customTool);
};

// Validates the CSS of the local page
WebDeveloper.Popup.Tools.validateLocalCSS = function()
{
	WebDeveloper.Popup.getSelectedTab(function(tab)
	{
		// If the tab is valid
		if(WebDeveloper.Popup.isValidTab(tab))
		{
			chrome.tabs.sendRequest(tab.id, {type: "get-css"}, function(data)
			{
				chrome.extension.getBackgroundPage().WebDeveloper.Background.validateLocalCSS(chrome.extension.getURL("validation/css.html"), tab.index, data);

				WebDeveloper.Popup.close();
			});
		}
	});
};

// Validates the HTML of the local page
WebDeveloper.Popup.Tools.validateLocalHTML = function()
{
	WebDeveloper.Popup.getSelectedTab(function(tab)
	{
		// If the tab is valid
		if(WebDeveloper.Popup.isValidTab(tab))
		{
			chrome.extension.getBackgroundPage().WebDeveloper.Background.validateLocalHTML(chrome.extension.getURL("validation/html.html"), tab.index, tab.url);

			WebDeveloper.Popup.close();
		}
	});
};

// Displays the source of the page
WebDeveloper.Popup.Tools.viewSource = function()
{
	WebDeveloper.Popup.getSelectedTab(function(tab)
	{
		WebDeveloper.Popup.openTab("view-source:" + tab.url);
	});
};
