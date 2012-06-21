var WebDeveloper = WebDeveloper || {};

WebDeveloper.Overlay			 = WebDeveloper.Overlay || {};
WebDeveloper.Overlay.Forms = WebDeveloper.Overlay.Forms || {};

// Returns the locale for the view form information feature
WebDeveloper.Overlay.Forms.getViewFormInformationLocale = function()
{
	var locale = WebDeveloper.Locales.setupGeneratedLocale();

	locale.action				 = WebDeveloper.Locales.getString("action");
	locale.elements			 = WebDeveloper.Locales.getString("elements");
	locale.form					 = WebDeveloper.Locales.getString("form");
	locale.forms				 = WebDeveloper.Locales.getString("forms");
	locale.id						 = WebDeveloper.Locales.getString("id");
	locale.label				 = WebDeveloper.Locales.getString("label");
	locale.maximumLength = WebDeveloper.Locales.getString("maximumLength");
	locale.method				 = WebDeveloper.Locales.getString("method");
	locale.name					 = WebDeveloper.Locales.getString("name");
	locale.size					 = WebDeveloper.Locales.getString("size");
	locale.type					 = WebDeveloper.Locales.getString("type");
	locale.value				 = WebDeveloper.Locales.getString("value");

	return locale;
};
