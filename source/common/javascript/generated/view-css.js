var WebDeveloper = WebDeveloper || {};

WebDeveloper.Generated = WebDeveloper.Generated || {};

// Initializes the page with data
WebDeveloper.Generated.initialize = function(data, locale)
{
	var contentDocument		 = null;
	var css								 = locale.css;
	var documents					 = data.documents;
	var embeddedCSSFrom		 = locale.embeddedCSSFrom;
	var errorMessage			 = "/* " + locale.couldNotLoadCSS + " */";
	var styleSheets				 = null;
	var styleSheetsCount	 = null;
	var styleSheetsCounter = 1;
	var url								 = null;

	WebDeveloper.Generated.emptyContent();
	WebDeveloper.Generated.localizeHeader(locale);
	WebDeveloper.Generated.setPageTitle(css, data, locale);
	$(".dropdown-toggle", $("#files-dropdown")).prepend(css);

	// Loop through the documents
	for(var i = 0, l = documents.length; i < l; i++)
	{
		contentDocument  = documents[i];
		styleSheets			 = contentDocument.styleSheets;
		styleSheetsCount = styleSheets.length;
		url							 = contentDocument.url;

		WebDeveloper.Generated.addDocument(url, i);

		// If there are embedded styles
		if(contentDocument.embedded)
		{
			WebDeveloper.Generated.output(contentDocument.embedded, embeddedCSSFrom + " " + url, null, "style-sheet-" + (styleSheetsCounter++), "css");
		}

		// Loop through the style sheets
		for(var j = 0; j < styleSheetsCount; j++)
		{
			url	= styleSheets[j];

			WebDeveloper.Generated.output(WebDeveloper.Common.getContentFromURL(url, errorMessage), null, url, "style-sheet-" + (styleSheetsCounter++), "css");
		}

		// If there are no style sheets
		if(!contentDocument.embedded && styleSheetsCount === 0)
		{
			WebDeveloper.Generated.addSeparator();
		}
	}

	WebDeveloper.Generated.initializeCommonElements();
	WebDeveloper.Generated.initializeSyntaxHighlight(data.theme);
};
