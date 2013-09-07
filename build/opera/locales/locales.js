var WebDeveloper = WebDeveloper || {};

WebDeveloper.Locales = WebDeveloper.Locales || {};

// Sets up the generated locale
WebDeveloper.Locales.setupGeneratedLocale = function()
{
  var locale = {};

  locale.collapseAll   = WebDeveloper.Locales.getString("collapseAll");
  locale.documents     = WebDeveloper.Locales.getString("documents");
  locale.expandAll     = WebDeveloper.Locales.getString("expandAll");
  locale.extensionName = WebDeveloper.Locales.getString("extensionName");
  locale.from          = WebDeveloper.Locales.getString("from");

  return locale;
};
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
