WebDeveloper.ElementInformation = WebDeveloper.ElementInformation || {};

WebDeveloper.ElementInformation.html = '<div><h1>@name@ Element Information</h1><p>h1 > stuff > things</p></div>';

// Creates the element information toolbar
WebDeveloper.ElementInformation.createElementInformationToolbar = function(contentDocument)
{
	var elementInformationToolbar = contentDocument.createElement("div");

	elementInformationToolbar.setAttribute("id", "web-developer-element-information-toolbar");
	elementInformationToolbar.setAttribute("class", "web-developer-toolbar");

	elementInformationToolbar.innerHTML = WebDeveloper.ElementInformation.html;

	WebDeveloper.Common.getDocumentBodyElement(contentDocument).appendChild(elementInformationToolbar);
};

// Displays the element information
WebDeveloper.ElementInformation.displayElementInformation = function(display, contentDocument)
{
	// If displaying the element information
	if(display)
	{
    WebDeveloper.ElementInformation.createElementInformation(contentDocument);
    WebDeveloper.ElementInformation.createElementInformationToolbar(contentDocument);
	}
	else
	{			
		WebDeveloper.ElementInformation.removeElementInformation(contentDocument);
		WebDeveloper.ElementInformation.removeElementInformationToolbar(contentDocument);
	}

  WebDeveloper.Common.toggleStyleSheet("toolbar/element-information.css", "web-developer-element-information-styles", contentDocument, false);
};

// Removes the element information toolbar
WebDeveloper.ElementInformation.removeElementInformationToolbar = function(contentDocument)
{
	WebDeveloper.Common.removeMatchingElements("#web-developer-element-information-toolbar", contentDocument);
};
