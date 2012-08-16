var WebDeveloper = WebDeveloper || {};

WebDeveloper.Common									= WebDeveloper.Common || {};
WebDeveloper.Overlay								= WebDeveloper.Overlay || {};
WebDeveloper.Overlay.animationSpeed = 100;

$(function()
{
	var menu				 = chrome.extension.getBackgroundPage().WebDeveloper.Storage.getItem("menu");
	var notification = $("#notification");

	$("#cookies-toolbar > a").append(WebDeveloper.Locales.getString("cookies"));
	$("#css-toolbar > a").append(WebDeveloper.Locales.getString("css"));
	$("#disable-toolbar > a").append(WebDeveloper.Locales.getString("disable"));
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

	WebDeveloper.Overlay.getSelectedTab(function(tab)
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

	$("#confirmation-cancel").on("click", WebDeveloper.Overlay.closeConfirmation);
	$(".close", notification).on("click", WebDeveloper.Overlay.closeNotification);
	$(".help-inline").on("click", "a", WebDeveloper.Overlay.openURL);
	$("li", $(".nav-tabs")).on("click", WebDeveloper.Overlay.changeTab);
	$(notification).on("click", "a", WebDeveloper.Overlay.openURL);
});

// Displays a notification
WebDeveloper.Common.displayNotification = function(message, parameters)
{
	// If parameters are set
	if(parameters)
	{
		WebDeveloper.Overlay.displayNotification(WebDeveloper.Locales.getFormattedString(message, parameters));
	}
	else
	{
		WebDeveloper.Overlay.displayNotification(WebDeveloper.Locales.getString(message));
	}
};

// Adds a feature on a tab
WebDeveloper.Overlay.addFeatureOnTab = function(featureItem, tab, scriptFile, scriptCode)
{
	WebDeveloper.Overlay.addScriptsToTab(tab, scriptFile, scriptCode, null);
};

// Adds a script to the tab
WebDeveloper.Overlay.addScriptToTab = function(tab, script, callback)
{
	chrome.tabs.executeScript(tab.id, script, callback);
};

// Adds scripts to the tab
WebDeveloper.Overlay.addScriptsToTab = function(tab, scriptFile, scriptCode, callback)
{
	WebDeveloper.Overlay.addScriptToTab(tab, { "file": scriptFile }, function()
	{
		WebDeveloper.Overlay.addScriptToTab(tab, { "code": scriptCode }, callback);
	});
};

// Handles a tab change
WebDeveloper.Overlay.changeTab = function()
{
	WebDeveloper.Overlay.closeNotification();

	chrome.extension.getBackgroundPage().WebDeveloper.Storage.setItem("menu", $(this).attr("id"));
};

// Closes the overlay
WebDeveloper.Overlay.close = function()
{
	window.close();
};

// Closes the confirmation
WebDeveloper.Overlay.closeConfirmation = function(event, callback)
{
	$("#confirmation").slideUp(WebDeveloper.Overlay.animationSpeed, callback);

	// If the event is set
	if(event)
	{
		event.preventDefault();
	}
};

// Closes the notification
WebDeveloper.Overlay.closeNotification = function(event, callback)
{
	$("#notification").slideUp(WebDeveloper.Overlay.animationSpeed, callback);

	// If the event is set
	if(event)
	{
		event.preventDefault();
	}
};

// Displays a confirmation
WebDeveloper.Overlay.displayConfirmation = function(title, message, buttonText, buttonIcon, callback)
{
	var confirmation = $("#confirmation");

	WebDeveloper.Overlay.closeConfirmation(null, function()
	{
		var buttonHTML = buttonText;

		// If the button icon is set
		if(buttonIcon)
		{
			buttonHTML = '<i class="icon-' + buttonIcon + '"></i> ' + buttonText;
		}

		$("span", confirmation).text(message);
		$("#confirmation-cancel").text(WebDeveloper.Locales.getString("cancel"));
		$(".btn-warning", confirmation).html(buttonHTML).off("click").on("click", callback);
		confirmation.slideDown(WebDeveloper.Overlay.animationSpeed);
	});
};

// Displays a notification
WebDeveloper.Overlay.displayNotification = function(message, type)
{
	var notification = $("#notification");

	// If the type is not specified
	if(!type)
	{
		type = "success";
	}

	WebDeveloper.Overlay.closeNotification(null, function()
	{
		notification.removeClass().addClass("alert alert-" + type);
		$("span", notification).html(message);
		notification.slideDown(WebDeveloper.Overlay.animationSpeed);
	});
};

// Returns the selected tab
WebDeveloper.Overlay.getSelectedTab = function(callback)
{
	chrome.tabs.getSelected(null, callback);
};

// Returns the selected window
WebDeveloper.Overlay.getSelectedWindow = function(callback)
{
	chrome.windows.getCurrent(callback);
};

// Returns true if this is a valid tab
WebDeveloper.Overlay.isValidTab = function(tab)
{
	var url = tab.url;

	// If this is a chrome URL
	if(url.indexOf("chrome://") === 0 || url.indexOf("chrome-extension://") === 0)
	{
		WebDeveloper.Overlay.displayNotification(WebDeveloper.Locales.getString("extensionName") + " " + WebDeveloper.Locales.getString("internalBrowserPagesError"), "error");

		return false;
	}
	else if(url.indexOf("https://chrome.google.com/extensions/") === 0 || url.indexOf("https://chrome.google.com/webstore/") === 0)
	{
		WebDeveloper.Overlay.displayNotification(WebDeveloper.Locales.getString("extensionName") + " " + WebDeveloper.Locales.getString("chromeExtensionGalleryError"), "error");

		return false;
	}

	return true;
};

// Opens a tab to the URL
WebDeveloper.Overlay.openTab = function(tabURL)
{
	WebDeveloper.Overlay.getSelectedTab(function(tab)
	{
		chrome.tabs.create({ "index": tab.index + 1, "url": tabURL });

		WebDeveloper.Overlay.close();
	});
};

// Opens a URL from the overlay
WebDeveloper.Overlay.openURL = function()
{
	var href = $(this).attr("href");

	WebDeveloper.Overlay.getSelectedTab(function(tab)
	{
		chrome.tabs.create({ "index": tab.index + 1, "url": href });

		WebDeveloper.Overlay.close();
	});
};

// Handles any overlay requests
WebDeveloper.Overlay.request = function(request, sender, sendResponse)
{
	// If the request type is a notification
	if(request.type == "display-notification")
	{
		WebDeveloper.Common.displayNotification(request.message, request.parameters);
	}

	sendResponse({});
};

// Toggles a content setting
WebDeveloper.Overlay.toggleContentSetting = function(settingType, menu, url, enableMessage, disableMessage)
{
	chrome.contentSettings[settingType].get({ "primaryUrl": url }, function(details)
	{
		var callback = null;
		var setting  = details.setting;

		// If the setting is currently set to block
		if(setting == "block")
		{
			setting = "allow";
		}
		else
		{
			setting = "block";
		}

		// If the enable and disable message are set
		if(enableMessage && disableMessage)
		{
			callback = function()
			{
				WebDeveloper.Overlay.updateContentSettingMenu(menu, settingType);

				// If the setting is being allowed
				if(setting == "allow")
				{
					WebDeveloper.Overlay.displayNotification(WebDeveloper.Locales.getString(enableMessage));
				}
				else
				{
					WebDeveloper.Overlay.displayNotification(WebDeveloper.Locales.getString(disableMessage));
				}
			};
		}

		chrome.contentSettings[settingType].set({ "primaryPattern": url, "setting": setting }, callback);
	});
};

// Toggles a feature on a tab
WebDeveloper.Overlay.toggleFeatureOnTab = function(featureItem, tab, scriptFile, scriptCode, closeOverlay)
{
	var feature = featureItem.attr("id");

	WebDeveloper.Overlay.addScriptsToTab(tab, scriptFile, scriptCode, function()
	{
		chrome.extension.getBackgroundPage().WebDeveloper.Storage.toggleFeatureOnTab(feature, tab);

		featureItem.toggleClass("active");

		// If the overlay should be closed
		if(closeOverlay)
		{
			WebDeveloper.Overlay.close();
		}
	});
};

// Updates the menu
WebDeveloper.Overlay.updateContentSettingMenu = function(menu, settingType)
{
	chrome.contentSettings[settingType].get({ "primaryUrl": "http://*/*" }, function(details)
	{
		var setting = details.setting;

		// If the setting is currently set to block
		if(setting == "block")
		{
			menu.addClass("active");
		}
		else if(menu.hasClass("active"))
		{
			menu.removeClass("active");
		}
	});
};

chrome.extension.onRequest.addListener(WebDeveloper.Overlay.request);
