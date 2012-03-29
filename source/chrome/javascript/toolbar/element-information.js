var WebDeveloper = WebDeveloper || {};

WebDeveloper.ElementInformation			 = WebDeveloper.ElementInformation || {};
WebDeveloper.ElementInformation.html = '<div><h1>@name@ Element Information</h1><p>h1 > stuff > things</p></div>';

// Creates the element information toolbar
WebDeveloper.ElementInformation.createToolbar = function(contentDocument)
{
	var elementInformationToolbar = contentDocument.createElement("div");

	elementInformationToolbar.setAttribute("id", "web-developer-element-information-toolbar");
	elementInformationToolbar.setAttribute("class", "web-developer-toolbar");

	elementInformationToolbar.innerHTML = WebDeveloper.ElementInformation.html;

	WebDeveloper.Common.getDocumentBodyElement(contentDocument).appendChild(elementInformationToolbar);
};

// Displays the ancestors of an element
WebDeveloper.ElementInformation.displayElementAncestors = function(element, contentDocument)
{
	// If the element is set
	if(element)
	{
		var tagName = element.tagName;

		// If the tag name is set and does not equal scrollbar
		if(tagName && tagName.toLowerCase() != "scrollbar")
		{
			var ancestorText			 = WebDeveloper.ElementInformation.getElementDescription(element);
			var elementDescription = null;
			var parentElement		 = null;

			// While there is a parent element
			while((parentElement = element.parentNode) !== null)
			{
				element					 = parentElement;
				elementDescription = WebDeveloper.ElementInformation.getElementDescription(element);

				// If the element description is set
				if(elementDescription)
				{
					ancestorText += " < " + elementDescription;
				}
			}

			contentDocument.querySelector("#web-developer-element-information-toolbar p").innerHTML = ancestorText;
		}
	}
};

// Removes the element information toolbar
WebDeveloper.ElementInformation.removeToolbar = function(contentDocument)
{
	WebDeveloper.Common.removeMatchingElements("#web-developer-element-information-toolbar", contentDocument);
};
