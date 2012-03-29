var WebDeveloper = WebDeveloper || {};

WebDeveloper.Overlay						 = WebDeveloper.Overlay || {};
WebDeveloper.Overlay.Information = WebDeveloper.Overlay.Information || {};

// Displays the abbreviations on a page
WebDeveloper.Overlay.Information.displayAbbreviations = function(element)
{
	WebDeveloper.Information.displayAbbreviations(WebDeveloper.Common.getDocuments(WebDeveloper.Common.getContentWindow()));
	WebDeveloper.Storage.toggleFeature(WebDeveloper.Common.getFeatureId(element.getAttribute("id")));
};

// Displays the access keys on a page
WebDeveloper.Overlay.Information.displayAccessKeys = function(element)
{
	var featureId = WebDeveloper.Common.getFeatureId(element.getAttribute("id"));

	WebDeveloper.Information.displayAccessKeys(!WebDeveloper.Storage.isFeatureActive(featureId), WebDeveloper.Common.getDocuments(WebDeveloper.Common.getContentWindow()));
	WebDeveloper.Storage.toggleFeature(featureId);
};

// Displays the anchors on a page
WebDeveloper.Overlay.Information.displayAnchors = function(element)
{
	var featureId = WebDeveloper.Common.getFeatureId(element.getAttribute("id"));

	WebDeveloper.Information.displayAnchors(!WebDeveloper.Storage.isFeatureActive(featureId), WebDeveloper.Common.getDocuments(WebDeveloper.Common.getContentWindow()));
	WebDeveloper.Storage.toggleFeature(featureId);
};

// Displays the ARIA roles on a page
WebDeveloper.Overlay.Information.displayARIARoles = function(element)
{
	WebDeveloper.Information.displayARIARoles(WebDeveloper.Common.getDocuments(WebDeveloper.Common.getContentWindow()));
	WebDeveloper.Storage.toggleFeature(WebDeveloper.Common.getFeatureId(element.getAttribute("id")));
};

// Displays the order of the divs on a page
WebDeveloper.Overlay.Information.displayDivOrder = function(element)
{
	var featureId = WebDeveloper.Common.getFeatureId(element.getAttribute("id"));

	WebDeveloper.Information.displayDivOrder(!WebDeveloper.Storage.isFeatureActive(featureId), WebDeveloper.Common.getDocuments(WebDeveloper.Common.getContentWindow()));
	WebDeveloper.Storage.toggleFeature(featureId);
};

// Displays the dimensions of the divs on a page
WebDeveloper.Overlay.Information.displayDivDimensions = function(element)
{
	var featureId = WebDeveloper.Common.getFeatureId(element.getAttribute("id"));

	WebDeveloper.Information.displayDivDimensions(!WebDeveloper.Storage.isFeatureActive(featureId), WebDeveloper.Common.getDocuments(WebDeveloper.Common.getContentWindow()));
	WebDeveloper.Storage.toggleFeature(featureId);
};

// Displays information about the selected element
WebDeveloper.Overlay.Information.displayElementInformation = function(element)
{
	var displayElementInformation = WebDeveloper.Locales.getString("displayElementInformation");

	// If display element information is open in the dashboard
	if(WebDeveloper.Dashboard.isOpenInDashboard(displayElementInformation))
	{
		WebDeveloper.Dashboard.closeDashboardTab(displayElementInformation);
	}
	else
	{
		WebDeveloper.Dashboard.openInDashboard(displayElementInformation, "chrome://web-developer/content/dashboard/display-element-information.xul");
	}
};

// Displays the id and class details for a page
WebDeveloper.Overlay.Information.displayIdClassDetails = function(element)
{
	var featureId = WebDeveloper.Common.getFeatureId(element.getAttribute("id"));

	WebDeveloper.Information.displayIdClassDetails(!WebDeveloper.Storage.isFeatureActive(featureId), WebDeveloper.Common.getDocuments(WebDeveloper.Common.getContentWindow()));
	WebDeveloper.Storage.toggleFeature(featureId);
};

// Displays the details for the links on a page
WebDeveloper.Overlay.Information.displayLinkDetails = function(element)
{
	WebDeveloper.Information.displayLinkDetails(WebDeveloper.Common.getDocuments(WebDeveloper.Common.getContentWindow()));
	WebDeveloper.Storage.toggleFeature(WebDeveloper.Common.getFeatureId(element.getAttribute("id")));
};

// Displays the information for objects on a page
WebDeveloper.Overlay.Information.displayObjectInformation = function(element)
{
	var featureId = WebDeveloper.Common.getFeatureId(element.getAttribute("id"));

	WebDeveloper.Information.displayObjectInformation(!WebDeveloper.Storage.isFeatureActive(featureId), WebDeveloper.Common.getDocuments(WebDeveloper.Common.getContentWindow()));
	WebDeveloper.Storage.toggleFeature(featureId);
};

// Displays the stack levels on a page
WebDeveloper.Overlay.Information.displayStackLevels = function(element)
{
	var featureId = WebDeveloper.Common.getFeatureId(element.getAttribute("id"));

	WebDeveloper.Information.displayStackLevels(!WebDeveloper.Storage.isFeatureActive(featureId), WebDeveloper.Common.getDocuments(WebDeveloper.Common.getContentWindow()));
	WebDeveloper.Storage.toggleFeature(featureId);
};

// Displays the tab indices on a page
WebDeveloper.Overlay.Information.displayTabIndex = function(element)
{
	var featureId = WebDeveloper.Common.getFeatureId(element.getAttribute("id"));

	WebDeveloper.Information.displayTabIndex(!WebDeveloper.Storage.isFeatureActive(featureId), WebDeveloper.Common.getDocuments(WebDeveloper.Common.getContentWindow()));
	WebDeveloper.Storage.toggleFeature(featureId);
};

// Displays the depth of all tables on a page
WebDeveloper.Overlay.Information.displayTableDepth = function(element)
{
	var featureId = WebDeveloper.Common.getFeatureId(element.getAttribute("id"));

	WebDeveloper.Information.displayTableDepth(!WebDeveloper.Storage.isFeatureActive(featureId), WebDeveloper.Common.getDocuments(WebDeveloper.Common.getContentWindow()));
	WebDeveloper.Storage.toggleFeature(featureId);
};

// Displays the information for tables on a page
WebDeveloper.Overlay.Information.displayTableInformation = function(element)
{
	var featureId = WebDeveloper.Common.getFeatureId(element.getAttribute("id"));

	WebDeveloper.Information.displayTableInformation(!WebDeveloper.Storage.isFeatureActive(featureId), WebDeveloper.Common.getDocuments(WebDeveloper.Common.getContentWindow()));
	WebDeveloper.Storage.toggleFeature(featureId);
};

// Displays the title attributes on a page
WebDeveloper.Overlay.Information.displayTitleAttributes = function(element)
{
	var featureId = WebDeveloper.Common.getFeatureId(element.getAttribute("id"));

	WebDeveloper.Information.displayTitleAttributes(!WebDeveloper.Storage.isFeatureActive(featureId), WebDeveloper.Common.getDocuments(WebDeveloper.Common.getContentWindow()));
	WebDeveloper.Storage.toggleFeature(featureId);
};

// Displays the topographic information for a page
WebDeveloper.Overlay.Information.displayTopographicInformation = function(element)
{
	WebDeveloper.Information.displayTopographicInformation(WebDeveloper.Common.getDocuments(WebDeveloper.Common.getContentWindow()));
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

	WebDeveloper.Common.configureElement(document.getElementById("web-developer-display-element-information-command"), "checked", WebDeveloper.Dashboard.isOpenInDashboard(WebDeveloper.Locales.getString("displayElementInformation")));
};

// Displays the anchor information for a page
WebDeveloper.Overlay.Information.viewAnchorInformation = function()
{
	var locale = WebDeveloper.Locales.setupGeneratedLocale();

	locale.anchor						 = WebDeveloper.Locales.getString("anchor");
	locale.anchorInformation = WebDeveloper.Locales.getString("anchorInformation");
	locale.anchors					 = WebDeveloper.Locales.getString("anchors");

	WebDeveloper.Overlay.openGeneratedTab(WebDeveloper.Common.getChromeURL("generated/view-anchor-information.html"), WebDeveloper.Content.getAnchors(), locale);
};

// Displays the color information for a page
WebDeveloper.Overlay.Information.viewColorInformation = function()
{
	var locale = WebDeveloper.Locales.setupGeneratedLocale();

	locale.color						= WebDeveloper.Locales.getString("color");
	locale.colorInformation = WebDeveloper.Locales.getString("colorInformation");
	locale.colors						= WebDeveloper.Locales.getString("colors");

	WebDeveloper.Overlay.openGeneratedTab(WebDeveloper.Common.getChromeURL("generated/view-color-information.html"), WebDeveloper.Content.getColors(), locale);
};

// Displays the document outline
WebDeveloper.Overlay.Information.viewDocumentOutline = function()
{
	var locale = WebDeveloper.Locales.setupGeneratedLocale();

	locale.documentOutline = WebDeveloper.Locales.getString("documentOutline");
	locale.heading				 = WebDeveloper.Locales.getString("heading");
	locale.headings				 = WebDeveloper.Locales.getString("headings");
	locale.missingHeading  = WebDeveloper.Locales.getString("missingHeading");

	WebDeveloper.Overlay.openGeneratedTab(WebDeveloper.Common.getChromeURL("generated/view-document-outline.html"), WebDeveloper.Content.getDocumentOutline(), locale);
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

	WebDeveloper.Overlay.openGeneratedTab(WebDeveloper.Common.getChromeURL("generated/view-document-size.html"), WebDeveloper.Content.getDocumentSize(), locale);
};

// Displays the JavaScript
WebDeveloper.Overlay.Information.viewJavaScript = function()
{
	var data	 = WebDeveloper.Content.getJavaScript();
	var locale = WebDeveloper.Locales.setupGeneratedLocale();

	data.theme										= WebDeveloper.Preferences.getExtensionStringPreference("syntax.highlight.theme");
	locale.beautifyJavaScript			= WebDeveloper.Locales.getString("beautifyJavaScript");
	locale.couldNotLoadJavaScript = WebDeveloper.Locales.getString("couldNotLoadJavaScript");
	locale.embeddedJavaScriptFrom = WebDeveloper.Locales.getString("embeddedJavaScriptFrom");
	locale.javaScript							= WebDeveloper.Locales.getString("javaScript");
	locale.undoBeautifyJavaScript	= WebDeveloper.Locales.getString("undoBeautifyJavaScript");

	WebDeveloper.Overlay.openGeneratedTab(WebDeveloper.Common.getChromeURL("generated/view-javascript.html"), data, locale);
};

// Displays the link information for a page
WebDeveloper.Overlay.Information.viewLinkInformation = function()
{
	var locale = WebDeveloper.Locales.setupGeneratedLocale();

	locale.link						 = WebDeveloper.Locales.getString("link");
	locale.linkInformation = WebDeveloper.Locales.getString("linkInformation");
	locale.links					 = WebDeveloper.Locales.getString("links");

	WebDeveloper.Overlay.openGeneratedTab(WebDeveloper.Common.getChromeURL("generated/view-link-information.html"), WebDeveloper.Content.getLinks(), locale);
};

// Displays the meta tag information for a page
WebDeveloper.Overlay.Information.viewMetaTagInformation = function()
{
	var locale = WebDeveloper.Locales.setupGeneratedLocale();

	locale.content	= WebDeveloper.Locales.getString("content");
	locale.metaTag	= WebDeveloper.Locales.getString("metaTag");
	locale.metaTags = WebDeveloper.Locales.getString("metaTags");
	locale.name			= WebDeveloper.Locales.getString("name");

	WebDeveloper.Overlay.openGeneratedTab(WebDeveloper.Common.getChromeURL("generated/view-meta-tag-information.html"), WebDeveloper.Content.getMetaTags(), locale);
};

// View page information
WebDeveloper.Overlay.Information.viewPageInformation = function()
{
	BrowserPageInfo(null);
};

// Displays the response headers
WebDeveloper.Overlay.Information.viewResponseHeaders = function()
{
	var locale = WebDeveloper.Locales.setupGeneratedLocale();

	locale.couldNotLoadResponseHeaders = WebDeveloper.Locales.getString("couldNotLoadResponseHeaders");
	locale.responseHeaders						 = WebDeveloper.Locales.getString("responseHeaders");

	WebDeveloper.Overlay.openGeneratedTab(WebDeveloper.Common.getChromeURL("generated/view-response-headers.html"), WebDeveloper.Content.getDocumentDetails(), locale);
};
