var WebDeveloper = WebDeveloper || {}; // eslint-disable-line no-use-before-define

WebDeveloper.Upgrade = WebDeveloper.Upgrade || {};

// Fixes a content setting
WebDeveloper.Upgrade.fixContentSetting = function(settingType)
{
  chrome.contentSettings[settingType].get({ primaryUrl: "http://*/*" }, function(details)
  {
    // If the setting is currently set to allow
    if(details.setting == "allow")
    {
      chrome.contentSettings[settingType].clear({});
    }
  });
};

// Fixes the content settings
WebDeveloper.Upgrade.fixContentSettings = function()
{
  // If content settings exists
  if(chrome.contentSettings)
  {
    var settingTypes = ["cookies", "images", "javascript", "notifications", "plugins", "popups"];

    // Loop through the setting types
    for(var i = 0, l = settingTypes.length; i < l; i++)
    {
      WebDeveloper.Upgrade.fixContentSetting(settingTypes[i]);
    }
  }
};

// Migrates any legacy settings
WebDeveloper.Upgrade.migrateLegacySettings = function()
{
  // Loop through the legacy settings
  for(var i = 0, l = window.localStorage.length; i < l; i++)
  {
    var key = window.localStorage.key(i);

    WebDeveloper.Storage.setItemIfNotSet(key, window.localStorage.getItem(key));
  }

  window.localStorage.clear();
};

// Migrates the tools
WebDeveloper.Upgrade.migrateTools = function()
{
  WebDeveloper.Storage.getItems(["tool_count", "tool_5_description", "tool_5_url", "tool_6_description", "tool_6_url"], function(items)
  {
    // If there are six tools and the last two are Validate Section 508 and Validate WAI
    if(items.tool_count && items.tool_count == 6 &&
      items.tool_5_description && items.tool_5_description == "Validate Section 508" && items.tool_5_url && items.tool_5_url == "http://www.cynthiasays.com/mynewtester/cynthia.exe?rptmode=-1&url1=" &&
      items.tool_6_description && items.tool_6_description == "Validate WAI" && items.tool_6_url && items.tool_6_url == "http://www.cynthiasays.com/mynewtester/cynthia.exe?rptmode=2&url1=")
    {
      WebDeveloper.Storage.removeItem("tool_6_description");
      WebDeveloper.Storage.removeItem("tool_6_url");
      WebDeveloper.Storage.setItem("tool_4_description", WebDeveloper.Locales.getString("tool_4_description"));
      WebDeveloper.Storage.setItem("tool_4_url", "http://wave.webaim.org/report#/");
      WebDeveloper.Storage.setItem("tool_5_description", WebDeveloper.Locales.getString("tool_5_description"));
      WebDeveloper.Storage.setItem("tool_5_url", "http://validator.w3.org/checklink?check=Check&hide_type=all&summary=on&uri=");
      WebDeveloper.Storage.setItem("tool_count", 5);
    }
  });
};

// Opens the upgrade URL
WebDeveloper.Upgrade.openUpgradeURL = function(version)
{
  chrome.tabs.create({ url: "@url@@browser@/installed/" + version + "/" });
};

// Removes any deleted settings
WebDeveloper.Upgrade.removeDeletedSettings = function()
{
  WebDeveloper.Storage.removeItem("icon_color");
};

// Sets up the default options
WebDeveloper.Upgrade.setupDefaultOptions = function()
{
  // Advanced
  WebDeveloper.Storage.setItemIfNotSet("populate_email_address", "example@example.com");

  // Colors
  WebDeveloper.Storage.setItemIfNotSet("syntax_highlight_theme", "none");

  // General
  WebDeveloper.Storage.setItemIfNotSet("display_overlay_with", "icons_text");

  // Resize
  WebDeveloper.Storage.setItemIfNotSet("resize_1_description", WebDeveloper.Locales.getString("resize_1_description"));
  WebDeveloper.Storage.setItemIfNotSet("resize_1_height", 768);
  WebDeveloper.Storage.setItemIfNotSet("resize_1_width", 1024);
  WebDeveloper.Storage.setItemIfNotSet("resize_count", 1);

  // Responsive layouts
  WebDeveloper.Storage.setItemIfNotSet("responsive_layout_1_description", WebDeveloper.Locales.getString("responsive_layout_1_description"));
  WebDeveloper.Storage.setItemIfNotSet("responsive_layout_1_height", 480);
  WebDeveloper.Storage.setItemIfNotSet("responsive_layout_1_width", 320);
  WebDeveloper.Storage.setItemIfNotSet("responsive_layout_2_description", WebDeveloper.Locales.getString("responsive_layout_2_description"));
  WebDeveloper.Storage.setItemIfNotSet("responsive_layout_2_height", 320);
  WebDeveloper.Storage.setItemIfNotSet("responsive_layout_2_width", 480);
  WebDeveloper.Storage.setItemIfNotSet("responsive_layout_3_description", WebDeveloper.Locales.getString("responsive_layout_3_description"));
  WebDeveloper.Storage.setItemIfNotSet("responsive_layout_3_height", 800);
  WebDeveloper.Storage.setItemIfNotSet("responsive_layout_3_width", 600);
  WebDeveloper.Storage.setItemIfNotSet("responsive_layout_4_description", WebDeveloper.Locales.getString("responsive_layout_4_description"));
  WebDeveloper.Storage.setItemIfNotSet("responsive_layout_4_height", 600);
  WebDeveloper.Storage.setItemIfNotSet("responsive_layout_4_width", 800);
  WebDeveloper.Storage.setItemIfNotSet("responsive_layout_5_description", WebDeveloper.Locales.getString("responsive_layout_5_description"));
  WebDeveloper.Storage.setItemIfNotSet("responsive_layout_5_height", 1024);
  WebDeveloper.Storage.setItemIfNotSet("responsive_layout_5_width", 768);
  WebDeveloper.Storage.setItemIfNotSet("responsive_layout_6_description", WebDeveloper.Locales.getString("responsive_layout_6_description"));
  WebDeveloper.Storage.setItemIfNotSet("responsive_layout_6_height", 768);
  WebDeveloper.Storage.setItemIfNotSet("responsive_layout_6_width", 1024);
  WebDeveloper.Storage.setItemIfNotSet("responsive_layout_count", 6);

  // Tools
  WebDeveloper.Storage.setItemIfNotSet("tool_1_description", WebDeveloper.Locales.getString("tool_1_description"));
  WebDeveloper.Storage.setItemIfNotSet("tool_1_url", "http://jigsaw.w3.org/css-validator/validator?profile=css3&warning=0&uri=");
  WebDeveloper.Storage.setItemIfNotSet("tool_2_description", WebDeveloper.Locales.getString("tool_2_description"));
  WebDeveloper.Storage.setItemIfNotSet("tool_2_url", "http://validator.w3.org/feed/check.cgi?url=");
  WebDeveloper.Storage.setItemIfNotSet("tool_3_description", WebDeveloper.Locales.getString("tool_3_description"));
  WebDeveloper.Storage.setItemIfNotSet("tool_3_url", "http://validator.w3.org/check?verbose=1&uri=");
  WebDeveloper.Storage.setItemIfNotSet("tool_4_description", WebDeveloper.Locales.getString("tool_4_description"));
  WebDeveloper.Storage.setItemIfNotSet("tool_4_url", "http://wave.webaim.org/report#/");
  WebDeveloper.Storage.setItemIfNotSet("tool_5_description", WebDeveloper.Locales.getString("tool_5_description"));
  WebDeveloper.Storage.setItemIfNotSet("tool_5_url", "http://validator.w3.org/checklink?check=Check&hide_type=all&summary=on&uri=");
  WebDeveloper.Storage.setItemIfNotSet("tool_6_description", WebDeveloper.Locales.getString("tool_6_description"));
  WebDeveloper.Storage.setItemIfNotSet("tool_6_url", "https://search.google.com/structured-data/testing-tool/u/0/#url=");
  WebDeveloper.Storage.setItemIfNotSet("tool_7_description", WebDeveloper.Locales.getString("tool_7_description"));
  WebDeveloper.Storage.setItemIfNotSet("tool_7_url", "https://search.google.com/test/amp?url=");
  WebDeveloper.Storage.setItemIfNotSet("tool_count", 7);
};

// Upgrades the extension
WebDeveloper.Upgrade.upgrade = function(details)
{
  // If the extension was installed or updated
  if(details.reason === "install" || details.reason === "update")
  {
    WebDeveloper.Upgrade.openUpgradeURL("@version@");

    WebDeveloper.Storage.getItem("version", function(item)
    {
      // If the versions do not match
      if(item != "@version@")
      {
        WebDeveloper.Storage.setItem("version", "@version@");

        WebDeveloper.Upgrade.fixContentSettings();
        WebDeveloper.Upgrade.migrateLegacySettings();
        WebDeveloper.Upgrade.migrateTools();
        WebDeveloper.Upgrade.removeDeletedSettings();
        WebDeveloper.Upgrade.setupDefaultOptions();
      }
    });
  }
};

chrome.runtime.onInstalled.addListener(WebDeveloper.Upgrade.upgrade);
