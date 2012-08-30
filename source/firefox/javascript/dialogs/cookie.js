var WebDeveloper = WebDeveloper || {};

WebDeveloper.Cookie = WebDeveloper.Cookie || {};

// Handles the cookie dialog being accepted
WebDeveloper.Cookie.accept = function()
{
  var host        = document.getElementById("web-developer-host").value.trim();
  var errors      = "";
  var expires     = document.getElementById("web-developer-expires").value.trim();
  var expiresDate = new Date(expires);
  var name        = document.getElementById("web-developer-name").value.trim();
  var path        = document.getElementById("web-developer-path").value.trim();

  // If the name is empty
  if(!name)
  {
    errors += WebDeveloper.Locales.getString("emptyName") + "\n";
  }

  // If the host is empty
  if(!host)
  {
    errors += WebDeveloper.Locales.getString("emptyHost") + "\n";
  }

  // If the path is empty
  if(!path)
  {
    errors += WebDeveloper.Locales.getString("emptyPath") + "\n";
  }

  // If this is not a session cookie
  if(!document.getElementById("web-developer-session-cookie").checked)
  {
    // If the expires is empty
    if(!expires)
    {
      errors += WebDeveloper.Locales.getString("emptyExpires") + "\n";
    }
    else if(expiresDate && expiresDate == "Invalid Date")
    {
      errors += WebDeveloper.Locales.getString("invalidExpires") + "\n";
    }
  }

  // If there are errors
  if(errors)
  {
    WebDeveloper.Common.displayError(WebDeveloper.Locales.getString("addCookieError"), errors.trim());

    return false;
  }
  else
  {
    var value            = document.getElementById("web-developer-value").value.trim();
    var cookie           = name + "=" + value + ";path=" + path + ";";
    var cookiePreference = WebDeveloper.Preferences.getIntegerPreference("network.cookie.cookieBehavior");
    var scheme           = "http://";
    var secure           = document.getElementById("web-developer-secure-cookie").checked;
    var session          = document.getElementById("web-developer-session-cookie").checked;
    var uri              = null;

    // If the host is a domain
    if(host.charAt(0) == ".")
    {
      cookie += "domain=" + host + ";";
      host    = host.substring(1);
    }

    // If this is not a session cookie
    if(!session)
    {
      cookie += "expires=" + expiresDate.toUTCString() + ";";
    }

    // If the cookie is secure
    if(secure)
    {
      cookie += "secure;";
      scheme  = "https://";
    }

    uri = Components.classes["@mozilla.org/network/io-service;1"].getService(Components.interfaces.nsIIOService).newURI(scheme + host + path, null, null);

    // If the cookie preference is not allowing all cookies
    if(cookiePreference !== 0)
    {
      WebDeveloper.Preferences.setIntegerPreference("network.cookie.cookieBehavior", 0);
    }

    Components.classes["@mozilla.org/cookieService;1"].getService().QueryInterface(Components.interfaces.nsICookieService).setCookieString(uri, null, cookie.substring(0, cookie.length - 1), null);

    // If the cookie preference was not allowing all cookies
    if(cookiePreference !== 0)
    {
      WebDeveloper.Preferences.setIntegerPreference("network.cookie.cookieBehavior", cookiePreference);
    }
  }

  return true;
};

// Initializes the cookie dialog
WebDeveloper.Cookie.initialize = function()
{
  var date = new Date();
  var url  = Components.classes["@mozilla.org/network/standard-url;1"].createInstance(Components.interfaces.nsIURL);

  url.spec = WebDeveloper.Common.getContentDocument().documentURI;

  date.setDate(date.getDate() + 1);

  document.getElementById("web-developer-expires").value = date.toUTCString();
  document.getElementById("web-developer-host").value    = url.host;
  document.getElementById("web-developer-path").value    = url.path;
};

// Updates the expiry status
WebDeveloper.Cookie.updateExpiryStatus = function()
{
  var expires = document.getElementById("web-developer-expires");

  // If session cookie is checked
  if(document.getElementById("web-developer-session-cookie").checked)
  {
    expires.disabled = true;
    expires.value    = "";
  }
  else
  {
    var date = new Date();

    date.setDate(date.getDate() + 1);

    expires.disabled = false;
    expires.value    = date.toUTCString();
  }
};
