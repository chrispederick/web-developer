var WebDeveloper = WebDeveloper || {};

WebDeveloper.Popup                             = WebDeveloper.Popup || {};
WebDeveloper.Popup.initializeGeneratedTabDelay = 250;

$(function() 
{ 
	$("#toolbar li").click(WebDeveloper.Popup.toggleMenu);
});
	
// Adds a feature on a tab
WebDeveloper.Popup.addFeatureOnTab = function(tab, scriptFile, scriptCode)
{
	WebDeveloper.Popup.addScriptsToTab(tab, scriptFile, scriptCode, function() {});
};

// Adds a script to the tab
WebDeveloper.Popup.addScriptToTab = function(tab, script, callback)
{
	script.allFrames = true;

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

// Initializes a generated tab
WebDeveloper.Popup.initializeGeneratedTab = function(url, response)
{
	var extensionTab = null;
	var tabs         = chrome.extension.getExtensionTabs();
	
	// Loop through the tabs
	for(var i = 0, l = tabs.length; i < l; i++) 
	{
		extensionTab = tabs[i];
		
		// If the tab has a matching URL and has not been initialized
		if(extensionTab.location.href == url && !extensionTab.webDeveloperInitialized)
		{
			extensionTab.webDeveloperInitialized = true;
		
			extensionTab.initialize(response);
			
			window.close();
		}
	}
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

// Opens a generated tab to the URL
WebDeveloper.Popup.openGeneratedTab = function(url, tab, response)
{
	WebDeveloper.Popup.openTab(url, tab, function(openedTab)
	{
		// Initialize the tab on a delay to make sure the tab is open
		window.setTimeout(function() { WebDeveloper.Popup.initializeGeneratedTab(url, response); }, WebDeveloper.Popup.initializeGeneratedTabDelay);
	});
};

// Opens a tab to the URL
WebDeveloper.Popup.openTab = function(tabURL, tab, callback)
{
	chrome.tabs.create({ index: tab.index + 1, url: tabURL }, callback);
};
	
// Handles any popup requests	
WebDeveloper.Popup.request = function(request, sender, sendResponse) 
{
	// If the request type is a notification
	if(request.type == "notification")
	{
		WebDeveloper.Popup.showSimpleNotification(request.notification);
				 
		 sendResponse({});
	}
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
};

document.addEventListener("DOMContentLoaded", WebDeveloper.Popup.load, false);

chrome.extension.onRequest.addListener(WebDeveloper.Popup.request);
