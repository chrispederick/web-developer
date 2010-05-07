// Initializes the page with data
function initialize(data)
{
	var contentDocument    = null;
	var documents          = data.documents;
	var embeddedCounter    = 1;
	var request            = null;
	var styleSheets        = null;
	var styleSheetsCounter = 1;
	var url                = null;

	setPageTitle("CSS", data);
	setWindowTitle("CSS", data);
	
	// Loop through the documents
	for(var i = 0, l = documents.length; i < l; i++)
	{
		contentDocument = documents[i];
		styleSheets     = contentDocument.styleSheets;
		url             = contentDocument.url;
	
		$("#content").append('<h2><span></span><a href="' + url + '">' + url + "</a></h2>");

		// If there are embedded styles
		if(contentDocument.embedded)
		{
			output(contentDocument.embedded, "Embedded CSS from " + url, null, "Embedded CSS from " + url, "embedded-" + (embeddedCounter++));
		}
	
		// Loop through the style sheets
		for(var j = 0, m = styleSheets.length; j < m; j++)
		{
	    request = new XMLHttpRequest();
			url     = styleSheets[j];
	
	    request.open("get", url, false);
	    request.send(null);
	    
			output($.trim(request.responseText), url, url, formatURL(url), "style-sheet-" + (styleSheetsCounter++));
		}
	}

	initializeCommonElements();
}
