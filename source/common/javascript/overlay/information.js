var WebDeveloper = WebDeveloper || {};

WebDeveloper.Overlay						 = WebDeveloper.Overlay || {};
WebDeveloper.Overlay.Information = WebDeveloper.Overlay.Information || {};

// Returns the locale for the view anchor information feature
WebDeveloper.Overlay.Information.getViewAnchorInformationLocale = function()
{
	var locale = WebDeveloper.Locales.setupGeneratedLocale();

	locale.anchor						 = WebDeveloper.Locales.getString("anchor");
	locale.anchorInformation = WebDeveloper.Locales.getString("anchorInformation");
	locale.anchors					 = WebDeveloper.Locales.getString("anchors");

	return locale;
};

// Returns the locale for the view color information feature
WebDeveloper.Overlay.Information.getViewColorInformationLocale = function()
{
	var locale = WebDeveloper.Locales.setupGeneratedLocale();

	locale.color						= WebDeveloper.Locales.getString("color");
	locale.colorInformation = WebDeveloper.Locales.getString("colorInformation");
	locale.colors						= WebDeveloper.Locales.getString("colors");

	return locale;
};

// Returns the locale for the view document outline feature
WebDeveloper.Overlay.Information.getViewDocumentOutlineLocale = function()
{
	var locale = WebDeveloper.Locales.setupGeneratedLocale();

	locale.documentOutline = WebDeveloper.Locales.getString("documentOutline");
	locale.heading				 = WebDeveloper.Locales.getString("heading");
	locale.headings				 = WebDeveloper.Locales.getString("headings");
	locale.missingHeading  = WebDeveloper.Locales.getString("missingHeading");
	locale.noHeadingText	 = WebDeveloper.Locales.getString("noHeadingText");

	return locale;
};

// Returns the locale for the view JavaScript feature
WebDeveloper.Overlay.Information.getViewJavaScriptLocale = function()
{
	var locale = WebDeveloper.Locales.setupGeneratedLocale();

	locale.beautifyJavaScript			= WebDeveloper.Locales.getString("beautifyJavaScript");
	locale.couldNotLoadJavaScript = WebDeveloper.Locales.getString("couldNotLoadJavaScript");
	locale.embeddedJavaScriptFrom = WebDeveloper.Locales.getString("embeddedJavaScriptFrom");
	locale.javaScript							= WebDeveloper.Locales.getString("javaScript");
	locale.undoBeautifyJavaScript	= WebDeveloper.Locales.getString("undoBeautifyJavaScript");

	return locale;
};

// Returns the locale for the view link information feature
WebDeveloper.Overlay.Information.getViewLinkInformationLocale = function()
{
	var locale = WebDeveloper.Locales.setupGeneratedLocale();

	locale.link						 = WebDeveloper.Locales.getString("link");
	locale.linkInformation = WebDeveloper.Locales.getString("linkInformation");
	locale.links					 = WebDeveloper.Locales.getString("links");

	return locale;
};

// Returns the locale for the view meta tag information feature
WebDeveloper.Overlay.Information.getViewMetaTagInformationLocale = function()
{
	var locale = WebDeveloper.Locales.setupGeneratedLocale();

	locale.content	= WebDeveloper.Locales.getString("content");
	locale.metaTag	= WebDeveloper.Locales.getString("metaTag");
	locale.metaTags = WebDeveloper.Locales.getString("metaTags");
	locale.name			= WebDeveloper.Locales.getString("name");

	return locale;
};

// Returns the locale for the view response headers feature
WebDeveloper.Overlay.Information.getViewResponseHeadersLocale = function()
{
	var locale = WebDeveloper.Locales.setupGeneratedLocale();

	locale.couldNotLoadResponseHeaders = WebDeveloper.Locales.getString("couldNotLoadResponseHeaders");
	locale.responseHeaders						 = WebDeveloper.Locales.getString("responseHeaders");

	return locale;
};
