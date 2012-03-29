var WebDeveloper = WebDeveloper || {};

WebDeveloper.Content = WebDeveloper.Content || {};

// Handles any content requests
WebDeveloper.Content.request = function(request, sender, sendResponse)
{
	// If the request type is to get anchors
	if(request.type == "get-anchors")
	{
		sendResponse(WebDeveloper.Content.getAnchors());
	}
	else if(request.type == "get-broken-images")
	{
		sendResponse(WebDeveloper.Content.getBrokenImages());
	}
	else if(request.type == "get-colors")
	{
		sendResponse(WebDeveloper.Content.getColors());
	}
	else if(request.type == "get-css")
	{
		sendResponse(WebDeveloper.Content.getCSS());
	}
	else if(request.type == "get-document-details")
	{
		sendResponse(WebDeveloper.Content.getDocumentDetails());
	}
	else if(request.type == "get-document-outline")
	{
		sendResponse(WebDeveloper.Content.getDocumentOutline());
	}
	else if(request.type == "get-duplicate-ids")
	{
		sendResponse(WebDeveloper.Content.getDuplicateIds());
	}
	else if(request.type == "get-forms")
	{
		sendResponse(WebDeveloper.Content.getForms());
	}
	else if(request.type == "get-images")
	{
		sendResponse(WebDeveloper.Content.getImages());
	}
	else if(request.type == "get-javascript")
	{
		sendResponse(WebDeveloper.Content.getJavaScript());
	}
	else if(request.type == "get-links")
	{
		sendResponse(WebDeveloper.Content.getLinks());
	}
	else if(request.type == "get-meta-tags")
	{
		sendResponse(WebDeveloper.Content.getMetaTags());
	}
	else if(request.type == "get-window-size")
	{
		sendResponse(WebDeveloper.Content.getWindowSize());
	}
	else
	{
		// Unknown request
		sendResponse({});
	}
};

chrome.extension.onRequest.addListener(WebDeveloper.Content.request);
