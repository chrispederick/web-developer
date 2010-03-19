WebDeveloper.Content = {};

// Returns any anchors in the document
WebDeveloper.Content.getAnchors = function()
{
	var anchor						 = null;
	var anchors						 = {};
	var contentDocument		 = null;
	var contentDocuments	 = WebDeveloper.Content.getDocuments(document.defaultView);
	var documentAllAnchors = null;
	var documentAnchors		 = null;
	var nonUniqueAnchors	 = null;
	
	anchors.documents = [];
	anchors.pageTitle = document.title;
	anchors.pageURL	  = document.documentURI;

	// Loop through the documents
	for(var i = 0, l = contentDocuments.length; i < l; i++)
	{
		contentDocument				  = contentDocuments[i];
		documentAllAnchors			= contentDocument.querySelectorAll("[id]");
		documentAnchors					= {};
		documentAnchors.anchors = [];
		documentAnchors.url		  = contentDocument.documentURI;
		nonUniqueAnchors				= [];

		// Loop through the id anchors
		for(var j = 0, m = documentAllAnchors.length; j < m; j++)
		{
			nonUniqueAnchors.push(documentAllAnchors[j].getAttribute("id"));
		}

		documentAllAnchors = contentDocument.querySelectorAll("a[name]");

		// Loop through the name anchors
		for(j = 0, m = documentAllAnchors.length; j < m; j++)
		{
			nonUniqueAnchors.push(documentAllAnchors[j].getAttribute("name"));
		}

		nonUniqueAnchors.sort();

		// Loop through the anchors
		for(j = 0, m = nonUniqueAnchors.length; j < m; j++)
		{
			anchor = nonUniqueAnchors[j];

			// If this is not the last anchor and the anchor is the same as the next anchor
			if(j + 1 < m && anchor == nonUniqueAnchors[j + 1])
			{
				continue;
			}

			documentAnchors.anchors.push(anchor);
		}

		anchors.documents.push(documentAnchors);
	}
	
	return anchors;
};

// Returns any broken images in the document
WebDeveloper.Content.getBrokenImages = function()
{
	var brokenImages			= {};
	var contentDocument	  = null;
	var contentDocuments	= WebDeveloper.Content.getDocuments(document.defaultView);
	var documentAllImages = null;
	var documentImages		= null;
	var image						  = null;
	
	brokenImages.documents = [];
	brokenImages.pageTitle = document.title;
	brokenImages.pageURL	 = document.documentURI;

	// Loop through the documents
	for(var i = 0, l = contentDocuments.length; i < l; i++)
	{
		contentDocument			  = contentDocuments[i];
		documentAllImages			= WebDeveloper.Common.getDocumentImages(contentDocument);
		documentImages				= {};
		documentImages.images = [];
		documentImages.url	  = contentDocument.documentURI;

		// Loop through the images
		for(var j = 0, m = documentAllImages.length; j < m; j++)
		{
			image = documentAllImages[j];

			// If the image is broken
			if(!image.naturalWidth && !image.naturalHeight)
			{
				documentImages.images.push(image.src);
			}
		}

		brokenImages.documents.push(documentImages);
	}
	
	return brokenImages;
};

// Returns the CSS for the document
WebDeveloper.Content.getDocumentCSS = function()
{
	var contentDocument	 = null;
	var contentDocuments = WebDeveloper.Content.getDocuments(document.defaultView);
	var css							 = {};
	var documentCSS			 = null;
	var embeddedStyles	 = null;
	var styleSheet			 = null;
	var styleSheets			 = null;
	
	css.documents = [];
	css.pageTitle = document.title;
	css.pageURL	 = document.documentURI;

	// Loop through the documents
	for(var i = 0, l = contentDocuments.length; i < l; i++)
	{
		contentDocument = contentDocuments[i];
		documentCSS			= {};
		embeddedStyles	= "";
		styleSheets			= contentDocument.querySelectorAll("style");
	
		documentCSS.url					= contentDocument.documentURI;
		documentCSS.styleSheets = [];

		 // Loop through the embedded style sheets
		 for(var j = 0, m = styleSheets.length; j < m; j++)
		 {
			 styleSheet = styleSheets[j];
	
			 // If this is a valid style sheet
			 if(WebDeveloper.CSS.isValidStyleSheet(styleSheet.sheet))
			 {
				 embeddedStyles += WebDeveloper.Common.trim(styleSheet.innerHTML) + "\n\n";
			 }
		 }

		 styleSheets = contentDocument.styleSheets;
	
		 // Loop through the style sheets
		 for(j = 0, m = styleSheets.length; j < m; j++)
		 {
			 styleSheet = styleSheets[j];
	
			 // If this is a valid style sheet and is not an inline style sheet
			 if(WebDeveloper.CSS.isValidStyleSheet(styleSheet) && styleSheet.href && styleSheet.href != contentDocument.documentURI)
			 {
				documentCSS.styleSheets.push(styleSheet.href);
			}
		 }
		
		// If there are embedded styles
		if(embeddedStyles)
		{
			documentCSS.embedded = embeddedStyles;
		}
		
		css.documents.push(documentCSS);
	}
	
	return css;
};

// Returns the details for the document
WebDeveloper.Content.getDocumentDetails = function()
{
	var documentDetails = {};
	
	documentDetails.pageTitle = document.title;
	documentDetails.pageURL		= document.documentURI;
	
	return documentDetails;
};

// Returns the JavaScript for the document
WebDeveloper.Content.getDocumentJavaScript = function()
{
	var contentDocument		 = null;
	var contentDocuments	 = WebDeveloper.Content.getDocuments(document.defaultView);
	var documentJavaScript = null;
	var embeddedJavaScript = null;
	var javaScript				 = {};
	var script						 = null;
	var scripts						 = null;
	
	javaScript.documents = [];
	javaScript.pageTitle = document.title;
	javaScript.pageURL	 = document.documentURI;

	// Loop through the documents
	for(var i = 0, l = contentDocuments.length; i < l; i++)
	{
		contentDocument		 = contentDocuments[i];
		documentJavaScript = {};
		embeddedJavaScript = "";
		scripts						 = contentDocument.querySelectorAll("script");
	
		documentJavaScript.url				= contentDocument.documentURI;
		documentJavaScript.javaScript = [];

		// Loop through the scripts
		for(var j = 0, m = scripts.length; j < m; j++)
		{
			script = scripts[j];
	
			// If this is a valid external script
			if(script.src)
			{
				documentJavaScript.javaScript.push(script.src);
			}
			else
			{
				embeddedJavaScript += WebDeveloper.Common.trim(script.innerHTML) + "\n\n";
			}
		}
		
		// If there is embedded JavaScript
		if(embeddedJavaScript)
		{
			documentJavaScript.embedded = embeddedJavaScript;
		}
		
		javaScript.documents.push(documentJavaScript);
	}
	
	return javaScript;
};

// Returns all the documents under a frame
WebDeveloper.Content.getDocuments = function(frame)
{
	var documents = [];

	// If the frame is set
	if(frame)
	{
		var frames = frame.frames;
 
		// If the frame document exists
		if(frame.document)
		{
			documents.push(frame.document);
		}

		// Loop through the frames
		for(var i = 0, l = frames.length; i < l; i++)
		{
			documents = documents.concat(WebDeveloper.Content.getDocuments(frames[i]));
		}
	}

	return documents;
};

// Returns any forms in the document
WebDeveloper.Content.getForms = function()
{
	var allForms						= null;
	var contentDocument		  = null;
	var contentDocuments		= WebDeveloper.Content.getDocuments(document.defaultView);
	var documentForm				= null;
	var documentFormElement = null;
	var documentForms			  = null;
	var elementType				  = null;
	var form								= null;
	var formElement				  = null;
	var formElements				= null;
	var forms							  = {};
	
	forms.documents = [];
	forms.pageTitle = document.title;
	forms.pageURL	  = document.documentURI;

	// Loop through the documents
	for(var i = 0, l = contentDocuments.length; i < l; i++)
	{
		contentDocument		  = contentDocuments[i];
		allForms						= contentDocument.forms;
		documentForms				= {};
		documentForms.forms = [];
		documentForms.url	  = contentDocument.documentURI;

		 // Loop through the forms
		 for(var j = 0, m = allForms.length; j < m; j++)
		 {
			documentForm					= {};
			documentForm.elements = [];
			form									= allForms[j];
			formElements					= form.elements;

			// If the form has an action attribute
			if(form.hasAttribute("action"))
			{
				documentForm.action = form.getAttribute("action");
			}

			// If the form has an id attribute
			if(form.hasAttribute("id"))
			{
				documentForm.id = form.getAttribute("id");
			}

			// If the form has a method attribute
			if(form.hasAttribute("method"))
			{
				documentForm.method = form.getAttribute("method");
			}

			// If the form has a name attribute
			if(form.hasAttribute("name"))
			{
				documentForm.name = form.getAttribute("name");
			}

			// Loop through the form elements
			for(var k = 0, n = formElements.length; k < n; k++)
			{
				documentFormElement = {};
				formElement					= formElements[k];
				elementType					= formElement.tagName.toLowerCase();

				// If this is an input element
				if(elementType == "input")
				{
					documentFormElement.value = formElement.value;
					
					// If the form element has a type attribute
					if(formElement.hasAttribute("type"))
					{
						 elementType = formElement.getAttribute("type");
					}
				}
				else if(elementType == "textarea")
				{
					documentFormElement.value = formElement.value;
				}

				// If the form element has an id attribute
				if(formElement.hasAttribute("id"))
				{
					documentFormElement.id = formElement.getAttribute("id");
				}

				// If the form element has a maxlength attribute
				if(formElement.hasAttribute("maxlength"))
				{
					documentFormElement.maximumLength = formElement.getAttribute("maxlength");
				}

				// If the form element has a name attribute
				if(formElement.hasAttribute("name"))
				{
					documentFormElement.name = formElement.getAttribute("name");
				}

				// If the form element has a size attribute
				if(formElement.hasAttribute("size"))
				{
					documentFormElement.size = formElement.getAttribute("size");
				}
				
				documentFormElement.type = elementType;
				
				documentForm.elements.push(documentFormElement);
			}

			documentForms.forms.push(documentForm);
		}

		forms.documents.push(documentForms);
	}
	
	return forms;
};

// Returns any images in the document
WebDeveloper.Content.getImages = function()
{
	var allImages				 = null;
	var contentDocument	 = null;
	var contentDocuments = WebDeveloper.Content.getDocuments(document.defaultView);
	var documentImage		 = null;
	var documentImages	 = null;
	var image						 = null;
	var images					 = {};
	
	images.documents = [];
	images.pageTitle = document.title;
	images.pageURL	 = document.documentURI;

	// Loop through the documents
	for(var i = 0, l = contentDocuments.length; i < l; i++)
	{
		contentDocument			  = contentDocuments[i];
		allImages						  = WebDeveloper.Common.getDocumentImages(contentDocument);
		documentImages				= {};
		documentImages.images = [];
		documentImages.url		= contentDocument.documentURI;

		// Loop through the images
		for(var j = 0, m = allImages.length; j < m; j++)
		{
			documentImage = {};
			image					= allImages[j];

			// If the image has an alt attribute
			if(image.hasAttribute("alt"))
			{
				documentImage.alt = image.getAttribute("alt");
			}

			documentImage.height = image.naturalHeight;
			documentImage.src		 = image.src;
			documentImage.width	 = image.naturalWidth;

			documentImages.images.push(documentImage);
		}

		images.documents.push(documentImages);
	}
	
	return images;
};

// Returns any links in the document
WebDeveloper.Content.getLinks = function()
{
	var contentDocument	 = null;
	var contentDocuments = WebDeveloper.Content.getDocuments(document.defaultView);
	var documentAllLinks = null;
	var documentLinks		 = null;
	var link						 = null;
	var links						 = {};
	var nonUniqueLinks	 = null;
	
	links.documents = [];
	links.pageTitle = document.title;
	links.pageURL	  = document.documentURI;

	// Loop through the documents
	for(var i = 0, l = contentDocuments.length; i < l; i++)
	{
		contentDocument		  = contentDocuments[i];
		documentAllLinks		= contentDocument.links;
		documentLinks				= {};
		documentLinks.links = [];
		documentLinks.url	  = contentDocument.documentURI;
		nonUniqueLinks			= [];

		// Loop through the links
		for(var j = 0, m = documentAllLinks.length; j < m; j++)
		{
			nonUniqueLinks.push(documentAllLinks[j].href);
		}

		nonUniqueLinks.sort();

		// Loop through the links
		for(j = 0, m = nonUniqueLinks.length; j < m; j++)
		{
			link = nonUniqueLinks[j];

			// If this is not the last link and the link is the same as the next link
			if(j + 1 < m && link == nonUniqueLinks[j + 1])
			{
				continue;
			}

			documentLinks.links.push(link);
		}

		links.documents.push(documentLinks);
	}
	
	return links;
};

// Returns any meta tags in the document
WebDeveloper.Content.getMetaTags = function()
{
	var contentDocument		  = null;
	var contentDocuments		= WebDeveloper.Content.getDocuments(document.defaultView);
	var documentAllMetaTags = null;
	var documentMetaTag		  = null;
	var documentMetaTags		= null;
	var metaTag						  = null;
	var metaTags						= {};
	
	metaTags.documents = [];
	metaTags.pageTitle = document.title;
	metaTags.pageURL	 = document.documentURI;

	// Loop through the documents
	for(var i = 0, l = contentDocuments.length; i < l; i++)
	{
		contentDocument					  = contentDocuments[i];
		documentAllMetaTags				= contentDocument.querySelectorAll("meta");
		documentMetaTags					= {};
		documentMetaTags.metaTags = [];
		documentMetaTags.url			= contentDocument.documentURI;

		// Loop through the meta tags
		for(var j = 0, m = documentAllMetaTags.length; j < m; j++)
		{
			documentMetaTag					= {};
			metaTag									= documentAllMetaTags[j];
			documentMetaTag.content = metaTag.getAttribute("content");
		 
			// If the meta tag has a name attribute
			if(metaTag.hasAttribute("name"))
			{
				documentMetaTag.name = metaTag.getAttribute("name");
			}
			else if(metaTag.hasAttribute("http-equiv"))
			{
				documentMetaTag.name = metaTag.getAttribute("http-equiv");
			}

			documentMetaTags.metaTags.push(documentMetaTag);
		}

		metaTags.documents.push(documentMetaTags);
	}
	
	return metaTags;
};

// Returns the window size
WebDeveloper.Content.getWindowSize = function()
{
	var size = {};

	size.innerHeight = window.innerHeight;
	size.innerWidth	 = window.innerWidth;
	size.outerHeight = window.outerHeight;
	size.outerWidth	 = window.outerWidth;

	return size;
};

// Validates the HTML of the local page
WebDeveloper.Content.validateLocalHTML = function()
{
	var body		= WebDeveloper.Common.getDocumentBodyElement(document);
	var form		= document.createElement("form");
	var input		= document.createElement("input");
	var request = new XMLHttpRequest();
	
	request.open("get", document.documentURI, false);
	request.send(null);

	form.action	 = "http://validator.w3.org/check";
	form.enctype = "multipart/form-data";
	form.method	 = "post";
	form.target	 = "_blank";
	
	input.name	= "fragment";
	input.value = request.responseText;
	
	form.appendChild(input);

	input			  = document.createElement("input");		
	input.name	= "verbose";
	input.value = "1";
	
	form.appendChild(input);
	
	body.appendChild(form);
	form.submit();
	body.removeChild(form);	

	return {};
};
