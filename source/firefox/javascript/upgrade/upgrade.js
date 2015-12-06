var WebDeveloper = WebDeveloper || {};

WebDeveloper.Upgrade = WebDeveloper.Upgrade || {};

// Returns the legacy extension preferences branch
WebDeveloper.Upgrade.getLegacyExtensionBranch = function()
{
  return WebDeveloper.Preferences.getBranch("webdeveloper.");
};

// Migrate to version 1.2
WebDeveloper.Upgrade.migrate12 = function()
{
  WebDeveloper.Upgrade.migrateLegacyBooleanPreference("confirmation.dialogs.hide");
  WebDeveloper.Upgrade.migrateLegacyBooleanPreference("context.hide");
  WebDeveloper.Upgrade.migrateLegacyStringPreference("dashboard.position");
  WebDeveloper.Upgrade.migrateLegacyBooleanPreference("edit.stick", "edit.css.pin");
  WebDeveloper.Upgrade.migrateLegacyIntegerPreference("font.minimum.size");
  WebDeveloper.Upgrade.migrateLegacyStringPreference("magnification.level");
  WebDeveloper.Upgrade.migrateLegacyBooleanPreference("menu.hide");
  WebDeveloper.Upgrade.migrateLegacyBooleanPreference("persist.features", "pin.features");
  WebDeveloper.Upgrade.migrateLegacyStringPreference("populate.form.fields.email", "populate.email.address");
  WebDeveloper.Upgrade.migrateLegacyBooleanPreference("resize.viewport");
  WebDeveloper.Upgrade.migrateLegacyStringPreference("toolbar.icons");

  WebDeveloper.Upgrade.migrateLegacyResizePreferences();
  WebDeveloper.Upgrade.migrateLegacyToolPreferences();

  WebDeveloper.Preferences.deletePreferenceBranch(WebDeveloper.Upgrade.getLegacyExtensionBranch());
};

// Migrates a legacy boolean preference
WebDeveloper.Upgrade.migrateLegacyBooleanPreference = function(legacyPreference, preference)
{
  var value = null;

  // If the preference is not set
  if(!preference)
  {
    preference = legacyPreference;
  }

  value = WebDeveloper.Preferences.getBooleanPreference(legacyPreference, WebDeveloper.Upgrade.getLegacyExtensionBranch());

  // If the value is set
  if(value)
  {
    WebDeveloper.Preferences.setExtensionBooleanPreference(preference, value);
  }
};

// Migrates a legacy integer preference
WebDeveloper.Upgrade.migrateLegacyIntegerPreference = function(legacyPreference, preference)
{
  var legacyBranch = WebDeveloper.Upgrade.getLegacyExtensionBranch();

  // If the preference is not set
  if(!preference)
  {
    preference = legacyPreference;
  }

  // If the legacy preference is set
  if(WebDeveloper.Preferences.isPreferenceSet(legacyPreference, legacyBranch))
  {
    var value = WebDeveloper.Preferences.getIntegerPreference(legacyPreference, legacyBranch);

    // If the value does not equal the new preference
    if(value !== WebDeveloper.Preferences.getExtensionIntegerPreference(preference))
    {
      WebDeveloper.Preferences.setExtensionIntegerPreference(preference, value);
    }
  }
};

// Migrates the legacy resize preferences
WebDeveloper.Upgrade.migrateLegacyResizePreferences = function()
{
  var legacyBranch = WebDeveloper.Upgrade.getLegacyExtensionBranch();
  var preference   = "resize.count";
  var resizeCount  = WebDeveloper.Preferences.getIntegerPreference(preference, legacyBranch);
  var value        = null;

  // If the resize count is greater than the new preference
  if(resizeCount > WebDeveloper.Preferences.getExtensionIntegerPreference(preference))
  {
    WebDeveloper.Preferences.setExtensionIntegerPreference(preference, resizeCount);
  }

  // Loop through the possible resize options
  for(var i = 1; i <= resizeCount; i++)
  {
    preference = "resize." + i + ".description";
    value      = WebDeveloper.Preferences.getStringPreference(preference, legacyBranch);

    // If the legacy description is set and does not equal the new preference
    if(value && value !== WebDeveloper.Preferences.getLocalizedPreference(preference))
    {
      WebDeveloper.Preferences.setExtensionStringPreference(preference, value);
    }

    preference = "resize." + i + ".height";
    value      = WebDeveloper.Preferences.getIntegerPreference(preference, legacyBranch);

    // If the legacy height is set and does not equal the new preference
    if(value > 0 && value !== WebDeveloper.Preferences.getExtensionIntegerPreference(preference))
    {
      WebDeveloper.Preferences.setExtensionIntegerPreference(preference, value);
    }

    preference = "resize." + i + ".width";
    value    = WebDeveloper.Preferences.getIntegerPreference(preference, legacyBranch);

    // If the legacy width is set and does not equal the new preference
    if(value > 0 && value !== WebDeveloper.Preferences.getExtensionIntegerPreference(preference))
    {
      WebDeveloper.Preferences.setExtensionIntegerPreference(preference, value);
    }

    preference = "resize." + i + ".viewport";
    value      = WebDeveloper.Preferences.getBooleanPreference(preference, legacyBranch);

    // If the legacy viewport is set
    if(value)
    {
      WebDeveloper.Preferences.setExtensionBooleanPreference(preference, value);
    }
  }
};

// Migrates a legacy string preference
WebDeveloper.Upgrade.migrateLegacyStringPreference = function(legacyPreference, preference)
{
  var legacyBranch = WebDeveloper.Upgrade.getLegacyExtensionBranch();

  // If the preference is not set
  if(!preference)
  {
    preference = legacyPreference;
  }

  // If the legacy preference is set
  if(WebDeveloper.Preferences.isPreferenceSet(legacyPreference, legacyBranch))
  {
    var value = WebDeveloper.Preferences.getStringPreference(legacyPreference, legacyBranch);

    // If the value does not equal the new preference
    if(value !== WebDeveloper.Preferences.getExtensionStringPreference(preference))
    {
      WebDeveloper.Preferences.setExtensionStringPreference(preference, value);
    }
  }
};

// Migrates the legacy tool preferences
WebDeveloper.Upgrade.migrateLegacyToolPreferences = function()
{
  var legacyBranch = WebDeveloper.Upgrade.getLegacyExtensionBranch();
  var preference   = "tool.count";
  var toolCount    = WebDeveloper.Preferences.getIntegerPreference(preference, legacyBranch);
  var value        = null;

  // If the tool count is greater than the new preference
  if(toolCount > WebDeveloper.Preferences.getExtensionIntegerPreference(preference))
  {
    WebDeveloper.Preferences.setExtensionIntegerPreference(preference, toolCount);
  }

  // Loop through the possible tools
  for(var i = 1; i <= toolCount; i++)
  {
    preference = "tool." + i + ".separator";
    value      = WebDeveloper.Preferences.getBooleanPreference(preference, legacyBranch);

    // If the legacy separator is set and does not equal the new preference
    if(value && value !== WebDeveloper.Preferences.getExtensionBooleanPreference(preference))
    {
      WebDeveloper.Preferences.setExtensionBooleanPreference(preference, value);
    }
    else
    {
      preference = "tool." + i + ".description";
      value      = WebDeveloper.Preferences.getStringPreference(preference, legacyBranch);

      // If the legacy description is set and does not equal the new preference
      if(value && value !== WebDeveloper.Preferences.getLocalizedPreference(preference))
      {
        WebDeveloper.Preferences.setExtensionStringPreference(preference, value);
      }

      preference = "tool." + i + ".path";
      value      = WebDeveloper.Preferences.getStringPreference(preference, legacyBranch);

      // If the legacy path is set and does not equal the new preference
      if(value && value !== WebDeveloper.Preferences.getExtensionStringPreference(preference))
      {
        WebDeveloper.Preferences.setExtensionStringPreference(preference, value);
      }

      preference = "tool." + i + ".url";
      value      = WebDeveloper.Preferences.getStringPreference(preference, legacyBranch);

      // If the legacy url is set and does not equal the new preference
      if(value && value !== WebDeveloper.Preferences.getExtensionStringPreference(preference))
      {
        WebDeveloper.Preferences.setExtensionStringPreference(preference, value);
      }
    }
  }
};

// Opens the upgrade URL
WebDeveloper.Upgrade.openUpgradeURL = function(version)
{
  // Set a timeout to make sure the window has finished loading
  window.setTimeout(function()
  {
    var tabBrowser = WebDeveloper.Common.getTabBrowser();
    var newTab     = tabBrowser.addTab("@url@/@browser@/installed/" + version + "/");

    tabBrowser.selectedTab = newTab;
  }, 0);
};

// Upgrades the extension
WebDeveloper.Upgrade.upgrade = function()
{
  var previousVersion = WebDeveloper.Preferences.getExtensionStringPreference("version");

  // If the versions do not match
  if(previousVersion != "@version@")
  {
    WebDeveloper.Upgrade.migrate12();
    WebDeveloper.Preferences.setExtensionStringPreference("version", "@version@");
    WebDeveloper.Upgrade.openUpgradeURL("@version@");
  }
};
