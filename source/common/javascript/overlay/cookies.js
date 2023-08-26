var WebDeveloper = WebDeveloper || {}; // eslint-disable-line no-redeclare, no-use-before-define

WebDeveloper.Overlay         = WebDeveloper.Overlay || {};
WebDeveloper.Overlay.Cookies = WebDeveloper.Overlay.Cookies || {};

$(function()
{
  var addCookieExpires   = $("#add-cookie-expires");
  var addCookieHost      = $("#add-cookie-host");
  var addCookieName      = $("#add-cookie-name");
  var addCookiePath      = $("#add-cookie-path");
  var addCookieValue     = $("#add-cookie-value");
  var disableCookiesMenu = $("#disable-cookies");

  disableCookiesMenu.append(WebDeveloper.Locales.getString("disableCookies")).on("click", WebDeveloper.Overlay.Cookies.toggleCookies);
  $("#add-cookie").append(WebDeveloper.Locales.getString("addCookieMenu")).on("click", WebDeveloper.Overlay.Cookies.addCookie);
  $("#delete-domain-cookies").append(WebDeveloper.Locales.getString("deleteDomainCookies")).on("click", WebDeveloper.Overlay.Cookies.deleteDomainCookies);
  $("#delete-path-cookies").append(WebDeveloper.Locales.getString("deletePathCookies")).on("click", WebDeveloper.Overlay.Cookies.deletePathCookies);
  $("#delete-session-cookies").append(WebDeveloper.Locales.getString("deleteSessionCookies")).on("click", WebDeveloper.Overlay.Cookies.deleteSessionCookies);
  $("#view-cookie-information").append(WebDeveloper.Locales.getString("viewCookieInformation")).on("click", WebDeveloper.Overlay.Cookies.viewCookieInformation);

  $("#add-cookie-cancel").on("click", WebDeveloper.Overlay.Cookies.cancelAddCookie);
  $("#add-cookie-dialog").on("submit", function(event) { event.preventDefault(); });
  $("#add-cookie-submit").on("click", WebDeveloper.Overlay.Cookies.submitAddCookie);

  $("legend", $("#add-cookie-dialog")).text(WebDeveloper.Locales.getString("addCookie"));
  $("#add-cookie-cancel").text(WebDeveloper.Locales.getString("cancel"));
  $("#add-cookie-secure").after(WebDeveloper.Locales.getString("secureCookie"));
  $("#add-cookie-session").after(WebDeveloper.Locales.getString("sessionCookie")).on("change", WebDeveloper.Overlay.Cookies.changeSession);
  $("#add-cookie-submit").append(WebDeveloper.Locales.getString("add"));
  $('[for="add-cookie-expires"]').text(WebDeveloper.Locales.getString("expires"));
  $('[for="add-cookie-host"]').text(WebDeveloper.Locales.getString("host"));
  $('[for="add-cookie-name"]').text(WebDeveloper.Locales.getString("name"));
  $('[for="add-cookie-path"]').text(WebDeveloper.Locales.getString("path"));
  $('[for="add-cookie-value"]').text(WebDeveloper.Locales.getString("value"));

  addCookieExpires.attr("placeholder", WebDeveloper.Locales.getString("expiresPlaceholder"));
  addCookieHost.attr("placeholder", WebDeveloper.Locales.getString("hostPlaceholder"));
  addCookieName.attr("placeholder", WebDeveloper.Locales.getString("namePlaceholder"));
  addCookiePath.attr("placeholder", WebDeveloper.Locales.getString("pathPlaceholder"));
  addCookieValue.attr("placeholder", WebDeveloper.Locales.getString("valuePlaceholder"));
  addCookieExpires.add(addCookieHost).add(addCookieName).add(addCookiePath).add(addCookieValue).on("keypress", WebDeveloper.Overlay.Cookies.addCookieKeyPress);

  WebDeveloper.Overlay.updateContentSettingMenu(disableCookiesMenu, "cookies");
});

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
        var addCookieDialog = $("#add-cookie-dialog");

        $("#add-cookie-expires").val(WebDeveloper.Cookies.getDateTomorrow()).prop("disabled", false);
        $("#add-cookie-host").val(response.host);
        $("#add-cookie-path").val(response.path);
        $("#add-cookie-value").focus();

        WebDeveloper.Overlay.Cookies.resetAddDialog(addCookieDialog);

        $(".tabbable, #confirmation, #notification").slideUp(WebDeveloper.Overlay.animationSpeed, function()
        {
          addCookieDialog.slideDown(WebDeveloper.Overlay.animationSpeed);
        });
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
  $("#add-cookie-dialog").slideUp(WebDeveloper.Overlay.animationSpeed, function()
  {
    $(".tabbable").slideDown(WebDeveloper.Overlay.animationSpeed);
  });
};

// Handles the cookie session setting being changed
WebDeveloper.Overlay.Cookies.changeSession = function()
{
  var session = $(this);

  // If the session setting is checked
  if(session.prop("checked"))
  {
    $("#add-cookie-expires").val("").prop("disabled", true);
  }
  else
  {
    $("#add-cookie-expires").val(WebDeveloper.Cookies.getDateTomorrow()).prop("disabled", false);
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
  locale.cannotEdit                 = WebDeveloper.Locales.getString("cannotEdit");
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
  locale.property                   = WebDeveloper.Locales.getString("property");
  locale.save                       = WebDeveloper.Locales.getString("save");
  locale.secure                     = WebDeveloper.Locales.getString("secure");
  locale.secureCookie               = WebDeveloper.Locales.getString("secureCookie");
  locale.sessionCookie              = WebDeveloper.Locales.getString("sessionCookie");
  locale.value                      = WebDeveloper.Locales.getString("value");
  locale.valuePlaceholder           = WebDeveloper.Locales.getString("valuePlaceholder");
  locale.yes                        = WebDeveloper.Locales.getString("yes");

  return locale;
};

// Populates a cookie from a dialog
WebDeveloper.Overlay.Cookies.populateCookieFromDialog = function()
{
  var cookie = {};

  cookie.host  = $("#add-cookie-host").val();
  cookie.name  = $("#add-cookie-name").val();
  cookie.path  = $("#add-cookie-path").val();
  cookie.value = $("#add-cookie-value").val();

  // If the cookie is secure
  if($("#add-cookie-secure").prop("checked"))
  {
    cookie.secure = true;
  }

  // If the cookie is a session cookie
  if($("#add-cookie-session").prop("checked"))
  {
    cookie.session = true;
  }
  else
  {
    cookie.expires = $("#add-cookie-expires").val();
  }

  return cookie;
};

// Resets the add cookie dialog
WebDeveloper.Overlay.Cookies.resetAddDialog = function(addDialog)
{
  $(".has-error", addDialog).removeClass("has-error");
  $(".help-block", addDialog).text("");
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
  WebDeveloper.Overlay.toggleContentSetting("cookies", $(this), "enableCookiesResult", "disableCookiesResult");
};

// Returns true if the add dialog is valid
WebDeveloper.Overlay.Cookies.validateAddDialog = function()
{
  var expires   = $("#add-cookie-expires");
  var host      = $("#add-cookie-host");
  var hostValue = host.val().trim();
  var name      = $("#add-cookie-name");
  var path      = $("#add-cookie-path");
  var valid     = true;

  WebDeveloper.Overlay.Cookies.resetAddDialog($("#add-cookie-dialog"));

  // If the cookie name is not set
  if(!name.val())
  {
    name.closest(".form-group").addClass("has-error");
    name.next(".help-block").text(WebDeveloper.Locales.getString("nameCannotBeEmpty"));

    valid = false;
  }

  // If the cookie host is not set
  if(!hostValue)
  {
    host.closest(".form-group").addClass("has-error");
    host.next(".help-block").text(WebDeveloper.Locales.getString("hostCannotBeEmpty"));

    valid = false;
  }
  else if(hostValue == "localhost" || hostValue == ".localhost")
  {
    host.closest(".form-group").addClass("has-error");
    host.next(".help-block").html(WebDeveloper.Locales.getString("extensionName") + " " + WebDeveloper.Locales.getString("hostCannotBeLocalhost"));

    valid = false;
  }

  // If the cookie path is not set
  if(!path.val())
  {
    path.closest(".form-group").addClass("has-error");
    path.next(".help-block").text(WebDeveloper.Locales.getString("pathCannotBeEmpty"));

    valid = false;
  }

  // If the cookie is not a session cookie
  if(!$("#add-cookie-session").prop("checked"))
  {
    var expiresValue = expires.val().trim();

    // If the cookie expires is not set
    if(!expiresValue)
    {
      expires.closest(".form-group").addClass("has-error");
      expires.closest(".input-group").next(".help-block").text(WebDeveloper.Locales.getString("expiresCannotBeEmpty"));

      valid = false;
    }
    else if(new Date(expiresValue) == "Invalid Date")
    {
      expires.closest(".form-group").addClass("has-error");
      expires.closest(".input-group").next(".help-block").text(WebDeveloper.Locales.getString("expiresNotValid"));

      valid = false;
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
          chrome.extension.getBackgroundPage().WebDeveloper.Background.openGeneratedTab(chrome.extension.getURL("/generated/view-cookie-information.html"), tab.index, data, WebDeveloper.Overlay.Cookies.getViewCookieInformationLocale());
          WebDeveloper.Overlay.close();
        });
      });
    }
  });
};
