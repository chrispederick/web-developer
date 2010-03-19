WebDeveloper.Information = WebDeveloper.Information || {};

// Displays the abbreviations on a page
WebDeveloper.Information.displayAbbreviations = function(contentDocument)
{
	WebDeveloper.Common.toggleStyleSheet("features/style-sheets/before.css", "web-developer-display-abbreviations-before", contentDocument, false);
	WebDeveloper.Common.toggleStyleSheet("features/style-sheets/information/display-abbreviations.css", "web-developer-display-abbreviations", contentDocument, false);
};

// Displays the access keys on a page
WebDeveloper.Information.displayAccessKeys = function(display, contentDocument)
{
	WebDeveloper.Common.removeMatchingElements("span.web-developer-display-access-keys", contentDocument);

	// If displaying the access keys
	if(display)
	{
		var accessKeyElement	= null;
		var accessKeyElements = contentDocument.querySelectorAll("[accesskey]");
		var spanElement			  = null;
		var text							= null;
	
		// Loop through the access key elements
		for(var i = 0, l = accessKeyElements.length; i < l; i++)
		{
			accessKeyElement = accessKeyElements[i];
			spanElement			 = contentDocument.createElement("span");
			text						 = 'accesskey="' + accessKeyElement.getAttribute("accesskey") + '"';

			spanElement.setAttribute("class", "web-developer-display-access-keys");
			spanElement.appendChild(contentDocument.createTextNode(text));
			accessKeyElement.parentNode.insertBefore(spanElement, accessKeyElement);
		}
	}

	WebDeveloper.Common.toggleStyleSheet("features/style-sheets/before.css", "web-developer-display-access-keys", contentDocument, false);
};

// Displays the anchors on a page
WebDeveloper.Information.displayAnchors = function(display, contentDocument)
{
	WebDeveloper.Common.removeMatchingElements("span.web-developer-display-anchors", contentDocument);

	// If displaying the anchors
	if(display)
	{
		var anchorElement		 = null;
		var anchorElements	 = contentDocument.querySelectorAll("[id], [name]");
		var documentLocation = contentDocument.location;
		var anchorLocation	 = documentLocation.pathname + documentLocation.search;
		var linkElement			 = null;
		var spanElement			 = null;
		var text						 = null;
	
		// Loop through the anchor elements
		for(var i = 0, l = anchorElements.length; i < l; i++)
		{
			anchorElement = anchorElements[i];

			// If the anchor element is not the document root element
			if(anchorElement != contentDocument.documentElement)
			{
				linkElement	= contentDocument.createElement("a");
				spanElement	= contentDocument.createElement("span");
				text				= anchorLocation;
	
				// If the anchor element has an id attribute
				if(anchorElement.hasAttribute("id"))
				{
					text = "#" + anchorElement.getAttribute("id");
				}
				else if(anchorElement.hasAttribute("name"))
				{
					text = "#" + anchorElement.getAttribute("name");
				}
	
				linkElement.setAttribute("href", text);
				linkElement.appendChild(contentDocument.createTextNode(text));
	
				spanElement.setAttribute("class", "web-developer-display-anchors");
				spanElement.appendChild(linkElement);
				anchorElement.parentNode.insertBefore(spanElement, anchorElement);
			}
		}
	}

	WebDeveloper.Common.toggleStyleSheet("features/style-sheets/before.css", "web-developer-display-anchors", contentDocument, false);
};

// Displays the id and class details for a page
WebDeveloper.Information.displayIdClassDetails = function(display, contentDocument)
{
	WebDeveloper.Common.removeMatchingElements("span.web-developer-id-class-details", contentDocument);

	// If displaying the id and class details
	if(display)
	{
		var idClassElement	= null;
		var idClassElements = contentDocument.querySelectorAll("[class], [id]");
		var spanElement			= null;
		var text						= null;
	
		// Loop through the id and class elements
		for(var i = 0, l = idClassElements.length; i < l; i++)
		{
			idClassElement = idClassElements[i];
			
			// If the id class element is not the document root element or a Web Developer element
			if(idClassElement != contentDocument.documentElement && ((idClassElement.hasAttribute("class") && idClassElement.getAttribute("class").indexOf("web-developer-") !== 0) || (idClassElement.hasAttribute("id") && idClassElement.getAttribute("id").indexOf("web-developer-") !== 0)))
			{
				 spanElement = contentDocument.createElement("span");
				 text				 = WebDeveloper.Information.getElementDescription(idClassElement);
	
				 spanElement.setAttribute("class", "web-developer-id-class-details");
				 spanElement.appendChild(contentDocument.createTextNode(text));
				 idClassElement.parentNode.insertBefore(spanElement, idClassElement);
			}
		}
	}

	WebDeveloper.Common.toggleStyleSheet("features/style-sheets/before.css", "web-developer-display-id-class-details", contentDocument, false);
};

// Displays the details for the links on a page
WebDeveloper.Information.displayLinkDetails = function(contentDocument)
{
	WebDeveloper.Common.toggleStyleSheet("features/style-sheets/before.css", "web-developer-display-link-details-before", contentDocument, false);
	WebDeveloper.Common.toggleStyleSheet("features/style-sheets/information/display-link-details.css", "web-developer-display-link-details", contentDocument, false);
};

// Displays the information for objects on a page
WebDeveloper.Information.displayObjectInformation = function(display, contentDocument)
{
	WebDeveloper.Common.removeMatchingElements("div.web-developer-display-object-information", contentDocument);

	// If displaying the access keys
	if(display)
	{
		var divElement			 = null;
		var object					 = null;
		var objectAttributes = null;
		var objects					 = contentDocument.querySelectorAll("object");
		var param						 = null;
		var paramAttributes	 = null;
		var params					 = null;
		var pElement				 = null;

		// Loop through the objects
		for(var i = 0, l = objects.length; i < l; i++)
		{
			divElement			 = contentDocument.createElement("div");
			object					 = objects[i];
			objectAttributes = "";
			params					 = object.querySelectorAll("param");
			pElement				 = contentDocument.createElement("p");

			// If the object has an width attribute
			if(object.hasAttribute("width"))
			{
				objectAttributes += ' width="' + object.getAttribute("width") + '"';
			}

			// If the object has an height attribute
			if(object.hasAttribute("height"))
			{
				objectAttributes += ' height="' + object.getAttribute("height") + '"';
			}

			// If the object has an archive attribute
			if(object.hasAttribute("archive"))
			{
				objectAttributes += ' archive="' + object.getAttribute("archive") + '"';
			}

			// If the object has an classid attribute
			if(object.hasAttribute("classid"))
			{
				objectAttributes += ' classid="' + object.getAttribute("classid") + '"';
			}

			// If the object has an codebase attribute
			if(object.hasAttribute("codebase"))
			{
				objectAttributes += ' codebase="' + object.getAttribute("codebase") + '"';
			}

			// If the object has an codetype attribute
			if(object.hasAttribute("codetype"))
			{
				objectAttributes += ' codetype="' + object.getAttribute("codetype") + '"';
			}

			// If the object has an data attribute
			if(object.hasAttribute("data"))
			{
				objectAttributes += ' data="' + object.getAttribute("data") + '"';
			}

			// If the object has an standby attribute
			if(object.hasAttribute("standby"))
			{
				objectAttributes += ' standby="' + object.getAttribute("standby") + '"';
			}

			// If the object has an type attribute
			if(object.hasAttribute("type"))
			{
				objectAttributes += ' type="' + object.getAttribute("type") + '"';
			}

			pElement.appendChild(contentDocument.createTextNode("<object" + objectAttributes + ">"));
			divElement.appendChild(pElement);

			// Loop through the params
			for(var j = 0, m = params.length; j < m; j++)
			{
				param						= params[j];
				paramAttributes = "";
				pElement				= contentDocument.createElement("p");

				// If the param has a name attribute
				if(param.hasAttribute("name"))
				{
					paramAttributes += ' name="' + param.getAttribute("name") + '"';
				}

				// If the param has a value attribute
				if(param.hasAttribute("value"))
				{
					paramAttributes += ' value="' + param.getAttribute("value") + '"';
				}

				pElement.appendChild(contentDocument.createTextNode("<param" + paramAttributes + ">"));
				pElement.setAttribute("class", "web-developer-object-information-param");
				divElement.appendChild(pElement);
			}

			pElement = contentDocument.createElement("p");

			pElement.appendChild(contentDocument.createTextNode("</object>"));
			divElement.appendChild(pElement);

			divElement.setAttribute("class", "web-developer-display-object-information");
			object.parentNode.insertBefore(divElement, object);
		}
	}

	WebDeveloper.Common.toggleStyleSheet("features/style-sheets/before.css", "web-developer-display-object-information-before", contentDocument, false);
	WebDeveloper.Common.toggleStyleSheet("features/style-sheets/information/display-object-information.css", "web-developer-display-object-information", contentDocument, false);
};

// Displays the stack levels on a page
WebDeveloper.Information.displayStackLevels = function(display, contentDocument)
{
	WebDeveloper.Common.removeMatchingElements("span.web-developer-display-stack-levels", contentDocument);

	// If displaying the stack levels
	if(display)
	{
		var node				= null;
		var spanElement = null;
		var text				= null;
		var treeWalker	= contentDocument.createTreeWalker(WebDeveloper.Common.getDocumentBodyElement(contentDocument), NodeFilter.SHOW_ELEMENT, WebDeveloper.Information.stackLevelFilter, false);

		// While the tree walker has more nodes
		while((node = treeWalker.nextNode()) !== null)
		{
			spanElement = contentDocument.createElement("span");
			text				= WebDeveloper.Information.getElementDescription(node) + ' z-index="' + node.ownerDocument.defaultView.getComputedStyle(node, null).getPropertyCSSValue("z-index").cssText + '"';

			spanElement.setAttribute("class", "web-developer-display-stack-levels");
			spanElement.appendChild(contentDocument.createTextNode(text));

			node.parentNode.insertBefore(spanElement, node);
		}
	}

	WebDeveloper.Common.toggleStyleSheet("features/style-sheets/before.css", "web-developer-display-stack-levels", contentDocument, false);
};

// Displays the tab indices on a page
WebDeveloper.Information.displayTabIndex = function(display, contentDocument)
{
	WebDeveloper.Common.removeMatchingElements("span.web-developer-display-tab-index", contentDocument);

	// If displaying the tab indices
	if(display)
	{
		var spanElement			 = null;
		var tabIndexElement	 = null;
		var tabIndexElements = contentDocument.querySelectorAll("[tabindex]");
		var text						 = null;
	
		// Loop through the tab index elements
		for(var i = 0, l = tabIndexElements.length; i < l; i++)
		{
			spanElement			= contentDocument.createElement("span");
			tabIndexElement = tabIndexElements[i];
			text						= 'tabindex="' + tabIndexElement.getAttribute("tabindex") + '"';

			spanElement.setAttribute("class", "web-developer-display-tab-index");
			spanElement.appendChild(contentDocument.createTextNode(text));
			tabIndexElement.parentNode.insertBefore(spanElement, tabIndexElement);
		}
	}

	WebDeveloper.Common.toggleStyleSheet("features/style-sheets/before.css", "web-developer-display-tab-index", contentDocument, false);
};

// Displays the title attributes on a page
WebDeveloper.Information.displayTitleAttributes = function(display, contentDocument)
{
	WebDeveloper.Common.removeMatchingElements("span.web-developer-display-title-attributes", contentDocument);

	// If displaying the title attributes
	if(display)
	{
		var spanElement						 = null;
		var text									 = null;
		var titleAttributeElement	 = null;
		var titleAttributeElements = contentDocument.querySelectorAll("[title]");
	
		// Loop through the title attribute elements
		for(var i = 0, l = titleAttributeElements.length; i < l; i++)
		{
			spanElement						= contentDocument.createElement("span");
			titleAttributeElement = titleAttributeElements[i];
			text									= 'title="' + titleAttributeElement.getAttribute("title") + '"';

			spanElement.setAttribute("class", "web-developer-display-title-attributes");
			spanElement.appendChild(contentDocument.createTextNode(text));
			titleAttributeElement.parentNode.insertBefore(spanElement, titleAttributeElement);
		}
	}

	WebDeveloper.Common.toggleStyleSheet("features/style-sheets/before.css", "web-developer-display-title-attributes", contentDocument, false);
};

// Displays the topographic information for a page
WebDeveloper.Information.displayTopographicInformation = function(contentDocument)
{
	WebDeveloper.Common.toggleStyleSheet("features/style-sheets/information/display-topographic-information.css", "web-developer-display-topographic-information", contentDocument, false);
};

// Returns the description for an element
WebDeveloper.Information.getElementDescription = function(element)
{
	var description = "";

	// If the element has an id attribute
	if(element.hasAttribute("id"))
	{
		description += "#" + element.getAttribute("id");
	}

	// If the element has a class attribute
	if(element.hasAttribute("class"))
	{
		var classes = element.getAttribute("class").split(" ");
		
		// Loop through the element classes
		for(var i = 0, l = classes.length; i < l; i++)
		{
			description += "." + WebDeveloper.Common.trim(classes[i]);
		}
	}

	return description;
};

// Filter for the stack level tree walker
WebDeveloper.Information.stackLevelFilter = function(node)
{
	// If the node does not have a class attribute or it does not start with web-developer
	if(node && (!node.hasAttribute("class") || node.getAttribute("class").indexOf("web-developer-") !== 0))
	{
		var zIndex = node.ownerDocument.defaultView.getComputedStyle(node, null).getPropertyCSSValue("z-index").cssText;

		// If the node has a z-index and it is not set to auto
		if(zIndex && zIndex != "auto")
		{
			return NodeFilter.FILTER_ACCEPT;
		}
	}

	return NodeFilter.FILTER_SKIP;
};