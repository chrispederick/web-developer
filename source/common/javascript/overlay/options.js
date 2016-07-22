var WebDeveloper = WebDeveloper || {}; // eslint-disable-line no-use-before-define

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
  locale.followOnAppNet       = WebDeveloper.Locales.getString("followOnAppNet");
  locale.followOnTwitter      = WebDeveloper.Locales.getString("followOnTwitter");
  locale.version              = WebDeveloper.Locales.getString("version");

  return locale;
};
