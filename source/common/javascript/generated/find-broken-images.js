// Initializes the page with data
function initialize(data)
{
	var contentDocument  = null;
	var documents        = data.documents;
	var imageDescription = null;
	var images           = null;
	var imagesLength     = null;
	var list             = null;
	var url              = null;

	setPageTitle("Broken Images", data);
	setWindowTitle("Broken Images", data);
	
	// Loop through the documents
	for(var i = 0, l = documents.length; i < l; i++)
	{
		contentDocument  = documents[i];
		imageDescription = "broken images";
		images           = contentDocument.images;
		imagesLength     = images.length;
		url              = contentDocument.url;
		
		// If there is only one image
		if(imagesLength == 1)
		{
			imageDescription = "broken image";
		}
	
		$("#content").append('<h2><span></span><a href="' + url + '">' + url + "</a></h2>");
		$("#jump-to ul").append('<li><a href="#image-' + (i + 1) + '">' + formatURL(url) + "</a></li>");
		$("#content").append('<h3 id="image-' + (i + 1) + '"><span></span>' + imagesLength + " " + imageDescription + "</h3>");

		// If there are broken images
		if(imagesLength > 0)
		{
			list = $("<ol></ol>");

			$("#content").append(list);

			// Loop through the images
			for(var j = 0; j < imagesLength; j++)
			{
				url = images[j];
			
				list.append('<li><a href="' + url + '">' + url + "</a></li>");
			}
		}
		
		$("#content").append('<div class="separator"></div>');
	}
	
	initializeCommonElements();
}
