var WebDeveloper = WebDeveloper || {}; // eslint-disable-line no-use-before-define

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
