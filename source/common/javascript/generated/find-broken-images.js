var WebDeveloper = WebDeveloper || {};

WebDeveloper.Generated = WebDeveloper.Generated || {};

// Initializes the page with data
WebDeveloper.Generated.initialize = function(data, locale)
{
	var brokenImages		 = locale.brokenImages;
	var contentDocument  = null;
	var documents				 = data.documents;
	var imageDescription = null;
	var imagesLength		 = null;
	var list						 = null;

	WebDeveloper.Generated.emptyContent();
	WebDeveloper.Generated.localizeHeader(locale);
	WebDeveloper.Generated.setPageTitle(brokenImages, data, locale);

	// Loop through the documents
	for(var i = 0, l = documents.length; i < l; i++)
	{
		contentDocument  = documents[i];
		imageDescription = brokenImages.toLowerCase();
		imagesLength		 = contentDocument.images.length;

		// If there is only one image
		if(imagesLength == 1)
		{
			imageDescription = locale.brokenImage;
		}

		WebDeveloper.Generated.addDocument(contentDocument.url, i, imageDescription, imagesLength);

		// If there are broken images
		if(imagesLength > 0)
		{
			list = $("<ol></ol>");

			list.append(ich.broken_images(contentDocument));
			$("#content").append(list);
		}

		WebDeveloper.Generated.addSeparator();
	}

	WebDeveloper.Generated.initializeCommonElements();
};
