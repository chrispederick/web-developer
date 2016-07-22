var WebDeveloper = WebDeveloper || {}; // eslint-disable-line no-use-before-define

WebDeveloper.Preferences                    = WebDeveloper.Preferences || {};
WebDeveloper.Preferences.preferencesService = null;

// Deletes a preference for the extension
WebDeveloper.Preferences.deleteExtensionPreference = function(preference)
{
  WebDeveloper.Preferences.deletePreference(preference, WebDeveloper.Preferences.getExtensionBranch());
};

// Deletes a preference
WebDeveloper.Preferences.deletePreference = function(preference, branch)
{
  // If the branch is not set
  if(!branch)
  {
    branch = WebDeveloper.Preferences.getGlobalBranch();
  }

  // Try to delete the extension
  try
  {
    branch.clearUserPref(preference);
  }
  catch(exception)
  {
    // Ignore
  }
};

// Deletes a preference branch
WebDeveloper.Preferences.deletePreferenceBranch = function(branch)
{
  branch.deleteBranch("");
};

// Disables the given preference for the extension
WebDeveloper.Preferences.disableExtensionPreference = function(element, preference)
{
  WebDeveloper.Preferences.setExtensionBooleanPreference(preference, !WebDeveloper.Common.convertToBoolean(element.getAttribute("checked")));
};

// Disables the given preference
WebDeveloper.Preferences.disablePreference = function(element, preference)
{
  WebDeveloper.Preferences.setBooleanPreference(preference, !WebDeveloper.Common.convertToBoolean(element.getAttribute("checked")));
};

// Enables the given preference for the extension
WebDeveloper.Preferences.enableExtensionPreference = function(element, preference)
{
  WebDeveloper.Preferences.setExtensionBooleanPreference(preference, WebDeveloper.Common.convertToBoolean(element.getAttribute("checked")));
};

// Enables the given preference
WebDeveloper.Preferences.enablePreference = function(element, preference)
{
  WebDeveloper.Preferences.setBooleanPreference(preference, WebDeveloper.Common.convertToBoolean(element.getAttribute("checked")));
};

// Returns a boolean preference, returning false if the preference is not set
WebDeveloper.Preferences.getBooleanPreference = function(preference, branch)
{
  // If the branch is not set
  if(!branch)
  {
    branch = WebDeveloper.Preferences.getGlobalBranch();
  }

  // Try to get the preference
  try
  {
    return branch.getBoolPref(preference);
  }
  catch(exception)
  {
    // Ignore
  }

  return false;
};

// Returns the preferences branch
WebDeveloper.Preferences.getBranch = function(branch)
{
  return WebDeveloper.Preferences.getPreferencesService().getBranch(branch);
};

// Returns a boolean preference for the extension, returning false if the preference is not set
WebDeveloper.Preferences.getExtensionBooleanPreference = function(preference)
{
  return WebDeveloper.Preferences.getBooleanPreference(preference, WebDeveloper.Preferences.getExtensionBranch());
};

// Returns the extension preferences branch
WebDeveloper.Preferences.getExtensionBranch = function()
{
  return WebDeveloper.Preferences.getBranch("extensions.webdeveloper.");
};

// Returns an integer preference for the extension, returning 0 if the preference is not set
WebDeveloper.Preferences.getExtensionIntegerPreference = function(preference)
{
  return WebDeveloper.Preferences.getIntegerPreference(preference, WebDeveloper.Preferences.getExtensionBranch());
};

// Returns a string preference for the extension, returning null if the preference is not set
WebDeveloper.Preferences.getExtensionStringPreference = function(preference)
{
  return WebDeveloper.Preferences.getStringPreference(preference, WebDeveloper.Preferences.getExtensionBranch());
};

// Returns the global preferences branch
WebDeveloper.Preferences.getGlobalBranch = function()
{
  return WebDeveloper.Preferences.getBranch("");
};

// Returns an integer preference, returning 0 if the preference is not set
WebDeveloper.Preferences.getIntegerPreference = function(preference, branch)
{
  // If the branch is not set
  if(!branch)
  {
    branch = WebDeveloper.Preferences.getGlobalBranch();
  }

  // Try to get the preference
  try
  {
    return branch.getIntPref(preference);
  }
  catch(exception)
  {
    // Ignore
  }

  return 0;
};

// Returns a localized preference, returning null if the preference is not set
WebDeveloper.Preferences.getLocalizedPreference = function(preference)
{
  // Try to get the preference
  try
  {
    return WebDeveloper.Preferences.getExtensionBranch().getComplexValue(preference, Components.interfaces.nsIPrefLocalizedString).data.trim();
  }
  catch(exception)
  {
    // Ignore
  }

  return null;
};

// Returns the preferences service
WebDeveloper.Preferences.getPreferencesService = function()
{
  // If the preferences service is not set
  if(!WebDeveloper.Preferences.preferencesService)
  {
    WebDeveloper.Preferences.preferencesService = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefService);
  }

  return WebDeveloper.Preferences.preferencesService;
};

// Returns a string preference, returning null if the preference is not set
WebDeveloper.Preferences.getStringPreference = function(preference, branch)
{
  // If the branch is not set
  if(!branch)
  {
    branch = WebDeveloper.Preferences.getGlobalBranch();
  }

  // Try to get the preference
  try
  {
    return branch.getComplexValue(preference, Components.interfaces.nsISupportsString).data.trim();
  }
  catch(exception)
  {
    // Ignore
  }

  return null;
};

// Returns a string preference, returning null if the preference is not set
WebDeveloper.Preferences.isPreferenceSet = function(preference, branch)
{
  // If the branch is not set
  if(!branch)
  {
    branch = WebDeveloper.Preferences.getGlobalBranch();
  }

  return branch.prefHasUserValue(preference);
};

// Sets a boolean preference
WebDeveloper.Preferences.setBooleanPreference = function(preference, value, branch)
{
  // If the branch is not set
  if(!branch)
  {
    branch = WebDeveloper.Preferences.getGlobalBranch();
  }

  branch.setBoolPref(preference, value);
};

// Sets a boolean preference for the extension
WebDeveloper.Preferences.setExtensionBooleanPreference = function(preference, value)
{
  WebDeveloper.Preferences.setBooleanPreference(preference, value, WebDeveloper.Preferences.getExtensionBranch());
};

// Sets an integer preference for the extension
WebDeveloper.Preferences.setExtensionIntegerPreference = function(preference, value)
{
  WebDeveloper.Preferences.setIntegerPreference(preference, value, WebDeveloper.Preferences.getExtensionBranch());
};

// Sets a string preference for the extension
WebDeveloper.Preferences.setExtensionStringPreference = function(preference, value)
{
  WebDeveloper.Preferences.setStringPreference(preference, value, WebDeveloper.Preferences.getExtensionBranch());
};

// Sets an integer preference
WebDeveloper.Preferences.setIntegerPreference = function(preference, value, branch)
{
  // If the branch is not set
  if(!branch)
  {
    branch = WebDeveloper.Preferences.getGlobalBranch();
  }

  branch.setIntPref(preference, value);
};

// Sets a string preference
WebDeveloper.Preferences.setStringPreference = function(preference, value, branch)
{
  var supportsStringInterface = Components.interfaces.nsISupportsString;
  var string                  = Components.classes["@mozilla.org/supports-string;1"].createInstance(supportsStringInterface);

  // If the branch is not set
  if(!branch)
  {
    branch = WebDeveloper.Preferences.getGlobalBranch();
  }

  string.data = value;

  branch.setComplexValue(preference, supportsStringInterface, string);
};
