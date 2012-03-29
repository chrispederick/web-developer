var WebDeveloper = WebDeveloper || {};

WebDeveloper.ElementAncestors = WebDeveloper.ElementAncestors || {};

// Creates the element information toolbar
WebDeveloper.ElementAncestors.createToolbar = function(contentDocument)
{
	WebDeveloper.Common.configureElement(WebDeveloper.Common.getMainWindow().document.getElementById("web-developer-element-ancestors-toolbar"), "hidden", false);
};

// Displays the ancestors of an element
WebDeveloper.ElementAncestors.displayElementAncestors = function(element)
{
	WebDeveloper.Common.getMainWindow().document.getElementById("web-developer-element-ancestors-browser").contentDocument.defaultView.WebDeveloper.Generated.populateAncestors(WebDeveloper.ElementAncestors.getAncestorInformation(element));
};

// Generates ancestor information for an element
WebDeveloper.ElementAncestors.generateAncestorInformation = function(element)
{
	return '<div id="web-developer-ancestors"><button id="web-developer-copy-ancestor-path" class="btn btn-primary">' + WebDeveloper.Locales.getString("copyAncestorPath") + "</button>" + WebDeveloper.ElementAncestors.getAncestorInformation(element) + "</div>";
};

// Removes the element information toolbar
WebDeveloper.ElementAncestors.removeToolbar = function(contentDocument)
{
	WebDeveloper.Common.configureElement(WebDeveloper.Common.getMainWindow().document.getElementById("web-developer-element-ancestors-toolbar"), "hidden", true);
};
