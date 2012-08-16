var WebDeveloper = WebDeveloper || {};

WebDeveloper.ElementAncestors = WebDeveloper.ElementAncestors || {};

// Creates the element information toolbar
WebDeveloper.ElementAncestors.createToolbar = function(contentDocument)
{
	// Ignore
};

// Displays the ancestors of an element
WebDeveloper.ElementAncestors.displayElementAncestors = function(element)
{
	var dashboard = WebDeveloper.Dashboard.getDashboard(WebDeveloper.Common.getContentDocument());

	// If the dashboard exists
	if(dashboard)
	{
		// If the element is not the dashboard
		if(!element.hasAttribute("id") || element.getAttribute("id") != dashboard.getAttribute("id"))
		{
			var generatedDocument = dashboard.contentDocument;
			var dispatchEvent			= generatedDocument.createEvent("Events");
			var elementAncestors	= generatedDocument.getElementById("current-element-ancestors");

			WebDeveloper.Common.empty(elementAncestors);
			elementAncestors.appendChild(WebDeveloper.ElementAncestors.getAncestorInformation(element, generatedDocument));

			dispatchEvent.initEvent("web-developer-initialize-ancestors-event", true, false);
			generatedDocument.querySelector("#current-element-ancestors .breadcrumb").dispatchEvent(dispatchEvent);
		}
	}
};

// Generates ancestor information for an element
WebDeveloper.ElementAncestors.generateAncestorInformation = function(element, contentDocument)
{
	var ancestorInformation = contentDocument.createElement("div");

	ancestorInformation.setAttribute("id", "web-developer-ancestors");
	ancestorInformation.appendChild(WebDeveloper.ElementAncestors.getAncestorInformation(element, contentDocument));

	return ancestorInformation;
};

// Removes the element information toolbar
WebDeveloper.ElementAncestors.removeToolbar = function(contentDocument)
{
	// Ignore
};
