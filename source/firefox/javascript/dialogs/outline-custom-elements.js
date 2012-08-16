var WebDeveloper = WebDeveloper || {};

WebDeveloper.OutlineCustomElements = WebDeveloper.OutlineCustomElements || {};

// Handles the outline custom elements dialog being accepted
WebDeveloper.OutlineCustomElements.accept = function()
{
	// Loop through the outline custom elements
	for(var i = 1; i <= 5; i++)
	{
		WebDeveloper.Preferences.setExtensionStringPreference("outline.custom.element." + i, document.getElementById("web-developer-outline-custom-element-" + i).value);
		WebDeveloper.Preferences.setExtensionStringPreference("outline.custom.element." + i + ".color", document.getElementById("web-developer-outline-custom-element-" + i + "-color").color);
	}

	WebDeveloper.OutlineCustomElements.outline();

	return true;
};

// Initializes the outline custom elements dialog
WebDeveloper.OutlineCustomElements.initialize = function()
{
	// Loop through the outline custom elements
	for(var i = 1; i <= 5; i++)
	{
		document.getElementById("web-developer-outline-custom-element-" + i).value						= WebDeveloper.Preferences.getExtensionStringPreference("outline.custom.element." + i) ;
		document.getElementById("web-developer-outline-custom-element-" + i + "-color").color = WebDeveloper.Preferences.getExtensionStringPreference("outline.custom.element." + i + ".color");
	}
};

// Outlines the custom elements
WebDeveloper.OutlineCustomElements.outline = function()
{
	var contentDocument		= null;
	var documents					= WebDeveloper.Content.getDocuments(WebDeveloper.Common.getContentWindow());
	var outlineColor				= null;
	var outlineElement			= null;
	var outlineElements		= null;
	var outlineElementValue = null;
	var styleElement				= null;
	var styles							= null;

	// Loop through the documents
	for(var i = 0, l = documents.length; i < l; i++)
	{
		contentDocument = documents[i];
		styles					= "";

		// Loop through outline custom elements
		for(var j = 1; j <= 5; j++)
		{
			outlineColor	 = WebDeveloper.Preferences.getExtensionStringPreference("outline.custom.element." + j + ".color");
			outlineElement = WebDeveloper.Preferences.getExtensionStringPreference("outline.custom.element." + j);

			// If the outline color and element are set
			if(outlineColor && outlineElement)
			{
				outlineElements = outlineElement.split(",");

				// Loop through the elements
				for(var k = 0, m = outlineElements.length; k < m; k++)
				{
					outlineElementValue = outlineElements[k].trim();

					styles += outlineElementValue + " { outline: 1px solid " + outlineColor + " !important; } ";
					styles += outlineElementValue + ':before { content: "<' + outlineElementValue + '>" !important; } ';
				}
			}
		}

		// If the styles are set
		if(styles)
		{
			styleElement = contentDocument.createElement("style");

			styleElement.appendChild(contentDocument.createTextNode(styles));
			styleElement.setAttribute("id", "web-developer-outline-custom-elements");

			WebDeveloper.Common.getDocumentHeadElement(contentDocument).appendChild(styleElement);
		}

		WebDeveloper.Common.toggleStyleSheet("features/style-sheets/before.css", "web-developer-outline-custom-elements-before", contentDocument, false);
	}

	WebDeveloper.Storage.toggleFeature(window.arguments[0]);
};
