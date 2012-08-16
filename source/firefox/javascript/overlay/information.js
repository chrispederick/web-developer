var WebDeveloper = WebDeveloper || {};

WebDeveloper.Overlay						 = WebDeveloper.Overlay || {};
WebDeveloper.Overlay.Information = WebDeveloper.Overlay.Information || {};

// Displays the abbreviations on a page
WebDeveloper.Overlay.Information.displayAbbreviations = function(element)
{
	WebDeveloper.Information.displayAbbreviations(WebDeveloper.Content.getDocuments(WebDeveloper.Common.getContentWindow()));
	WebDeveloper.Storage.toggleFeature(WebDeveloper.Common.getFeatureId(element.getAttribute("id")));
};

// Displays the access keys on a page
WebDeveloper.Overlay.Information.displayAccessKeys = function(element)
{
	var featureId = WebDeveloper.Common.getFeatureId(element.getAttribute("id"));

	WebDeveloper.Information.displayAccessKeys(!WebDeveloper.Storage.isFeatureActive(featureId), WebDeveloper.Content.getDocuments(WebDeveloper.Common.getContentWindow()));
	WebDeveloper.Storage.toggleFeature(featureId);
};

// Displays the anchors on a page
WebDeveloper.Overlay.Information.displayAnchors = function(element)
{
	var featureId = WebDeveloper.Common.getFeatureId(element.getAttribute("id"));

	WebDeveloper.Information.displayAnchors(!WebDeveloper.Storage.isFeatureActive(featureId), WebDeveloper.Content.getDocuments(WebDeveloper.Common.getContentWindow()));
	WebDeveloper.Storage.toggleFeature(featureId);
};

// Displays the ARIA roles on a page
WebDeveloper.Overlay.Information.displayARIARoles = function(element)
{
	WebDeveloper.Information.displayARIARoles(WebDeveloper.Content.getDocuments(WebDeveloper.Common.getContentWindow()));
	WebDeveloper.Storage.toggleFeature(WebDeveloper.Common.getFeatureId(element.getAttribute("id")));
};

// Displays the order of the divs on a page
WebDeveloper.Overlay.Information.displayDivOrder = function(element)
{
	var featureId = WebDeveloper.Common.getFeatureId(element.getAttribute("id"));

	WebDeveloper.Information.displayDivOrder(!WebDeveloper.Storage.isFeatureActive(featureId), WebDeveloper.Content.getDocuments(WebDeveloper.Common.getContentWindow()));
	WebDeveloper.Storage.toggleFeature(featureId);
};

// Displays the dimensions of the divs on a page
WebDeveloper.Overlay.Information.displayDivDimensions = function(element)
{
	var featureId = WebDeveloper.Common.getFeatureId(element.getAttribute("id"));
	var locale		= WebDeveloper.Locales.setupGeneratedLocale();

	locale.height	= WebDeveloper.Locales.getString("height");
	locale.width	= WebDeveloper.Locales.getString("width");

	WebDeveloper.Information.displayDivDimensions(!WebDeveloper.Storage.isFeatureActive(featureId), WebDeveloper.Content.getDocuments(WebDeveloper.Common.getContentWindow()), locale);
	WebDeveloper.Storage.toggleFeature(featureId);
};

// Displays information about the selected element
WebDeveloper.Overlay.Information.displayElementInformation = function(element)
{
	var elementInformation = WebDeveloper.Locales.getString("elementInformation");

	// If element information is open in the dashboard
	if(WebDeveloper.Dashboard.isOpenInDashboard(elementInformation))
	{
		WebDeveloper.Dashboard.closeDashboardTab(elementInformation);
	}
	else
	{
		WebDeveloper.Dashboard.openInDashboard(elementInformation, "chrome://web-developer/content/dashboard/element-information.xul");
	}
};

// Displays the id and class details for a page
WebDeveloper.Overlay.Information.displayIdClassDetails = function(element)
{
	var featureId = WebDeveloper.Common.getFeatureId(element.getAttribute("id"));

	WebDeveloper.Information.displayIdClassDetails(!WebDeveloper.Storage.isFeatureActive(featureId), WebDeveloper.Content.getDocuments(WebDeveloper.Common.getContentWindow()));
	WebDeveloper.Storage.toggleFeature(featureId);
};

// Displays the details for the links on a page
WebDeveloper.Overlay.Information.displayLinkDetails = function(element)
{
	WebDeveloper.Information.displayLinkDetails(WebDeveloper.Content.getDocuments(WebDeveloper.Common.getContentWindow()));
	WebDeveloper.Storage.toggleFeature(WebDeveloper.Common.getFeatureId(element.getAttribute("id")));
};

// Displays the information for objects on a page
WebDeveloper.Overlay.Information.displayObjectInformation = function(element)
{
	var featureId = WebDeveloper.Common.getFeatureId(element.getAttribute("id"));

	WebDeveloper.Information.displayObjectInformation(!WebDeveloper.Storage.isFeatureActive(featureId), WebDeveloper.Content.getDocuments(WebDeveloper.Common.getContentWindow()));
	WebDeveloper.Storage.toggleFeature(featureId);
};

// Displays the stack levels on a page
WebDeveloper.Overlay.Information.displayStackLevels = function(element)
{
	var featureId = WebDeveloper.Common.getFeatureId(element.getAttribute("id"));

	WebDeveloper.Information.displayStackLevels(!WebDeveloper.Storage.isFeatureActive(featureId), WebDeveloper.Content.getDocuments(WebDeveloper.Common.getContentWindow()));
	WebDeveloper.Storage.toggleFeature(featureId);
};

// Displays the tab indices on a page
WebDeveloper.Overlay.Information.displayTabIndex = function(element)
{
	var featureId = WebDeveloper.Common.getFeatureId(element.getAttribute("id"));

	WebDeveloper.Information.displayTabIndex(!WebDeveloper.Storage.isFeatureActive(featureId), WebDeveloper.Content.getDocuments(WebDeveloper.Common.getContentWindow()));
	WebDeveloper.Storage.toggleFeature(featureId);
};

// Displays the depth of all tables on a page
WebDeveloper.Overlay.Information.displayTableDepth = function(element)
{
	var featureId = WebDeveloper.Common.getFeatureId(element.getAttribute("id"));

	WebDeveloper.Information.displayTableDepth(!WebDeveloper.Storage.isFeatureActive(featureId), WebDeveloper.Content.getDocuments(WebDeveloper.Common.getContentWindow()), WebDeveloper.Locales.getString("depth"));
	WebDeveloper.Storage.toggleFeature(featureId);
};

// Displays the information for tables on a page
WebDeveloper.Overlay.Information.displayTableInformation = function(element)
{
	var featureId = WebDeveloper.Common.getFeatureId(element.getAttribute("id"));

	WebDeveloper.Information.displayTableInformation(!WebDeveloper.Storage.isFeatureActive(featureId), WebDeveloper.Content.getDocuments(WebDeveloper.Common.getContentWindow()));
	WebDeveloper.Storage.toggleFeature(featureId);
};

// Displays the title attributes on a page
WebDeveloper.Overlay.Information.displayTitleAttributes = function(element)
{
	var featureId = WebDeveloper.Common.getFeatureId(element.getAttribute("id"));

	WebDeveloper.Information.displayTitleAttributes(!WebDeveloper.Storage.isFeatureActive(featureId), WebDeveloper.Content.getDocuments(WebDeveloper.Common.getContentWindow()));
	WebDeveloper.Storage.toggleFeature(featureId);
};

// Displays the topographic information for a page
WebDeveloper.Overlay.Information.displayTopographicInformation = function(element)
{
	WebDeveloper.Information.displayTopographicInformation(WebDeveloper.Content.getDocuments(WebDeveloper.Common.getContentWindow()));
	WebDeveloper.Storage.toggleFeature(WebDeveloper.Common.getFeatureId(element.getAttribute("id")));
};

// Finds all the duplicate ids on a page
WebDeveloper.Overlay.Information.findDuplicateIds = function()
{
	var locale = WebDeveloper.Locales.setupGeneratedLocale();

	locale.duplicateId	= WebDeveloper.Locales.getString("duplicateId");
	locale.duplicateIds	= WebDeveloper.Locales.getString("duplicateIds");

	WebDeveloper.Overlay.openGeneratedTab(WebDeveloper.Common.getChromeURL("generated/find-duplicate-ids.html"), WebDeveloper.Content.getDuplicateIds(), locale);
};

// Updates the information menu
WebDeveloper.Overlay.Information.updateInformationMenu = function()
{
	WebDeveloper.Overlay.configureFeatureElement("web-developer-display-abbreviations-command", "checked");
	WebDeveloper.Overlay.configureFeatureElement("web-developer-display-access-keys-command", "checked");
	WebDeveloper.Overlay.configureFeatureElement("web-developer-display-anchors-command", "checked");
	WebDeveloper.Overlay.configureFeatureElement("web-developer-display-div-order", "checked");
	WebDeveloper.Overlay.configureFeatureElement("web-developer-display-div-size", "checked");
	WebDeveloper.Overlay.configureFeatureElement("web-developer-display-id-class-details-command", "checked");
	WebDeveloper.Overlay.configureFeatureElement("web-developer-display-link-details-command", "checked");
	WebDeveloper.Overlay.configureFeatureElement("web-developer-display-object-information-command", "checked");
	WebDeveloper.Overlay.configureFeatureElement("web-developer-display-stack-levels-command", "checked");
	WebDeveloper.Overlay.configureFeatureElement("web-developer-display-tab-index-command", "checked");
	WebDeveloper.Overlay.configureFeatureElement("web-developer-display-table-depth-command", "checked");
	WebDeveloper.Overlay.configureFeatureElement("web-developer-display-table-information-command", "checked");
	WebDeveloper.Overlay.configureFeatureElement("web-developer-display-title-attributes-command", "checked");
	WebDeveloper.Overlay.configureFeatureElement("web-developer-display-topographic-information-command", "checked");

	WebDeveloper.Common.configureElement(document.getElementById("web-developer-display-element-information-command"), "checked", WebDeveloper.Dashboard.isOpenInDashboard(WebDeveloper.Locales.getString("elementInformation")));
};

// Displays the anchor information for a page
WebDeveloper.Overlay.Information.viewAnchorInformation = function()
{
	WebDeveloper.Overlay.openGeneratedTab(WebDeveloper.Common.getChromeURL("generated/view-anchor-information.html"), WebDeveloper.Content.getAnchors(), WebDeveloper.Overlay.Information.getViewAnchorInformationLocale());
};

// Displays the color information for a page
WebDeveloper.Overlay.Information.viewColorInformation = function()
{
	WebDeveloper.Overlay.openGeneratedTab(WebDeveloper.Common.getChromeURL("generated/view-color-information.html"), WebDeveloper.Content.getColors(), WebDeveloper.Overlay.Information.getViewColorInformationLocale());
};

// Displays the document outline
WebDeveloper.Overlay.Information.viewDocumentOutline = function()
{
	WebDeveloper.Overlay.openGeneratedTab(WebDeveloper.Common.getChromeURL("generated/view-document-outline.html"), WebDeveloper.Content.getDocumentOutline(), WebDeveloper.Overlay.Information.getViewDocumentOutlineLocale());
};

// Displays the document size
WebDeveloper.Overlay.Information.viewDocumentSize = function()
{
	var locale = WebDeveloper.Locales.setupGeneratedLocale();

	locale.bytes						= WebDeveloper.Locales.getString("bytes");
	locale.document					= WebDeveloper.Locales.getString("document");
	locale.documents				= WebDeveloper.Locales.getString("documents");
	locale.documentSize			= WebDeveloper.Locales.getString("documentSize");
	locale.file							= WebDeveloper.Locales.getString("file");
	locale.files						= WebDeveloper.Locales.getString("files");
	locale.image						= WebDeveloper.Locales.getString("image");
	locale.images						= WebDeveloper.Locales.getString("images");
	locale.kilobytes				= WebDeveloper.Locales.getString("kilobytes");
	locale.object						= WebDeveloper.Locales.getString("object");
	locale.objects					= WebDeveloper.Locales.getString("objects");
	locale.script						= WebDeveloper.Locales.getString("script");
	locale.scripts					= WebDeveloper.Locales.getString("scripts");
	locale.size							= WebDeveloper.Locales.getString("size");
	locale.styleSheet				= WebDeveloper.Locales.getString("styleSheet");
	locale.styleSheets			= WebDeveloper.Locales.getString("styleSheets");
	locale.uncompressedSize = WebDeveloper.Locales.getString("uncompressedSize");

	WebDeveloper.Content.getDocumentSize(function(data)
	{
		WebDeveloper.Overlay.openGeneratedTab(WebDeveloper.Common.getChromeURL("generated/view-document-size.html"), data, locale);
	});
};

// Displays the JavaScript
WebDeveloper.Overlay.Information.viewJavaScript = function()
{
	var data = WebDeveloper.Content.getJavaScript();

	data.theme = WebDeveloper.Preferences.getExtensionStringPreference("syntax.highlight.theme");

	WebDeveloper.Overlay.openGeneratedTab(WebDeveloper.Common.getChromeURL("generated/view-javascript.html"), data, WebDeveloper.Overlay.Information.getViewJavaScriptLocale());
};

// Displays the link information for a page
WebDeveloper.Overlay.Information.viewLinkInformation = function()
{
	WebDeveloper.Overlay.openGeneratedTab(WebDeveloper.Common.getChromeURL("generated/view-link-information.html"), WebDeveloper.Content.getLinks(), WebDeveloper.Overlay.Information.getViewLinkInformationLocale());
};

// Displays the meta tag information for a page
WebDeveloper.Overlay.Information.viewMetaTagInformation = function()
{
	WebDeveloper.Overlay.openGeneratedTab(WebDeveloper.Common.getChromeURL("generated/view-meta-tag-information.html"), WebDeveloper.Content.getMetaTags(), WebDeveloper.Overlay.Information.getViewMetaTagInformationLocale());
};

// View page information
WebDeveloper.Overlay.Information.viewPageInformation = function()
{
	BrowserPageInfo(null);
};

// Displays the response headers
WebDeveloper.Overlay.Information.viewResponseHeaders = function()
{
	WebDeveloper.Overlay.openGeneratedTab(WebDeveloper.Common.getChromeURL("generated/view-response-headers.html"), WebDeveloper.Content.getDocumentDetails(), WebDeveloper.Overlay.Information.getViewResponseHeadersLocale());
};
