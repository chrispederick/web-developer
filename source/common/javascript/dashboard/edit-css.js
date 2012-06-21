var WebDeveloper = WebDeveloper || {};

WebDeveloper.EditCSS								 = WebDeveloper.EditCSS || {};
WebDeveloper.EditCSS.updateFrequency = 250;
window.WebDeveloperIntervals				 = window.WebDeveloperIntervals || {};

// Applies the CSS
WebDeveloper.EditCSS.applyCSS = function()
{
	var contentDocument  = WebDeveloper.Common.getContentDocument();
	var headElement			 = WebDeveloper.Common.getDocumentHeadElement(contentDocument);
	var styleBase				 = null;
	var styleElement		 = null;
	var styles					 = null;
	var stylesContainer	 = null;
	var stylesContainers = WebDeveloper.EditCSS.getStylesContainers();
	var stylesUpdated		 = false;

	// Loop through the styles containers
	for(var i = 0, l = stylesContainers.length; i < l; i++)
	{
		styleElement		= contentDocument.getElementById("web-developer-edit-css-styles-" + i);
		stylesContainer	= stylesContainers[i];
		styles					= WebDeveloper.EditCSS.getStylesFromContainer(stylesContainer);

		// If the style element does not exist
		if(!styleElement)
		{
			styleBase		 = stylesContainer.getAttribute("web-developer-base");
			styleElement = contentDocument.createElement("style");

			styleElement.setAttribute("id", "web-developer-edit-css-styles-" + i);
			styleElement.setAttribute("class", "web-developer-edit-css-styles");

			// If the style base is set
			if(styleBase)
			{
				styleElement.setAttribute("xml:base", styleBase);
			}

			headElement.appendChild(styleElement);
		}

		// If the styles have changed
		if(styleElement.innerHTML != styles)
		{
			styleElement.innerHTML = styles;
			stylesUpdated					 = true;
		}
	}

	return stylesUpdated;
};

// Resets a document
WebDeveloper.EditCSS.resetDocument = function(contentDocument)
{
	WebDeveloper.Common.removeMatchingElements(".web-developer-edit-css-styles", contentDocument);
	WebDeveloper.CSS.toggleAllStyleSheets(false, contentDocument);
};

// Stops the CSS updating
WebDeveloper.EditCSS.stopUpdate = function()
{
	// If the interval id is set
	if(window.WebDeveloperIntervals.editCSS)
	{
		window.clearInterval(window.WebDeveloperIntervals.editCSS);

		window.WebDeveloperIntervals.editCSS = null;
	}
};

// Updates the CSS
WebDeveloper.EditCSS.update = function(contentDocument)
{
	// If the update frequency is greater than 0
	if(WebDeveloper.EditCSS.updateFrequency > 0)
	{
		window.WebDeveloperIntervals.editCSS = window.setInterval(WebDeveloper.EditCSS.apply, WebDeveloper.EditCSS.updateFrequency);
	}
};
