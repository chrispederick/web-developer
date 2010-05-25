var WebDeveloper = WebDeveloper || {};

WebDeveloper.Popup = WebDeveloper.Popup || {};

$(function() 
{ 
	$("#toolbar li").click(WebDeveloper.Popup.toggleMenu);
	$("a").live("click", WebDeveloper.Popup.openURL);
});
	
// Adds a feature on a tab
WebDeveloper.Popup.addFeatureOnTab = function(featureItem, tab, scriptFile, scriptCode)
{
	WebDeveloper.Popup.addScriptsToTab(tab, scriptFile, scriptCode, function() 
	{
		WebDeveloper.Analytics.trackFeature(featureItem);
	});
};

// Adds a script to the tab
WebDeveloper.Popup.addScriptToTab = function(tab, script, callback)
{
	chrome.tabs.executeScript(tab.id, script, callback);
};
	
// Adds scripts to the tab
WebDeveloper.Popup.addScriptsToTab = function(tab, scriptFile, scriptCode, callback)
{
	WebDeveloper.Popup.addScriptToTab(tab, { file: scriptFile }, function()
	{
		WebDeveloper.Popup.addScriptToTab(tab, { code: scriptCode }, callback);
	});
};
	
// Clears a notification	
WebDeveloper.Popup.clearNotification = function()
{
	var notification = $("#notification");

	notification.hide();
	notification.children().not(".icon").remove();
};

// Closes the popup
WebDeveloper.Popup.close = function()
{
	// If the platform is not Windows
	if(!WebDeveloper.Platform.isWindows())
	{
		window.close();
	}
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
	if(url.indexOf("chrome://") === 0)
	{
		WebDeveloper.Popup.showSimpleNotification('The @name@ extension does not work on internal browser pages.');	

		return false;
	}
	else if(url.indexOf("file://") === 0)
	{
		WebDeveloper.Popup.showSimpleNotification('The @name@ extension does not work on local files. Please <a href="@url@faq/#local-files-gallery">read the FAQ</a> for more information.');	

		return false;
	}
	else if(url.indexOf("https://chrome.google.com/extensions/") === 0)
	{
		WebDeveloper.Popup.showSimpleNotification('The @name@ extension does not work on the Chrome Extension Gallery. Please <a href="@url@faq/#local-files-gallery">read the FAQ</a> for more information.');	

		return false;
	}
	
	return true;
};

// Handles the popup loading
WebDeveloper.Popup.load = function() 
{
	var menu = chrome.extension.getBackgroundPage().WebDeveloper.Storage.getMenu();

	// If the menu is set	
	if(menu)
	{
		var toolbar = null;

		menu		= $("#" + menu);
		toolbar = $("#" + menu.attr("id").replace("menu", "toolbar"));

		toolbar.toggleClass("selected");
		menu.toggle();
		
		WebDeveloper.Analytics.trackMenu(menu);
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
};

// Opens a tab to the URL
WebDeveloper.Popup.openTab = function(tabURL, featureItem)
{
	WebDeveloper.Popup.getSelectedTab(function(tab)
	{
		chrome.tabs.create({ index: tab.index + 1, url: tabURL });
		WebDeveloper.Analytics.trackFeature(featureItem);
		WebDeveloper.Popup.close();
	});	
};

// Opens a URL in the popup
WebDeveloper.Popup.openURL = function()
{
	var href = $(this).attr("href");

	WebDeveloper.Popup.getSelectedTab(function(tab)
	{
		chrome.tabs.create({ index: tab.index + 1, url: href });
		WebDeveloper.Popup.close();
	});	
};
	
// Handles any popup requests	
WebDeveloper.Popup.request = function(request, sender, sendResponse) 
{
	// If the request type is a notification
	if(request.type == "notification")
	{
		WebDeveloper.Popup.showSimpleNotification(request.notification);
	}

	sendResponse({});
};	
	
// Shows a complex notification	
WebDeveloper.Popup.showComplexNotification = function(message)
{
	WebDeveloper.Popup.clearNotification();

	$("#notification").append(message);
	
	WebDeveloper.Popup.showNotification();
};

// Shows the notification
WebDeveloper.Popup.showNotification = function()
{
	$("#notification").fadeIn(500);
};
	
// Shows a simple notification	
WebDeveloper.Popup.showSimpleNotification = function(message)
{
	WebDeveloper.Popup.clearNotification();

	$("<p></p>").html(message).appendTo($("#notification"));
	
	WebDeveloper.Popup.showNotification();
};

// Toggles a feature on a tab
WebDeveloper.Popup.toggleFeatureOnTab = function(featureItem, tab, scriptFile, scriptCode)
{
	var feature = featureItem.attr("id");

	WebDeveloper.Popup.addScriptsToTab(tab, scriptFile, scriptCode, function()
	{
		chrome.extension.getBackgroundPage().WebDeveloper.Storage.toggleFeatureOnTab(feature, tab);
		
		featureItem.toggleClass("active");
		
		WebDeveloper.Analytics.trackToggleFeature(featureItem);
	});
};

// Toggles a menu
WebDeveloper.Popup.toggleMenu = function()
{
	var toolbar = $(this);
	var menu		 = $("#" + toolbar.attr("id").replace("toolbar", "menu"));
	
	$("#notification").hide();
	
	$("#toolbar li").not(toolbar).removeClass("selected");
	$(".menu").not(menu).hide();
	
	toolbar.toggleClass("selected");
	menu.toggle();

	chrome.extension.getBackgroundPage().WebDeveloper.Storage.toggleMenu(menu.attr("id"));
		
	WebDeveloper.Analytics.trackMenu(menu);
};

document.addEventListener("DOMContentLoaded", WebDeveloper.Popup.load, false);

chrome.extension.onRequest.addListener(WebDeveloper.Popup.request);
