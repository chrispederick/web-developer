var WebDeveloper = WebDeveloper || {};

WebDeveloper.Overlay         = WebDeveloper.Overlay || {};
WebDeveloper.Overlay.Options = WebDeveloper.Overlay.Options || {};

// Returns the locale for the about feature
WebDeveloper.Overlay.Options.getAboutLocale = function()
{
  var locale = {};

  locale.about                = WebDeveloper.Locales.getString("about");
  locale.author               = WebDeveloper.Locales.getString("author");
  locale.buildDate            = WebDeveloper.Locales.getString("buildDate");
  locale.extensionDescription = WebDeveloper.Locales.getString("extensionDescription");
  locale.extensionName        = WebDeveloper.Locales.getString("extensionName");
  locale.version              = WebDeveloper.Locales.getString("version");

  return locale;
};
