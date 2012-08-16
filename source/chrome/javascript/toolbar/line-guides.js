var WebDeveloper = WebDeveloper || {};

WebDeveloper.LineGuides									= WebDeveloper.LineGuides || {};
WebDeveloper.LineGuides.toolbarDocument = null;

// Creates the line guides events
WebDeveloper.LineGuides.createEvents = function(contentDocument)
{
	window.WebDeveloperEvents														= window.WebDeveloperEvents || {};
	window.WebDeveloperEvents.LineGuides								= window.WebDeveloperEvents.LineGuides || {};
	window.WebDeveloperEvents.LineGuides.mouseMove			= WebDeveloper.LineGuides.mouseMove;
	window.WebDeveloperEvents.LineGuides.resizeDocument = WebDeveloper.LineGuides.resize;

	contentDocument.addEventListener("mousemove", window.WebDeveloperEvents.LineGuides.mouseMove, false);
	contentDocument.addEventListener("resize", window.WebDeveloperEvents.LineGuides.resize, false);
};

// Creates the line guides toolbar
WebDeveloper.LineGuides.createToolbar = function(contentDocument, toolbarHTML)
{
	var lineGuidesToolbar = contentDocument.createElement("iframe");
	var styleSheet				= null;

	lineGuidesToolbar.setAttribute("class", "web-developer-toolbar");
	lineGuidesToolbar.setAttribute("id", "web-developer-line-guides-toolbar");

	WebDeveloper.Common.getDocumentBodyElement(contentDocument).appendChild(lineGuidesToolbar);

	WebDeveloper.LineGuides.toolbarDocument = lineGuidesToolbar.contentDocument;
	styleSheet															= WebDeveloper.LineGuides.toolbarDocument.createElement("link");

	styleSheet.setAttribute("rel", "stylesheet");
	styleSheet.setAttribute("href", WebDeveloper.Common.getChromeURL("toolbar/line-guides-toolbar.css"));
	WebDeveloper.Common.getDocumentHeadElement(WebDeveloper.LineGuides.toolbarDocument).appendChild(styleSheet);

	WebDeveloper.Common.getDocumentBodyElement(WebDeveloper.LineGuides.toolbarDocument).innerHTML = toolbarHTML;

	WebDeveloper.LineGuides.toolbarDocument.querySelector("img").setAttribute("src", WebDeveloper.Common.getChromeURL("toolbar/images/logo.png"));
	WebDeveloper.LineGuides.toolbarDocument.getElementById("add-horizontal-line-guide").addEventListener("click", WebDeveloper.LineGuides.addHorizontalLineGuide, false);
	WebDeveloper.LineGuides.toolbarDocument.getElementById("add-vertical-line-guide").addEventListener("click", WebDeveloper.LineGuides.addVerticalLineGuide, false);
};

// Returns the line guides color
WebDeveloper.LineGuides.getColor = function()
{
	return "#f00";
};

// Hides the line guide information
WebDeveloper.LineGuides.hideInformation = function()
{
	WebDeveloper.Common.removeClass(WebDeveloper.Common.getDocumentBodyElement(WebDeveloper.LineGuides.toolbarDocument), "display-information");
};

// Removes the line guides events
WebDeveloper.LineGuides.removeEvents = function(contentDocument)
{
	contentDocument.removeEventListener("mousemove", window.WebDeveloperEvents.LineGuides.mouseMove, false);
	contentDocument.removeEventListener("resize", window.WebDeveloperEvents.LineGuides.resize, false);

	window.WebDeveloperEvents.LineGuides = null;
};

// Removes the line guides toolbar
WebDeveloper.LineGuides.removeToolbar = function(contentDocument)
{
	// If the toolbar document is set
	if(WebDeveloper.LineGuides.toolbarDocument)
	{
		WebDeveloper.LineGuides.toolbarDocument.getElementById("add-horizontal-line-guide").removeEventListener("click", WebDeveloper.LineGuides.addHorizontalLineGuide, false);
		WebDeveloper.LineGuides.toolbarDocument.getElementById("add-vertical-line-guide").removeEventListener("click", WebDeveloper.LineGuides.addVerticalLineGuide, false);
	}

	WebDeveloper.Common.removeMatchingElements("#web-developer-line-guides-toolbar", contentDocument);
};

// Updates the line guide information
WebDeveloper.LineGuides.updateInformation = function(position, previousPosition, nextPosition)
{
	WebDeveloper.LineGuides.toolbarDocument.getElementById("line-guide-position").textContent					 = position + "px";
	WebDeveloper.LineGuides.toolbarDocument.getElementById("next-line-guide-position").textContent		 = nextPosition + "px";
	WebDeveloper.LineGuides.toolbarDocument.getElementById("previous-line-guide-position").textContent = previousPosition + "px";

	WebDeveloper.Common.addClass(WebDeveloper.Common.getDocumentBodyElement(WebDeveloper.LineGuides.toolbarDocument), "display-information");
};
