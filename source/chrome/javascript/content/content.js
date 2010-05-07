WebDeveloper.Content = WebDeveloper.Content || {};

// Validates the CSS of the local page
WebDeveloper.Content.validateLocalCSS = function()
{
	var contentDocument = null;
	var css							= "";
	var documentCSS			= WebDeveloper.Content.getCSS();
	var documents				= documentCSS.documents;
	var styleSheets			= [];

	// Loop through the documents
	for(var i = 0, l = documents.length; i < l; i++)
	{
		contentDocument = documents[i];
		styleSheets			= styleSheets.concat(contentDocument.styleSheets);

		// If there are embedded styles
		if(contentDocument.embedded)
		{
			css += contentDocument.embedded;
		}
	}

	chrome.extension.sendRequest({type: "get-content-from-urls", urls: styleSheets}, function(response) 
	{
		var body	= WebDeveloper.Common.getDocumentBodyElement(document);
		var form	= document.createElement("form");
		var input = document.createElement("input");

		// Loop through the style sheets
		for(i = 0, l = response.length; i < l; i++)
		{
			css += response[i].content;
		}
		 
		form.action	= "http://jigsaw.w3.org/css-validator/validator";
		form.enctype = "multipart/form-data";
		form.method	= "post";
		form.target	= "_blank";
		
		input.name	= "text";
		input.value = css;
		 
		form.appendChild(input);

		input				= document.createElement("input");		 
		input.name	= "profile";
		input.value = "css3";
		 
		form.appendChild(input);

		input				= document.createElement("input");		 
		input.name	= "warning";
		input.value = "2";
		 
		form.appendChild(input);
		 
		body.appendChild(form);
		form.submit();
		body.removeChild(form);	
	});

	return {};
};

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
	else if(request.type == "validate-local-css")
	{
		sendResponse(WebDeveloper.Content.validateLocalCSS());
	}
	else if(request.type == "validate-local-html")
	{
		sendResponse(WebDeveloper.Content.validateLocalHTML());
	}
	else
	{
		// Unknown request	
		sendResponse({});
	}
};

chrome.extension.onRequest.addListener(WebDeveloper.Content.request);
