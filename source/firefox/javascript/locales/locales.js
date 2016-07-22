var WebDeveloper = WebDeveloper || {}; // eslint-disable-line no-use-before-define

WebDeveloper.Locales                 = WebDeveloper.Locales || {};
WebDeveloper.Locales.defaultBundleId = "web-developer-string-bundle";

// Returns a formatted string from the locale
WebDeveloper.Locales.getFormattedString = function(name, parameters, bundleId)
{
  var localeString = null;

  // Try to get the string from the localization
  try
  {
    // If the bundle id is not set
    if(!bundleId)
    {
      bundleId = WebDeveloper.Locales.defaultBundleId;
    }

    localeString = document.getElementById(bundleId).getFormattedString(name, parameters);
  }
  catch(exception)
  {
    localeString = "";
  }

  return localeString;
};

// Returns a string from the locale
WebDeveloper.Locales.getString = function(name, bundleId)
{
  var localeString = null;

  // Try to get the string from the localization
  try
  {
    // If the bundle id is not set
    if(!bundleId)
    {
      bundleId = WebDeveloper.Locales.defaultBundleId;
    }

    localeString = document.getElementById(bundleId).getString(name);
  }
  catch(exception)
  {
    localeString = "";
  }

  return localeString;
};
