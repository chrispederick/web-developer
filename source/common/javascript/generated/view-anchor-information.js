// Initializes the page with data
function initialize(data)
{
	var anchor            = null;
	var anchorDescription = null;
	var anchors           = null;
	var anchorsLength     = null;
	var contentDocument   = null;
	var documents         = data.documents;
	var list              = null;
	var url               = null;

	setPageTitle("Anchor Information", data);
	setWindowTitle("Anchor Information", data);
	
	// Loop through the documents
	for(var i = 0, l = documents.length; i < l; i++)
	{
		anchorDescription = "anchors";
		contentDocument   = documents[i];
		anchors           = contentDocument.anchors;
		anchorsLength     = anchors.length;
		url               = contentDocument.url;
		
		// If there is only one anchor
		if(anchorsLength == 1)
		{
			anchorDescription = "anchor";
		}
	
		$("#content").append('<h2><span></span><a href="' + url + '">' + url + "</a></h2>");
		$("#content").append('<h3 id="image-' + (i + 1) + '"><span></span>' + anchorsLength + " " + anchorDescription + "</h3>");
		$("#jump-to ul").append('<li><a href="#image-' + (i + 1) + '">' + formatURL(url) + "</a></li>");

		// If there are anchors
		if(anchorsLength > 0)
		{
			list = $("<ol></ol>");

			$("#content").append(list);

			// Loop through the anchors
			for(var j = 0; j < anchorsLength; j++)
			{
				anchor = anchors[j];
			
				list.append('<li><a href="' + url + "#" + anchor + '">#' + anchor + "</a></li>");
			}
		}
		
		$("#content").append('<div class="separator"></div>');
	}
	
	initializeCommonElements();
}
