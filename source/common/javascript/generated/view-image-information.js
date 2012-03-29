var WebDeveloper = WebDeveloper || {};

WebDeveloper.Generated = WebDeveloper.Generated || {};

// Initializes the page with data
WebDeveloper.Generated.initialize = function(data, locale)
{
	var container					 = null;
	var content						 = $("#content");
	var contentDocument		 = null;
	var documents					 = data.documents;
	var image							 = null;
	var imageDescription	 = null;
	var images						 = null;
	var imagesCounter			 = 1;
	var imagesDescription  = locale.images;
	var imagesDropdown		 = $("#images-dropdown");
	var imagesDropdownMenu = $(".dropdown-menu", imagesDropdown);
	var imagesLength			 = null;
	var imageSrc					 = null;
	var list							 = null;
	var table							 = null;
	var tableBody					 = null;

	WebDeveloper.Generated.emptyContent();
	WebDeveloper.Generated.localizeHeader(locale);
	WebDeveloper.Generated.setPageTitle(imagesDescription, data, locale);

	$(".dropdown-toggle", imagesDropdown).prepend(imagesDescription);

	// Loop through the documents
	for(var i = 0, l = documents.length; i < l; i++)
	{
		contentDocument  = documents[i];
		imageDescription = imagesDescription.toLowerCase();
		images					 = contentDocument.images;
		imagesLength		 = images.length;

		// If there is only one image
		if(imagesLength == 1)
		{
			imageDescription = locale.image.toLowerCase();
		}

		WebDeveloper.Generated.addDocument(contentDocument.url, i, imageDescription, imagesLength);

		// If there are images
		if(imagesLength > 0)
		{
			container = WebDeveloper.Generated.generateDocumentContainer();

			// Loop through the images
			for(var j = 0; j < imagesLength; j++)
			{
				image			= images[j];
				imageSrc	= image.src;
				table			= $('<table class="table table-bordered table-striped"></table>');
				tableBody = $("<tbody></tbody>");

				table.append("<thead><tr><th>" + locale.property + "</th><th>" + locale.value + "</th></tr></thead>");
				tableBody.append("<tr><td>" + locale.src + '</td><td><a href="' + imageSrc + '" target="_blank">' + imageSrc + "</a></td></tr>");
				tableBody.append("<tr><td>" + locale.width + "</td><td>" + image.width + "</td></tr>");
				tableBody.append("<tr><td>" + locale.height + "</td><td>" + image.height + "</td></tr>");

				// If the image has an alt attribute
				if(image.alt)
				{
					tableBody.append("<tr><td>" + locale.alt + "</td><td>" + image.alt + "</td></tr>");
				}

				table.append(tableBody);
				container.append('<div id="image-' + imagesCounter + '" class="web-developer-image"><img src="' + imageSrc + '"></div>').append(table).append('<div class="web-developer-separator"></div>');
				content.append(container);
				imagesDropdownMenu.append('<li><a href="#image-' + imagesCounter + '">' + WebDeveloper.Generated.formatURL(imageSrc) + "</a></li>");

				imagesCounter++;
			}
		}
		else
		{
			WebDeveloper.Generated.addSeparator();
		}
	}

	WebDeveloper.Generated.initializeCommonElements();
};
