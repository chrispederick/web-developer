var WebDeveloper = WebDeveloper || {};

WebDeveloper.Images = WebDeveloper.Images || {};

// Displays the file sizes for all images
WebDeveloper.Images.displayImageFileSizes = function(display, documents)
{
	var bytes						= WebDeveloper.Locales.getString("bytes");
	var contentDocument = null;
	var image						= null;
	var images					= null;
	var kilobytes				= WebDeveloper.Locales.getString("kilobytes");
	var spanElement			= null;
	var text						= null;

	// Loop through the documents
	for(var i = 0, l = documents.length; i < l; i++)
	{
		contentDocument = documents[i];

		WebDeveloper.Common.removeMatchingElements("span.web-developer-display-image-file-sizes", contentDocument);

		// If displaying the file sizes
		if(display)
		{
			images = contentDocument.images;

			// Loop through the images
			for(var j = 0, m = images.length; j < m; j++)
			{
				image	= images[j];
				text	= WebDeveloper.Common.formatFileSize(WebDeveloper.Common.getFileSize(image.src), bytes, kilobytes);

				// If the text is set
				if(text)
				{
					spanElement = contentDocument.createElement("span");

					spanElement.setAttribute("class", "web-developer-display-image-file-sizes");
					spanElement.appendChild(contentDocument.createTextNode(text));
					image.parentNode.insertBefore(spanElement, image);
				}
			}
		}

		WebDeveloper.Common.toggleStyleSheet("features/style-sheets/before.css", "web-developer-display-image-file-sizes", contentDocument, false);
	}
};
