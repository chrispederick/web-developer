var WebDeveloper = WebDeveloper || {}; // eslint-disable-line no-redeclare, no-use-before-define

WebDeveloper.Overlay         = WebDeveloper.Overlay || {};
WebDeveloper.Overlay.Cookies = WebDeveloper.Overlay.Cookies || {};

// Adds a cookie
WebDeveloper.Overlay.Cookies.addCookie = function()
{
  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      chrome.tabs.sendMessage(tab.id, { type: "get-location-details" }, function(response)
      {
        WebDeveloper.Overlay.Cookies.resetAddDialog(response);
        WebDeveloper.Overlay.closeConfirmation();
        WebDeveloper.Overlay.closeNotification();
        document.querySelector(".tab-content").classList.add("d-none");
        document.getElementById("add-cookie-dialog").classList.remove("d-none");
        document.getElementById("add-cookie-name").focus();
      });
    }
  });
};

// Handles a key press when adding a cookie
WebDeveloper.Overlay.Cookies.addCookieKeyPress = function(event)
{
  // If the enter key was pressed
  if(event.keyCode == 13)
  {
    WebDeveloper.Overlay.Cookies.submitAddCookie();
  }
};

// Cancels adding a cookie
WebDeveloper.Overlay.Cookies.cancelAddCookie = function()
{
  document.getElementById("add-cookie-dialog").classList.add("d-none");
  document.querySelector(".tab-content").classList.remove("d-none");
};

// Handles the cookie session setting being changed
WebDeveloper.Overlay.Cookies.changeSession = function()
{
  var addCookieExpires = document.getElementById("add-cookie-expires");

  // If the session setting is checked
  if(document.getElementById("add-cookie-session").checked)
  {
    addCookieExpires.disabled = true;
    addCookieExpires.value    = "";

    addCookieExpires.setAttribute("placeholder", "");
  }
  else
  {
    addCookieExpires.disabled = false;
    addCookieExpires.value    = WebDeveloper.Cookies.getDateTomorrow();

    addCookieExpires.setAttribute("placeholder", WebDeveloper.Locales.getString("expiresPlaceholder"));
  }
};

// Converts an array of cookies
WebDeveloper.Overlay.Cookies.convertCookies = function(cookies)
{
  var convertedCookies = [];
  var cookie           = null;
  var cookieObject     = null;

  // Loop through the cookies
  for(var i = 0, l = cookies.length; i < l; i++)
  {
    cookie       = {};
    cookieObject = cookies[i];

    cookie.expires  = cookieObject.expirationDate;
    cookie.host     = cookieObject.domain;
    cookie.httpOnly = cookieObject.httpOnly;
    cookie.name     = cookieObject.name;
    cookie.path     = cookieObject.path;
    cookie.secure   = cookieObject.secure;
    cookie.session  = cookieObject.session;
    cookie.value    = cookieObject.value;

    convertedCookies.push(cookie);
  }

  return convertedCookies;
};

// Deletes all the cookies for the current domain
WebDeveloper.Overlay.Cookies.deleteDomainCookies = function()
{
  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      chrome.cookies.getAll({}, function(allCookies)
      {
        chrome.tabs.sendMessage(tab.id, { allCookies: WebDeveloper.Overlay.Cookies.convertCookies(allCookies), type: "get-domain-cookies" }, function(cookies)
        {
          WebDeveloper.Cookies.deleteDomainCookies(cookies);
        });
      });
    }
  });
};

// Deletes all the cookies for the current path
WebDeveloper.Overlay.Cookies.deletePathCookies = function()
{
  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      chrome.cookies.getAll({}, function(allCookies)
      {
        chrome.tabs.sendMessage(tab.id, { allCookies: WebDeveloper.Overlay.Cookies.convertCookies(allCookies), type: "get-path-cookies" }, function(cookies)
        {
          WebDeveloper.Cookies.deletePathCookies(cookies);
        });
      });
    }
  });
};

// Deletes all session cookies
WebDeveloper.Overlay.Cookies.deleteSessionCookies = function()
{
  chrome.cookies.getAll({}, function(allCookies)
  {
    WebDeveloper.Cookies.deleteSessionCookies(WebDeveloper.Overlay.Cookies.convertCookies(allCookies));
  });
};

// Returns the locale for the view cookie information feature
WebDeveloper.Overlay.Cookies.getViewCookieInformationLocale = function()
{
  var locale = WebDeveloper.Locales.setupGeneratedLocale();

  locale.atEndOfSession             = WebDeveloper.Locales.getString("atEndOfSession");
  locale.cancel                     = WebDeveloper.Locales.getString("cancel");
  locale.cannotEditHTTPOnlyCookies  = WebDeveloper.Locales.getString("cannotEditHTTPOnlyCookies");
  locale.cannotEditLocalhostCookies = WebDeveloper.Locales.getString("cannotEditLocalhostCookies");
  locale.cookie                     = WebDeveloper.Locales.getString("cookie");
  locale.cookieDeleted              = WebDeveloper.Locales.getString("cookieDeleted");
  locale.cookieEdited               = WebDeveloper.Locales.getString("cookieEdited");
  locale.cookieInformation          = WebDeveloper.Locales.getString("cookieInformation");
  locale.cookies                    = WebDeveloper.Locales.getString("cookies");
  locale.deleteConfirmation         = WebDeveloper.Locales.getString("deleteConfirmation");
  locale.deleteCookie               = WebDeveloper.Locales.getString("deleteCookie");
  locale.deleteCookieConfirmation   = WebDeveloper.Locales.getString("deleteCookieConfirmation");
  locale.deleteLabel                = WebDeveloper.Locales.getString("delete");
  locale.edit                       = WebDeveloper.Locales.getString("edit");
  locale.editCookie                 = WebDeveloper.Locales.getString("editCookie");
  locale.expires                    = WebDeveloper.Locales.getString("expires");
  locale.expiresCannotBeEmpty       = WebDeveloper.Locales.getString("expiresCannotBeEmpty");
  locale.expiresNotValid            = WebDeveloper.Locales.getString("expiresNotValid");
  locale.expiresPlaceholder         = WebDeveloper.Locales.getString("expiresPlaceholder");
  locale.extensionName              = WebDeveloper.Locales.getString("extensionName");
  locale.host                       = WebDeveloper.Locales.getString("host");
  locale.hostCannotBeEmpty          = WebDeveloper.Locales.getString("hostCannotBeEmpty");
  locale.hostPlaceholder            = WebDeveloper.Locales.getString("hostPlaceholder");
  locale.httpOnly                   = WebDeveloper.Locales.getString("httpOnly");
  locale.name                       = WebDeveloper.Locales.getString("name");
  locale.nameCannotBeEmpty          = WebDeveloper.Locales.getString("nameCannotBeEmpty");
  locale.namePlaceholder            = WebDeveloper.Locales.getString("namePlaceholder");
  locale.no                         = WebDeveloper.Locales.getString("no");
  locale.path                       = WebDeveloper.Locales.getString("path");
  locale.pathCannotBeEmpty          = WebDeveloper.Locales.getString("pathCannotBeEmpty");
  locale.pathPlaceholder            = WebDeveloper.Locales.getString("pathPlaceholder");
  locale.save                       = WebDeveloper.Locales.getString("save");
  locale.secure                     = WebDeveloper.Locales.getString("secure");
  locale.secureCookie               = WebDeveloper.Locales.getString("secureCookie");
  locale.sessionCookie              = WebDeveloper.Locales.getString("sessionCookie");
  locale.value                      = WebDeveloper.Locales.getString("value");
  locale.valuePlaceholder           = WebDeveloper.Locales.getString("valuePlaceholder");
  locale.yes                        = WebDeveloper.Locales.getString("yes");

  return locale;
};

// Initializes the cookies overlay
WebDeveloper.Overlay.Cookies.initialize = function()
{
  var addCookieCancel           = document.getElementById("add-cookie-cancel");
  var addCookieDialog           = document.getElementById("add-cookie-dialog");
  var addCookieExpires          = document.getElementById("add-cookie-expires");
  var addCookieHost             = document.getElementById("add-cookie-host");
  var addCookieMenu             = document.getElementById("add-cookie");
  var addCookieName             = document.getElementById("add-cookie-name");
  var addCookiePath             = document.getElementById("add-cookie-path");
  var addCookieSubmit           = document.getElementById("add-cookie-submit");
  var addCookieValue            = document.getElementById("add-cookie-value");
  var deleteDomainCookiesMenu   = document.getElementById("delete-domain-cookies");
  var deletePathCookiesMenu     = document.getElementById("delete-path-cookies");
  var deleteSessionCookiesMenu  = document.getElementById("delete-session-cookies");
  var disableCookiesMenu        = document.getElementById("disable-cookies");
  var viewCookieInformationMenu = document.getElementById("view-cookie-information");

  document.querySelector('[for="add-cookie-expires"]').append(WebDeveloper.Locales.getString("expires"));
  document.querySelector('[for="add-cookie-host"]').append(WebDeveloper.Locales.getString("host"));
  document.querySelector('[for="add-cookie-name"]').append(WebDeveloper.Locales.getString("name"));
  document.querySelector('[for="add-cookie-path"]').append(WebDeveloper.Locales.getString("path"));
  document.querySelector('[for="add-cookie-secure"]').append(WebDeveloper.Locales.getString("secureCookie"));
  document.querySelector('[for="add-cookie-session"]').append(WebDeveloper.Locales.getString("sessionCookie"));
  document.querySelector('[for="add-cookie-value"]').append(WebDeveloper.Locales.getString("value"));
  addCookieCancel.append(WebDeveloper.Locales.getString("cancel"));
  addCookieDialog.querySelector("legend").append(WebDeveloper.Locales.getString("addCookie"));
  addCookieMenu.append(WebDeveloper.Locales.getString("addCookieMenu"));
  addCookieSubmit.append(WebDeveloper.Locales.getString("add"));
  deleteDomainCookiesMenu.append(WebDeveloper.Locales.getString("deleteDomainCookies"));
  deletePathCookiesMenu.append(WebDeveloper.Locales.getString("deletePathCookies"));
  deleteSessionCookiesMenu.append(WebDeveloper.Locales.getString("deleteSessionCookies"));
  disableCookiesMenu.append(WebDeveloper.Locales.getString("disableCookies"));
  viewCookieInformationMenu.append(WebDeveloper.Locales.getString("viewCookieInformation"));

  addCookieExpires.setAttribute("placeholder", WebDeveloper.Locales.getString("expiresPlaceholder"));
  addCookieHost.setAttribute("placeholder", WebDeveloper.Locales.getString("hostPlaceholder"));
  addCookieName.setAttribute("placeholder", WebDeveloper.Locales.getString("namePlaceholder"));
  addCookiePath.setAttribute("placeholder", WebDeveloper.Locales.getString("pathPlaceholder"));
  addCookieValue.setAttribute("placeholder", WebDeveloper.Locales.getString("valuePlaceholder"));

  document.getElementById("add-cookie-session").addEventListener("change", WebDeveloper.Overlay.Cookies.changeSession);
  addCookieCancel.addEventListener("click", WebDeveloper.Overlay.Cookies.cancelAddCookie);
  addCookieDialog.addEventListener("submit", function(event) { event.preventDefault(); });
  addCookieExpires.addEventListener("keypress", WebDeveloper.Overlay.Cookies.addCookieKeyPress);
  addCookieHost.addEventListener("keypress", WebDeveloper.Overlay.Cookies.addCookieKeyPress);
  addCookieMenu.addEventListener("click", WebDeveloper.Overlay.Cookies.addCookie);
  addCookieName.addEventListener("keypress", WebDeveloper.Overlay.Cookies.addCookieKeyPress);
  addCookiePath.addEventListener("keypress", WebDeveloper.Overlay.Cookies.addCookieKeyPress);
  addCookieSubmit.addEventListener("click", WebDeveloper.Overlay.Cookies.submitAddCookie);
  addCookieValue.addEventListener("keypress", WebDeveloper.Overlay.Cookies.addCookieKeyPress);
  deleteDomainCookiesMenu.addEventListener("click", WebDeveloper.Overlay.Cookies.deleteDomainCookies);
  deletePathCookiesMenu.addEventListener("click", WebDeveloper.Overlay.Cookies.deletePathCookies);
  deleteSessionCookiesMenu.addEventListener("click", WebDeveloper.Overlay.Cookies.deleteSessionCookies);
  disableCookiesMenu.addEventListener("click", WebDeveloper.Overlay.Cookies.toggleCookies);
  viewCookieInformationMenu.addEventListener("click", WebDeveloper.Overlay.Cookies.viewCookieInformation);

  WebDeveloper.Overlay.updateContentSettingMenu(disableCookiesMenu, "cookies");
};

// Populates a cookie from a dialog
WebDeveloper.Overlay.Cookies.populateCookieFromDialog = function()
{
  var cookie = {};

  cookie.host  = document.getElementById("add-cookie-host").value.trim();
  cookie.name  = document.getElementById("add-cookie-name").value.trim();
  cookie.path  = document.getElementById("add-cookie-path").value.trim();
  cookie.value = document.getElementById("add-cookie-value").value;

  // If the cookie is secure
  if(document.getElementById("add-cookie-secure").checked)
  {
    cookie.secure = true;
  }

  // If the cookie is a session cookie
  if(document.getElementById("add-cookie-session").checked)
  {
    cookie.session = true;
  }
  else
  {
    cookie.expires = document.getElementById("add-cookie-expires").value.trim();
  }

  return cookie;
};

// Resets the add cookie dialog
WebDeveloper.Overlay.Cookies.resetAddDialog = function(response)
{
  var addCookieExpires = document.getElementById("add-cookie-expires");
  var addCookieHost    = document.getElementById("add-cookie-host");
  var addCookieName    = document.getElementById("add-cookie-name");
  var addCookiePath    = document.getElementById("add-cookie-path");

  addCookieExpires.disabled                         = false;
  addCookieExpires.value                            = WebDeveloper.Cookies.getDateTomorrow();
  addCookieHost.value                               = response.host;
  addCookieName.value                               = "";
  addCookiePath.value                               = response.path;
  document.getElementById("add-cookie-value").value = "";

  addCookieExpires.setAttribute("placeholder", WebDeveloper.Locales.getString("expiresPlaceholder"));

  addCookieExpires.classList.remove("is-invalid");
  addCookieHost.classList.remove("is-invalid");
  addCookieName.classList.remove("is-invalid");
  addCookiePath.classList.remove("is-invalid");
};

// Adds a cookie
WebDeveloper.Overlay.Cookies.submitAddCookie = function()
{
  // If the dialog is valid
  if(WebDeveloper.Overlay.Cookies.validateAddDialog())
  {
    var cookie = WebDeveloper.Overlay.Cookies.populateCookieFromDialog();

    WebDeveloper.Cookies.addCookie(cookie);
    WebDeveloper.Overlay.Cookies.cancelAddCookie();
    WebDeveloper.Overlay.displayNotification(WebDeveloper.Locales.getFormattedString("cookieAdded", [cookie.name]));
  }
};

// Toggles cookies
WebDeveloper.Overlay.Cookies.toggleCookies = function()
{
  WebDeveloper.Overlay.toggleContentSetting("cookies", this, "enableCookiesResult", "disableCookiesResult");
};

// Returns true if the add dialog is valid
WebDeveloper.Overlay.Cookies.validateAddDialog = function()
{
  var host      = document.getElementById("add-cookie-host");
  var hostValue = host.value.trim();
  var name      = document.getElementById("add-cookie-name");
  var path      = document.getElementById("add-cookie-path");
  var valid     = true;

  // If the cookie name is not set
  if(name.value.trim() == "")
  {
    document.getElementById("add-cookie-name-invalid").replaceChildren(WebDeveloper.Locales.getString("nameCannotBeEmpty"));
    name.classList.add("is-invalid");

    valid = false;
  }
  else
  {
    name.classList.remove("is-invalid");
  }

  // If the cookie host is not set
  if(hostValue == "")
  {
    document.getElementById("add-cookie-host-invalid").replaceChildren(WebDeveloper.Locales.getString("hostCannotBeEmpty"));
    host.classList.add("is-invalid");

    valid = false;
  }
  else if(hostValue == "localhost" || hostValue == ".localhost")
  {
    var hostInvalid = document.getElementById("add-cookie-host-invalid");

    // Host cannot be localhost error message contains HTML
    hostInvalid.replaceChildren();
    hostInvalid.insertAdjacentHTML("beforeend", DOMPurify.sanitize(WebDeveloper.Locales.getString("extensionName") + " " + WebDeveloper.Locales.getString("hostCannotBeLocalhost")));
    host.classList.add("is-invalid");

    valid = false;
  }
  else
  {
    host.classList.remove("is-invalid");
  }

  // If the cookie path is not set
  if(path.value.trim() == "")
  {
    document.getElementById("add-cookie-path-invalid").replaceChildren(WebDeveloper.Locales.getString("pathCannotBeEmpty"));
    path.classList.add("is-invalid");

    valid = false;
  }
  else
  {
    path.classList.remove("is-invalid");
  }

  // If the cookie is not a session cookie
  if(!document.getElementById("add-cookie-session").checked)
  {
    var expires      = document.getElementById("add-cookie-expires");
    var expiresValue = expires.value.trim();

    // If the cookie expires is not set
    if(expiresValue == "")
    {
      document.getElementById("add-cookie-expires-invalid").replaceChildren(WebDeveloper.Locales.getString("expiresCannotBeEmpty"));
      expires.classList.add("is-invalid");

      valid = false;
    }
    else if(new Date(expiresValue) == "Invalid Date")
    {
      document.getElementById("add-cookie-expires-invalid").replaceChildren(WebDeveloper.Locales.getString("expiresNotValid"));
      expires.classList.add("is-invalid");

      valid = false;
    }
    else
    {
      expires.classList.remove("is-invalid");
    }
  }

  return valid;
};

// Displays all the cookies for the page
WebDeveloper.Overlay.Cookies.viewCookieInformation = function()
{
  WebDeveloper.Overlay.getSelectedTab(function(tab)
  {
    // If the tab is valid
    if(WebDeveloper.Overlay.isValidTab(tab))
    {
      chrome.cookies.getAll({}, function(allCookies)
      {
        chrome.tabs.sendMessage(tab.id, { allCookies: WebDeveloper.Overlay.Cookies.convertCookies(allCookies), type: "get-cookies" }, function(data)
        {
          WebDeveloper.Overlay.openGeneratedTab(chrome.runtime.getURL("/generated/view-cookie-information.html"), tab.index, data, WebDeveloper.Overlay.Cookies.getViewCookieInformationLocale());
        });
      });
    }
  });
};

// If the document is still loading
if(document.readyState === "loading")
{
  document.addEventListener("DOMContentLoaded", WebDeveloper.Overlay.Cookies.initialize);
}
else
{
  WebDeveloper.Overlay.Cookies.initialize();
}
