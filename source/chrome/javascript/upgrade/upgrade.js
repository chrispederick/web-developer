var WebDeveloper = WebDeveloper || {};

WebDeveloper.Upgrade = WebDeveloper.Upgrade || {};

// Opens the upgrade URL
WebDeveloper.Upgrade.openUpgradeURL = function(version)
{
  chrome.tabs.create({ "url": "@url@/@browser@/installed/" + version.replace(".", "") + "/" });
};

// Sets up the default options
WebDeveloper.Upgrade.setupDefaultOptions = function()
{
  // Advanced
  WebDeveloper.Storage.setItemIfNotSet("populate_email_address", "example@example.com");

  // Colors
  WebDeveloper.Storage.setItemIfNotSet("syntax_highlight_theme", "none");

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
  WebDeveloper.Storage.setItemIfNotSet("tool_1_url", "http://jigsaw.w3.org/css-validator/validator?profile=css21&warning=0&uri=");
  WebDeveloper.Storage.setItemIfNotSet("tool_2_description", WebDeveloper.Locales.getString("tool_2_description"));
  WebDeveloper.Storage.setItemIfNotSet("tool_2_url", "http://validator.w3.org/feed/check.cgi?url=");
  WebDeveloper.Storage.setItemIfNotSet("tool_3_description", WebDeveloper.Locales.getString("tool_3_description"));
  WebDeveloper.Storage.setItemIfNotSet("tool_3_url", "http://validator.w3.org/check?verbose=1&uri=");
  WebDeveloper.Storage.setItemIfNotSet("tool_4_description", WebDeveloper.Locales.getString("tool_4_description"));
  WebDeveloper.Storage.setItemIfNotSet("tool_4_url", "http://validator.w3.org/checklink?check=Check&hide_type=all&summary=on&uri=");
  WebDeveloper.Storage.setItemIfNotSet("tool_5_description", WebDeveloper.Locales.getString("tool_5_description"));
  WebDeveloper.Storage.setItemIfNotSet("tool_5_url", "http://www.cynthiasays.com/mynewtester/cynthia.exe?rptmode=-1&url1=");
  WebDeveloper.Storage.setItemIfNotSet("tool_6_description", WebDeveloper.Locales.getString("tool_6_description"));
  WebDeveloper.Storage.setItemIfNotSet("tool_6_url", "http://www.cynthiasays.com/mynewtester/cynthia.exe?rptmode=2&url1=");
  WebDeveloper.Storage.setItemIfNotSet("tool_count", 6);
};

// Upgrades the extension
WebDeveloper.Upgrade.upgrade = function()
{
  var previousVersion = WebDeveloper.Storage.getItem("version");
  var version         = WebDeveloper.Upgrade.formatVersionNumber("@version@");

  WebDeveloper.Upgrade.setupDefaultOptions();

  // If the versions do not match
  if(previousVersion != version)
  {
    WebDeveloper.Storage.setItem("version", version);
    WebDeveloper.Upgrade.openUpgradeURL(version);
  }
};

WebDeveloper.Upgrade.upgrade();
