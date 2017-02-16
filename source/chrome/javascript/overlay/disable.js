var WebDeveloper = WebDeveloper || {}; // eslint-disable-line no-use-before-define

WebDeveloper.Overlay         = WebDeveloper.Overlay || {};
WebDeveloper.Overlay.Disable = WebDeveloper.Overlay.Disable || {};

$(function()
{
  var disableJavaScriptMenu    = $("#disable-javascript");
  var disableNotificationsMenu = $("#disable-notifications");
  var disablePluginsMenu       = $("#disable-plugins");
  var disablePopupsMenu        = $("#disable-popups");

  disableJavaScriptMenu.append(WebDeveloper.Locales.getString("disableJavaScript")).on("click", WebDeveloper.Overlay.Disable.toggleJavaScript);
  disableNotificationsMenu.append(WebDeveloper.Locales.getString("disableNotifications")).on("click", WebDeveloper.Overlay.Disable.toggleNotifications);
  disablePluginsMenu.append(WebDeveloper.Locales.getString("disablePlugins")).on("click", WebDeveloper.Overlay.Disable.togglePlugins);
  disablePopupsMenu.append(WebDeveloper.Locales.getString("disablePopups")).on("click", WebDeveloper.Overlay.Disable.togglePopups);
  $("#reset-disable-features").append(WebDeveloper.Locales.getString("resetDisableFeatures")).on("click", WebDeveloper.Overlay.Disable.resetFeatures);

  WebDeveloper.Overlay.updateContentSettingMenu(disableJavaScriptMenu, "javascript");
  WebDeveloper.Overlay.updateContentSettingMenu(disableNotificationsMenu, "notifications");
  WebDeveloper.Overlay.updateContentSettingMenu(disablePluginsMenu, "plugins");
  WebDeveloper.Overlay.updateContentSettingMenu(disablePopupsMenu, "popups");
});

// Resets the disable features
WebDeveloper.Overlay.Disable.resetFeatures = function()
{
  chrome.contentSettings.cookies.clear({});
  chrome.contentSettings.images.clear({});
  chrome.contentSettings.javascript.clear({});
  chrome.contentSettings.notifications.clear({});
  chrome.contentSettings.plugins.clear({});
  chrome.contentSettings.popups.clear({});

  WebDeveloper.Overlay.updateContentSettingMenu($("#disable-javascript"), "javascript");
  WebDeveloper.Overlay.updateContentSettingMenu($("#disable-notifications"), "notifications");
  WebDeveloper.Overlay.updateContentSettingMenu($("#disable-plugins"), "plugins");
  WebDeveloper.Overlay.updateContentSettingMenu($("#disable-popups"), "popups");

  WebDeveloper.Overlay.displayNotification(WebDeveloper.Locales.getString("resetDisableFeaturesResult"));
};

// Toggles JavaScript
WebDeveloper.Overlay.Disable.toggleJavaScript = function()
{
  WebDeveloper.Overlay.toggleContentSetting("javascript", $(this), "enableJavaScriptResult", "disableJavaScriptResult");
};

// Toggles notifications
WebDeveloper.Overlay.Disable.toggleNotifications = function()
{
  WebDeveloper.Overlay.toggleContentSetting("notifications", $(this), "enableNotificationsResult", "disableNotificationsResult");
};

// Toggles plugins
WebDeveloper.Overlay.Disable.togglePlugins = function()
{
  WebDeveloper.Overlay.toggleContentSetting("plugins", $(this), "enablePluginsResult", "disablePluginsResult");
};

// Toggles popups
WebDeveloper.Overlay.Disable.togglePopups = function()
{
  WebDeveloper.Overlay.toggleContentSetting("popups", $(this), "enablePopupsResult", "disablePopupsResult");
};
