var WebDeveloper = WebDeveloper || {};

WebDeveloper.Overlay		 = WebDeveloper.Overlay || {};
WebDeveloper.Overlay.CSS = WebDeveloper.Overlay.CSS || {};

// Returns the locale for the view CSS feature
WebDeveloper.Overlay.CSS.getViewCSSLocale = function()
{
	var locale = WebDeveloper.Locales.setupGeneratedLocale();

	locale.couldNotLoadCSS = WebDeveloper.Locales.getString("couldNotLoadCSS");
	locale.css						 = WebDeveloper.Locales.getString("css");
	locale.embeddedCSSFrom = WebDeveloper.Locales.getString("embeddedCSSFrom");

	return locale;
};
