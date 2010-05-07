WebDeveloper.Common = WebDeveloper.Common || {};

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
