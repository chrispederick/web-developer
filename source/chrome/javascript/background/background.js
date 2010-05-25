var WebDeveloper = {};

WebDeveloper.Background                             = {};
WebDeveloper.Background.initializeGeneratedTabDelay = 250;

// Converts an RGB color into a hex color
WebDeveloper.Background.convertRGBToHex = function(rgb)
{
	var blue  = parseInt(rgb[2], 10).toString(16).toLowerCase();
	var green = parseInt(rgb[1], 10).toString(16).toLowerCase();
	var red   = parseInt(rgb[0], 10).toString(16).toLowerCase();

	// If the color is only 1 character
	if(blue.length == 1)
	{
		blue = "0" + blue;
	}

	// If the color is only 1 character
	if(green.length == 1)
	{
		green = "0" + green;
	}

	// If the color is only 1 character
	if(red.length == 1)
	{
		red = "0" + red;
	}

	return "#" + red + green + blue;
};

// Gets the current color
WebDeveloper.Background.getColor = function(x, y)
{
  chrome.tabs.captureVisibleTab(null, function(dataUrl) 
  {
    var image = new Image();
    
    image.src    = dataUrl;
    image.onload = function() 
    {
      var canvas  = document.createElement("canvas");
      var color   = null;
      var context = canvas.getContext("2d");
      
      canvas.height = image.naturalHeight;
      canvas.width  = image.naturalWidth;
      
      context.clearRect(0, 0, image.naturalWidth, image.naturalHeight);
      context.drawImage(image, 0, 0);
      
      color = WebDeveloper.Background.convertRGBToHex(context.getImageData(x, y, 1, 1).data);

      chrome.tabs.executeScript(null, { code: 'document.getElementById("web-developer-color-picker-color").style.backgroundColor = "' + color + ' !important"; document.getElementById("web-developer-color-picker-hex").innerHTML = "' + color + '";' });
    };
  });
	
	return {};
};

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
	// If the request type is to get the current color
	if(request.type == "get-color")
	{
	  sendResponse(WebDeveloper.Background.getColor(request.x, request.y));
	}
	else if(request.type == "get-content-from-urls")
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
