var WebDeveloper = WebDeveloper || {};

WebDeveloper.Generated = WebDeveloper.Generated || {};

// Initializes the page with data
WebDeveloper.Generated.initialize = function(data, locale)
{
	var container						 = null;
	var contentDocument			 = null;
	var documentOutline			 = locale.documentOutline;
	var documents						 = data.documents;
	var heading							 = null;
	var headingDescription	 = null;
	var headingLevel				 = null;
	var headings						 = null;
	var headingsLength			 = null;
	var previousHeadingLevel = null;

	WebDeveloper.Generated.emptyContent();
	WebDeveloper.Generated.localizeHeader(locale);
	WebDeveloper.Generated.setPageTitle(documentOutline, data, locale);

	// Loop through the documents
	for(var i = 0, l = documents.length; i < l; i++)
	{
		contentDocument		 = documents[i];
		headingDescription = locale.headings.toLowerCase();
		headings					 = contentDocument.headings;
		headingsLength		 = headings.length;

		// If there is only one heading
		if(headingsLength == 1)
		{
			headingDescription = locale.heading.toLowerCase();
		}

		WebDeveloper.Generated.addDocument(contentDocument.url, i, headingDescription, headingsLength);

		// If there are headings
		if(headingsLength > 0)
		{
			container						 = WebDeveloper.Generated.generateDocumentContainer();
			previousHeadingLevel = 0;

			// Loop through the headings
			for(var j = 0; j < headingsLength; j++)
			{
				heading			 = headings[j];
				headingLevel = heading.level;

				// Loop through any missing headers
				for(var k = previousHeadingLevel + 1; k < headingLevel; k++)
				{
					container.append("<h" + k + ' class="web-developer-missing-heading"><span class="label label-warning">&lt;h' + k + "&gt;</span>" + locale.missingHeading + "</h" + k + ">");
				}

				container.append("<h" + headingLevel + '><span class="label label-success">&lt;h' + headingLevel + "&gt;</span>" + heading.text + "</h" + k + ">");

				previousHeadingLevel = headingLevel;
			}

			$("#content").append(container);
		}

		WebDeveloper.Generated.addSeparator();
	}

	WebDeveloper.Generated.initializeCommonElements();
};
