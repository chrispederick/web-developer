var WebDeveloper = {};

WebDeveloper.Background                             = {};
WebDeveloper.Background.initializeGeneratedTabDelay = 250;

// Gets the content from a set of URLs
WebDeveloper.Background.getContentFromURLs = function(urls)
{
	var contentFromURLs = [];
	var contentURL			= null;
	var request         = null;
	
	// Loop through the urls
	for(var i = 0, l = urls.length; i < l; i++)
	{
    contentURL = urls[i];
		request		 = new XMLHttpRequest();

    request.open("get", contentURL, false);
    request.send(null);
    
		contentFromURLs.push({ url: contentURL, content: request.responseText });
	}

	return contentFromURLs;
};

// Initializes a generated tab
WebDeveloper.Background.initializeGeneratedTab = function(url, data)
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

			extensionTab.initialize(data);
		}
	}
};

// Opens a generated tab
WebDeveloper.Background.openGeneratedTab = function(tabURL, tabIndex, data, featureItem)
{
	chrome.tabs.create({ index: tabIndex + 1, url: tabURL }, function(openedTab)
	{
		// Initialize the tab on a delay to make sure the tab is open
		window.setTimeout(function() { WebDeveloper.Background.initializeGeneratedTab(tabURL, data); }, WebDeveloper.Background.initializeGeneratedTabDelay);

		WebDeveloper.Analytics.trackFeature(featureItem);
	});
};
	
// Handles any background requests	
WebDeveloper.Background.request = function(request, sender, sendResponse) 
{
	// If the request type is to get the content from a set of URLs
	if(request.type == "get-content-from-urls")
	{
	  sendResponse(WebDeveloper.Background.getContentFromURLs(request.urls));
	}
	else
	{
		// Unknown request	
		sendResponse({});
	}
};	

chrome.extension.onRequest.addListener(WebDeveloper.Background.request);
