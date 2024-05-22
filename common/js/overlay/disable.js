var WebDeveloper = WebDeveloper || {}; // eslint-disable-line no-redeclare, no-use-before-define

WebDeveloper.Overlay         = WebDeveloper.Overlay || {};
WebDeveloper.Overlay.Disable = WebDeveloper.Overlay.Disable || {};

// Initializes the disable overlay
WebDeveloper.Overlay.Disable.initialize = function()
{
  var disableJavaScriptMenu    = document.getElementById("disable-javascript");
  var disableNotificationsMenu = document.getElementById("disable-notifications");
  var disablePopupsMenu        = document.getElementById("disable-popups");
  var resetDisableFeaturesMenu = document.getElementById("reset-disable-features");

  disableJavaScriptMenu.appendChild(document.createTextNode(WebDeveloper.Locales.getString("disableJavaScript")));
  disableNotificationsMenu.appendChild(document.createTextNode(WebDeveloper.Locales.getString("disableNotifications")));
  disablePopupsMenu.appendChild(document.createTextNode(WebDeveloper.Locales.getString("disablePopups")));
  resetDisableFeaturesMenu.appendChild(document.createTextNode(WebDeveloper.Locales.getString("resetDisableFeatures")));

  disableJavaScriptMenu.addEventListener("click", WebDeveloper.Overlay.Disable.toggleJavaScript);
  disableNotificationsMenu.addEventListener("click", WebDeveloper.Overlay.Disable.toggleNotifications);
  disablePopupsMenu.addEventListener("click", WebDeveloper.Overlay.Disable.togglePopups);
  resetDisableFeaturesMenu.addEventListener("click", WebDeveloper.Overlay.Disable.resetFeatures);

  WebDeveloper.Overlay.updateContentSettingMenu(disableJavaScriptMenu, "javascript");
  WebDeveloper.Overlay.updateContentSettingMenu(disableNotificationsMenu, "notifications");
  WebDeveloper.Overlay.updateContentSettingMenu(disablePopupsMenu, "popups");
};

// Resets the disable features
WebDeveloper.Overlay.Disable.resetFeatures = function()
{
  chrome.contentSettings.cookies.clear({});
  chrome.contentSettings.images.clear({});
  chrome.contentSettings.javascript.clear({});
  chrome.contentSettings.notifications.clear({});
  chrome.contentSettings.popups.clear({});

  WebDeveloper.Overlay.updateContentSettingMenu(document.getElementById("disable-javascript"), "javascript");
  WebDeveloper.Overlay.updateContentSettingMenu(document.getElementById("disable-notifications"), "notifications");
  WebDeveloper.Overlay.updateContentSettingMenu(document.getElementById("disable-popups"), "popups");

  WebDeveloper.Overlay.displayNotification(WebDeveloper.Locales.getString("resetDisableFeaturesResult"));
};

// Toggles JavaScript
WebDeveloper.Overlay.Disable.toggleJavaScript = function()
{
  WebDeveloper.Overlay.toggleContentSetting("javascript", this, "enableJavaScriptResult", "disableJavaScriptResult");
};

// Toggles notifications
WebDeveloper.Overlay.Disable.toggleNotifications = function()
{
  WebDeveloper.Overlay.toggleContentSetting("notifications", this, "enableNotificationsResult", "disableNotificationsResult");
};

// Toggles popups
WebDeveloper.Overlay.Disable.togglePopups = function()
{
  WebDeveloper.Overlay.toggleContentSetting("popups", this, "enablePopupsResult", "disablePopupsResult");
};

// If the document is still loading
if(document.readyState === "loading")
{
  document.addEventListener("DOMContentLoaded", WebDeveloper.Overlay.Disable.initialize);
}
else
{
  WebDeveloper.Overlay.Disable.initialize();
}
