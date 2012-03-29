var WebDeveloper = WebDeveloper || {};

WebDeveloper.Locales = WebDeveloper.Locales || {};

// Returns a string from the locale
WebDeveloper.Locales.getString = function(name)
{
	return chrome.i18n.getMessage(name);
};

// Returns a substituted string from the locale
WebDeveloper.Locales.getSubstitutedString = function(name, substitutes)
{
	return chrome.i18n.getMessage(name, substitutes);
};
