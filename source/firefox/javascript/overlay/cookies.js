var WebDeveloper = WebDeveloper || {};

WebDeveloper.Overlay         = WebDeveloper.Overlay || {};
WebDeveloper.Overlay.Cookies = WebDeveloper.Overlay.Cookies || {};

// Adds a cookie
WebDeveloper.Overlay.Cookies.addCookie = function()
{
  window.openDialog("chrome://web-developer/content/dialogs/cookie.xul", "web-developer-cookie-dialog", "centerscreen,chrome,modal", "add");
};

// Deletes all the cookies for the current domain
WebDeveloper.Overlay.Cookies.deleteDomainCookies = function()
{
  var allCookies    = WebDeveloper.Cookies.getAllCookies();
  var documents     = WebDeveloper.Content.getDocuments(WebDeveloper.Common.getContentWindow());
  var domainCookies = [];

  // Loop through the documents
  for(var i = 0, l = documents.length; i < l; i++)
  {
    // Try to get the host
    try
    {
      domainCookies = domainCookies.concat(WebDeveloper.Content.filterCookies(allCookies, documents[i].location.hostname, "/", false));
    }
    catch(exception)
    {
      // Ignore
    }
  }

  WebDeveloper.Cookies.deleteDomainCookies(domainCookies);
};

// Deletes all the cookies for the current path
WebDeveloper.Overlay.Cookies.deletePathCookies = function()
{
  var allCookies      = WebDeveloper.Cookies.getAllCookies();
  var contentDocument = null;
  var documents       = WebDeveloper.Content.getDocuments(WebDeveloper.Common.getContentWindow());
  var pathCookies     = [];

  // Loop through the documents
  for(var i = 0, l = documents.length; i < l; i++)
  {
    contentDocument = documents[i];

    // Try to get the host and path
    try
    {
      pathCookies = pathCookies.concat(WebDeveloper.Content.filterCookies(allCookies, contentDocument.location.hostname, contentDocument.location.pathname, false));
    }
    catch(exception)
    {
      // Ignore
    }
  }

  WebDeveloper.Cookies.deleteDomainCookies(pathCookies);
};

// Deletes all session cookies
WebDeveloper.Overlay.Cookies.deleteSessionCookies = function()
{
  WebDeveloper.Cookies.deleteSessionCookies(WebDeveloper.Cookies.getAllCookies());
};

// Toggles cookies
WebDeveloper.Overlay.Cookies.toggleCookies = function(element)
{
  var cookieBehavior = 2;

  // If enabling cookies
  if(WebDeveloper.Common.convertToBoolean(element.getAttribute("checked")))
  {
    cookieBehavior = 0;
  }

  WebDeveloper.Preferences.setIntegerPreference("network.cookie.cookieBehavior", cookieBehavior);
};

// Toggles third-party cookies
WebDeveloper.Overlay.Cookies.toggleThirdPartyCookies = function(element)
{
  var cookieBehavior = 1;

  // If enabling third-party cookies
  if(WebDeveloper.Common.convertToBoolean(element.getAttribute("checked")))
  {
    cookieBehavior = 0;
  }

  WebDeveloper.Preferences.setIntegerPreference("network.cookie.cookieBehavior", cookieBehavior);
};

// Updates the disable cookies menu
WebDeveloper.Overlay.Cookies.updateDisableCookiesMenu = function()
{
  var disableThirdPartyCookiesChecked = false;
  var disableThirdPartyCookiesMenu    = document.getElementById("web-developer-disable-third-party-cookies-command");
  var disableCookiesChecked           = false;
  var disableCookiesPreferenceValue   = WebDeveloper.Preferences.getIntegerPreference("network.cookie.cookieBehavior");

  // If the cookie preference value is set to 2
  if(disableCookiesPreferenceValue == 2)
  {
    disableCookiesChecked = true;
  }
  else if(disableCookiesPreferenceValue == 1)
  {
    disableThirdPartyCookiesChecked = true;
  }

  WebDeveloper.Common.configureElement(document.getElementById("web-developer-disable-all-cookies-command"), "checked", disableCookiesChecked);
  WebDeveloper.Common.configureElement(disableThirdPartyCookiesMenu, "checked", disableThirdPartyCookiesChecked);
  WebDeveloper.Common.configureElement(disableThirdPartyCookiesMenu, "disabled", disableCookiesChecked);
};

// Displays all the cookies for the page
WebDeveloper.Overlay.Cookies.viewCookieInformation = function()
{
  WebDeveloper.Overlay.openGeneratedTab(WebDeveloper.Common.getChromeURL("generated/view-cookie-information.html"), WebDeveloper.Content.getCookies(WebDeveloper.Cookies.getAllCookies()), WebDeveloper.Overlay.Cookies.getViewCookieInformationLocale());
};
