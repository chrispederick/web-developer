// Initializes the page with data
function initialize(data)
{
	var container				 = null;
	var contentDocument  = null;
	var documents        = data.documents;
	var image            = null;
	var imageDescription = null;
	var images           = null;
	var imagesLength     = null;
	var imageSrc         = null;
	var list             = null;
	var table            = null;
	var url							 = null;

	setPageTitle("Images", data);
	setWindowTitle("Images", data);
	
	// Loop through the documents
	for(var i = 0, l = documents.length; i < l; i++)
	{
		contentDocument  = documents[i];
		imageDescription = "images";
		images           = contentDocument.images;
		imagesLength     = images.length;
		url              = contentDocument.url;
		
		// If there is only one image
		if(imagesLength == 1)
		{
			imageDescription = "image";
		}

		$("#content").append('<h2><span></span><a href="' + url + '">' + url + "</a></h2>");
		$("#content").append('<h3 id="image-' + (i + 1) + '"><span></span>' + imagesLength + " " + imageDescription + "</h3>");
		$("#jump-to ul").append('<li><a href="#image-' + (i + 1) + '">' + formatURL(url) + "</a></li>");	

		// If there are images
		if(imagesLength > 0)
		{
			container = $("<div></div>");
			
			$("#content").append(container);
		
			// Loop through the images
			for(var j = 0; j < imagesLength; j++)
			{
				image    = images[j];
				imageSrc = image.src;
				table    = $("<table></table>");
			
				table.append('<tr><th>Src</th><td><a href="' + imageSrc + '">' + imageSrc + '</a></td></tr>');
				table.append('<tr><th>Width</th><td>' + image.width + '</td></tr>');
				table.append('<tr><th>Height</th><td>' + image.height + '</td></tr>');
			
				// If the image has an alt attribute
				if(image.alt)
				{
					table.append('<tr><th>Alt</th><td>' + image.alt + '</td></tr>');
				}
			
				container.append('<img src="' + imageSrc + '">');
				container.append(table);
				container.append('<div class="separator"></div>');
			}
		}
		else
		{
			$("#content").append('<div class="separator"></div>');
		}
	}
	
	initializeCommonElements();
}
