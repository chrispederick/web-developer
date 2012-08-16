var WebDeveloper = WebDeveloper || {};

WebDeveloper.ElementInformation	= WebDeveloper.ElementInformation || {};

// Copies the ancestor path
WebDeveloper.ElementInformation.copyAncestorPath = function()
{
	Components.classes["@mozilla.org/widget/clipboardhelper;1"].getService(Components.interfaces.nsIClipboardHelper).copyString(document.getElementById("web-developer-element-information-browser").contentDocument.defaultView.WebDeveloper.Dashboard.getAncestorPath());

	WebDeveloper.Common.displayNotification("ancestorPathCopied");
};

// Displays the information for an element
WebDeveloper.ElementInformation.displayElementInformation = function(element)
{
	var generatedDocument = document.getElementById("web-developer-element-information-browser").contentDocument;
	var theme							= WebDeveloper.Preferences.getExtensionStringPreference("syntax.highlight.theme");

	generatedDocument.defaultView.WebDeveloper.Dashboard.setPosition(WebDeveloper.Preferences.getExtensionStringPreference("dashboard.position"));
	generatedDocument.defaultView.WebDeveloper.Dashboard.initialize(WebDeveloper.ElementInformation.generateElementInformation(element, element.ownerDocument, generatedDocument, theme), theme);
};

// Returns a string from the locale
WebDeveloper.ElementInformation.getLocaleString = function(name)
{
	return WebDeveloper.Locales.getString(name);
};

// Initializes the element information dashboard
WebDeveloper.ElementInformation.initialize = function()
{
	var contentDocument = null;
	var documents				= WebDeveloper.Content.getDocuments(WebDeveloper.Common.getContentWindow());

	// Loop through the documents
	for(var i = 0, l = documents.length; i < l; i++)
	{
		contentDocument = documents[i];

		contentDocument.addEventListener("click", WebDeveloper.ElementInformation.click, true);
		contentDocument.addEventListener("mouseover", WebDeveloper.ElementAncestors.mouseOver, false);

		WebDeveloper.Common.toggleStyleSheet("toolbar/style-sheets/element-ancestors.css", "web-developer-element-information-styles", contentDocument, false);
	}

	WebDeveloper.ElementAncestors.createToolbar();

	contentDocument																													= document.getElementById("web-developer-element-information-browser").contentDocument;
	contentDocument.querySelector(".web-developer-information").textContent = WebDeveloper.Locales.getString("selectAnElementDisplayInformation");

	contentDocument.addEventListener("click", WebDeveloper.ElementInformation.clickOutput, false);
};

// Uninitializes the element information dashboard
WebDeveloper.ElementInformation.uninitialize = function()
{
	var contentDocument = document.getElementById("web-developer-element-information-browser").contentDocument;
	var documents				= WebDeveloper.Content.getDocuments(WebDeveloper.Common.getContentWindow());

	contentDocument.removeEventListener("click", WebDeveloper.ElementInformation.clickOutput, false);

	// Loop through the documents
	for(var i = 0, l = documents.length; i < l; i++)
	{
		contentDocument = documents[i];

		contentDocument.removeEventListener("click", WebDeveloper.ElementInformation.click, true);
		contentDocument.removeEventListener("mouseover", WebDeveloper.ElementAncestors.mouseOver, false);

		WebDeveloper.ElementAncestors.removeOutline(contentDocument);
		WebDeveloper.Common.toggleStyleSheet("toolbar/style-sheets/element-ancestors.css", "web-developer-element-information-styles", contentDocument, false);
	}

	// If the style information is not also running
	if(!WebDeveloper.Common.getMainWindow().WebDeveloper.Dashboard.isOpenInDashboard(WebDeveloper.Locales.getString("styleInformation")))
	{
		WebDeveloper.ElementAncestors.removeToolbar(contentDocument);
	}
};
