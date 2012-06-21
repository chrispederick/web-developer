var WebDeveloper = WebDeveloper || {};

WebDeveloper.ElementAncestors					= WebDeveloper.ElementAncestors || {};
WebDeveloper.ElementAncestors.element = null;

// Returns the ancestor information for an element
WebDeveloper.ElementAncestors.getAncestorInformation = function(element)
{
	var ancestorInformation				= WebDeveloper.ElementAncestors.getElementDescription(element, true);
	var parentAncestorInformation = null;
	var parentElement							= null;

	// While there is a parent element
	while((parentElement = element.parentNode) !== null)
	{
		element										= parentElement;
		parentAncestorInformation = WebDeveloper.ElementAncestors.getElementDescription(element, false);

		// If the parent ancestor information is set
		if(parentAncestorInformation)
		{
			ancestorInformation = parentAncestorInformation + ancestorInformation;
		}
	}

	return '<ul class="breadcrumb">' + ancestorInformation + "</ul>";
};

// Returns the description for an element
WebDeveloper.ElementAncestors.getElementDescription = function(element, active)
{
	var description = "";

	// If the element and tag name are set
	if(element && element.tagName)
	{
		var classList = element.className.split(" ");
		var className = null;
		var classes		= "";

		// If this is the active element
		if(active)
		{
			description = '<li class="active"';
		}
		else
		{
			description = "<li";
		}

		description += ' data-web-developer-element-tag="' + element.tagName.toLowerCase() + '"';

		// If the element has an id attribute
		if(element.hasAttribute("id"))
		{
			description += ' data-web-developer-element-id="#' + element.getAttribute("id") + '"';
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
					classes += "." + className;
				}
			}

			description += ' data-web-developer-element-classes="' + classes + '"';
		}

		// If this is the active element
		if(active)
		{
			description += "></li>";
		}
		else
		{
			description += '><a href="#" class="web-developer-ancestor"></a><span class="divider">&gt;</span></li>';
		}
	}

	return description;
};

// Handles the mouse over event
WebDeveloper.ElementAncestors.mouseOver = function(event)
{
	var eventTarget = event.target;

	// If the event target is set
	if(eventTarget)
	{
		var ownerDocument = eventTarget.ownerDocument;

		// If the owner document is set
		if(ownerDocument)
		{
			// If the event target is not the element
			if(eventTarget != WebDeveloper.ElementAncestors.element)
			{
				// If the event target has a style property
				if(eventTarget.style)
				{
					WebDeveloper.ElementAncestors.removeOutline(ownerDocument);

					eventTarget.style.outline							= "1px solid #f00";
					WebDeveloper.ElementAncestors.element = eventTarget;

					WebDeveloper.ElementAncestors.displayElementAncestors(eventTarget);

					// Needed for Chrome to keep track of
					eventTarget.setAttribute("data-web-developer-element-ancestors-outline", "true");
				}
			}
		}
	}
};

// Removes the outline
WebDeveloper.ElementAncestors.removeOutline = function(contentDocument)
{
	var element = contentDocument.querySelector("[data-web-developer-element-ancestors-outline=true]");

	// If the element is set
	if(element)
	{
		element.style.outline = "";

		// If the element has an empty style attribute
		if(element.hasAttribute("style") && WebDeveloper.Common.trim(element.getAttribute("style")) === "")
		{
			element.removeAttribute("style");
		}

		// Needed for Chrome to keep track of
		element.removeAttribute("data-web-developer-element-ancestors-outline");
	}
};
