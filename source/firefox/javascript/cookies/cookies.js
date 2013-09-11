var WebDeveloper = WebDeveloper || {};

WebDeveloper.Cookies = WebDeveloper.Cookies || {};

// Adds a cookie
WebDeveloper.Cookies.addCookie = function(cookie)
{
  var path             = cookie.path.trim();
  var cookieString     = cookie.name.trim() + "=" + cookie.value.trim() + ";path=" + path + ";";
  var cookiePreference = WebDeveloper.Preferences.getIntegerPreference("network.cookie.cookieBehavior");
  var host             = cookie.host.trim();
  var scheme           = "http://";
  var uri              = null;

  // If the host is a domain
  if(host.charAt(0) == ".")
  {
    cookieString += "domain=" + host + ";";
    host          = host.substring(1);
  }

  // If this is not a session cookie
  if(!cookie.session)
  {
    cookieString += "expires=" + new Date(cookie.expires.trim()).toUTCString() + ";";
  }

  // If the cookie is secure
  if(cookie.secure)
  {
    cookieString += "secure;";
    scheme        = "https://";
  }

  uri = Components.classes["@mozilla.org/network/io-service;1"].getService(Components.interfaces.nsIIOService).newURI(scheme + host + path, null, null);

  // If the cookie preference is not allowing all cookies
  if(cookiePreference !== 0)
  {
    WebDeveloper.Preferences.setIntegerPreference("network.cookie.cookieBehavior", 0);
  }

  Components.classes["@mozilla.org/cookieService;1"].getService().QueryInterface(Components.interfaces.nsICookieService).setCookieString(uri, null, cookieString.substring(0, cookieString.length - 1), null);

  // If the cookie preference was not allowing all cookies
  if(cookiePreference !== 0)
  {
    WebDeveloper.Preferences.setIntegerPreference("network.cookie.cookieBehavior", cookiePreference);
  }
};

// Returns true if you can edit a local cookie
WebDeveloper.Cookies.canEditLocalCookie = function()
{
  return true;
};

// Deletes a cookie
WebDeveloper.Cookies.deleteCookie = function(cookie)
{
  Components.classes["@mozilla.org/cookiemanager;1"].getService(Components.interfaces.nsICookieManager2).remove(cookie.host, cookie.name, cookie.path, false);
};

// Returns all cookies
WebDeveloper.Cookies.getAllCookies = function()
{
  var allCookies        = [];
  var cookie            = null;
  var cookieEnumeration = Components.classes["@mozilla.org/cookiemanager;1"].getService(Components.interfaces.nsICookieManager2).enumerator;
  var cookieObject      = null;

  // Loop through the cookies
  while(cookieEnumeration.hasMoreElements())
  {
    cookie       = {};
    cookieObject = cookieEnumeration.getNext().QueryInterface(Components.interfaces.nsICookie2);

    cookie.expires  = cookieObject.expires;
    cookie.host     = cookieObject.host;
    cookie.httpOnly = cookieObject.isHttpOnly;
    cookie.name     = cookieObject.name;
    cookie.path     = cookieObject.path;
    cookie.secure   = cookieObject.isSecure;
    cookie.session  = cookieObject.isSession;
    cookie.value    = cookieObject.value;

    allCookies.push(cookie);
  }

  return allCookies;
};
