var WebDeveloper = {};

WebDeveloper.Background = {};

// Gets the content from a set of URLs
WebDeveloper.Background.getContentFromURLs = function(urls)
{
	var content = "";
	var request = null;
	
	// Loop through the urls
	for(var i = 0, l = urls.length; i < l; i++)
	{
    request = new XMLHttpRequest();

    request.open("get", urls[i], false);
    request.send(null);
    
		content += request.responseText;
	}

	return {content: content};
};
	
// Handles any background requests	
WebDeveloper.Background.request = function(request, sender, sendResponse) 
{
	// If the request type is to get the content from a set of URLs
	if(request.type == "get-content-from-urls")
	{
	  sendResponse(WebDeveloper.Background.getContentFromURLs(request.urls));
	}
};	

chrome.extension.onRequest.addListener(WebDeveloper.Background.request);
