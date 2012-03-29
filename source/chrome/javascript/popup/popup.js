var WebDeveloper = WebDeveloper || {};

WebDeveloper.Popup								= WebDeveloper.Popup || {};
WebDeveloper.Popup.animationSpeed = 100;

$(function()
{
	var menu				 = chrome.extension.getBackgroundPage().WebDeveloper.Storage.getItem("menu");
	var notification = $("#notification");

	$("#css-toolbar > a").append(WebDeveloper.Locales.getString("css"));
	$("#forms-toolbar > a").append(WebDeveloper.Locales.getString("forms"));
	$("#images-toolbar > a").append(WebDeveloper.Locales.getString("images"));
	$("#information-toolbar > a").append(WebDeveloper.Locales.getString("information"));
	$("#miscellaneous-toolbar > a").append(WebDeveloper.Locales.getString("miscellaneous"));
	$("#options-toolbar > a").append(WebDeveloper.Locales.getString("options"));
	$("#outline-toolbar > a").append(WebDeveloper.Locales.getString("outline"));
	$("#resize-toolbar > a").append(WebDeveloper.Locales.getString("resize"));
	$("#tools-toolbar > a").append(WebDeveloper.Locales.getString("tools"));

	// If the menu is set
	if(menu)
	{
		$("a", $("#" + menu)).tab("show");
	}

	WebDeveloper.Popup.getSelectedTab(function(tab)
	{
		var featuresOnTab = chrome.extension.getBackgroundPage().WebDeveloper.Storage.getFeaturesOnTab(tab.id);

		// If there are features on the tab
		if(featuresOnTab)
		{
			// Loop through the features on the tab
			for(var i = 0, l = featuresOnTab.length; i < l; i++)
			{
				$("#" + featuresOnTab[i]).addClass("active");
			}
		}
	});

	$(".cancel", $("#confirmation")).on("click", WebDeveloper.Popup.closeConfirmation);
	$(".close", notification).on("click", WebDeveloper.Popup.closeNotification);
	$("span", notification).on("click", "a", WebDeveloper.Popup.openURL);
	$("li", $(".nav-tabs")).on("click", WebDeveloper.Popup.changeTab);
});

// Adds a feature on a tab
WebDeveloper.Popup.addFeatureOnTab = function(featureItem, tab, scriptFile, scriptCode)
{
	WebDeveloper.Popup.addScriptsToTab(tab, scriptFile, scriptCode, null);
};

// Adds a script to the tab
WebDeveloper.Popup.addScriptToTab = function(tab, script, callback)
{
	chrome.tabs.executeScript(tab.id, script, callback);
};

// Adds scripts to the tab
WebDeveloper.Popup.addScriptsToTab = function(tab, scriptFile, scriptCode, callback)
{
	WebDeveloper.Popup.addScriptToTab(tab, { "file": scriptFile }, function()
	{
		WebDeveloper.Popup.addScriptToTab(tab, { "code": scriptCode }, callback);
	});
};

// Handles a tab change
WebDeveloper.Popup.changeTab = function()
{
	WebDeveloper.Popup.closeNotification();

	chrome.extension.getBackgroundPage().WebDeveloper.Storage.setItem("menu", $(this).attr("id"));
};

// Closes the popup
WebDeveloper.Popup.close = function()
{
	window.close();
};

// Closes the confirmation
WebDeveloper.Popup.closeConfirmation = function(event, callback)
{
	$("#confirmation").slideUp(WebDeveloper.Popup.animationSpeed, callback);

	// If the event is set
	if(event)
	{
		event.preventDefault();
	}
};

// Closes the notification
WebDeveloper.Popup.closeNotification = function(event, callback)
{
	$("#notification").slideUp(WebDeveloper.Popup.animationSpeed, callback);

	// If the event is set
	if(event)
	{
		event.preventDefault();
	}
};

// Displays a confirmation
WebDeveloper.Popup.displayConfirmation = function(message, button, callback)
{
	var confirmation = $("#confirmation");

	WebDeveloper.Popup.closeConfirmation(null, function()
	{
		$("span", confirmation).html(message);
		$(".btn-warning", confirmation).html(button).off("click").on("click", callback);
		confirmation.slideDown(WebDeveloper.Popup.animationSpeed);
	});
};

// Displays a notification
WebDeveloper.Popup.displayNotification = function(message, type)
{
	var notification = $("#notification");

	// If the type is not specified
	if(!type)
	{
		type = "success";
	}

	WebDeveloper.Popup.closeNotification(null, function()
	{
		notification.removeClass().addClass("alert alert-" + type);
		$("span", notification).html(message);
		notification.slideDown(WebDeveloper.Popup.animationSpeed);
	});
};

// Returns the selected tab
WebDeveloper.Popup.getSelectedTab = function(callback)
{
	chrome.tabs.getSelected(null, callback);
};

// Returns the selected window
WebDeveloper.Popup.getSelectedWindow = function(callback)
{
	chrome.windows.getCurrent(callback);
};

// Returns true if this is a valid tab
WebDeveloper.Popup.isValidTab = function(tab)
{
	var url = tab.url;

	// If this is a chrome URL
	if(url.indexOf("chrome://") === 0 || url.indexOf("chrome-extension://") === 0)
	{
		WebDeveloper.Popup.displayNotification(WebDeveloper.Locales.getString("extensionName") + " " + WebDeveloper.Locales.getString("internalBrowserPagesError"), "error");

		return false;
	}
	else if(url.indexOf("https://chrome.google.com/extensions/") === 0 || url.indexOf("https://chrome.google.com/webstore/") === 0)
	{
		WebDeveloper.Popup.displayNotification(WebDeveloper.Locales.getString("extensionName") + " " + WebDeveloper.Locales.getString("chromeExtensionGalleryError"), "error");

		return false;
	}

	return true;
};

// Opens a tab to the URL
WebDeveloper.Popup.openTab = function(tabURL)
{
	WebDeveloper.Popup.getSelectedTab(function(tab)
	{
		chrome.tabs.create({ "index": tab.index + 1, "url": tabURL });

		WebDeveloper.Popup.close();
	});
};

// Opens a URL in the popup
WebDeveloper.Popup.openURL = function()
{
	var href = $(this).attr("href");

	WebDeveloper.Popup.getSelectedTab(function(tab)
	{
		chrome.tabs.create({ "index": tab.index + 1, "url": href });

		WebDeveloper.Popup.close();
	});
};

// Handles any popup requests
WebDeveloper.Popup.request = function(request, sender, sendResponse)
{
	// If the request type is a notification
	if(request.type == "display-notification")
	{
		var substitutes = request.substitutes;

		// If substitutes are set
		if(substitutes)
		{
			WebDeveloper.Popup.displayNotification(WebDeveloper.Locales.getSubstitutedString(request.message, substitutes));
		}
		else
		{
			WebDeveloper.Popup.displayNotification(WebDeveloper.Locales.getString(request.message));
		}
	}

	sendResponse({});
};

// Toggles a feature on a tab
WebDeveloper.Popup.toggleFeatureOnTab = function(featureItem, tab, scriptFile, scriptCode)
{
	var feature = featureItem.attr("id");

	WebDeveloper.Popup.addScriptsToTab(tab, scriptFile, scriptCode, function()
	{
		chrome.extension.getBackgroundPage().WebDeveloper.Storage.toggleFeatureOnTab(feature, tab);

		featureItem.toggleClass("active");
	});
};

chrome.extension.onRequest.addListener(WebDeveloper.Popup.request);
