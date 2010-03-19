// Initializes the page with data
function initialize(data)
{
	var contentDocument   = null;
	var documents         = data.documents;
	var embedded          = null;
	var embeddedCounter   = 1;
	var javaScript        = null;
	var javaScriptCounter = 1;
	var request           = null;
	var url               = null;

	setPageTitle("JavaScript", data);
	setWindowTitle("JavaScript", data);
	
	// Loop through the documents
	for(var i = 0, l = documents.length; i < l; i++)
	{
		contentDocument = documents[i];
		javaScript      = contentDocument.javaScript;
		url             = contentDocument.url;
	
		$("#content").append('<h2><span></span><a href="' + url + '">' + url + "</a></h2>");

		// If there are embedded JavaScript
		if(contentDocument.embedded)
		{
			output(contentDocument.embedded, "Embedded JavaScript from " + url, null, "Embedded JavaScript from " + url, "embedded-" + (embeddedCounter++));
		}

		// Loop through the JavaScript
		for(var j = 0, m = javaScript.length; j < m; j++)
		{
	    request = new XMLHttpRequest();
			url     = javaScript[j];
	
	    request.open("get", url, false);
	    request.send(null);
	    
			output($.trim(request.responseText), url, url, formatURL(url), "javascript-" + (javaScriptCounter++));
		}
	}

	initializeCommonElements();
}
