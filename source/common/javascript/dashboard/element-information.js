var WebDeveloper = WebDeveloper || {};

WebDeveloper.ElementInformation									= WebDeveloper.ElementInformation || {};
WebDeveloper.ElementInformation.currentElement	= null;
WebDeveloper.ElementInformation.selfClosingTags = ["area", "br", "col", "hr", "img", "input", "param"];

// Adds a CSS property
WebDeveloper.ElementInformation.addCSSProperty = function(element, property, contentDocument)
{
	var cssProperty = contentDocument.defaultView.getComputedStyle(element, null).getPropertyCSSValue(property);

	// If the CSS property is set
	if(cssProperty)
	{
		return property + ": " + cssProperty.cssText + ";\n";
	}

	return "";
};

// Handles the click event
WebDeveloper.ElementInformation.click = function(event)
{
	// If the click was not a right click
	if(event.button != 2)
	{
		var eventTarget = event.target;

		// If the event target is set
		if(eventTarget)
		{
			var tagName = eventTarget.tagName;

			// If the event target is not a scrollbar
			if(tagName && tagName.toLowerCase() != "scrollbar")
			{
				WebDeveloper.ElementInformation.displayElementInformation(eventTarget);
			}

			event.stopPropagation();
			event.preventDefault();
		}
	}
};

// Handles the click event inside the output
WebDeveloper.ElementInformation.clickOutput = function(event)
{
	// If the click was not a right click
	if(event.button != 2)
	{
		var eventTarget = event.target;

		// If the event target is set
		if(eventTarget)
		{
			// If the event target is the copy ancestor path button
			if(eventTarget.hasAttribute("id") && eventTarget.getAttribute("id") == "web-developer-copy-ancestor-path")
			{
				WebDeveloper.ElementInformation.copyAncestorPath();
			}
			else
			{
				var tagName = eventTarget.tagName;

				// If the event target is a link
				if(tagName && tagName.toLowerCase() == "a")
				{
					var tagClasses = eventTarget.className;

					// If the event target is an ancestor
					if(tagClasses.indexOf("web-developer-ancestor") != -1)
					{
						WebDeveloper.ElementInformation.selectParentElement(eventTarget);
					}
					else if(tagClasses.indexOf("web-developer-child") != -1)
					{
						WebDeveloper.ElementInformation.selectChildElement(eventTarget);
					}

					event.preventDefault();
				}
			}
		}
	}
};

// Generates ancestor information for an element
WebDeveloper.ElementInformation.generateAncestorInformation = function(element)
{
	var ancestorInformation				= "";
	var parentAncestorInformation = null;
	var parentElement							= null;

	// While there is a parent element
	while((parentElement = element.parentNode) !== null)
	{
		element										= parentElement;
		parentAncestorInformation = WebDeveloper.ElementInformation.getElementDescription(element, "web-developer-ancestor");

		// If the parent ancestor information is set
		if(parentAncestorInformation)
		{
			ancestorInformation = parentAncestorInformation + ancestorInformation;
		}
	}

	// If the ancestor information is set
	if(ancestorInformation)
	{
		ancestorInformation = "<ul>" + ancestorInformation + '<li class="last"></li></ul>';
	}

	return '<div class="web-developer-section web-developer-ancestors"><h3>' + WebDeveloper.ElementInformation.getLocaleString("ancestors") + "</h3>" + ancestorInformation + "</div>";
};

// Generates children information for an element
WebDeveloper.ElementInformation.generateChildrenInformation = function(element)
{
	var childNodes					= element.childNodes;
	var childrenInformation = "";

	// Loop through the child nodes
	for(var i = 0, l = childNodes.length; i < l; i++)
	{
		childrenInformation += WebDeveloper.ElementInformation.getElementDescription(childNodes[i], "web-developer-child");
	}

	// If the children information is set
	if(childrenInformation)
	{
		childrenInformation = "<ul>" + childrenInformation + "</ul>";
	}

	return '<div class="web-developer-section web-developer-children"><h3>' + WebDeveloper.ElementInformation.getLocaleString("children") + "</h3>" + childrenInformation + "</div>";
};

// Generates DON information for an element
WebDeveloper.ElementInformation.generateDOMInformation = function(element, theme)
{
	var attribute					 = null;
	var attributeName			 = null;
	var attributes				 = element.attributes;
	var attributeValue		 = null;
	var elementInformation = null;
	var tagName						 = element.tagName.toLowerCase();

	// If there is no theme
	if(theme == "none")
	{
		elementInformation = "&lt;";
	}
	else
	{
		elementInformation = "<";

		// If this is the body or HTML tag
		if(tagName == "body" || tagName == "html")
		{
			// This works around an issue with the syntax highlighting not working with body or HTML tags
			tagName += ".";
		}
	}

	elementInformation += tagName;

	// Loop through the attributes
	for(var i = 0, l = attributes.length; i < l; i++)
	{
		attribute			= attributes[i];
		attributeName = attribute.name;

		// If this is the style attribute
		if(attributeName == "style")
		{
			// If the element has the Web Developer outline attribute
			if(element.hasAttribute("data-web-developer-element-ancestors-outline"))
			{
				attributeValue = WebDeveloper.Common.trim(WebDeveloper.Common.removeSubstring(attribute.value, "outline-width: 1px; outline-style: solid; outline-color: rgb(255, 0, 0);"));
				attributeValue = WebDeveloper.Common.trim(WebDeveloper.Common.removeSubstring(attributeValue, "outline: 1px solid rgb(255, 0, 0);"));
				attributeValue = WebDeveloper.Common.trim(WebDeveloper.Common.removeSubstring(attributeValue, "outline: rgb(255, 0, 0) solid 1px;"));

				// If the attribute value is set
				if(attributeValue)
				{
					elementInformation += " " + attributeName + '="' + attributeValue + '"';
				}
			}
			else
			{
				elementInformation += " " + attributeName + '="' + attribute.value + '"';
			}
		}
		else if(attributeName != "data-web-developer-element-ancestors-outline")
		{
			elementInformation += " " + attributeName + '="' + attribute.value + '"';
		}
	}

	// If there is no theme
	if(theme == "none")
	{
		elementInformation += "&gt;";
	}
	else
	{
		elementInformation += ">";
	}

	// If this is not a self-closing tag
	if(!WebDeveloper.Common.inArray(tagName, WebDeveloper.ElementInformation.selfClosingTags))
	{
		elementInformation += "\n...\n";

		// If there is no theme
		if(theme == "none")
		{
			elementInformation += "&lt;/" + tagName + "&gt;";
		}
		else
		{
			elementInformation += "</" + tagName + ">";
		}
	}

	return '<div class="web-developer-section"><h3>' + WebDeveloper.ElementInformation.getLocaleString("dom") + '</h3><pre class="web-developer-syntax-highlight" data-line-numbers="false" data-type="htmlmixed">' + elementInformation + "</pre></div>";
};

// Generates the information for an element
WebDeveloper.ElementInformation.generateElementInformation = function(element, contentDocument, theme)
{
	var elementInformation = "";

	WebDeveloper.ElementInformation.currentElement = element;

	elementInformation += WebDeveloper.ElementAncestors.generateAncestorInformation(element);
	elementInformation += "<div>";
	elementInformation += WebDeveloper.ElementInformation.generateDOMInformation(element, theme);
	elementInformation += WebDeveloper.ElementInformation.generateLayoutInformation(element);
	elementInformation += WebDeveloper.ElementInformation.generatePositionInformation(element, contentDocument);
	elementInformation += WebDeveloper.ElementInformation.generateTextInformation(element, contentDocument);
	elementInformation += WebDeveloper.ElementInformation.generateAncestorInformation(element);
	elementInformation += WebDeveloper.ElementInformation.generateChildrenInformation(element);
	elementInformation += "</div>";

	return elementInformation;
};

// Generates layout information for an element
WebDeveloper.ElementInformation.generateLayoutInformation = function(element)
{
	var elementInformation = "height: " + element.offsetHeight + "px;\nwidth: " + element.offsetWidth + "px;";

	return '<div class="web-developer-section web-developer-css"><h3>' + WebDeveloper.ElementInformation.getLocaleString("layout") + '</h3><pre class="web-developer-syntax-highlight" data-line-numbers="false" data-type="css">{\n' + elementInformation + "\n}</pre></div>";
};

// Generates position information for an element
WebDeveloper.ElementInformation.generatePositionInformation = function(element, contentDocument)
{
	var elementInformation = "";

	elementInformation += WebDeveloper.ElementInformation.addCSSProperty(element, "display", contentDocument);
	elementInformation += WebDeveloper.ElementInformation.addCSSProperty(element, "float", contentDocument);
	elementInformation += WebDeveloper.ElementInformation.addCSSProperty(element, "position", contentDocument);

	// If element information was set
	if(elementInformation)
	{
		elementInformation = WebDeveloper.Common.trim(elementInformation);
	}

	return '<div class="web-developer-section web-developer-css"><h3>' + WebDeveloper.ElementInformation.getLocaleString("position") + '</h3><pre class="web-developer-syntax-highlight" data-line-numbers="false" data-type="css">{\n' + elementInformation + "\n}</pre></div>";
};

// Generates text information for an element
WebDeveloper.ElementInformation.generateTextInformation = function(element, contentDocument)
{
	var elementInformation = "";

	elementInformation += WebDeveloper.ElementInformation.addCSSProperty(element, "font-family", contentDocument);
	elementInformation += WebDeveloper.ElementInformation.addCSSProperty(element, "font-size", contentDocument);
	elementInformation += WebDeveloper.ElementInformation.addCSSProperty(element, "line-height", contentDocument);

	// If element information was set
	if(elementInformation)
	{
		elementInformation = WebDeveloper.Common.trim(elementInformation);
	}

	return '<div class="web-developer-section web-developer-css"><h3>' + WebDeveloper.ElementInformation.getLocaleString("text") + '</h3><pre class="web-developer-syntax-highlight" data-line-numbers="false" data-type="css">{\n' + elementInformation + "\n}</pre></div>";
};

// Returns the element description
WebDeveloper.ElementInformation.getElementDescription = function(element, type)
{
	var description = "";

	// If the element and tag name are set
	if(element && element.tagName)
	{
		var classList = element.className.split(" ");
		var className = null;
		var classes		= "";

		description = '<li><a href="#" class="' + type + '">' + element.tagName.toLowerCase();

		// If the element has an id attribute
		if(element.hasAttribute("id"))
		{
			description += "#" + element.getAttribute("id");
		}

		// If the element has an class attribute
		if(element.hasAttribute("class"))
		{
			// Loop through the classes
			for(var i = 0, l = classList.length; i < l; i++)
			{
				className = WebDeveloper.Common.trim(classList[i]);

				// If the class name is set
				if(className)
				{
					description += "." + className;
				}
			}
		}

		description += "</a></li>";
	}

	return description;
};

// Handles a child element being selected
WebDeveloper.ElementInformation.selectChildElement = function(eventTarget)
{
	var childCount		= 0;
	var childNodes		= WebDeveloper.ElementInformation.currentElement.childNodes;
	var counter				= 0;
	var element				= eventTarget.parentNode;
	var ownerDocument = eventTarget.ownerDocument;

	// Loop through the previous siblings
	while((element = element.previousSibling) !== null)
	{
		childCount++;
	}

	// Loop through the child nodes
	for(var i = 0, l = childNodes.length; i < l; i++)
	{
		element = childNodes[i];

		// If the element and tag name are set
		if(element && element.tagName)
		{
			// If the counter matches the child count
			if(counter == childCount)
			{
				WebDeveloper.ElementInformation.displayElementInformation(element);

				// If the owner document is set
				if(ownerDocument)
				{
					element = ownerDocument.getElementById("element-information-panel");

					// If the element is found
					if(element)
					{
						element.scrollTop = 0;
					}
				}

				break;
			}

			counter++;
		}
	}
};

// Handles a parent element being selected
WebDeveloper.ElementInformation.selectParentElement = function(eventTarget)
{
	var ancestorCount = 0;
	var element				= eventTarget.parentNode;
	var ownerDocument = eventTarget.ownerDocument;
	var parentElement = WebDeveloper.ElementInformation.currentElement;

	// Loop through the next siblings
	while((element = element.nextSibling) !== null)
	{
		ancestorCount++;
	}

	// Loop through the ancestors
	for(var i = 0; i < ancestorCount; i++)
	{
		parentElement = parentElement.parentNode;
	}

	WebDeveloper.ElementInformation.displayElementInformation(parentElement);

	// If the owner document is set
	if(ownerDocument)
	{
		element = ownerDocument.getElementById("element-information-panel");

		// If the element is found
		if(element)
		{
			element.scrollTop = 0;
		}
	}
};
