// Initializes the page with data
function initialize(data)
{
	var contentDocument = null;
	var documents       = data.documents;
	var linkDescription = null;
	var links           = null;
	var linksLength     = null;
	var list            = null;
	var url             = null;

	setPageTitle("Link Information", data);
	setWindowTitle("Link Information", data);
	
	// Loop through the documents
	for(var i = 0, l = documents.length; i < l; i++)
	{
		contentDocument = documents[i];
		linkDescription = "links";
		links           = contentDocument.links;
		linksLength     = links.length;
		url             = contentDocument.url;
		
		// If there is only one link
		if(linksLength == 1)
		{
			linkDescription = "link";
		}
	
		$("#content").append('<h2><span></span><a href="' + url + '">' + url + "</a></h2>");
		$("#jump-to ul").append('<li><a href="#image-' + (i + 1) + '">' + formatURL(url) + "</a></li>");
		$("#content").append('<h3 id="image-' + (i + 1) + '"><span></span>' + linksLength + " " + linkDescription + "</h3>");

		// If there are links
		if(linksLength > 0)
		{
			list = $("<ol></ol>");

			$("#content").append(list);

			// Loop through the links
			for(var j = 0; j < linksLength; j++)
			{
				url = links[j];
			
				list.append('<li><a href="' + url + '">' + url + "</a></li>");
			}
		}
		
		$("#content").append('<div class="separator"></div>');
	}
	
	initializeCommonElements();
}
