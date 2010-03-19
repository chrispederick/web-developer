var WebDeveloper = {};

WebDeveloper.Common = {};

// Adds a class to an element
WebDeveloper.Common.addClass = function(element, className)
{
	element.className = WebDeveloper.Common.trim(element.className + " " + className);
};

// Returns the document body element
WebDeveloper.Common.getDocumentBodyElement = function(contentDocument)
{
	// If there is a body element
	if(contentDocument.body)
	{
		return contentDocument.body;
	}
	else
	{
		var bodyElement = contentDocument.querySelector("body");

		// If there is a body element
		if(bodyElement)
		{
			return bodyElement;
		}
	}

	return contentDocument.documentElement;
};

// Returns the document head element
WebDeveloper.Common.getDocumentHeadElement = function(contentDocument)
{
	var headElement = contentDocument.querySelector("head");

	// If there is a head element
	if(headElement)
	{
		return headElement;
	}

	return contentDocument.documentElement;
};

// Returns all of the images in the document
WebDeveloper.Common.getDocumentImages = function(contentDocument)
{
	var uniqueImages = [];

	// If the content document is set
	if(contentDocument)
	{
		var backgroundImage = null;
		var computedStyle		= null;
		var cssURI					= CSSPrimitiveValue.CSS_URI;
		var documentURL			= contentDocument.documentURI;
		var image						= null;
		var images					= [];
		var node						= null;
		var treeWalker			= contentDocument.createTreeWalker(contentDocument, NodeFilter.SHOW_ELEMENT, null, false);

		// While the tree walker has more nodes
		while((node = treeWalker.nextNode()) !== null)
		{
			// If this is an image element
			if(node.tagName.toLowerCase() == "img")
			{
				images.push(node);
			}
			else if(node.tagName.toLowerCase() == "input" && node.src && node.type && node.type.toLowerCase() == "image")
			{
				image			= new Image();
				image.src = node.src;

				// If this is not a chrome image
				if(image.src.indexOf("chrome://") !== 0)
				{
					images.push(image);
				}
			}
			else if(node.tagName.toLowerCase() == "link" && node.href && node.href.indexOf("chrome://") !== 0 && node.rel && node.rel.indexOf("icon") != -1)
			{
				image			= new Image();
				image.src = node.href;

				images.push(image);
			}
			else
			{
				computedStyle = node.ownerDocument.defaultView.getComputedStyle(node, null);

				// If the computed style is set
				if(computedStyle)
				{
					backgroundImage = computedStyle.getPropertyCSSValue("background-image");

					// If this element has a background image and it is a URI
					if(backgroundImage && backgroundImage.primitiveType == cssURI)
					{
						image			= new Image();
						image.src = backgroundImage.getStringValue();

						// If this is not a chrome image
						if(image.src.indexOf("chrome://") !== 0)
						{
							images.push(image);
						}
					}
				}
			}
		}

		images.sort(WebDeveloper.Common.sortImages);

		// Loop through the images
		for(var i = 0, l = images.length; i < l; i++)
		{
			image = images[i];

			// If this is not the last image and the image is the same as the next image
			if(i + 1 < l && image.src == images[i + 1].src)
			{
				continue;
			}

			uniqueImages.push(image);
		}
	}

	return uniqueImages;
};

// Removes a class from an element
WebDeveloper.Common.removeClass = function(element, className)
{
	element.className = WebDeveloper.Common.trim(WebDeveloper.Common.removeSubstring(element.className, className));
};

// Removes all matching elements from a document
WebDeveloper.Common.removeMatchingElements = function(selector, contentDocument)
{
	var matchingElement	 = null;
	var matchingElements = contentDocument.querySelectorAll(selector);
	
	// Loop through the matching elements
	for(var i = 0, l = matchingElements.length; i < l; i++)
	{
		matchingElement = matchingElements[i];

		// If the matching element has a parent node
		if(matchingElement.parentNode)
		{
			matchingElement.parentNode.removeChild(matchingElement);
		}
	}
};

// Removes a style sheet from a document
WebDeveloper.Common.removeStyleSheet = function(id, contentDocument)
{
	var styleSheet = contentDocument.getElementById(id);
	
	// If the style sheet is in the document
	if(styleSheet)
	{
		// If the style sheet has a parent node
		if(styleSheet.parentNode)
		{
			styleSheet.parentNode.removeChild(styleSheet);
		}
	}
};

// Removes a substring from a string
WebDeveloper.Common.removeSubstring = function(string, substring)
{
	// If the string and substring are not empty
	if(string && substring)
	{
		var substringStart = string.indexOf(substring);

		// If the substring is found in the string
		if(substring && substringStart != -1)
		{
			return string.substring(0, substringStart) + string.substring(substringStart + substring.length, string.length);
		}

		return string;
	}

	return "";
};

// Sorts two images
WebDeveloper.Common.sortImages = function(imageOne, imageTwo)
{
	// If both images are set
	if(imageOne && imageTwo)
	{
		var imageOneSrc = imageOne.src;
		var imageTwoSrc = imageTwo.src;

		// If the images are equal
		if(imageOneSrc == imageTwoSrc)
		{
			return 0;
		}
		else if(imageOneSrc < imageTwoSrc)
		{
			return -1;
		}
	}

	return 1;
};

// Toggles a style sheet in a document
WebDeveloper.Common.toggleStyleSheet = function(url, id, contentDocument, insertFirst)
{
	var styleSheet = contentDocument.getElementById(id);
	
	// If the style sheet is already in the document
	if(styleSheet)
	{
		WebDeveloper.Common.removeStyleSheet(id, contentDocument);
	}
	else
	{
		var headElement = WebDeveloper.Common.getDocumentHeadElement(contentDocument);
		var firstChild	= headElement.firstChild;
		var linkElement = contentDocument.createElement("link");

		linkElement.setAttribute("href", chrome.extension.getURL(url));
		linkElement.setAttribute("id", id);
		linkElement.setAttribute("rel", "stylesheet");

		// If there is a first child
		if(insertFirst && firstChild)
		{
			 headElement.insertBefore(linkElement, firstChild);
		}
		else
		{
			 headElement.appendChild(linkElement);
		}
	}
};

// Trims a string
WebDeveloper.Common.trim = function(string)
{
	return string.replace(/^\s\s*/, "").replace(/\s\s*$/, "");
};
