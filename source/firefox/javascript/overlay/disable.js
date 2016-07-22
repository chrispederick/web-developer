var WebDeveloper = WebDeveloper || {}; // eslint-disable-line no-use-before-define

WebDeveloper.Overlay         = WebDeveloper.Overlay || {};
WebDeveloper.Overlay.Disable = WebDeveloper.Overlay.Disable || {};

// Toggles the cache
WebDeveloper.Overlay.Disable.toggleCache = function(element)
{
  WebDeveloper.Preferences.enablePreference(element, "browser.cache.disk.enable");
  WebDeveloper.Preferences.enablePreference(element, "browser.cache.memory.enable");
};

// Toggles the check for newer version of page setting
WebDeveloper.Overlay.Disable.toggleCheckForNewerVersionOfPage = function(frequency)
{
  WebDeveloper.Preferences.setIntegerPreference("browser.cache.check_doc_frequency", frequency);
};

// Toggles DNS cache
WebDeveloper.Overlay.Disable.toggleDNSCache = function(element)
{
  // If enabling the DNS cache
  if(WebDeveloper.Common.convertToBoolean(element.getAttribute("checked")))
  {
    WebDeveloper.Preferences.deletePreference("network.dnsCacheExpiration");
  }
  else
  {
    WebDeveloper.Preferences.setIntegerPreference("network.dnsCacheExpiration", 0);
  }
};

// Toggles Java
WebDeveloper.Overlay.Disable.toggleJava = function(element)
{
  WebDeveloper.Preferences.enablePreference(element, "security.enable_java");
};

// Toggle JavaScript
WebDeveloper.Overlay.Disable.toggleJavaScript = function(element)
{
  var javaScriptButton = document.getElementById("web-developer-javascript-statusbar");

  WebDeveloper.Preferences.enablePreference(element, "javascript.enabled");

  // If the JavaScript button exists
  if(javaScriptButton)
  {
    // If enabling JavaScript
    if(WebDeveloper.Common.convertToBoolean(element.getAttribute("checked")))
    {
      // If the JavaScript button has a class attribute
      if(javaScriptButton.hasAttribute("class"))
      {
        javaScriptButton.removeAttribute("class");
      }

      // If the JavaScript button has a tooltip text attribute
      if(javaScriptButton.hasAttribute("tooltiptext"))
      {
        javaScriptButton.removeAttribute("tooltiptext");
      }
    }
    else
    {
      javaScriptButton.setAttribute("class", "disabled");
      javaScriptButton.setAttribute("tooltiptext", WebDeveloper.Locales.getString("javaScriptDisabledTooltip"));
    }
  }
};

// Toggles meta redirects
WebDeveloper.Overlay.Disable.toggleMetaRedirects = function(element)
{
  var allowMetaRedirects = false;
  var browsers           = WebDeveloper.Common.getTabBrowser().browsers;

  // If the element is checked
  if(WebDeveloper.Common.convertToBoolean(element.getAttribute("checked")))
  {
    allowMetaRedirects = true;
  }

  // Loop through the browsers
  for(var i = 0, l = browsers.length; i < l; i++)
  {
    browsers[i].docShell.allowMetaRedirects = allowMetaRedirects;
  }

  WebDeveloper.Preferences.setExtensionBooleanPreference("meta.redirects.disable", !allowMetaRedirects);
};

// Toggles the minimum font size
WebDeveloper.Overlay.Disable.toggleMinimumFontSize = function(element)
{
  var defaultFontSize = 10;
  var minimumFontSize = null;

  // If enabling the minimum font size
  if(WebDeveloper.Common.convertToBoolean(element.getAttribute("checked")))
  {
    minimumFontSize = WebDeveloper.Preferences.getExtensionIntegerPreference("font.minimum.size");

    // If the minimum font size is not set
    if(minimumFontSize === 0)
    {
      minimumFontSize = defaultFontSize;
    }

    WebDeveloper.Preferences.deleteExtensionPreference("font.minimum.size");
    WebDeveloper.Preferences.setIntegerPreference("font.minimum-size.x-western", minimumFontSize);
  }
  else
  {
    minimumFontSize = WebDeveloper.Preferences.getIntegerPreference("font.minimum-size.x-western");

    // If the minimum font size is not set
    if(minimumFontSize === 0)
    {
      minimumFontSize = defaultFontSize;
    }

    WebDeveloper.Preferences.deletePreference("font.minimum-size.x-western");
    WebDeveloper.Preferences.setExtensionIntegerPreference("font.minimum.size", minimumFontSize);
  }

  BrowserReload();
};

// Toggles the page colors
WebDeveloper.Overlay.Disable.togglePageColors = function(element)
{
  var pageColors = 2;

  // If enabling page colors
  if(WebDeveloper.Common.convertToBoolean(element.getAttribute("checked")))
  {
    pageColors = 0;
  }

  WebDeveloper.Preferences.setIntegerPreference("browser.display.document_color_use", pageColors);
  WebDeveloper.Preferences.enablePreference(element, "browser.display.use_document_colors");
  BrowserReload();
};

// Toggles the proxy settings
WebDeveloper.Overlay.Disable.toggleProxy = function(proxyType)
{
  WebDeveloper.Preferences.setIntegerPreference("network.proxy.type", proxyType);
};

// Toggles referrers
WebDeveloper.Overlay.Disable.toggleReferrers = function(element)
{
  var sendReferrer = 0;

  // If enabling referrers
  if(WebDeveloper.Common.convertToBoolean(element.getAttribute("checked")))
  {
    sendReferrer = 2;
  }

  WebDeveloper.Preferences.setIntegerPreference("network.http.sendRefererHeader", sendReferrer);
};

// Updates the check for newer version of page menu
WebDeveloper.Overlay.Disable.updateCheckForNewerVersionOfPageMenu = function()
{
  var checkForNewerVersionOfPageType = WebDeveloper.Preferences.getIntegerPreference("browser.cache.check_doc_frequency");

  WebDeveloper.Common.configureElement(document.getElementById("web-developer-check-for-newer-version-of-page-when-page-is-out-of-date-command"), "checked", checkForNewerVersionOfPageType == 3);
  WebDeveloper.Common.configureElement(document.getElementById("web-developer-check-for-newer-version-of-page-every-time-command"), "checked", checkForNewerVersionOfPageType == 1);
  WebDeveloper.Common.configureElement(document.getElementById("web-developer-check-for-newer-version-of-page-once-per-session-command"), "checked", checkForNewerVersionOfPageType === 0);
  WebDeveloper.Common.configureElement(document.getElementById("web-developer-never-check-for-newer-version-of-page-command"), "checked", checkForNewerVersionOfPageType == 2);
};

// Updates the disable cache menu
WebDeveloper.Overlay.Disable.updateDisableCacheMenu = function()
{
  var cacheDisabled = !WebDeveloper.Preferences.getBooleanPreference("browser.cache.disk.enable") && !WebDeveloper.Preferences.getBooleanPreference("browser.cache.memory.enable");

  WebDeveloper.Common.configureElement(document.getElementById("web-developer-disable-entire-cache-command"), "checked", cacheDisabled);
  WebDeveloper.Common.configureElement(document.getElementById("web-developer-check-for-newer-version-of-page-command"), "disabled", cacheDisabled);
};

// Updates the disable menu
WebDeveloper.Overlay.Disable.updateDisableMenu = function()
{
  var dnsCacheDisabled   = false;
  var pageColorsDisabled = false;
  var referrersDisabled  = false;

  WebDeveloper.Common.configureElement(document.getElementById("web-developer-disable-java-command"), "checked", !WebDeveloper.Preferences.getBooleanPreference("security.enable_java"));
  WebDeveloper.Common.configureElement(document.getElementById("web-developer-disable-javascript-command"), "checked", !WebDeveloper.Preferences.getBooleanPreference("javascript.enabled"));
  WebDeveloper.Common.configureElement(document.getElementById("web-developer-disable-meta-redirects-command"), "checked", WebDeveloper.Preferences.getExtensionBooleanPreference("meta.redirects.disable"));
  WebDeveloper.Common.configureElement(document.getElementById("web-developer-disable-minimum-font-size-command"), "checked", WebDeveloper.Preferences.getIntegerPreference("font.minimum-size.x-western") === 0);
  WebDeveloper.Common.configureElement(document.getElementById("web-developer-disable-popup-blocker-command"), "checked", !WebDeveloper.Preferences.getBooleanPreference("dom.disable_open_during_load"));

  // If the DNS cache preference is set to 0
  if(WebDeveloper.Preferences.isPreferenceSet("network.dnsCacheExpiration") && WebDeveloper.Preferences.getIntegerPreference("network.dnsCacheExpiration") === 0)
  {
    dnsCacheDisabled = true;
  }

  // If the page colors preference is set to 2 or true
  if(WebDeveloper.Preferences.isPreferenceSet("browser.display.document_color_use") && WebDeveloper.Preferences.getIntegerPreference("browser.display.document_color_use") === 2 || !WebDeveloper.Preferences.getBooleanPreference("browser.display.use_document_colors"))
  {
    pageColorsDisabled = true;
  }

  // If the referrer preference is not set or is set to 0
  if(WebDeveloper.Preferences.isPreferenceSet("network.http.sendRefererHeader") && WebDeveloper.Preferences.getIntegerPreference("network.http.sendRefererHeader") === 0)
  {
    referrersDisabled = true;
  }

  WebDeveloper.Common.configureElement(document.getElementById("web-developer-disable-dns-cache-command"), "checked", dnsCacheDisabled);
  WebDeveloper.Common.configureElement(document.getElementById("web-developer-disable-page-colors-command"), "checked", pageColorsDisabled);
  WebDeveloper.Common.configureElement(document.getElementById("web-developer-disable-referrers-command"), "checked", referrersDisabled);
};

// Updates the disable JavaScript menu
WebDeveloper.Overlay.Disable.updateDisableJavaScriptMenu = function()
{
  WebDeveloper.Common.configureElement(document.getElementById("web-developer-disable-all-javascript-command"), "checked", !WebDeveloper.Preferences.getBooleanPreference("javascript.enabled"));
  WebDeveloper.Common.configureElement(document.getElementById("web-developer-disable-strict-javascript-warnings-command"), "checked", !WebDeveloper.Preferences.getBooleanPreference("javascript.options.strict"));
};

// Updates the disable proxy menu
WebDeveloper.Overlay.Disable.updateDisableProxyMenu = function()
{
  var proxyType = WebDeveloper.Preferences.getIntegerPreference("network.proxy.type");

  WebDeveloper.Common.configureElement(document.getElementById("web-developer-use-auto-detect-proxy-command"), "checked", proxyType == 4);
  WebDeveloper.Common.configureElement(document.getElementById("web-developer-use-configuration-url-proxy-command"), "checked", proxyType == 2);
  WebDeveloper.Common.configureElement(document.getElementById("web-developer-use-manual-proxy-command"), "checked", proxyType == 1);
  WebDeveloper.Common.configureElement(document.getElementById("web-developer-use-no-proxy-command"), "checked", proxyType === 0);
  WebDeveloper.Common.configureElement(document.getElementById("web-developer-use-system-proxy-command"), "checked", proxyType == 5);
};
