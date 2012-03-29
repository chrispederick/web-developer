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
					WebDeveloper.ElementInformation.selectParentElement(eventTarget);

					event.preventDefault();
				}
			}
		}
	}
};

// Copies the ancestor path
WebDeveloper.ElementInformation.copyAncestorPath = function()
{
	Components.classes["@mozilla.org/widget/clipboardhelper;1"].getService(Components.interfaces.nsIClipboardHelper).copyString(document.getElementById("web-developer-display-element-information-browser").contentDocument.defaultView.WebDeveloper.Dashboard.getAncestorPath());

	WebDeveloper.Common.displayNotification("ancestorPathCopied");
};

// Displays the information for an element
WebDeveloper.ElementInformation.displayElementInformation = function(element)
{
	var elementInformation = "";
	var generatedDocument  = document.getElementById("web-developer-display-element-information-browser").contentDocument;
	var theme							 = WebDeveloper.Preferences.getExtensionStringPreference("syntax.highlight.theme");

	WebDeveloper.ElementInformation.currentElement = element;

	elementInformation += WebDeveloper.ElementAncestors.generateAncestorInformation(element);
	elementInformation += "<div>";
	elementInformation += WebDeveloper.ElementInformation.generateDOMInformation(element, theme);
	elementInformation += WebDeveloper.ElementInformation.generateLayoutInformation(element);
	elementInformation += WebDeveloper.ElementInformation.generatePositionInformation(element, generatedDocument);
	elementInformation += WebDeveloper.ElementInformation.generateTextInformation(element, generatedDocument);
	elementInformation += "</div>";

	generatedDocument.defaultView.WebDeveloper.Dashboard.initialize(elementInformation, theme);
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

	// If this is the body or HTML tag
	if(tagName == "body" || tagName == "html")
	{
		// This works around an issue with the syntax highlighting not working with body or HTML tags
		tagName += ".";
	}

	// If there is no theme
	if(theme == "none")
	{
		elementInformation = "&lt;";
	}
	else
	{
		elementInformation = "<";
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

	return '<div class="web-developer-section"><h3>' + WebDeveloper.Locales.getString("dom") + '</h3><pre class="web-developer-syntax-highlight" data-line-numbers="false" data-type="htmlmixed">' + elementInformation + "</pre></div>";
};

// Generates layout information for an element
WebDeveloper.ElementInformation.generateLayoutInformation = function(element)
{
	var elementInformation = "height: " + element.offsetHeight + "px;\nwidth: " + element.offsetWidth + "px;";

	return '<div class="web-developer-section web-developer-css"><h3>' + WebDeveloper.Locales.getString("layout") + '</h3><pre class="web-developer-syntax-highlight" data-line-numbers="false" data-type="css">{\n' + elementInformation + "\n}</pre></div>";
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

	return '<div class="web-developer-section web-developer-css"><h3>' + WebDeveloper.Locales.getString("position") + '</h3><pre class="web-developer-syntax-highlight" data-line-numbers="false" data-type="css">{\n' + elementInformation + "\n}</pre></div>";
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

	return '<div class="web-developer-section web-developer-css"><h3>' + WebDeveloper.Locales.getString("text") + '</h3><pre class="web-developer-syntax-highlight" data-line-numbers="false" data-type="css">{\n' + elementInformation + "\n}</pre></div>";
};

// Initializes the display element information dashboard
WebDeveloper.ElementInformation.initialize = function()
{
	var contentDocument = null;
	var documents				= WebDeveloper.Common.getDocuments(WebDeveloper.Common.getContentWindow());

	// Loop through the documents
	for(var i = 0, l = documents.length; i < l; i++)
	{
		contentDocument = documents[i];

		contentDocument.addEventListener("click", WebDeveloper.ElementInformation.click, true);
		contentDocument.addEventListener("mouseover", WebDeveloper.ElementAncestors.mouseOver, false);

		WebDeveloper.ElementAncestors.createToolbar(contentDocument);
		WebDeveloper.Common.toggleStyleSheet("toolbar/style-sheets/element-ancestors.css", "web-developer-display-element-information-styles", contentDocument, false);
	}

	contentDocument																												= document.getElementById("web-developer-display-element-information-browser").contentDocument;
	contentDocument.getElementById("web-developer-information").innerHTML = WebDeveloper.Locales.getString("selectAnElementDisplayInformation");

	contentDocument.addEventListener("click", WebDeveloper.ElementInformation.clickOutput, false);
};

// Handles a parent element being selected
WebDeveloper.ElementInformation.selectParentElement = function(eventTarget)
{
	var ancestorCount = 0;
	var element				= eventTarget.parentNode;
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
};

// Uninitializes the display element information dashboard
WebDeveloper.ElementInformation.uninitialize = function()
{
	var contentDocument = document.getElementById("web-developer-display-element-information-browser").contentDocument;
	var documents				= WebDeveloper.Common.getDocuments(WebDeveloper.Common.getContentWindow());

	contentDocument.removeEventListener("click", WebDeveloper.ElementInformation.clickOutput, false);

	// Loop through the documents
	for(var i = 0, l = documents.length; i < l; i++)
	{
		contentDocument = documents[i];

		contentDocument.removeEventListener("click", WebDeveloper.ElementInformation.click, true);
		contentDocument.removeEventListener("mouseover", WebDeveloper.ElementAncestors.mouseOver, false);

		WebDeveloper.ElementAncestors.removeOutline(contentDocument);
		WebDeveloper.ElementAncestors.removeToolbar(contentDocument);
		WebDeveloper.Common.toggleStyleSheet("toolbar/style-sheets/element-ancestors.css", "web-developer-display-element-information-styles", contentDocument, false);
	}
};
