var WebDeveloper = WebDeveloper || {};

WebDeveloper.Common = WebDeveloper.Common || {};

// Returns a chrome URL
WebDeveloper.Common.getChromeURL = function(url)
{
	return chrome.extension.getURL(url);
};

// Returns the current content document
WebDeveloper.Common.getContentDocument = function()
{
	return document;
};

// Gets the content from a URL
WebDeveloper.Common.getContentFromURL = function(url, errorMessage)
{
	var content = null;

	// Try to load the URL
	try
	{
		var request = new XMLHttpRequest();

		request.open("get", url, false);
		request.send(null);

		content = request.responseText;
	}
	catch(exception)
	{
		content = errorMessage;
	}

	return content;
};

// Returns the current content window
WebDeveloper.Common.getContentWindow = function()
{
	return window;
};

// Returns a CSS property
WebDeveloper.Common.getCSSProperty = function(property)
{
	return property;
};
