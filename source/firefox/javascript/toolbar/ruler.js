var WebDeveloper = WebDeveloper || {};

WebDeveloper.Ruler = WebDeveloper.Ruler || {};

// Converts a hex color to RGB
WebDeveloper.Ruler.convertHexColorToRGB = function(hexColor, opacity)
{
	return "rgba(" + parseInt(hexColor.substring(1, 3), 16) + "," + parseInt(hexColor.substring(3, 5), 16) + "," + parseInt(hexColor.substring(5, 7), 16) + "," + opacity + ")";
};

// Creates the ruler events
WebDeveloper.Ruler.createEvents = function(contentDocument)
{
	contentDocument.addEventListener("mousedown", WebDeveloper.Ruler.mouseDown, true);
	contentDocument.addEventListener("mousemove", WebDeveloper.Ruler.mouseMove, false);
	contentDocument.addEventListener("mouseup", WebDeveloper.Ruler.mouseUp, true);
	contentDocument.addEventListener("resize", WebDeveloper.Ruler.resizeDocument, false);
};

// Creates the ruler toolbar
WebDeveloper.Ruler.createToolbar = function(contentDocument)
{
	document.getElementById("web-developer-ruler-color").color = WebDeveloper.Preferences.getExtensionStringPreference("ruler.color");

	WebDeveloper.Common.configureElement(document.getElementById("web-developer-ruler-toolbar"), "hidden", false);
	WebDeveloper.Ruler.updateColor();
};

// Removes the ruler events
WebDeveloper.Ruler.removeEvents = function(contentDocument)
{
	contentDocument.removeEventListener("mousedown", WebDeveloper.Ruler.mouseDown, true);
	contentDocument.removeEventListener("mousemove", WebDeveloper.Ruler.mouseMove, false);
	contentDocument.removeEventListener("mouseup", WebDeveloper.Ruler.mouseUp, true);
	contentDocument.removeEventListener("resize", WebDeveloper.Ruler.resizeDocument, false);
};

// Removes the ruler toolbar
WebDeveloper.Ruler.removeToolbar = function(contentDocument)
{
	WebDeveloper.Common.configureElement(document.getElementById("web-developer-ruler-toolbar"), "hidden", true);
};

// Updates the ruler color
WebDeveloper.Ruler.updateColor = function()
{
	var color						= document.getElementById("web-developer-ruler-color").color;
	var backgroundColor = WebDeveloper.Ruler.convertHexColorToRGB(color, "0.25");
	var contentDocument = WebDeveloper.Common.getContentDocument();
	var rulerElements		= contentDocument.querySelectorAll("#web-developer-ruler, #web-developer-ruler div");

	// Loop through the ruler elements
	for(var i = 0, l = rulerElements.length; i < l; i++)
	{
		rulerElements[i].style.borderColor = color;
	}

	rulerElements = contentDocument.querySelectorAll("#web-developer-ruler div");

	// Loop through the ruler elements
	for(i = 0, l = rulerElements.length; i < l; i++)
	{
		rulerElements[i].style.backgroundColor = backgroundColor;
	}

	WebDeveloper.Preferences.setExtensionStringPreference("ruler.color", color);
};

// Updates the ruler height
WebDeveloper.Ruler.updateHeight = function(element)
{
	var height = element.value.replace(/px/gi, "");

	// If the height is empty or not a number or less than zero
	if(!height || parseInt(height, 10) != height || height <= 0)
	{
		WebDeveloper.Common.displayError(WebDeveloper.Locales.getString("displayRuler"), WebDeveloper.Locales.getString("invalidHeight"));
	}
	else
	{
		var contentDocument = WebDeveloper.Common.getContentDocument();

		height																= parseInt(height, 10);
		WebDeveloper.Ruler.ruler.style.height	= (height - 2) + "px";
		WebDeveloper.Ruler.endY								= WebDeveloper.Ruler.startY + height;

		WebDeveloper.Ruler.resizeBackgrounds();
		WebDeveloper.Ruler.updateInformation(contentDocument);
	}
};

// Updates the ruler information
WebDeveloper.Ruler.updateInformation = function(contentDocument)
{
	// If the ruler is set
	if(WebDeveloper.Ruler.ruler)
	{
		document.getElementById("web-developer-ruler-height").value	= WebDeveloper.Ruler.ruler.offsetHeight + "px";
		document.getElementById("web-developer-ruler-width").value	= WebDeveloper.Ruler.ruler.offsetWidth + "px";

		// If the end x position is greater than the start x position
		if(WebDeveloper.Ruler.endX > WebDeveloper.Ruler.startX)
		{
			document.getElementById("web-developer-ruler-end-x").value	 = (WebDeveloper.Ruler.endX + 2) + "px";
			document.getElementById("web-developer-ruler-start-x").value = WebDeveloper.Ruler.startX + "px";
		}
		else
		{
			document.getElementById("web-developer-ruler-end-x").value	 = WebDeveloper.Ruler.endX + "px";
			document.getElementById("web-developer-ruler-start-x").value = (WebDeveloper.Ruler.startX + 2) + "px";
		}

		// If the end y position is greater than the start y position
		if(WebDeveloper.Ruler.endY > WebDeveloper.Ruler.startY)
		{
			document.getElementById("web-developer-ruler-end-y").value	 = (WebDeveloper.Ruler.endY + 2) + "px";
			document.getElementById("web-developer-ruler-start-y").value = WebDeveloper.Ruler.startY + "px";
		}
		else
		{
			document.getElementById("web-developer-ruler-end-y").value	 = WebDeveloper.Ruler.endY + "px";
			document.getElementById("web-developer-ruler-start-y").value = (WebDeveloper.Ruler.startY + 2) + "px";
		}
	}
};

// Updates the ruler width
WebDeveloper.Ruler.updateWidth = function(element)
{
	var width = element.value.replace(/px/gi, "");

	// If the width is empty or not a number or less than zero
	if(!width || parseInt(width, 10) != width || width <= 0)
	{
		WebDeveloper.Common.displayError(WebDeveloper.Locales.getString("displayRuler"), WebDeveloper.Locales.getString("invalidWidth"));
	}
	else
	{
		var contentDocument = WebDeveloper.Common.getContentDocument();

		width																 = parseInt(width, 10);
		WebDeveloper.Ruler.ruler.style.width = (width - 2) + "px";
		WebDeveloper.Ruler.endX							 = WebDeveloper.Ruler.startX + width;

		WebDeveloper.Ruler.resizeBackgrounds();
		WebDeveloper.Ruler.updateInformation(contentDocument);
	}
};
