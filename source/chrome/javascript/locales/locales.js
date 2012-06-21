var WebDeveloper = WebDeveloper || {};

WebDeveloper.Locales = WebDeveloper.Locales || {};

// Returns a formatted string from the locale
WebDeveloper.Locales.getFormattedString = function(name, parameters)
{
	return chrome.i18n.getMessage(name, parameters);
};

// Returns a string from the locale
WebDeveloper.Locales.getString = function(name)
{
	return chrome.i18n.getMessage(name);
};
