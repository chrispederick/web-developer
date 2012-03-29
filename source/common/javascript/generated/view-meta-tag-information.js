var WebDeveloper = WebDeveloper || {};

WebDeveloper.Generated = WebDeveloper.Generated || {};

// Initializes the page with data
WebDeveloper.Generated.initialize = function(data, locale)
{
	var contentDocument			= null;
	var documents						= data.documents;
	var metaTagDescription	= null;
	var metaTagsDescription = locale.metaTags;
	var metaTagsLength			= null;
	var table								= null;
	var tableBody						= null;

	WebDeveloper.Generated.emptyContent();
	WebDeveloper.Generated.localizeHeader(locale);
	WebDeveloper.Generated.setPageTitle(metaTagsDescription, data, locale);

	// Loop through the documents
	for(var i = 0, l = documents.length; i < l; i++)
	{
		contentDocument		 = documents[i];
		metaTagDescription = metaTagsDescription.toLowerCase();
		metaTagsLength		 = contentDocument.metaTags.length;

		// If there is only one meta tag
		if(metaTagsLength == 1)
		{
			metaTagDescription = locale.metaTag;
		}

		WebDeveloper.Generated.addDocument(contentDocument.url, i, metaTagDescription, metaTagsLength);

		// If there are meta tags
		if(metaTagsLength > 0)
		{
			table			= $('<table class="table table-bordered table-striped"></table>');
			tableBody = $("<tbody></tbody>");

			table.append("<thead><tr><th>" + locale.name + "</th><th>" + locale.content + "</th></tr></thead>");
			tableBody.append(ich.meta_tags(contentDocument));
			table.append(tableBody);
			$("#content").append(table);
		}

		WebDeveloper.Generated.addSeparator();
	}

	WebDeveloper.Generated.initializeCommonElements();
};
