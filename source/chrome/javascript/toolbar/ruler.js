var WebDeveloper = WebDeveloper || {};

WebDeveloper.Ruler								 = WebDeveloper.Ruler || {};
WebDeveloper.Ruler.toolbarDocument = null;

// Creates the ruler events
WebDeveloper.Ruler.createEvents = function(contentDocument)
{
	window.WebDeveloperEvents											 = window.WebDeveloperEvents || {};
	window.WebDeveloperEvents.Ruler								 = window.WebDeveloperEvents.Ruler || {};
	window.WebDeveloperEvents.Ruler.mouseDown			 = WebDeveloper.Ruler.mouseDown;
	window.WebDeveloperEvents.Ruler.mouseMove			 = WebDeveloper.Ruler.mouseMove;
	window.WebDeveloperEvents.Ruler.mouseUp				 = WebDeveloper.Ruler.mouseUp;
	window.WebDeveloperEvents.Ruler.resizeDocument = WebDeveloper.Ruler.resizeDocument;

	contentDocument.addEventListener("mousedown", window.WebDeveloperEvents.Ruler.mouseDown, true);
	contentDocument.addEventListener("mousemove", window.WebDeveloperEvents.Ruler.mouseMove, false);
	contentDocument.addEventListener("mouseup", window.WebDeveloperEvents.Ruler.mouseUp, true);
	contentDocument.addEventListener("resize", window.WebDeveloperEvents.Ruler.resizeDocument, false);
};

// Creates the ruler toolbar
WebDeveloper.Ruler.createToolbar = function(contentDocument, toolbarHTML)
{
	var rulerToolbar = contentDocument.createElement("iframe");
	var styleSheet	 = null;

	rulerToolbar.setAttribute("id", "web-developer-ruler-toolbar");
	rulerToolbar.setAttribute("class", "web-developer-toolbar");

	WebDeveloper.Common.getDocumentBodyElement(contentDocument).appendChild(rulerToolbar);

	WebDeveloper.Ruler.toolbarDocument = rulerToolbar.contentDocument;
	styleSheet												 = WebDeveloper.Ruler.toolbarDocument.createElement("link");

	styleSheet.setAttribute("rel", "stylesheet");
	styleSheet.setAttribute("href", WebDeveloper.Common.getChromeURL("toolbar/ruler-toolbar.css"));
	WebDeveloper.Common.getDocumentHeadElement(WebDeveloper.Ruler.toolbarDocument).appendChild(styleSheet);

	WebDeveloper.Common.getDocumentBodyElement(WebDeveloper.Ruler.toolbarDocument).innerHTML = toolbarHTML;

	WebDeveloper.Ruler.toolbarDocument.querySelector("img").setAttribute("src", WebDeveloper.Common.getChromeURL("toolbar/images/logo.png"));
	WebDeveloper.Ruler.toolbarDocument.getElementById("web-developer-ruler-height").addEventListener("change", WebDeveloper.Ruler.updateHeight, false);
	WebDeveloper.Ruler.toolbarDocument.getElementById("web-developer-ruler-width").addEventListener("change", WebDeveloper.Ruler.updateWidth, false);
};

// Removes the ruler events
WebDeveloper.Ruler.removeEvents = function(contentDocument)
{
	contentDocument.removeEventListener("mousedown", window.WebDeveloperEvents.Ruler.mouseDown, true);
	contentDocument.removeEventListener("mousemove", window.WebDeveloperEvents.Ruler.mouseMove, false);
	contentDocument.removeEventListener("mouseup", window.WebDeveloperEvents.Ruler.mouseUp, true);
	contentDocument.removeEventListener("resize", window.WebDeveloperEvents.Ruler.resizeDocument, false);

	window.WebDeveloperEvents.Ruler	= null;
};

// Removes the ruler toolbar
WebDeveloper.Ruler.removeToolbar = function(contentDocument)
{
	// If the toolbar document is set
	if(WebDeveloper.Ruler.toolbarDocument)
	{
		WebDeveloper.Ruler.toolbarDocument.getElementById("web-developer-ruler-height").removeEventListener("change", WebDeveloper.Ruler.updateHeight, false);
		WebDeveloper.Ruler.toolbarDocument.getElementById("web-developer-ruler-width").removeEventListener("change", WebDeveloper.Ruler.updateWidth, false);
	}

	WebDeveloper.Common.removeMatchingElements("#web-developer-ruler-toolbar", contentDocument);
};

// Updates the ruler height
WebDeveloper.Ruler.updateHeight = function()
{
	var height = WebDeveloper.Ruler.toolbarDocument.getElementById("web-developer-ruler-height").value.replace(/px/gi, "");

	// If the height is valid
	if(height && parseInt(height, 10) == height && height > 0)
	{
		height																= parseInt(height, 10);
		WebDeveloper.Ruler.ruler.style.height = (height - 2) + "px";
		WebDeveloper.Ruler.endY								= WebDeveloper.Ruler.startY + height;

		WebDeveloper.Ruler.resizeBackgrounds();
		WebDeveloper.Ruler.updateInformation();
	}
};

// Updates the ruler information
WebDeveloper.Ruler.updateInformation = function()
{
	// If the ruler is set
	if(WebDeveloper.Ruler.ruler)
	{
		WebDeveloper.Ruler.toolbarDocument.getElementById("web-developer-ruler-height").value = WebDeveloper.Ruler.ruler.offsetHeight + "px";
		WebDeveloper.Ruler.toolbarDocument.getElementById("web-developer-ruler-width").value	= WebDeveloper.Ruler.ruler.offsetWidth + "px";

		// If the end x position is greater than the start x position
		if(WebDeveloper.Ruler.endX > WebDeveloper.Ruler.startX)
		{
			WebDeveloper.Ruler.toolbarDocument.getElementById("web-developer-ruler-end-x").textContent	 = (WebDeveloper.Ruler.endX + 2) + "px";
			WebDeveloper.Ruler.toolbarDocument.getElementById("web-developer-ruler-start-x").textContent = WebDeveloper.Ruler.startX + "px";
		}
		else
		{
			WebDeveloper.Ruler.toolbarDocument.getElementById("web-developer-ruler-end-x").textContent	 = WebDeveloper.Ruler.endX + "px";
			WebDeveloper.Ruler.toolbarDocument.getElementById("web-developer-ruler-start-x").textContent = (WebDeveloper.Ruler.startX + 2) + "px";
		}

		// If the end y position is greater than the start y position
		if(WebDeveloper.Ruler.endY > WebDeveloper.Ruler.startY)
		{
			WebDeveloper.Ruler.toolbarDocument.getElementById("web-developer-ruler-end-y").textContent	 = (WebDeveloper.Ruler.endY + 2) + "px";
			WebDeveloper.Ruler.toolbarDocument.getElementById("web-developer-ruler-start-y").textContent = WebDeveloper.Ruler.startY + "px";
		}
		else
		{
			WebDeveloper.Ruler.toolbarDocument.getElementById("web-developer-ruler-end-y").textContent	 = WebDeveloper.Ruler.endY + "px";
			WebDeveloper.Ruler.toolbarDocument.getElementById("web-developer-ruler-start-y").textContent = (WebDeveloper.Ruler.startY + 2) + "px";
		}
	}
};

// Updates the ruler width
WebDeveloper.Ruler.updateWidth = function()
{
	var width = WebDeveloper.Ruler.toolbarDocument.getElementById("web-developer-ruler-width").value.replace(/px/gi, "");

	// If the width is valid
	if(width && parseInt(width, 10) == width && width > 0)
	{
		width																 = parseInt(width, 10);
		WebDeveloper.Ruler.ruler.style.width = (width - 2) + "px";
		WebDeveloper.Ruler.endX							 = WebDeveloper.Ruler.startX + width;

		WebDeveloper.Ruler.resizeBackgrounds();
		WebDeveloper.Ruler.updateInformation();
	}
};
