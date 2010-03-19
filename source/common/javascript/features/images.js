WebDeveloper.Images = WebDeveloper.Images || {};

// Displays alt attributes for all images
WebDeveloper.Images.displayAltAttributes = function(display, contentDocument)
{
	var altAttribute = null;
	var image				 = null;
	var images			 = contentDocument.querySelectorAll("img[alt]");
	var spanElement	 = null;
	var text				 = null;

	WebDeveloper.Common.removeMatchingElements("span.web-developer-display-alt-attributes", contentDocument);

	// If displaying the alt attributes
	if(display)
	{
		// Loop through the images
		for(var i = 0, l = images.length; i < l; i++)
		{
			image				= images[i];
			spanElement = contentDocument.createElement("span");
			text				= 'alt="' + image.getAttribute("alt") + '"';

			spanElement.setAttribute("class", "web-developer-display-alt-attributes");
			spanElement.appendChild(contentDocument.createTextNode(text));
			image.parentNode.insertBefore(spanElement, image);
		}
	}

	WebDeveloper.Common.toggleStyleSheet("features/style-sheets/before.css", "web-developer-display-alt-attributes", contentDocument, false);
};

// Displays the dimensions for all images
WebDeveloper.Images.displayImageDimensions = function(display, contentDocument)
{
	var height			= null;
	var image				= null;
	var images			= contentDocument.images;
	var spanElement = null;
	var text				= null;
	var width				= null;

	WebDeveloper.Common.removeMatchingElements("span.web-developer-display-image-dimensions", contentDocument);

	// If displaying the alt attributes
	if(display)
	{
		// Loop through the images
		for(var i = 0, l = images.length; i < l; i++)
		{
			image	 = images[i];
			height = image.height;
			text	 = null;
			width	 = image.width;

			// If the width and height are set
			if(width && height)
			{
				text = "Width = " + width + "px Height = " + height + "px";
			}
			else if(width)
			{
				text = "Width = " + width + "px";
			}
			else if(height)
			{
				text = "Height = " + height + "px";
			}

			// If the text is set
			if(text)
			{
				spanElement = contentDocument.createElement("span");

				spanElement.setAttribute("class", "web-developer-display-image-dimensions");
				spanElement.appendChild(contentDocument.createTextNode(text));
				image.parentNode.insertBefore(spanElement, image);
			}
		}
	}

	WebDeveloper.Common.toggleStyleSheet("features/style-sheets/before.css", "web-developer-display-image-dimensions", contentDocument, false);
};

// Displays the paths for all images
WebDeveloper.Images.displayImagePaths = function(display, contentDocument)
{
	WebDeveloper.Common.removeMatchingElements("span.web-developer-display-image-paths", contentDocument);

	// If displaying the alt attributes
	if(display)
	{
		var image				= null;
		var images			= contentDocument.images;
		var imageSrc		= null;
		var linkElement	= null;
		var spanElement = null;
		var text				= null;
	
		// Loop through the images
		for(var i = 0, l = images.length; i < l; i++)
		{
			image				= images[i];
			imageSrc		= image.src;
			linkElement	= contentDocument.createElement("a");
			spanElement = contentDocument.createElement("span");

			linkElement.setAttribute("href", imageSrc);
			linkElement.appendChild(contentDocument.createTextNode('src="' + imageSrc + '"'));

			spanElement.setAttribute("class", "web-developer-display-image-paths");
			spanElement.appendChild(linkElement);
			image.parentNode.insertBefore(spanElement, image);
		}
	}

	WebDeveloper.Common.toggleStyleSheet("features/style-sheets/before.css", "web-developer-display-image-paths", contentDocument, false);
};

// Makes all images full size
WebDeveloper.Images.makeImagesFullSize = function(contentDocument)
{
	var alteredImages = 0;
	var image					= null;
	var images				= contentDocument.images;
	var message				= null;
	var naturalHeight = null;
	var naturalWidth	= null;

	// Loop through the images
	for(var i = 0, l = images.length; i < l; i++)
	{
		image					= images[i];
		naturalHeight = image.naturalHeight;
		naturalWidth	= image.naturalWidth;

		// If the height or width is not the full size
		if((naturalHeight && image.height != naturalHeight) || (naturalWidth && image.width != naturalWidth))
		{
			image.height = image.naturalHeight;
			image.width	= image.naturalWidth;

			 alteredImages++;
		}
	}

	// If one image was made full size
	if(alteredImages == 1)
	{
		message = "1 image made full size";
	}
	else
	{
		message = alteredImages + " images made full size";
	}

	WebDeveloper.Images.showNotification(message);
};

// Makes all images invisible
WebDeveloper.Images.makeImagesInvisible = function(invisible, contentDocument)
{
	var image				= null;
	var imageInput	= null;
	var imageInputs = contentDocument.querySelectorAll("input[type=image], input[web-developer-make-images-invisible]");
	var images			= contentDocument.images;

	// Loop through the image input tags
	for(var i = 0, l = imageInputs.length; i < l; i++)
	{
		imageInput = imageInputs[i];

		// If making images invisible
		if(invisible)
		{
			imageInput.setAttribute("web-developer-make-images-invisible", true);
			imageInput.setAttribute("type", "submit");
		}
		else if(imageInput.hasAttribute("web-developer-make-images-invisible"))
		{
			imageInput.removeAttribute("web-developer-make-images-invisible");
			imageInput.setAttribute("type", "image");
		}
	}

	// Loop through the images
	for(i = 0, l = images.length; i < l; i++)
	{
		image = images[i];

		// If making images invisible
		if(invisible)
		{
			// If the image width is not set and the image is not broken
			if(!image.hasAttribute("width") && image.naturalWidth)
			{
				image.setAttribute("width", image.naturalWidth);
			}

			// If the image height is not set and the image is not broken
			if(!image.hasAttribute("height") && image.naturalHeight)
			{
				image.setAttribute("height", image.naturalHeight);
			}

			image.setAttribute("web-developer-make-images-invisible", image.getAttribute("src"));
			image.setAttribute("src", chrome.extension.getURL("style-sheets/images/transparent.png"));
		}
		else
		{
			image.setAttribute("src", image.getAttribute("web-developer-make-images-invisible"));
			image.removeAttribute("web-developer-make-images-invisible");
		}
	}

	WebDeveloper.Common.toggleStyleSheet("features/style-sheets/images/make-images-invisible.css", "web-developer-make-images-invisible", contentDocument, false);
};

// Outlines all images
WebDeveloper.Images.outlineAllImages = function(contentDocument)
{
	WebDeveloper.Common.toggleStyleSheet("features/style-sheets/images/outline-all-images.css", "web-developer-outline-all-images", contentDocument, false);
};

// Outlines all background images
WebDeveloper.Images.outlineBackgroundImages = function(outline, contentDocument)
{
	// If outlining background images
	if(outline)
	{
		 var backgroundImage = null;
		 var cssURI					 = CSSPrimitiveValue.CSS_URI;
		 var node						 = null;
		 var treeWalker			 = contentDocument.createTreeWalker(WebDeveloper.Common.getDocumentBodyElement(contentDocument), NodeFilter.SHOW_ELEMENT, null, false);

		 // While the tree walker has more nodes
		 while((node = treeWalker.nextNode()) !== null)
		 {
			 backgroundImage = node.ownerDocument.defaultView.getComputedStyle(node, null).getPropertyCSSValue("background-image");
	
			 // If this element has a background image and it is a URL
			 if(backgroundImage && backgroundImage.primitiveType == cssURI)
			 {
				WebDeveloper.Common.addClass(node, "web-developer-outline-background-images");
			 }
		 }
	}
	else
	{
		 var backgroundImages = contentDocument.querySelectorAll(".web-developer-outline-background-images");
	
		 // Loop through the background images
		 for(var i = 0, l = backgroundImages.length; i < l; i++)
		 {
			WebDeveloper.Common.removeClass(backgroundImages[i], "web-developer-outline-background-images");
		 }
	}

	WebDeveloper.Common.toggleStyleSheet("features/style-sheets/images/outline-background-images.css", "web-developer-outline-background-images", contentDocument, false);
};

// Outlines all images with adjusted dimensions
WebDeveloper.Images.outlineImagesWithAdjustedDimensions = function(outline, contentDocument)
{
	var i = 0;
	var l = 0;

	// If outlining images with adjusted dimensions
	if(outline)
	{
		var image				  = null;
		var images				= contentDocument.images;
		var naturalHeight = null;
		var naturalWidth	= null;
	
		// Loop through the images
		for(i = 0, l = images.length; i < l; i++)
		{
			image				  = images[i];
			naturalHeight = image.naturalHeight;
			naturalWidth	= image.naturalWidth;
	
			// If the height or width has been adjusted
			if((naturalHeight && image.height != naturalHeight) || (naturalWidth && image.width != naturalWidth))
			{
				WebDeveloper.Common.addClass(image, "web-developer-outline-images-with-adjusted-dimensions");
			}
		}
	}
	else
	{
		var imagesWithAdjustedDimensions = contentDocument.querySelectorAll(".web-developer-outline-images-with-adjusted-dimensions");
	
		// Loop through the images with adjusted dimensions
		for(i = 0, l = imagesWithAdjustedDimensions.length; i < l; i++)
		{
			WebDeveloper.Common.removeClass(imagesWithAdjustedDimensions[i], "web-developer-outline-images-with-adjusted-dimensions");
		}
	}

	WebDeveloper.Common.toggleStyleSheet("features/style-sheets/images/outline-images-with-adjusted-dimensions.css", "web-developer-outline-images-with-adjusted-dimensions", contentDocument, false);
};

// Outlines all images with empty alt attributes
WebDeveloper.Images.outlineImagesWithEmptyAltAttributes = function(contentDocument)
{
	WebDeveloper.Common.toggleStyleSheet("features/style-sheets/images/outline-images-with-empty-alt-attributes.css", "web-developer-outline-images-with-empty-alt-attributes", contentDocument, false);
};

// Outlines all images with oversized dimensions
WebDeveloper.Images.outlineImagesWithOversizedDimensions = function(outline, contentDocument)
{
	var i = 0;
	var l = 0;

	// If outlining images with oversized dimensions
	if(outline)
	{
		var image				  = null;
		var images				= contentDocument.images;
		var naturalHeight = null;
		var naturalWidth	= null;
	
		// Loop through the images
		for(i = 0, l = images.length; i < l; i++)
		{
			image				  = images[i];
			naturalHeight = image.naturalHeight;
			naturalWidth	= image.naturalWidth;
	
			// If the height or width has been oversized
			if((naturalHeight && image.height > naturalHeight) || (naturalWidth && image.width > naturalWidth))
			{
				WebDeveloper.Common.addClass(image, "web-developer-outline-images-with-oversized-dimensions");
			}
		}
	}
	else
	{
		var imagesWithOversizedDimensions = contentDocument.querySelectorAll(".web-developer-outline-images-with-oversized-dimensions");
	
		// Loop through the images with oversized dimensions
		for(i = 0, l = imagesWithOversizedDimensions.length; i < l; i++)
		{
			WebDeveloper.Common.removeClass(imagesWithOversizedDimensions[i], "web-developer-outline-images-with-oversized-dimensions");
		}
	}

	WebDeveloper.Common.toggleStyleSheet("features/style-sheets/images/outline-images-with-oversized-dimensions.css", "web-developer-outline-images-with-oversized-dimensions", contentDocument, false);
};

// Outlines all images without alt attributes
WebDeveloper.Images.outlineImagesWithoutAltAttributes = function(contentDocument)
{
	WebDeveloper.Common.toggleStyleSheet("features/style-sheets/images/outline-images-without-alt-attributes.css", "web-developer-outline-images-without-alt-attributes", contentDocument, false);
};

// Outlines all images without dimensions
WebDeveloper.Images.outlineImagesWithoutDimensions = function(contentDocument)
{
	WebDeveloper.Common.toggleStyleSheet("features/style-sheets/images/outline-images-without-dimensions.css", "web-developer-outline-images-without-dimensions", contentDocument, false);
};

// Replaces all images with alt attributes
WebDeveloper.Images.replaceImagesWithAltAttributes = function(replace, contentDocument)
{
	var image				= null;
	var images			= contentDocument.images;
	var spanElement = null;
	var text				= null;

	WebDeveloper.Common.removeMatchingElements("span.web-developer-replace-images-with-alt-attributes", contentDocument);

	// If replacing the images
	if(replace)
	{
		// Loop through the images
		for(var i = 0, l = images.length; i < l; i++)
		{
			image				= images[i];
			spanElement = contentDocument.createElement("span");
			text				= image.getAttribute("alt");

			spanElement.setAttribute("class", "web-developer-replace-images-with-alt-attributes");
			spanElement.appendChild(contentDocument.createTextNode(text));
			image.parentNode.insertBefore(spanElement, image);
		}
	}

	WebDeveloper.Common.toggleStyleSheet("features/style-sheets/before.css", "web-developer-replace-images-with-alt-attributes-before", contentDocument, false);
	WebDeveloper.Common.toggleStyleSheet("features/style-sheets/images/hide-images.css", "web-developer-replace-images-with-alt-attributes", contentDocument, false);
};

// Toggles the background images in a document
WebDeveloper.Images.toggleBackgroundImages = function(contentDocument)
{
	WebDeveloper.Common.toggleStyleSheet("features/style-sheets/images/hide-background-images.css", "web-developer-hide-background-images", contentDocument, false);
};

// Hides/shows all the images
WebDeveloper.Images.toggleImages = function(hide, contentDocument)
{
	var inputElement	= null;
	var inputElements = contentDocument.querySelectorAll("input");

	// Loop through all the input tags
	for(var i = 0, l = inputElements.length; i < l; i++)
	{
		inputElement = inputElements[i];

		// If hiding images and the input element is of type image
		if(hide && inputElement.hasAttribute("type") && inputElement.getAttribute("type").toLowerCase() == "image")
		{
			inputElement.setAttribute("web-developer-hide-images", true);
			inputElement.setAttribute("type", "submit");
		}
		else if(inputElement.hasAttribute("web-developer-hide-images"))
		{
			inputElement.removeAttribute("web-developer-hide-images");
			inputElement.setAttribute("type", "image");
		}
	}

	WebDeveloper.Common.toggleStyleSheet("features/style-sheets/images/hide-images.css", "web-developer-hide-images", contentDocument, false);
};
