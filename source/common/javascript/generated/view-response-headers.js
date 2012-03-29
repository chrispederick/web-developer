var WebDeveloper = WebDeveloper || {};

WebDeveloper.Generated = WebDeveloper.Generated || {};

// Initializes the page with data
WebDeveloper.Generated.initialize = function(data, locale)
{
	var content			= $("#content");
	var documentURL	= data.pageURL;
	var headers			= null;
	var request			= null;

	WebDeveloper.Generated.emptyContent();
	WebDeveloper.Generated.localizeHeader(locale);
	WebDeveloper.Generated.setPageTitle(locale.responseHeaders, data, locale);

	// Try to get the response headers
	try
	{
		request = new XMLHttpRequest();

		request.open("get", documentURL, false);
		request.send(null);

		headers = request.getAllResponseHeaders();
	}
	catch(exception)
	{
		headers = locale.couldNotLoadResponseHeaders;
	}

	content.append('<h2><a href="' + documentURL + '">' + documentURL + "</a></h2>");
	content.append("<pre>" + headers + "\n" + request.status + " " + request.statusText + "</pre>");
};
