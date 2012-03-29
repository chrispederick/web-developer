var WebDeveloper = WebDeveloper || {};

WebDeveloper.Popup				= WebDeveloper.Popup || {};
WebDeveloper.Popup.Resize = WebDeveloper.Popup.Resize || {};

$(function()
{
	$("#display-window-size").on("click", WebDeveloper.Popup.Resize.displayWindowSize);
	$("#resize-window").on("click", WebDeveloper.Popup.Resize.resizeWindow);
	$("#view-responsive-layouts").on("click", WebDeveloper.Popup.Resize.viewResponsiveLayouts);

	$("#resize-window-cancel").on("click", WebDeveloper.Popup.Resize.cancelResizeWindow);
	$("#resize-window-dialog").on("submit", function(event) { event.preventDefault(); });
	$("#resize-window-height, #resize-window-width").on("keypress", WebDeveloper.Popup.Resize.resizeWindowKeyPress);
	$("#resize-window-submit").on("click", WebDeveloper.Popup.Resize.submitResizeWindow);

	WebDeveloper.Popup.Resize.setupCustomResizeOptions();
});

// Cancels resizing the window
WebDeveloper.Popup.Resize.cancelResizeWindow = function()
{
	$("#resize-window-dialog").slideUp(WebDeveloper.Popup.animationSpeed, function()
	{
		$(".tabbable").slideDown(WebDeveloper.Popup.animationSpeed);
	});
};

// Resizes the window to a custom size
WebDeveloper.Popup.Resize.customResizeWindow = function()
{
	var featureItem = $(this);

	WebDeveloper.Popup.getSelectedWindow(function(selectedWindow)
	{
		chrome.windows.update(selectedWindow.id, {height: parseInt(featureItem.data("height"), 10), width: parseInt(featureItem.data("width"), 10)}, function()
		{
			WebDeveloper.Popup.close();
		});
	});
};

// Displays the window size
WebDeveloper.Popup.Resize.displayWindowSize = function()
{
	WebDeveloper.Popup.getSelectedTab(function(tab)
	{
		// If the tab is valid
		if(WebDeveloper.Popup.isValidTab(tab))
		{
			chrome.tabs.sendRequest(tab.id, {type: "get-window-size"}, function(response)
			{
				WebDeveloper.Popup.displayNotification(WebDeveloper.Locales.getSubstitutedString("displayWindowSizeResult", [response.outerWidth, response.outerHeight, response.innerWidth, response.innerHeight]), "info");
			});
		}
	});
};

// Resizes the window
WebDeveloper.Popup.Resize.resizeWindow = function()
{
	var featureItem = $(this);

	WebDeveloper.Popup.getSelectedTab(function(tab)
	{
		// If the tab is valid
		if(WebDeveloper.Popup.isValidTab(tab))
		{
			chrome.tabs.sendRequest(tab.id, {type: "get-window-size"}, function(response)
			{
				$("#resize-window-height").val(response.outerHeight);
				$("#resize-window-width").val(response.outerWidth).focus();

				$(".tabbable, #confirmation, #notification").slideUp(WebDeveloper.Popup.animationSpeed, function()
				{
					$("#resize-window-dialog").slideDown(WebDeveloper.Popup.animationSpeed);
				});
			});
		}
	});
};

// Handles a key press when resizing a window
WebDeveloper.Popup.Resize.resizeWindowKeyPress = function(event)
{
	// If the enter key was pressed
	if(event.keyCode == 13)
	{
		WebDeveloper.Popup.Resize.submitResizeWindow();
	}
};

// Sets up the custom resize options
WebDeveloper.Popup.Resize.setupCustomResizeOptions = function()
{
	var customResizeOptions	= $("#custom-resize-options").empty();
	var description					= null;
	var height							= 0;
	var resizeOption				= null;
	var storage							= chrome.extension.getBackgroundPage().WebDeveloper.Storage;
	var width								= 0;

	// Loop through the resize options
	for(var i = 1, l = storage.getItem("resize_count"); i <= l; i++)
	{
		description = storage.getItem("resize_" + i + "_description");
		height			= storage.getItem("resize_" + i + "_height");
		width				= storage.getItem("resize_" + i + "_width");

		// If the description, height and width are set
		if(description && height > 0 && width > 0)
		{
			resizeOption = {};

			resizeOption.description = description;
			resizeOption.height			 = height;
			resizeOption.width			 = width;

			customResizeOptions.append(ich.custom_resize_option(resizeOption));
		}
	}

	$(".custom-resize-window").on("click", WebDeveloper.Popup.Resize.customResizeWindow);
};

// Resizes the window
WebDeveloper.Popup.Resize.submitResizeWindow = function()
{
	var resizeHeight = parseInt($("#resize-window-height").val(), 10);
	var resizeWidth	 = parseInt($("#resize-window-width").val(), 10);

	WebDeveloper.Popup.getSelectedWindow(function(selectedWindow)
	{
		chrome.windows.update(selectedWindow.id, {height: resizeHeight, width: resizeWidth}, function()
		{
			WebDeveloper.Popup.Resize.cancelResizeWindow();
			WebDeveloper.Popup.Resize.displayWindowSize();
		});
	});
};

// Displays the responsive layouts for the page
WebDeveloper.Popup.Resize.viewResponsiveLayouts = function()
{
	WebDeveloper.Popup.getSelectedTab(function(tab)
	{
		// If the tab is valid
		if(WebDeveloper.Popup.isValidTab(tab))
		{
			var data				= {};
			var description = null;
			var height			= null;
			var layout			= null;
			var locale			= WebDeveloper.Locales.setupGeneratedLocale();
			var storage			= chrome.extension.getBackgroundPage().WebDeveloper.Storage;
			var width				= null;

			data.layouts						 = [];
			data.pageURL						 = tab.url;

			// Loop through the possible responsive options
			for(var i = 1, l = storage.getItem("responsive_layout_count"); i <= l; i++)
			{
				description = storage.getItem("responsive_layout_" + i + "_description");
				height			= storage.getItem("responsive_layout_" + i + "_height");
				width				= storage.getItem("responsive_layout_" + i + "_width");

				// If the description, height and width are set
				if(description && height > 0 && width > 0)
				{
					layout						 = {};
					layout.description = description;
					layout.height			 = height;
					layout.width			 = width;

					data.layouts.push(layout);
				}
			}

			locale.layouts					 = WebDeveloper.Locales.getString("layouts");
			locale.reloadLayouts		 = WebDeveloper.Locales.getString("reloadLayouts");
			locale.responsiveLayouts = WebDeveloper.Locales.getString("responsiveLayouts");

			chrome.extension.getBackgroundPage().WebDeveloper.Background.openGeneratedTab(chrome.extension.getURL("generated/view-responsive-layouts.html"), tab.index, data, locale);

			WebDeveloper.Popup.close();
		}
	});
};
