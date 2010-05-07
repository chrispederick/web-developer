// Initializes the page with data
function initialize(data)
{
	var contentDocument		 = null;
	var documents					 = data.documents;
	var metaTagDescription = null;
	var metaTag						 = null;
	var metaTags           = null;
	var metaTagsLength     = null;
	var row								 = null;
	var table							 = null;
	var url								 = null;

	setPageTitle("Meta Tags", data);
	setWindowTitle("Meta Tags", data);
	
	// Loop through the documents
	for(var i = 0, l = documents.length; i < l; i++)
	{
		contentDocument    = documents[i];
		metaTagDescription = "meta tags";
		metaTags           = contentDocument.metaTags;
		metaTagsLength     = metaTags.length;
		url                = contentDocument.url;
	
		// If there is only one meta tag
		if(metaTagsLength == 1)
		{
			metaTagDescription = "meta tag";
		}

		$("#content").append('<h2><span></span><a href="' + url + '">' + url + "</a></h2>");
		$("#content").append('<h3 id="meta-tag-' + (i + 1) + '"><span></span>' + metaTagsLength + " " + metaTagDescription + "</h3>");
		$("#jump-to ul").append('<li><a href="#meta-tag-' + (i + 1) + '">' + formatURL(url) + "</a></li>");	

		// If there are meta tags
		if(metaTagsLength > 0)
		{
			table = $("<table></table>");

			$("#content").append(table);
			table.append("<tr><th>Name</th><th>Content</th></tr>");
				
			// Loop through the meta tags
			for(var j = 0; j < metaTagsLength; j++)
			{
				metaTag = metaTags[j];
				row     = $("<tr></tr>");

				row.append(createTableCell(metaTag.name));
				row.append(createTableCell(metaTag.content));
				
				table.append(row);
			}
		}

		$("#content").append('<div class="separator"></div>');
	}
	
	initializeCommonElements();
}
